// src/components/formSteps/CategoryAndInfoForm.jsx
import React from 'react';
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardHeader, CardContent } from "../ui/card";

const CategoryAndInfoForm = ({ 
  formData, 
  handleCategoryChange, 
  handleAdditionalInfoChange, 
  formErrors,
  touched,
}) => {
  const getCategoryBorderClass = () => {
    const hasValue = formData.categoryAndRegion.category?.trim();
    if (touched?.category && hasValue) return 'border-[#1a365d]';
    return formErrors.category ? 'border-red-500' : 'border-input';
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <h2 className="text-2xl font-bold text-[#1a365d] tracking-tight">
          3. Category and Additional Info
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Category */}
          <div>
            <Label htmlFor="category" className={`block text-sm font-medium ${formErrors.category ? 'text-red-500' : 'text-indigo-700'}`}>
              Category:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="category"
              type="text"
              value={formData.categoryAndRegion.category || ''}
              onChange={(e) => handleCategoryChange('category', e.target.value)}
              className={`mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] 
                focus:border-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out ${getCategoryBorderClass()}`}
            />
            {formErrors.category && (
              <p className="mt-1 text-sm text-red-500 italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{formErrors.category}</span>
              </p>
            )}
          </div>

          {/* Region */}
          <div>
            <Label htmlFor="region" className="block text-sm font-medium text-indigo-700">
              Region:
            </Label>
            <Input
              id="region"
              type="text"
              value={formData.categoryAndRegion.region || ''}
              onChange={(e) => handleCategoryChange('region', e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] 
                focus:border-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* Additional Info */}
          <div className="md:col-span-2">
            <Label htmlFor="additionalInfo" className="block text-sm font-medium text-indigo-700">
              Additional Info:
            </Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo.details || ''}
              onChange={(e) => handleAdditionalInfoChange(e.target.value)}
              rows={4}
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

export default CategoryAndInfoForm;
