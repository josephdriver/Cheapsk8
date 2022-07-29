import axios from "axios";

// export const getRequest = async (apiUrl) => {
//   let data;
//   await axios.get(apiUrl).then((res) => (data = res.data));
// };

export const getRequest = async (apiUrl) => {
  const configurationObject = {
    method: "get",
    url: apiUrl,
  };
  const response = await axios(configurationObject);

  return response.data;
};

export const multiGetRequest = async (apiUrlArray, config = {}) => {
  const result = await Promise.allSettled(
    apiUrlArray.map((apiUrl) => axios.get(apiUrl, config))
  );

  return result;
};
