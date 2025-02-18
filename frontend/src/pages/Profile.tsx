import React, { useEffect, useState } from 'react';

interface UserProfile {
  uid: string;
  name: string;
  bio: string;
}

interface Post {
  uid: string;
  content: string;
  createdAt: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRes = await fetch('/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const profileData = await profileRes.json();
        setProfile(profileData);

        const postsRes = await fetch(`/api/posts/user/${profileData.uid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile.name}'s Profile</h2>
      <p>{profile.bio}</p>
      <section>
        <h3>Your Posts</h3>
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

export default Profile;
