'use server'

import { authenticatedRequest } from "@/app/lib/api"

export default async function AddNewComment(blogPostID: string, commentBody: string) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/new/comment`, {
      method: "POST",
      body: JSON.stringify({
        associatedBlogPostID: blogPostID,
        commentBody: commentBody
      })
    })

    console.log(response.data.text())

    return { isError: false, message: "Comment added to post successfully!" }
  } catch (error) {
    return { isError: true, message: error }
  }
}
