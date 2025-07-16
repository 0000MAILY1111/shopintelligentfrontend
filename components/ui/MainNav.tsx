import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

async function getCategories() {
  try {
    const url = `${process.env.API_URL}/categories`;
    const req = await fetch(url, {
      cache: 'no-store', // O 'force-cache' según necesites
      next: { revalidate: 3600 } // Revalidar cada hora
    });

    if (!req.ok) {
      throw new Error(`HTTP error! status: ${req.status}`);
    }

    const json = await req.json();
    console.log('Categories response:', json);
    
    // Validar que json sea un array antes de parsear
    if (!Array.isArray(json)) {
      console.error('Expected array but received:', typeof json);
      return [];
    }
    
    const categories = CategoriesResponseSchema.parse(json);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function MainNav() {
  const categories = await getCategories();
  
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between">
      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="text-white hover:text-green-300 transition-colors font-bold p-2"
          >
            {category.name}
          </Link>
        ))}
        <Link
          href="/admin/sales"
          className="rounded bg-green-400 font-bold py-2 px-4 text-black hover:bg-green-500 transition-colors"
        >
          Panel de Administración
        </Link>
      </nav>
    </header>
  );
}