"use client";

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { navigationMenuTriggerStyle } from "./navigation-menu";
import LogoKiichain from "/public/images/Logo_KiiChain_2024.png";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

// Define reusable list items
// const ListItem = ({
//   href,
//   title,
//   children,
// }: {
//   href: string;
//   title: string;
//   children: React.ReactNode;
// }) => (

//   <li>
//     <NavigationMenuLink asChild>
//       <a
//         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//         href={href}
//       >
//         <div className="text-sm font-medium leading-none">{title}</div>
//         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//           {children}
//         </p>
//       </a>
//     </NavigationMenuLink>
//   </li>
// );

export default function TopBar() {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full shadow-md z-50 flex justify-center border-primary border-b-2 transition-all duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative border-r-2 border-primary p-2">
        <Link href="/">
          <Image
            src={LogoKiichain}
            alt="Kiichain"
            width={240}
            height={200}
            className={`cursor-pointer transition-all duration-300 ${
              isDark ? "invert" : ""
            }`}
          />
        </Link>
      </div>
      <div className="flex-1 flex justify-center h-24">
        <NavigationMenu>
          <NavigationMenuList>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">
                Inicio
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#764cb5] text-white shadow-lg rounded-lg">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">
                Aprende
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#764cb5] text-white shadow-lg rounded-lg">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} !text-lg`}
                href="/"
              >
                Inicio
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} !text-lg`}
                href="/panel"
              >
                Panel
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="h-22 border-l-2 border-primary mx-4"></div>
      <div
        className="flex items-center px-4 cursor-pointer mx-4"
        onClick={toggleTheme}
      >
        {isDark ? (
          <Sun
            size={26}
            className="text-yellow-400 transition-all duration-300 hover:scale-110"
          />
        ) : (
          <Moon
            size={26}
            className="text-gray-800 transition-all duration-300 hover:scale-110"
          />
        )}
      </div>

      <div className="flex items-center px-4 cursor-pointer mx-4">
        <a
          href="https://github.com/ybedoyab/TestKii"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 transition-all duration-300 hover:scale-110"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.563 4.935.36.31.682.92.682 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      {/* <appkit-button className="mt-7 mx-7" /> */}
    </div>
  );
}

// const components = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
// ];
