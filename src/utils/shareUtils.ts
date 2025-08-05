import Share from 'react-native-share';
export const openShareMenu = async (options: {
  title?: string;
  message?: string;
  url?: string;
}) => {
  try {
    await Share.open({
        title: options.title || 'Share',
        message: options.message || '',
        url: options.url || '',
        showAppsToView: true,
    });
  } catch (error) {
    console.log('Share error:', error);
  }
};

