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

export default async function multiGetRequest(
  apiUrlArray,
  callback,
  config = {}
) {
  const result = await Promise.allSettled(
    apiUrlArray.map((apiUrl) => axios.get(apiUrl, config))
  ).then((res) => {
    callback(res);
  });

  return result;
}
