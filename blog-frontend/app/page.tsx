'use client'

import HeartSVG from "@/public/heart.svg"
import SaveSVG from "@/public/save.svg"
import { useEffect, useState } from "react"
import NavigationBar from "@/app/_components/ui/navbar";
import Image from "next/image";
import Link from "next/link";
import FetchBlogPosts from "./_serverActions/(blogFunctions)/fetchBlogPosts";
import { toast } from "react-toastify";
import SearchBlogPost from "./_serverActions/(blogFunctions)/searchBlogPosts";
import { Icon } from "@iconify/react";

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    searchBox: ""
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
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
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };
    fetchBlogPosts();
  }, []);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await SearchBlogPost(formData.searchBox)
      setBlogPosts(response)
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  if (!loading && blogPosts.length > 0) {
    return (
      <div>
        <NavigationBar />
        <div className="max-w-sm md:max-w-2xl mx-auto">
          <div className="mx-auto max-w-xs md:max-w-sm mt-8">
            <form onSubmit={handleSearch} className="flex items-center">
              <label className="mx-2" htmlFor="searchBox"><Icon icon={"material-symbols:search-rounded"}></Icon> </label>
              <input onChange={handleChange} placeholder="hello world..." value={formData.searchBox} type="text" name="searchBox" id="searchBox" className="flex-2 bg-white mx-2" />
            </form>
          </div>
          {blogPosts.map((blogPost) => {
            const date = new Date(blogPost.blogPublishDate).toLocaleDateString() + " at " + new Date(blogPost.blogPublishDate).toLocaleTimeString()

            return (
              <Link key={blogPost.id} href={`/post/${blogPost.id}`}>
                <div key={blogPost.id} className="hover:scale-105 duration-700 border-8 border-black/10 shadow-lg shadow-black/60 dark:shadow-white/60 bg-white rounded-xl p-8 my-12 mx-auto max-w-xs md:max-w-2xl">
                  <div>
                    <h1 className="text-2xl md:text-3xl my-4 font-semibold font-sans">{blogPost.blogTitle}</h1>
                    <p className="font-extralight mb-2 text-sm">Published on {date}</p>
                    <div className="flex mb-8 font-light text-purple-400">
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
                    <div className="mt-12 flex justify-center-safe text-center font-serif">
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
        <div className="text-center max-w-lg mx-auto">
          <div className="mx-auto max-w-xs md:max-w-sm mt-8">
            <form onSubmit={handleSearch} className="flex items-center">
              <label className="mx-2" htmlFor="searchBox"><Icon icon={"material-symbols:search-rounded"}></Icon> </label>
              <input onChange={handleChange} placeholder="hello world..." value={formData.searchBox} type="text" name="searchBox" id="searchBox" className="flex-2 bg-white mx-2" />
            </form>
          </div>
          {formData.searchBox.length > 0 && blogPosts.length == 0 ?
            <p>No results found for search query {formData.searchBox}</p>
            :
            null
          }
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div>
        <NavigationBar />
        <div className="text-center text-xl mt-12">
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }
}
