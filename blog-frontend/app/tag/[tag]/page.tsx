'use client'

import NavigationBar from "@/components/ui/navbar"
import SearchByTag from "@/app/_serverActions/(blogFunctions)/searchByTag"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TagResultPage() {
  const tag = `#${usePathname().split("/")[2]}`
  const [tagResults, setTagResults] = useState([{
    blogPublishDate: "",
    blogBody: "",
    blogComments: "",
    blogHeaderURL: "",
    blogLikeCount: 0,
    BlogModifyDate: "",
    blogPostAuthor: {

    },
    blogSaveCount: 0,
    blogTags: [],
    blogTitle: "",
    id: ""
  }])
  const [loading, setLoading] = useState(true)
  const blogPreview = 100;
  useEffect(() => {
    const tagSearch = async () => {
      try {
        const response = await SearchByTag(tag)
        setTagResults(response)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    tagSearch();
  }, []);

  if (!loading && tagResults.length > 0) {
    return (
      <div>
        <NavigationBar />
        <div className="mt-8">
          <h2 className="text-center text-lg">Posts tagged: <span className="text-purple-300 hover:text-purple-400">{tag}</span></h2>
        </div>
        {tagResults.map((result) => (
          <Link key={result.id} href={`/post/${result.id}`} target="_blank">
            <Card className="bg-white hover:scale-110 duration-300 my-8 mx-auto max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl-max-w-6xl" >
              <CardHeader>
                <CardTitle className="text-xl">{result.blogTitle}</CardTitle>
                <CardDescription className="font-extralight mb-2 text-sm">Published on {new Date(result.blogPublishDate).toLocaleDateString() + " at " + new Date(result.blogPublishDate).toLocaleTimeString()}</CardDescription>
              </CardHeader>
              <CardContent className="font-light text-lg">
                {result.blogBody.length > blogPreview ?
                  <p>{result.blogBody.substring(0, blogPreview) + '...'}</p>
                  :
                  <p>{result.blogBody}</p>
                }
              </CardContent>
            </Card>
          </Link>
        ))
        }
      </div >
    )
  } else {
    return (
      <div>
        <NavigationBar />
        <div className="mt-8">
          <h2 className="text-center text-lg">Searching for posts...</h2>
        </div>
      </div>

    )
  }
}
