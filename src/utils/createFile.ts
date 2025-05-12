async function fetchFileFromUrl(url: string, fileName: string): Promise<File> {
  const response = await fetch(url, { mode: 'no-cors' });
  const blob = await response.blob();
  const fileType = blob.type || 'image/jpeg'; // Fallback type
  return new File([blob], fileName, { type: fileType });
}

export default fetchFileFromUrl;
