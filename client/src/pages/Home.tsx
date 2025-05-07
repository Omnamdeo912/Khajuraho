import HeroSection from "@/components/HeroSection";
import Introduction from "@/components/Introduction";
import TempleGroups from "@/components/TempleGroups";
import VirtualTour from "@/components/VirtualTour";
import PlanYourVisit from "@/components/PlanYourVisit";
import ExperiencesSection from "@/components/ExperiencesSection";
import SafetyTips from "@/components/SafetyTips";
import LocalFoodSection from "@/components/LocalFoodSection";
import CallToAction from "@/components/CallToAction";
import BackToTop from "@/components/BackToTop";
import { useEffect } from "react";

const Home = () => {
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection />
      <Introduction />
      <TempleGroups />
      <VirtualTour />
      <PlanYourVisit />
      <ExperiencesSection />
      <SafetyTips />
      <LocalFoodSection />
      <CallToAction />
      <BackToTop />
    </main>
  );
};

export default Home;
