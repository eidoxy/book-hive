export const response = (status: number, body: any) => {
  return {
    status,
    body: JSON.stringify(body),
  };
};
