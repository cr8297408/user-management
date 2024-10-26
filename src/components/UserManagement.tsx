import React, { useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Gerente' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Desarrollador' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Diseñador' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const openModal = (user: User | null = null) => {
    setCurrentUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setCurrentUser(null)
    setIsModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = {
      id: currentUser ? currentUser.id : users.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    }

    if (currentUser) {
      setUsers(users.map(user => user.id === currentUser.id ? userData : user))
    } else {
      setUsers([...users, userData])
    }
    closeModal()
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>
      <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mb-4">
        <Plus size={20} className="mr-2" />
        Agregar Usuario
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Rol</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button onClick={() => openModal(user)} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{currentUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input type="text" id="name" name="name" defaultValue={currentUser?.name} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" defaultValue={currentUser?.email} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                <input type="text" id="role" name="role" defaultValue={currentUser?.role} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {currentUser ? 'Actualizar' : 'Agregar'}
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement