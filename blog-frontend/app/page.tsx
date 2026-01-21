'use client'

import HeartSVG from "@/public/heart.svg"
import SaveSVG from "@/public/save.svg"
import { useEffect, useState } from "react"
import NavigationBar from "@/app/_components/ui/navbar";
import Image from "next/image";
import Link from "next/link";
import FetchBlogPosts from "./_serverActions/(blogFunctions)/fetchBlogPosts";
import { toast } from "react-toastify";

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([
    {
      id: "",
      blogPublishDate: "",
      blogTitle: "",
      blogTags: [],
      blogBody: "",
      blogLikeCount: 0,
      blogSaveCount: 0
    }
  ])
  const blogPreview = 100;
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await FetchBlogPosts()
        setBlogPosts(response.data)
        toast.info(`${await response.message}`)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchBlogPosts();
  }, []);

  if (!loading && blogPosts.length > 0) {
    return (
      <div>
        <NavigationBar />
        <div className="max-w-lg mx-auto">
          {blogPosts.map((blogPost) => {
            const date = new Date(blogPost.blogPublishDate).toLocaleDateString() + " at " + new Date(blogPost.blogPublishDate).toLocaleTimeString()

            return (
              <Link key={blogPost.id} href={`/post/${blogPost.id}`}>
                <div key={blogPost.id} className="hover:rotate-4 hover:scale-110 duration-700 border-8 border-black/10 shadow-lg shadow-black/60 dark:shadow-white/60 bg-white rounded-xl p-8 my-12">
                  <div>
                    <h1 className="text-3xl my-2 font-semibold">{blogPost.blogTitle}</h1>
                    <p className="font-extralight mb-2 text-sm">Published on {date}</p>
                    <div className="flex mb-8 font-light text-red-500/80">
                      {blogPost.blogTags.map((tag: string, id: number) => {
                        return <p className="mr-2 text-xs font-mono" key={id}>{tag}</p>
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
                      <p className="mx-4"><Image alt="A heart icon to signify likes on this blog post." src={HeartSVG} width={20}></Image> {blogPost.blogLikeCount}</p>
                      <p className="mx-4"><Image alt="A bookmark icon to signify the number of bookmarks on this blog post." src={SaveSVG} width={20}></Image>{blogPost.blogSaveCount}</p>
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
