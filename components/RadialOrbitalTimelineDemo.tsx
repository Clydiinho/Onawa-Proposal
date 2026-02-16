"use client";

import React from 'react';
import { Box, Layers, Star } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

// Converted to Pricing Data
const timelineData = [
  {
    id: 1,
    title: "Basic",
    date: "$2k/mo",
    content: "Essential visual identity and brand maintenance. Perfect for startups establishing their footprint.",
    category: "Starter",
    icon: Box,
    relatedIds: [2],
    status: "completed" as const, // Re-using status for visual tagging
    energy: 60,
  },
  {
    id: 2,
    title: "Pro",
    date: "$5k/mo",
    content: "Full-scale creative direction, motion design, and monthly campaigns. Our most popular tier.",
    category: "Professional",
    icon: Layers,
    relatedIds: [1, 4],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Elite",
    date: "$10k/mo",
    content: "Complete agency takeover. Priority access, unlimited revisions, and bespoke 3D production.",
    category: "Enterprise",
    icon: Star,
    relatedIds: [2],
    status: "pending" as const,
    energy: 100,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}

export default RadialOrbitalTimelineDemo;