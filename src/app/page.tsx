"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CitiesSection from "@/components/CitiesSection";
import GuidesSection from "@/components/GuidesSection";
import MapSection from "@/components/MapSection";
import ChatWidget from "@/components/ChatWidget";
import RoutePlannerModal, { RouteParams } from "@/components/RoutePlannerModal";

export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    const handler = () => setShowPlanner(true);
    window.addEventListener("openRoutePlanner", handler);
    return () => window.removeEventListener("openRoutePlanner", handler);
  }, []);

  const handleRouteSubmit = (params: RouteParams) => {
    // Convert params to a natural language message for the AI
    const cityNames = params.cities.join(", ");
    const message = `Planifica una ruta de ${params.days} días por ${cityNames}. Presupuesto: ${params.budget}. Intereses: ${params.interests.join(", ")}. Nacionalidad: ${params.nationality}.`;

    // Dispatch to ChatWidget with the structured message
    const event = new CustomEvent("sendChatMessage", { detail: message });
    window.dispatchEvent(event);
  };

  return (
    <>
      <Hero />
      <CitiesSection />
      <MapSection />
      <GuidesSection />
      <ChatWidget />
      <RoutePlannerModal
        isOpen={showPlanner}
        onClose={() => setShowPlanner(false)}
        onSubmit={handleRouteSubmit}
      />
    </>
  );
}
