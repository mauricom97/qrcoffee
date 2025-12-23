'use client'
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

const WelcomePage = () => {
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTextVisible(true), 300); // Delay for animation
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {/* Seção de Boas-Vindas (já existente) */}
            <section className="min-h-screen bg-yellow-50">
                <Navbar />
                <div className={`flex flex-col mt-16 sm:mt-20 md:flex-row items-center justify-center p-4 sm:p-8 md:p-20 space-y-8 md:space-y-0 md:space-x-10 transition-opacity duration-1000 ${textVisible ? "opacity-100" : "opacity-0"}`}>
                    {/* Imagem à esquerda */}
                    <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <img
                            src="/imagem-apresentacao.jpg"
                            alt="Imagem"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Texto à direita */}
                    <div
                        className={`flex items-center text-black border border-black hover:text-white hover:bg-black p-6 sm:p-8 md:p-11 rounded-sm space-y-4 flex-col font-sans text-center md:text-left transition-opacity duration-1000 ${textVisible ? "opacity-100" : "opacity-0"}`}
                    >
                        <p className="text-xl sm:text-2xl font-bold">
                            Bem-vindo à QRCoffee!
                        </p>
                        <span className="text-base sm:text-lg w-full font-medium">
                            Nossa plataforma foi criada para revolucionar a experiência de pedidos em cafeterias, bares e restaurantes. Com tecnologia moderna e um design intuitivo, oferecemos praticidade e agilidade para que você possa aproveitar seu café favorito sem complicações. Simplifique sua rotina com a QRCoffee!
                        </span>
                    </div>
                </div>
            </section>

            {/* Seção "Sobre Nós" */}
            <section id="sobre-nos" className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-8 md:px-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-8 md:mb-10">Sobre Nós</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-10">
                        {/* Texto */}
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                                A QRCoffee é uma startup inovadora dedicada a transformar a forma como as pessoas interagem com cafeterias e restaurantes. Fundada em 2023, nossa missão é simplificar o processo de pedidos usando tecnologia QR Code, permitindo que clientes façam pedidos diretamente de suas mesas sem filas ou esperas.
                            </p>
                            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                                Nossa equipe é composta por especialistas em desenvolvimento web, design UX/UI e entusiastas de café, todos comprometidos em oferecer a melhor experiência possível. Usamos ferramentas modernas como Next.js e Tailwind CSS para criar interfaces rápidas e responsivas.
                            </p>
                            <p className="text-base sm:text-lg text-gray-700">
                                Junte-se a nós nessa jornada para tornar o mundo mais eficiente, um café de cada vez!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção "Feedbacks" */}
            <section id="feedbacks" className="py-12 sm:py-16 md:py-20 bg-yellow-50">
                <div className="container mx-auto px-4 sm:px-8 md:px-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-8 md:mb-10">Feedbacks dos Nossos Clientes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {/* Card de Feedback 1 */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">"A QRCoffee mudou completamente minha rotina matinal! Pedidos rápidos e sem erros."</p>
                            <p className="font-bold text-black text-sm sm:text-base">- João Silva, Cliente Fiel</p>
                        </div>
                        {/* Card de Feedback 2 */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">"Interface intuitiva e super rápida. Recomendo para todos os donos de cafeterias!"</p>
                            <p className="font-bold text-black text-sm sm:text-base">- Maria Oliveira, Proprietária de Café</p>
                        </div>
                        {/* Card de Feedback 3 */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">"Excelente suporte e integração perfeita com nosso sistema. Nota 10!"</p>
                            <p className="font-bold text-black text-sm sm:text-base">- Pedro Santos, Gerente de Restaurante</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-8 sm:py-10">
                <div className="container mx-auto px-4 sm:px-8 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 sm:space-y-6 md:space-y-0">
                        {/* Links */}
                        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
                            <a href="#sobre-nos" className="hover:text-yellow-300 text-sm sm:text-base">Sobre Nós</a>
                            <a href="#feedbacks" className="hover:text-yellow-300 text-sm sm:text-base">Feedbacks</a>
                            <a href="/contato" className="hover:text-yellow-300 text-sm sm:text-base">Contato</a>
                            <a href="/privacidade" className="hover:text-yellow-300 text-sm sm:text-base">Política de Privacidade</a>
                        </div>
                        {/* Copyright */}
                        <p className="text-center md:text-right text-sm sm:text-base">&copy; 2025 QRCoffee. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;