import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationAPI, uploadAPI, validateEmail, validatePhone, handleApiError } from '../utils/api';
import Loading from '../components/Loading';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    id_number: '',
    nationality: 'Namibian',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergency_contact: '',
    highest_qualification: '',
    institution: '',
    year_completed: '',
    results: '',
    intended_course: '',
    planned_year: new Date().getFullYear(),
    study_mode: 'full-time',
    is_quick_application: false,
    marital_status: 'single'
  });
  const [files, setFiles] = useState({
    id_document: null,
    academic_transcript: null,
    passport_photo: null
  });
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const courses = [
    'Computer Science',
    'Information Technology',
    'Business Administration',
    'Accounting',
    'Engineering',
    'Biology',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number format';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.intended_course) newErrors.intended_course = 'Please select a course';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.emergency_contact.trim()) newErrors.emergency_contact = 'Emergency contact is required';

    // For quick applications, require ID document
    if (formData.is_quick_application && !files.id_document) {
      newErrors.id_document = 'ID document is required for quick applications';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [fieldName]: 'Only JPG, PNG, and PDF files are allowed' }));
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }

      setFiles(prev => ({ ...prev, [fieldName]: file }));
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Upload files first if they exist
      const uploadedFiles = {};
      const uploadPromises = [];

      Object.keys(files).forEach(key => {
        if (files[key]) {
          uploadPromises.push(
            uploadAPI.uploadFile(files[key], key)
              .then(response => {
                uploadedFiles[key] = response.data.filename;
                setUploadProgress(prev => ({ ...prev, [key]: 100 }));
              })
              .catch(error => {
                const errorData = handleApiError(error);
                setErrors(prev => ({ ...prev, [key]: errorData.message }));
                throw error;
              })
          );
        }
      });

      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }

      // Submit application
      const applicationData = {
        ...formData,
        ...uploadedFiles
      };

      const response = await applicationAPI.createApplication(applicationData);
      
      if (response.data.success) {
        if (formData.is_quick_application) {
          // For quick applications, show success with credentials
          alert(`Application successful! Your student account has been created.\n\nStudent Number: ${response.data.student_number}\nPassword: ${response.data.password}\n\nYou can now login to the e-learning portal.`);
          navigate('/elearning');
        } else {
          // For regular applications, show success message
          alert(`Application submitted successfully!\n\nApplication Number: ${response.data.application.application_number}\n\nYou will receive an email when your application is reviewed.`);
          navigate('/');
        }
      }
    } catch (error) {
      const errorData = handleApiError(error);
      setErrors(prev => ({ ...prev, submit: errorData.message }));
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please fill in your personal details accurately.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.full_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.date_of_birth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 0811234567 or +264811234567"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Namibian"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your address"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Contact *
          </label>
          <input
            type="text"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.emergency_contact ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Name and phone number"
          />
          {errors.emergency_contact && <p className="mt-1 text-sm text-red-600">{errors.emergency_contact}</p>}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_quick_application"
            checked={formData.is_quick_application}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Quick Application (Instant approval)
          </label>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Information</h2>
        <p className="text-gray-600">Please provide your academic background and course preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intended Course *
          </label>
          <select
            name="intended_course"
            value={formData.intended_course}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.intended_course ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.intended_course && <p className="mt-1 text-sm text-red-600">{errors.intended_course}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Planned Year
          </label>
          <input
            type="number"
            name="planned_year"
            value={formData.planned_year}
            onChange={handleInputChange}
            min={new Date().getFullYear()}
            max={new Date().getFullYear() + 5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Study Mode
          </label>
          <select
            name="study_mode"
            value={formData.study_mode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marital Status
          </label>
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highest Qualification
          </label>
          <input
            type="text"
            name="highest_qualification"
            value={formData.highest_qualification}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., High School Diploma, Bachelor's Degree"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Institution
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Name of previous school/university"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Completed
          </label>
          <input
            type="number"
            name="year_completed"
            value={formData.year_completed}
            onChange={handleInputChange}
            min="1950"
            max={new Date().getFullYear()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 2023"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Results/Grade
          </label>
          <input
            type="text"
            name="results"
            value={formData.results}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., A, 85%, Distinction"
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please upload the following documents. For quick applications, at least your ID document is required.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Document *
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'id_document')}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.id_document && <p className="mt-1 text-sm text-red-600">{errors.id_document}</p>}
            {uploadProgress.id_document > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${uploadProgress.id_document}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{uploadProgress.id_document}% uploaded</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Transcript
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'academic_transcript')}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.academic_transcript && <p className="mt-1 text-sm text-red-600">{errors.academic_transcript}</p>}
            {uploadProgress.academic_transcript > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${uploadProgress.academic_transcript}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{uploadProgress.academic_transcript}% uploaded</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passport Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'passport_photo')}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.passport_photo && <p className="mt-1 text-sm text-red-600">{errors.passport_photo}</p>}
            {uploadProgress.passport_photo > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${uploadProgress.passport_photo}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{uploadProgress.passport_photo}% uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>

      {errors.submit && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Application</h1>
          <p className="mt-2 text-gray-600">Join Sepo College and start your educational journey today.</p>
          
          <div className="mt-6 flex items-center space-x-8">
            <div className={`flex items-center ${step === 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <span className="ml-3 text-sm font-medium">Personal Info</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className={`flex items-center ${step === 2 ? 'text-indigo-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <span className="ml-3 text-sm font-medium">Academic Info</span>
            </div>
          </div>
        </div>

        {loading && <Loading message="Processing your application..." />}
        
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default ApplicationForm;