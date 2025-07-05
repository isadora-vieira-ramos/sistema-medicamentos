import { useEffect, useState } from 'react'
import {
  salvarNoLocalStorage,
  obterDoLocalStorage,
} from '../utils/localStorageUtils'
import { Menu } from './menu'

type Medicamento = {
  nome: string
  estoque: string
  fabricante: string
}

export default function CadastroMedicamento() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [nome, setNome] = useState('')
  const [fabricante, setFabricante] = useState('')

  useEffect(() => {
    setMedicamentos(obterDoLocalStorage<Medicamento>('medicamentos'))
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let estoque: string = '0'

    const novo = [...medicamentos, { nome, estoque, fabricante }]
    setMedicamentos(novo)
    salvarNoLocalStorage('medicamentos', novo)
    clearForm()
  }

  const clearForm = () => {
    setNome('')
    setFabricante('')
  }

  return (
    <div>
      <Menu></Menu>
      <div className='max-w-screen-xl mx-auto p-4'>
        <h2 className='text-2xl font-bold'>Cadastrar Medicamento</h2>
        <form
          style={{
            marginBottom: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'start',
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              borderRadius: '10px',
              border: '1px solid black',
              padding: '10px',
              margin: '10px',
            }}
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder='Nome do Medicamento'
            required
          />
          <input
            style={{
              borderRadius: '10px',
              border: '1px solid black',
              padding: '10px',
              margin: '10px',
            }}
            value={fabricante}
            onChange={e => setFabricante(e.target.value)}
            placeholder='Fabricante'
            required
          />
          <button
            className='text-white bg-blue-800 rounded shadow'
            style={{ marginLeft: '20px', padding: '10px' }}
            type='submit'
          >
            Cadastrar
          </button>
        </form>
        <div>
          <h3 className='text-2xl font-bold'>Lista de Medicamentos</h3>
          <table className='w-full bg-white rounded shadow'>
            <thead>
              <tr>
                <th className='p-2'>Nome</th>
                <th className='p-2'>Estoque</th>
              </tr>
            </thead>
            <tbody className='w-full bg-white rounded shadow'>
              {medicamentos.map(m => (
                <tr key={m.nome}>
                  <td style={{ textAlign: 'center' }} className='p-2'>
                    {m.nome}
                  </td>
                  <td style={{ textAlign: 'center' }} className='p-2'>
                    {m.estoque}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
