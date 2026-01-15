'use client'

import { useEffect, useState } from "react"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([])
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


  if (loading) {
    return (
      <>
        LOADING
      </>
    )
  }
  else {
    const date = new Date(blogPosts[0].blogPublishDate).toLocaleDateString()
    return (
      <div className="max-w-sm mx-auto leading-8">
        <div className="my-8">
          <h1 className="text-3xl my-4 font-extrabold">{blogPosts[0].blogTitle}</h1>
          <p>{date}</p>
          <div className="flex">
            TAGS :
            {blogPosts[0].blogTags.map((tag: string) => {
              return <p className="mx-2">{tag}</p>
            })}
          </div>
          <div className="flex">
            <p className="mx-4">Likes: {blogPosts[0].blogLikeCount}</p>
            <p className="mx-4">Saves: {blogPosts[0].blogSaveCount}</p>
          </div>
        </div>
        <div>
          <p>{blogPosts[0].blogBody}</p>
          <div className="my-8">
            <h2 className="text-xl font-extrabold">Comments</h2>
            {blogPosts[0].blogComments.length > 0 ?
              <ul>
                {blogPosts[0].blogComments.map(comment => {
                  return <li key={blogPosts[0].id}>{comment}</li>
                })}
              </ul>
              :
              <div className="my-8">
                <p>No comments yet...</p>
                <p>Be the first, and start a conversation!</p>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
