import React, { useState } from 'react';
import { FileText, Star } from 'lucide-react';

interface Evaluation {
  id: number;
  employeeName: string;
  position: string;
  date: string;
  score: number;
  feedback: string;
}

export const PerformanceEvaluation = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    {
      id: 1,
      employeeName: 'Ana García',
      position: 'Desarrollador Senior',
      date: '2024-02-15',
      score: 4,
      feedback: 'Excelente desempeño en proyectos clave.',
    },
  ]);

  const [newEvaluation, setNewEvaluation] = useState<Partial<Evaluation>>({
    employeeName: '',
    position: '',
    score: 0,
    feedback: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newEvaluation.employeeName &&
      newEvaluation.position &&
      newEvaluation.feedback
    ) {
      setEvaluations([
        ...evaluations,
        {
          id: evaluations.length + 1,
          employeeName: newEvaluation.employeeName,
          position: newEvaluation.position,
          date: new Date().toISOString().split('T')[0],
          score: newEvaluation.score || 0,
          feedback: newEvaluation.feedback,
        },
      ]);
      setNewEvaluation({
        employeeName: '',
        position: '',
        score: 0,
        feedback: '',
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Evaluaciones de Desempeño
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Empleado
            </label>
            <input
              type="text"
              value={newEvaluation.employeeName}
              onChange={(e) =>
                setNewEvaluation({
                  ...newEvaluation,
                  employeeName: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posición
            </label>
            <input
              type="text"
              value={newEvaluation.position}
              onChange={(e) =>
                setNewEvaluation({ ...newEvaluation, position: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Puntuación (1-5)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setNewEvaluation({ ...newEvaluation, score })}
                  className={`p-2 rounded-full ${
                    newEvaluation.score >= score
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  <Star
                    size={24}
                    fill={
                      newEvaluation.score >= score ? 'currentColor' : 'none'
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retroalimentación
            </label>
            <textarea
              value={newEvaluation.feedback}
              onChange={(e) =>
                setNewEvaluation({ ...newEvaluation, feedback: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Guardar Evaluación
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {evaluations.map((evaluation) => (
          <div
            key={evaluation.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">
                  {evaluation.employeeName}
                </h3>
                <p className="text-gray-600">{evaluation.position}</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((score) => (
                  <Star
                    key={score}
                    size={20}
                    className={
                      score <= evaluation.score
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }
                    fill={score <= evaluation.score ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(evaluation.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{evaluation.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
