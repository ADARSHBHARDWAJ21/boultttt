import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlanTrip from "./pages/PlanTrip";
import NotFound from "./pages/NotFound";
import DashLayout from "./pages/DashLayout";
import Booking from "./pages/Booking";
import Itinerary from "./pages/Itinerary";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         <Route path="/dashboard/*" element={<DashLayout/>}>

          {/* <Route path="/booking" element={<Booking />} />
          <Route path="/Itinerary" element={<Itinerary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications/>} /> */}

         </Route>

          {/* <Route path="/plan-trip" element={<PlanTrip />} /> */}
        {/* <Route path="/dashlayout" element={<DashboardLayout />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;