import { getVideoEmbedUrl } from "@/app/utils/getEmbedUrl";

const VideoPlayer = ({ videoHtml }: { videoHtml: string | undefined }) => {
  if (!videoHtml) return <p className="text-red-500">No video available</p>;

  const videoSrc = getVideoEmbedUrl(videoHtml);

  if (!videoSrc) return <p className="text-red-500">Invalid video source</p>;

  return (
    <div className="relative w-full pb-[56.25%] mb-5 rounded-xl overflow-hidden">
      <iframe
        src={videoSrc}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        className="absolute top-0 left-0 w-full h-full"
        title="Video Player"
        loading="lazy"
      />
    </div>
  );
};
export default VideoPlayer;
