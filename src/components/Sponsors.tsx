const sponsors = [
  {
    name: 'CSGO Skins',
    logo: 'logo-csgoskins-pq.webp',
    url: 'https://csgo-skins.com/?ref=Paulinho',
  },
  {
    name: 'PirateSwap',
    logo: 'logo-pirateswap.svg',
    url: 'https://pirateswap.com/?ref=paulinho',
  },
];

const Sponsors = () => {
  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Nossos Patrocinadores
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
