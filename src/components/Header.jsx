import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex flex-col items-center space-x-2">
          <div className="text-2xl font-bold gradient-text">Go For it</div>
          <div className="text-sm  mx-50px font-bold ">~Aarambh</div>
        </div>
        
        {/* Centered navigation links */}
        <nav className="hidden md:flex items-center space-x-2">
          {/* Changed variant to 'ghost' for consistent styling */}
          <Button variant="ghost" size="sm" asChild>
            <a href="#locations">Destinations</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#plans">Plans</a>
          </Button>
          
          {/* Updated Special Offer Button with solid golden theme color */}
        </nav>

        {/* Right-aligned action buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="#contact">Contact Us</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="/login">Login</a>
          </Button>
          <Button size="sm" className="bg-gradient-hero hover:opacity-90" asChild>
            <a href="/signup">Sign Up</a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;