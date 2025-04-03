const baseURL = `http://localhost:3000`

const resolvers = {
  Query: {
    users: () => {
      return fetch(`${baseURL}/users`).then(res => res.json())
    },
    user: (parent, args) => {
      const { id } = args
      return fetch(`${baseURL}/users/${id}`).then(res => res.json())
    },
    posts: () => {
      return fetch(`${baseURL}/posts`).then(res => res.json())
    },
    post: (parent, args) => {
      const { id } = args
      return fetch(`${baseURL}/posts/${id}`).then(res => res.json())
    },
  },
  
  Post: {
    author: parent => {
      const { id } = parent    
      return fetch(`${baseURL}/posts/${id}/user`).then(res => res.json())   
    }
  },
  User: {
    posts: parent => {
      const { id } = parent      
      return fetch(`${baseURL}/users/${id}/posts`).then(res => res.json())
    }
  },
  
  Mutation: {  
     createUser: (parent, args) => {          
       const url = baseURL + "/users";    
       
       return fetch(url, {
        method: "POST",      
        headers: {"Content-Type": "application/json"},     
        body: JSON.stringify(args),
        }).then(res => res.json());
      
    },    
       
    updateUser: (parent, args) => { 
       const id = args.id;      
       const url = baseURL + "/users/" + id;    
       
       return fetch(url, {
        method: "PUT",      
        headers: {"Content-Type": "application/json"},     
        body: JSON.stringify(args),
        }).then(res => res.json());
      
     },    
    
    deleteUser: (parent, args) => {    
       const { id } = args
       return fetch(`${baseURL}/users/${id}`, { method:'DELETE'}).then(res => res)
    },
    
    
    createPost: (parent, args) => {          
       const url = baseURL + "/posts";    
       
       return fetch(url, {
        method: "POST",      
        headers: {"Content-Type": "application/json"},     
        body: JSON.stringify(args),
        }).then(res => res.json());
      
    },    
       
    updatePost: (parent, args) => { 
       const id = args.id;      
       const url = baseURL + "/posts/" + id;    
       
       return fetch(url, {
        method: "PUT",      
        headers: {"Content-Type": "application/json"},     
        body: JSON.stringify(args),
        }).then(res => res.json());
      
     },    
    
    deletePost: (parent, args) => {    
       const { id } = args
       return fetch(`${baseURL}/posts/${id}`, { method:'DELETE'}).then(res => res)
    }
    
  }
    
} 

module.exports = { resolvers }

