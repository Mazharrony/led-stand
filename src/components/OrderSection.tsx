import type { PackageKey } from "@/data/districts";
import OrderForm from "./OrderForm";

interface OrderSectionProps {
  selectedPackage: PackageKey;
  onPackageChange: (pkg: PackageKey) => void;
}

export default function OrderSection({
  selectedPackage,
  onPackageChange,
}: OrderSectionProps) {
  return (
    <section id="order" className="max-w-2xl mx-auto px-4 py-16 pb-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
          এখনই <span className="text-amber-400">অর্ডার করুন</span>
        </h2>
        <p className="text-zinc-400 mt-3 text-lg">
          ফর্মটি পূরণ করুন, বাকিটা আমরা করব
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <OrderForm
          selectedPackage={selectedPackage}
          onPackageChange={onPackageChange}
        />
      </div>

      {/* Footer note */}
      <p className="text-center text-zinc-600 text-xs mt-6">
        আপনার তথ্য সম্পূর্ণ সুরক্ষিত। তৃতীয় কোনো পক্ষের সাথে শেয়ার করা হয় না।
      </p>
    </section>
  );
}
