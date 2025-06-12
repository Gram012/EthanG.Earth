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
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Hello, I'm Ethan, nice to meet you! I recently graduated from
                the University of Minnesota's College of Science and Engineering
                with a B.S. in astrophysics and another in physics. I love to
                build things and I am passionate about applying my physics and
                engineering knowledge to help others. Explore this site to learn
                more about me!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
