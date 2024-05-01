import { ReactNode } from "react";

export default function ErrorMessage({children}: {children: ReactNode}) {
  return (
    <div className="text-center mt-[-10px] bg-red-100 text-red-600 p-3 text-sm uppercase border-l-2 border-red-800 font-bold">
      {children}
    </div>
  )
}
