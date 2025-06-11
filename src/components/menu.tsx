"use client";

import Link from "next/link";

export function Menu() {
  return (
    <nav className="bg-blue-800 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-blue-500">
              <Link href="/dashboard">
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="block py-2 px-3 text-black bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-blue-500">
              <Link href="/medicamentos">
                <p >Medicamentos</p>
              </Link>
            </li>
            <li className="block py-2 px-3 text-black bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-blue-500">
              <Link href="/profissionais">
                <p>Profissionais</p>
              </Link>
            </li>
            <li className="block py-2 px-3 text-black bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-blue-500">
              <Link href="/movimentacoes">
                <p >Movimentações</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
