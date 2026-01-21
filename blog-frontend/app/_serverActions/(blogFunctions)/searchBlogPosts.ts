'use server'
export default async function SearchBlogPost(query: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/posts/search`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "searchQuery": query
      })
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
