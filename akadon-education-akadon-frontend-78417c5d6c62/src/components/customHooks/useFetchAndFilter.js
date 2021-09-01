import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
function useFetchAndFilter(
  api,
  payload,
  filterPayload,
  pageNo,
  setLoading,
  conditions
) {
  // INIT LOCAL STATE
  const [data, setData] = useState();
  // SIDE EFFECTS
  useEffect(() => {
    if (conditions) {
      fetchApi();
    }
  }, [pageNo, filterPayload]);

  // FUNCTION DECLARATIONS
  async function fetchApi() {
    const loadingId = uuidv4();
    setLoading((prevLoading) => [...prevLoading, loadingId]);
    const res = await api({ ...payload, ...filterPayload }, pageNo);
    setLoading((prevLoading) => {
      const updateLoading = prevLoading.filter((ld) => ld !== loadingId);
      setLoading([...updateLoading]);
    });

    if (res.status < 400) {
      const { count, next, previous, results } = res.data;
      setData({ count, next, previous, results });
    } else if (res.response) {
      toast.error(`Error ${res.response.status} !`);
    }
  }

  return data;
}

useFetchAndFilter.propTypes = {
  api: PropTypes.func,
  payload: PropTypes.object,
  filterPayload: PropTypes.object,
  pageNo: PropTypes.number,
  setLoading: PropTypes.func,
};

export default useFetchAndFilter;
