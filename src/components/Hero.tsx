import { Sparkles, Trophy } from 'lucide-react';
import channelProfile from '@/assets/channel-profile.jpg';

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary glow-yellow mx-auto">
                <img 
                  src={channelProfile} 
                  alt="Paulinho Eletric" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sorteios Exclusivos CS2</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            CONCORRA A{' '}
            <span className="text-primary">SKINS INCRÍVEIS</span>
            {' '}AQUI
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Participe dos sorteios e tenha a chance de ganhar skins exclusivas de CS2. 
            Junte-se à nossa comunidade e boa sorte!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#ofertas" className="btn-gaming-primary flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              Começar Agora
            </a>
            <a href="#sorteios" className="btn-gaming-outline flex items-center justify-center gap-2">
              Ver Sorteios
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Sorteios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-primary">R$ 100K+</div>
              <div className="text-sm text-muted-foreground">Em Prêmios</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
