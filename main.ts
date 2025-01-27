import fs from 'fs';
import { downloadYoutubeVideo } from './downloadYoutubeVideo';

type Video = { name: string; url: string };

function getVideos(): Video[] {
  const fileContent = fs.readFileSync('input.txt', 'utf-8');
  const lines = fileContent.split('\n').map(line => line.trim());
  const videos: Video[] = lines.map(line => {
    const [name, url] = line.split(';');
    return { name, url };
  });

  return videos;
}

async function main() {
  const videos = getVideos();

  for (const video of videos) {
    downloadYoutubeVideo(video.url, video.name);
  }
}

main();
