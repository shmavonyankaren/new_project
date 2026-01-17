import Image from "next/image";

export default function AuthFormHeader() {
	return (
		<div className="flex justify-around mt-10">
			<p className="auth-form-header-label w-[405px]">Sign up for Smart Restaurant Tools 100% FREE</p>
			<Image src={"/images/FormLogo.svg"} width={158} height={67}
				alt="form-logo" />
		</div>
	)
}