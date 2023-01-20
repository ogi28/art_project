import { getToken } from './authenticate'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function getFavorites() {
  const res = await fetch(`${apiURL}/favourites`, {
    method: 'GET',
    headers: {

      Authorization: `JWT ${getToken()}`
    }
  })

  return res.status === 200 ? res.json() : []
}

export async function addToFavorites(id) {
  const res = await fetch(`${apiURL}/favourites/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
  return res.status === 200 ? res.json() : []
}

export async function removeFromFavorites(id) {
  const res = await fetch(`${apiURL}/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
  return res.status === 200 ? res.json() : []
}

export async function getHistory() {
  const res = await fetch(`${apiURL}/history`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })

  return res.status === 200 ? res.json() : []
}

export async function addToHistory(id) {
  const res = await fetch(`${apiURL}/history/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
  return res.status === 200 ? res.json() : []
}

export async function removeFromHistory(id) {
  const res = await fetch(`${apiURL}/history/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
  return res.status === 200 ? res.json() : []
}
