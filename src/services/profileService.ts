import api from './api';

export interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  image?: any;
}

export const getUserProfileData = async () => {
  try {
    const response = await api.get('/users/profile');
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return { success: false, error };
  }
};

export const editUserProfileData = async (data: UserProfile) => {
  try {
    const formData = new FormData();

    formData.append('name', data.name);
    // formData.append('email', data.email);
    // formData.append('phoneNumber', data.phoneNumber);
    formData.append('country', data.country);

    if (data?.image?.uri) {
      formData.append('image', {
        uri: data.image.uri,
        type: data.image.type || 'image/jpeg', // fallback MIME type
        name: data.image.fileName || `profile_${Date.now()}.jpg`,
      });
    }

    const response = await api.put('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error(
      'Failed to update profile:',
      error?.response?.data || error.message,
    );
    return { success: false, error };
  }
};
