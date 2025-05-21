import React, { useState } from 'react';
import LeadFormHeader from './LeadFormHeader';
import ImmigrationForm from './ImmigrationForm';
import ThankYouMessage from './ThankYouMessage';
import roundImage from '../../public/assets/images/round-img.png'

const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ThankYouMessage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-r from-[#e8f4c7] to-[#d6edbd] pt-10 md:pt-16 pb-10 md:pb-14 px-4 shadow-sm">
        <img
          src={roundImage}
          alt="Leaves"
          className="absolute left-[-180px] top-[-10px] w-32 md:w-[21rem]"
        />
        <div className="lg:max-w-xl max-w-[26rem] mx-auto relative z-10">
          <div className="text-gray-800 font-bold text-2xl mb-2">almā</div>
          <LeadFormHeader title={
            <>
              Get An Assessment <br /> Of Your Immigration Case
            </>
          } />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 -mt-6">
        <div className="bg-white p-6 md:p-8">
          <div className='flex flex-col text-center'>
            <LeadFormHeader
              subtitle="Want to understand your visa options?"
              description="Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals."
            />
          </div>
          <ImmigrationForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
