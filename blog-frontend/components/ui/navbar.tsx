'use client'
import { useState, useEffect } from "react";
import Logout from "@/app/_serverActions/(auth)/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import checkAuth from "@/app/_serverActions/(auth)/checkAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

export default function NavigationBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth().then(setIsLoggedIn);
  }, []);

  // Don't render auth buttons until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <NavigationMenu className="max-w-xs md:max-w-md mx-auto mt-4 p-4">
        <Link href={'/'} className="mx-4 hover:text-white duration-300">Developing with DominickCS_</Link>
        <NavigationMenuList>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <NavigationMenu className="max-w-xs md:max-w-md mx-auto mt-4 p-4">
      <Link href={'/'} className="mx-4 hover:text-white duration-300">Developing with DominickCS_</Link>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            {!isLoggedIn ?
              <ul className="w-60 md:w-100">
                <ListItem href="/login" title="Login">
                </ListItem>
                <ListItem href="/signup" title="Sign Up">
                </ListItem>
              </ul>
              :
              <ul className="w-100 p-2 lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/create-post" title="+ New Post">
                </ListItem>
                <ListItem href="/profile" title="Profile">
                </ListItem>
                <ListItem onClick={Logout} title="Logout">
                </ListItem>
              </ul>
            }
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu >
  )
}

function ListItem({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "hover:bg-accent block text-main-foreground select-none rounded-base border-2 border-transparent p-2 leading-none no-underline outline-hidden transition-colors hover:border-border",
            className,
          )}
          {...props}
        >
          <div className="text-base font-heading leading-none">{title}</div>
          <p className="font-base line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
ListItem.displayName = "ListItem"
