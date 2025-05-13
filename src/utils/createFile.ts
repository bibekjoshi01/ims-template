async function fetchFileFromUrl(url: any, fileName: string) {
  if (!url) {
    console.warn('URL is required to fetch the file');
    return;
  }

  if (url instanceof File) {
    return url;
  }

  if (typeof url === 'string') {
    // If the URL is a blob URL, convert it to a File
    const response = await fetch(url, { mode: 'no-cors' });
    const blob = await response.blob();
    const fileType = blob.type || 'image/jpeg'; // Fallback type
    return new File([blob], fileName, { type: fileType });
  }
}

export default fetchFileFromUrl;
