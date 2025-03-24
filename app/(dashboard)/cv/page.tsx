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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Physics
                <span className="block text-orange-500">Engineering</span>
              </h1>
              <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Hello, I'm Ethan, nice to meet you! I'm a senior studying
                physics and astrophysics at the University of Minnesota Twin
                Cities. I love to build things and I am passionate about
                applying my physics and engineering knowledge to help others.
                Explore this site to learn more about me!
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a href="https://github.com/Gram012" target="_blank">
                  <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    GitHub
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                Experience
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                This is the all-in-one place to learn more about my professional
                experience and skills. From nanofabrication to data analysis, I
                have a wide range of skills that I have developed working on
                projects both academic and personal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
