export const formatDate = (value) => {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));
};

export const isOverdue = (task) => task.status !== 'done' && new Date(task.dueDate) < new Date();

export const apiErrorMessage = (error) => {
  if (error.response) {
    // The server responded with a status code that falls out of the range of 2xx
    return error.response.data?.message || 
           error.response.data?.errors?.[0]?.message || 
           `Server Error: ${error.response.status}`;
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server. Please check if the backend is running.';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'Request failed';
  }
};
