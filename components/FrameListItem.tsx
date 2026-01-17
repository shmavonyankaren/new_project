import { FrameListItemType } from "@/types"
import Image from "next/image"

type FrameListItemProps = {
	item: FrameListItemType
}

export default function FrameListItem({ item }: FrameListItemProps) {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-start items-center">
				<Image src={item.logoPath} alt="frame-logo" width={56} height={56} />
			</div>
			<h3 className="frame-list-title" >{item.name}</h3>
			<p className="frame-list-description">{item.description}</p>
		</div>
	)
}