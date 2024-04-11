import { useParams } from 'react-router-dom';
import useFetchMusic from '../hooks/useFetchMusic';
import { useEffect, useState } from 'react';

const MusicianPage = () => {
  const { composer } = useParams();
  const { fetchMusic } = useFetchMusic();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchDataFromContentful() {
      const music = await fetchMusic();
      const filteredVideos = music.filter((video) => {
        return video.musician.includes(composer);
      });
      setVideos(filteredVideos);
    }
    fetchDataFromContentful();
  }, []);
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <h1 className='text-4xl font-bold'>{composer}'s Main Page</h1>
      <div className='text-2xl text-center'>
        {videos.map((video) => (
          <div key={video.id}>
            <img src={video.musicianImg} alt={video.title} />
            <h2>Title: {video.title}</h2>
            <p>Musician Name: {video.musician}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicianPage;
