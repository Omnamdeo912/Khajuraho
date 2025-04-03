import { getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="relative py-20 bg-black">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src={getImageUrl("temple-sculpture-4")} 
          alt="Khajuraho Temple Night View" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8">
          Ready to Experience the Magic of Khajuraho?
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
          Start planning your journey to one of India's most magnificent cultural destinations
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            asChild
          >
            <a href="#plan">Plan Your Visit</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            asChild
          >
            <a href="#virtualtour">Take a Virtual Tour</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
