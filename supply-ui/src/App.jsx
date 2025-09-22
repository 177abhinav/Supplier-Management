// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import SuppliersPage from './components/SuppliersListPage';
import StepIndicator from './components/common/StepIndicator';
import ApproverListModal from './components/common/ApproverListModal';
import SupplierDetailsForm from './components/formSteps/SupplierDetailsForm';
import ContactDetailsForm from './components/formSteps/ContactDetailsForm';
import CategoryAndInfoForm from './components/formSteps/CategoryAndInfoForm';
import UploadAttachmentsForm from './components/formSteps/UploadAttachmentsForm';
import ReviewAndSubmitForm from './components/formSteps/ReviewAndSubmitForm';
import SupplierDetailPage from './components/SupplierDetailPage';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormData({
      supplierName: '', street: '', line2: '', line3: '', city: '',
      postalCode: '', country: '', region: '', firstName: '', lastName: '',
      email: '', phone: '', category: '', infoRegion: '', additionalInfo: '',
    });
  }, []);

  const handleNextStep = () => {
    const hasErrors = validateStep(currentStep);
    if (hasErrors) return;
    setCurrentStep(prevStep => (prevStep < 5 ? prevStep + 1 : prevStep));
  };

  const handleBackStep = () => {
    setFormErrors({});
    setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const validateStep = (step) => {
    let errors = {};
    let hasErrors = false;
    switch (step) {
      case 1:
        if (!formData.supplierName) { errors.supplierName = "Supplier Name is required."; hasErrors = true; }
        if (!formData.country) { errors.country = "Country is required."; hasErrors = true; }
        break;
      case 2:
        if (!formData.firstName) { errors.firstName = "First Name is required."; hasErrors = true; }
        if (!formData.lastName) { errors.lastName = "Last Name is required."; hasErrors = true; }
        if (!formData.email) {
          errors.email = "Email is required."; hasErrors = true;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email address."; hasErrors = true;
          }
        }
        break;
      case 3:
        if (!formData.category) { errors.category = "Category is required."; hasErrors = true; }
        break;
      default:
        break;
    }
    setFormErrors(errors);
    return hasErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    const payload = {
      supplierName: formData.supplierName,
      street: formData.street,
      line2: formData.line2,
      line3: formData.line3,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      region: formData.region,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      infoRegion: formData.infoRegion,
      additionalInfo: formData.additionalInfo,
      attachments: formData.attachments || []
    };

    fetch('http://localhost:8080/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.ok ? alert('Form submitted successfully!') : alert('Submission failed'))
      .catch(() => alert('Error connecting to backend'));
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return <SupplierDetailsForm formData={formData} handleChange={handleChange} formErrors={formErrors} onNext={handleNextStep} />;
      case 2:
        return <ContactDetailsForm formData={formData} handleChange={handleChange} formErrors={formErrors} onNext={handleNextStep} onBack={handleBackStep} />;
      case 3:
        return <CategoryAndInfoForm formData={formData} handleChange={handleChange} formErrors={formErrors} onNext={handleNextStep} onBack={handleBackStep} />;
      case 4:
        return <UploadAttachmentsForm
          attachments={formData.attachments || []}
          setAttachments={files => setFormData(prev => ({ ...prev, attachments: files }))}
          onNext={handleNextStep}
          onBack={handleBackStep}
        />;
      case 5:
        return <ReviewAndSubmitForm formData={formData} onBack={handleBackStep} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Routes>
  {/* 👉 Main Form Wizard Route */}
  <Route
    path="/"
    element={
      <>
        <Header
          onShowApprovers={() => setShowApproverModal(true)}
          onShowSuppliers={() => window.open("/suppliers", "_blank")}
          onDownloadExcel={() => {
                // Trigger file download from backend
    window.location.href = 'http://localhost:8080/api/download-excel';
          }}
        />
        <div className="p-4 md:p-8 lg:p-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-8 overflow-x-auto whitespace-nowrap">
              <StepIndicator step={1} title="Supplier Details" active={currentStep >= 1} />
              <div className={`flex-grow h-2 mx-4 rounded transition-colors duration-300 ${currentStep > 1 ? 'bg-blue-700' : 'bg-blue-200'}`}></div>
              <StepIndicator step={2} title="Contact Details" active={currentStep >= 2} />
              <div className={`flex-grow h-2 mx-4 rounded transition-colors duration-300 ${currentStep > 2 ? 'bg-blue-700' : 'bg-blue-200'}`}></div>
              <StepIndicator step={3} title="Category and Additional Info" active={currentStep >= 3} />
              <div className={`flex-grow h-2 mx-4 rounded transition-colors duration-300 ${currentStep > 3 ? 'bg-blue-700' : 'bg-blue-200'}`}></div>
              <StepIndicator step={4} title="Upload Attachments" active={currentStep >= 4} />
              <div className={`flex-grow h-2 mx-4 rounded transition-colors duration-300 ${currentStep > 4 ? 'bg-blue-700' : 'bg-blue-200'}`}></div>
              <StepIndicator step={5} title="Review & Submit" active={currentStep >= 5} />
            </div>
            {renderFormContent()}
          </div>
        </div>
        {showApproverModal && <ApproverListModal onClose={() => setShowApproverModal(false)} />}
      </>
    }
  />

  {/* ✅ 👉 Suppliers LIST Page */}
  <Route
  path="/suppliers"
  element={
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 md:p-8">
      {/* ✅ NO HEADER HERE — clean, focused suppliers list */}
      <SuppliersPage />
    </div>
  }
/>

  {/* ✅ 👉 Supplier DETAIL Page */}
  <Route
    path="/suppliers/:id"
    element={
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 md:p-8">
        <div className="mt-8">
          <SupplierDetailPage />
        </div>
      </div>
    }
  />
</Routes>
    </div>
  );
};

export default App;