'use client'

import { useEffect, useState } from "react"

export default function HomePage() {
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
      }
    };
    fetchBlogPosts();
  }, []);



  return (
    <>
      HELLO
    </>
  )
}
