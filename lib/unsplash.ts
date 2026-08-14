/** Unsplash License: free for commercial use, no attribution required. */
export function unsplashUrl(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}
