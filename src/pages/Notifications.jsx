import React, { useState } from 'react';
import {
  Bell,
  Plane,
  Hotel,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Settings,
  Filter
} from 'lucide-react';

// Removed : React.FC
const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'flight',
      priority: 'high',
      title: 'Flight Delay Alert',
      message: 'Your flight AF123 to Paris has been delayed by 45 minutes. New departure: 11:15 AM',
      timestamp: '5 minutes ago',
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: 'hotel',
      priority: 'medium',
      title: 'Digital Key Ready',
      message: 'Your digital key for Hotel de Louvre is now active. Check-in starts at 3:00 PM.',
      timestamp: '1 hour ago',
      read: false,
      actionRequired: false
    },
    {
      id: 3,
      type: 'reminder',
      priority: 'medium',
      title: 'Check-in Reminder',
      message: 'Don\'t forget to check in for your flight 24 hours before departure (Tomorrow at 10:30 AM).',
      timestamp: '2 hours ago',
      read: true,
      actionRequired: true
    },
    {
      id: 4,
      type: 'activity',
      priority: 'low',
      title: 'Weather Update',
      message: 'Rain expected in Paris tomorrow. Indoor activities recommended for your itinerary.',
      timestamp: '3 hours ago',
      read: true,
      actionRequired: false
    },
    {
      id: 5,
      type: 'budget',
      priority: 'medium',
      title: 'Budget Alert',
      message: 'You\'ve used 70% of your Paris trip budget. $1,020 remaining.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: false
    },
    {
      id: 6,
      type: 'system',
      priority: 'low',
      title: 'Itinerary Updated',
      message: 'AI has optimized your Day 2 itinerary based on weather conditions and traffic.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: false
    }
  ]);

  // Removed type annotation (type: string)
  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight': return Plane;
      case 'hotel': return Hotel;
      case 'reminder': return Clock;
      case 'activity': return MapPin;
      case 'budget': return AlertTriangle;
      case 'system': return Info;
      default: return Bell;
    }
  };

  // Removed type annotations (priority: string, read: boolean)
  const getPriorityColor = (priority, read) => {
    if (read) return 'border-l-gray-300';
    
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-300';
    }
  };

  // Removed type annotation (type: string)
  const getTypeColor = (type) => {
    switch (type) {
      case 'flight': return 'from-blue-500 to-blue-600';
      case 'hotel': return 'from-teal-500 to-teal-600';
      case 'reminder': return 'from-orange-500 to-orange-600';
      case 'activity': return 'from-green-500 to-green-600';
      case 'budget': return 'from-red-500 to-red-600';
      case 'system': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Removed type annotation (id: number)
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Removed type annotation (id: number)
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'action') return notif.actionRequired;
    if (filter !== 'all') return notif.type === filter;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'action', label: 'Action Required' },
    { value: 'flight', label: 'Flights' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'reminder', label: 'Reminders' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with real-time travel alerts and reminders
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button 
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Filter:</span>
          <div className="flex space-x-2 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getTypeIcon(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor(notification.priority, notification.read)} hover:shadow-md transition-all duration-200 ${
                !notification.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(notification.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                            Action Required
                          </span>
                        )}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className={`mb-3 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                        
                        <div className="flex items-center space-x-2">
                          {notification.actionRequired && (
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200">
                              Take Action
                            </button>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600">
            {filter === 'unread' ? "You're all caught up!" : "Try adjusting your filter criteria"}
          </p>
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-medium mb-2">🔔 Real-time Alerts</h3>
            <p className="text-sm opacity-90">Get instant notifications for flight changes and important updates</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-medium mb-2">📧 Email Digest</h3>
            <p className="text-sm opacity-90">Receive daily summaries of your travel schedule and reminders</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-medium mb-2">🤖 Smart Reminders</h3>
            <p className="text-sm opacity-90">AI-powered suggestions for check-ins, bookings, and activities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;