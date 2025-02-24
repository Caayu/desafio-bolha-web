export const fetchMovies = async (selectedCategories: number[]) => {
  try {
    const query = selectedCategories.length
      ? `?category=${selectedCategories.join(',')}`
      : ''
    const res = await fetch(`/api/movies${query}`)
    if (!res.ok) {
      throw new Error('Erro ao buscar filmes')
    }
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchCategories = async () => {
  try {
    const res = await fetch('/api/categories')
    if (!res.ok) {
      throw new Error('Erro ao buscar categorias')
    }
    const data = await res.json()
    return data || []
  } catch (error) {
    console.error(error)
    return []
  }
}
