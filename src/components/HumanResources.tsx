import React from 'react';
import { Users, Calendar, FileText, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HumanResources = () => {
  const handleManage = (section: string) => {
    // En una aplicación real, aquí navegaríamos a la sección correspondiente
    alert(`Gestionando sección: ${section}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recursos Humanos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HRCard
          icon={<Users size={24} />}
          title="Gestión de Personal"
          description="Administre la información de los empleados, contratos y documentación."
          // onManage={() => handleManage('Gestión de Personal')}
          linkDetail="/employees"
        />
        <HRCard
          icon={<Calendar size={24} />}
          title="Gestión de Vacaciones"
          description="Controle y apruebe las solicitudes de vacaciones y días libres."
          // onManage={() => handleManage('Gestión de Vacaciones')}
          linkDetail="/vacations"
        />
        <HRCard
          icon={<FileText size={24} />}
          title="Evaluaciones de Desempeño"
          description="Realice y gestione las evaluaciones de desempeño de los empleados."
          // onManage={() => handleManage('Evaluaciones de Desempeño')}
          linkDetail="/performance"
        />
        <HRCard
          icon={<Award size={24} />}
          title="Capacitación y Desarrollo"
          description="Planifique y gestione programas de capacitación y desarrollo profesional."
          // onManage={() => handleManage('Capacitación y Desarrollo')}
          linkDetail="/training"
        />
      </div>
    </div>
  );
};

const HRCard = ({ icon, title, description, linkDetail = '#' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="text-blue-600 mr-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
      <Link
        to={linkDetail}
        className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
      >
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Gestionar
        </button>
      </Link>
    </div>
  );
};

export default HumanResources;
