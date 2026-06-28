"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	GraduationCap,
	Clock,
	BarChart3,
	Calendar,
	Menu,
	Search,
} from "lucide-react";

interface NavItem {
	icon: React.ReactNode;
	label: string;
	shortLabel: string;
	href?: string;
}

const iconClass = "h-5 w-5 shrink-0";

export function BottomNavigation() {
	const pathname = usePathname();

	const navItems: NavItem[] = [
		{
			icon: <GraduationCap className={iconClass} />,
			label: "Tutor",
			shortLabel: "Tutor",
			href: "/tutoria",
		},
		{
			icon: <Search className={iconClass} />,
			label: "Buscar Tutores",
			shortLabel: "Buscar",
			href: "/buscar-tutores",
		},
		{
			icon: <Clock className={iconClass} />,
			label: "Horários",
			shortLabel: "Horários",
		},
		{
			icon: <BarChart3 className={iconClass} />,
			label: "Notas",
			shortLabel: "Notas",
		},
		{
			icon: <Calendar className={iconClass} />,
			label: "Frequência",
			shortLabel: "Freq.",
		},
		{
			icon: <Menu className={iconClass} />,
			label: "Menu",
			shortLabel: "Menu",
		},
	];

	const itemClassName = (active: boolean) =>
		`flex flex-1 min-w-0 flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 md:flex-row md:flex-none md:gap-3 md:px-4 md:py-2.5 md:rounded-lg transition-colors cursor-pointer ${
			active ? "text-white bg-blue-700" : "text-white md:hover:bg-blue-700/80"
		}`;

	return (
		<nav className="fixed bottom-0 inset-x-0 z-50 bg-azul-inatel md:relative md:inset-auto md:z-auto md:border-r md:border-gray-200 md:w-64 md:min-h-screen md:flex md:flex-col md:shrink-0 md:pt-6">
			<div className="hidden md:flex md:items-center md:justify-center md:pb-6 md:px-4 md:border-b md:border-blue-700">
				<img
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/inatel-logo.png`}
					alt="Inatel Logo"
					className="h-10 w-auto max-w-[160px] object-contain"
				/>
			</div>

			<div className="flex items-stretch justify-between px-1 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] md:flex-col md:items-stretch md:py-4 md:px-4 md:gap-1 md:pb-4">
				{navItems.map((item) => {
					const active = item.href ? pathname === item.href : false;
					const className = itemClassName(active);
					const label = (
						<span className="w-full text-center text-[10px] leading-tight font-medium truncate md:text-sm md:w-auto">
							<span className="md:hidden">{item.shortLabel}</span>
							<span className="hidden md:inline">{item.label}</span>
						</span>
					);

					if (item.href) {
						return (
							<Link key={item.label} href={item.href} className={className}>
								{item.icon}
								{label}
							</Link>
						);
					}

					return (
						<button
							key={item.label}
							type="button"
							className={className}
							aria-label={item.label}
						>
							{item.icon}
							{label}
						</button>
					);
				})}
			</div>
		</nav>
	);
}
