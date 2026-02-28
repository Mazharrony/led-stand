"use client";

import { useState } from "react";
import Image from "next/image";
import { LED_IMAGES, STAND_IMAGES } from "@/data/images";

interface ProductCardProps {
  name: string;
  tagline: string;
  price: string;
  images: string[];
}

function ProductCard({ name, tagline, price, images }: ProductCardProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors duration-300">
        {/* Main image */}
        <div
          className="relative w-full cursor-zoom-in"
          style={{ aspectRatio: "1 / 1" }}
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]}
            alt={`${name} - ছবি ${active + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={active === 0}
            unoptimized
          />
          {/* Arrow navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((p) => (p === 0 ? images.length - 1 : p - 1));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                aria-label="আগের ছবি"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((p) => (p === images.length - 1 ? 0 : p + 1));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                aria-label="পরের ছবি"
              >
                ›
              </button>
            </>
          )}
          {/* Counter */}
          <span className="absolute bottom-2 right-3 bg-black/60 text-xs text-zinc-300 px-2 py-0.5 rounded-full">
            {active + 1}/{images.length}
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-3 overflow-x-auto scrollbar-thin bg-zinc-950/50">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                i === active
                  ? "border-amber-400"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
            >
              <Image
                src={src}
                alt={`থাম্বনেইল ${i + 1}`}
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="px-5 py-4">
          <h3 className="text-xl font-bold text-zinc-100">{name}</h3>
          <p className="text-zinc-400 text-sm mt-1">{tagline}</p>
          <p className="text-amber-400 text-2xl font-bold mt-3">{price}</p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl bg-zinc-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-zinc-600"
            onClick={() => setLightbox(false)}
          >
            ×
          </button>
          <div className="relative max-w-2xl w-full max-h-[85vh] aspect-square">
            <Image
              src={images[active]}
              alt={`${name} বড় ছবি`}
              fill
              className="object-contain"
              sizes="90vw"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductGallery() {
  return (
    <section
      id="products"
      className="max-w-5xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
          আমাদের <span className="text-amber-400">পণ্য</span>
        </h2>
        <p className="text-zinc-400 mt-3 text-lg">
          অসাধারণ কোয়ালিটির দুটি প্রোডাক্ট, অসাধারণ মূল্যে
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductCard
          name="LED লাইট"
          tagline="উজ্জ্বল আলো, দীর্ঘস্থায়ী পারফরম্যান্স"
          price="৫৭০ টাকা"
          images={LED_IMAGES}
        />
        <ProductCard
          name="মোবাইল স্ট্যান্ড"
          tagline="উচ্চ মানেরকোয়ালিটি, সহজে ব্যবহারযোগ্য"
          price="২২০ টাকা"
          images={STAND_IMAGES}
        />
      </div>
    </section>
  );
}
