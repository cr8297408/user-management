import React, { useState } from 'react'
import { CreditCard, CheckCircle } from 'lucide-react'

interface PSEPaymentProps {
  amount: number;
  onComplete: (reference: string) => void;
  onCancel: () => void;
}

const PSEPayment: React.FC<PSEPaymentProps> = ({ amount, onComplete, onCancel }) => {
  const [step, setStep] = useState(1)
  const [bank, setBank] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [reference, setReference] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular proceso de pago
    setTimeout(() => {
      const fakeReference = `PSE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      setReference(fakeReference)
      setStep(3)
    }, 2000)
    setStep(2)
  }

  const handleComplete = () => {
    onComplete(reference)
  }

  if (step === 1) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Pago PSE</h2>
        <p className="mb-4">Monto a pagar: ${amount.toLocaleString()}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Banco</label>
            <select
              id="bank"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              required
            >
              <option value="">Seleccione un banco</option>
              <option value="bancolombia">Bancolombia</option>
              <option value="davivienda">Davivienda</option>
              <option value="bbva">BBVA</option>
              {/* Añadir más bancos según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Tipo de documento</label>
            <select
              id="documentType"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="">Seleccione tipo de documento</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ce">Cédula de Extranjería</option>
              <option value="nit">NIT</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Número de documento</label>
            <input
              type="text"
              id="documentNumber"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continuar al banco
            </button>
          </div>
        </form>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Procesando Pago</h2>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4">Por favor, espere mientras procesamos su pago...</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">¡Pago Exitoso!</h2>
      <p className="mb-4">Su pago ha sido procesado correctamente.</p>
      <p className="mb-4">Referencia de pago: <strong>{reference}</strong></p>
      <button
        onClick={handleComplete}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Completar
      </button>
    </div>
  )
}

export default PSEPayment