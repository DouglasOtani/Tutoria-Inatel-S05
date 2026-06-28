type FilterChipProps = {
	label: string;
	active?: boolean;
	onClick?: () => void;
};

export function FilterChip({ label, active, onClick }: FilterChipProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
				active
					? "border-azul-inatel bg-azul-inatel text-white"
					: "border-border bg-white text-foreground hover:bg-azul-inatel/10 hover:text-azul-inatel"
			}`}
		>
			{label}
		</button>
	);
}
