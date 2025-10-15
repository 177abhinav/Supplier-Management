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
    <Card className="w-full bg-gray-50 shadow-sm rounded-lg border border-gray-200">
      <CardHeader className="pb-3">
        <div className="!bg-gradient-to-r from-[#2b4d8a] via-[#3e6ab3] to-[#2b4d8a] px-4 py-1 border-b-4 border-blue-500 rounded-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow">
              <span className="text-white font-bold text-base">1</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Supplier Details</h2>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3"> {/* Tighter grid */}
          {/* Supplier Name (required) */}
          <div>
            <Label
              htmlFor="supplierName"
              className={`text-sm font-medium ${formErrors.supplierName ? "text-red-500" : "text-indigo-700"}`}
            >
              Supplier Name:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="supplierName"
              type="text"
              value={formData.supplierName || ""}
              onChange={(e) => handleChange("supplierName", e.target.value)}
              className={`mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]
                transition-colors duration-200
                ${getSupplierNameBorderClass()}`}
            />
            {formErrors.supplierName && (
              <p className="mt-1 text-xs text-red-500 italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.supplierName}
              </p>
            )}
          </div>

          {/* Street */}
          <div>
            <Label htmlFor="street" className="text-sm font-medium text-indigo-700">
              Street:
            </Label>
            <Input
              id="street"
              type="text"
              value={formData.mainAddress.street || ""}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              className="mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]"
            />
          </div>

          {/* Line2 */}
          <div>
            <Label htmlFor="line2" className="text-sm font-medium text-indigo-700">
              Line2:
            </Label>
            <Input
              id="line2"
              type="text"
              value={formData.mainAddress.line2 || ""}
              onChange={(e) => handleAddressChange("line2", e.target.value)}
              className="mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]"
            />
          </div>

          {/* Line3 */}
          <div>
            <Label htmlFor="line3" className="text-sm font-medium text-indigo-700">
              Line3:
            </Label>
            <Input
              id="line3"
              type="text"
              value={formData.mainAddress.line3 || ""}
              onChange={(e) => handleAddressChange("line3", e.target.value)}
              className="mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]"
            />
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city" className="text-sm font-medium text-indigo-700">
              City:
            </Label>
            <Input
              id="city"
              type="text"
              value={formData.mainAddress.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]"
            />
          </div>

          {/* Postal Code */}
          <div>
            <Label htmlFor="postalCode" className="text-sm font-medium text-indigo-700">
              Postal Code:
            </Label>
            <Input
              id="postalCode"
              type="text"
              value={formData.mainAddress.postalCode || ""}
              onChange={(e) => handleAddressChange("postalCode", e.target.value)}
              className="mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]"
            />
          </div>

          {/* Country (required) */}
          <div>
            <Label
              htmlFor="country"
              className={`text-sm font-medium ${formErrors.country ? "text-red-500" : "text-indigo-700"}`}
            >
              Country:<span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              type="text"
              value={formData.mainAddress.country || ""}
              onChange={(e) => handleAddressChange("country", e.target.value)}
              className={`mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]
                transition-colors duration-200
                ${getCountryBorderClass()}`}
            />
            {formErrors.country && (
              <p className="mt-1 text-xs text-red-500 italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.country}
              </p>
            )}
          </div>

          {/* Region */}
          <div>
            <Label htmlFor="region" className="text-sm font-medium text-indigo-700">
              Region:
            </Label>
            <Input
              id="region"
              type="text"
              value={formData.mainAddress.region || ""}
              onChange={(e) => handleAddressChange("region", e.target.value)}
              className="mt-1 w-full p-1.5 text-sm rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:border-[#1a365d]
                focus:shadow-[0_0_0_2px_rgba(26,54,93,0.2)]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierDetailsForm;