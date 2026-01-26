'use server'

import { authenticatedRequest } from "@/app/lib/api"

export default async function FetchUserDetails() {
  try {
    const response = await authenticatedRequest(`${process.env.API_URL}/users/currentuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.unauthorized) {
      return {
        isError: true, message: "You must be signed in to perform this action."
      }
    }

    return { isError: false, data: await response.data.json(), message: "Successfully fetched user details." }
  } catch (error) {
    console.log(error)
  }
}
