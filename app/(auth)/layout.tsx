import AuthenticationBackground from "@/components/AuthenticationBackground";
import AuthFormHeader from "@/components/AuthFormHeader";

export default function Layout({ children }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="auth-layout-container flex justify-center items-center h-full">
			<AuthenticationBackground />
			<div className="left-part flex w-[50%] h-full mt-10 justify-center items-center">
				<div className="flex flex-col h-full sm:ml-10 sm:mr-10 flex-1 auth-form-container min-h-[800px]">
					<AuthFormHeader />
					{children}
				</div>
			</div>
		</div>
	)
}