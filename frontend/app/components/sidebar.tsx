"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineDeviceTablet, HiMenu, HiX, HiOutlineLogout } from "react-icons/hi";
import { LuTableOfContents } from "react-icons/lu";
import { FaHome, FaPhone } from "react-icons/fa";
import { MdOutlineTableBar } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { GrCafeteria } from "react-icons/gr";
import { FaQrcode } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import CardapioModal from "components/CardapioModal";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cardapioModalOpen, setCardapioModalOpen] = useState(false);
    const { logout } = useAuth();
    const router = useRouter();
    const { user } = useAuth() || { companyName: '' };
    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push("/");
    };

    return (
        <>
            {/* Botão hamburger visível em todas as telas */}
            <button
                className="fixed top-4 left-4 z-50 bg-white text-black p-2 rounded-md shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>

            {/* Overlay para fechar sidebar ao clicar fora (apenas em mobile, opcional) */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`shadow-lg w-64 h-full z-30 bg-white text-black rounded-r-lg p-6 fixed top-0 left-0 flex flex-col items-center transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >

                <h1 className="uppercase text-2xl font-bold text-center mb-6">{user?.companyName || ''}</h1>
                <ul className="space-y-4 w-full">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <FaHome className="text-xl" />
                            <span className="text-lg font-medium">Dashboard</span>
                        </li>
                    </Link>
                    <Link href="/products" onClick={() => setIsOpen(false)}>
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <GrCafeteria  className="text-xl" />
                            <span className="text-lg font-medium">Produtos</span>
                        </li>
                    </Link>
                    <Link href="/tables" onClick={() => setIsOpen(false)}>
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <MdOutlineTableBar className="text-xl" />
                            <span className="text-lg font-medium">Mesas</span>
                        </li>
                    </Link>
                    <Link href="/tabs" onClick={() => setIsOpen(false)}>
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <HiOutlineDeviceTablet className="text-xl" />
                            <span className="text-lg font-medium">Comandas</span>
                        </li>
                    </Link>

                    <Link href="/orders" onClick={() => setIsOpen(false)}>
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <LuTableOfContents className="text-xl" />
                            <span className="text-lg font-medium">Pedidos</span>
                        </li>
                    </Link>

                    <li
                        className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer"
                        onClick={() => {
                            setCardapioModalOpen(true);
                            setIsOpen(false);
                        }}
                    >
                        <FaQrcode className="text-xl" />
                        <span className="text-lg font-medium">Cardápio</span>
                    </li>

                    <Link href="/cashier" onClick={() => setIsOpen(false)}>
                    <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                        <FaMoneyBillWave className="text-xl" />
                        <span className="text-lg font-medium">Caixa</span>
                    </li>
                    </Link>

                    <Link href="/stock" onClick={() => setIsOpen(false)}>
                    <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                        <FaBox  className="text-xl" />
                        <span className="text-lg font-medium">Estoque</span>
                    </li>
                    </Link>

                    <li className="mt-4 pt-4 border-t border-stone-300">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer w-full text-left"
                        >
                            <HiOutlineLogout className="text-xl" />
                            <span className="text-lg font-medium">Sair</span>
                        </button>
                    </li>
                </ul>
            </div>

            <CardapioModal
                open={cardapioModalOpen}
                onClose={() => setCardapioModalOpen(false)}
            />
        </>
    );
};

export default Sidebar;