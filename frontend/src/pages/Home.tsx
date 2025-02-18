import React, { useEffect, useState } from 'react';

interface User {
  uid: string;
  name: string;
}

interface Post {
  uid: string;
  content: string;
  usersId: string;
  createdAt: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersRes = await fetch('/api/users');
        const usersData = await usersRes.json();
        setUsers(usersData);

        // Fetch posts from following users
        const postsRes = await fetch('/api/posts/following', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <section>
        <h3>All Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.uid}>{user.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Posts from Following</h3>
        {posts.map((post) => (
          <div key={post.uid} style={{ border: '1px solid #ccc', padding: '8px', margin: '8px 0' }}>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
