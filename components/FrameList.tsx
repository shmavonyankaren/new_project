import { FrameListItemType } from "@/types"
import FrameListItem from "./FrameListItem"

type FrameListProps = {
	items: FrameListItemType[]
}

export default function FrameList({ items }: FrameListProps) {
	return (
		<div className="frame-list grid grid-cols-2 gap-2 gap-y-2 h-full">
			{items.map(item => (
				<FrameListItem item={item} key={item.id} />
			))}
		</div>
	)
}