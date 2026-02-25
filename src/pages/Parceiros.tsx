import { Handshake, Copy, ExternalLink, Star, Gift } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const partners = [
  {
    id: 1,
    name: 'CSGO Skins',
    logo: 'logo-csgoskins-pq.webp',
    url: 'https://csgo-skins.com/?ref=Paulinho',
    description: 'Site oficial de skins CS2 com sorteios e promoções exclusivas',
    bonus: 'R$ 3,00 + 10% de BÔNUS',
    code: 'PAULINHO',
    codeLabel: 'CÓDIGO',
    features: ['Sorteios Diários', 'Bônus de Depósito', 'Suporte 24/7'],
    bgColor: 'from-primary/20 to-primary/5',
  },
  {
    id: 2,
    name: 'PirateSwap',
    logo: 'logo-pirateswap.svg',
    url: 'https://pirateswap.com/?ref=paulinho',
    description: 'Troque suas skins com as melhores taxas do mercado',
    bonus: '35% de BÔNUS',
    code: 'PAULINHO',
    codeLabel: 'CUPOM',
    features: ['Melhores Taxas', 'Troca Instantânea', 'Segurança Garantida'],
    bgColor: 'from-secondary/20 to-secondary/5',
  },
];

const Parceiros = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Handshake className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Parceiros Oficiais</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              Nossos <span className="text-primary">Parceiros</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sites confiáveis com bônus exclusivos para nossa comunidade
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Handshake className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary">{partners.length}</div>
              <div className="text-sm text-muted-foreground">Parceiros</div>
            </div>
            
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-black text-green-500">45%</div>
              <div className="text-sm text-muted-foreground">Em Bônus</div>
            </div>
            
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl font-black text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Confiáveis</div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="card-gaming overflow-hidden group"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.bgColor} opacity-50`} />
                
                <div className="relative z-10">
                  {/* Header with Logo */}
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-auto object-contain"
                    />
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Name & Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {partner.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.features.map((feature) => (
                      <span 
                        key={feature} 
                        className="px-3 py-1 text-xs font-medium rounded-full bg-background/50 border border-border text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Bonus Highlight */}
                  <div className="bg-background/50 rounded-lg p-4 mb-6 border border-primary/20">
                    <p className="text-xs text-muted-foreground text-center mb-1">BÔNUS EXCLUSIVO</p>
                    <p className="text-xl md:text-2xl font-bold text-primary text-center">
                      {partner.bonus}
                    </p>
                  </div>

                  {/* Code Box */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      {partner.codeLabel}
                    </p>
                    <button
                      onClick={() => copyCode(partner.id, partner.code)}
                      className="code-box w-full flex items-center justify-center gap-3 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <span className="font-bold">{partner.code}</span>
                      <Copy className="w-4 h-4" />
                    </button>
                    {copiedId === partner.id && (
                      <p className="text-xs text-primary text-center mt-2 animate-fade-in">
                        Código copiado!
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gaming-primary w-full text-center flex items-center justify-center gap-2 py-4"
                  >
                    <Gift className="w-5 h-5" />
                    ACESSAR E GANHAR BÔNUS
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership CTA */}
          <div className="text-center mt-16">
            <div className="card-gaming max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Quer ser nosso parceiro?</h3>
              <p className="text-muted-foreground mb-6">
                Entre em contato para discutir oportunidades de parceria
              </p>
              <a
                href="https://youtube.com/@paulinhoeletric"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gaming-outline inline-flex items-center gap-2"
              >
                <Handshake className="w-5 h-5" />
                Entre em Contato
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Parceiros;
