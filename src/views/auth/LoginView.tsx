import { authenticateUser } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginView() {
	const initialValues: UserLoginForm = {
		email: "",
		password: "",
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate, isSuccess } = useMutation({
		mutationFn: authenticateUser,
		onError: (error) => toast.error(error.message)
	});

	const handleLogin = (formData: UserLoginForm) => mutate(formData);

	if (isSuccess) {
		return <Navigate to={'/'}/>
	}

	return (
		<>
			<h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
			<p className="text-2xl font-light text-white mt-5">
				Comienza a planear tus proyectos {""}
				<span className=" text-fuchsia-500 font-bold">
					{" "}
					iniciando sesión en tu cuenta
				</span>
			</p>

			<form
				onSubmit={handleSubmit(handleLogin)}
				className="space-y-8 p-10 bg-white mt-10"
				noValidate
			>
				<div className="flex flex-col gap-5">
					<label htmlFor="email" className="font-normal text-2xl">Correo</label>

					<input
						id="email"
						type="email"
						placeholder="Tu Correo"
						className="w-full p-3 border-gray-300 border"
						{...register("email", {
							required: "El correo es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Correo no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<div className="flex flex-col gap-5">
					<label htmlFor="password" className="font-normal text-2xl">Contraseña</label>

					<input
						type="password"
						placeholder="Tu Contraseña"
						className="w-full p-3  border-gray-300 border"
						{...register("password", {
							required: "La contraseña es obligatoria",
						})}
					/>
					{errors.password && (
						<ErrorMessage>{errors.password.message}</ErrorMessage>
					)}
				</div>

				<input
					type="submit"
					value="Iniciar Sesión"
					className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition-colors"
				/>
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link
					to={"/auth/register"}
					className="text-center text-gray-300 font-normal"
				>
					¿No tienes cuenta? Crear una
				</Link>

				<Link
					to={"/auth/forgot-password"}
					className="text-center text-gray-300 font-normal"
				>
					¿Olvidaste tu contraseña? Restablecela
				</Link>
			</nav>
		</>
	);
}
