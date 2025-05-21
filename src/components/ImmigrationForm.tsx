import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import VisaOptionsSelector, { VisaOption } from './VisaOptionsSelector';
import { submitLeadForm } from '@/utils/formSubmission';

const visaOptions: VisaOption[] = [
  { id: 'h1', label: 'H-1B' },
  { id: 'l1', label: 'L-1' },
  { id: 'eb5', label: 'EB-5' },
  { id: 'other', label: 'I don\'t know' }
];

interface ImmigrationFormProps {
  onSubmitSuccess: () => void;
}

const ImmigrationForm: React.FC<ImmigrationFormProps> = ({ onSubmitSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVisaChange = (visaId: string) => {
    setSelectedVisas(current => 
      current.includes(visaId)
        ? current.filter(id => id !== visaId)
        : [...current, visaId]
    );
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await submitLeadForm({
      firstName,
      lastName,
      email,
      linkedIn,
      selectedVisas,
      resume,
      additionalInfo
    });
    
    if (success) {
      onSubmitSuccess();
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700">First Name*</Label>
          <Input 
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700">Last Name*</Label>
          <Input 
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email*</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedIn" className="text-gray-700">LinkedIn Profile URL*</Label>
          <Input 
            id="linkedIn"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
        <VisaOptionsSelector 
          options={visaOptions}
          selectedOptions={selectedVisas}
          onChange={handleVisaChange}
        />
        </div>

      <div className="space-y-2">
        <Label htmlFor="resume" className="text-gray-700">Resume/CV Upload*</Label>
        <div className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50">
          <Upload size={20} className="text-gray-500" />
          <Input 
            id="resume"
            type="file"
            onChange={handleResumeChange} 
            className="border-0 bg-transparent p-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">How can we help you?</h3>
        <Textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Tell us about your situation, goals, and any questions you have..."
          className="h-32 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-black hover:bg-gray-800 text-white py-3 text-base font-medium transition-colors rounded-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default ImmigrationForm;
