'use client'
import NavigationBar from "@/app/_components/ui/navbar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


export default function BlogPost() {
  const [loading, setLoading] = useState(true)
  const [blogPost, setBlogPost] = useState({})
  const blogPostID = usePathname().split('/')[2]
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await (fetch("http://localhost:8080/fetch-post", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Authorization: Basic dXNlcjpEb21UaGVEZXYwOTIxMDBA"
          },
          body: JSON.stringify({
            "id": blogPostID
          })
        }))

        setBlogPost(await response.json())
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchBlogPost();
  }, []);


  console.log(blogPost)

  if (!loading && blogPost) {
    return (
      <>
        <NavigationBar />
        Hello, World!
      </>
    )
  } else {
    return (
      <>
        <NavigationBar />
        LOADING BLOG POST
      </>
    )
  }
}
