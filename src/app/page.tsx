import Hero from "@/components/Hero";
import CitiesSection from "@/components/CitiesSection";
import GuidesSection from "@/components/GuidesSection";
import MapSection from "@/components/MapSection";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Hero />
      <CitiesSection />
      <MapSection />
      <GuidesSection />
      <ChatWidget />
    </>
  );
}
