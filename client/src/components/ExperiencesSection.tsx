import { getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Experience {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    name: "Sound & Light Show",
    description: "Experience the history of Khajuraho narrated through an immersive sound and light show against the backdrop of illuminated temples.",
    image: "temple-sculpture-5",
    category: "Heritage",
    duration: "50 minutes",
    price: "₹600 (English Show)"
  },
  {
    id: 2,
    name: "Cooking with Locals",
    description: "Learn to prepare traditional Bundelkhandi cuisine with a local family, and understand the cultural significance of regional food.",
    image: "temple-sculpture-6",
    category: "Culture",
    price: "₹1,500 per person",
    duration: "3 hours"
  },
  {
    id: 3,
    name: "Panna Tiger Reserve Safari",
    description: "Explore the nearby Panna National Park, home to tigers, leopards, and over 200 species of birds, offering a refreshing nature break.",
    image: "temple-sculpture-7",
    category: "Wildlife",
    price: "₹2,500 per jeep",
    duration: "3-4 hours"
  }
];

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Heritage":
      return "bg-terracotta";
    case "Culture":
      return "bg-primary";
    case "Wildlife":
      return "bg-green-600";
    default:
      return "bg-primary";
  }
};

const ExperiencesSection = () => {
  return (
    <section id="experiences" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Curated Experiences</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover unique ways to experience the magic of Khajuraho beyond the temples.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={getImageUrl(experience.image)} 
                  alt={experience.name} 
                  className="w-full h-48 object-cover" 
                />
                <div className={`absolute top-4 right-4 ${getCategoryColor(experience.category)} text-white text-xs font-medium py-1 px-2 rounded`}>
                  {experience.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-xl mb-2">{experience.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{experience.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">Duration: {experience.duration}</span>
                    <div className="text-primary/90 font-medium">{experience.price}</div>
                  </div>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/20 hover:text-primary"
          >
            View All Experiences
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
