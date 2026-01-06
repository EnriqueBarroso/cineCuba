import { Link } from "react-router-dom";
import { Heart, Mail, Github, Twitter, Instagram, Coffee } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* COLUMNA 1: MARCA Y MISIÓN */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="font-serif text-2xl font-bold tracking-tight block text-white">
              Cine<span className="text-gold">Cuba</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Preservando la memoria audiovisual de Cuba. Un archivo digital gratuito, sin fines de lucro, dedicado a difundir nuestra historia cinematográfica.
            </p>
            
            <div className="pt-2">
              <a 
                href="https://www.buymeacoffee.com/" // ⚠️ RECUERDA: Poner tu URL real aquí
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FFDD00] text-black px-5 py-3 rounded-full font-bold hover:bg-[#FFDD00]/90 transition-transform hover:scale-105 shadow-lg"
              >
                <Coffee className="w-5 h-5" />
                <span>Invítanos a un café</span>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: EXPLORAR */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs">Explorar</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/peliculas" className="hover:text-gold transition-colors">Catálogo Completo</Link></li>
              <li><Link to="/directores" className="hover:text-gold transition-colors">Directores</Link></li>
              <li><Link to="/#catalogo" className="hover:text-gold transition-colors">Por Décadas</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL Y CONTACTO */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs">Información</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/acerca" className="hover:text-gold transition-colors">Sobre CineCuba</Link></li>
              <li><Link to="/privacidad" className="hover:text-gold transition-colors">Política de Privacidad</Link></li>
              <li>
                <a href="mailto:contacto@cinecuba.com" className="hover:text-gold transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> contacto@cinecuba.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} CineCuba. Hecho con <Heart className="w-3 h-3 inline text-red-500 mx-1" /> por y para cubanos.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://github.com/enriquebarroso/cinecuba" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};