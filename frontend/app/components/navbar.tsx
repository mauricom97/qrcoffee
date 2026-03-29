'use client';

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "contexts/AuthContext";
import { useLocaleContext } from "i18n/LocaleContext";
import LanguageSwitcher from "components/LanguageSwitcher";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { t } = useLocaleContext();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = user ? (
        <>
            <span className="text-sm text-gray-600 border-r border-black pr-3 mr-3 hidden sm:inline">
                {user.companyName} · {user.name}
            </span>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <Link
                href="/dashboard"
                className="bg-white border border-black hover:bg-black hover:text-white text-black px-4 py-2 text-base"
            >
                {t("sidebar.dashboard")}
            </Link>
            <button
                type="button"
                onClick={() => { toggleMenu(); logout(); window.location.href = '/'; }}
                className="bg-white border border-black hover:bg-black hover:text-white text-black px-4 py-2 text-base"
            >
                {t("sidebar.logout")}
            </button>
        </>
    ) : (
        <>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <Link
                href="/register"
                className="bg-white border border-black hover:bg-black hover:text-white text-black px-4 py-2 text-base"
            >
                {t("navbar.registerCompany")}
            </Link>
            <Link
                href="/login"
                className="bg-white border border-black hover:bg-black hover:text-white text-black px-4 py-2 text-base"
            >
                {t("navbar.login")}
            </Link>
        </>
    );

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border border-black text-black shadow-md z-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
                <Link href="/" className="text-base sm:text-lg font-bold border border-black p-2 sm:p-3 hover:bg-black hover:text-white transition-colors">
                    <p className="uppercase font-bold">{t("navbar.brand")}</p>
                </Link>
                
                <div className="hidden sm:flex items-center space-x-4">
                    {navLinks}
                </div>
                
                <div className="sm:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none" aria-label={t("navbar.menuAria")}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            {isMenuOpen && (
                <div className="sm:hidden bg-white border-t border-black px-4 py-3 flex flex-col space-y-2">
                    {user ? (
                        <>
                            <p className="text-sm text-gray-600 py-1">{user.companyName} · {user.name}</p>
                            <div className="py-2">
                                <LanguageSwitcher />
                            </div>
                            <Link
                                href="/dashboard"
                                className="bg-white border border-black hover:bg-black hover:text-white text-black px-3 py-2 text-sm w-full text-left rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("sidebar.dashboard")}
                            </Link>
                            <button
                                type="button"
                                onClick={() => { logout(); window.location.href = '/'; }}
                                className="bg-white border border-black hover:bg-black hover:text-white text-black px-3 py-2 text-sm w-full text-left rounded"
                            >
                                {t("sidebar.logout")}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="px-3 py-2">
                                <LanguageSwitcher />
                            </div>
                            <Link href="/register" className="bg-white border border-black hover:bg-black hover:text-white text-black px-3 py-2 text-sm w-full text-left rounded" onClick={toggleMenu}>
                                {t("navbar.registerCompany")}
                            </Link>
                            <Link href="/login" className="bg-white border border-black hover:bg-black hover:text-white text-black px-3 py-2 text-sm w-full text-left rounded" onClick={toggleMenu}>
                                {t("navbar.login")}
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;