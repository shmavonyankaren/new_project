import AuthenticationBackground from "@/components/AuthenticationBackground";
import AuthFormHeader from "@/components/AuthFormHeader";

export default function Layout({ children }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex justify-center items-center">
			<AuthenticationBackground />
			<div className="flex flex-col  auth-form-container mt-[50px] mr-[50px] max-h-[900px] w-[50%]">
				<AuthFormHeader />
				{children}

			</div>
		</div>
	)
}