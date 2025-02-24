import { Checkbox } from '@/components/ui/checkbox'
import { Category } from '@/types'

type CategoryFilterProps = {
  categories: Category[]
  selectedCategories: number[]
  onCategoryChange: (checked: boolean, categoryId: number) => void
}

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Categorias</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => onCategoryChange(!!checked, category.id)}
            />
            <span>{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
