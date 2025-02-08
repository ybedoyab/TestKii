"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import { navigationMenuTriggerStyle } from "./navigation-menu";
import LogoKiichain from "/public/images/Logo_KiiChain_2024.png";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

// Define reusable list items
const ListItem = ({ href, title, children }: { href: string; title: string; children: React.ReactNode }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        href={href}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </a>
    </NavigationMenuLink>
  </li>
);

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
        <Image
          src={LogoKiichain}
          alt="Kiichain"
          width={240}
          height={200}
          className={`cursor-pointer transition-all duration-300 ${isDark ? "invert" : ""}`}
        />
      </div>
      <div className="flex-1 flex justify-center h-24">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">Inicio</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#764cb5] text-white shadow-lg rounded-lg">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and Tailwind CSS.
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
                  <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">Aprende</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#764cb5] text-white shadow-lg rounded-lg">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {/* Components list */}
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} !text-lg`}>Usa KiiChain</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="h-22 border-l-2 border-primary mx-4"></div>
      <div className="flex items-center px-4 cursor-pointer" onClick={toggleTheme}>
        {isDark ? <Sun size={26} className="text-yellow-400 transition-all duration-300 hover:scale-110" /> : <Moon size={26} className="text-gray-800 transition-all duration-300 hover:scale-110" />}
      </div>
      {/* @ts-expect-error msg */}
      <appkit-button className="mt-7 mx-7"/>
    </div>
  );
}

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
];