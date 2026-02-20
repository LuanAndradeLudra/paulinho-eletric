import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { href: '/', label: 'Início', isRoute: true },
    { href: '/parceiros', label: 'Parceiros', isRoute: true },
    { href: '/sorteios', label: 'Sorteios', isRoute: true },
    { href: '/videos', label: 'Vídeos', isRoute: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://yt3.googleusercontent.com/DKsc9A6hBFvLvrxCSpcVjxmvnKKZ1we00wXNqCFX5KOnxOqhmy_BNy07N8GL9GDphq8XKWHi5A=s160-c-k-c0x00ffffff-no-rj"
              alt="Paulinho Eletric"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <span className="text-xl md:text-2xl font-black text-primary">
              PAULINHO
            </span>
            <span className="text-xl md:text-2xl font-black text-foreground">
              ELETRIC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => 
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-colors ${
                    location.pathname === link.href 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* CTA Button */}
          <Link
            to="/sorteios"
            className="hidden md:block btn-gaming-primary text-sm py-2 px-6"
          >
            Participar
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => 
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium py-2 transition-colors ${
                      location.pathname === link.href 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                  >
                    {link.label}
                  </a>
                )
              )}
              <Link
                to="/sorteios"
                onClick={() => setIsMenuOpen(false)}
                className="btn-gaming-primary text-center text-sm py-3"
              >
                Participar
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
