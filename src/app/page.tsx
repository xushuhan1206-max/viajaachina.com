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
    const cityNames = params.cities.join(", ");
    const budgetMap: Record<string, string> = {
      low: "mochilero",
      medium: "medio",
      high: "cómodo",
    };
    const message = `Quiero planificar una ruta:
Ciudades: ${cityNames}
Días: ${params.days}
Presupuesto: ${budgetMap[params.budget] || params.budget}
Nacionalidad: ${params.nationality}`;

    // Send to ChatWidget via custom event
    const event = new CustomEvent("chatbot-send-message", { detail: message });
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
