"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { X } from "lucide-react";
import "react-day-picker/dist/style.css";
import { toast } from "react-toastify";
import { useAgendamentos } from "@/contexts/agendamentos-context";

interface BookingModalProps {
	tutorName: string;
	onClose: () => void;
	diasOcupados: Date[];
	horariosDisponiveis: string[];
	horariosOcupados: Record<string, string[]>;
	onConfirmar: (data: Date, horario: string) => void;
	subject: string;
	description: string;
	observations: string;
}

export function BookingModal({
	tutorName,
	onClose,
	diasOcupados,
	horariosDisponiveis,
	horariosOcupados,
	onConfirmar,
	subject,
	description,
	observations,
}: BookingModalProps) {
	const [diaSelecionado, setDiaSelecionado] = useState<Date | undefined>();
	const [horario, setHorario] = useState("");

	const { adicionarAgendamento } = useAgendamentos();

	const chave = diaSelecionado
		? `${tutorName}-${diaSelecionado.toLocaleDateString("pt-BR")}`
		: "";

	const horariosLivres = horariosDisponiveis.filter(
		(h) => !horariosOcupados[chave]?.includes(h),
	);

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl w-full max-w-sm p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<h2 className="font-semibold text-lg">Agendar com {tutorName}</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-gray-100 rounded-full"
					>
						<X size={20} />
					</button>
				</div>

				{/* Calendário */}
				<DayPicker
					mode="single"
					selected={diaSelecionado}
					onSelect={setDiaSelecionado}
					disabled={[
						{ before: new Date() }, // dias passados
						...diasOcupados, // dias ocupados
					]}
					modifiersClassNames={{
						selected: "bg-black text-white rounded-full",
						disabled: "text-red-400 line-through",
					}}
				/>

				{/* Confirmação */}
				{diaSelecionado && (
					<div className="mt-4 flex flex-col gap-3">
						<p className="text-sm font-medium">Horários disponíveis</p>
						<div className="flex flex-wrap gap-2">
							{horariosLivres.map((h) => (
								<button
									key={h}
									onClick={() => setHorario(h)}
									className={`px-3 py-1 rounded-full text-sm border transition-colors ${
										horario === h
											? "bg-black text-white border-black"
											: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
									}`}
								>
									{h}
								</button>
							))}
						</div>

						{horario && (
							<button
								className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
								onClick={() => {
									adicionarAgendamento({
										tutorName,
										subject,
										data: diaSelecionado,
										time: horario,
										duration: "1h",
										status: "Confirmada",
										description: description,
										observations: observations,
									});
									onConfirmar(diaSelecionado, horario);
									toast.success("Tutoria agendada com sucesso!");
									onClose();
								}}
							>
								Confirmar agendamento
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
