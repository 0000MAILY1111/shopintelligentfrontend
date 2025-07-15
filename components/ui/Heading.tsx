export default function Heading ({children}: {children : React.ReactNode}) { ///para renderizar toda la pagina
    return (
        <h1 className="text-2xl my-10">
            {children}
        </h1>
    )
}