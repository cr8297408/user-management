import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('your_stripe_public_key')

const ClientDashboard = () => {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setPayments(data)
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  const handlePayment = async (paymentId) => {
    const stripe = await stripePromise
    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ paymentId })
      })
      const session = await response.json()
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })
      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error processing payment:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Cliente</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Pagos Pendientes</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul>
            {payments.map((payment) => (
              <li key={payment._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    {payment.description}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ${payment.amount}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="sm:flex">
                    <div className="mr-6 flex items-center text-sm text-gray-500">
                      <span>Vencimiento: {new Date(payment.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <button
                      onClick={() => handlePayment(payment._id)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Pagar ahora
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard