import { Play, Youtube } from 'lucide-react';
import { useYoutubeVideos } from '@/hooks/use-youtube-videos';
import { Skeleton } from '@/components/ui/skeleton';

const Videos = () => {
  const { data: videos, isLoading } = useYoutubeVideos({ limit: 6, videosOnly: true });

  return (
    <section id="videos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
            <Youtube className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">YouTube</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Últimos <span className="text-primary">Vídeos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Confira os vídeos mais recentes do nosso canal
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-gaming overflow-hidden p-0">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : (
            videos?.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-gaming group overflow-hidden p-0"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail_url || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.includes('hqdefault')) {
                        img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center glow-purple">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Subscribe Button */}
        <div className="text-center mt-10">
          <a
            href="https://youtube.com/@paulinhoeletric"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-destructive text-white hover:bg-destructive/90"
          >
            <Youtube className="w-6 h-6" />
            Inscreva-se no Canal
          </a>
        </div>
      </div>
    </section>
  );
};

export default Videos;
