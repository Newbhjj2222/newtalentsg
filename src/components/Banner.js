import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Banner.css';

const Banner = () => {
  const [screenTexts, setScreenTexts] = useState([]);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'screens'));
        const texts = snapshot.docs.map(doc => doc.data().content || '');
        setScreenTexts(texts);
      } catch (error) {
        console.error("Error fetching screens: ", error);
      }
    };

    fetchScreens();
  }, []);

  return (
    <div className="banner">
      <div className="scroll-container">
        <div className="scroll-text">
          {screenTexts.map((text, index) => (
            <span key={index} dangerouslySetInnerHTML={{ __html: text }} style={{ marginRight: '100px' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
