import { auth } from '../store/auth'

const baseUrl = import.meta.env.VITE_API_URL

export async function request(path, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth.token) headers.Authorization = `Bearer ${auth.token}`

  const res = await fetch(baseUrl + path, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })
  const data = await res.json()

  if (!res.ok) throw new Error(data.error || data.message || 'Something went wrong')
  return data
}
