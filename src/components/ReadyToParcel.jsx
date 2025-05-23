import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register Bengali Font
Font.register({
  family: "NotoSansBengali",
  src: "/Li Abu J M Akkas Unicode.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "NotoSansBengali",
    backgroundColor: "#f5f5f5",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  logo: {
    width: 120,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 8,
    padding: 0,
    marginBottom: 14,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    width: "35%",
    fontWeight: "bold",
    color: "#000",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    paddingRight: 8,
  },
  value: {
    width: "65%",
    color: "#333",
    paddingLeft: 8,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#777",
    fontWeight: "bold",
  },
});

const ReadyToParcel = ({ readyOrders }) => {
  const readyToParcels = (readyOrders || []).filter(
    (order) => order?.status === "confirmed"
  );

  const date = new Date().toLocaleDateString();

  return (
    <Document title={`Ready To Parcel-${date}`}>
      <Page size="A4" style={styles.page}>
        {/* Logo & Header */}
        <Image src="/img/logo.png" style={styles.logo} />
        <Text style={styles.header}>Total Parcel: {readyToParcels.length}</Text>

        {/* Order Cards */}
        {readyToParcels.map((order, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>{order.orderId}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Customer Name:</Text>
              <Text style={styles.value}>{order.name}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{order.address}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{order.mobile}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Product:</Text>
              <Text style={styles.value}>{order.productName}</Text>
            </View>
            <View style={[styles.cardRow, styles.lastRow]}>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.value}>{order.quantity}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.footer}>Generated by Lushoriam | {date}</Text>
      </Page>
    </Document>
  );
};

export default ReadyToParcel;
