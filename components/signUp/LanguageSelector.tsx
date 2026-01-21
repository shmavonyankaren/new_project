"use client"

import { useState } from "react";
import { languageOptions } from "@/data";
import Image from "next/image";

export default function LanguageSelection() {
	const [currentLanguage, setLanguage] = useState(languageOptions[0].name)
	return (
		<div className="w-50 h-12 pt-2.5 pb-2.5 flex ">
			<Image src="/images/LanguageSymbol.png" width={24} height={24} alt="symbol" />

			<select className="language-dropdown pr-18"
				value={currentLanguage}
				onChange={(e) => setLanguage(e.target.value)}>
				{languageOptions.map(option => (
					<option key={option.id} className="language-option" value={option.name}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
}