'use server'
import { authenticatedRequest } from "@/app/lib/api"

export default async function DeleteBlogPost(blogPostID: string) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/delete/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: blogPostID
      }),
    })

    if (!response.data.ok) {
      throw new Error(`HTTP error! status: ${response.data.status}`)
    }

    return { isError: false, message: `${await response.data.text()}` }
  } catch (error) {
    return { isError: true, message: `${error}` }
  }
}
