import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  baseSalary: number;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', position: 'Gerente', baseSalary: 5000 },
    { id: 2, name: 'María García', email: 'maria@example.com', position: 'Desarrollador', baseSalary: 4000 },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', position: 'Diseñador', baseSalary: 3500 },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)

  const openModal = (employee: Employee | null = null) => {
    setCurrentEmployee(employee)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setCurrentEmployee(null)
    setIsModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const employeeData: Employee = {
      id: currentEmployee ? currentEmployee.id : employees.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      baseSalary: Number(formData.get('baseSalary')),
    }

    if (currentEmployee) {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? employeeData : emp))
    } else {
      setEmployees([...employees, employeeData])
    }
    closeModal()
  }

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-6">Gestión de Empleados</h1>
      <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mb-4">
        <Plus size={20} className="mr-2" />
        Agregar Empleado
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Posición</th>
            <th className="py-3 px-6 text-right">Salario Base</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{employee.name}</td>
              <td className="py-3 px-6 text-left">{employee.email}</td>
              <td className="py-3 px-6 text-left">{employee.position}</td>
              <td className="py-3 px-6 text-right">${employee.baseSalary.toFixed(2)}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <Link to={`/employees/${employee.id}`} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <Eye size={16} />
                  </Link>
                  <button onClick={() => openModal(employee)} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => deleteEmployee(employee.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
              <h2 className="text-xl font-bold">{currentEmployee ? 'Editar Empleado' : 'Agregar Empleado'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input type="text" id="name" name="name" defaultValue={currentEmployee?.name} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" defaultValue={currentEmployee?.email} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">Posición</label>
                <input type="text" id="position" name="position" defaultValue={currentEmployee?.position} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="baseSalary" className="block text-gray-700 text-sm font-bold mb-2">Salario Base</label>
                <input type="number" id="baseSalary" name="baseSalary" defaultValue={currentEmployee?.baseSalary} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {currentEmployee ? 'Actualizar' : 'Agregar'}
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

export default EmployeeManagement