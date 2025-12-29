import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Hero } from "@/components/home/Hero";
import { MovieGrid } from "@/components/MovieGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <MovieGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
