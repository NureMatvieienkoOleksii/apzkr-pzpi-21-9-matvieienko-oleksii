import React from 'react';
import { ArrowRight, MapPin, Shield, Plane } from 'lucide-react';
import './MainPage.css';

const MainPage = () => {
    return (
        <div className="main-container" style={{backgroundImage: "url('/api/placeholder/1920/1080?text=Природний+фон')"}}>
            <div className="overlay">
                <div className="container mx-auto px-4 py-8 text-center text-white">
                    <header className="mb-16">
                        <h1 className="text-5xl font-bold mb-4">ЕкоТур Навігатор</h1>
                        <p className="text-2xl">Ваш провідник у світі безпечного екотуризму</p>
                    </header>

                    <section className="mb-20">
                        <h2 className="text-6xl font-bold mb-6">Відкрийте красу природи України</h2>
                        <p className="text-3xl mb-10">Безпечно. Зручно. Незабутньо.</p>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
                            Почати подорож <ArrowRight className="ml-2" />
                        </button>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-4xl font-bold mb-12">Наші можливості</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: MapPin, title: "Маршрути на будь-який смак", desc: "Від легких прогулянок до екстремальних походів" },
                                { icon: Shield, title: "Безпека понад усе", desc: "Контроль та моніторинг безпеки на маршрутах" },
                                { icon: Plane, title: "Дрони для огляду", desc: "Оренда та керування дронами для незабутніх кадрів" }
                            ].map((item, index) => (
                                <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-30 transition duration-300">
                                    <item.icon className="mx-auto h-16 w-16 text-green-300 mb-4" />
                                    <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-4xl font-bold mb-12">Популярні маршрути</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Карпатські вершини", desc: "Захоплюючий маршрут горами Карпат" },
                                { title: "Подільські товтри", desc: "Унікальні краєвиди Подільських гір" },
                                { title: "Дніпровські плавні", desc: "Водний маршрут мальовничими плавнями" }
                            ].map((route, index) => (
                                <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl overflow-hidden hover:bg-opacity-30 transition duration-300">
                                    <img src={`/api/placeholder/400/300?text=${route.title}`} alt={route.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold mb-3">{route.title}</h3>
                                        <p className="mb-4">{route.desc}</p>
                                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                            Детальніше
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-4xl font-bold mb-6">Готові до пригод?</h2>
                        <p className="text-2xl mb-10">Приєднуйтесь до нас та відкривайте красу України разом!</p>
                        <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-full text-xl hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                            Зареєструватися
                        </button>
                    </section>

                    <footer>
                        <p className="text-lg">&copy; 2024 ЕкоТур Навігатор. Всі права захищені.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default MainPage;