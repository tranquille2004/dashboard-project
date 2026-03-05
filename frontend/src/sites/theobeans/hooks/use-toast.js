import { useState, useCallback } from 'react';

// Simple toast implementation for Theo Beans
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = "default" }) => {
    const id = Date.now();
    
    // Add toast
    setToasts(prev => [...prev, { id, title, description, variant }]);
    
    // Show browser notification style alert
    const message = description ? `${title}\n${description}` : title;
    
    if (variant === "destructive") {
      console.error(message);
      alert(message);
    } else {
      console.log(message);
      alert(message);
    }
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return { toast, toasts };
}

export default useToast;
