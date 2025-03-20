import { Category } from '@/types/category'

export async function GET(req: Request) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/categories`);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
    }

    const data = await res.json();

    const categories = data.data.map((category: Category) => ({
      id: category.id,
      name: category.name,
    }));

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
