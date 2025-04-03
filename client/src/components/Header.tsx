import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const menuItems = [
    { href: "#temples", label: "Temples" },
    { href: "#virtualtour", label: "Virtual Tours" },
    { href: "#plan", label: "Plan Your Visit" },
    { href: "#experiences", label: "Experiences" },
    { href: "#safety", label: "Tips & Safety" },
    { href: "#contact", label: "Contact", buttonStyle: true }
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 py-3 lg:py-0">
          <Link href="/">
            <a className="flex items-center">
              <span className="text-2xl font-display font-bold text-sandstone">Khajuraho</span>
              <span className="ml-1 text-sm text-terracotta">Heritage</span>
            </a>
          </Link>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-600 hover:text-sandstone focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`${
                  item.buttonStyle
                    ? "py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    : "py-5 px-3 hover:text-primary transition-colors font-medium"
                } ${isActive(item.href) ? "text-primary" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <nav className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} flex flex-col py-2 space-y-2 px-4`}>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`py-2 hover:text-primary transition-colors ${
                isActive(item.href) ? "text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
