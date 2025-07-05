import { useEffect, useState } from 'react'
import {
  salvarNoLocalStorage,
  obterDoLocalStorage,
} from '../utils/localStorageUtils'
import { Menu } from './menu'

type Profissional = {
  nome: string
  especialidade: string
}

export default function CadastroProfissional() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [nome, setNome] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  useEffect(() => {
    setProfissionais(obterDoLocalStorage<Profissional>('profissionais'))
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const novo = [...profissionais, { nome, especialidade }]
    setProfissionais(novo)
    salvarNoLocalStorage('profissionais', novo)
    setNome('')
    setEspecialidade('')
  }

  return (
    <div>
      <Menu></Menu>
      <div className='max-w-screen-xl mx-auto p-4'>
        <h2 className='text-2xl font-bold'>Cadastrar Profissional</h2>
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
            placeholder='Nome'
            required
          />
          <input
            style={{
              borderRadius: '10px',
              border: '1px solid black',
              padding: '10px',
              margin: '10px',
            }}
            value={especialidade}
            onChange={e => setEspecialidade(e.target.value)}
            placeholder='Especialidade'
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
          <h3 className='text-2xl font-bold'>Lista de Profissionais</h3>
          <table className='w-full bg-white rounded shadow'>
            <thead>
              <tr>
                <th className='p-2'>Nome</th>
                <th className='p-2'>Especialidade</th>
              </tr>
            </thead>
            <tbody className='w-full bg-white rounded shadow'>
              {profissionais.map(p => (
                <tr key={p.nome}>
                  <td style={{ textAlign: 'center' }} className='p-2'>
                    {p.nome}
                  </td>
                  <td style={{ textAlign: 'center' }} className='p-2'>
                    {p.especialidade}
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
