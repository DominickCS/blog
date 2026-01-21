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
    return { isError: false, data: response.json(), message: "BlogPostLikeHandler function completed sucessfully!" }
  } catch (error) {
    return { isError: true, data: null, message: error }
  }
}
