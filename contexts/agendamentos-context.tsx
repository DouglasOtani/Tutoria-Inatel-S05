"use client";

import { createContext, useContext, useState } from "react";

interface Agendamento {
	tutorName: string;
	subject: string;
	data: Date;
	time: string;
	duration: string;
	status: string;
	description: string;
	observations: string;
}

interface AgendamentosContextType {
	agendamentos: Agendamento[];
	adicionarAgendamento: (agendamento: Agendamento) => void;
	cancelarAgendamento: (index: number) => void;
}

const AgendamentosContext = createContext<AgendamentosContextType | null>(null);

export function AgendamentosProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

	const adicionarAgendamento = (agendamento: Agendamento) => {
		setAgendamentos((prev) => [...prev, agendamento]);
	};

	const cancelarAgendamento = (index: number) => {
		setAgendamentos((prev) =>
			prev.filter((_, agendamentoIndex) => agendamentoIndex !== index),
		);
	};

	return (
		<AgendamentosContext.Provider
			value={{ agendamentos, adicionarAgendamento, cancelarAgendamento }}
		>
			{children}
		</AgendamentosContext.Provider>
	);
}

export function useAgendamentos() {
	const context = useContext(AgendamentosContext);
	if (!context)
		throw new Error(
			"useAgendamentos precisa estar dentro do AgendamentosProvider",
		);
	return context;
}
