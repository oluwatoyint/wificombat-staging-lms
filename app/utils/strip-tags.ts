export const RemoveTags = (input: string) => {
  if (!input) return ""; // Handle null or undefined
  return input.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
};
