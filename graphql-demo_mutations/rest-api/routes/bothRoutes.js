
const bothRoutes = (app, fs) => {

// variables
const dataPath1 = './data/users.json';
const dataPath2 = './data/posts.json';

    //get the user data from json file
    const getUserData = (filePath) => {
    const jsonData = fs.readFileSync(filePath)
        return JSON.parse(jsonData)    
    }
    
    //read the user data from json file
    const saveUserData = (data, filePath) => {
    const stringifyData = JSON.stringify(data)
        fs.writeFileSync(filePath, stringifyData)
    }

    // READ
    app.get('/users', (req, res) => {
        const data = getUserData(dataPath1)
        res.send(data)        
    });


    //ID
    app.get('/users/:id', (req, res) => {
       // First read existing users.
       const data = getUserData(dataPath1);
       const uid = req.params.id;
       const user = data.find(p => p.id === uid);
       // console.log("hello" + user);
        res.send(user);    
    });
    
    //POSTS BY USERS
    app.get('/users/:id/posts', (req, res) => {   
       // First read existing posts.
       const posts = getUserData(dataPath2);   
       //console.log(req.params.id);
       const postsForUser = posts.filter(post => post.authorId === req.params.id)       
       //console.log(postsForUser);
       res.send(postsForUser)
    });



    // CREATE
    app.post('/users', (req, res) => {
        //get the existing user data
        const existUsers = getUserData(dataPath1)
        //console.log(existUsers);
    
       //get the new user data from post request
       const userData = req.body
      //check if the userData fields are missing
      if (userData.id == null || userData.name == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
      }    
     // console.log(userData);
      
      //append the user data
      existUsers.push(userData)
    
     //save the new user data
     saveUserData(existUsers, dataPath1);
     res.send(userData)
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {
        //get the username from url
        const id = req.params.id      
        
        //get the update data
        const userData = req.body      
        
        //get the existing user data
        const existUsers = getUserData(dataPath1)
        console.log(existUsers);
        
        //check if the username exist or not       
        const findExist = existUsers.find( user => user.id === id )
        if (!findExist) {
            return res.status(409).send({error: true, msg: 'User Id does not exist'})
        }
        //filter the userdata
        const updateUser = existUsers.filter( user => user.id !== id )
        //push the updated data
        console.log("updateuser record" + updateUser);
        
        updateUser.push(userData)
        //finally save it
        saveUserData(updateUser, dataPath1)
        res.send(userData)
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id       
        console.log ("DELETE");
        //get the existing userdata
        const existUsers = getUserData(dataPath1)
        //filter the userdata to remove it
        const filterUser = existUsers.filter( user => user.id !== id )
        if ( existUsers.length === filterUser.length ) {
            return res.status(409).send({error: true, msg: 'User Id does not exist'})
        }      
        //save the filtered data
        saveUserData(filterUser, dataPath1)
        res.send(filterUser)
    
    });


    // READ
    app.get('/posts', (req, res) => {
       const data = getUserData(dataPath2)
       res.send(data)        
    });

   //ID
    app.get('/posts/:id', (req, res) => {
         // First read existing users.
       const data = getUserData(dataPath2);
       const uid = req.params.id;
       const post = data.find(p => p.id === uid);
       // console.log("hello" + user);
        res.send(post);  
    });

   //AUTHOR FOR POSTS
    app.get('/posts/:id/user', (req, res) => { 
    
       // First read existing users.
       const users = getUserData(dataPath1);   
       //console.log(req.params.id);
       const authorForPost = users.filter(user => user.postIds.includes(req.params.id));  
       //console.log(authorForPost);
       res.send(authorForPost)       
    });
 


    // CREATE
    app.post('/posts', (req, res) => {
         //get the existing user data
        const existPosts = getUserData(dataPath2)
        console.log(existPosts);
    
        //get the new user data from post request
        const postData = req.body
       //check if the postData fields are missing
       if (postData.id == null || postData.title == null || postData.content == null) {
         return res.status(401).send({error: true, msg: 'Post data missing'})
       }    
       //console.log(postData);
      
       //append the user data
       existPosts.push(postData)
    
      //save the new user data
      saveUserData(existPostss, dataPath2);
      res.send({success: true, msg: 'Post added successfully'})
    });


    // UPDATE
    app.put('/posts/:id', (req, res) => {
        //get the username from url
        const id = req.params.id
        //get the update data
        const postData = req.body
        //get the existing user data
        const existPosts = getUserData(dataPath2)
        //check if the username exist or not       
        const findExist = existPosts.find( post => post.id === id )
        if (!findExist) {
            return res.status(409).send({error: true, msg: 'Post Id does not exist'})
        }
        //filter the psotdata
        const updatePost = existPosts.filter( post => post.id !== id )
        //push the updated data
        updateUser.push(postData)
        //finally save it
        saveUserData(updatePost, dataPath2)
        res.send({success: true, msg: 'Post data updated successfully'})
    });


    // DELETE
    app.delete('/posts/:id', (req, res) => {
        const id = req.params.id
        //get the existing postdata
        const existPosts = getUserData(dataPath2)
        //filter the postdata to remove it
        const filterPost = existPosts.filter( post => post.id !== id )
        if ( existPosts.length === filterPost.length ) {
            return res.status(409).send({error: true, msg: 'Post Id does not exist'})
        }
        //save the filtered data
        saveUserData(filterPost, dataPath2)
        res.send({success: true, msg: 'Post removed successfully'})    
    });

}

module.exports = bothRoutes;
