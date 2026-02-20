import { Gift, Copy } from 'lucide-react';
import { useState } from 'react';

const offers = [
  {
    id: 1,
    name: 'CSGO Skins',
    logo: 'https://paulinhoeletric.com/logo-csgoskins-pq.webp',
    bonus: 'R$ 3,00 + 10% de BÔNUS',
    codeLabel: 'CÓDIGO',
    code: 'PAULINHO',
    url: 'https://csgo-skins.com/?ref=Paulinho',
    bgGradient: 'from-primary/20 to-secondary/20',
  },
  {
    id: 2,
    name: 'PirateSwap',
    logo: 'https://paulinhoeletric.com/logo-pirateswap.svg',
    bonus: '35% de BÔNUS',
    codeLabel: 'CUPOM',
    code: 'PAULINHO',
    url: 'https://pirateswap.com/?ref=paulinho',
    bgGradient: 'from-secondary/20 to-primary/20',
  },
];

const Offers = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="ofertas" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bônus Exclusivos</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Ofertas <span className="text-primary">Especiais</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Aproveite os bônus exclusivos dos nossos patrocinadores
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="card-gaming overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgGradient} opacity-50`} />
              
              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={offer.logo}
                    alt={offer.name}
                    className="h-12 w-auto object-contain"
                  />
                </div>

                {/* Bonus Text */}
                <div className="text-center mb-6">
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    {offer.bonus}
                  </p>
                </div>

                {/* Code Box */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    {offer.codeLabel}
                  </p>
                  <button
                    onClick={() => copyCode(offer.id, offer.code)}
                    className="code-box w-full flex items-center justify-center gap-3 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <span>{offer.code}</span>
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedId === offer.id && (
                    <p className="text-xs text-primary text-center mt-2 animate-fade-in">
                      Código copiado!
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <a
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gaming-primary w-full text-center block text-sm py-3"
                >
                  GARANTA SEU BÔNUS E PARTICIPE!
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
