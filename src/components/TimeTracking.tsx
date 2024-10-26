import React, { useState, useEffect } from 'react'
import { Clock, Play, Square, Calendar, BarChart2, User } from 'lucide-react'

interface TimeEntry {
  id: number;
  employeeId: number;
  projectId: number;
  startTime: string;
  endTime: string;
  duration: number;
  description: string;
}

interface Project {
  id: number;
  name: string;
  color: string;
}

const TimeTracking = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [description, setDescription] = useState('')
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  
  const projects: Project[] = [
    { id: 1, name: 'Desarrollo Web', color: 'bg-blue-500' },
    { id: 2, name: 'Marketing', color: 'bg-green-500' },
    { id: 3, name: 'Diseño', color: 'bg-purple-500' },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartStop = () => {
    if (!isTracking && !selectedProject) {
      alert('Por favor seleccione un proyecto')
      return
    }

    if (isTracking) {
      // Guardar entrada de tiempo
      const newEntry: TimeEntry = {
        id: timeEntries.length + 1,
        employeeId: 1, // En una app real, esto vendría del usuario autenticado
        projectId: selectedProject!,
        startTime: new Date(Date.now() - currentTime * 1000).toISOString(),
        endTime: new Date().toISOString(),
        duration: currentTime,
        description,
      }
      setTimeEntries([...timeEntries, newEntry])
      setCurrentTime(0)
      setDescription('')
    }
    
    setIsTracking(!isTracking)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Control de Tiempo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" /> Temporizador
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proyecto
            </label>
            <select
              className="w-full border rounded-md py-2 px-3"
              value={selectedProject || ''}
              onChange={(e) => setSelectedProject(Number(e.target.value))}
              disabled={isTracking}
            >
              <option value="">Seleccione un proyecto</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              className="w-full border rounded-md py-2 px-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isTracking}
              rows={3}
            />
          </div>

          <div className="text-center mb-4">
            <div className="text-4xl font-mono mb-4">{formatTime(currentTime)}</div>
            <button
              onClick={handleStartStop}
              className={`px-6 py-2 rounded-full ${
                isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white flex items-center justify-center mx-auto`}
            >
              {isTracking ? (
                <>
                  <Square size={20} className="mr-2" />
                  Detener
                </>
              ) : (
                <>
                  <Play size={20} className="mr-2" />
                  Iniciar
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" /> Resumen del Día
          </h2>
          <div className="space-y-4">
            {timeEntries.map(entry => {
              const project = projects.find(p => p.id === entry.projectId)
              return (
                <div key={entry.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${project?.color} mr-2`} />
                      <span className="font-medium">{project?.name}</span>
                    </div>
                    <span className="text-gray-600">{formatTime(entry.duration)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{entry.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Clock className="text-blue-500" />}
          title="Tiempo Total Hoy"
          value={formatTime(timeEntries.reduce((acc, curr) => acc + curr.duration, 0))}
        />
        <StatCard
          icon={<Calendar className="text-green-500" />}
          title="Días Trabajados"
          value="22/30"
        />
        <StatCard
          icon={<User className="text-purple-500" />}
          title="Eficiencia"
          value="92%"
        />
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-gray-600 font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default TimeTracking