import apiClient from '../utils/api'; // Import your Axios instance

// Function to upload multiple files
export const uploadMultipleFiles = async (files: File[]) => {
  const formData = new FormData();
  
  // Append each file to the FormData object
  files.forEach(file => {
    formData.append('files', file); // Adjust the key based on your API requirements
  });

  try {
    const response = await apiClient.post('/upload/multiple-files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type
      },
    });
    
    return response.data; // Return the response data
  } catch (error) {
    console.error('File upload failed:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
