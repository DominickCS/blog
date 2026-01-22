'use server'

import { authenticatedRequest } from "@/app/lib/api"

export default async function AddNewReply(commentID: string, replyBody: string) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/new/reply`, {
      method: "POST",
      body: JSON.stringify({
        associatedBlogComment: commentID,
        replyBody: replyBody
      })
    })

    console.log(response.data.text())

    return { isError: false, message: "Reply added to comment successfully!" }
  } catch (error) {
    return { isError: true, message: error }
  }
}
