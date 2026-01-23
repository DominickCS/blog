'use client'
import NavigationBar from "@/app/_components/ui/navbar";
import FetchUserDetails from "@/app/_serverActions/(auth)/fetchUserDetails";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    email: "",
    likedPosts: [],
    savedPosts: []
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await FetchUserDetails()
        console.log(response)
        setUserDetails(response)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchUserProfile();
  }, []);


  if (loading && userDetails.id.length <= 0) {
    return (
      <div>
        <NavigationBar />
        <div className="text-center mt-16">
          <p>Loading user profile...</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <NavigationBar />
        <div className="mt-16">
          <div className="text-center min-h-screen">
            <p>Hello, {userDetails.username}!</p>
            <div className="mt-8 max-w-sm mx-auto">
              <div className="px-8 border-r border-black/20 my-8">
                <h2 className="underline underline-offset-4">LIKED POSTS</h2>
                <ul>
                  {userDetails.likedPosts.map((post, id: number) => {
                    return <li className="my-2 text-purple-300 hover:text-purple-400 duration-300" key={id}><Link href={`/post/${post.blogPostId}`}>{post.blogPostTitle}</Link></li>
                  })}
                </ul>
              </div>
              <div className="px-8 border-l border-black/20 my-8">
                <h2 className="underline underline-offset-4">BOOKMARKED POSTS</h2>
                <ul>
                  {userDetails.savedPosts.map((post, id: number) => {
                    return <li className="my-2 text-purple-300 hover:text-purple-400 duration-300" key={id}><Link href={`/post/${post.blogPostId}`}>{post.blogPostTitle}</Link></li>
                  })}
                </ul>
              </div>
            </div>
          </div>
          <p className="font-extralight font-mono text-center">ID: {userDetails.id}</p>
        </div>
      </div>
    )
  }
}
