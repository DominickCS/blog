import Link from "next/link";

export default function NavigationBar() {
  return (
    <div className="mx-auto text-center mt-4">
      <Link href={'/'} className="text-4xl font-mono text-red-400">Developing with DominickCS</Link>
    </div>
  )
}
