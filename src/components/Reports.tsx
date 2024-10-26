import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FileText, Download } from 'lucide-react'

const Reports = () => {
  const [reportType, setReportType] = useState('monthly')
  const [year, setYear] = useState(new Date().getFullYear())

  const monthlyData = [
    { name: 'Ene', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Abr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
    { name: 'Jul', income: 3490, expenses: 4300 },
    { name: 'Ago', income: 4000, expenses: 2400 },
    { name: 'Sep', income: 3000, expenses: 1398 },
    { name: 'Oct', income: 2000, expenses: 9800 },
    { name: 'Nov', income: 2780, expenses: 3908 },
    { name: 'Dic', income: 1890, expenses: 4800 },
  ]

  const quarterlyData = [
    { name: 'Q1', income: 9000, expenses: 13598 },
    { name: 'Q2', income: 7060, expenses: 12508 },
    { name: 'Q3', income: 10490, expenses: 8098 },
    { name: 'Q4', income: 6670, expenses: 18508 },
  ]

  const data = reportType === 'monthly' ? monthlyData : quarterlyData

  const handleDownload = () => {
    // In a real application, this would generate and download the report
    alert('Descargando reporte...')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Informes</h1>
      <div className="mb-6 flex items-center space-x-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="monthly">Mensual</option>
          <option value="quarterly">Trimestral</option>
        </select>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[2023, 2022, 2021, 2020].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Download size={20} className="mr-2" />
          Descargar Informe
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="mr-2" /> Informe de Ingresos y Gastos {year}
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" name="Ingresos" />
            <Bar dataKey="expenses" fill="#FFA000" name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Reports