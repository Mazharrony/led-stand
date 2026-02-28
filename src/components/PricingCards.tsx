import type { PackageKey } from "@/data/districts";
import { PACKAGES } from "@/data/districts";

interface PricingCardsProps {
  onSelect: (pkg: PackageKey) => void;
}

const cards: {
  key: PackageKey;
  badge?: string;
  highlight?: boolean;
  features: string[];
}[] = [
  {
    key: "stand",
    features: [
      "মজবুত মোবাইল স্ট্যান্ড",
      "সামঞ্জস্যযোগ্য অ্যাঙ্গেল",
      "সব ধরনের ফোনে মানানসই",
      "নন-স্লিপ বেস",
    ],
  },
  {
    key: "led",
    features: [
      "উজ্জ্বল LED আলো",
      "চোখে আরামদায়ক আলো",
      "দীর্ঘস্থায়ী ব্যাটারি লাইফ",
      "কম বিদ্যুৎ খরচ",
      "একাধিক লাইটিং মোড",
    ],
  },
  {
    key: "combo",
    badge: "সেরা অফার",
    highlight: true,
    features: [
      "LED লাইট + মোবাইল স্ট্যান্ড",
      "৫৭০ + ২২০ = ৭৯০ টাকার বদলে",
      "বিশেষ কম্বো ছাড় পাচ্ছেন",
      "একসাথে কিনলে সাশ্রয় বেশি",
      "দুটো পণ্যই একসাথে পাবেন",
    ],
  },
];

export default function PricingCards({ onSelect }: PricingCardsProps) {
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
          প্যাকেজ <span className="text-amber-400">বেছে নিন</span>
        </h2>
        <p className="text-zinc-400 mt-3 text-lg">
          আপনার প্রয়োজন অনুযায়ী যেকোনো প্যাকেজ নিন
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {cards.map(({ key, badge, highlight, features }) => {
          const pkg = PACKAGES[key];
          return (
            <div
              key={key}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                highlight
                  ? "border-amber-400 bg-zinc-900 shadow-lg shadow-amber-500/20 scale-105"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
              }`}
            >
              {badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-950 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}

              <h3 className="text-xl font-bold text-zinc-100 text-center mb-1">
                {pkg.label}
              </h3>

              <div className="text-center my-4">
                <span className="text-4xl font-bold text-amber-400">
                  ৳{pkg.price}
                </span>
                <span className="text-zinc-500 text-sm ml-1">/ পিস</span>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(key)}
                className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                  highlight
                    ? "bg-amber-400 hover:bg-amber-300 text-zinc-950"
                    : "bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-100 border border-zinc-700"
                }`}
              >
                অর্ডার করুন
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-zinc-500 text-sm mt-8">
        ঢাকার ভেতরে ডেলিভারি চার্জ ৭০ টাকা · ঢাকার বাইরে ১২০ টাকা
      </p>
    </section>
  );
}
