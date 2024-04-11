import { createClient } from 'contentful';

export default function useFetchMusic() {
  const fetchMusic = async () => {
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
        musicianImg: `https:${item.fields.musicianImg.fields.file.url}`,
      };
    });
    console.log(videos);
    return videos;
  };

  return { fetchMusic };
}
