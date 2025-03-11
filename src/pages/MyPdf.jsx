import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import MyDocument from "./MyDocument";
import { useParams } from "react-router-dom";

const MyPdf = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const sampleOrder = {
    orderId: "INV-2024-001",
    name: "John Doe",
    address: "123 Street, Dhaka",
    mobile: "0123456789",
    companyLogo: "https://example.com/logo.png",
    items: [
      { productName: "Laptop", quantity: 1, price: 50000 },
      { productName: "Mouse", quantity: 2, price: 1500 },
    ],
    totalAmount: 53000,
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/sliders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);
  return (
    // <PDFViewer style={{ width: "100%", height: "100vh" }}>
    //   <MyDocument data={data} />
    // </PDFViewer>
    <PDFDownloadLink
      document={<MyDocument order={sampleOrder} />}
      fileName="Invoice.pdf"
    >
      {({ loading }) => (loading ? "Loading..." : "Download Invoice")}
    </PDFDownloadLink>
  );
};

export default MyPdf;
