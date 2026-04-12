export async function getMostFrequentPathway(
  pathways: string[]
): Promise<string> {
  // Count occurrences of each pathway
  const frequencyMap: Record<string, number> = {};

  pathways.forEach((pathway) => {
    frequencyMap[pathway] = (frequencyMap[pathway] || 0) + 1;
  });

  // Find the highest frequency count
  const maxFrequency = Math.max(...Object.values(frequencyMap));

  // Get all pathways with the max frequency
  const mostFrequent = Object.entries(frequencyMap)
    .filter(([_, count]) => count === maxFrequency)
    .map(([pathway]) => pathway);
  // If there's a tie, pick one randomly from the most frequent
  if (mostFrequent.length > 1) {
    const randomIndex = Math.floor(Math.random() * mostFrequent.length);
    return mostFrequent[randomIndex];
  }

  return mostFrequent[0];
}
