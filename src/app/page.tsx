"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import CitiesSection from "@/components/CitiesSection";
import PromptIdeasSection from "@/components/PromptIdeasSection";
import MapSection from "@/components/MapSection";
import ChatWidget from "@/components/ChatWidget";
import RecentFavoritesSection from "@/components/RecentFavoritesSection";
import RoutePlannerModal, { RouteParams } from "@/components/RoutePlannerModal";

const cityLabelMap: Record<string, string> = {
  beijing: "Beijing",
  shanghai: "Shanghai",
  chengdu: "Chengdu",
  xian: "Xi'an",
  guangzhou: "Guangzhou",
  chongqing: "Chongqing",
  hangzhou: "Hangzhou",
  shenzhen: "Shenzhen",
  guilin: "Guilin",
  zhangjiajie: "Zhangjiajie",
  harbin: "Harbin",
  kunming: "Kunming",
};

const nationalityLabelMap: Record<string, string> = {
  espana: "España",
  mexico: "México",
  argentina: "Argentina",
  colombia: "Colombia",
  chile: "Chile",
  peru: "Perú",
  brasil: "Brasil",
  otro: "Otro país",
};

export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    const handler = () => setShowPlanner(true);
    window.addEventListener("openRoutePlanner", handler);
    return () => window.removeEventListener("openRoutePlanner", handler);
  }, []);

  const handleRouteSubmit = (params: RouteParams) => {
    const cityNames = params.cities.map((city) => cityLabelMap[city] || city).join(", ");
    const budgetMap: Record<string, string> = {
      bajo: "mochilero",
      medio: "medio",
      alto: "cómodo",
      low: "mochilero",
      medium: "medio",
      high: "cómodo",
    };
    const interestNames = params.interests.join(", ");
    const nationality = nationalityLabelMap[params.nationality] || params.nationality;
    const message = `Quiero planificar una ruta por China:\nCiudades: ${cityNames}\nDías: ${params.days}\nPresupuesto: ${budgetMap[params.budget] || params.budget}\nIntereses: ${interestNames}\nNacionalidad: ${nationality}`;

    window.dispatchEvent(new CustomEvent("chatbot-send-message", { detail: { message } }));
  };

  return (
    <>
      <Hero />
      <CitiesSection />
      <PromptIdeasSection />
      <MapSection />
      <ChatWidget />
      <RecentFavoritesSection />
      <RoutePlannerModal
        isOpen={showPlanner}
        onClose={() => setShowPlanner(false)}
        onSubmit={handleRouteSubmit}
      />
    </>
  );
}
