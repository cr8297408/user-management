import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

interface Payment {
  id: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
}

interface Client {
  id: number;
  name: string;
  email: string;
  monthlyPayment: number;
  nextPaymentDate: string;
  payments: Payment[];
  plan: 'free' | 'paid';
  status: 'active' | 'inactive';
}

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null)

  useEffect(() => {
    // Simulating API call to fetch clients
    setTimeout(() => {
      setClients([
        {
          id: 1,
          name: 'Empresa A',
          email: 'contacto@empresaa.com',
          monthlyPayment: 1000,
          nextPaymentDate: '2023-06-01',
          payments: [
            { id: 1, amount: 1000, dueDate: '2023-05-01', status: 'paid' },
            { id: 2, amount: 1000, dueDate: '2023-06-01', status: 'pending' },
          ],
          plan: 'paid',
          status: 'active'
        },
        {
          id: 2,
          name: 'Empresa B',
          email: 'contacto@empresab.com',
          monthlyPayment: 0,
          nextPaymentDate: '2023-06-15',
          payments: [],
          plan: 'free',
          status: 'active'
        },
      ])
    }, 1000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      checkPaymentNotifications()
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [clients])

  const checkPaymentNotifications = () => {
    const today = new Date()
    clients.forEach(client => {
      const nextPayment = new Date(client.nextPaymentDate)
      if (nextPayment <= today) {
        alert(`¡Pago pendiente para ${client.name}!`)
      }
    })
  }

  const openModal = (client: Client | null = null) => {
    setCurrentClient(client)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setCurrentClient(null)
    setIsModalOpen(false)
  }

  const openPaymentModal = (client: Client, payment: Payment | null = null) => {
    setCurrentClient(client)
    setCurrentPayment(payment)
    setIsPaymentModalOpen(true)
  }

  const closePaymentModal = () => {
    setCurrentClient(null)
    setCurrentPayment(null)
    setIsPaymentModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const clientData: Client = {
      id: currentClient ? currentClient.id : clients.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      monthlyPayment: Number(formData.get('monthlyPayment')),
      nextPaymentDate: formData.get('nextPaymentDate') as string,
      payments: currentClient ? currentClient.payments : [],
      plan: formData.get('plan') as 'free' | 'paid',
      status: formData.get('status') as 'active' | 'inactive'
    }

    if (currentClient) {
      setClients(clients.map(client => client.id === currentClient.id ? clientData : client))
    } else {
      setClients([...clients, clientData])
    }
    closeModal()
  }

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const paymentData: Payment = {
      id: currentPayment ? currentPayment.id : (currentClient?.payments.length || 0) + 1,
      amount: Number(formData.get('amount')),
      dueDate: formData.get('dueDate') as string,
      status: formData.get('status') as 'pending' | 'paid',
    }

    if (currentClient) {
      const updatedClient = {
        ...currentClient,
        payments: currentPayment
          ? currentClient.payments.map(p => p.id === currentPayment.id ? paymentData : p)
          : [...currentClient.payments, paymentData],
      }
      setClients(clients.map(client => client.id === currentClient.id ? updatedClient : client))
    }
    closePaymentModal()
  }

  const deleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id))
  }

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>
      <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mb-4">
        <Plus size={20} className="mr-2" />
        Agregar Cliente
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-right">Pago Mensual</th>
            <th className="py-3 px-6 text-center">Próximo Pago</th>
            <th className="py-3 px-6 text-center">Plan</th>
            <th className="py-3 px-6 text-center">Estado</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {clients.map((client) => (
            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{client.name}</td>
              <td className="py-3 px-6 text-left">{client.email}</td>
              <td className="py-3 px-6 text-right">${client.monthlyPayment}</td>
              <td className="py-3 px-6 text-center">{client.nextPaymentDate}</td>
              <td className="py-3 px-6 text-center">
                <span className={`px-2 py-1 rounded ${client.plan === 'paid' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                  {client.plan === 'paid' ? 'De Pago' : 'Gratuito'}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className={`px-2 py-1 rounded ${client.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {client.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button onClick={() => openModal(client)} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => openPaymentModal(client)} className="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                    <DollarSign size={16} />
                  </button>
                  <button onClick={() => deleteClient(client.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
              <h2 className="text-xl font-bold">{currentClient ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input type="text" id="name" name="name" defaultValue={currentClient?.name} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" defaultValue={currentClient?.email} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="monthlyPayment" className="block text-gray-700 text-sm font-bold mb-2">Pago Mensual</label>
                <input type="number" id="monthlyPayment" name="monthlyPayment" defaultValue={currentClient?.monthlyPayment} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="nextPaymentDate" className="block text-gray-700 text-sm font-bold mb-2">Próxima Fecha de Pago</label>
                <input type="date" id="nextPaymentDate" name="nextPaymentDate" defaultValue={currentClient?.nextPaymentDate} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="plan" className="block text-gray-700 text-sm font-bold mb-2">Plan</label>
                <select id="plan" name="plan" defaultValue={currentClient?.plan} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="free">Gratuito</option>
                  <option value="paid">De Pago</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                <select id="status" name="status" defaultValue={currentClient?.status} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {currentClient ? 'Actualizar' : 'Agregar'}
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPaymentModalOpen && currentClient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{currentPayment ? 'Editar Pago' : 'Agregar Pago'}</h2>
              <button onClick={closePaymentModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Monto</label>
                <input type="number" id="amount" name="amount" defaultValue={currentPayment?.amount} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Vencimiento</label>
                <input type="date" id="dueDate" name="dueDate" defaultValue={currentPayment?.dueDate} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                <select id="status" name="status" defaultValue={currentPayment?.status} required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="pending">Pendiente</option>
                  <option value="paid">Pagado</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {currentPayment ? 'Actualizar' : 'Agregar'}
                </button>
                <button type="button" onClick={closePaymentModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancelar
                </button>
              </div>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Historial de Pagos</h3>
              <ul className="space-y-2">
                {currentClient.payments.map((payment) => (
                  <li key={payment.id} className="flex justify-between items-center">
                    <span>{payment.dueDate}: ${payment.amount}</span>
                    <span className={`px-2 py-1 rounded ${payment.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {payment.status === 'paid' ? <CheckCircle size={16} /> : <Clock size={16} />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientManagement