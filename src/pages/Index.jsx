import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TripPlannerSection from "@/components/TripPlannerSection"; // Import the new component
import TravelOptions from "@/components/TravelOptions";
import LocationsPreview from "@/components/LocationsPreview";
import PlansSection from "@/components/PlansSection";
import AdvertisementSection from "@/components/AdvertisementSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TripPlannerSection /> {/* Add the new component here */}
      <TravelOptions />
      <LocationsPreview />
      <PlansSection />
      <AdvertisementSection />
      <TestimonialsSection />
      <ContactSection />
      <Chatbot />
    </div>
  );
};

export default Index;