import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

export default function useFetch(
  api,
  setLoading,
  isPagination,
  payload,
  pageNo,
  filterFlag
) {
  // INIT LOCAL STATE
  const [data, setData] = useState();
  const { t } = useTranslation("toast");

  // SIDE EFFECTS
  useEffect(() => {
    fetchApi();
  }, [pageNo, filterFlag]);

  // FUNCTION DECLARATIONS
  async function fetchApi() {
    // Active loading
    const loadingId = uuidv4();
    setLoading((prevLoading) => [...prevLoading, loadingId]);

    const res = await api(payload, pageNo);
    // Disable loading
    setLoading((prevLoading) => {
      const updateLoading = prevLoading.filter((ld) => ld !== loadingId);
      setLoading([...updateLoading]);
    });

    // Implement response
    if (res.status < 400) {
      let updatedData;

      if (isPagination) {
        const { count, next, previous, results } = res.data;
        updatedData = { count, next, previous, results };
      } else {
        updatedData = res.data;
      }

      setData(updatedData);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status} !`);
    }
  }

  return data;
}
