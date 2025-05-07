import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const scrollToTop = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-[#EA7300] text-white shadow-lg hover:bg-[#EA7300]/90 transition-all duration-300 transform hover:scale-110 opacity-100 z-50"
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};

export default BackToTop; 