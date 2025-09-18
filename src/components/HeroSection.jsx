import { Button } from "@/components/ui/button";
import { Plane, MapPin, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-travel-ocean/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-travel-sunset/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-travel-forest/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">TRAVEL</span>
            <br />
            <span className="gradient-text">EFFICIENTLY</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the world with smart planning, exclusive deals, and personalized experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 animate-glow">
              <Plane className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="border-travel-ocean hover:bg-travel-ocean/10">
              <MapPin className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-muted-foreground">
              <MapPin className="h-6 w-6 text-travel-ocean" />
              <span>200+ Destinations</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-muted-foreground">
              <Clock className="h-6 w-6 text-travel-sunset" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-muted-foreground">
              <Plane className="h-6 w-6 text-travel-forest" />
              <span>Instant Booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;