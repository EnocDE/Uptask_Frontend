import { useDroppable } from '@dnd-kit/core'

type DropTaskProps = {
  status: string
}

export default function DropTask({status} : DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  })

  const style = {
    opacity: isOver ? .8 : undefined,
    color: isOver ? '#c026d3' : undefined,
    borderColor: isOver ? '#c026d3' : undefined,
    transition: 'opacity .3s ease-in-out, color .3s ease-in-out, border-color .3s ease-in-out'
  }

  return (
    <div 
      className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-400 mt-5 grid place-content-center text-slate-400 relative z-[-1]"
      ref={setNodeRef}
      style={style}
    >
      Soltar tarea aqui
    </div>
  )
}
