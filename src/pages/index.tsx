import { Menu } from '@/components/menu';
import "../app/globals.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { obterDoLocalStorage } from '@/utils/localStorageUtils';
import MovimentacoesPage from './movimentacoes';

type Movimentacao = {
  id: string;
  profissional: string;
  medicamento: string;
  tipo: string,
  quantidade: number,
  validade: string,
  aindaDisponivel: number
};

export default function Home() {

  useEffect(() => {
    const movimentacoes = obterDoLocalStorage<Movimentacao>('movimentacoes');
    const medicamentos = obterDoLocalStorage<Movimentacao>('medicamentos');
  }, []);


  return (
    <div>
      <Menu></Menu>
      <div className='max-w-screen-xl mx-auto p-4'>
        <h1 className="text-3xl font-bold">Gerenciamento de medicamentos</h1>
        <p>Bem-vindo ao sistema de gerenciamento de medicamentos</p>
        <h2 className="text-xl font-bold" style={{margin: "20px 0px 20px 0px"}}>Dashboard</h2>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div className='bg-green-400' style={{marginLeft: "30px", padding: "25px", borderRadius: "10px"}}>
            <p>Medicamentos vencidos:</p>
          </div>
          <div className='bg-purple-400' style={{marginLeft: "30px", padding: "25px", borderRadius: "10px"}}>
            <p>Medicamentos a vencer:</p>
          </div>
        </div>
      </div>
    </div>
  );
}