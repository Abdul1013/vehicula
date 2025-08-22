import { useState } from "react";
import { Mail, Phone, User, Calendar, Car } from "lucide-react";
import Image from "next/image";

const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto">
    {children}
  </div>
);

// Reusable FormInput component
const FormInput = ({
  type,
  name,
  placeholder,
  icon: Icon,
  required = true,
}) => (
  <div className="relative w-full mt-3">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="form-input w-full rounded-xl border border-gray-300 shadow-sm px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <span className="absolute top-1/2 -translate-y-1/2 right-3 text-blue-500">
      <Icon size={20} />
    </span>
  </div>
);

// Submit button component
const Button = ({ label, loading, type = "submit" }) => (
  <button
    type={type}
    disabled={loading}
    className="w-full mt-4 bg-blue-600 text-white text-lg font-medium py-3 px-6 rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50"
  >
    {loading ? "Processing..." : label}
  </button>
);

export default function ReminderForm() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    plate: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚀 Backend placeholder (Replace with API call)
    console.log("Submitting Reminder Form", formData);
  };

  return (
    <div className="w-full bg-white py-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side image */}
        <div className="flex justify-center">
          <Image height={400} width={400} 
            src="/img/iphone_edit_new.png"
            alt="Reminder iPhone"
            className="max-w-xs md:max-w-md"
          />
        </div>

        {/* Form Section */}
        <Card className="shadow-xl rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            Never miss your renewal deadline
          </h2>
          <p className="text-gray-600 mt-2">
            Set up free reminders for your vehicle particulars and get notified
            before expiry.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            Set Up Free Reminder
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <FormInput
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <FormInput
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <FormInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Car className="absolute left-3 top-3 text-gray-400" size={20} />
              <FormInput
                type="text"
                name="plate"
                placeholder="Vehicle Plate Number"
                value={formData.plate}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <FormInput
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10"
                required
              />
              <small className="text-gray-500 text-sm mt-1 block ml-2">
                Vehicle particular expiry date
              </small>
            </div>

            <div className="text-end">
              <Button
                type="submit"
                className="rounded-full px-6 text-lg shadow-md"
              >
                Remind Me
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
