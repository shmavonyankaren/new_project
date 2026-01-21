import Header from "@/components/Header";

export default function RootHomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			{children}
		</div>
	)
}