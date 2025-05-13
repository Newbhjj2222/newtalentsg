import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './OtherStories.css';

const OtherStories = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchOtherStories = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'posts'));
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().head || 'Untitled',
          author: doc.data().author || 'Unknown',
          image: doc.data().imageUrl || 'https://source.unsplash.com/80x80/?story',
        }));
        // Fata post 5 gusa za mbere
        setPosts(postsData.slice(0, 5));
      } catch (error) {
        console.error("Error fetching other stories:", error);
      }
    };

    fetchOtherStories();
  }, []);

  return (
    <div className="other-stories">
      <h2>More Stories</h2>
      {posts.map((post) => (
        <div key={post.id} className="story-card">
          <img src={post.image} alt={post.title} className="story-image" />
          <div className="story-content">
            <h4>{post.title}</h4>
            <p>By: {post.author}</p>
            <Link to={`/posts/${post.id}`} className="read-btn">
              <FaArrowRight /> Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherStories;
