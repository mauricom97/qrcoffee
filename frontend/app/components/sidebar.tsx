import { useState } from "react";
import Link from "next/link";
import { HiOutlineDeviceTablet, HiMenu, HiX } from "react-icons/hi";
import { LuTableOfContents } from "react-icons/lu";
import { FaHome, FaPhone } from "react-icons/fa";
import { MdOutlineTableBar } from "react-icons/md";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                className={`shadow-lg w-64 h-full z-30 bg-white text-black from-blue-500 to-blue-700 rounded-r-lg p-6 fixed top-0 left-0 flex flex-col items-center transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <img
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-6"
                    src="https://media.licdn.com/dms/image/v2/D4D03AQFIh2dcQ-8QPw/profile-displayphoto-crop_800_800/B4DZqKR5eRIgAQ-/0/1763256540932?e=1768435200&v=beta&t=lBC0r0UhBP9kVw5Ktbey1OxiMWl4NDpM9NtOwAIGgXU"
                    alt="Profile"
                />
                <ul className="space-y-4 w-full">
                    <Link href="/dashboard">
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <FaHome className="text-xl" />
                            <span className="text-lg font-medium">Dashboard</span>
                        </li>
                    </Link>
                    <Link href="/tables">
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <MdOutlineTableBar className="text-xl" />
                            <span className="text-lg font-medium">Mesas</span>
                        </li>
                    </Link>
                    <Link href={"/tabs"}>
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <HiOutlineDeviceTablet className="text-xl" />
                            <span className="text-lg font-medium">Comandas</span>
                        </li>
                    </Link>

                    <Link href="/orders">
                        <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                            <LuTableOfContents className="text-xl" />
                            <span className="text-lg font-medium">Pedidos</span>
                        </li>
                    </Link>



                    <li className="flex items-center space-x-3 hover:bg-stone-300 p-3 rounded-md cursor-pointer">
                        <FaPhone className="text-xl" />
                        <span className="text-lg font-medium">Contact</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;