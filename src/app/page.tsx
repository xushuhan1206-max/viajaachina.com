"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CitiesSection from "@/components/CitiesSection";
import GuidesSection from "@/components/GuidesSection";
import MapSection from "@/components/MapSection";
import RoutePlannerModal, { RouteParams } from "@/components/RoutePlannerModal";

export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    const handler = () => setShowPlanner(true);
    window.addEventListener("openRoutePlanner", handler);
    return () => window.removeEventListener("openRoutePlanner", handler);
  }, []);

  const handleRouteSubmit = (params: RouteParams) => {
    // Build structured message for Dify chatbot
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

    // Send to Dify chatbot via custom event
    const event = new CustomEvent("dify-send-message", { detail: message });
    window.dispatchEvent(event);
  };

  return (
    <>
      <Hero />
      <CitiesSection />
      <MapSection />
      <GuidesSection />
      <RoutePlannerModal
        isOpen={showPlanner}
        onClose={() => setShowPlanner(false)}
        onSubmit={handleRouteSubmit}
      />
    </>
  );
}
