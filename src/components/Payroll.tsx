import React, { useState, useEffect } from 'react'
import { DollarSign, Download, Upload, Plus, Edit } from 'lucide-react'

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  baseSalary: number;
}

interface Bonus {
  id: number;
  employeeId: number;
  amount: number;
  reason: string;
  date: string;
}

interface SalaryHistory {
  id: number;
  employeeId: number;
  month: string;
  year: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  totalSalary: number;
}

const Payroll = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [bonuses, setBonuses] = useState<Bonus[]>([])
  const [salaryHistory, setSalaryHistory] = useState<SalaryHistory[]>([])
  const [isAddingBonus, setIsAddingBonus] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [newBonus, setNewBonus] = useState<Bonus>({ id: 0, employeeId: 0, amount: 0, reason: '', date: '' })
  const [paymentAmount, setPaymentAmount] = useState<number>(0)

  // Simular la carga de empleados desde el backend
  useEffect(() => {
    // En una aplicación real, esto sería una llamada a la API
    setEmployees([
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', position: 'Gerente', baseSalary: 5000 },
      { id: 2, name: 'María García', email: 'maria@example.com', position: 'Desarrollador', baseSalary: 4000 },
      { id: 3, name: 'Carlos López', email: 'carlos@example.com', position: 'Diseñador', baseSalary: 3500 },
    ])
  }, [])

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => {
    const value = e.target.value;
    const numericValue = value.replace(/^0+/, '');
    setter(numericValue === '' ? '' : Number(numericValue));
  };

  const handleAddBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployee) {
      setBonuses([...bonuses, { ...newBonus, id: bonuses.length + 1, employeeId: selectedEmployee.id }]);
      setNewBonus({ id: 0, employeeId: 0, amount: 0, reason: '', date: '' });
      setIsAddingBonus(false);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployee) {
      const newSalaryHistory: SalaryHistory = {
        id: salaryHistory.length + 1,
        employeeId: selectedEmployee.id,
        month: new Date().getMonth().toString(),
        year: new Date().getFullYear().toString(),
        baseSalary: selectedEmployee.baseSalary,
        bonuses: bonuses.filter(b => b.employeeId === selectedEmployee.id).reduce((sum, bonus) => sum + bonus.amount, 0),
        deductions: 0, // Implementar deducciones si es necesario
        totalSalary: paymentAmount
      };
      setSalaryHistory([...salaryHistory, newSalaryHistory]);
      setPaymentAmount(0);
      setSelectedEmployee(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nómina</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Empleados</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Posición</th>
              <th className="py-3 px-6 text-right">Salario Base</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{employee.name}</td>
                <td className="py-3 px-6 text-left">{employee.position}</td>
                <td className="py-3 px-6 text-right">${employee.baseSalary.toFixed(2)}</td>
                <td className="py-3 px-6 text-center">
                  <button 
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setIsAddingBonus(true);
                    }} 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    Agregar Bono
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddingBonus && selectedEmployee && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Añadir Bono para {selectedEmployee.name}</h3>
          <form onSubmit={handleAddBonus} className="bg-white p-4 rounded shadow">
            <input
              type="number"
              placeholder="Monto del Bono"
              value={newBonus.amount === 0 ? '' : newBonus.amount}
              onChange={(e) => handleNumericInput(e, (value) => setNewBonus({...newBonus, amount: value}))}
              className="mb-2 w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Razón del Bono"
              value={newBonus.reason}
              onChange={(e) => setNewBonus({...newBonus, reason: e.target.value})}
              className="mb-2 w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              value={newBonus.date}
              onChange={(e) => setNewBonus({...newBonus, date: e.target.value})}
              className="mb-2 w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar Bono</button>
          </form>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Registro de Pagos</h2>
        <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Empleado</label>
            <select
              id="employee"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedEmployee?.id || ''}
              onChange={(e) => setSelectedEmployee(employees.find(emp => emp.id === Number(e.target.value)) || null)}
              required
            >
              <option value="">Seleccione un empleado</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto a Pagar</label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={paymentAmount === 0 ? '' : paymentAmount}
              onChange={(e) => handleNumericInput(e, setPaymentAmount)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrar Pago
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Historial de Pagos</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Empleado</th>
              <th className="py-3 px-6 text-center">Mes</th>
              <th className="py-3 px-6 text-center">Año</th>
              <th className="py-3 px-6 text-right">Salario Base</th>
              <th className="py-3 px-6 text-right">Bonos</th>
              <th className="py-3 px-6 text-right">Deducciones</th>
              <th className="py-3 px-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {salaryHistory.map((history) => {
              const employee = employees.find(e => e.id === history.employeeId);
              return (
                <tr key={history.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{employee?.name}</td>
                  <td className="py-3 px-6 text-center">{history.month}</td>
                  <td className="py-3 px-6 text-center">{history.year}</td>
                  <td className="py-3 px-6 text-right">${history.baseSalary.toFixed(2)}</td>
                  <td className="py-3 px-6 text-right">${history.bonuses.toFixed(2)}</td>
                  <td className="py-3 px-6 text-right">${history.deductions.toFixed(2)}</td>
                  <td className="py-3 px-6 text-right">${history.totalSalary.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Payroll