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

    if (response.unauthorized) {
      return {
        isError: true, message: "You must be signed in to perform this action."
      }
    }

    return { isError: false, message: "Reply added to comment successfully!" }
  } catch (error) {
    return { isError: true, message: error }
  }
}
