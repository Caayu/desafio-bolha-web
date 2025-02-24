import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

export const app = new Hono().basePath('/api')

app.get('/movies', async (c) => {
  try {
    const response = await fetch('http://localhost:1337/api/movies?populate=category')

    if (!response.ok) {
      return c.json({ error: 'Failed to fetch movies' }, 500)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

app.get('/categories', async (c) => {
  const res = await fetch('http://localhost:1337/api/categories')
  if (!res.ok) return c.json({ error: 'Failed to fetch categories' }, 500)

  const data = await res.json()

  const categories = data.data.map((category: any) => ({
    id: category.id,
    name: category.name,
  }))

  return c.json(categories)
})

export const GET = handle(app)
export const POST = handle(app)
