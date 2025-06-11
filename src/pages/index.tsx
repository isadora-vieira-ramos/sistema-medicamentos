import { Menu } from '@/components/menu';
import "../app/globals.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Menu></Menu>
      <div className='max-w-screen-xl mx-auto p-4'>
        <h1 className="text-3xl font-bold">Gerenciamento de medicamentos</h1>
        <p>Bem-vindo ao sistema de gerenciamento de medicamentos</p>
        {/* <nav>
          <ul>
            <li><Link href="/profissionais">Profissionais de Saúde</Link></li>
            <li><Link href="/medicamentos">Medicamentos</Link></li>
            <li><Link href="/movimentacoes">Movimentações</Link></li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}