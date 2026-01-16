'use client'

import HeartSVG from "@/public/heart.svg"
import SaveSVG from "@/public/save.svg"
import { useEffect, useState } from "react"
import NavigationBar from "@/app/_components/ui/navbar";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([])
  const blogPreview = 100;
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await (fetch("http://localhost:8080/all-posts", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Authorization: Basic dXNlcjpEb21UaGVEZXYwOTIxMDBA"
          },
        }))

        setBlogPosts(await response.json())
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchBlogPosts();
  }, []);


  if (!loading && blogPosts.length > 0) {
    console.log(blogPosts)

    return (
      <div>
        <NavigationBar />
        <div className="max-w-lg mx-auto">
          {blogPosts.map((blogPost) => {
            const date = new Date(blogPost.blogPublishDate).toLocaleDateString() + " at " + new Date(blogPost.blogPublishDate).toLocaleTimeString()

            return (
              <Link href={`/post/${blogPost.id}`}>
                <div key={blogPost.id} className="border-8 border-black/10 shadow-lg shadow-black/60 dark:shadow-white/60 bg-white rounded-xl p-8 my-12">
                  <div>
                    <h1 className="text-3xl my-2 font-semibold">{blogPost.blogTitle}</h1>
                    <p className="font-extralight mb-2 text-sm">Published on {date}</p>
                    <div className="flex mb-8 font-light text-red-500/80">
                      {blogPost.blogTags.map((tag: string) => {
                        return <p className="mr-2 text-xs font-mono" key={tag}>{tag}</p>
                      })}
                    </div>
                  </div>
                  <div className="font-mono font-light text-md">
                    {blogPost.blogBody.length > blogPreview ?
                      <p>{blogPost.blogBody.substring(0, blogPreview) + '...'}</p>
                      :
                      <p>{blogPost.blogBody}</p>
                    }
                    <div className="mt-12 flex justify-center-safe text-center">
                      <p className="mx-4"><Image src={HeartSVG} width={20}></Image> {blogPost.blogLikeCount}</p>
                      <p className="mx-4"><Image src={SaveSVG} width={20}></Image>{blogPost.blogSaveCount}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  } else if (!loading && blogPosts.length <= 0) {
    return (
      <div>
        <NavigationBar />
        <div className="text-center text-2xl mt-12">
          <p>No blog posts yet...</p>
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div>
        <NavigationBar />
        <div className="text-center text-2xl mt-12">
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }
}
