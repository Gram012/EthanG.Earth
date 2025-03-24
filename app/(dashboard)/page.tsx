import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CreditCard,
  Database,
  Hammer,
  Images,
  Linkedin,
  TentTree,
} from "lucide-react";
import { Terminal } from "./terminal";
import "@/app/globals.css";
import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky } from "@fortawesome/free-brands-svg-icons";

export default function HomePage() {
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
                <a
                  href="https://ethang.earth/files/Resume-Current_01_25.pdf"
                  target="_blank"
                >
                  <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    Resume
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-neutral-800 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white hover:bg-orange-600">
                <Link
                  href={"/cv"}
                  className="flex items-center justify-center h-full w-full"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      fill="currentColor"
                      d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 underline ">
                  <Link href={"/cv"}>Research</Link>
                </h2>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  I currently work as a researcher for the TURBO Telescope
                  group. I worked with the Wang Group for 2 years on Twistronics
                  and other condensed matter projects.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white hover:bg-orange-600">
                <Link
                  href={"/cv"}
                  className="flex items-center justify-center h-full w-full"
                >
                  <Hammer className="h-6 w-6" />
                </Link>
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 underline ">
                  <Link href={"/cv"}>Projects</Link>
                </h2>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  For my physics capstone, my partner and I are using Mössbauer
                  spectroscopy to study hyperfine interactions within magnetite.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white hover:bg-orange-600">
                <Link
                  href={"/cv"}
                  className="flex items-center justify-center h-full w-full"
                >
                  <TentTree className="h-6 w-6" />
                </Link>
              </div>

              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 underline">
                  <Link href={"/cv"}>Hobbies</Link>
                </h2>

                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  I play soccer and love rock climbing! I also love the
                  outdoors, especially here in Minnesota.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Socials
            </h2>
            <div className="flex space-x-6 mt-6">
              <Link
                href="https://www.linkedin.com/in/ethan-gramowski-b1b161274/"
                target="_blank"
              >
                <LinkedInLogoIcon className="h-8 w-8 text-orange-500" />
              </Link>
              <Link href="https://github.com/Gram012" target="_blank">
                <GitHubLogoIcon className="h-8 w-8 text-orange-500" />
              </Link>
              <Link
                href="https://www.instagram.com/ethan_gram21/"
                target="_blank"
              >
                <InstagramLogoIcon className="h-8 w-8 text-orange-500" />
              </Link>
              <Link
                href={"https://bsky.app/profile/ethang.earth"}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faBluesky}
                  className="h-8 w-8 text-orange-500"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
