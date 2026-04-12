// export const getVideoEmbedUrl = (url: string) => {
//   if (url) {
//     //  unscape the html entities
//     const unescaped = url
//       ?.replace(/&lt;/g, "<")
//       ?.replace(/&gt;/g, ">")
//       ?.replace(/&amp;amp;/g, "&");

//     // Then extract the src URL with regex
//     const match = unescaped?.match(/src="([^"]+)"/);
//     if (match) {
//       const srcUrl = match[1];
//       return srcUrl;
//     } else {
//       return "Unscaped didn't match";
//     }
//   } else {
//     return "";
//   }
// };
export const getVideoEmbedUrl = (url: string) => {
  if (url) {
    const match = url?.match(/src="([^"]+)"/);
    const match2 = url?.match(/https:\/\/youtu\.be\/[\w-]+/);
    const match2UrlArr = match2 ? String(match2[0])?.split("/") : "";
    const match2UrlId = match2UrlArr
      ? match2UrlArr[match2UrlArr?.length - 1]
      : "";
    const match2Url = match2UrlId
      ? `https://www.youtube.com/embed/${match2UrlId}`
      : "";
    const videoSrc = match ? match[1] : match2 ? match2Url : null;
    console.log(videoSrc);
    return videoSrc as string;
  } else {
    return "";
  }
};
