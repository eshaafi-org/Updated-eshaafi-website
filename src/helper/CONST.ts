// BASE_URL Constant
export const BASE_URL = "https://api.eshaafi.com";
export const CALLBACK_URL = "https://beta.eshaafi.com/payment-order/";
export const headers = () => {
  const storedValue: any | null = localStorage.getItem("user");
  const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
  return {
    "Content-Type": "application/json",
    Authorization: uuid?.IdToken,
  };
};
export const imgheaders = () => {
  const storedValue: any | null = localStorage.getItem("user");
  const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
  return {
    "Content-Type": "image/jpeg",
    Authorization: uuid?.IdToken,
  };
};
