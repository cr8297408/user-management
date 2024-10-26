import React, { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
  // CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    monthlyPayroll: 0,
    departments: 0,
    productivity: 0,
    pendingPayments: 0,
    activeClients: 0,
  });

  useEffect(() => {
    // Simulating API call to fetch dashboard data
    setTimeout(() => {
      setStats({
        totalEmployees: 150,
        monthlyPayroll: 75000,
        departments: 8,
        productivity: 92,
        pendingPayments: 5,
        activeClients: 20,
      });
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<Users size={24} />}
          title="Total Empleados"
          value={stats.totalEmployees}
        />
        <DashboardCard
          icon={<DollarSign size={24} />}
          title="Nómina Mensual"
          value={`$${stats.monthlyPayroll.toLocaleString()}`}
        />
        <DashboardCard
          icon={<Briefcase size={24} />}
          title="Departamentos"
          value={stats.departments}
        />
        {/* <DashboardCard
          icon={<TrendingUp size={24} />}
          title="Productividad"
          value={`${stats.productivity}%`}
        /> */}
        <DashboardCard
          icon={<AlertTriangle size={24} />}
          title="Pagos Pendientes"
          value={stats.pendingPayments}
        />
        <DashboardCard
          icon={<Users size={24} />}
          title="Clientes Activos"
          value={stats.activeClients}
        />
      </div>
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Planes de Cobro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlanCard 
            title="Plan Gratuito" 
            price="$0/mes" 
            features={[
              "Hasta 5 empleados",
              "Gestión básica de nómina",
              "Soporte por correo electrónico"
            ]}
          />
          <PlanCard 
            title="Plan de Pago" 
            price="$49.99/mes" 
            features={[
              "Empleados ilimitados",
              "Gestión avanzada de nómina",
              "Informes personalizados",
              "Soporte prioritario 24/7"
            ]}
          />
        </div>
      </div> */}
    </div>
  );
};

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-600">{icon}</div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
  );
};

// const PlanCard = ({ title, price, features }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-2xl font-bold text-blue-600 mb-4">{price}</p>
//       <ul className="space-y-2">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center">
//             <CheckCircle size={16} className="text-green-500 mr-2" />
//             {feature}
//           </li>
//         ))}
//       </ul>
//       <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
//         Seleccionar Plan
//       </button>
//     </div>
//   )
// }

export default Dashboard;
