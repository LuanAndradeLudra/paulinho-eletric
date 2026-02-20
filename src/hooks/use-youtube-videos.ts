import { useQuery } from '@tanstack/react-query';

interface ApiVideo {
  id: string;
  title: string;
  duration: string;
  isShort: boolean;
}

interface YouTubeVideo {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  published_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_short: boolean;
}

export const useYoutubeVideos = (options?: { limit?: number; shortsOnly?: boolean; videosOnly?: boolean }) => {
  const { limit, shortsOnly, videosOnly } = options || {};
  
  return useQuery({
    queryKey: ['youtube-videos', limit, shortsOnly, videosOnly],
    queryFn: async () => {
      const maxResults = limit || 8;
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/paulinho/youtube/videos?maxResults=${maxResults}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const apiVideos: ApiVideo[] = data?.videos || [];

      // Filter videos based on options
      let filteredVideos = apiVideos;
      if (shortsOnly) {
        filteredVideos = apiVideos.filter(v => v.isShort === true);
      } else if (videosOnly) {
        filteredVideos = apiVideos.filter(v => v.isShort === false);
      }

      // Map API format to component format
      const mappedVideos: YouTubeVideo[] = filteredVideos.map((video) => ({
        id: video.id,
        title: video.title,
        description: null,
        thumbnail_url: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
        published_at: new Date().toISOString(), // API doesn't provide published_at
        view_count: 0, // API doesn't provide view_count
        like_count: 0, // API doesn't provide like_count
        comment_count: 0, // API doesn't provide comment_count
        is_short: video.isShort,
      }));

      return mappedVideos;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const formatViewCount = (count: number | string): string => {
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  if (isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace('.0', '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace('.0', '')}K`;
  }
  return num.toString();
};
