import { Check, Cloud, Map, User, Shield, Info, Ambulance } from "lucide-react";

const SafetyTips = () => {
  return (
    <section id="safety" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Safety & Travel Tips</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Essential advice to ensure a comfortable and safe visit to Khajuraho.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Safety for Women */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-terracotta-light p-5">
              <h3 className="font-display text-white font-bold text-xl flex items-center">
                <User className="mr-3 h-5 w-5" /> Women Travelers
              </h3>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-terracotta mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Khajuraho is generally safe for women travelers, but it's advisable to avoid isolated areas after dark
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-terracotta mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Consider hiring a female guide when exploring temple complexes for added comfort
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-terracotta mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Dress modestly when visiting temples and local villages
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-terracotta mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Use pre-paid taxis or arrange transportation through your hotel
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-terracotta mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Women-specific restrooms are available at major temple complexes and tourist facilities
                  </span>
                </li>
              </ul>
              <div className="mt-5 p-3 bg-background rounded-md">
                <p className="text-xs text-gray-600">
                  <strong>Emergency Contact:</strong> Women's Helpline - 1090 or 112
                </p>
              </div>
            </div>
          </div>
          
          {/* Seasonal Tips */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary p-5">
              <h3 className="font-display text-white font-bold text-xl flex items-center">
                <Cloud className="mr-3 h-5 w-5" /> Seasonal Tips
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-lg mb-2">Winter (Oct-Feb)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    The ideal time to visit with pleasant temperatures (10-25°C)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Light jacket for evenings
                    </span>
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Sun protection
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-lg mb-2">Summer (Mar-Jun)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Very hot with temperatures reaching 45°C
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Visit early morning
                    </span>
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Stay hydrated
                    </span>
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Sun protection essential
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Monsoon (Jul-Sep)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Moderate rainfall with humid conditions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Umbrella/raincoat
                    </span>
                    <span className="bg-background text-primary/90 text-xs py-1 px-2 rounded-full">
                      Insect repellent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* General Exploration Tips */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary p-5">
              <h3 className="font-display text-white font-bold text-xl flex items-center">
                <Map className="mr-3 h-5 w-5" /> Exploration Tips
              </h3>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Wear comfortable footwear as you'll be walking on uneven surfaces
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Hire a licensed guide to understand the historical and cultural context
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Carry cash as ATMs are limited and card payments aren't widely accepted
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Photography is allowed, but no tripods without permission
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Start early to avoid crowds and afternoon heat
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700 text-sm">
                    Book accommodations in advance during peak season (Oct-Feb)
                  </span>
                </li>
              </ul>
              <div className="mt-5 p-3 bg-background rounded-md">
                <p className="text-xs text-gray-600">
                  <strong>Important:</strong> Remember to respect the religious significance of the temples
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-display font-bold text-xl mb-4">Emergency Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <Ambulance className="text-red-600 h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-lg mb-1">Medical Emergency</h4>
                <p className="text-sm text-gray-600">108 - Ambulance</p>
                <p className="text-sm text-gray-600">District Hospital: 07686-274444</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Shield className="text-blue-600 h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-lg mb-1">Police</h4>
                <p className="text-sm text-gray-600">112 - Emergency</p>
                <p className="text-sm text-gray-600">Police Station: 07686-272030</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Info className="text-green-600 h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-lg mb-1">Tourist Information</h4>
                <p className="text-sm text-gray-600">Tourist Office: 07686-272741</p>
                <p className="text-sm text-gray-600">ASI Office: 07686-272320</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;
