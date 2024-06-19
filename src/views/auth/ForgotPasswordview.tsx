import { requestPasswordCode } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { ForgotPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
	const initialValues: ForgotPasswordForm = {
		email: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestPasswordCode,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  })

	const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

	return (
		<>
			<h1 className="text-5xl font-black text-white">Restablecer Contraseña</h1>
			<p className="text-2xl font-light text-white mt-5">
				Llena el formulario para {""}
				<span className=" text-fuchsia-500 font-bold"> restablecer tu contraseña</span>
			</p>

			<form
				onSubmit={handleSubmit(handleForgotPassword)}
				className="space-y-8 p-10 mt-10 bg-white"
				noValidate
			>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl" htmlFor="email">
						Correo
					</label>
					<input
						id="email"
						type="email"
						placeholder="Correo de Registro"
						className="w-full p-3  border-gray-300 border"
						{...register("email", {
							required: "El correo de registro es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Correo no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input
					type="submit"
					value="Enviar Instrucciones"
					className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer transition-colors"
				/>
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link
					to="/auth/login"
					className="text-center text-gray-300 font-normal"
				>
					¿Ya tienes cuenta? Iniciar Sesión
				</Link>

				<Link
					to="/auth/register"
					className="text-center text-gray-300 font-normal"
				>
					¿No tienes cuenta? Crea una
				</Link>
			</nav>
		</>
	);
}
