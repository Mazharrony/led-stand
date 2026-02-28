const features = [
  {
    icon: "💡",
    title: "উজ্জ্বল LED আলো",
    desc: "শক্তিশালী LED চিপ দিয়ে তৈরি, যা ঘরের যেকোনো পরিবেশে সমানভাবে আলো দেয়। চোখে কোনো চাপ পড়ে না।",
  },
  {
    icon: "📱",
    title: "মজবুত স্ট্যান্ড",
    desc: "উন্নতমানের অ্যালুমিনিয়াম ও প্লাস্টিক দিয়ে তৈরি — যেকোনো সাইজের ফোন সহজে ধরে রাখে, পড়ে যায় না।",
  },
  {
    icon: "🚚",
    title: "দ্রুত ডেলিভারি",
    desc: "ঢাকার ভেতরে ১-২ দিনে ডেলিভারি, ঢাকার বাইরে ৩-৫ দিনে। সারাদেশে কুরিয়ার সার্ভিসে পাঠানো হয়।",
  },
  {
    icon: "💰",
    title: "সেরা মূল্যে কম্বো অফার",
    desc: "আলাদা কিনলে ৭৯০ টাকা, কিন্তু কম্বোতে মাত্র ৬৫০ টাকা। ১৪০ টাকা সাশ্রয় করুন!",
  },
  {
    icon: "🔒",
    title: "মানের নিশ্চয়তা",
    desc: "প্রতিটি পণ্য প্যাকেজিংয়ের আগে পরীক্ষা করা হয়। ক্ষতিগ্রস্ত পণ্য পেলে বদলে দেওয়া হবে।",
  },
  {
    icon: "📞",
    title: "সহজ অর্ডার প্রক্রিয়া",
    desc: "মাত্র কয়েক সেকেন্ডে ফর্ম পূরণ করুন। কনফার্মেশনের পর নির্ধারিত সময়ে পণ্য পৌঁছে যাবে।",
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
          কেন আমাদের <span className="text-amber-400">পণ্য কিনবেন?</span>
        </h2>
        <p className="text-zinc-400 mt-3 text-lg">
          মান, সুবিধা এবং সাশ্রয়ী মূল্য — সব একসাথে
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/40 transition-colors duration-300"
          >
            <span className="text-4xl mb-4 block">{f.icon}</span>
            <h4 className="text-lg font-bold text-zinc-100 mb-2">{f.title}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
