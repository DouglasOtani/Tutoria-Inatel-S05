interface SectionHeaderProps {
	title: string;
	actionLabel?: string;
	onAction?: () => void;
}

export function SectionHeader({
	title,
	actionLabel,
	onAction,
}: SectionHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-3">
			<h2 className="text-base font-semibold">{title}</h2>
			{actionLabel && (
				<button
					onClick={onAction}
					className="text-sm text-gray-500 hover:text-gray-700"
				>
					{actionLabel}
				</button>
			)}
		</div>
	);
}
