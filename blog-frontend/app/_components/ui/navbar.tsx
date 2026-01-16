'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const router = useRouter();

  function handleClick() {
    router.push('/login')
  }

  return (
    <div className="mt-4 flex content-center items-center justify-evenly">
      <div>
        <Link href={'/'} className="text-4xl font-mono text-red-400 tracking-widest">Developing with DominickCS</Link>
      </div>
      <div>
        <button onClick={handleClick} className="hover:scale-140 duration-700 hover:cursor-pointer">Login</button>
      </div>
    </div>
  )
}
