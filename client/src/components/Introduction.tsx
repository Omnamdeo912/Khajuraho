import { getImageUrl } from "@/lib/utils";

const Introduction = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          A Masterpiece of Indian Art and Architecture
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          The Khajuraho Group of Monuments, located in Madhya Pradesh, India, represents one of the finest examples of medieval Indian architecture and sculpture.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gray-700 mb-4">
            Built between 950 and 1050 CE by the Chandela dynasty, these temples are celebrated for their intricate sculptures, architectural harmony, and their depiction of various aspects of human life, including spiritual teachings, sensuality, and everyday scenes.
          </p>
          <p className="text-gray-700 mb-4">
            Originally, there were over 85 temples spread over 20 square kilometers. Today, only 25 temples remain in a preserved state, divided into three groups: Western, Eastern, and Southern.
          </p>
          <p className="text-gray-700 mb-6">
            In 1986, the Khajuraho Group of Monuments was designated as a UNESCO World Heritage Site, recognizing its exceptional architectural value and cultural significance.
          </p>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">85+</span>
              <span className="text-sm text-gray-600">Original Temples</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">25</span>
              <span className="text-sm text-gray-600">Surviving Temples</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">1986</span>
              <span className="text-sm text-gray-600">UNESCO Recognition</span>
            </div>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <img 
            src={getImageUrl("temple-exterior-6")} 
            alt="Khajuraho Temple Complex" 
            className="w-full h-auto" 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
            <p className="font-display">Kandariya Mahadev Temple - Western Group</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
