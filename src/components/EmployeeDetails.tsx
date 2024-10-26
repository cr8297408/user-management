import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, DollarSign, Award, Users, FileText } from 'lucide-react'

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  baseSalary: number;
}

interface Payment {
  id: number;
  date: string;
  amount: number;
}

interface Bonus {
  id: number;
  date: string;
  amount: number;
  reason: string;
}

interface Client {
  id: number;
  name: string;
  company: string;
}

interface Report {
  id: number;
  date: string;
  type: string;
  description: string;
}

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [bonuses, setBonuses] = useState<Bonus[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    // En una aplicación real, aquí harías una llamada a la API para obtener los datos del empleado
    // Por ahora, usaremos datos de ejemplo
    setEmployee({
      id: Number(id),
      name: 'Juan Pérez',
      email: 'juan@example.com',
      position: 'Gerente',
      baseSalary: 5000
    })

    setPayments([
      { id: 1, date: '2023-05-01', amount: 5000 },
      { id: 2, date: '2023-06-01', amount: 5200 },
    ])

    setBonuses([
      { id: 1, date: '2023-05-15', amount: 500, reason: 'Excelente desempeño' },
      { id: 2, date: '2023-06-15', amount: 300, reason: 'Proyecto completado' },
    ])

    setClients([
      { id: 1, name: 'Cliente A', company: 'Empresa A' },
      { id: 2, name: 'Cliente B', company: 'Empresa B' },
    ])

    setReports([
      { id: 1, date: '2023-05-10', type: 'Evaluación', description: 'Evaluación de desempeño semestral' },
      { id: 2, date: '2023-06-05', type: 'Capacitación', description: 'Completó curso de liderazgo' },
    ])
  }, [id])

  if (!employee) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/employees" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeft className="mr-2" /> Volver a la lista de empleados
      </Link>
      <h1 className="text-3xl font-bold mb-6">{employee.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2" /> Historial de Pagos
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Fecha</th>
                <th className="text-right py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b">
                  <td className="py-2">{payment.date}</td>
                  <td className="text-right py-2">${payment.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2" /> Bonos
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Fecha</th>
                <th className="text-left py-2">Razón</th>
                <th className="text-right py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map(bonus => (
                <tr key={bonus.id} className="border-b">
                  <td className="py-2">{bonus.date}</td>
                  <td className="py-2">{bonus.reason}</td>
                  <td className="text-right py-2">${bonus.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Clientes Asociados
          </h2>
          <ul className="list-disc list-inside">
            {clients.map(client => (
              <li key={client.id} className="mb-2">
                {client.name} - {client.company}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" /> Reportes de RRHH
          </h2>
          <ul className="space-y-4">
            {reports.map(report => (
              <li key={report.id} className="border-b pb-2">
                <div className="font-semibold">{report.date} - {report.type}</div>
                <div>{report.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails