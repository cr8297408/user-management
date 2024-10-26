import React, { useState } from 'react';
import { Award, BookOpen, Clock, Users } from 'lucide-react';

interface Training {
  id: number;
  title: string;
  description: string;
  duration: string;
  capacity: number;
  enrolled: number;
  startDate: string;
}

export const TrainingDevelopment = () => {
  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: 1,
      title: 'Liderazgo Efectivo',
      description:
        'Desarrollo de habilidades de liderazgo y gestión de equipos.',
      duration: '20 horas',
      capacity: 15,
      enrolled: 8,
      startDate: '2024-04-01',
    },
    {
      id: 2,
      title: 'Metodologías Ágiles',
      description: 'Introducción a Scrum y metodologías ágiles de desarrollo.',
      duration: '15 horas',
      capacity: 20,
      enrolled: 12,
      startDate: '2024-04-15',
    },
  ]);

  const handleEnroll = (id: number) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id && training.enrolled < training.capacity
          ? { ...training, enrolled: training.enrolled + 1 }
          : training
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Capacitación y Desarrollo
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {trainings.map((training) => (
          <div key={training.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {training.title}
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {training.enrolled}/{training.capacity} inscritos
              </span>
            </div>

            <p className="text-gray-600 mb-4">{training.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={20} />
                <span>{training.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={20} />
                <span>{training.capacity} participantes máx.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen size={20} />
                <span>
                  Inicio: {new Date(training.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(training.enrolled / training.capacity) * 100}%`,
                  }}
                />
              </div>

              <button
                onClick={() => handleEnroll(training.id)}
                disabled={training.enrolled >= training.capacity}
                className={`w-full py-2 px-4 rounded-md text-white font-medium
                  ${
                    training.enrolled >= training.capacity
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {training.enrolled >= training.capacity
                  ? 'Curso Lleno'
                  : 'Inscribirse'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
