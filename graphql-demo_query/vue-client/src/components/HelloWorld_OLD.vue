<template>
  <div>
   <h2>Book List</h2>
    <div v-if="data">
    <ul>

     <li v-for="user in data.users" :key="user.id">
       <div v-if="user.posts.length > 0">
        <b>{{user.id}}, {{user.name}}, {{user.posts.length}} posts </b>
           <ul>
           <li v-for="post in user.posts" :key="post.id">
                {{post.title}}, {{post.content}}
           </li>
           </ul>
       </div>
       <div v-else>
         <b>{{user.id}}, {{user.name}}: <span>No Posts</span></b>
       </div>
     </li>     
   
    </ul>
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
