// src/components/formSteps/SupplierDetailsForm.jsx
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardHeader, CardContent } from "../ui/card";

const SupplierDetailsForm = ({
  formData,
  handleChange,
  handleAddressChange,
  formErrors,
  touched,
  onNext,
  goToStep,
}) => {
  const getSupplierNameBorderClass = () => {
    const hasValue = formData.supplierName?.trim();
    if (touched?.supplierName && hasValue) {
      return "border-[#1a365d]";
    }
    return formErrors.supplierName ? "border-red-500" : "border-input";
  };

  const getCountryBorderClass = () => {
    const hasValue = formData.mainAddress.country?.trim();
    if (touched?.["mainAddress.country"] && hasValue) {
      return "border-[#1a365d]";
    }
    return formErrors.country ? "border-red-500" : "border-input";
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <h2 className="text-2xl font-bold text-[#1a365d] tracking-tight">
          1. Supplier Details
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {/* Supplier Name (required) */}
          <div>
            <Label
              htmlFor="supplierName"
              className={`block text-sm font-medium ${
                formErrors.supplierName ? "text-red-500" : "text-indigo-700"
              }`}
            >
              Supplier Name:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="supplierName"
              type="text"
              value={formData.supplierName || ""}
              onChange={(e) => handleChange("supplierName", e.target.value)}
              className={`mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out
                ${getSupplierNameBorderClass()}`}
            />
            {formErrors.supplierName && (
              <p className="mt-1 text-sm text-red-500 italic flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{formErrors.supplierName}</span>
              </p>
            )}
          </div>

          {/* Street (optional) */}
          <div>
            <Label
              htmlFor="street"
              className="block text-sm font-medium text-indigo-700"
            >
              Street:
            </Label>
            <Input
              id="street"
              type="text"
              value={formData.mainAddress.street || ""}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* Line2 (optional) */}
          <div>
            <Label
              htmlFor="line2"
              className="block text-sm font-medium text-indigo-700"
            >
              Line2:
            </Label>
            <Input
              id="line2"
              type="text"
              value={formData.mainAddress.line2 || ""}
              onChange={(e) => handleAddressChange("line2", e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* Line3 (optional) */}
          <div>
            <Label
              htmlFor="line3"
              className="block text-sm font-medium text-indigo-700"
            >
              Line3:
            </Label>
            <Input
              id="line3"
              type="text"
              value={formData.mainAddress.line3 || ""}
              onChange={(e) => handleAddressChange("line3", e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* City (optional) */}
          <div>
            <Label
              htmlFor="city"
              className="block text-sm font-medium text-indigo-700"
            >
              City:
            </Label>
            <Input
              id="city"
              type="text"
              value={formData.mainAddress.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* Postal Code (optional) */}
          <div>
            <Label
              htmlFor="postalCode"
              className="block text-sm font-medium text-indigo-700"
            >
              Postal Code:
            </Label>
            <Input
              id="postalCode"
              type="text"
              value={formData.mainAddress.postalCode || ""}
              onChange={(e) =>
                handleAddressChange("postalCode", e.target.value)
              }
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* Country (required) */}
          <div>
            <Label
              htmlFor="country"
              className={`block text-sm font-medium ${
                formErrors.country ? "text-red-500" : "text-indigo-700"
              }`}
            >
              Country:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              type="text"
              value={formData.mainAddress.country || ""}
              onChange={(e) => handleAddressChange("country", e.target.value)}
              className={`mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out
                ${getCountryBorderClass()}`}
            />
            {formErrors.country && (
              <p className="mt-1 text-sm text-red-500 italic flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{formErrors.country}</span>
              </p>
            )}
          </div>

          {/* Region (optional) */}
          <div>
            <Label
              htmlFor="region"
              className="block text-sm font-medium text-indigo-700"
            >
              Region:
            </Label>
            <Input
              id="region"
              type="text"
              value={formData.mainAddress.region || ""}
              onChange={(e) => handleAddressChange("region", e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-1 
                focus:ring-[#1a365d] 
                focus:border-[#1a365d] 
                focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)] 
                transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierDetailsForm;
