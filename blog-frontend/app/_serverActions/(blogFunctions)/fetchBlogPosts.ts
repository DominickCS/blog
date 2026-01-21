'use server'

export default async function FetchBlogPosts() {
  try {
    const response = await fetch(`${process.env.API_URL}/posts/all`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return { isError: false, data: await response.json(), message: "Fetched latest blog posts!" }
  } catch (error) {
    return ({ isError: true, data: null, message: error })
  }
}
