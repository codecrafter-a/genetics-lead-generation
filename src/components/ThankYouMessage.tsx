import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ThankYouMessageProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({
  title = "Thank You",
  message = "Your information was submitted to our team of immigration attorneys. Expect an email from help@almalaw.co.",
  buttonText = "Go back to homepage",
  onButtonClick = () => window.location.href = '/'
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white rounded-xl max-w-lg w-full text-center p-8">
         <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle size={40} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{title}</h1>
        <p className="text-gray-600 mb-8 font-semibold">{message}</p>
        <Button 
          onClick={onButtonClick} 
          className="bg-black hover:bg-gray-800 text-white px-8 w-[300px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ThankYouMessage;
