import { Menu } from '@/components/menu';
import "../app/globals.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { obterDoLocalStorage } from '@/utils/localStorageUtils';
import MovimentacoesPage from './movimentacoes';

type Medicamento = {
  nome: string;
  estoque: string;
  fabricante: string;
};


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
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [medicamentosVencidos, setMedicamentosVencidos] = useState<string[]>([]);
  const [medicamentosAVencer, setMedicamentosAVencer] = useState<Movimentacao[]>([]);
 
  useEffect(() => {
    let movimentacoes = obterDoLocalStorage<Movimentacao>('movimentacoes');
    let medicamentos = obterDoLocalStorage<Medicamento>('medicamentos');
    medicamentos = medicamentos.sort((a, b) =>{
      return Number(b.estoque) - Number(a.estoque);
    });
    setMedicamentos(medicamentos);
    let listaMedicamentosVencidos: any[] = [];
    let listaMedicamentosAVencer: any[] = [];
    
    movimentacoes.forEach((item) =>{
      if(item.tipo == "entrada" && item.aindaDisponivel > 0 ){
        const data = new Date(
          Number(item.validade.substring(0, 4)), 
          Number(item.validade.substring(5, 7)) - 1,
          Number(item.validade.substring(9,11)));
        if(data.getTime() < new Date().getTime()){
          const vencimento: string = `${item.medicamento} - Lote com vencimento: ${item.validade}`;
          listaMedicamentosVencidos = ([...listaMedicamentosVencidos, vencimento]);
        }else{
          listaMedicamentosAVencer = ([...listaMedicamentosAVencer, item]);
        }
      }
      setMedicamentosAVencer(listaMedicamentosAVencer);
      setMedicamentosVencidos(listaMedicamentosVencidos);
    })
    
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
            {
              medicamentosVencidos.map((item) => {
                return <p>{item}</p>
              })
            }
          </div>
          <div className='bg-purple-400' style={{marginLeft: "30px", padding: "25px", borderRadius: "10px"}}>
            <p>Medicamentos a vencer:</p>
            {
              medicamentosAVencer.map((item) =>{
                return <p>{`${item.medicamento}- Lote com vencimento ${item.validade}`}</p>
              })
            }
          </div>
          <div className='bg-purple-400' style={{marginLeft: "30px", padding: "25px", borderRadius: "10px"}}>
            <p>Medicamentos com mais estoque:</p>
            {
              medicamentos.map((item)=> {
                return <p>{item.nome} - Estoque: {item.estoque}</p>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}