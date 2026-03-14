'use client';

import Navbar from "components/navbar";
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

const CONTAINER = "max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10";
const SECTION_PY = "py-12 sm:py-16 md:py-20";

const WelcomePage = () => {
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTextVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const heroBeneficios = [
        { icon: FaBolt, label: "Atendimento mais ágil" },
        { icon: FaReceipt, label: "Organização de pedidos e comandas" },
        { icon: FaUtensils, label: "Comunicação direta com a cozinha" },
        { icon: FaChartBar, label: "Controle completo das vendas" },
    ];

    const problemas = [
        "Demora no registro de pedidos",
        "Erros de comunicação entre salão e cozinha",
        "Comandas desorganizadas",
        "Dificuldade em acompanhar pedidos em andamento",
        "Clientes esperando para pedir ou fechar a conta",
    ];

    const impactos = [
        "a experiência do cliente",
        "a eficiência da equipe",
        "o faturamento do estabelecimento",
    ];

    const solucaoItens = [
        "registrar pedidos rapidamente",
        "acompanhar mesas em tempo real",
        "organizar comandas automaticamente",
        "enviar pedidos diretamente para a cozinha",
        "acompanhar o andamento do atendimento",
    ];

    const comoFunciona = [
        {
            numero: 1,
            titulo: "Registro de pedidos",
            texto: "Pedidos podem ser registrados rapidamente pela equipe ou pelo próprio cliente, dependendo do modelo de atendimento do estabelecimento.",
        },
        {
            numero: 2,
            titulo: "Organização automática das comandas",
            texto: "Cada mesa ou cliente possui uma comanda digital que organiza todos os pedidos realizados.",
        },
        {
            numero: 3,
            titulo: "Comunicação direta com a cozinha",
            texto: "Assim que um pedido é feito, ele aparece automaticamente para preparação. Isso reduz erros e agiliza o fluxo da cozinha.",
        },
        {
            numero: 4,
            titulo: "Controle do atendimento",
            texto: "O sistema permite acompanhar: mesas abertas, pedidos em preparo, pedidos finalizados e contas em aberto.",
        },
    ];

    const funcionalidades = [
        {
            icon: FaTable,
            titulo: "Gestão de mesas",
            descricao: "Visualização clara das mesas: ocupadas, livres e comandas abertas.",
        },
        {
            icon: FaClipboardList,
            titulo: "Gestão de pedidos",
            descricao: "Controle de pedidos em preparo, entregues e histórico completo.",
        },
        {
            icon: FaListAlt,
            titulo: "Comandas digitais",
            descricao: "Organização automática de tudo que foi consumido em cada mesa ou cliente.",
        },
        {
            icon: FaTachometerAlt,
            titulo: "Painel de controle",
            descricao: "Vendas do dia, movimentação e pedidos em andamento em tempo real.",
        },
    ];

    const recursosAdicionais = [
        "Cardápio digital",
        "Pedidos pelo cliente (opcional)",
        "Relatórios de vendas",
        "Histórico de atendimento",
    ];

    const beneficiosEstabelecimento = [
        { icon: FaRocket, texto: "Redução no tempo de atendimento" },
        { icon: FaChartLine, texto: "Menos erros em pedidos" },
        { icon: FaUtensils, texto: "Melhor comunicação entre equipe e cozinha" },
        { icon: FaChartBar, texto: "Maior controle sobre vendas e operação" },
        { icon: FaSmile, texto: "Melhor experiência para o cliente" },
    ];

    const paraQuem = [
        { icon: FaStore, label: "Bares" },
        { icon: FaUtensils, label: "Restaurantes" },
        { icon: FaCoffee, label: "Cafeterias" },
        { icon: FaHamburger, label: "Lanchonetes" },
        { icon: FaWineGlassAlt, label: "Bistrôs" },
        { icon: FaBeer, label: "Pubs" },
    ];

    const planoEssencial = [
        "Gestão de mesas",
        "Gestão de pedidos",
        "Comandas digitais",
        "Painel de controle",
    ];

    const planoProfissional = [
        "Tudo do plano Essencial",
        "Relatórios avançados",
        "Múltiplos usuários",
        "Recursos adicionais de atendimento",
    ];

    const feedbacks = [
        {
            texto: "A QRCoffee trouxe super atendimento pro nosso dia a dia. Pedidos organizados e em minutos na mesa.",
            autor: "João Silva",
            cargo: "Cliente fiel",
        },
        {
            texto: "Interface intuitiva e suporte rápido. Meus clientes adoram e a operação ficou muito mais fluida.",
            autor: "Maria Oliveira",
            cargo: "Proprietária de café",
        },
        {
            texto: "Integração perfeita com nosso fluxo. Relatórios claros e menos erros de pedido. Recomendo.",
            autor: "Pedro Santos",
            cargo: "Gerente de restaurante",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* 1. Hero */}
            <section
                className={`pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-10 transition-opacity duration-700 ${
                    textVisible ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className={CONTAINER}>
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-16">
                        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] xl:text-5xl font-bold text-black leading-tight">
                                Atendimento mais rápido, organizado e eficiente para bares e restaurantes
                            </h1>
                            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Gerencie pedidos, mesas, comandas e atendimento em um único sistema pensado para melhorar a experiência do cliente e a produtividade da equipe.
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
                                    Ver demonstração
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center bg-white text-black border border-black px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-black hover:text-white transition-colors"
                                >
                                    Testar gratuitamente
                                </Link>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-md order-1 lg:order-2">
                            <img
                                src="/imagem-apresentacao.jpg"
                                alt="Painel de pedidos, mesas e equipe em atendimento"
                                className="w-full h-auto rounded-lg shadow-xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Problemas do atendimento tradicional */}
            <section id="problemas" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-8 sm:mb-10">
                        Problemas comuns no atendimento de bares e restaurantes
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                        Muitos estabelecimentos enfrentam dificuldades como:
                    </p>
                    <ul className="max-w-2xl mx-auto space-y-2 mb-8">
                        {problemas.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
                            >
                                <FaExclamationCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-3">
                        Esses problemas afetam diretamente:
                    </p>
                    <ul className="max-w-md mx-auto space-y-2 text-center">
                        {impactos.map((item) => (
                            <li key={item} className="text-gray-800 font-medium text-sm sm:text-base">
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 3. A solução */}
            <section id="solucao" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        Um sistema pensado para organizar e acelerar o atendimento
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-8">
                        Nosso sistema centraliza todo o fluxo de atendimento do estabelecimento em uma única plataforma. Com ele é possível:
                    </p>
                    <ul className="max-w-2xl mx-auto space-y-3 mb-6">
                        {solucaoItens.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                                <FaCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-center text-gray-700 font-medium text-sm sm:text-base">
                        Tudo de forma simples e intuitiva.
                    </p>
                </div>
            </section>

            {/* 4. Como o sistema funciona */}
            <section id="como-funciona" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-10 sm:mb-12">
                        Como o sistema funciona
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                        {comoFunciona.map(({ numero, titulo, texto }) => (
                            <div
                                key={numero}
                                className="flex gap-4 bg-white p-5 sm:p-6 rounded-lg border border-gray-200 shadow-sm"
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                                    {numero}
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-black mb-2">{titulo}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Funcionalidades do sistema */}
            <section id="funcionalidades" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-10 sm:mb-12">
                        Funcionalidades do sistema
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
                        <h3 className="text-base font-bold text-black mb-3">Recursos adicionais</h3>
                        <ul className="flex flex-wrap gap-2">
                            {recursosAdicionais.map((item) => (
                                <li
                                    key={item}
                                    className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-700"
                                >
                                    <FaCheck className="w-3.5 h-3.5 text-green-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. Benefícios para o estabelecimento */}
            <section id="beneficios" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-8 sm:mb-10">
                        Mais eficiência no atendimento, melhor experiência para o cliente
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

            {/* 7. Demonstração do sistema */}
            <section id="demonstracao" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        Demonstração do sistema
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                        Conheça o painel de atendimento, controle de mesas, gestão de pedidos e relatórios de vendas.
                    </p>
                    <div className="flex justify-center mb-8">
                        <div className="w-full max-w-3xl aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                            <img
                                src="/imagem-apresentacao.jpg"
                                alt="Painel de atendimento, mesas e pedidos"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center bg-black text-white px-6 py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-800 transition-colors border border-black"
                        >
                            Ver demonstração do sistema
                        </Link>
                    </div>
                </div>
            </section>

            {/* 8. Para quem é o sistema */}
            <section id="para-quem" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-6 sm:mb-8">
                        Para quem é o sistema
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                        Ideal para qualquer estabelecimento que queira organizar e melhorar o atendimento ao cliente.
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

            {/* 9. Planos */}
            <section id="planos" className={SECTION_PY}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        Planos
                    </h2>
                    <p className="text-center text-gray-600 text-sm sm:text-base mb-10 max-w-xl mx-auto">
                        Plano simples e acessível para estabelecimentos de diferentes tamanhos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border-2 border-gray-200">
                            <h3 className="text-lg font-bold text-black mb-4">Plano Essencial</h3>
                            <ul className="space-y-2">
                                {planoEssencial.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                                        <FaCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-black text-white p-6 sm:p-8 rounded-lg border-2 border-black">
                            <h3 className="text-lg font-bold mb-4">Plano Profissional</h3>
                            <ul className="space-y-2">
                                {planoProfissional.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-gray-200 text-sm sm:text-base">
                                        <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Chamada final */}
            <section id="cta-final" className={`${SECTION_PY} bg-gray-50 border-y border-gray-200`}>
                <div className={`${CONTAINER} text-center`}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                        Transforme o atendimento do seu estabelecimento
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Modernize a forma como seu bar ou restaurante atende clientes, organize pedidos com eficiência e tenha controle total da operação.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center bg-black text-white px-6 py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-800 transition-colors border border-black"
                        >
                            Começar teste gratuito
                        </Link>
                        <Link
                            href="/contato"
                            className="inline-flex items-center justify-center bg-white text-black border border-black px-6 py-3.5 text-base sm:text-lg font-semibold rounded-sm hover:bg-black hover:text-white transition-colors"
                        >
                            Agendar demonstração
                        </Link>
                    </div>
                </div>
            </section>

            {/* Depoimentos (mantido) */}
            <section id="feedbacks" className={`${SECTION_PY} px-4 sm:px-6 md:px-8 lg:px-10`}>
                <div className={CONTAINER}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
                        O que dizem nossos clientes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
                        {feedbacks.map(({ texto, autor, cargo }) => (
                            <div
                                key={autor}
                                className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200 flex flex-col"
                            >
                                <FaQuoteLeft className="w-8 h-8 text-black/20 mb-3 flex-shrink-0" />
                                <p className="text-sm sm:text-base text-gray-700 mb-4 flex-1 leading-relaxed">
                                    &ldquo;{texto}&rdquo;
                                </p>
                                <p className="font-bold text-black text-sm sm:text-base">{autor}</p>
                                <p className="text-xs sm:text-sm text-gray-500">{cargo}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8">
                <div className={`${CONTAINER} flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8`}>
                    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <a href="#problemas" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Problemas
                        </a>
                        <a href="#solucao" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Solução
                        </a>
                        <a href="#como-funciona" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Como funciona
                        </a>
                        <a href="#funcionalidades" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Funcionalidades
                        </a>
                        <a href="#beneficios" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Benefícios
                        </a>
                        <a href="#demonstracao" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Demonstração
                        </a>
                        <a href="#planos" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Planos
                        </a>
                        <a href="/contato" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Contato
                        </a>
                        <a href="/privacidade" className="text-sm sm:text-base hover:text-amber-300 transition-colors">
                            Privacidade
                        </a>
                    </nav>
                    <p className="text-center md:text-right text-xs sm:text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} QRCoffee. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;
