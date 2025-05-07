import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import logo from "@/lib/logo2.svg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Temples", path: "#temples" },
    { name: "Virtual Tour", path: "#virtualtour" },
    { name: "Itinerary", path: "#plan" },
    { name: "Experiences", path: "#experiences" },
    { name: "Local Food", path: "#localcuisine" },
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <img 
                src={logo} 
                alt="Khajuraho Heritage Logo" 
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center">
                <span className="text-3xl pt-5 font-['MedievalSharp'] font-bold text-white leading-none hover:text-[#EA7300] tracking-wide">Khajuraho</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 pt-5">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="text-xl relative font-['MedievalSharp'] text-white hover:text-[#EA7300] transition-all duration-300 font-medium px-3 py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EA7300] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#EA7300]/90 hover:text-[#EA7300] hover:bg-[#EA7300]/10 focus:outline-none focus:ring-2 focus:ring-[#EA7300]/20 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 space-y-2 bg-black/50 backdrop-blur-md">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="block px-4 py-2 rounded-lg text-[#EA7300]/90 hover:text-[#EA7300] hover:bg-[#EA7300]/10 transition-all duration-300 font-medium w-full text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
