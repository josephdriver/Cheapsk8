import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { get } from "lodash";
import qs from "qs";

const useAxiosFetch = (
  url,
  timeout,
  refetch = false,
  loadOnMount = true,
  searchParams = false,
  dataDefault = null
) => {
  const [data, setData] = useState(dataDefault);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(loadOnMount);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    let unmounted = false;
    const source = Axios.CancelToken.source();

    if ((!initialLoadDone.current && loadOnMount) || refetch) {
      setLoading(true);
      const options = {
        cancelToken: source.token,
        timeout,
      };

      if (searchParams) {
        options.params = searchParams;
      }

      Axios.get(url, {
        ...options,
        paramsSerializer: (params) => qs.stringify(params, { encode: false }),
      })
        .then((a) => {
          initialLoadDone.current = true;
          if (!unmounted) {
            setData(a.data);
            setLoading(false);
          }
        })
        .catch((e) => {
          initialLoadDone.current = true;
          if (!unmounted) {
            setLoading(false);
            if (!Axios.isCancel(e)) {
              setError(true);
              setErrorMessage(get(e, "response.data.message", e.message));
            }
          }
        });
    }

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [timeout, url, refetch, loadOnMount, searchParams]);

  return { data, loading, error, errorMessage };
};

export default useAxiosFetch;
