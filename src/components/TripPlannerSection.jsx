import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Send, Sparkles, Compass, Gem, PlusCircle, MapPin, Clock, Plane, Hotel, Edit, Calendar, Users } from "lucide-react";

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

  // Sample itinerary data for different destinations
  const sampleItineraries = {
    "rajasthan": {
      destination: "Rajasthan Royal Circuit",
      duration: "7 days",
      budget: "₹45,000",
      days: [
        {
          day: 1,
          city: "Jaipur",
          activities: [
            { time: "10:00 AM", activity: "Arrival at Jaipur Airport", type: "transport" },
            { time: "12:00 PM", activity: "Check-in at Hotel", type: "accommodation" },
            { time: "3:00 PM", activity: "City Palace Visit", type: "sightseeing" },
            { time: "6:00 PM", activity: "Local Market Exploration", type: "shopping" }
          ]
        },
        {
          day: 2,
          city: "Jaipur",
          activities: [
            { time: "8:00 AM", activity: "Amber Fort Visit", type: "sightseeing" },
            { time: "12:00 PM", activity: "Traditional Rajasthani Lunch", type: "dining" },
            { time: "3:00 PM", activity: "Hawa Mahal Photography", type: "sightseeing" },
            { time: "7:00 PM", activity: "Cultural Show & Dinner", type: "entertainment" }
          ]
        }
      ],
      flights: [
        { type: "morning", time: "6:00 AM", price: "₹8,500" },
        { type: "afternoon", time: "2:00 PM", price: "₹7,200" },
        { type: "evening", time: "8:00 PM", price: "₹6,800" }
      ],
      hotels: [
        { type: "budget", name: "Heritage Inn", price: "₹2,500/night", rating: 3.5 },
        { type: "mid-range", name: "Royal Palace Hotel", price: "₹5,500/night", rating: 4.2 },
        { type: "luxury", name: "Taj Rambagh Palace", price: "₹12,000/night", rating: 4.8 }
      ]
    },
    "kerala": {
      destination: "Kerala Backwaters & Hills",
      duration: "6 days",
      budget: "₹38,000",
      days: [
        {
          day: 1,
          city: "Kochi",
          activities: [
            { time: "11:00 AM", activity: "Arrival at Kochi Airport", type: "transport" },
            { time: "1:00 PM", activity: "Hotel Check-in", type: "accommodation" },
            { time: "4:00 PM", activity: "Fort Kochi Heritage Walk", type: "sightseeing" },
            { time: "7:00 PM", activity: "Sunset at Chinese Fishing Nets", type: "sightseeing" }
          ]
        },
        {
          day: 2,
          city: "Alleppey",
          activities: [
            { time: "9:00 AM", activity: "Drive to Alleppey", type: "transport" },
            { time: "12:00 PM", activity: "Houseboat Check-in", type: "accommodation" },
            { time: "2:00 PM", activity: "Backwater Cruise", type: "activity" },
            { time: "7:00 PM", activity: "Traditional Kerala Dinner", type: "dining" }
          ]
        }
      ],
      flights: [
        { type: "morning", time: "7:30 AM", price: "₹9,200" },
        { type: "afternoon", time: "1:30 PM", price: "₹8,100" },
        { type: "evening", time: "9:30 PM", price: "₹7,500" }
      ],
      hotels: [
        { type: "budget", name: "Backwater Retreat", price: "₹2,800/night", rating: 3.8 },
        { type: "mid-range", name: "Lake Palace Resort", price: "₹6,200/night", rating: 4.3 },
        { type: "luxury", name: "Kumarakom Lake Resort", price: "₹15,000/night", rating: 4.9 }
      ]
    }
  };

  // Inspire destinations data
  const inspireDestinations = {
    cultural: [
      {
        name: "Golden Triangle",
        image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg",
        duration: "7-10 days",
        highlights: ["Taj Mahal", "Red Fort", "Hawa Mahal", "City Palace"],
        price: "₹35,000 - ₹85,000"
      },
      {
        name: "Rajasthan Heritage",
        image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",
        duration: "10-14 days",
        highlights: ["Udaipur Lakes", "Jaisalmer Desert", "Jodhpur Blue City"],
        price: "₹45,000 - ₹1,20,000"
      },
      {
        name: "South India Temples",
        image: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg",
        duration: "8-12 days",
        highlights: ["Meenakshi Temple", "Brihadeeswarar Temple", "Hampi Ruins"],
        price: "₹32,000 - ₹75,000"
      }
    ],
    adventure: [
      {
        name: "Rishikesh Adventure",
        image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",
        duration: "4-7 days",
        highlights: ["River Rafting", "Bungee Jumping", "Yoga Retreats", "Trekking"],
        price: "₹18,000 - ₹45,000"
      },
      {
        name: "Goa Water Sports",
        image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
        duration: "5-8 days",
        highlights: ["Parasailing", "Jet Skiing", "Scuba Diving", "Beach Camping"],
        price: "₹25,000 - ₹60,000"
      },
      {
        name: "Uttarakhand Trekking",
        image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
        duration: "6-10 days",
        highlights: ["Valley of Flowers", "Kedarnath Trek", "Roopkund Trek"],
        price: "₹22,000 - ₹55,000"
      },
      {
        name: "Himachal Adventure",
        image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
        duration: "7-12 days",
        highlights: ["Manali Paragliding", "Spiti Valley", "Solang Valley"],
        price: "₹28,000 - ₹70,000"
      }
    ],
    nature: [
      {
        name: "Bandhavgarh National Park",
        image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
        duration: "4-6 days",
        highlights: ["Tiger Safari", "Wildlife Photography", "Nature Walks"],
        price: "₹20,000 - ₹50,000"
      },
      {
        name: "Kanha National Park",
        image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
        duration: "5-7 days",
        highlights: ["Barasingha Spotting", "Jungle Safari", "Bird Watching"],
        price: "₹22,000 - ₹55,000"
      },
      {
        name: "Sundarbans Mangroves",
        image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
        duration: "4-6 days",
        highlights: ["Royal Bengal Tiger", "Boat Safari", "Mangrove Ecosystem"],
        price: "₹18,000 - ₹42,000"
      },
      {
        name: "Western Ghats",
        image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
        duration: "6-9 days",
        highlights: ["Biodiversity Hotspot", "Waterfalls", "Hill Stations"],
        price: "₹25,000 - ₹65,000"
      }
    ]
  };

  const generateItinerary = () => {
    // Simple logic to generate itinerary based on destination
    const destination = tripDetails.destination.toLowerCase();
    let itinerary = null;

    if (destination.includes("rajasthan") || destination.includes("jaipur")) {
      itinerary = sampleItineraries.rajasthan;
    } else if (destination.includes("kerala") || destination.includes("kochi")) {
      itinerary = sampleItineraries.kerala;
    } else {
      // Default itinerary
      itinerary = {
        destination: tripDetails.destination,
        duration: tripDetails.duration,
        budget: tripDetails.budget,
        days: [
          {
            day: 1,
            city: tripDetails.destination,
            activities: [
              { time: "10:00 AM", activity: "Arrival and Check-in", type: "transport" },
              { time: "2:00 PM", activity: "Local Sightseeing", type: "sightseeing" },
              { time: "7:00 PM", activity: "Welcome Dinner", type: "dining" }
            ]
          }
        ],
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
    }

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
                      <div key={actIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{activity.time}</span>
                          <span>{activity.activity}</span>
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

  const DestinationCard = ({ destination, category }) => (
    <Card className="group cursor-pointer overflow-hidden bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
          {destination.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-1">
            {destination.highlights.slice(0, 2).map((highlight, index) => (
              <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {highlight}
              </span>
            ))}
            {destination.highlights.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{destination.highlights.length - 2} more
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{destination.price}</span>
          <Button 
            size="sm" 
            onClick={() => {
              setTripDetails({
                destination: destination.name,
                duration: destination.duration.split('-')[0].trim(),
                budget: destination.price.split(' - ')[0],
                travelers: "2",
                preferences: category
              });
              generateItinerary();
              setActiveTab("planner");
            }}
          >
            Plan Trip
          </Button>
        </div>
      </CardContent>
    </Card>
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
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Plan Your Perfect Trip</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        placeholder="Where do you want to go?"
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
                          <SelectItem value="4 days">4 Days</SelectItem>
                          <SelectItem value="5 days">5 Days</SelectItem>
                          <SelectItem value="7 days">7 Days</SelectItem>
                          <SelectItem value="10 days">10 Days</SelectItem>
                          <SelectItem value="14 days">14 Days</SelectItem>
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
                      placeholder="Tell us about your interests, dietary requirements, accessibility needs, etc."
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
                    {generatedItinerary.days.map((day, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>Day {day.day} - {day.city}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {day.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-sm">{activity.time}</span>
                                <span className="flex-1">{activity.activity}</span>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">
                                  {activity.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Card>
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
                          <MapPin className="mr-2 h-4 w-4" />
                          Add Activities
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
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

          <TabsContent value="cultural" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Cultural Destinations</h3>
              <p className="text-muted-foreground">Explore India's rich heritage and cultural treasures</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inspireDestinations.cultural.map((destination, index) => (
                <DestinationCard key={index} destination={destination} category="cultural" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="adventure" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Adventure Destinations</h3>
              <p className="text-muted-foreground">Thrilling experiences for the adventurous soul</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inspireDestinations.adventure.map((destination, index) => (
                <DestinationCard key={index} destination={destination} category="adventure" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nature" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Hidden Natural Gems</h3>
              <p className="text-muted-foreground">Discover India's pristine natural wonders</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inspireDestinations.nature.map((destination, index) => (
                <DestinationCard key={index} destination={destination} category="nature" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ItineraryEditor />
      </div>
    </section>
  );
};

export default TripPlannerSection;