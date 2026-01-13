'use client';

import { useState } from 'react';
import { Calendar, ChartColumnStacked, Clock, Pencil } from "lucide-react";
import DatePicker from 'react-datepicker';

export default function ModalAddTarefa() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    return (
        <div className="w-full max-w-md bg-[#C7B4FF] p-6 rounded-lg shadow-lg overflow-visible">
            {/* Título */}
            <div>
                <h2 className="text-2xl text-black">Adicionar Tarefa</h2>
                <div className="border-b border-gray-400"></div>
            </div>
            {/* Hora e Data */}
            <div className="flex flex-row gap-6 mt-7">
                {/* Data */}
                <div className="w-full flex flex-row gap-2 justify-center items-center">
                    <Calendar className="text-black w-10"/>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/AAAA"
                        className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                    />
                </div>
                {/* Hora */}
                <div className="w-full flex flex-row gap-2 justify-center items-center">
                    <Clock className="text-black w-10"/>
                    <DatePicker
                        selected={selectedTime}
                        onChange={(time: Date | null) => setSelectedTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Hora"
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        placeholderText="--:--"
                        className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                    />
                </div>
            </div>
            {/* Categoria */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <ChartColumnStacked className="text-black w-10 mb-1"/>
                <select
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="estudo">Estudo</option>
                    <option value="lazer">Lazer</option>
                </select>
            </div>

            {/* Descrição */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2 pb-10">
                <Pencil className="text-black w-10 mb-1"/>
                <textarea
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                    placeholder="Adicionar uma descrição..."
                />
            </div>

        </div>
    );
}