import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Sidebar from './SideBar'
import Booking from './Booking';
import Itinerary from './Itinerary';
// import DigitalKeys from './DigitalKeys';
// import Budget from './Budget';
import Notifications from './Notifications';
import Profile from './Profile';

function DashLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <Booking />;
      // case 'preferences':
      case 'itinerary':
        return <Itinerary />;
      // case 'digital-keys':
    //   case 'digital-keys':
    //     return <DigitalKeys />;
    //   case 'budget':
    //     return <Budget />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen  from-slate-50 to-blue-50">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashLayout;