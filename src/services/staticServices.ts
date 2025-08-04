import api from './api';

interface StaticPagePayload {
  page: 'faq' | 'terms-of-use' | 'privacy-policy'; // or whatever keys your API accepts
}

export const getStaticPage = async ({ page }: { page: string }) => {
  const response = await api.get(`/static-pages?search=${page}`);
  return response.data;
};
