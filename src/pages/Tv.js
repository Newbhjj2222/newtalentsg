import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import ReactPlayer from 'react-player';
import './NewtalentsG.css';

const NewtalentsGTv = ({ userId }) => {
  const actualUserId = userId || "NewtalentsG";
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, 'shows'));
      const shows = [];
      querySnapshot.forEach((docSnap) => {
        shows.push({ id: docSnap.id, ...docSnap.data() });
      });

      const sorted = shows.sort(
        (a, b) => b.createdAt?.seconds - a.createdAt?.seconds
      );

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
    const video = videos[currentIndex];
    const docRef = doc(db, 'Newtalentsg', `${actualUserId}_${video.id}`);
    await setDoc(docRef, {
      userId: actualUserId,
      videoId: video.id,
      followedAt: new Date(),
    });
    alert('Wakurikiranwe!');
  };

  const recordView = async () => {
    const video = videos[currentIndex];
    const viewRef = doc(db, 'views', `${actualUserId}_${video.id}`);

    await setDoc(viewRef, {
      userId: actualUserId,
      videoId: video.id,
      viewedAt: new Date(),
    });

    const countRef = doc(db, 'shows', video.id);
    await updateDoc(countRef, {
      views: increment(1),
    });
  };

  useEffect(() => {
    if (videos.length > 0) {
      recordView();
    }
  }, [currentIndex]);

  if (loading) return <div className="video-player">Loading videos...</div>;

  const currentVideo = videos[currentIndex];
  const nextVideo = videos[(currentIndex + 1) % videos.length];

  return (
    <div className="video-player">
      <h2>{currentVideo.title}</h2>
      <div className="player-wrapper">
        <ReactPlayer
          url={currentVideo.videoUrl}
          playing
          controls
          onEnded={handleVideoEnd}
          width="100%"
          height="100%"
          className="react-player"
        />
      </div>
      <div className="controls">
        <button onClick={handleFollow}>Follow</button>
        <p>Next video: <strong>{nextVideo.title}</strong></p>
      </div>
    </div>
  );
};

export default NewtalentsGTv;
