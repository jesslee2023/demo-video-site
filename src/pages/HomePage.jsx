import React, { useState } from 'react';
import VideoModal from '../components/VideoModal';

function Home() {
  const videos = [
    { id: 1, title: 'Video 1', url: '../../public/video demo1.mp4' },
    { id: 2, title: 'Video 2', url: '../../public/video demo2.mp4' },
    { id: 3, title: 'Video 3', url: '../../public/video demo3.mp4' },
    { id: 4, title: 'Video 4', url: '../../public/video demo4.mp4' },
    { id: 5, title: 'Video 5', url: '../../public/video demo5.mp4' },
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0].url);
  const [currentTitle, setCurrentTitle] = useState(videos[0].title);

  const [showModal, setShowModal] = useState(false);
  const [modalVideo, setModalVideo] = useState('');

  const handleVideoClick = (url) => {
    setCurrentVideo(url);
    setCurrentTitle(videos.find((video) => video.url === url).title);
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
      <video
        key={currentVideo}
        autoPlay
        muted
        loop
        playsInline
        className='absolute w-full h-full object-cover z-[1] cursor-pointer'
        onClick={() => {
          setShowModal(true);
          setModalVideo(currentVideo);
        }}
      >
        <source src={currentVideo} type='video/mp4' />
      </video>
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between'>
        <header className='text-end z-10 text-6xl'>Rebel-Rebel</header>
        {showModal && (
          <VideoModal
            title={currentTitle}
            url={modalVideo}
            onClose={() => setShowModal(false)}
          />
        )}
        <div
          className='absolute z-20 top-[50%] left-[10%] text-center'
          style={fadeInStyle}
        >
          <p className='music-name text-5xl font-bold'>Music Name</p>
          <p className='composer-name text-5xl font-bold'>Composer Name</p>
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
