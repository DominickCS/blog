'use server'

import { authenticatedRequest } from "@/app/lib/api"

export default async function BlogPostLikeHandler(blogPostID: string) {
  try {
    const response = await authenticatedRequest("http://localhost:8080/like", {
      method: "POST",
      body: JSON.stringify({
        "id": blogPostID
      })
    })

    if (response.unauthorized) {
      return {
        isError: true, message: "You must be signed in to perform this action."
      }
    }

    return { isError: false, message: "BlogPostLikeHandler function completed sucessfully!" }
  } catch (error) {
    return { isError: true, message: error }
  }
}
