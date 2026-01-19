'use client'

import Logout from "@/app/_serverActions/(auth)/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const router = useRouter();

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

  return (
    <div className="mt-4 flex content-center items-center justify-evenly max-w-md md:max-w-lg mx-auto">
      <div>
        <Link href={'/'} className="hover:text-purple-800 duration-600 hover:tracking-wide text-xl font-mono text-purple-300 tracking-tighter">Developing with DominickCS_</Link>
      </div>

      {document.cookie.search("token") == -1 ?
        <div className="flex">
          <button onClick={handleClick} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'login'}>Login</button>
          <button onClick={handleClick} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'signup'}>Sign Up</button>
        </div>
        :
        <div className="flex">
          <button onClick={handleClick} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'profile'}>Profile</button>
          <button onClick={Logout} className="mx-4 hover:scale-140 duration-700 hover:cursor-pointer text-xs" value={'logout'}>Logout</button>
        </div>
      }
    </div>
  )
}
