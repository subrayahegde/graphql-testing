
const bothRoutes = (app, fs) => {

// variables
const dataPath1 = './data/users.json';
const dataPath2 = './data/posts.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath1, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }         
            res.send(JSON.parse(data));
        });
    });

    //ID
    app.get('/users/:id', (req, res) => {
       // First read existing users.
       fs.readFile(dataPath1, 'utf8', (err, data) => {
          var users = JSON.parse( data );
          //console.log(users);
          //console.log(req.params.id);          
          
          const uid = req.params.id;
         
          const user = users.find(p => p.id === uid);
         // console.log("hello" + user);
          res.send(user);
       });
    })
    
  
    //POSTS BY USERS
    app.get('/users/:id/posts', (req, res) => {   
       // First read existing posts.
       fs.readFile(dataPath2, 'utf8', (err, data) => {
       var posts = JSON.parse( data );
       //console.log(req.params.id);
       const postsForUser = posts.filter(post => post.authorId === req.params.id)       
       //console.log(postsForUser);
       res.send(postsForUser)
    })
    });

    // CREATE
    app.post('/users', (req, res) => {
        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile1(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {

            // delete the user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });

    // READ
    app.get('/posts', (req, res) => {
        fs.readFile(dataPath2, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

   //ID
    app.get('/posts/:id', (req, res) => {
       // First read existing posts.
       fs.readFile(dataPath2, 'utf8', (err, data) => {
          var posts = JSON.parse( data );          
          const pid = req.params.id;
          const post = posts.find(p => p.id === pid);
          
          res.send(post);
       });
    })

   //AUTHOR FOR POSTS
    app.get('/posts/:id/user', (req, res) => { 
    //first read all users   
    fs.readFile(dataPath1, 'utf8', (err, data) => {
        var users = JSON.parse( data );    
        //console.log(req.params.id);
        const authorForPost = users.filter(user => user.postIds.includes(req.params.id));        
        //console.log(authorForPost);
        res.send (authorForPost)
    });
    })

    // CREATE
    app.post('/posts', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new post added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/posts/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const postId = req.params["id"];
            data[postId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`posts id:${postId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/posts/:id', (req, res) => {

        readFile(data => {

            // delete the user
            const postId = req.params["id"];
            delete data[postId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`psots id:${postId} removed`);
            });
        },
            true);
    });
}

module.exports = bothRoutes;
