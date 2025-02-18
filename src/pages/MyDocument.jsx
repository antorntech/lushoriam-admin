import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const MyDocument = ({ data = {} }) => {
  const { title = "No Title", details = "No Description", banner = "" } = data;
  const imageUrl = `https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

  return (
    <Document title="My Document">
      <Page size="A4">
        <View
          style={{
            padding: "20px",
          }}
        >
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</Text>
          <Text style={{ fontSize: "16px", margin: "5px 0px" }}>{details}</Text>
          {banner ? (
            <Image src={{ uri: imageUrl }} />
          ) : (
            <Text>No Banner Available</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
