'use server'

export default async function Login(username: string, password: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })

    return { isError: false, data: await response.json(), errorMessage: undefined }

  } catch (error) {
    return { isError: true, data: null, errorMessage: "A error occurred during login: " + error }
  }
}
