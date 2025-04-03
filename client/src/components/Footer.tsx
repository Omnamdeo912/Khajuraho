import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, this would call an API to subscribe the user
      console.log("Subscribing email:", email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Khajuraho Heritage</h3>
            <p className="text-gray-400 mb-6">
              Explore the UNESCO World Heritage site that showcases the architectural marvel of medieval India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Khajuraho
                </a>
              </li>
              <li>
                <a href="#temples" className="text-gray-400 hover:text-white transition-colors">
                  Temple Groups
                </a>
              </li>
              <li>
                <a href="#plan" className="text-gray-400 hover:text-white transition-colors">
                  Plan Your Visit
                </a>
              </li>
              <li>
                <a href="#safety" className="text-gray-400 hover:text-white transition-colors">
                  Travel Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Conservation Efforts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Photo Gallery
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Travel Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Accommodation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Transportation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Guided Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Nearby Attractions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div id="contact">
            <h4 className="text-lg font-medium mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary h-4 w-4" />
                <span className="text-gray-400">
                  Tourist Office, Khajuraho, Madhya Pradesh, 471606, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary h-4 w-4" />
                <span className="text-gray-400">+91 7686-272741</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary h-4 w-4" />
                <span className="text-gray-400">info@khajuraho-tourism.in</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Subscribe to Newsletter</h5>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 py-2 px-3 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-r-md transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Khajuraho Tourism. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
              Accessibility
            </a>
          </div>
          <p className="mt-4">This website is maintained by the Madhya Pradesh Tourism Board</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
