"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarrosselDeHabitosProps {
    children: ReactNode;
    /**
     * Número base de itens por página em telas grandes.
     * Em mobile e tablet ele é ajustado automaticamente para 1 e 2.
     */
    slidesPerView?: number;
}

export default function CarrosselDeHabitos({
    children,
    slidesPerView = 3,
}: CarrosselDeHabitosProps) {
    const items = useMemo(() => React.Children.toArray(children), [children]);
    const [currentSlidesPerView, setCurrentSlidesPerView] = useState(slidesPerView);
    const [page, setPage] = useState(0);

    // Responsivo: mobile 1 card, tablet 2, desktop 3 (ou valor base passado)
    useEffect(() => {
        const updateSlidesPerView = () => {
            if (typeof window === "undefined") return;
            const width = window.innerWidth;
            if (width < 640) {
                setCurrentSlidesPerView(1);
            } else if (width < 1024) {
                setCurrentSlidesPerView(2);
            } else {
                setCurrentSlidesPerView(slidesPerView);
            }
        };

        updateSlidesPerView();
        window.addEventListener("resize", updateSlidesPerView);
        return () => window.removeEventListener("resize", updateSlidesPerView);
    }, [slidesPerView]);

    const totalPages = Math.max(
        1,
        Math.ceil(items.length / Math.max(1, currentSlidesPerView))
    );

    const pages = useMemo(
        () =>
            Array.from({ length: totalPages }, (_, pageIndex) => {
                const start = pageIndex * currentSlidesPerView;
                return items.slice(start, start + currentSlidesPerView);
            }),
        [items, currentSlidesPerView, totalPages]
    );

    // Garante que o índice de página sempre seja válido quando o número de páginas muda
    useEffect(() => {
        if (page >= totalPages) {
            setPage(totalPages - 1);
        }
    }, [page, totalPages]);

    const handlePrev = () => {
        setPage((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setPage((prev) => Math.min(totalPages - 1, prev + 1));
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full flex items-center gap-2">
                <button
                    type="button"
                    aria-label="Anterior"
                    className="p-1 rounded-full bg-[#FC809F]/10 text-[#FC809F] disabled:opacity-30 disabled:cursor-default hover:bg-[#FC809F]/20 transition"
                    onClick={handlePrev}
                    disabled={totalPages <= 1 || page === 0}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${page * 100}%)`,
                        }}
                    >
                        {pages.map((pageItems, idx) => (
                            <div
                                key={idx}
                                className="flex justify-center sm:justify-around gap-4 sm:gap-6 px-4 sm:px-10 basis-full shrink-0"
                            >
                                {pageItems}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Próximo"
                    className="p-1 rounded-full bg-[#FC809F]/10 text-[#FC809F] disabled:opacity-30 disabled:cursor-default hover:bg-[#FC809F]/20 transition"
                    onClick={handleNext}
                    disabled={totalPages <= 1 || page === totalPages - 1}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {totalPages > 1 && (
                <div className="flex gap-1 mt-1">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <span
                            key={idx}
                            className={`h-1.5 w-3 rounded-full transition-all ${
                                idx === page ? "bg-[#FC809F]" : "bg-[#FC809F]/40"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
