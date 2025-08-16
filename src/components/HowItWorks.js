import Image from 'next/image';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Register an account',
      description: 'Provide your vehicle plate number and phone number.'
    },
    {
      number: 2,
      title: 'Get notifications',
      description: 'Get notified over time by choosing a convenient payment plan.'
    },
    {
      number: 3,
      title: 'Get your vehicle documents',
      description: 'Your vehicle documents will be delivered to you after fulfilling your preferred payment plan.'
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-piggy-bank',
      text: 'No hidden charges'
    },
    {
      icon: 'fas fa-shipping-fast',
      text: 'Free Delivery'
    },
    {
      icon: 'fas fa-stopwatch',
      text: 'On time process'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          See how it works
        </h2>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="absolute -top-4 left-4">
                <span className="inline-block px-4 py-2 rounded-full text-xl font-bold text-blue-600 border-2 border-blue-600">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border-b md:border-b-0 md:border-r last:border-0 border-blue-200"
            >
              <i className={`${benefit.icon} text-3xl text-blue-600 mb-3`}></i>
              <span className="text-gray-700">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
