// Truncate description to 15 words, stripping HTML tags first
export const truncateDescription = (htmlString: string) => {
  // Create a DOMParser to parse the HTML string
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(htmlString, "text/html");
  const plainText = parsedDocument.body.textContent || ""; // Extract plain text from the HTML

  const words = plainText.split(" ");
  if (words.length > 15) {
    return words.slice(0, 15).join(" ") + "...";
  }
  return plainText;
};
