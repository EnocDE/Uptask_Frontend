import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const location = useLocation() // Obtenemos un objeto con toda la información de la locación
  const queryParams = new URLSearchParams(location.search) // Extraemos los querys de busqueda
  const taskId = queryParams.get('editTask')!

  const params = useParams()
  const projectId = params.projectId!

  const { data, isError }  = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({taskId, projectId}),
    enabled: !!taskId, // Convierte a boolean
    retry: false
  })
  
  if (isError) return <Navigate to='/404' />
  if (data) return <EditTaskModal data={data} projectId={projectId} taskId={taskId} />
}
