import React, { useState } from 'react';
import { Phone, Mail, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';


const CallBookingWebsite = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        time: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, email, mobile, time } = formData;

        if (!name || !email || !mobile || !time) {
            return 'Please fill in all fields';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
            return 'Please enter a valid 10-digit mobile number';
        }

        return null;
    };

const handleSubmit = async () => {
  const validationError = validateForm();
  if (validationError) {
    setSubmitStatus({ type: 'error', message: validationError });
    return;
  }
  
  setIsSubmitting(true);
  setSubmitStatus(null);
  
  try {
    const response = await fetch('https://formcarry.com/s/cfdBlteB3bU', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        time: new Date(formData.time).toLocaleString(),
        message: `Call booking request from ${formData.name}. Please call at ${new Date(formData.time).toLocaleString()}`
      })
    });

    if (response.ok) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Your call has been scheduled successfully! You will receive a confirmation email shortly.' 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        time: ''
      });
    } else {
      throw new Error('Submission failed');
    }
    
  } catch (error) {
    setSubmitStatus({ 
      type: 'error', 
      message: 'Failed to schedule your call. Please try again.' 
    });
  } finally {
    setIsSubmitting(false);
  }
};

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16);
};

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative w-full max-w-md">
            {/* Main Card */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 hover:bg-white/30 transition-colors duration-300">
                        <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Schedule Your Call</h1>
                    <p className="text-purple-100">Discuss Your Project With Us</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 hover:border-purple-400"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 hover:border-purple-400"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Mobile Field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 hover:border-purple-400"
                                    placeholder="Enter your mobile number"
                                />
                            </div>
                        </div>

                        {/* Time Field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Preferred Call Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="datetime-local"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    min={getTomorrowDate()}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 hover:border-purple-400"
                                />
                            </div>
                        </div>

                        {/* Status Message */}
                        {submitStatus && (
                            <div className={`p-4 rounded-xl flex items-center space-x-3 ${submitStatus.type === 'success'
                                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                                }`}>
                                {submitStatus.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5" />
                                )}
                                <span className="text-sm">{submitStatus.message}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Scheduling...</span>
                                </>
                            ) : (
                                <>
                                    <Phone className="w-5 h-5" />
                                    <span>Schedule Call</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            We'll call you at your scheduled time. Make sure you're available!
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 bg-gray-800/30 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                    <p className="text-gray-300 text-sm">
                        Contact us at{' '}
                        <a
                            href="mailto:lokeshjaglan01@gmail.com"
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                        >
                            lokeshjaglan01@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
);}

export default CallBookingWebsite;