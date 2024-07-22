import axios from "axios";

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

export default async function multiGetRequest(apiUrlArray, config = {}) {
  const result = await Promise.allSettled(
    apiUrlArray.map((apiUrl) => axios.get(apiUrl, config))
  ).then((res) => res);

  return result;
}

// fetch stores
export function axiosFetch(url, params) {
  const api = axios.create({
    baseURL: url,
    withCredentials: false,
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return async () => {
    api
      .get()
      .then((response) => ({ data: response.data, error: false }))
      .catch(() => ({ data: [], error: true }));
  };
}
