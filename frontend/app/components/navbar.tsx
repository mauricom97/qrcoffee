'use client'
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border border-black text-black shadow-md z-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
                <div className="text-base sm:text-lg font-bold border border-black p-2 sm:p-3">QRC</div>
                
                {/* Botões visíveis em telas maiores */}
                <div className="hidden sm:flex space-x-4">
                    <button className="bg-white border border-black hover:bg-black hover:text-white text-black px-4 py-2 rounded text-base">
                        Criar Usuário
                    </button>
                    <button className="bg-white border border-black hover:bg-black hover:text-white text-black px-4 py-2 rounded text-base">
                        Login
                    </button>
                </div>
                
                {/* Ícone de Hamburger para mobile */}
                <div className="sm:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Menu dropdown para mobile */}
            {isMenuOpen && (
                <div className="sm:hidden bg-red-50 border-t border-black px-4 py-3 flex flex-col space-y-2">
                    <button className="bg-white border border-black hover:bg-black hover:text-white text-black px-3 py-1 rounded text-sm w-full text-left">
                        Criar Usuário
                    </button>
                    <button className="bg-white border border-black hover:bg-black hover:text-white text-black px-3 py-1 rounded text-sm w-full text-left">
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;