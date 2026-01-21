'use server'
export default async function FetchSinglePost(blogPostID: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/posts/single`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": blogPostID
      })
    })
    return { isError: false, data: await response.json(), message: "Fetched post successfully!" }
  } catch (error) {
    return { isError: true, data: null, message: error }
  }
}

