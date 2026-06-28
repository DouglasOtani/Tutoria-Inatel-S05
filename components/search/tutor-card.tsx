"use client";

import { useState } from "react";
import { Star, ChevronDown, ChevronUp, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { BookingModal } from "./booking-modal";

interface TutorCardProps {
	name: string;
	subjects: string;
	rating: number;
	reviewCount: number;
	hourlyRate: string;
	isOnline?: boolean;
	bio?: string;
	experience?: string;
	availability?: string;
	description: string;
	observations: string;
	diasOcupados: Date[];
	horariosDisponiveis: string[];
	horariosOcupados: Record<string, string[]>;
	onConfirmar: (data: Date, horario: string) => void;
}

export function TutorCard({
	name,
	subjects,
	rating,
	reviewCount,
	hourlyRate,
	isOnline = false,
	bio,
	experience,
	availability,
	description,
	observations,
	diasOcupados,
	horariosDisponiveis,
	horariosOcupados,
	onConfirmar,
}: TutorCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [modalAberto, setModalAberto] = useState(false);

	return (
		<div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
			<div className="flex items-center gap-4 p-4 min-h-32">
				<div className="shrink-0">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-azul-inatel/10 text-azul-inatel">
						<UserRound className="h-7 w-7" />
					</div>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-16">
						<h3 className="font-semibold text-base">{name}</h3>
					</div>

					<p className="text-sm text-gray-500 line-clamp-2">{subjects}</p>

					<div className="flex items-center gap-1 mt-2">
						<Star className="h-4 w-4 fill-current text-gray-700" />
						<span className="text-sm">
							{rating} ({reviewCount} avaliações)
						</span>
					</div>

					<p className="text-sm font-medium mt-1">{hourlyRate}</p>
				</div>

				<div className="flex flex-col items-center gap-2 justify-between h-full">
					<span
						className={`rounded-full px-3 py-1 text-xs font-medium ${
							isOnline
								? "bg-azul-inatel text-white"
								: "bg-azul-inatel/10 text-azul-inatel"
						}`}
					>
						{isOnline ? "Aula Online" : "Aula Presencial"}
					</span>

					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className="flex items-center gap-2 rounded-xl border border-azul-inatel/20 px-4 py-2 text-sm font-medium text-azul-inatel transition hover:bg-azul-inatel hover:text-white"
					>
						{isExpanded ? "Ocultar" : "Detalhes"}

						{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</button>
				</div>
			</div>

			{isExpanded && (
				<div className="border-t border-gray-200 p-4 bg-gray-50 animate-in fade-in">
					<div className="grid gap-4 md:grid-cols-3">
						<div>
							<h4 className="font-semibold mb-1">Sobre</h4>
							<p className="text-sm text-gray-600">{bio}</p>
						</div>

						<div>
							<h4 className="font-semibold mb-1">Experiência</h4>
							<p className="text-sm text-gray-600">{experience}</p>
						</div>

						<div>
							<h4 className="font-semibold mb-1">Disponibilidade</h4>
							<p className="text-sm text-gray-600">{availability}</p>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<button
							className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
							onClick={() => setModalAberto(true)}
						>
							Solicitar Tutoria
						</button>
					</div>
				</div>
			)}
			{modalAberto && (
				<BookingModal
					tutorName={name}
					subject={subjects}
					onClose={() => setModalAberto(false)}
					diasOcupados={diasOcupados}
					horariosDisponiveis={horariosDisponiveis}
					horariosOcupados={horariosOcupados}
					onConfirmar={onConfirmar}
					description={description}
					observations={observations}
				/>
			)}
		</div>
	);
}
