type Params = Promise<{categoryId: string}>;    

async function getProducts (categoryId: string) {
 const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  console.log (url);
  console.log("categoryId:", categoryId);
const req = await fetch(url);
  const data = await req.json();
  return data;

}

export default async function StorePage({params}:{params:Params}) {
  const {categoryId} = await params;
  await getProducts(categoryId);
  const products = await getProducts(categoryId);
  console.log("products:", products);
  return (
    <div>StorePage</div>
  );
}   