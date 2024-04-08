import React, { useState } from 'react';
import VideoModal from '../components/VideoModal';
import { createClient } from 'contentful';
import { useEffect } from 'react';

function Home() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentMusician, setCurrentMusician] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalVideo, setModalVideo] = useState('');

  const fetchVideos = async () => {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

    const response = await client.getEntries({ content_type: 'masterpiece' });
    console.log(response.items);
    const videos = response.items.map((item) => {
      return {
        id: item.sys.id,
        title: item.fields.musicName,
        url: `https:${item.fields.video[0].fields.file.url}`,
        musician: item.fields.musicianName,
        company: item.fields.company,
      };
    });
    console.log(videos);
    setVideos(videos);
    setCurrentVideo(videos[0].url);
    setCurrentTitle(videos[0].title);
    setCurrentMusician(videos[0].musician);
    setCurrentCompany(videos[0].company);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
