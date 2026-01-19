export type LanguageOptionType = {
	id: number
	name: string
}

export type FrameListItemType = {
	id: number
	logoPath: string
	name: string
	description: string
}


export type CounryCodeOptionsType = {
	code: string,
	label: string,
	flag: string,
	length: number,
	format: string,
}

export type SignUpInputs = {
	name: string
	email: string
	startDate: Date,
	endDate: Date,
	password: string,
	repeatPassword: string,
}

