"use client";

import { useState } from "react";
import {
	CalendarDays,
	Clock3,
	UserRound,
	ChevronDown,
	ChevronUp,
	CheckCircle2,
} from "lucide-react";

type ClassCardProps = {
	date: string;
	time: string;
	subject: string;
	professor: string;
	duration: string;
	status: string;
	description?: string;
	observations?: string;
	onCancel?: () => void;
};

export function ClassCard({
	date,
	time,
	subject,
	professor,
	duration,
	status,
	description,
	observations,
	onCancel,
}: ClassCardProps) {
	const [showDetails, setShowDetails] = useState(false);
	const [showCancelConfirm, setShowCancelConfirm] = useState(false);

	return (
		<div className="rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
			<div className="flex items-start justify-between gap-4">
				<div className="flex gap-4">
					<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-azul-inatel/10 text-azul-inatel">
						<CalendarDays className="h-6 w-6" />
					</div>

					<div>
						<h3 className="font-semibold text-foreground">
							{date}, {time}
						</h3>

						<p className="mt-1 font-medium text-azul-inatel">{subject}</p>

						<div className="mt-2 space-y-1 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<UserRound className="h-4 w-4" />
								<span>{professor}</span>
							</div>

							<div className="flex items-center gap-2">
								<Clock3 className="h-4 w-4" />
								<span>Duração: {duration}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-1 rounded-full border border-azul-inatel/20 bg-azul-inatel/10 px-3 py-1 text-xs font-medium text-azul-inatel">
					<CheckCircle2 className="h-3.5 w-3.5" />
					{status}
				</div>
			</div>

			{showDetails && (
				<div className="mt-4 rounded-xl border-l-4 border-azul-inatel bg-azul-inatel/5 p-4">
					{description && (
						<div>
							<h4 className="font-semibold text-foreground">
								Detalhes da aula
							</h4>
							<p className="mt-2 text-sm text-muted-foreground">
								{description}
							</p>
						</div>
					)}

					{observations && (
						<div className="mt-4">
							<h4 className="font-semibold text-foreground">Observações</h4>
							<p className="mt-2 text-sm text-muted-foreground">
								{observations}
							</p>
						</div>
					)}
				</div>
			)}

			<button
				type="button"
				onClick={() => setShowDetails(!showDetails)}
				className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-azul-inatel/20 py-2 text-sm font-medium text-azul-inatel transition hover:bg-azul-inatel hover:text-white"
			>
				{showDetails ? "Ocultar detalhes" : "Ver detalhes"}
				{showDetails ? (
					<ChevronUp className="h-4 w-4" />
				) : (
					<ChevronDown className="h-4 w-4" />
				)}
			</button>

			{showCancelConfirm ? (
				<div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4">
					<p className="text-sm font-medium text-red-700">
						Tem certeza que deseja cancelar esta aula?
					</p>

					<div className="mt-3 flex gap-2">
						<button
							type="button"
							onClick={() => setShowCancelConfirm(false)}
							className="flex-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium transition hover:bg-gray-100"
						>
							Voltar
						</button>

						<button
							type="button"
							onClick={() => {
								onCancel?.();
								setShowCancelConfirm(false);
							}}
							className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700"
						>
							Confirmar cancelamento
						</button>
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={() => setShowCancelConfirm(true)}
					className="mt-3 w-full rounded-xl border border-red-200 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
				>
					Cancelar aula
				</button>
			)}
		</div>
	);
}
