'use client'
import NavigationBar from "@/app/_components/ui/navbar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import HeartSVG from "@/public/heart.svg"
import SaveSVG from "@/public/save.svg"
import Image from "next/image"


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
    const date = new Date(blogPost.blogPublishDate).toLocaleDateString() + " at " + new Date(blogPost.blogPublishDate).toLocaleTimeString()
    return (
      <div>
        <NavigationBar />
        <div className="bg-white rounded-md max-w-xl mx-auto p-8 my-8 border-8 border-black/10 shadow-lg shadow-black/60 dark:shadow-white/60">
          <h1 className="text-center text-3xl font-medium mb-4">{blogPost.blogTitle}</h1>
          <hr className="my-6 max-w-xs mx-auto" />
          <div className="flex text-sm font-light items-center mt-2 justify-evenly">
            {blogPost.blogTags.map((tag, id) => {
              return <p className="" key={id}>{tag}</p>
            })}
            <p className="">{date}</p>
          </div>
          <div className="my-10">
            <p className="">{blogPost.blogBody}</p>
            <hr className="my-6 max-w-xs mx-auto" />
          </div>
          <div>
            <h2 className="text-xl font-medium">Comments</h2>
          </div>
          <div className="mt-8 flex justify-end text-center">
            <p className="mx-4"><Image src={HeartSVG} width={20}></Image> {blogPost.blogLikeCount}</p>
            <p className="mx-4"><Image src={SaveSVG} width={20}></Image>{blogPost.blogSaveCount}</p>
          </div>
          <div>
          </div>
        </div>
      </div>
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
