'use client'
import NavigationBar from "@/components/ui/navbar";
import FetchUserDetails from "@/app/_serverActions/(auth)/fetchUserDetails";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function UserProfilePage() {
  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    email: "",
    likedPosts: [{
      blogPostId: "",
      blogPostTitle: ""
    }],
    savedPosts: [{
      blogPostId: "",
      blogPostTitle: ""
    }]
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await FetchUserDetails()
        setUserDetails(response?.data)
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
        <Card className="mt-16 max-w-xs sm:max-w-lg mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Hello, {userDetails.username}!</CardTitle>
            <div className="mt-8 mx-auto w-full">
              <Card className="px-2">
                <CardHeader className="underline underline-offset-4 text-xs font-light">LIKED POSTS</CardHeader>
                {userDetails.likedPosts.length > 0 ?
                  <ul>
                    {userDetails.likedPosts.map((post, id: number) => {
                      return <CardContent className="hover:text-purple-400 duration-300 my-2" key={id}><Link href={`/post/${post.blogPostId}`}>{post.blogPostTitle}</Link></CardContent>
                    })}
                  </ul>
                  :
                  <p className="text-center tracking-tighter font-extralight mt-2">You haven't liked any articles yet...</p>
                }
              </Card>
              <Card className="p-8 my-8">
                <CardHeader className="underline underline-offset-4 text-xs font-light">BOOKMARKED POSTS</CardHeader>
                {userDetails.savedPosts.length > 0 ?
                  <ul>
                    {userDetails.savedPosts.map((post, id: number) => {
                      return <CardContent className="hover:text-purple-400 duration-300 my-2" key={id}><Link href={`/post/${post.blogPostId}`}>{post.blogPostTitle}</Link></CardContent>
                    })}
                  </ul>
                  :
                  <p className="text-center tracking-tighter font-extralight mt-2">You haven't bookmarked any articles yet...</p>
                }
              </Card>
            </div>
          </CardHeader>
          <p className="font-extralight font-mono text-center text-xs">ID: {userDetails.id}</p>
        </Card>
      </div>
    )
  }
}
