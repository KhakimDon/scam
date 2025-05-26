export const useValidImage = () => {
  const isValidImageUrl = (
    url: string,
    defaultImage: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(defaultImage);
      img.src = url;
    });
  };

  return {
    isValidImageUrl,
  };
};
