// src/components/formSteps/ContactDetailsForm.jsx
import React from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardHeader, CardContent } from "../ui/card";

const ContactDetailsForm = ({ 
  formData, 
  handleContactChange, 
  formErrors,
  touched,
}) => {
  const getFirstNameBorderClass = () => {
    const hasValue = formData.primaryContact.firstName?.trim();
    if (touched?.firstName && hasValue) return 'border-[#1a365d]';
    return formErrors.firstName ? 'border-red-500' : 'border-input';
  };

  const getLastNameBorderClass = () => {
    const hasValue = formData.primaryContact.lastName?.trim();
    if (touched?.lastName && hasValue) return 'border-[#1a365d]';
    return formErrors.lastName ? 'border-red-500' : 'border-input';
  };

  const getEmailBorderClass = () => {
    const hasValue = formData.primaryContact.email?.trim();
    if (touched?.email && hasValue) return 'border-[#1a365d]';
    return formErrors.email ? 'border-red-500' : 'border-input';
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <div className="!bg-gradient-to-r from-[#2b4d8a] via-[#3e6ab3] to-[#2b4d8a] px-4 py-1 border-b-4 border-blue-500 rounded-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-blue-500 flex items-center justify-center shadow">
            <span className="text-white font-bold text-base">2</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white ">
              Contact Details
            </h2>
          </div>
        </div>
      </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className={`block text-sm font-medium ${formErrors.firstName ? 'text-red-500' : 'text-indigo-700'}`}>
              First Name:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.primaryContact.firstName || ''}
              onChange={(e) => handleContactChange('firstName', e.target.value)}
              className={`mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] 
                focus:border-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out ${getFirstNameBorderClass()}`}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-500 italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{formErrors.firstName}</span>
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName" className={`block text-sm font-medium ${formErrors.lastName ? 'text-red-500' : 'text-indigo-700'}`}>
              Last Name:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.primaryContact.lastName || ''}
              onChange={(e) => handleContactChange('lastName', e.target.value)}
              className={`mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] 
                focus:border-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out ${getLastNameBorderClass()}`}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-500 italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{formErrors.lastName}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className={`block text-sm font-medium ${formErrors.email ? 'text-red-500' : 'text-indigo-700'}`}>
              Email:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.primaryContact.email || ''}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className={`mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] 
                focus:border-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out ${getEmailBorderClass()}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500 italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{formErrors.email}</span>
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-indigo-700">
              Phone:
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.primaryContact.phone || ''}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] 
                focus:border-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactDetailsForm;
