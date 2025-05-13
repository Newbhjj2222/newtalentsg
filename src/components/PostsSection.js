import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Posts.css';

import { db } from '../firebase'; // Ensure this path is correct based on your project

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const PostsSection = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const postsData = snapshot.docs.map(doc => {
          const data = doc.data();
          const summary = data.story ? stripHtml(data.story).split(' ').slice(0, 20).join(' ') + '...' : '';
          return {
            id: doc.id,
            image: data.imageUrl || '',
            title: data.head || 'Untitled',
            summary: summary,
            author: data.author || 'Unknown',
            category: data.category || 'General'
          };
        });

        setAllPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setDisplayedPosts(allPosts.slice(0, 50));
    } else {
      const filtered = allPosts.filter(post =>
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setDisplayedPosts(filtered);
    }
  }, [allPosts, selectedCategory]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const postsToFilter = selectedCategory
      ? allPosts.filter(post =>
          post.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : allPosts;

    if (value.trim() === '') {
      setDisplayedPosts(postsToFilter.slice(0, 50));
    } else {
      const filtered = postsToFilter.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.author.toLowerCase().includes(value)
      );
      setDisplayedPosts(filtered);
    }
  };

  return (
    <div className="posts-section">
      <h2>{selectedCategory ? selectedCategory + ' Stories' : 'All Posts'}</h2>
      
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      {displayedPosts.length > 0 ? (
        displayedPosts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-img" />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <small>Written By: {post.author}</small>
              <div className="post-actions">
                <Link to={`/posts/${post.id}`} className="action-btn">
                  <FaArrowRight /> Read More
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Buretse gato tuzane inkuru...</p>
      )}
    </div>
  );
};

export default PostsSection;
