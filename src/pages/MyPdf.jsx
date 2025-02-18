import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import MyDocument from "./MyDocument";
import { useParams } from "react-router-dom";

const MyPdf = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/sliders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <MyDocument data={data} />
    </PDFViewer>
  );
};

export default MyPdf;
