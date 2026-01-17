import { CounryCodeOptionsType, FrameListItemType, LanguageOptionType } from "@/types";

export const languageOptions: LanguageOptionType[] = [
	{ id: 1, name: 'English' },
	{ id: 2, name: 'Spanish' },
	{ id: 3, name: 'French' },
];

export const frameListItems: FrameListItemType[] = [
	{
		id: 1,
		name: "Smart ordering",
		logoPath: "/images/Frame1.png",
		description: "Scan QR, pay & order"
	},
	{
		id: 2,
		name: "Smart Upselling",
		logoPath: "/images/Frame2.png",
		description: "Boost Suggest drinks & sides"
	}, {
		id: 3,
		name: "ai waiter",
		logoPath: "/images/Frame3.png",
		description: "Smart order assistant"
	}, {
		id: 4,
		name: "move tables",
		logoPath: "/images/Frame4.png",
		description: "Drag & drop"
	}, {
		id: 5,
		name: "multilingual menus",
		logoPath: "/images/Frame5.png",
		description: "Auto-translated content"
	}, {
		id: 6,
		name: "works with your pos ?",
		logoPath: "/images/Frame6.png",
		description: "Auto-sync orders"
	},
	{
		id: 7,
		name: "photos & videos",
		logoPath: "/images/Frame7.png",
		description: "Visual dish preview"
	}, {
		id: 8,
		name: "multi-location",
		logoPath: "/images/Frame8.png",
		description: "All branches, one panel"
	},
]

export const countryCodeOptions: CounryCodeOptionsType[] = [
	{
		code: "+374",
		label: "Armenia",
		flag: "🇦🇲",
		length: 8,
		format: "99-99-99-99",
	},
	{
		code: "+995",
		label: "Georgia",
		flag: "🇬🇪",
		length: 9,
		format: "999-99-99-99",
	},
	{
		code: "+1",
		label: "USA",
		flag: "🇺🇸",
		length: 10,
		format: "(999) 999-9999",
	},
];