// app/(dashboard)/layout.tsx
import Sidebar from "@/components/Sidebar";
import Header from "@/src/components/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Контейнер на весь экран, запрещаем скролл всему окну (скролл будет только внутри)
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. Боковое меню (Sidebar) — всегда зафиксировано слева */}
      <Sidebar />

      {/* 2. Правая часть: Шапка + Контент */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Верхняя панель (Header) */}
        <Header />

        {/* Основная область контента со своим скроллом */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Сюда Next.js будет подставлять контент из page.tsx ваших страниц */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
