import { useEffect, useState } from 'react';
import { salvarNoLocalStorage, obterDoLocalStorage } from '../utils/localStorageUtils';
import { Menu } from './menu';
import { Questrial } from 'next/font/google';

type Movimentacao = {
  profissional: string;
  medicamento: string;
  tipo: string,
  quantidade: number,
  validade: string,
  aindaDisponivel: number
};

type Profissional = {
  nome: string;
  especialidade: string;
};

type Medicamento = {
  nome: string;
  estoque: string;
};

export default function CadastroMovimentacao() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [profissional, setProfissional] = useState('');
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [medicamento, setMedicamento] = useState('');
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [lotesMedicamento, setLotesMedicamento] = useState<Movimentacao[]>([]);
  const [loteEscolhido, setLoteEscolhido] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [validade, setValidade] = useState('');

  useEffect(() => {
    setMovimentacoes(obterDoLocalStorage<Movimentacao>('movimentacoes'));
    var profisisonalList = (obterDoLocalStorage<Profissional>('profissionais'));
    setProfissionais(profisisonalList);
    var medicamentosList = (obterDoLocalStorage<Medicamento>('medicamentos'));
    setMedicamentos(medicamentosList);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let aindaDisponivel: number = tipo == "entrada"? quantidade : 0;
    if(loteEscolhido != ''){
      const listaAtualizada = movimentacoes.map((m) =>{
        if(m.medicamento == medicamento && m.validade == loteEscolhido){
          m.aindaDisponivel = m.aindaDisponivel - quantidade;
        }
        return m;
      })
      console.log(listaAtualizada);
      setMovimentacoes(listaAtualizada);
    }
    const novo = [...movimentacoes, { profissional, medicamento, tipo, quantidade, validade, aindaDisponivel }];
    setMovimentacoes(novo);
    salvarNoLocalStorage('movimentacoes', novo);
    alterarEstoque(medicamento, tipo, quantidade);
    setProfissional('');
    setMedicamento('');
    setTipo('');
    setQuantidade(0);
    setValidade('');
  }

  function alterarEstoque(nome:string, tipo: string, quantidade:number){
    const listaAtualizada = medicamentos.map((m)=>{
      if(m.nome == nome){
        let estoqueAtual:number = Number(m.estoque);
        if(tipo== "entrada"){
          estoqueAtual = estoqueAtual + quantidade;
        }else{
          estoqueAtual = estoqueAtual - quantidade;
        }
        m.estoque = estoqueAtual.toString();
      }
        return m;
    });

    salvarNoLocalStorage('medicamentos', listaAtualizada);
  }

  function carregarLotesMedicamento(e:string){
    setTipo(e);
    const filtrarMovimentos = movimentacoes.filter( m=> m.medicamento == medicamento
      && m.tipo == "entrada"
      && m.aindaDisponivel > 0);
    setLotesMedicamento(filtrarMovimentos);
  }

  return (
    <div>
      <Menu></Menu>
      <div className='max-w-screen-xl mx-auto p-4'>
        <h2 className="text-2xl font-bold">Cadastrar Movimentação</h2>
        <form style={{marginBottom: "50px", display:"flex", flexDirection: "column", justifyContent:"left", alignItems: "start"}} onSubmit={handleSubmit}>
          <select style={{border: "1px solid black", width: "50%", borderRadius: "10px", padding: "5px", marginRight:"50px", marginBottom: "15px"}} value={profissional} onChange={(e) =>setProfissional(e.target.value)} required>
            <option>Selecione um profissional responsável</option>
            {
              profissionais.map((p =>{
                return <option value={p.nome}>{p.nome}</option>
              }))
            }
          </select>
          <select style={{border: "1px solid black", width: "50%", borderRadius: "10px", padding: "5px", marginRight:"50px", marginBottom: "15px"}} value={medicamento} onChange={(e) =>setMedicamento(e.target.value)} required>
            <option>Selecione o medicamento</option>
            {
              medicamentos.map((m =>{
                return <option value={m.nome}>{m.nome}</option>
              }))
            }
          </select>
          <select style={{border: "1px solid black", width: "50%", borderRadius: "10px", padding: "5px", marginBottom: "15px"}} value={tipo} onChange={(e) => carregarLotesMedicamento(e.target.value)}>
            <option>Selectione o tipo (entrada ou saída)</option>
            <option value={"entrada"}>Entrada</option>
            <option value={"saida"}>Saída</option>
          </select>
          {
            tipo == "saida"?
            <select onChange={(e) => setLoteEscolhido(e.target.value)} style={{border: "1px solid black", width: "50%", borderRadius: "10px", padding: "5px", marginBottom: "15px"}}>
              <option>Selecione qual lote deseja retirar: </option>
              {
                lotesMedicamento.map((m)=> {
                  return <option value={m.validade}>Lote com validade {m.validade}</option>
                })
              }
            </select>: 
            <></>
          }
          <p>Quantidade:</p>
          <input max={10} style={{border: "1px solid black", width: "50%", borderRadius: "10px", padding: "5px", marginBottom: "15px"}} value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} placeholder="Quantidade" required />
          {
            tipo == "entrada"?
            <input style={{border: "1px solid black", width: "50%", borderRadius: "10px", padding: "5px", marginBottom: "15px"}} value={validade} onChange={(e) => setValidade(e.target.value)} placeholder="Validade do lote do medicamento" required />:
            <></>
          }
            <button type="submit" style={{padding: "10px"}} className='text-white bg-blue-800 rounded shadow'>Cadastrar</button>
        </form>
        <div>
          <h3 className="text-2xl font-bold">Lista de Movimentações</h3>
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2">Profissional responsável</th>
                <th className="p-2">Medicamento</th>
                <th className='p-2'>Tipo</th>
                <th className='p-2'>Quantidade</th>
                <th className='p-2'>Validade</th>
                <th className='p-2'>Ainda disponíveis</th>
              </tr> 
            </thead>
            <tbody className='w-full bg-white rounded shadow'>
              {movimentacoes.map((m, index)=> (
                <tr key={index}>
                  <td style={{textAlign: 'center'}} className="p-2">{m.profissional}</td>
                  <td style={{textAlign: 'center'}} className="p-2">{m.medicamento}</td>
                  <td style={{textAlign: 'center'}} className="p-2">{m.tipo}</td>
                  <td style={{textAlign: 'center'}} className='p-2'>{m.quantidade.toString()}</td>
                  <td style={{textAlign: 'center'}} className="p-2">{m.validade}</td>
                  <td style={{textAlign: 'center'}} className="p-2">{m.tipo == "entrada"? m.aindaDisponivel: "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}