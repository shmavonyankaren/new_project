import Link from "next/link";
import GenericButton from "./GenericButton";

export default function AuthFooter({ buttonText, link, text, linkDesc, isDisabled }: { buttonText: string, link: string, text: string, linkDesc: string, isDisabled: boolean }) {
	return (
		<div className="auth-footer-container pb-5 flex justify-between w-full">
			<div>
				<p className="form-footer-text">{linkDesc} {"  "} <Link className="form-footer-link" href={link}>{text}</Link></p>
				<p className="form-footer-text">By signing up you agree to the <Link href="#" className="form-footer-text underline">Terms of Service </Link>and  <Link href="#" className="form-footer-text underline">Privacy Policy </Link></p>
			</div>
			<GenericButton text={buttonText} isDisabled={isDisabled} />
		</div>
	)
}