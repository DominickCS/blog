'use server'

import { authenticatedRequest } from "@/app/lib/api"

export default async function BlogReplyLikeHandler(replyID: string) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/like/comment`, {
      method: "POST",
      body: JSON.stringify({
        "id": replyID
      })
    })

    if (response.unauthorized) {
      return {
        isError: true, message: "You must be signed in to perform this action."
      }
    }

    return { isError: false, message: "BlogCommentLikeHandler function completed sucessfully!" }
  } catch (error) {
    return { isError: true, message: error }
  }
}
