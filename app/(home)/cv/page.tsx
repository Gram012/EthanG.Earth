import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CreditCard,
  Database,
  Hammer,
  Images,
  TentTree,
} from "lucide-react";
import "@/app/globals.css";
import Link from "next/link";

export default function CVPage() {
  return (
    <main className="background-image">
      <section className="py-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:col-start-7 lg:text-right">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Under
                <span className="block text-orange-500">Construction</span>
              </h1>
              <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Check back soon for updates!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
