export const getBase64ImageFromURL = async (url) => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
              console.log(`Image loaded from ${url}`);
              resolve(reader.result);
          };
          reader.onerror = () => {
              reject(new Error('Failed to convert image to base64'));
          };
          reader.readAsDataURL(blob);
      });
  } catch (error) {
      console.error(`Error fetching image from URL: ${url}`, error);
      throw error;
  }
};
