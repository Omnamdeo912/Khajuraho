import { getImageUrl } from "@/lib/utils";
import { Calendar, Building, Landmark } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src={getImageUrl("temple-exterior-1")}
          alt="Khajuraho Temples"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 md:px-8">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-4">
          Khajuraho
        </h1>
        <p className="font-display text-xl md:text-2xl text-white text-shadow max-w-3xl mx-auto mb-8">
          Explore the magnificent temples where art transcends time
        </p>
        <div className="space-x-4">
          <a
            href="#virtualtour"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Virtual Tour
          </a>
          <a
            href="#plan"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-md border border-white/30 hover:bg-white/20 transition-colors"
          >
            Plan Your Visit
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex flex-wrap justify-center gap-6 text-white">
          <div className="flex flex-col items-center">
            <Landmark className="h-6 w-6 mb-2" />
            <p className="text-sm">UNESCO World Heritage</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-2" />
            <p className="text-sm">950-1050 CE</p>
          </div>
          <div className="flex flex-col items-center">
            <Building className="h-6 w-6 mb-2" />
            <p className="text-sm">85 Temples</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
