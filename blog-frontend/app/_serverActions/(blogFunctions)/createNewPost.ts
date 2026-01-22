'use server'
import { authenticatedRequest } from "@/app/lib/api"

export default async function createNewPost(title: string, body: string, tags: Array<string>) {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/new/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        blogTitle: title,
        blogBody: body,
        blogTags: tags,
        blogHeaderURL: undefined
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
