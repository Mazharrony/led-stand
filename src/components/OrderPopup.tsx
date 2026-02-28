import type { PackageKey } from "@/data/districts";
import { PACKAGES } from "@/data/districts";

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  district: string;
  packageKey: PackageKey;
  packagePrice: number;
  deliveryCharge: number;
  total: number;
}

interface OrderPopupProps {
  status: "success" | "error";
  message?: string;
  orderDetails?: OrderDetails;
  onClose: () => void;
}

export default function OrderPopup({
  status,
  message,
  orderDetails,
  onClose,
}: OrderPopupProps) {
  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Icon */}
        <div className="text-center mb-4">
          <span className="text-6xl">{isSuccess ? "✅" : "❌"}</span>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold text-center mb-2 ${
            isSuccess ? "text-green-400" : "text-red-400"
          }`}
        >
          {isSuccess ? "অর্ডার নিশ্চিত হয়েছে!" : "সমস্যা হয়েছে!"}
        </h3>

        {/* Message */}
        <p className="text-zinc-400 text-sm text-center mb-5">
          {isSuccess
            ? "আপনার অর্ডার সফলভাবে জমা হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।"
            : message || "তথ্য সঠিক নয় বা সংযোগ সমস্যা হয়েছে। আবার চেষ্টা করুন।"}
        </p>

        {/* Order Summary (success only) */}
        {isSuccess && orderDetails && (
          <div className="bg-zinc-800 rounded-xl p-4 mb-5 text-sm space-y-2">
            <p className="text-zinc-300">
              <span className="text-zinc-500">নাম:</span>{" "}
              <span className="font-medium">{orderDetails.name}</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">ফোন:</span>{" "}
              <span className="font-medium">{orderDetails.phone}</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">প্যাকেজ:</span>{" "}
              <span className="font-medium">
                {PACKAGES[orderDetails.packageKey].label}
              </span>
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">জেলা:</span>{" "}
              <span className="font-medium">{orderDetails.district}</span>
            </p>
            <div className="border-t border-zinc-700 pt-2 mt-2">
              <p className="text-zinc-300">
                <span className="text-zinc-500">পণ্যের মূল্য:</span>{" "}
                <span>{orderDetails.packagePrice} টাকা</span>
              </p>
              <p className="text-zinc-300">
                <span className="text-zinc-500">ডেলিভারি চার্জ:</span>{" "}
                <span>{orderDetails.deliveryCharge} টাকা</span>
              </p>
              <p className="text-amber-400 font-bold text-base mt-1">
                মোট: {orderDetails.total} টাকা
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            isSuccess
              ? "bg-green-500 hover:bg-green-400 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
          }`}
        >
          {isSuccess ? "ধন্যবাদ!" : "আবার চেষ্টা করুন"}
        </button>
      </div>
    </div>
  );
}
