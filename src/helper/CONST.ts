// BASE_URL Constant
export const BASE_URL = "https://api.eshaafi.com";
export const headers = () => {
  const storedValue: any | null = localStorage.getItem("user");
  const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
  return {
    "Content-Type": "application/json",
    Authorization: uuid?.IdToken,
  };
};
