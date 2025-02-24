import { Star } from 'lucide-react'

import { Movie } from '@/types'

type MovieItemProps = {
  movie: Movie
}

export const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={movie.imageUrl || 'https://placehold.co/400'}
        alt={movie.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{movie.category.name}</p>
        {movie.featured && (
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 mr-1" />
            <span className="text-sm">Destaque</span>
          </div>
        )}
      </div>
    </div>
  )
}
