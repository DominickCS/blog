'use server'

import { authenticatedRequest } from "@/app/lib/api"

export default async function BlogPostBookmarkHandler(blogPostID: string) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/bookmark`, {
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

    return { isError: false, message: "BlogPostBookmarkHandler function completed sucessfully!" }
  } catch (error) {
    return { isError: true, message: error }
  }
}
