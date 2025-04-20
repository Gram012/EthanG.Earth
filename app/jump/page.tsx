"use client";
import "@/app/globals.css";
import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { GitlabIcon, Mail, YoutubeIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faGoogleDrive,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef } from "react";

//Update Greeting
const now = new Date();
const hours = now.getHours();
const greeting = () => {
  if (hours >= 12 && hours < 17) {
    return "Good Afternoon!";
  } else if (hours >= 17 || hours < 3) {
    return "Good Evening!";
  } else if (hours >= 3 && hours < 12) {
    return "Good Morning!";
  }
};
const currentGreeting = greeting();

export default function JumpPage() {
  //Search Bar
  const searchInputRef = useRef<HTMLInputElement>(null);
  //Focus search bar on page load
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const query = searchInputRef.current?.value.trim();
    if (query) {
      // Redirect to Google's search results page
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
    }
  };

  //Bookmark Grid
  const bookmarks = [
    {
      href: "https://github.com/Gram012",
      icon: (
        <GitHubLogoIcon className="h-8 w-8 text-gray-900 dark:text-white" />
      ),
      title: "GitHub",
      description: "Cringe social media platform",
    },
    {
      href: "https://mail.google.com/mail/u/0/#inbox",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
          alt="Gmail"
          className="h-8 w-8"
        />
      ),
      title: "Email",
      description: "School email",
    },
    // {
    //   href: "https://bsky.app/",
    //   icon: (
    //     <FontAwesomeIcon icon={faBluesky} className="h-8 w-8 text-blue-500" />
    //   ),
    //   title: "BlueSky",
    //   description: "Less shit twitter",
    // },
    {
      href: "https://canvas.umn.edu/",
      icon: (
        <img src="/Images/canvas_icon.png" alt="canvas" className="h-10 w-10" />
      ),
      title: "Canvas",
      description: "classes",
    },
    {
      href: "https://git.ltgk.net/",
      icon: (
        <img
          src="https://raw.githubusercontent.com/tynor88/docker-templates/master/images/gitlab_small.png"
          alt="GitLab"
          className="h-8 w-8"
        />
      ),
      title: "GitLab",
      description: "Self-Hosted GitLab server.",
    },
    {
      href: "https://www.youtube.com/",
      icon: (
        <FontAwesomeIcon icon={faYoutube} className="h-8 w-8 text-red-500" />
      ),
      title: "Youtube",
      description: "Where I watch videos of funny monkeys ",
    },
    {
      href: "https://porkbun.com/",
      icon: (
        <img
          src="https://porkbun.com/partners/logos/porkbun.comphpPkl2eU.svg"
          alt="Porkbun"
          className="h-10 w-10"
        />
      ),
      title: "Porkbun",
      description: "Domains Domains Domains!",
    },
    {
      href: "https://calendar.google.com/calendar/u/0/r/month?pli=1",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
          alt="Calendar"
          className="h-8 w-8"
        />
      ),
      title: "Calendar",
      description: "Never gets updated",
    },
    {
      href: "https://www.desmos.com/calculator",
      icon: (
        <img
          src="/Images/8pubh285syd61.webp"
          alt="Desmos"
          className="h-8 w-8"
        />
      ),
      title: "Desmos",
      description: "Graphing Calculator",
    },
    {
      href: "https://calendar.google.com/calendar/u/0/r/month?pli=1",
      icon: (
        <img
          src="https://img.icons8.com/?size=512&id=13667&format=png"
          alt="Wolfram"
          className="h-10 w-10"
        />
      ),
      title: "Wolfram Alpha",
      description: "Integral Calculator",
    },
    {
      href: "https://drive.google.com/drive/u/0/home",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
          alt="Drive"
          className="h-8 w-8"
        />
      ),
      title: "Drive",
      description: "google... booo",
    },
    {
      href: "https://www.nytimes.com/crosswords",
      icon: (
        <img
          src="https://play-lh.googleusercontent.com/QXDGA4zkli9V9-xPs3fT6qRjG7zSLpS0JlBWtvUP-ZxRHy7tmlIrzvzgAqgLru_brQ=s96-rw"
          alt="nytGames"
          className="h-8 w-8"
        />
      ),
      title: "NYT Games",
      description: "connect deez nuts",
    },
    {
      href: "https://www.myu.umn.edu/psp/psprd/EMPLOYEE/EMPL/h/?tab=DEFAULT&languageCd=ENG",
      icon: (
        <img
          src="/Images/BlockM-Maroon.webp"
          alt="MyU"
          className="h-6.5 w9.5"
        />
      ),
      title: "MyU",
      description: "crashout szn",
    },
  ];

  return (
    <main className="background-image">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl md:text-6xl text-center mb-12">
            {currentGreeting}
          </h1>
          <form onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Google..."
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 mb-12"
            />
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((bookmark, index) => (
              <Link
                key={index}
                href={bookmark.href}
                className="group block p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-neutral-800"
              >
                <div className="flex items-center space-x-4">
                  {bookmark.icon}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {bookmark.title}
                  </h2>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {bookmark.description}
                </p>
              </Link>
            ))}
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
