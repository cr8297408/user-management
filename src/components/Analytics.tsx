import React, { useState } from 'react'
import { PieChart as PieChartIcon, TrendingUp, Users, DollarSign, Clock } from 'lucide-react'
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month')

  const employeeData = [
    { name: 'Tiempo Completo', value: 30 },
    { name: 'Medio Tiempo', value: 15 },
    { name: 'Contratista', value: 10 },
  ]

  const performanceData = [
    { month: 'Ene', performance: 85 },
    { month: 'Feb', performance: 88 },
    { month: 'Mar', performance: 87 },
    { month: 'Abr', performance: 89 },
    { month: 'May', performance: 92 },
    { month: 'Jun', performance: 90 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analíticas</h1>
      
      <div className="mb-6">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="week">Última Semana</option>
          <option value="month">Último Mes</option>
          <option value="year">Último Año</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Distribución de Empleados
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {employeeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2" /> Rendimiento del Equipo
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="performance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={<Users className="text-blue-500" />}
          title="Tasa de Retención"
          value="95%"
          trend="+2.5%"
          trendUp={true}
        />
        <MetricCard
          icon={<DollarSign className="text-green-500" />}
          title="Costo por Contratación"
          value="$1,200"
          trend="-5%"
          trendUp={false}
        />
        <MetricCard
          icon={<Clock className="text-purple-500" />}
          title="Tiempo Promedio de Contratación"
          value="18 días"
          trend="-2 días"
          trendUp={false}
        />
      </div>
    </div>
  )
}

const MetricCard = ({ icon, title, value, trend, trendUp }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className={`text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default Analytics