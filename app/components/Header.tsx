import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#7CA3D6]">
            <nav className="w-full max-w-full mx-auto px-6 h-[38px] flex items-center justify-between">
                <div className="flex items-center gap-2 h-full">
                    <Logo />
                </div>
                <Link href="login">
                    <button className="bg-white text-[#7CA3D6] px-6 py-1 rounded-full font-semibold text-sm shadow-none hover:bg-blue-100 transition-colors">
                        ENTRAR
                    </button>
                </Link>
            </nav>
        </header>
    );
}
