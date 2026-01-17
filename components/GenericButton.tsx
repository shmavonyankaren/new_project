export default function GenericButton({ text, isDisabled = true }: { text: string, isDisabled: boolean }) {
	return (
		<div className="generic-button-container">
			<button type="submit" className="cursor-pointer generic-button  disabled:opacity-60 
			disabled:cursor-not-allowed" disabled={isDisabled} >
				{text} →
			</button>
		</div>
	)
}