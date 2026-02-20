import { Award, TrendingUp, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GiveawayItem {
  id: string;
  item: {
    name: string;
    color: string;
    image: string;
  };
  value: number;
  minDepositValue: number;
  convertedValue: number;
  convertedMinDepositValue: number;
  availableFrom: number;
  boostCount: number;
  winner: {
    id: number;
    name: string;
    avatar: string;
  } | null;
  wonAt: number | null;
}

const formatCurrency = (valueInCents: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInCents / 100);
};

const Giveaways = () => {
  const [giveaways, setGiveaways] = useState<GiveawayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    const fetchGiveaways = async (retryCount = 0): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both active and inactive giveaways
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const [activeResponse, inactiveResponse] = await Promise.all([
          fetch(`${apiUrl}/api/paulinho/csgoskins/deposit-gifts?isActive=true&currency=BRL`),
          fetch(`${apiUrl}/api/paulinho/csgoskins/deposit-gifts?isActive=false&currency=BRL`),
        ]);

        if (!activeResponse.ok || !inactiveResponse.ok) {
          throw new Error(`HTTP error! status: ${activeResponse.status} or ${inactiveResponse.status}`);
        }

        const [activeData, inactiveData] = await Promise.all([
          activeResponse.json(),
          inactiveResponse.json(),
        ]);

        // Combine both arrays
        const allGifts = [
          ...(activeData?.gifts || []),
          ...(inactiveData?.gifts || []),
        ];

        if (allGifts && Array.isArray(allGifts)) {
          // Sort: active first (by value desc), then finished (by most recent wonAt)
          const sorted = [...allGifts].sort((a: GiveawayItem, b: GiveawayItem) => {
            const aActive = a.winner === null;
            const bActive = b.winner === null;
            
            // Active giveaways first
            if (aActive && !bActive) return -1;
            if (!aActive && bActive) return 1;
            
            // Both active: sort by value (highest first)
            if (aActive && bActive) {
              return b.convertedValue - a.convertedValue;
            }
            
            // Both finished: sort by most recently won
            return (b.wonAt ?? 0) - (a.wonAt ?? 0);
          });
          // Show all giveaways (up to 12)
          setGiveaways(sorted.slice(0, 12));
          setLoading(false);
        } else {
          // No data, retry
          if (retryCount < 3) {
            console.log(`No data, retrying... attempt ${retryCount + 1}`);
            setTimeout(() => fetchGiveaways(retryCount + 1), 1000 * (retryCount + 1));
            return;
          }
          setError('Nenhum sorteio encontrado');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error:', err);
        // Retry on network errors
        if (retryCount < 3) {
          console.log(`Network error, retrying... attempt ${retryCount + 1}`);
          setTimeout(() => fetchGiveaways(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }
        setError('Erro ao carregar sorteios');
        setLoading(false);
      }
    };

    fetchGiveaways();
  }, [reloadTick]);

  return (
    <section id="sorteios" className="py-20 md:py-28 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Prêmios Incríveis</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Sorteios <span className="text-primary">Populares</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Confira os sorteios mais populares do momento
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={() => setReloadTick((v) => v + 1)}
              className="btn-gaming-outline mt-6 inline-flex items-center gap-2 text-sm py-3 px-6"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Giveaways Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giveaways.map((giveaway) => {
              const isActive = giveaway.winner === null;
              // Parse color safely
              const colorParts = giveaway.item.color?.split(',').map(Number) || [235, 75, 75];
              const [r, g, b] = colorParts.length >= 3 ? colorParts : [235, 75, 75];
              
              return (
                <div
                  key={giveaway.id}
                  className="card-gaming group overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    {isActive ? (
                      <span className="status-badge-active">Ativo</span>
                    ) : (
                      <span className="status-badge-finished">Finalizado</span>
                    )}
                  </div>

                  {/* Image */}
                  <div 
                    className="relative h-48 flex items-center justify-center mb-4 rounded-lg overflow-hidden bg-background/50"
                    style={{
                      background: `linear-gradient(135deg, rgba(${r},${g},${b},0.2) 0%, rgba(${r},${g},${b},0.05) 100%)`
                    }}
                  >
                    <img
                      src={giveaway.item.image}
                      alt={giveaway.item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallbackApplied === 'true') return;
                        img.dataset.fallbackApplied = 'true';
                        img.src = '/placeholder.svg';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                      {giveaway.item.name}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Valor</span>
                        <span 
                          className="font-bold"
                          style={{ color: `rgb(${r},${g},${b})` }}
                        >
                          {formatCurrency(giveaway.convertedValue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Depósito mínimo</span>
                        <span className="text-sm text-foreground">
                          {formatCurrency(giveaway.convertedMinDepositValue)}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <a
                        href="https://csgo-skins.com/?ref=Paulinho"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gaming-primary w-full text-center block text-xs py-2.5 mt-4"
                      >
                        Participar
                      </a>
                    )}

                    {!isActive && giveaway.winner && (
                      <div className="mt-4 flex items-center gap-2 p-2 rounded-lg bg-background/50">
                        <img
                          src={giveaway.winner.avatar}
                          alt={giveaway.winner.name}
                          className="w-6 h-6 rounded-full"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (img.dataset.fallbackApplied === 'true') return;
                            img.dataset.fallbackApplied = 'true';
                            img.src = '/placeholder.svg';
                          }}
                        />
                        <span className="text-xs text-muted-foreground truncate">
                          Vencedor: {giveaway.winner.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && giveaways.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Nenhum sorteio disponível no momento</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="https://csgo-skins.com/?ref=Paulinho"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gaming-outline inline-flex items-center gap-2 text-sm py-3 px-6"
          >
            <TrendingUp className="w-4 h-4" />
            Ver Todos os Sorteios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Giveaways;
