import { useEffect, useState } from 'react'
import { fetchMovies, fetchCategories } from '@/api'
import { Category, Movie } from '@/types'

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [showFeatured, setShowFeatured] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories()
      setCategories(categories)

      const movies = await fetchMovies(selectedCategories)
      setMovies(movies)
    }

    fetchData()
  }, [selectedCategories])

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showFeatured || movie.featured) &&
      (selectedCategories.length === 0 || selectedCategories.includes(movie.category.id))
  )

  const handleCategoryChange = (checked: boolean, categoryId: number) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)
    )
  }

  return {
    movies,
    categories,
    selectedCategories,
    showFeatured,
    searchTerm,
    filteredMovies,
    handleCategoryChange,
    setSearchTerm,
    setShowFeatured,
  }
}
