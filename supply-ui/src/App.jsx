// src/App.jsx
import React, { useState, useMemo } from 'react';
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
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [touched, setTouched] = useState({});

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

  const FIELDS_PER_STEP = {
    1: [
      { name: 'supplierName', required: true },
      { name: 'businessPartnerId', required: false },
      { name: 'street', required: false },
      { name: 'line2', required: false },
      { name: 'line3', required: false },
      { name: 'city', required: false },
      { name: 'postalCode', required: false },
      { name: 'country', required: true },
      { name: 'region', required: false }
    ],
    2: [
      { name: 'firstName', required: true },
      { name: 'lastName', required: true },
      { name: 'email', required: true },
      { name: 'phone', required: false }
    ],
    3: [
      { name: 'category', required: true },
      { name: 'region', required: false },
      { name: 'details', required: false } // from additionalInfo.details
    ],
    4: [
      { name: 'attachments', required: true }
    ],
    5: [] // Review step
  };

  const isFieldFilled = (step, fieldConfig) => {
    const { name } = fieldConfig;

    switch (step) {
      case 1:
        if (name === 'supplierName') return !!formData.supplierName?.trim();
        if (name === 'businessPartnerId') return !!formData.businessPartnerId?.trim();
        if (['street', 'line2', 'line3', 'city', 'postalCode', 'country', 'region'].includes(name)) {
          return !!formData.mainAddress[name]?.trim();
        }
        return false;

      case 2:
        if (['firstName', 'lastName', 'email', 'phone'].includes(name)) {
          return !!formData.primaryContact[name]?.trim();
        }
        return false;

      case 3:
        if (name === 'category' || name === 'region') {
          return !!formData.categoryAndRegion[name]?.trim();
        }
        if (name === 'details') {
          return !!formData.additionalInfo.details?.trim();
        }
        return false;

      case 4:
        if (name === 'attachments') {
          return Array.isArray(formData.attachments) && formData.attachments.length > 0;
        }
        return false;

      default:
        return false;
    }
  };

  const totalProgressPercent = useMemo(() => {
    const totalSteps = 4; // 5 steps → 4 intervals (0% to 100%)
    if (totalSteps === 0) return 0;

    const completedStepsProgress = (currentStep - 1) / totalSteps;
    const currentStepFields = FIELDS_PER_STEP[currentStep] || [];

    if (currentStepFields.length === 0) {
      return Math.min(100, completedStepsProgress * 100);
    }

    let filledWeight = 0;
    let maxWeight = 0;

    currentStepFields.forEach(field => {
      const weight = field.required ? 2 : 1;
      maxWeight += weight;
      if (isFieldFilled(currentStep, field)) {
        filledWeight += weight;
      }
    });

    const currentStepProgress = maxWeight > 0 ? filledWeight / maxWeight : 0;
    const totalProgress = completedStepsProgress + (currentStepProgress / totalSteps);

    return Math.min(100, Math.round(totalProgress * 100));
  }, [formData, currentStep]);

  const goToStep = (step) => {
    if (step >= 1 && step <= maxStepReached) {
      for (let i = 1; i < step; i++) {
        if (validateStep(i)) {
          setCurrentStep(i);
          return;
        }
      }
      setCurrentStep(step);
      setFormErrors({});
    }
  };

  const handleNextStep = () => {
    const hasErrors = validateStep(currentStep);
    if (hasErrors) return;

    setCurrentStep((prevStep) => {
      const nextStep = prevStep < 5 ? prevStep + 1 : prevStep;
      setMaxStepReached((max) => Math.max(max, nextStep));
      return nextStep;
    });
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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true })); // ✅ mark as touched
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      mainAddress: { ...prev.mainAddress, [field]: value }
    }));
     setTouched(prev => ({ ...prev, [`mainAddress.${field}`]: true })); // ✅
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      primaryContact: { ...prev.primaryContact, [field]: value }
    }));
    setTouched(prev => ({ ...prev, [`primaryContact.${field}`]: true })); // ✅
  };

  const handleCategoryChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      categoryAndRegion: { ...prev.categoryAndRegion, [field]: value }
    }));
    setTouched(prev => ({ ...prev, [`categoryAndRegion.${field}`]: true }));
  };

  const handleAdditionalInfoChange = (value) => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: { details: value }
    }));
    setTouched(prev => ({ ...prev, 'additionalInfo.details': true })); // ✅
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
              touched={touched}
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
            touched={touched}
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
            touched={touched}
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
                {/* 👇 Top Progress Bar - Separate from form */}
                <div className="mb-6 bg-white rounded-lg shadow-sm py-4 px-4">
                  <TopStepProgress
                    currentStep={currentStep}
                    maxStepReached={maxStepReached}
                    goToStep={goToStep}
                    progressPercent={totalProgressPercent}
                  />
                </div>

                {/* 👇 Form Content - Inside white card */}
                {renderFormContent()}
                <div className="mt-6">
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