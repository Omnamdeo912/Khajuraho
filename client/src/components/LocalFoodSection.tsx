import { getImageUrl } from "@/lib/utils";
import { Star, DollarSign, Utensils } from "lucide-react";

interface LocalFood {
  id: number;
  name: string;
  description: string;
  image: string;
  tag: string;
}

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  cuisine: string;
  priceRange: string;
}

const localFoods: LocalFood[] = [
  {
    id: 1,
    name: "Bundeli Kadhi",
    description: "A yogurt-based curry flavored with gram flour and local spices, served with rice.",
    image: "cuisine-1",
    tag: "Must try!"
  },
  {
    id: 2,
    name: "Ras Roti",
    description: "Traditional wheat bread served with a sweet and spicy sauce made from seasonal ingredients.",
    image: "cuisine-2",
    tag: "Local favorite"
  },
  {
    id: 3,
    name: "Malpua",
    description: "Sweet pancakes made from a fermented batter, deep-fried and soaked in sugar syrup.",
    image: "cuisine-3",
    tag: "Popular dessert"
  },
  {
    id: 4,
    name: "Bhate Ka Raita",
    description: "Roasted and mashed eggplant mixed with yogurt and spices, served as a side dish.",
    image: "cuisine-4",
    tag: "Refreshing side"
  }
];

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Raja Café",
    rating: 4.5,
    reviews: 120,
    description: "Located near the Western Group of temples with a garden seating area and views of the temples.",
    cuisine: "Indian, Continental",
    priceRange: "₹₹"
  },
  {
    id: 2,
    name: "Mediterraneo",
    rating: 4.0,
    reviews: 85,
    description: "Popular restaurant serving Italian and Mediterranean cuisine along with local specialties.",
    cuisine: "Italian, Indian",
    priceRange: "₹₹₹"
  },
  {
    id: 3,
    name: "Madras Coffee House",
    rating: 4.0,
    reviews: 92,
    description: "South Indian cuisine in a casual setting, perfect for breakfast or a light meal.",
    cuisine: "South Indian",
    priceRange: "₹"
  }
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="fill-current h-3 w-3" />
      ))}
      {hasHalfStar && <Star className="fill-current h-3 w-3 half-star" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />
      ))}
    </div>
  );
};

const LocalFoodSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Local Cuisine</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Savor the authentic flavors of Bundelkhand region during your stay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localFoods.map((food) => (
                <div key={food.id} className="flex bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="w-1/3">
                    <img 
                      src={getImageUrl(food.image)} 
                      alt={food.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="font-display font-bold text-lg mb-1">{food.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{food.description}</p>
                    <span className="text-xs font-medium text-primary/90">{food.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-terracotta p-5">
                <h3 className="font-display text-white font-bold text-xl">Recommended Restaurants</h3>
              </div>
              <div className="p-5">
                <div className="space-y-5">
                  {restaurants.map((restaurant, index) => (
                    <div key={restaurant.id} className={`${index !== restaurants.length - 1 ? 'border-b border-gray-200 pb-4' : ''} last:border-0 last:pb-0`}>
                      <h4 className="font-bold text-lg mb-1">{restaurant.name}</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-500">
                          {renderStars(restaurant.rating)}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{restaurant.rating}/5 ({restaurant.reviews} reviews)</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-3">
                          <Utensils className="h-3 w-3 mr-1 inline-block" /> {restaurant.cuisine}
                        </span>
                        <span>
                          <DollarSign className="h-3 w-3 mr-1 inline-block" /> {restaurant.priceRange}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-5">
                    <a href="#" className="text-primary font-medium hover:text-primary/90 transition-colors text-sm">
                      View all dining options →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalFoodSection;
