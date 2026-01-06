import { Link } from "react-router-dom";
import { Film, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8 relative">
        {/* Efecto de luz de proyector */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/20 blur-[100px] rounded-full" />
        <Film className="w-24 h-24 text-gold animate-bounce" />
      </div>

      <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-serif text-white/90 mb-6">
        ¡Corte! Esta escena no existe.
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-10 text-lg">
        Parece que el rollo de película se rompió o la dirección que buscas no está en nuestro archivo.
      </p>

      <Button 
        asChild 
        className="bg-gold text-black hover:bg-gold/90 font-bold px-8 py-6 rounded-full text-lg"
      >
        <Link to="/" className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Volver a la Taquilla
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;