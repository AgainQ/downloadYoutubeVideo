import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

// Get the absolute path of the current file (for ESM compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert exec to a promise-based function
const execPromise = promisify(exec);

export async function downloadYoutubeVideo(url: string, videoName: string) {
  console.log(url);
  console.log(videoName);
  // const videoId = url.split('=').at(-1);
  const downloadPath = path.resolve(__dirname, `videos/${videoName}.mp4`);

  console.log(`Start downloading video ${url}`);
  const proxyFrance = 'socks5://nyRg8C2D:irqski6G@194.87.36.138:62417';

  // cookies don't need --cookies-from-browser firefox
  // proxy don't need  --proxy "${proxyFrance}"
  try {
    const { stdout } = await execPromise(
      `yt-dlp \
       -f "bestvideo+bestaudio/best" \
       --merge-output-format mp4 \
       -4 ${url} -o "${downloadPath}"`
    );

    // `yt-dlp -f  "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best" --merge-output-format mp4 \

    console.log('Video downloaded successfully');
    return true;
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    throw error;
  }
}

// const url = 'https://www.youtube.com/shorts/3nfVRiruvd4';
// downloadYoutubeVideo(url, 'Здесь веселок');

// const videoId = url.split('/').at(-1)
