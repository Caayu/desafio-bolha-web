import { Category } from './category'

export type Movie = {
  id: number
  title: string
  featured: boolean
  imageUrl: string
  category: Category
}
