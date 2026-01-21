'use client'
import NavigationBar from "@/app/_components/ui/navbar";
import FetchUserDetails from "../_serverActions/(auth)/fetchUserDetails";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        const response = await FetchUserDetails()
        setUserDetails(response)
        console.log(response)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchUserProfile();
  }, []);


  if (!loading && userDetails) {
    return (
      <div>
        <NavigationBar />
        <div>
          {/* {userDetails.likedPosts.map((post) => { */}
          {/*   <p></p> */}
          {/* })} */}
        </div>
      </div>
    )
  }
}
