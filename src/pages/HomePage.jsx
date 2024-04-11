import React, { useState } from 'react';
import VideoModal from '../components/VideoModal';
import { useEffect } from 'react';
import useFetchMusic from '../hooks/useFetchMusic';

function Home() {
  const { fetchMusic } = useFetchMusic();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentMusician, setCurrentMusician] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalVideo, setModalVideo] = useState('');

  useEffect(() => {
    async function fetchDataFromContentful() {
      const videos = await fetchMusic();
      setVideos(videos);
      setCurrentVideo(videos[0].url);
      setCurrentTitle(videos[0].title);
      setCurrentMusician(videos[0].musician);
      setCurrentCompany(videos[0].company);
    }
    fetchDataFromContentful();
  }, []);

  const handleVideoClick = (url) => {
    setCurrentVideo(url);
    setCurrentTitle(videos.find((video) => video.url === url).title);
    setCurrentMusician(videos.find((video) => video.url === url).musician);
  };

  const fadeInStyle = {
    animation: 'fadeIn 2s',
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  };
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {videos.map((video) => (
        <video
          key={video.id}
          autoPlay
          muted
          loop
          preload='auto'
          playsInline
          className='absolute w-full h-full object-cover z-[1]'
          src={video.url}
          hidden={currentVideo !== video.url}
          onClick={() => {
            setShowModal(true);
            setModalVideo(currentVideo);
          }}
        >
          <source src={video} type='video/mp4' />
        </video>
      ))}
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between'>
        <header className='text-end z-10 text-6xl'>{currentCompany}</header>
        {showModal && (
          <VideoModal
            title={currentTitle}
            url={modalVideo}
            composer={currentMusician}
            onClose={() => setShowModal(false)}
          />
        )}
        <div
          className='absolute z-20 top-[50%] left-[10%] text-center'
          style={fadeInStyle}
        >
          <p className='music-name text-5xl font-bold'>{currentTitle}</p>
          <p className='composer-name text-5xl font-bold'>{currentMusician}</p>
        </div>
        <footer className='text-center text-white z-10'>
          <div className='z-10 text-center'>
            {videos.map((video) => (
              <button
                key={video.id}
                className='text-white mx-2 btn btn-ghost'
                onClick={() => handleVideoClick(video.url)}
                value={video.url}
              >
                {video.title}
              </button>
            ))}
          </div>
          <div>Copyright©2024 Rebel-Rebel</div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
