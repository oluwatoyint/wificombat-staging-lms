export const getSuccessUrl = () => {
  return window.location.href.includes("localhost")
    ? "http://localhost:3000/wallet?is_success=true"
    : window.location.href.includes("vercel")
    ? "https://wifi-combat-lms-frontend.vercel.app/wallet?is_success=true"
    : "https://wificombatelearn.com/wallet?is_success=true";
};
