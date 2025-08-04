import api from './api';

export interface ContactUsRequest {
  name: string;
  business_name: string;
  contact_number: string;
  contact_email: string;
  message: any;
  country: string;
}



export const contactUs = async (params: ContactUsRequest) => {
  const response = await api.post(`contact-us`, {params});
  console.log('Contact Us Response:', response.data);
  return response.data;
};