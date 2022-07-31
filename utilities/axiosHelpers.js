import axios from "axios";

export const getRequest = async (apiUrl) => {
  const configurationObject = {
    method: "get",
    url: apiUrl,
  };
  const response = await axios(configurationObject);

  return response.data;
};

Promise.allSettled =
  Promise.allSettled ||
  ((promises) =>
    Promise.all(
      promises.map((p) =>
        p
          .then((value) => ({
            status: "fulfilled",
            value,
          }))
          .catch((reason) => ({
            status: "rejected",
            reason,
          }))
      )
    ));

export async function multiGetRequest(apiUrlArray, callback, config = {}) {
  const result = await Promise.allSettled(
    apiUrlArray.map((apiUrl) => axios.get(apiUrl, config))
  ).then((res) => {
    callback(res);
  });

  return result;
}
