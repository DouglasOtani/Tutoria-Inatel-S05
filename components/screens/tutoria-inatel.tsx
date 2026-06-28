"use client";
import {
	Bell,
	Calculator,
	Code2,
	Atom,
	BookOpen,
	Users,
	Clock3,
	ArrowRight,
	CalendarDays,
	UserRound,
	ChevronDown,
	ChevronUp,
	CheckCircle2,
	type LucideIcon,
} from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { ClassCard } from "@/components/tutoria/class-card";
import { SectionHeader } from "@/components/tutoria/section-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { useAgendamentos } from "@/contexts/agendamentos-context";
import { useRouter } from "next/navigation";

type TutoriaDestaque = {
	title: string;
	tutorCount: number;
	nextTime: string;
	icon: LucideIcon;
};

const tutorias: TutoriaDestaque[] = [
	{
		title: "Cálculo I",
		tutorCount: 12,
		nextTime: "Hoje, 18:00",
		icon: Calculator,
	},
	{
		title: "Programação",
		tutorCount: 15,
		nextTime: "Amanhã, 14:00",
		icon: Code2,
	},
	{
		title: "Física I",
		tutorCount: 8,
		nextTime: "Hoje, 19:00",
		icon: Atom,
	},
	{
		title: "Física II",
		tutorCount: 10,
		nextTime: "Sexta, 13:00",
		icon: BookOpen,
	},
];

export function TutoriaInatel() {
	const { agendamentos, cancelarAgendamento } = useAgendamentos();
	const navigate = useRouter();
	return (
		<div className="min-h-screen bg-white md:flex">
			<BottomNavigation />

			<div className="flex-1 pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
				<div className="max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl">
					<header className="flex items-center justify-between px-4 py-3 md:py-6">
						<img
							src="/inatel-logo.png"
							alt="Inatel"
							className="h-6 w-auto max-w-[72px] object-contain md:hidden"
						/>
						<div className="hidden md:block w-10" />
						<h1 className="text-lg font-semibold">Tutor Inatel</h1>
						<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
							<Bell className="h-6 w-6" />
						</button>
					</header>

					{/* Search */}
					<div className="px-4 mb-6">
						<SearchInput placeholder="Buscar tutores, matérias, horários..." />
					</div>

					{/* Próximas Aulas */}
					<div className="px-4 mb-6">
						<SectionHeader title="Próximas aulas" />
						{agendamentos.map((agendamento, index) => (
							<ClassCard
								key={index}
								date={agendamento.data.toLocaleDateString("pt-BR")}
								time={agendamento.time}
								subject={agendamento.subject}
								professor={agendamento.tutorName}
								duration={agendamento.duration}
								status={agendamento.status}
								description={agendamento.description}
								observations={agendamento.observations}
								onCancel={() => cancelarAgendamento(index)}
							/>
						))}
					</div>

					{/* Matérias em destaque */}
					<div className="px-4 mb-6">
						<SectionHeader title="Matérias em destaque" />

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{tutorias.map((tutoria, index) => {
								const Icon = tutoria.icon;

								return (
									<div
										key={index}
										className="rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
									>
										<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-azul-inatel/10 text-azul-inatel">
											<Icon className="h-6 w-6" />
										</div>

										<h3 className="font-semibold">{tutoria.title}</h3>

										<div className="mt-3 space-y-2 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4" />
												<span>{tutoria.tutorCount} tutores disponíveis</span>
											</div>

											<div className="flex items-center gap-2">
												<Clock3 className="h-4 w-4" />
												<span>{tutoria.nextTime}</span>
											</div>
										</div>

										<button
											className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition hover:bg-muted"
											onClick={() => navigate.push("/buscar-tutores")}
											type="button"
										>
											Ver tutores
											<ArrowRight className="h-4 w-4" />
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
