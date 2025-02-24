'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { MovieItem } from './movie-item'
import { CategoryFilter } from './category-filter'

import { useMovies } from '@/hooks/use-movies'

export default function MovieList() {
  const {
    movies,
    categories,
    selectedCategories,
    showFeatured,
    searchTerm,
    filteredMovies,
    handleCategoryChange,
    setSearchTerm,
    setShowFeatured,
  } = useMovies()

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Filmes</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Procurar filme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
          <div className="flex items-center space-x-2">
            <Switch checked={showFeatured} onCheckedChange={setShowFeatured} id="featured-toggle" />
            <label htmlFor="featured-toggle">Filmes destaques</label>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              Nenhum filme encontrado que corresponda aos seus critérios.
            </p>
          )}
        </main>
      </div>
    </div>
  )
}
