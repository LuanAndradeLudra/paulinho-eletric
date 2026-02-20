import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface ApiGiveaway {
  id: string;
  item: {
    name: string;
    color: string;
    image: string;
  };
  convertedValue: number;
  winner: {
    id: number;
    name: string;
    avatar: string;
  } | null;
  wonAt: number | null;
}

interface Winner {
  id: string;
  item_name: string;
  item_image: string | null;
  item_color: string | null;
  converted_value: number;
  winner_name: string | null;
  winner_avatar: string | null;
}

const WinnersTicker = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        // Fetch inactive giveaways (which include finished ones with winners)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/paulinho/csgoskins/deposit-gifts?isActive=false&currency=BRL`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const apiGifts: ApiGiveaway[] = data?.gifts || [];

        // Filter only giveaways with winners and transform to Winner format
        const winnersData: Winner[] = apiGifts
          .filter((gift) => gift.winner !== null && gift.wonAt !== null)
          .sort((a, b) => (b.wonAt ?? 0) - (a.wonAt ?? 0)) // Sort by most recent first
          .slice(0, 20) // Limit to 20
          .map((gift) => ({
            id: gift.id,
            item_name: gift.item.name,
            item_image: gift.item.image || null,
            item_color: gift.item.color || null,
            converted_value: gift.convertedValue,
            winner_name: gift.winner?.name || null,
            winner_avatar: gift.winner?.avatar || null,
          }));

        setWinners(winnersData);
      } catch (error) {
        console.error('Error fetching winners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWinners();
  }, []);

  if (isLoading || winners.length === 0) return null;

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  };

  const getColorStyle = (color: string | null) => {
    if (!color) return {};
    const [r, g, b] = color.split(',').map(Number);
    return { color: `rgb(${r}, ${g}, ${b})` };
  };

  return (
    <section className="mt-20 py-4 bg-gradient-to-r from-background via-card/50 to-background border-y border-border/50 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-primary/10 border-r border-primary/30 z-10">
          <div className="flex flex-col items-center gap-1">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              Últimos
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              Ganhadores
            </span>
          </div>
        </div>

        {/* Scrolling container */}
        <div className="flex-1 overflow-hidden relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content - two identical strips for seamless loop */}
          <div className="flex w-fit hover:[animation-play-state:paused]" style={{ animation: 'scroll-left 40s linear infinite' }}>
            {/* First set */}
            {winners.map((winner, index) => (
              <div
                key={`first-${winner.id}-${index}`}
                className="flex-shrink-0 flex items-center gap-4 px-6 py-2 border-r border-border/30 hover:bg-card/30 transition-colors group"
              >
                {/* Skin Image */}
                <div className="relative w-16 h-12 flex-shrink-0">
                  {winner.item_image ? (
                    <img
                      src={winner.item_image}
                      alt={winner.item_name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    {winner.winner_avatar ? (
                      <img
                        src={winner.winner_avatar}
                        alt={winner.winner_name || 'Ganhador'}
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-sm font-bold text-foreground truncate max-w-[120px]">
                      {winner.winner_name || 'Anônimo'}
                    </span>
                  </div>
                  <span 
                    className="text-xs truncate max-w-[140px] opacity-80"
                    style={getColorStyle(winner.item_color)}
                  >
                    {winner.item_name}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {formatValue(winner.converted_value)}
                  </span>
                </div>
              </div>
            ))}
            {/* Second set (duplicate for seamless loop) */}
            {winners.map((winner, index) => (
              <div
                key={`second-${winner.id}-${index}`}
                className="flex-shrink-0 flex items-center gap-4 px-6 py-2 border-r border-border/30 hover:bg-card/30 transition-colors group"
              >
                {/* Skin Image */}
                <div className="relative w-16 h-12 flex-shrink-0">
                  {winner.item_image ? (
                    <img
                      src={winner.item_image}
                      alt={winner.item_name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    {winner.winner_avatar ? (
                      <img
                        src={winner.winner_avatar}
                        alt={winner.winner_name || 'Ganhador'}
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-sm font-bold text-foreground truncate max-w-[120px]">
                      {winner.winner_name || 'Anônimo'}
                    </span>
                  </div>
                  <span 
                    className="text-xs truncate max-w-[140px] opacity-80"
                    style={getColorStyle(winner.item_color)}
                  >
                    {winner.item_name}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {formatValue(winner.converted_value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnersTicker;
