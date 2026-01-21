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
    return response.data.json()
  } catch (error) {
    console.log(error)
  }
}
