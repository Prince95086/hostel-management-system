import React from "react";
import { 
  FaFan, 
  FaBolt, 
  FaBroom, 
  FaPaintRoller, 
  FaCouch, 
  FaUtensils, 
  FaTint, 
  FaWifi, 
  FaTshirt, 
  FaCog, 
  FaArrowRight 
} from "react-icons/fa";

const AdminOptions = () => {
  const options = [
    { 
      name: "Fan Management", 
      icon: FaFan,
      description: "Control and monitor fan systems",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Electricity", 
      icon: FaBolt,
      description: "Manage power distribution and usage",
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Cleaning", 
      icon: FaBroom,
      description: "Schedule and track cleaning services",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Painting", 
      icon: FaPaintRoller,
      description: "Coordinate maintenance painting",
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Furniture", 
      icon: FaCouch,
      description: "Manage furniture inventory and repairs",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Food Services", 
      icon: FaUtensils,
      description: "Oversee mess and food operations",
       color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Water Supply", 
      icon: FaTint,
      description: "Monitor water distribution systems",
      color: "from-cyan-500 to-blue-500"
    },
    { 
      name: "WiFi Management", 
      icon: FaWifi,
      description: "Manage internet connectivity and networks",
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Laundry Services", 
      icon: FaTshirt,
      description: "Oversee washing machines and laundry",
      color: "from-red-500 to-blue-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full blur-xl opacity-20 animate-bounce"></div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-500">
            <FaCog className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold bg-blue-500  bg-clip-text text-transparent mb-4">
            Admin Control Panel
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage all hostel operations and maintenance services from one centralized dashboard
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 overflow-hidden cursor-pointer"
              onClick={() => alert(`${option.name} option selected`)}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="p-6 relative z-10">
                {/* Icon Container */}
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <option.icon className="text-white text-2xl" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                  {option.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {option.description}
                </p>
                
                {/* Action Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-medium">Manage</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300">
                    <FaArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Animated Bottom Border */}
              <div className={`h-1 bg-gradient-to-r ${option.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 text-sm">Support Available</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-gray-600 text-sm">System Uptime</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">9</div>
              <div className="text-gray-600 text-sm">Services</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">30m</div>
              <div className="text-gray-600 text-sm">Avg Response Time</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Panjab University Hostel Management System • Admin Portal v2.4.1
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOptions;