import Link from "next/link";

export default function NavigationBar() {
  return (
    <div className="mx-auto text-center">
      <Link href={'/'} className="text-4xl font-light text-red-400 my-4">Developing with DominickCS</Link>
    </div>
  )
}
