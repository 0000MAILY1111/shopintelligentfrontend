import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

async function getCategories () {
      try {
    const url = `${process.env.API_URL}/categories`;
    const req = await fetch(url);
    
    if (!req.ok) {
      throw new Error(`HTTP error! status: ${req.status}`);
    }
    
    const json = await req.json();
    console.log('Categories response:', json);
    const categories  = CategoriesResponseSchema.parse(json);
    return categories;

  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

}
export default async function MainNav() {
  const categories = await getCategories();
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
        <div className="flex justify-center">
            <Logo />
        </div>

        <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
          {
            categories.map (
              category => (
                <Link
                key={category.id}
                href={`/store/${category.id}`}
                className="text-white hover:text-green-300  transition-colors font-bold padding-2"
                >{ category.name}
                </Link>
              )

            )
          }
        </nav>
    </header>
  )
}
