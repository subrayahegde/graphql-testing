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
      <h2>Users and their Posts</h2>
      <ul>
        {data.users.map(user => (
         user.posts.length != 0 ?
          (<li key={user.id}>
            {user.id}, {user.name}, {user.posts.length} posts
          
          
          { user.posts.map(post => (
               (<p key={post.id}> {post.title} </p>)
          ))}
          
          </li>)  
          :
           (<li key={user.id}>
            {user.id}, {user.name} <span style={{ color: 'red' }}>NO posts</span>
          </li>)  
        ))}
      </ul>
    </div>
  );
};

export default BookList;
