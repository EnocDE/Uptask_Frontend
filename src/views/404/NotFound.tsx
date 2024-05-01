import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver
        <Link className="text-fuchsia-500" to='/'> al inicio</Link>
      </p>
    </>
  )
}
