export const truncateText = (text: string, maxLength: number = 50): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getCopyMessage = (fieldName: string, value: string): string => {
  const messages = {
    from: `From: ${value}`,
    to: `To: ${value}`,
    amount: `Amount: ${value}`,
  };
  return messages[fieldName as keyof typeof messages] || value;
};
