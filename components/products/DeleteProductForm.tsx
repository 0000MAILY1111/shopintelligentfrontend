import { Product } from "@/src/schemas"

export default function DeleteProductForm() {

    const handleDeleteProduct = async ( {productId} : {productId : Product['id']}) => {
        "use server"
        const url = `${process.env.API_URL}/products/${productId} `
        const req = await fetch (url, {
            method: 'DELETE'
        })
        await req.json ()
    }
    return (
        <form  action={handleDeleteProduct}
        >
            <input type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer" value='Eliminar' />

        </form>
    )
}