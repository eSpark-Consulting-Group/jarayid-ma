export const extractYoutubeId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);

    // Handle `watch?v=xyz`
    if (
      parsedUrl.hostname.includes('youtube.com') &&
      parsedUrl.pathname === '/watch'
    ) {
      return parsedUrl.searchParams.get('v');
    }

    // Handle `/embed/{id}` or `/shorts/{id}`
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    if (['embed', 'shorts'].includes(pathSegments[0]) && pathSegments[1]) {
      return pathSegments[1];
    }

    // Handle `youtu.be/{id}`
    if (parsedUrl.hostname === 'youtu.be' && pathSegments[0]) {
      return pathSegments[0];
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const extractFields = (text: string) => {
  const titleMatch = text.match(/Title:\s*(.*?)\s*-/);
  const descriptionMatch = text.match(/Description:\s*(.*?)\s*Content:/);

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descriptionMatch ? descriptionMatch[1].trim() : '',
  };
};

export const extractArabicFields = (text: string) => {
  const titleMatch = text.match(/عنوان:\s*(.*?)\s*وصف:/);
  const descriptionMatch = text.match(/وصف:\s*(.*?)\s*المحتوى:/);

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descriptionMatch ? descriptionMatch[1].trim() : '',
  };
};

export const timeWithAmPm = (isoTime: string) => {
  // const isoTime = '2025-07-31T19:46:33.000Z';
  const date = new Date(isoTime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const timeAgo = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};

export const getInitials = (fullName: string): string => {
  if (!fullName) return '';

  const words = fullName.trim().split(' ');
  const initials = words.slice(0, 2).map(word => word[0].toUpperCase());

  return initials.join('');
};
