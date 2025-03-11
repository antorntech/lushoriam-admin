// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// const MyDocument = ({ data = {} }) => {
//   const { title = "No Title", details = "No Description", banner = "" } = data;
//   const imageUrl = `https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

//   return (
//     <Document title="My Document">
//       <Page size="A4">
//         <View
//           style={{
//             padding: "20px",
//           }}
//         >
//           <Text style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</Text>
//           <Text style={{ fontSize: "16px", margin: "5px 0px" }}>{details}</Text>
//           {banner ? (
//             <Image src={{ uri: imageUrl }} />
//           ) : (
//             <Text>No Banner Available</Text>
//           )}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default MyDocument;

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// 🖌️ Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
  },
  column: {
    width: "25%",
    textAlign: "center",
  },
  total: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});

// 📜 MyDocument Component
const MyDocument = ({ order }) => {
  const {
    orderId,
    name,
    address,
    mobile,
    items = [],
    totalAmount,
    companyLogo,
  } = order;

  return (
    <Document title={`Invoice-${orderId}`}>
      <Page size="A4" style={styles.page}>
        {/* 🏢 Company Logo & Header */}
        {companyLogo && <Image src={companyLogo} style={styles.image} />}
        <Text style={styles.header}>Invoice</Text>

        {/* 📅 Order & Customer Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Invoice ID:</Text>
            <Text>{orderId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>Customer:</Text>
            <Text>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>Address:</Text>
            <Text>{address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>Mobile:</Text>
            <Text>{mobile}</Text>
          </View>
        </View>

        {/* 📦 Product Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.column, { width: "50%" }]}>Product</Text>
            <Text style={styles.column}>Quantity</Text>
            <Text style={styles.column}>Price</Text>
            <Text style={styles.column}>Total</Text>
          </View>

          {items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.column, { width: "50%" }]}>
                {item.productName}
              </Text>
              <Text style={styles.column}>{item.quantity}</Text>
              <Text style={styles.column}>{item.price} ৳</Text>
              <Text style={styles.column}>{item.quantity * item.price} ৳</Text>
            </View>
          ))}
        </View>

        {/* 💰 Total Price */}
        <Text style={styles.total}>Total Amount: {totalAmount} ৳</Text>
      </Page>
    </Document>
  );
};

export default MyDocument;
