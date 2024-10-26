import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  Users,
  FileText,
  Briefcase,
  Home,
  DollarSign,
  BarChart2,
  Clock,
  FileArchive,
  PieChart,
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import EmployeeDetails from './components/EmployeeDetails';
import Payroll from './components/Payroll';
import HumanResources from './components/HumanResources';
import ClientManagement from './components/ClientManagement';
import Reports from './components/Reports';
import NotificationBell from './components/NotificationBell';
import Analytics from './components/Analytics';
import Documents from './components/Documents';
import TimeTracking from './components/TimeTracking';
import { VacationManagement } from './components/VacationManagement';
import { PerformanceEvaluation } from './components/PerformanceEvaluation';
import { TrainingDevelopment } from './components/TrainingDevelopment';

function App() {
  const [notifications] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <nav className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2">
          <div className="text-2xl font-semibold text-center mb-6">
            GestiónPro
          </div>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <Users size={20} />
                <span>Empleados</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payroll"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <FileText size={20} />
                <span>Nómina</span>
              </Link>
            </li>
            <li>
              <Link
                to="/hr"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <Briefcase size={20} />
                <span>Recursos Humanos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <DollarSign size={20} />
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <BarChart2 size={20} />
                <span>Informes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <PieChart size={20} />
                <span>Analíticas</span>
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <FileArchive size={20} />
                <span>Documentos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/time-tracking"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <Clock size={20} />
                <span>Control de Tiempo</span>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-10">
          <div className="flex justify-end mb-4">
            <NotificationBell notifications={notifications} />
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/hr" element={<HumanResources />} />
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/vacations" element={<VacationManagement />} />
            <Route path="/performance" element={<PerformanceEvaluation />} />
            <Route path="/training" element={<TrainingDevelopment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
