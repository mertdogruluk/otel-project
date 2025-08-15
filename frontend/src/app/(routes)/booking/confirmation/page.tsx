import PaymentForm from '@/components/forms/PaymentForm';
import ProgressBar from '@/components/forms/ProgressBar';
import ReservationSummary from '@/components/forms/ReservationSummary';
import React from 'react'

function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Progress Bar */}
      <ProgressBar currentStep={2} />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Sol taraf */}
        <div className="lg:col-span-2">
          <PaymentForm />
        </div>

        {/* Sağ taraf */}
        <div className="lg:col-span-1">
          <ReservationSummary />
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage;