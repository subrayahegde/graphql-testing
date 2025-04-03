<template>
  <div>
   <h2>Book List</h2>
    <div v-if="data">  
    <table border="1">
      <tr>
       <th>Id</th>
       <th>Name</th>
       <th>No. of posts</th>
       <th>Titles</th>       
     </tr>  
     
     <template v-for="user in data.users" :key="user.id">      
       <template v-if="user.posts.length > 0">       
           <tr>
		 <td>{{user.id}}</td><td>{{user.name}}</td><td>{{user.posts.length}} posts </td>        
	         <td align="left">
	         <template v-for="post in user.posts" :key="post.id">
		       {{post.title}} <br />         
		 </template>
		 </td>
           </tr>
       </template>
       
       <template v-else>      
          <tr>
             <td>{{user.id}}</td><td>{{user.name}}</td><td>0</td><td align="left"><span>No Posts</span></td>
          </tr>
       </template>   
     </template>   
    </table>
    </div>     
  </div>
</template>

<script>
import { useQuery } from 'villus';

export default {
  name: 'HelloWorld',
  setup() {
    const AllUsers = `
      query AllUsers {
        users {
          id,
          name,
          posts {
           id,
           title
          }
        }
      }
    `;

    const { data } = useQuery({
      query: AllUsers,
    });

    return { data };
  },
  
}
</script>

<style>
ul li {
display:block;
padding:0.4rem;
text-align:left
},
h2 {
display:block;
padding:0.4rem;
align:left
}

span{
color:red
}
</style>
