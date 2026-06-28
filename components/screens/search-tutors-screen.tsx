"use client";

import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChip } from "@/components/search/filter-chip";
import { TutorCard } from "@/components/search/tutor-card";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const filters = [
	{ label: "Todas as matérias" },
	{ label: "Online" },
	{ label: "Presencial" },
];

const tutors = [
	{
		name: "João Silva",
		subjects: "Cálculo I, Cálculo II",
		rating: 4.8,
		reviewCount: 23,
		hourlyRate: "R$ 60,00 / hora",
		isOnline: true,
		bio: "Monitor de Cálculo I e Cálculo II",
		experience: "3 períodos de experiência",
		availability: "Segunda a Sexta, 9h-18h",
		description:
			"Aulas focadas em resolução de exercícios e preparação para provas.",
		observations: "Aulas nas salas da biblioteca do Inatel (Combinar sala).",
		horariosDisponiveis: ["09:00", "10:00", "13:00", "15:00"],
		diasOcupados: [
			new Date(2026, 5, 10),
			new Date(2026, 5, 12),
			new Date(2026, 5, 17),
		],
	},
	{
		name: "Maria Souza",
		subjects: "Física I, Física II",
		rating: 4.6,
		reviewCount: 18,
		hourlyRate: "R$ 55,00 / hora",
		isOnline: false,
		bio: "Monitor de Física I e Física II",
		experience: "6 períodos de experiência",
		availability: "Segunda a Sexta, 10h-19h",
		description: "Aulas com foco em teoria e experimentos práticos de Física.",
		observations: "Atendimento preferencialmente no laboratório FabLab.",
		horariosDisponiveis: ["10:00", "13:00", "15:00"],
		diasOcupados: [
			new Date(2026, 5, 11),
			new Date(2026, 5, 15),
			new Date(2026, 5, 18),
		],
	},
	{
		name: "Pedro Almeida",
		subjects: "Programação, Algoritmos",
		rating: 4.9,
		reviewCount: 31,
		hourlyRate: "R$ 70,00 / hora",
		isOnline: true,
		bio: "Monitor de Programação e Algoritmos",
		experience: "3 períodos de experiência",
		availability: "Segunda a Sexta, 11h-20h",
		description: "Aulas práticas de programação com projetos reais.",
		observations: "Aulas online via Teams.",
		horariosDisponiveis: ["09:00", "11:00", "14:00", "16:00"],
		diasOcupados: [
			new Date(2026, 5, 12),
			new Date(2026, 5, 15),
			new Date(2026, 5, 19),
		],
	},
	{
		name: "Ana Clara",
		subjects: "Química Geral, Orgânica",
		rating: 4.7,
		reviewCount: 15,
		hourlyRate: "R$ 50,00 / hora",
		isOnline: false,
		bio: "Monitor de Química Geral e Orgânica",
		experience: "2 períodos de experiência",
		availability: "Segunda a Sexta, 12h-21h",
		description: "Aulas de Química com foco em exercícios e reações.",
		observations:
			"Atende na sala de estudos da biblioteca do Inatel (Combinar sala).",
		horariosDisponiveis: ["14:00", "16:00", "19:00"],
		diasOcupados: [
			new Date(2026, 5, 16),
			new Date(2026, 5, 18),
			new Date(2026, 5, 19),
		],
	},
];

export function SearchTutorsScreen() {
	const [filtroAtivo, setFiltroAtivo] = useState(0);
	const [horariosOcupados, setHorariosOcupados] = useState<
		Record<string, string[]>
	>({});
	const navigate = useRouter();
	const tutoresFiltrados = tutors.filter((tutor) => {
		if (filtroAtivo === 0) return true; // Todas as matérias
		if (filtroAtivo === 1) return tutor.isOnline; // Online
		if (filtroAtivo === 2) return !tutor.isOnline; // Presencial
	});

	const bloquearHorario = (tutorName: string, data: Date, horario: string) => {
		const chave = `${tutorName}-${data.toLocaleDateString("pt-BR")}`;
		setHorariosOcupados((prev) => ({
			...prev,
			[chave]: [...(prev[chave] ?? []), horario],
		}));
	};

	return (
		<div className="min-h-screen bg-white md:flex">
			<BottomNavigation />

			<div className="flex-1 pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
				<div className="max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl">
					{/* Header */}
					<header className="flex items-center justify-between px-4 py-3 md:py-6">
						<button
							className="p-2 text-azul-inatel hover:bg-azul-inatel/10 rounded-full transition-colors"
							onClick={() => navigate.push("/tutoria")}
							type="button"
						>
							<ChevronLeft className="h-6 w-6" />
						</button>

						<h1 className="text-lg font-semibold flex-1 text-center">
							Buscar Tutores
						</h1>
					</header>

					{/* Search */}
					<div className="px-4 mb-4">
						<SearchInput placeholder="Buscar por nome ou matéria..." />
					</div>

					{/* Filters */}
					<div className="px-4 mb-6">
						<div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
							{filters.map((filter, index) => (
								<FilterChip
									key={index}
									label={filter.label}
									active={filtroAtivo === index}
									onClick={() => setFiltroAtivo(index)}
								/>
							))}
						</div>
					</div>

					{/* Tutor List */}
					<div className="px-4 space-y-4">
						{tutoresFiltrados.map((tutor, index) => (
							<TutorCard
								key={index}
								name={tutor.name}
								subjects={tutor.subjects}
								rating={tutor.rating}
								reviewCount={tutor.reviewCount}
								hourlyRate={tutor.hourlyRate}
								isOnline={tutor.isOnline}
								bio={tutor.bio}
								experience={tutor.experience}
								availability={tutor.availability}
								description={tutor.description}
								observations={tutor.observations}
								horariosDisponiveis={tutor.horariosDisponiveis}
								horariosOcupados={horariosOcupados}
								onConfirmar={(data, horario) =>
									bloquearHorario(tutor.name, data, horario)
								}
								diasOcupados={tutor.diasOcupados}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
