
import { toast } from "@/hooks/use-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  selectedVisas: string[];
  resume: File | null;
  additionalInfo: string;
}

export const submitLeadForm = async (formData: FormData): Promise<boolean> => {
  // Simple validation
  if (!formData.firstName || !formData.lastName || !formData.email || 
      !formData.linkedIn || formData.selectedVisas.length === 0) {
    toast({
      title: "Error",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return false;
  }

  try {
    // In a real application, you'd submit to your API here
    // Simulate API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};
