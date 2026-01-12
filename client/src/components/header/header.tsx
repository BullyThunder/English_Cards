"use client";
import React, { useState } from "react";
import Link from "next/link"; // Лучше использовать Link из Next.js для навигации
import { useRouter } from "next/navigation";
import UserIcon from "../ui/UserIcon";
const navLinks = [
  { title: "Cards", href: "/timeline" },
  { title: "Tasks", href: "/map" },
  { title: "Collection", href: "/collections" },
  { title: "About project", href: "/about" },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAuth = () => {
    router.push("/register");
  };

  return (
    // 1. Фиксированный контейнер Header
    <header className="fixed top-0 w-full bg-gray-900 text-white shadow-lg z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Основной FLEX-контейнер для строки Header */}
        <div className="flex items-center justify-between h-16">
          {/* Логотип (слева) */}
          <div className="flex-shrink-0">
            {/* ... Link для EpochExplorer ... */}
          </div>
          {/* 🌟 НОВАЯ СТРУКТУРА: Контейнер для навигации И иконки пользователя */}
          <div className="flex items-center">
            {/* 1. Навигация для больших экранов (hidden md:flex) */}
            <nav className="hidden md:flex">
              {/* Основные ссылки */}
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </nav>

            {/* 2. КНОПКА АВТОРИЗАЦИИ (видна всегда или только на md) */}
            {/* Размещаем ее сразу после навигации, но перед мобильным гамбургером */}
            <button
              onClick={toggleAuth}
              className="p-2 ml-4 rounded-full text-gray-400 hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition duration-150"
            >
              <UserIcon className="h-7 w-7" />
            </button>

            {/* 3. Кнопка Мобильного Меню (md:hidden) */}
            <div className="md:hidden ml-2">
              {" "}
              {/* Добавляем отступ, чтобы не сливалась с иконкой User */}
              {/* ... код кнопки мобильного меню, использующий toggleMenu ... */}
            </div>
          </div>{" "}
          {/* Конец Контейнера для навигации + иконки пользователя */}
        </div>
      </div>

      {/* Мобильное меню (Flex, Stacked/Column) */}
      {isMenuOpen && (
        <div className="md:hidden">
          {/* Используем flex flex-col для вертикального стека ссылок */}
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition duration-150"
                onClick={() => setIsMenuOpen(false)} // Закрыть при клике
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
