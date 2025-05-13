import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Sidebar = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const db = getFirestore();
      const foldersRef = collection(db, 'folders');
      const snapshot = await getDocs(foldersRef);
      const folderData = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title
      }));
      setPosts(folderData);
    };

    fetchFolders();
  }, []);

  return (
    <div className="sidebar">
      <h3>Our Available Stories</h3>
      <ul className="sidebar-list">
        {posts.map((post) => (
          <li key={post.id} onClick={() => onSelectPost(post.title)}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
