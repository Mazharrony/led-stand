"use client";

import { useState } from "react";

const faqs = [
  {
    q: "ডেলিভারি চার্জ কত?",
    a: "ঢাকার ভেতরে ডেলিভারি চার্জ ৭০ টাকা এবং ঢাকার বাইরে (সারাদেশের যেকোনো জেলায়) ১২০ টাকা।",
  },
  {
    q: "কত দিনে ডেলিভারি পাবো?",
    a: "ঢাকার মধ্যে সাধারণত ১-২ কার্যদিবসে ডেলিভারি হয়। ঢাকার বাইরে ৩-৫ কার্যদিবস সময় লাগতে পারে।",
  },
  {
    q: "পেমেন্ট কীভাবে করবো?",
    a: "ক্যাশ অন ডেলিভারি (COD) — পণ্য পেয়ে পেমেন্ট করুন। আগে কোনো পেমেন্ট করতে হবে না।",
  },
  {
    q: "পণ্য নষ্ট বা ক্ষতিগ্রস্ত পেলে কী করবো?",
    a: "পণ্য ডেলিভারির সময় চেক করুন। কোনো সমস্যা থাকলে ডেলিভারিম্যানের সামনেই জানান। পণ্য বদলে দেওয়া হবে।",
  },
  {
    q: "কম্বো অফারে কী কী পাওয়া যাবে?",
    a: "কম্বো অফারে আপনি LED লাইট ও মোবাইল স্ট্যান্ড — দুটো পণ্যই একসাথে পাবেন মাত্র ৬৫০ টাকায়। আলাদা কিনলে লাগত ৭৯০ টাকা।",
  },
  {
    q: "অর্ডার করার পর কনফার্মেশন কীভাবে পাবো?",
    a: "অর্ডার সফলভাবে জমা হলে স্ক্রিনে কনফার্মেশন দেখাবে। প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।",
  },
  {
    q: "একসাথে একাধিক পণ্য অর্ডার করা যাবে?",
    a: "হ্যাঁ, অর্ডার ফর্মের বিশেষ নোট সেকশনে পরিমাণ উল্লেখ করুন। আমরা আপনার সাথে যোগাযোগ করে বিস্তারিত জানাবো।",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
          সাধারণ <span className="text-amber-400">প্রশ্নোত্তর</span>
        </h2>
        <p className="text-zinc-400 mt-3 text-lg">
          যা জানতে চান তা এখানে খুঁজে পাবেন
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-zinc-800/60 transition-colors"
            >
              <span className="font-semibold text-zinc-100 text-base pr-4">
                {faq.q}
              </span>
              <span
                className={`text-amber-400 text-xl flex-shrink-0 transition-transform duration-200 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
