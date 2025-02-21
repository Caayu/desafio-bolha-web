'use client'

import { Search, Star } from 'lucide-react'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import type { Movie } from '@/types/movie'

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'A Origem',
    category: 'Ficção Científica',
    featured: true,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 2,
    title: 'Um Sonho de Liberdade',
    category: 'Drama',
    featured: true,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 3,
    title: 'O Cavaleiro das Trevas',
    category: 'Ação',
    featured: true,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 4,
    title: 'Pulp Fiction: Tempo de Violência',
    category: 'Crime',
    featured: false,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 5,
    title: 'Forrest Gump: O Contador de Histórias',
    category: 'Drama',
    featured: false,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 6,
    title: 'Matrix',
    category: 'Ficção Científica',
    featured: true,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 7,
    title: 'Os Bons Companheiros',
    category: 'Crime',
    featured: false,
    imageUrl: 'https://placehold.co/400'
  },
  {
    id: 8,
    title: 'Os Vingadores',
    category: 'Ação',
    featured: true,
    imageUrl: 'https://placehold.co/400'
  }
]

const categories = Array.from(new Set(mockMovies.map(movie => movie.category)))

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFeatured, setShowFeatured] = useState(false)

  const filteredMovies = mockMovies.filter(
    movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(movie.category)) &&
      (!showFeatured || movie.featured)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Filmes</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Procurar filme..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Categorias</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={checked => {
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, category]
                          : selectedCategories.filter(c => c !== category)
                      )
                    }}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showFeatured}
              onCheckedChange={setShowFeatured}
              id="featured-toggle"
            />
            <label htmlFor="featured-toggle">Filmes destaques</label>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={movie.imageUrl || 'https://placehold.co/400'}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{movie.category}</p>
                  {movie.featured && (
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">Destaque</span>
                    </div>
                  )}
                </div>
              </div>
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
