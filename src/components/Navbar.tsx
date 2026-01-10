import { Search, Menu, X, Coffee, Film } from "lucide-react";
import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Películas", href: "/peliculas" },
  { label: "Directores", href: "/directores" },
  { label: "Épocas", href: "/epocas" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/peliculas?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          {/* LOGO CON EFECTO DE GIRO 360 */}
          <Link to="/" className="flex items-center gap-2 group z-50 shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 overflow-hidden transition-transform duration-500 group-hover:scale-110">
              {/* Aquí está el cambio: group-hover:rotate-[360deg] */}
              <Film className="w-5 h-5 text-gold relative z-10 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
              <div className="absolute inset-0 bg-gold/20 blur-xl group-hover:bg-gold/40 transition-all duration-500" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight hidden sm:block">
              Cine<span className="text-gold">Cuba</span>
            </span>
            <span className="text-xl font-serif font-bold text-white tracking-tight sm:hidden">
              <span className="text-gold">CC</span>
            </span>
          </Link>

          {/* ESCRITORIO: Enlaces Centrales */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`
                  px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300
                  ${isActive(link.href) 
                    ? "bg-gold/20 text-gold" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* HERRAMIENTAS (Buscador + Donación + Menú Móvil) */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Botón Abrir Buscador */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`
                p-2 rounded-full transition-colors
                ${isSearchOpen ? "text-gold bg-gold/10" : "text-muted-foreground hover:text-white hover:bg-white/10"}
              `}
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Botón Donación (Visible en escritorio) */}
            <a
              href="https://buymeacoffee.com/enriquedesv" // ⚠️ Tu enlace aquí
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-full text-xs font-bold hover:bg-gold/90 transition-transform hover:scale-105"
            >
              <Coffee className="w-4 h-4" />
              <span>Apoyar</span>
            </a>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA DESPLEGABLE */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out border-b border-white/5 bg-black/50
            ${isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="container mx-auto px-6 py-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar película, director o año..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
              />
            </form>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL (Overlay) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6 animate-in fade-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`
                  py-4 px-4 text-lg font-medium border-b border-white/5 transition-colors
                  ${isActive(link.href) ? "text-gold" : "text-white/80"}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Opción de donar en móvil */}
            <a 
              href="https://buymeacoffee.com/enriquedesv"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 py-3 px-4 flex items-center justify-center gap-2 bg-gold/10 text-gold rounded-lg font-bold border border-gold/20 hover:bg-gold/20 transition-colors"
            >
              <Coffee className="w-5 h-5" />
              Invítanos a un café
            </a>
          </div>
        </div>
      )}
    </>
  );
};