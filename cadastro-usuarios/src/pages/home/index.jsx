import './style.css'
import { useEffect, useState, useRef } from 'react'
import Trash from '../../assets/lixeira-small.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {

    try{
      const usersFromApi = await api.get('/usuarios')

      setUsers(usersFromApi.data)
    }
    catch(error){
      console.log('Erro na requisição: ', error)
    }
  }

  async function createUsers() {
    try{
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: Number(inputAge.current.value),
        email: inputEmail.current.value
      })

      getUsers()

      inputName.current.value = ''
      inputAge.current.value = ''
      inputEmail.current.value = ''
      
    }
    catch(error) {
      console.log('Erro na requisição: ', error)
    }
  }

  async function deleteUsers(id) {
    try{
      await api.delete(`/usuarios/${id}`)

      getUsers()
    }
    catch(error) {
      console.log('Erro na requisição: ', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
        <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
        <button onClick={createUsers} type="button">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}


    </div>
  )
}

export default Home
