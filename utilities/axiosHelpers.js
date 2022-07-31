import axios from "axios";
import { useDispatch } from "react-redux";

function returnData(data) {
  return data;
}

const dispatch = useDispatch();
export async function fetch(url, action = null) {
  const response = await axios.get(url).then((res) => console.log(res));
  console.log(response.data, "with await");
}

export const getRequest = async (apiUrl) => {
  const configurationObject = {
    method: "get",
    url: apiUrl,
  };

  await Promise.all(
    await axios(configurationObject).then((res) => returnData(res))
  );
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
