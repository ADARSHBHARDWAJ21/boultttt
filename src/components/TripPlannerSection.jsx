import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Send, Sparkles, Compass, Gem, PlusCircle, MapPin, Clock, Plane, Hotel, Edit, Calendar, Users, Utensils, Camera, MountainSnow, FerrisWheel, Briefcase, ShoppingCart, Drama
} from "lucide-react";

// --- Mock Data for Itinerary Generation ---

const destinationsData = {
    "rajasthan": {
        name: "Royal Rajasthan",
        sightseeing: ["City Palace", "Amber Fort", "Hawa Mahal", "Mehrangarh Fort", "Jaisalmer Fort"],
        dining: ["Spice Court", "Chokhi Dhani", "Laxmi Misthan Bhandar", "Gypsy Dining Hall"],
        activities: ["Desert Safari", "Hot Air Ballooning", "Ziplining at Mehrangarh", "Puppet Show"],
        shopping: ["Johari Bazaar", "Bapu Bazaar", "Sadar Bazaar"]
    },
    "kerala": {
        name: "Kerala Backwaters & Hills",
        sightseeing: ["Fort Kochi", "Chinese Fishing Nets", "Munnar Tea Gardens", "Periyar National Park"],
        dining: ["Kashi Art Cafe", "Dal Roti", "The Rice Boat", "Saravana Bhavan"],
        activities: ["Backwater Houseboat Cruise", "Kathakali Performance", "Spice Plantation Tour", "Ayurvedic Massage"],
        shopping: ["Lulu Mall", "Jew Town", "Local Spice Markets"]
    },
    "goa": {
        name: "Goa Beach Paradise",
        sightseeing: ["Basilica of Bom Jesus", "Fort Aguada", "Dudhsagar Falls"],
        dining: ["Britto's", "Thalassa", "Martin's Corner", "Fisherman's Wharf"],
        activities: ["Water Sports at Baga", "Dolphin Sighting Trip", "Scuba Diving", "Visit a Spice Farm"],
        shopping: ["Anjuna Flea Market", "Calangute Market Square"]
    },
    "default": {
        name: "Awesome Trip",
        sightseeing: ["Historic Landmark", "Famous Museum", "Scenic Viewpoint", "Botanical Gardens"],
        dining: ["Top Rated Local Restaurant", "Quaint Cafe", "Fine Dining Experience", "Street Food Tour"],
        activities: ["Guided City Tour", "Cooking Class", "River Cruise", "Hiking Trail"],
        shopping: ["Main Shopping Street", "Local Artisan Market"]
    }
};

const activityIcons = {
    transport: { icon: Plane, color: "text-blue-400" },
    accommodation: { icon: Hotel, color: "text-purple-400" },
    sightseeing: { icon: Camera, color: "text-pink-400" },
    dining: { icon: Utensils, color: "text-orange-400" },
    activity: { icon: FerrisWheel, color: "text-teal-400" },
    shopping: { icon: ShoppingCart, color: "text-yellow-400" },
    entertainment: { icon: Drama, color: "text-red-400" },
    default: { icon: MapPin, color: "text-gray-400" },
};

// --- Helper Functions ---

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const TripPlannerSection = () => {
  const [activeTab, setActiveTab] = useState("planner");
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isEditingItinerary, setIsEditingItinerary] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    duration: "",
    budget: "",
    travelers: "",
    preferences: ""
  });

  const generateItinerary = () => {
    const duration = parseInt(tripDetails.duration.split(' ')[0], 10);
    if (!duration || !tripDetails.destination) return;

    const destinationKey = Object.keys(destinationsData).find(key => 
        tripDetails.destination.toLowerCase().includes(key)
    ) || 'default';
    
    const data = destinationsData[destinationKey];

    const days = Array.from({ length: duration }, (_, i) => {
        const dayActivities = [];
        
        // Morning Activity (Sightseeing) - Allow repetition for longer trips
        const sightseeing = getRandomElement(data.sightseeing);
        dayActivities.push({ time: "10:00 AM", title: `Visit ${sightseeing}`, type: "sightseeing", location: `${tripDetails.destination} Center` });

        // Lunch - Allow repetition
        const dining = getRandomElement(data.dining);
        dayActivities.push({ time: "1:00 PM", title: `Lunch at ${dining}`, type: "dining", location: `Near ${sightseeing}` });

        // Afternoon Activity - Allow repetition
        const activity = getRandomElement(data.activities);
        dayActivities.push({ time: "3:00 PM", title: activity, type: "activity", location: `Varies` });
        
        // Evening
        dayActivities.push({ time: "7:00 PM", title: `Dinner & Evening at Leisure`, type: "dining", location: `Hotel Area` });

        return {
            day: i + 1,
            city: tripDetails.destination,
            activities: dayActivities
        };
    });

    const itinerary = {
        destination: data.name,
        duration: tripDetails.duration,
        budget: tripDetails.budget,
        days,
        flights: [
            { type: "morning", time: "6:00 AM", price: "₹8,000" },
            { type: "afternoon", time: "2:00 PM", price: "₹7,000" },
            { type: "evening", time: "8:00 PM", price: "₹6,500" }
        ],
        hotels: [
            { type: "budget", name: "Comfort Inn", price: "₹2,500/night", rating: 3.5 },
            { type: "mid-range", name: "Grand Hotel", price: "₹5,500/night", rating: 4.0 },
            { type: "luxury", name: "Palace Resort", price: "₹10,000/night", rating: 4.7 }
        ]
    };
    
    setGeneratedItinerary(itinerary);
  };

  const ItineraryEditor = () => (
    <Dialog open={isEditingItinerary} onOpenChange={setIsEditingItinerary}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Itinerary</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Your Flight Preference</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedItinerary?.flights.map((flight, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{flight.type}</span>
                      <Plane className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Departure: {flight.time}</p>
                    <p className="text-lg font-bold text-blue-600">{flight.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hotels" className="space-y-4">
            <h3 className="text-lg font-semibold">Select Your Accommodation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedItinerary?.hotels.map((hotel, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{hotel.name}</span>
                      <Hotel className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{hotel.type} Category</p>
                    <p className="text-sm">Rating: {hotel.rating}/5</p>
                    <p className="text-lg font-bold text-green-600">{hotel.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-4">
            <h3 className="text-lg font-semibold">Customize Your Activities</h3>
            {generatedItinerary?.days.map((day, dayIndex) => (
              <Card key={dayIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">Day {day.day} - {day.city}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{activity.time}</span>
                          <span>{activity.title}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsEditingItinerary(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditingItinerary(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section id="trip-planner" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Hey, I'm your personal{" "}
            <span className="gradient-text">Trip Planner</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell me what you want, and I'll handle the rest. Flights, Hotels,
            Trip Planner - all in seconds.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
            <TabsTrigger value="nature">Hidden Gems</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-8">
            {!generatedItinerary ? (
              <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Plan Your Perfect Trip</CardTitle>
                  <CardDescription>Fill in the details below to get a customized itinerary.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        placeholder="e.g., Goa, Rajasthan"
                        value={tripDetails.destination}
                        onChange={(e) => setTripDetails({...tripDetails, destination: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={tripDetails.duration} onValueChange={(value) => setTripDetails({...tripDetails, duration: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2 days">2 Days</SelectItem>
                          <SelectItem value="3 days">3 Days</SelectItem>
                          <SelectItem value="4 days">4 Days</SelectItem>
                          <SelectItem value="5 days">5 Days</SelectItem>
                          <SelectItem value="7 days">7 Days</SelectItem>
                          <SelectItem value="10 days">10 Days</SelectItem>
                          <SelectItem value="14 days">14 Days</SelectItem>
                          <SelectItem value="20 days">20 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={tripDetails.budget} onValueChange={(value) => setTripDetails({...tripDetails, budget: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="₹15,000 - ₹30,000">₹15,000 - ₹30,000</SelectItem>
                          <SelectItem value="₹30,000 - ₹60,000">₹30,000 - ₹60,000</SelectItem>
                          <SelectItem value="₹60,000 - ₹1,00,000">₹60,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="₹1,00,000+">₹1,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <Select value={tripDetails.travelers} onValueChange={(value) => setTripDetails({...tripDetails, travelers: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo</SelectItem>
                          <SelectItem value="2">Couple</SelectItem>
                          <SelectItem value="3-4">Small Group (3-4)</SelectItem>
                          <SelectItem value="5+">Large Group (5+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="preferences">Special Preferences</Label>
                    <Textarea
                      id="preferences"
                      placeholder="e.g., interested in history, prefer spicy food, etc."
                      value={tripDetails.preferences}
                      onChange={(e) => setTripDetails({...tripDetails, preferences: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={generateItinerary} 
                    className="w-full bg-gradient-hero hover:opacity-90"
                    disabled={!tripDetails.destination || !tripDetails.duration}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate AI Itinerary
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{generatedItinerary.destination}</h3>
                    <p className="text-muted-foreground">{generatedItinerary.duration} • {generatedItinerary.budget}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setIsEditingItinerary(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Itinerary
                    </Button>
                    <Button onClick={() => setGeneratedItinerary(null)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Trip
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {generatedItinerary.days.map((day, dayIndex) => (
                      <Card key={dayIndex} className="bg-card/50 border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-primary">
                            <Calendar className="w-5 h-5" />
                            <span>Day {day.day}</span>
                          </CardTitle>
                          <CardDescription>{day.city}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="relative pl-6">
                            {/* Timeline Line */}
                            <div className="absolute left-0 top-0 h-full w-0.5 bg-border/30 ml-[7px]"></div>
                            
                            {day.activities.map((activity, actIndex) => {
                                const { icon: Icon, color } = activityIcons[activity.type] || activityIcons.default;
                                return (
                                  <div key={actIndex} className="relative flex items-start space-x-4 mb-6">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center -translate-x-1/2">
                                        <div className="h-full w-full rounded-full bg-background border-2 border-primary"></div>
                                    </div>
                                    <div className="pt-1.5">
                                      <p className="text-sm font-semibold text-muted-foreground">{activity.time}</p>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`w-4 h-4 ${color}`} />
                                            <p className="font-semibold text-foreground">{activity.title}</p>
                                        </div>
                                      <p className="text-sm text-muted-foreground mt-1 ml-6">{activity.location}</p>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Card className="bg-card/50 border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Plane className="mr-2 h-4 w-4" />
                          Book Flights
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Hotel className="mr-2 h-4 w-4" />
                          Reserve Hotels
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Briefcase className="mr-2 h-4 w-4" />
                          Add Activities
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">Trip Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{generatedItinerary.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Budget:</span>
                          <span className="font-medium">{generatedItinerary.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Travelers:</span>
                          <span className="font-medium">{tripDetails.travelers}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Other Tabs remain the same */}

        </Tabs>
        <ItineraryEditor />
      </div>
    </section>
  );
};

export default TripPlannerSection;
