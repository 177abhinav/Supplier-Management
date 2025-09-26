// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/common/Header';
import SuppliersPage from './components/SuppliersListPage';
import ApproverListModal from './components/common/ApproverListModal';
import SupplierDetailsForm from './components/formSteps/SupplierDetailsForm';
import ContactDetailsForm from './components/formSteps/ContactDetailsForm';
import CategoryAndInfoForm from './components/formSteps/CategoryAndInfoForm';
import UploadAttachmentsForm from './components/formSteps/UploadAttachmentsForm';
import ReviewAndSubmitForm from './components/formSteps/ReviewAndSubmitForm';
import SupplierDetailPage from './components/SupplierDetailPage';
import TopStepProgress from './components/common/TopStepProgress';
import StepNavigator from './components/common/StepNavigator';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showApproverModal, setShowApproverModal] = useState(false);

  // ✅ Fully initialize formData to avoid undefined nested objects
  const [formData, setFormData] = useState({
    supplierName: '',
    status: 'Pending',
    businessPartnerId: '',
    mainAddress: {
      street: '',
      line2: '',
      line3: '',
      city: '',
      postalCode: '',
      country: '',
      region: ''
    },
    primaryContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    categoryAndRegion: {
      category: '',
      region: ''
    },
    additionalInfo: {
      details: ''
    },
    attachments: []
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const goToStep = (step) => {
    if (step >= 1 && step <= currentStep) {
      setCurrentStep(step);
      setFormErrors({});
    }
  };

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
        if (!formData.supplierName) {
          errors.supplierName = 'Supplier Name is required.';
          hasErrors = true;
        }
        if (!formData.mainAddress.country) {
          errors.country = 'Country is required.';
          hasErrors = true;
        }
        break;
      case 2:
        if (!formData.primaryContact.firstName) {
          errors.firstName = 'First Name is required.';
          hasErrors = true;
        }
        if (!formData.primaryContact.lastName) {
          errors.lastName = 'Last Name is required.';
          hasErrors = true;
        }
        if (!formData.primaryContact.email) {
          errors.email = 'Email is required.';
          hasErrors = true;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.primaryContact.email)) {
            errors.email = 'Please enter a valid email address.';
            hasErrors = true;
          }
        }
        break;
      case 3:
        if (!formData.categoryAndRegion.category) {
          errors.category = 'Category is required.';
          hasErrors = true;
        }
        break;
      case 4:
        if (!formData.attachments || formData.attachments.length === 0) {
          errors.attachments = 'At least one attachment is required.';
          hasErrors = true;
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
    return hasErrors;
  };

  // Handle changes for top-level fields
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle changes for nested objects
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      mainAddress: { ...prev.mainAddress, [field]: value }
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      primaryContact: { ...prev.primaryContact, [field]: value }
    }));
  };

  const handleCategoryChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      categoryAndRegion: { ...prev.categoryAndRegion, [field]: value }
    }));
  };

  const handleAdditionalInfoChange = (value) => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: { details: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        supplierName: formData.supplierName,
        status: formData.status,
        businessPartnerId: formData.businessPartnerId,
        mainAddress: formData.mainAddress,
        primaryContact: formData.primaryContact,
        categoryAndRegion: formData.categoryAndRegion,
        additionalInfo: formData.additionalInfo
      };

      const supplierResponse = await fetch('http://localhost:8080/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!supplierResponse.ok) {
        throw new Error('Failed to create supplier');
      }

      const supplierResult = await supplierResponse.json();
      const supplierId = supplierResult.id;

      // Upload files
      const uploadPromises = formData.attachments.map(async (fileObj) => {
        const formDataUpload = new FormData();
        formDataUpload.append('file', fileObj.rawFile);
        formDataUpload.append('supplierName', formData.supplierName);
        
        const uploadResponse = await fetch(`http://localhost:8080/api/suppliers/${supplierId}/upload`, {
          method: 'POST',
          body: formDataUpload
        });
        
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${fileObj.fileName}`);
        }
        return uploadResponse.json();
      });

      await Promise.all(uploadPromises);
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData({
        supplierName: '',
        status: 'Pending',
        businessPartnerId: '',
        mainAddress: {
          street: '',
          line2: '',
          line3: '',
          city: '',
          postalCode: '',
          country: '',
          region: ''
        },
        primaryContact: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        categoryAndRegion: {
          category: '',
          region: ''
        },
        additionalInfo: {
          details: ''
        },
        attachments: []
      });
      setCurrentStep(1);
      setFormErrors({});
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error: ' + error.message);
    }
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SupplierDetailsForm
            formData={formData}
            handleChange={handleChange}
            handleAddressChange={handleAddressChange}
            formErrors={formErrors}
            onNext={handleNextStep}
            goToStep={goToStep}
          />
        );
      case 2:
        return (
          <ContactDetailsForm
            formData={formData}
            handleChange={handleChange}
            handleContactChange={handleContactChange}
            formErrors={formErrors}
            onNext={handleNextStep}
            onBack={handleBackStep}
            goToStep={goToStep}
          />
        );
      case 3:
        return (
          <CategoryAndInfoForm
            formData={formData}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            handleAdditionalInfoChange={handleAdditionalInfoChange}
            formErrors={formErrors}
            onNext={handleNextStep}
            onBack={handleBackStep}
            goToStep={goToStep}
          />
        );
      case 4:
        return (
          <UploadAttachmentsForm
            attachments={formData.attachments || []}
            setAttachments={(files) => setFormData((prev) => ({ ...prev, attachments: files }))}
            onNext={handleNextStep}
            onBack={handleBackStep}
            goToStep={goToStep}
            error={formErrors.attachments}
          />
        );
      case 5:
        return (
          <ReviewAndSubmitForm
            formData={formData}
            onBack={handleBackStep}
            onSubmit={handleSubmit}
            goToStep={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                onShowApprovers={() => setShowApproverModal(true)}
                onShowSuppliers={() => navigate('/suppliers')}
                onDownloadExcel={() => {
                  window.location.href = 'http://localhost:8080/api/download-excel';
                }}
              />
              <div className="p-4 md:p-8 lg:p-12">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <TopStepProgress currentStep={currentStep} goToStep={goToStep} />
                  {renderFormContent()}
                  <StepNavigator
                    currentStep={currentStep}
                    totalSteps={5}
                    onBack={handleBackStep}
                    onNext={handleNextStep}
                    onSubmit={handleSubmit}
                    goToStep={goToStep}
                    isFirstStep={currentStep === 1}
                    isLastStep={currentStep === 5}
                  />
                </div>
              </div>
              {showApproverModal && <ApproverListModal onClose={() => setShowApproverModal(false)} />}
            </>
          }
        />
        <Route
          path="/suppliers"
          element={
            <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 md:p-8">
              <SuppliersPage />
            </div>
          }
        />
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
