'use server'
export default async function SearchByTag(tagQuery: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/tag`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tagQuery": tagQuery
      })
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
