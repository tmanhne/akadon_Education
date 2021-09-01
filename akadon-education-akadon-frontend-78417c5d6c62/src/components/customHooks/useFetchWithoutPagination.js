import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

function useFetchWithoutPagination(api, payload, dataType) {
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
    setLoading(true);

    const res = await api(payload);
    // Disable loading
    setLoading(false);

    // Implement response
    if (res.status < 400) {
      if (dataType === "object") {
        const updatedData = res.data;
        setData({...updatedData});
      }
      if (dataType === "array") {
        const {results} = res.data;
        setData([...results]);
      }
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status} !`);
    }
  }

  return [data, loading];
}

export default useFetchWithoutPagination;
