import { FrameListItemType } from "@/types"
import FrameListItem from "./FrameListItem"

type FrameListProps = {
	items: FrameListItemType[]
}

export default function FrameList({ items }: FrameListProps) {
	return (
		<div className="grid grid-cols-2 gap-6 gap-y-8 h-full">
			{items.map(item => (
				<FrameListItem item={item} key={item.id} />
			))}
		</div>
	)
}