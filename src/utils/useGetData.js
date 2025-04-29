import { useEffect, useState } from "react";

const mainURL = "https://lushoriam-server-abnd.vercel.app/api/v1/";
// const mainURL = "http://localhost:8000/api/v1/";

const useGetData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(mainURL + url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};

export default useGetData;
