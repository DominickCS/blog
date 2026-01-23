'use client'

import NavigationBar from "@/components/ui/navbar"
import SearchByTag from "@/app/_serverActions/(blogFunctions)/searchByTag"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function TagResultPage() {
  const tag = `#${usePathname().split("/").at(2)?.charAt(0)?.toUpperCase().concat(usePathname().split("/").at(2)?.substring(1))}`
  const [tagResults, setTagResults] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const tagSearch = async () => {
      try {
        const response = await SearchByTag(tag)
        setTagResults(response)
        console.log(response)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    tagSearch();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="mt-8">
        {!loading ?
          <h2 className="text-center text-lg">Posts that contain the tag <span className="text-purple-300 hover:text-purple-400">#{tag?.at(1)?.toUpperCase().concat(tag.substring(2))}</span></h2>
          :
          <h2 className="text-center text-lg">Searching for posts</h2>
        }
      </div>
    </div>
  )
}
