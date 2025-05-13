import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase'; // shyiraho aho firebase yawe iherereye
import { collection, getDocs, doc, setDoc, updateDoc, increment } from 'firebase/firestore';


import './NewtalentsG.css';
const NewtalentsGTv = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, 'shows'));
      const shows = [];
      querySnapshot.forEach(doc => {
        shows.push({ id: doc.id, ...doc.data() });
      });
      // Gushyira ibishya imbere
      const sorted = shows.sort((a, b) => b.createdAt - a.createdAt);
      setVideos(sorted);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const handleVideoEnd = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
  };

  const handleFollow = async () => {
    const currentVideo = videos[currentIndex];
    const docRef = doc(db, 'Newtalentsg', `${userId}_${currentVideo.id}`);
    await setDoc(docRef, {
      userId,
      videoId: currentVideo.id,
      followedAt: new Date()
    });
    alert('Wakurikiranwe!');
  };

  const recordView = async () => {
    const currentVideo = videos[currentIndex];
    const viewRef = doc(db, 'views', `${userId}_${currentVideo.id}`);
    await setDoc(viewRef, {
      userId,
      videoId: currentVideo.id,
      viewedAt: new Date()
    });

    const countRef = doc(db, 'shows', currentVideo.id);
    await updateDoc(countRef, {
      views: increment(1)
    });
  };

  useEffect(() => {
    if (videos.length > 0) {
      recordView();
    }
  }, [currentIndex]);

  if (loading) return <div>Loading videos...</div>;

  const currentVideo = videos[currentIndex];
  const nextVideo = videos[(currentIndex + 1) % videos.length];

  return (
    <div className="video-player">
      <h2>{currentVideo.title}</h2>
      <video
        ref={videoRef}
        src={currentVideo.videoUrl}
        controls
        autoPlay
        onEnded={handleVideoEnd}
        style={{ width: '100%', maxHeight: '80vh' }}
      />
      <div className="controls" style={{ marginTop: '10px' }}>
        <button onClick={handleFollow}>Follow</button>
        <p>Next Video: {nextVideo.title}</p>
      </div>
    </div>
  );
};

export default NewtalentsGTv;
