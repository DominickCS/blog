'use client'
import { useState, useEffect } from "react";
import Logout from "@/app/_serverActions/(auth)/logout";
import Image from "next/image";
import Link from "next/link";
import AddSVG from "@/public/add.svg"
import { useRouter } from "next/navigation";
import checkAuth from "@/app/_serverActions/(auth)/checkAuth";

export default function NavigationBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth().then(setIsLoggedIn);
  }, []);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const value = event.currentTarget.value;
    switch (value) {
      case 'login':
        router.push('/login');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'signup':
        router.push('/signup');
        break;
    }
  }

  // Don't render auth buttons until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="mt-4 flex content-center items-center justify-evenly max-w-lg md:max-w-xl mx-auto">
        <div>
          <Link href={'/'} className="hover:text-purple-800 duration-600 hover:tracking-wide font-mono text-purple-300 tracking-tighter md:text-xl text-xs">Developing with DominickCS_</Link>
        </div>
        <div className="flex w-32"></div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex content-center items-center justify-evenly max-w-lg md:max-w-xl mx-auto">
      <div>
        <Link href={'/'} className="hover:text-purple-800 duration-600 hover:tracking-wide font-mono text-purple-300 tracking-tighter md:text-xl text-sm">Developing with DominickCS_</Link>
      </div>
      {!isLoggedIn ?
        <div className="flex">
          <button onClick={handleClick} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'login'}>Login</button>
          <button onClick={handleClick} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'signup'}>Sign Up</button>
        </div>
        :
        <div className="flex">
          <Image src={AddSVG} alt="A plus icon" width={16} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer" onClick={() => router.push('/create-post')} />
          <button onClick={handleClick} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'profile'}>Profile</button>
          <button onClick={Logout} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'logout'}>Logout</button>
        </div>
      }
    </div>
  )
}
