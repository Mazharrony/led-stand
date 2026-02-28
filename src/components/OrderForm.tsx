"use client";

import { useState, useEffect } from "react";
import type { PackageKey } from "@/data/districts";
import {
  PACKAGES,
  DISTRICTS,
  getDeliveryCharge,
} from "@/data/districts";
import OrderPopup, { type OrderDetails } from "./OrderPopup";

interface OrderFormProps {
  selectedPackage: PackageKey;
  onPackageChange: (pkg: PackageKey) => void;
}

const PACKAGE_KEYS = Object.keys(PACKAGES) as PackageKey[];

interface FormState {
  name: string;
  phone: string;
  address: string;
  district: string;
  packageKey: PackageKey;
}

interface Errors {
  name?: string;
  phone?: string;
  address?: string;
  district?: string;
}

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "নাম অবশ্যই দিতে হবে";
  if (!form.phone.trim()) {
    errors.phone = "ফোন নম্বর অবশ্যই দিতে হবে";
  } else if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) {
    errors.phone = "সঠিক বাংলাদেশি ফোন নম্বর দিন (01XXXXXXXXX)";
  }
  if (!form.address.trim()) errors.address = "ঠিকানা অবশ্যই দিতে হবে";
  if (!form.district) errors.district = "জেলা নির্বাচন করুন";
  return errors;
}

export default function OrderForm({
  selectedPackage,
  onPackageChange,
}: OrderFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    district: "",
    packageKey: selectedPackage,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{
    status: "success" | "error";
    message?: string;
    orderDetails?: OrderDetails;
  } | null>(null);

  // Sync package from parent (pricing card clicks)
  useEffect(() => {
    setForm((prev) => ({ ...prev, packageKey: selectedPackage }));
  }, [selectedPackage]);

  const packagePrice = PACKAGES[form.packageKey].price;
  const deliveryCharge = form.district ? getDeliveryCharge(form.district) : 0;
  const total = packagePrice + (form.district ? deliveryCharge : 0);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (name === "packageKey") {
      onPackageChange(value as PackageKey);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          district: form.district,
          packageKey: form.packageKey,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const orderDetails: OrderDetails = {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          district: form.district,
          packageKey: form.packageKey,
          packagePrice,
          deliveryCharge,
          total,
        };
        setPopup({ status: "success", orderDetails });
        // Reset form
        setForm({
          name: "",
          phone: "",
          address: "",
          district: "",
          packageKey: "combo",
        });
      } else {
        setPopup({
          status: "error",
          message:
            data.error || "সার্ভার সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
        });
      }
    } catch {
      setPopup({
        status: "error",
        message: "ইন্টারনেট সংযোগ সমস্যা। আবার চেষ্টা করুন।",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Package Selection */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            প্যাকেজ বেছে নিন <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PACKAGE_KEYS.map((key) => (
              <label
                key={key}
                className={`flex flex-col cursor-pointer rounded-xl border p-3 transition-all ${
                  form.packageKey === key
                    ? "border-amber-400 bg-amber-400/10"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <input
                  type="radio"
                  name="packageKey"
                  value={key}
                  checked={form.packageKey === key}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="font-semibold text-zinc-200 text-sm">
                  {PACKAGES[key].label}
                </span>
                <span className="text-amber-400 font-bold text-lg mt-1">
                  ৳{PACKAGES[key].price}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-zinc-300 mb-1.5"
          >
            আপনার নাম <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="আপনার পুরো নাম লিখুন"
            className={`w-full rounded-xl bg-zinc-800 border px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
              errors.name ? "border-red-500" : "border-zinc-700 focus:border-amber-400"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-red-400 text-xs">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-zinc-300 mb-1.5"
          >
            ফোন নম্বর <span className="text-red-400">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            maxLength={11}
            className={`w-full rounded-xl bg-zinc-800 border px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
              errors.phone ? "border-red-500" : "border-zinc-700 focus:border-amber-400"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-red-400 text-xs">{errors.phone}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-semibold text-zinc-300 mb-1.5"
          >
            জেলা <span className="text-red-400">*</span>
          </label>
          <select
            id="district"
            name="district"
            value={form.district}
            onChange={handleChange}
            className={`w-full rounded-xl bg-zinc-800 border px-4 py-3 text-zinc-100 outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
              errors.district
                ? "border-red-500"
                : "border-zinc-700 focus:border-amber-400"
            } ${!form.district ? "text-zinc-500" : ""}`}
          >
            <option value="" disabled>
              আপনার জেলা নির্বাচন করুন
            </option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
                {d === "ঢাকা" ? " (ডেলিভারি ৭০৳)" : " (ডেলিভারি ১২০৳)"}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="mt-1 text-red-400 text-xs">{errors.district}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-semibold text-zinc-300 mb-1.5"
          >
            সম্পূর্ণ ঠিকানা <span className="text-red-400">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="বাড়ি নং, রাস্তা, এলাকা, থানা..."
            rows={3}
            className={`w-full rounded-xl bg-zinc-800 border px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none ${
              errors.address
                ? "border-red-500"
                : "border-zinc-700 focus:border-amber-400"
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-red-400 text-xs">{errors.address}</p>
          )}
        </div>

        {/* Price Summary */}
        {form.district && (
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>পণ্যের মূল্য</span>
              <span>{packagePrice} টাকা</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>ডেলিভারি চার্জ ({form.district})</span>
              <span>{deliveryCharge} টাকা</span>
            </div>
            <div className="flex justify-between text-amber-400 font-bold text-base border-t border-zinc-700 pt-2 mt-2">
              <span>মোট পরিশোধ</span>
              <span>{total} টাকা</span>
            </div>
            <p className="text-zinc-500 text-xs mt-1">
              * ক্যাশ অন ডেলিভারি — পণ্য পেলে পেমেন্ট করুন
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin text-xl">⟳</span>
              অর্ডার পাঠানো হচ্ছে...
            </>
          ) : (
            "✔ অর্ডার কনফার্ম করুন"
          )}
        </button>
      </form>

      {popup && (
        <OrderPopup
          status={popup.status}
          message={popup.message}
          orderDetails={popup.orderDetails}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  );
}
