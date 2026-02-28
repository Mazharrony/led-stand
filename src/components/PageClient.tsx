"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import PricingCards from "./PricingCards";
import Features from "./Features";
import FAQ from "./FAQ";
import OrderSection from "./OrderSection";
import type { PackageKey } from "@/data/districts";

export default function PageClient() {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("combo");

  function handleSelectPackage(pkg: PackageKey) {
    setSelectedPackage(pkg);
    // Smooth scroll to order section
    const el = document.getElementById("order");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <ProductGallery />
      <PricingCards onSelect={handleSelectPackage} />
      <OrderSection initialPackage={selectedPackage} />
      <Features />
      <FAQ />
    </>
  );
}
