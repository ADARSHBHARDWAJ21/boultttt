import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Compass, Gem, PlusCircle } from "lucide-react";

const TripPlannerSection = () => {
  return (
    <section id="trip-planner" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Hey, I'm your personal{" "}
          <span className="gradient-text">Trip Planner</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Tell me what you want, and I'll handle the rest. Flights, Hotels,
          Trip Planner - all in seconds.
        </p>

        <div className="relative max-w-2xl mx-auto mb-6">
          <Textarea
            placeholder="Create a trip to Paris from New York..."
            className="w-full h-40 p-4 pr-16 text-base rounded-xl border-border/50 focus-visible:ring-primary/50"
          />
          <Button
            size="icon"
            className="absolute bottom-4 right-4 bg-travel-sunset hover:bg-travel-sunset/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            className="border-border/50 hover:bg-secondary"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Trip
          </Button>
          <Button
            variant="outline"
            className="border-border/50 hover:bg-secondary"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Inspire me where to go
          </Button>
          <Button
            variant="outline"
            className="border-border/50 hover:bg-secondary"
          >
            <Gem className="mr-2 h-4 w-4" />
            Discover Hidden gems
          </Button>
          <Button
            variant="outline"
            className="border-border/50 hover:bg-secondary"
          >
            <Compass className="mr-2 h-4 w-4" />
            Adventure Destination
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;