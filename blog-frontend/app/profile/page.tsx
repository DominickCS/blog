'use client'
import NavigationBar from "@/app/_components/ui/navbar";
import FetchUserDetails from "../_serverActions/(auth)/fetchUserDetails";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    email: "",
    likedPosts: [],
    savedPosts: []
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
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


  if (loading && !userDetails) {
    return (
      <div>
        <NavigationBar />
        <div className="text-center mt-16">
          <p>Loading user profile...</p>
        </div>
      </div>
    )
  }
  else if (!loading) {
    return (
      <div>
        <NavigationBar />
        <div className="mt-16">
          <div className="text-center">
            <p>Hello, {userDetails.username}!</p>
            <p className="font-extralight">{userDetails.id}</p>
          </div>
        </div>
      </div>
    )
  }
}
