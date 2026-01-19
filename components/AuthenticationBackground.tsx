import FrameList from "./FrameList";
import LanguageSelection from "./LanguageSelector";
import { frameListItems } from "../data"
export default function AuthenticationBackground() {
	return (
		<div className="auth-background flex justify-center items-center flex-col w-[50%] h-full flex-1">
			<div className="pt-15 w-full pr-5 pl-20">
				<LanguageSelection />
				<h1 className="company-name-title text-orange-400"><span className="text-white">Why</span> Tap2Taste...</h1>
				<FrameList items={frameListItems} />
			</div>
		</div>
	);
}