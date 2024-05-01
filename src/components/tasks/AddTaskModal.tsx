import { createTask } from "@/api/TaskAPI";
import { TaskFormData } from "@/types/index";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";

export default function AddTaskModal() {

	const navigate = useNavigate();
  // Leer projectId
  const params = useParams()
  const projectId = params.projectId!
  // Leer si el modal esta activo
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const modalTask = queryParams.get("newTask");
	const modalShow = modalTask ? true : false;

  const initialValues: TaskFormData = {
    name: '',
    description: '',
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: createTask,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["projectView"]})
      reset()
      navigate(location.pathname, {replace: true})
    }
  })

  const handleCreateTask : SubmitHandler<TaskFormData> = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

	return (
			<Transition appear show={modalShow} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => {
            navigate(location.pathname, {replace: true})
          }}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/60" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
									<Dialog.Title as="h3" className="font-black text-4xl  my-5">
										Nueva Tarea
									</Dialog.Title>

									<p className="text-xl font-bold">
										Llena el formulario y crea {""}
										<span className="text-fuchsia-600">una tarea</span>
									</p>

									<form
                    className="mt-10 space-y-3"
                    noValidate
                    onSubmit={handleSubmit(handleCreateTask)}
                  >
                    <TaskForm errors={errors} register={register} />
										<input
											type="submit"
											value={"Guardar tarea"}
											className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors text-xl"
										/>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
	);
}
