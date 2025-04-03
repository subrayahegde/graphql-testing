import React from 'react';
import { useQuery, gql } from '@apollo/client';

const BOOKS_QUERY = gql`
  query GetBooks {
    users {
      id
      name
      posts {
        id
        title
        content
      }
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 align="left">Users and their Posts</h2>
      <table border="1">
      <tr>
       <th>Id</th>
       <th>Name</th>
       <th>No. of posts</th>
       <th>Titles</th>       
      </tr> 
       
     
        {data.users.map(user => (
         user.posts.length != 0 ?
         
          (<tr key={user.id}>
          <td> {user.id} </td><td>{user.name} </td> <td>{user.posts.length} posts </td>
          
          <td align="left">
          { user.posts.map(post => (
               (<p key={post.id}> {post.title} </p>)
          ))}
          </td>        
          </tr>)  
          :
           (<tr key={user.id}>
            <td> {user.id} </td> <td>{user.name} </td><td>0</td><td><span style={{ color: 'red' }}>NO posts</span></td>        
          </tr>)
        ))}
      </table>
    </div>
  );
};

export default BookList;
