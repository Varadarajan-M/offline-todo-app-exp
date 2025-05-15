type QueuedMutation = {
    url: string;
    method: 'POST' | 'PUT' | 'DELETE';
    body: any;
  };
  
  const STORAGE_KEY = 'offlineMutationQueue';
  
  export const addToQueue = (mutation: QueuedMutation) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(mutation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  };
  
  export const getQueue = (): QueuedMutation[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  };
  
  export const clearQueue = () => {
    localStorage.removeItem(STORAGE_KEY);
  };
  
  export const replayQueue = async () => {
    const queue = getQueue();
    const remaining: QueuedMutation[] = [];
  
    for (const mutation of queue) {
      try {
        const response = await fetch(mutation.url, {
          method: mutation.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mutation.body),
        });
        if (!response.ok) throw new Error('Request failed');
      } catch (err) {
        remaining.push(mutation); // keep failed ones
      }
    }
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));


    return true;
  };
  