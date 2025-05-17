export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: any;
  const debounced = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}
