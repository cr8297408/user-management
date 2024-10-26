import React, { useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';

interface VacationRequest {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const VacationManagement = () => {
  const [requests, setRequests] = useState<VacationRequest[]>([
    {
      id: 1,
      employeeName: 'Ana García',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      status: 'pending',
    },
    {
      id: 2,
      employeeName: 'Carlos López',
      startDate: '2024-04-01',
      endDate: '2024-04-10',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: 'approved' } : req
      )
    );
  };

  const handleReject = (id: number) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: 'rejected' } : req
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Gestión de Vacaciones
        </h2>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  {request.employeeName}
                </h3>
                <p className="text-gray-600">
                  {new Date(request.startDate).toLocaleDateString()} -{' '}
                  {new Date(request.endDate).toLocaleDateString()}
                </p>
              </div>
              {request.status === 'pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    request.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {request.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
