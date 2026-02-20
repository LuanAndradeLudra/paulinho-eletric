import { Play, Youtube, Film, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useYoutubeVideos } from '@/hooks/use-youtube-videos';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VideoCard = ({ video, isShortLayout = false }: { video: any; isShortLayout?: boolean }) => (
  <a
    href={`https://www.youtube.com/watch?v=${video.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="card-gaming group overflow-hidden p-0"
  >
    {/* Thumbnail */}
    <div className={`relative overflow-hidden ${isShortLayout ? 'aspect-[9/16]' : 'aspect-video'}`}>
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
        <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center">
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
        </div>
      </div>
    </div>

    {/* Title */}
    <div className="p-3">
      <h3 className={`font-bold group-hover:text-primary transition-colors ${isShortLayout ? 'text-xs line-clamp-2' : 'text-sm line-clamp-2'}`}>
        {video.title}
      </h3>
    </div>
  </a>
);

const VideoSkeleton = ({ isShortLayout = false }: { isShortLayout?: boolean }) => (
  <div className="card-gaming overflow-hidden p-0">
    <Skeleton className={`w-full ${isShortLayout ? 'aspect-[9/16]' : 'aspect-video'}`} />
    <div className="p-3">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const Videos = () => {
  const { data: allVideos, isLoading: loadingAll } = useYoutubeVideos();
  const { data: videos, isLoading: loadingVideos } = useYoutubeVideos({ videosOnly: true });
  const { data: shorts, isLoading: loadingShorts } = useYoutubeVideos({ shortsOnly: true });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <Youtube className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">YouTube</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              Meus <span className="text-primary">Vídeos</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Confira todos os vídeos do canal Paulinho Eletric
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            <div className="card-gaming text-center py-4">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-2">
                <Youtube className="w-5 h-5 text-destructive" />
              </div>
              <div className="text-2xl font-black text-destructive">
                {loadingAll ? '...' : allVideos?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            
            <div className="card-gaming text-center py-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <Film className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-black text-primary">
                {loadingVideos ? '...' : videos?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Vídeos</div>
            </div>
            
            <div className="card-gaming text-center py-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-2xl font-black text-orange-500">
                {loadingShorts ? '...' : shorts?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Shorts</div>
            </div>
          </div>

          {/* Tabs for Videos/Shorts */}
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all" className="gap-2">
                <Youtube className="w-4 h-4" />
                Todos
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Film className="w-4 h-4" />
                Vídeos
              </TabsTrigger>
              <TabsTrigger value="shorts" className="gap-2">
                <Zap className="w-4 h-4" />
                Shorts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loadingAll ? (
                  Array.from({ length: 12 }).map((_, i) => <VideoSkeleton key={i} />)
                ) : (
                  allVideos?.map((video) => <VideoCard key={video.id} video={video} />)
                )}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loadingVideos ? (
                  Array.from({ length: 12 }).map((_, i) => <VideoSkeleton key={i} />)
                ) : (
                  videos?.map((video) => <VideoCard key={video.id} video={video} />)
                )}
              </div>
            </TabsContent>

            <TabsContent value="shorts">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {loadingShorts ? (
                  Array.from({ length: 12 }).map((_, i) => <VideoSkeleton key={i} isShortLayout />)
                ) : shorts?.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    Nenhum Short encontrado ainda
                  </div>
                ) : (
                  shorts?.map((video) => <VideoCard key={video.id} video={video} isShortLayout />)
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Subscribe Button */}
          <div className="text-center mt-12">
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
      </main>

      <Footer />
    </div>
  );
};

export default Videos;
