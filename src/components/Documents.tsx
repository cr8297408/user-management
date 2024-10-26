import React, { useState } from 'react'
import { FileText, Upload, Download, Search, Folder, File, Star, Clock } from 'lucide-react'

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  category: string;
  starred: boolean;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Política de Vacaciones.pdf', type: 'PDF', size: '245 KB', lastModified: '2023-06-15', category: 'Políticas', starred: true },
    { id: 2, name: 'Contrato Estándar.docx', type: 'DOCX', size: '180 KB', lastModified: '2023-06-14', category: 'Contratos', starred: false },
    { id: 3, name: 'Manual de Empleado.pdf', type: 'PDF', size: '1.2 MB', lastModified: '2023-06-10', category: 'Manuales', starred: true },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'Políticas', name: 'Políticas' },
    { id: 'Contratos', name: 'Contratos' },
    { id: 'Manuales', name: 'Manuales' },
  ]

  const handleUpload = () => {
    // Implementar lógica de carga de archivos
    alert('Funcionalidad de carga en desarrollo')
  }

  const toggleStar = (id: number) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, starred: !doc.starred } : doc
    ))
  }

  const filteredDocuments = documents.filter(doc =>
    (selectedCategory === 'all' || doc.category === selectedCategory) &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de Documentos</h1>
      
      <div className="mb-6 flex items-center space-x-6">
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
        >
          <Upload size={20} className="mr-2" />
          Subir Documento
        </button>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-64">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold mb-4">Categorías</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === category.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Folder size={16} className="inline mr-2" />
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Categoría</th>
                  <th className="py-3 px-6 text-left">Tamaño</th>
                  <th className="py-3 px-6 text-left">Última Modificación</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredDocuments.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <div className="flex items-center">
                        <File size={16} className="mr-2" />
                        {doc.name}
                      </div>
                    </td>
                    <td className="py-3 px-6">{doc.category}</td>
                    <td className="py-3 px-6">{doc.size}</td>
                    <td className="py-3 px-6">{doc.lastModified}</td>
                    <td className="py-3 px-6">
                      <div className="flex justify-center items-center space-x-4">
                        <button
                          onClick={() => toggleStar(doc.id)}
                          className={`transform hover:scale-110 transition-transform ${
                            doc.starred ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                        >
                          <Star size={16} fill={doc.starred ? 'currentColor' : 'none'} />
                        </button>
                        <button className="transform hover:scale-110 transition-transform text-blue-500">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documents