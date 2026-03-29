'use client';

import Navbar from "components/navbar";
import PricingSection from "components/PricingSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaBolt,
    FaReceipt,
    FaUtensils,
    FaChartBar,
    FaExclamationCircle,
    FaCheck,
    FaTable,
    FaClipboardList,
    FaListAlt,
    FaTachometerAlt,
    FaRocket,
    FaChartLine,
    FaSmile,
    FaStore,
    FaCoffee,
    FaHamburger,
    FaWineGlassAlt,
    FaBeer,
    FaQuoteLeft,
} from "react-icons/fa";
import { useLocaleContext } from "i18n/LocaleContext";
import type { WelcomeMessages } from "i18n/catalog/welcome-pt";

const CONTAINER = "max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10";
const SECTION_PY = "py-12 sm:py-16 md:py-20";

const HERO_ICONS = [FaBolt, FaReceipt, FaUtensils, FaChartBar];
const FUNC_ICONS = [FaTable, FaClipboardList, FaListAlt, FaTachometerAlt];
const BEN_ICONS = [FaRocket, FaChartLine, FaUtensils, FaChartBar, FaSmile];
const AUD_ICONS = [FaStore, FaUtensils, FaCoffee, FaHamburger, FaWineGlassAlt, FaBeer];

const WelcomePage = () => {
    const [textVisible, setTextVisible] = useState(false);
    const { messages } = useLocaleContext();
    const w = messages.welcome as WelcomeMessages;

    useEffect(() => {
        const timer = setTimeout(() => setTextVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const heroBeneficios = w.heroBenefits.map((item, i) => ({
        icon: HERO_ICONS[i] ?? FaBolt,
        label: item.label,
    }));

    const funcionalidades = w.features.items.map((item, i) => ({
        icon: FUNC_ICONS[i] ?? FaTable,
        titulo: item.title,
        descricao: item.desc,
    }));

    const beneficiosEstabelecimento = w.benefits.items.map((item, i) => ({
        icon: BEN_ICONS[i] ?? FaRocket,
        texto: item.text,
    }));

    const paraQuem = w.audience.labels.map((item, i) => ({
        icon: AUD_ICONS[i] ?? FaStore,
        label: item.label,
    }));

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section
                className={`pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-10 transition-opacity duration-700 ${
                    textVisible ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className={CONTAINER}>
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-16">
                        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] xl:text-5xl font-bold text-black leading-tight">
                                {w.hero.title}
                            </h1>
                            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {w.hero.subtitle}
                            </p>
                            <ul className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                                {heroBeneficios.map(({ icon: Icon, label }) => (
                                    <li
                                        key={label}
                                        className="inline-flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md text-sm font-medium text-gray-800"
                                    >
                                        <Icon className="w-4 h-4 text-black flex-shrink-0" />
                                        {label}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                <Link
                                    href="#demonstracao"
                                    className="inline-flex items-center justify-center bg-black text-white px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-800 transition-colors border border-black"
                                >
                                    {w.hero.ctaDemo}
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center bg-white text-black border border-black px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-black hover:text-white transition-colors"
                                >
                                    {w.hero.ctaTrial}
                                </Link>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-md order-1 lg:order-2">
                            <img
                                src="/imagem-apresentacao.jpg"
                                alt={w.imgAltPresentation}
                                className="w-full h-auto rounded-lg shadow-xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="problemas" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-8 sm:mb-10">
                        {w.problems.title}
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                        {w.problems.intro}
                    </p>
                    <ul className="max-w-2xl mx-auto space-y-2 mb-8">
                        {w.problems.items.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
                            >
                                <FaExclamationCircle className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-3">
                        {w.problems.affect}
                    </p>
                    <ul className="max-w-md mx-auto space-y-2 text-center">
                        {w.problems.impacts.map((item) => (
                            <li key={item} className="text-gray-800 font-medium text-sm sm:text-base">
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="solucao" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        {w.solution.title}
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-8">
                        {w.solution.intro}
                    </p>
                    <ul className="max-w-2xl mx-auto space-y-3 mb-6">
                        {w.solution.items.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                                <FaCheck className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-center text-gray-700 font-medium text-sm sm:text-base">
                        {w.solution.closing}
                    </p>
                </div>
            </section>

            <section id="como-funciona" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-10 sm:mb-12">
                        {w.howItWorks.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                        {w.howItWorks.steps.map((step, idx) => (
                            <div
                                key={step.title}
                                className="flex gap-4 bg-white p-5 sm:p-6 rounded-lg border border-gray-200 shadow-sm"
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-black mb-2">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="funcionalidades" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-10 sm:mb-12">
                        {w.features.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
                        {funcionalidades.map(({ icon: Icon, titulo, descricao }) => (
                            <div
                                key={titulo}
                                className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-black mb-2">{titulo}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{descricao}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200">
                        <h3 className="text-base font-bold text-black mb-3">{w.features.extraTitle}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {w.features.extras.map((item) => (
                                <li
                                    key={item}
                                    className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-700"
                                >
                                    <FaCheck className="w-3.5 h-3.5 text-zinc-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="beneficios" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-8 sm:mb-10">
                        {w.benefits.title}
                    </h2>
                    <ul className="max-w-2xl mx-auto space-y-4">
                        {beneficiosEstabelecimento.map(({ icon: Icon, texto }) => (
                            <li
                                key={texto}
                                className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-gray-800 font-medium text-sm sm:text-base">{texto}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="demonstracao" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        {w.demo.title}
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                        {w.demo.intro}
                    </p>
                    <div className="flex justify-center mb-8">
                        <div className="w-full max-w-3xl aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                            <img
                                src="/imagem-apresentacao.jpg"
                                alt={w.demo.imgAlt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center bg-black text-white px-6 py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-800 transition-colors border border-black"
                        >
                            {w.demo.cta}
                        </Link>
                    </div>
                </div>
            </section>

            <section id="para-quem" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-6 sm:mb-8">
                        {w.audience.title}
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                        {w.audience.intro}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {paraQuem.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="inline-flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm"
                            >
                                <Icon className="w-5 h-5 text-black" />
                                <span className="font-medium text-gray-800 text-sm sm:text-base">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PricingSection />

            <section id="cta-final" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={`${CONTAINER} text-center`}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                        {w.ctaFinal.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        {w.ctaFinal.text}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center bg-black text-white px-6 py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-800 transition-colors border border-black"
                        >
                            {w.ctaFinal.trial}
                        </Link>
                        <Link
                            href="/contato"
                            className="inline-flex items-center justify-center bg-white text-black border border-black px-6 py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-black hover:text-white transition-colors"
                        >
                            {w.ctaFinal.book}
                        </Link>
                    </div>
                </div>
            </section>

            <section id="feedbacks" className={`${SECTION_PY} px-4 sm:px-6 md:px-8 lg:px-10`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        {w.testimonials.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
                        {w.testimonials.items.map(({ text, author, role }) => (
                            <div
                                key={author}
                                className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200 flex flex-col"
                            >
                                <FaQuoteLeft className="w-8 h-8 text-black/20 mb-3 flex-shrink-0" />
                                <p className="text-sm sm:text-base text-gray-700 mb-4 flex-1 leading-relaxed">
                                    &ldquo;{text}&rdquo;
                                </p>
                                <p className="font-bold text-black text-sm sm:text-base">{author}</p>
                                <p className="text-xs sm:text-sm text-gray-500">{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-black text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8">
                <div className={`${CONTAINER} flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8`}>
                    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <a href="#problemas" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.problems}
                        </a>
                        <a href="#solucao" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.solution}
                        </a>
                        <a href="#como-funciona" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.how}
                        </a>
                        <a href="#funcionalidades" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.features}
                        </a>
                        <a href="#beneficios" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.benefits}
                        </a>
                        <a href="#demonstracao" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.demo}
                        </a>
                        <a href="#planos" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.plans}
                        </a>
                        <a href="/contato" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.contact}
                        </a>
                        <a href="/privacidade" className="text-sm sm:text-base hover:text-zinc-500 transition-colors">
                            {w.footer.privacy}
                        </a>
                    </nav>
                    <p className="text-center md:text-right text-xs sm:text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} QRCoffee. {w.footer.rights}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;
