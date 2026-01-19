'use server'
import { authenticatedRequest } from "@/app/lib/api"

export default async function createNewPost(title: string, body: string, tags: Array<string>) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/new/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogTitle: title,
        blogBody: body,
        blogTags: tags,
        blogHeaderURL: ""
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return { isError: false, data: await response.json(), errorMessage: undefined }
  } catch (error) {
    return { isError: true, data: null, errorMessage: "An error occurred during post creation: " + error }
  }
}
