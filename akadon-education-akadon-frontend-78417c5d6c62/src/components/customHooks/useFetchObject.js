import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

function useFetchObject(api, payload) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState([]);

  const { t } = useTranslation(["toast"]);

  // SIDE EFFECTS
  useEffect(() => {
    fetchApi();
    return () => {
      setData();
    };
  }, [payload]);

  // FUNCTION DECLARATIONS
  async function fetchApi() {
    // Active loading
    const loadingId = uuidv4();
    setLoading((prevLoading) => [...prevLoading, loadingId]);

    const res = await api(payload);
    // Disable loading
    setLoading((prevLoading) => {
      const updateLoading = prevLoading.filter((ld) => ld !== loadingId);
      setLoading([...updateLoading]);
    });

    // Implement response
    if (res.status < 400) {
      const updatedData = res.data;
      setData(updatedData);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status} !`);
    }
  }

  return [data, loading];
}

export default useFetchObject;
