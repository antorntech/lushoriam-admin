// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
//   Font,
// } from "@react-pdf/renderer";

// // 🖋️ Register a Bengali-supported font
// Font.register({
//   family: "NotoSansBengali",
//   src: "/Li Abu J M Akkas Unicode.ttf",
// });

// // 🖌️ Define styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 12,
//     fontFamily: "NotoSansBengali",
//   },
//   header: {
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   section: {
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingBottom: 5,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   boldText: {
//     fontWeight: "bold",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#f2f2f2",
//     padding: 5,
//     fontWeight: "bold",
//   },
//   tableRow: {
//     flexDirection: "row",
//     padding: 5,
//   },
//   column: {
//     width: "25%",
//     textAlign: "center",
//   },
//   total: {
//     marginTop: 10,
//     fontSize: 14,
//     fontWeight: "bold",
//     textAlign: "right",
//   },
//   image: {
//     width: 80,
//     height: 80,
//     marginBottom: 10,
//   },
// });

// // 📜 MyDocument Component
// const Invoice = ({ order }) => {
//   const { orderId, name, address, mobile, items = [], totalAmount } = order;

//   return (
//     <Document title={`Invoice-${orderId}`}>
//       <Page size="A4" style={styles.page}>
//         {/* 🏢 Company Logo & Header */}
//         <Image src="/img/avatar.png" style={styles.image} />
//         <Text style={styles.header}>Invoice</Text>

//         {/* 📅 Order & Customer Details */}
//         <View style={styles.section}>
//           <View style={styles.row}>
//             <Text style={styles.boldText}>চালান (Invoice):</Text>
//             <Text>{orderId}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.boldText}>গ্রাহকের নাম:</Text>
//             <Text>{name}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.boldText}>ঠিকানা:</Text>
//             <Text>{address}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.boldText}>Mobile:</Text>
//             <Text>{mobile}</Text>
//           </View>
//         </View>

//         {/* 📦 Product Table */}
//         <View>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.column, { width: "50%" }]}>Product</Text>
//             <Text style={styles.column}>Quantity</Text>
//             <Text style={styles.column}>Price</Text>
//             <Text style={styles.column}>Total</Text>
//           </View>

//           {items.map((item, index) => (
//             <View style={styles.tableRow} key={index}>
//               <Text style={[styles.column, { width: "50%" }]}>{item.name}</Text>
//               <Text style={styles.column}>{item.quantity}</Text>
//               <Text style={styles.column}>{item.price} ৳</Text>
//               <Text style={styles.column}>{item.quantity * item.price} Tk</Text>
//             </View>
//           ))}
//         </View>

//         {/* 💰 Total Price */}
//         <Text style={styles.total}>Total Amount: {totalAmount} ৳</Text>
//       </Page>
//     </Document>
//   );
// };

// export default Invoice;

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

// ✅ Register Bengali-supported Font
Font.register({
  family: "NotoSansBengali",
  src: "/Li Abu J M Akkas Unicode.ttf",
});

// 🎨 Define Professional Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "NotoSansBengali",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
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
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    color: "white",
    padding: 6,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  columnHeader: {
    width: "25%",
    textAlign: "center",
    fontWeight: "bold",
  },
  column: {
    width: "25%",
    textAlign: "center",
  },
  totalContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#777",
  },
  logo: {
    width: 120,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
  },
});

// 📜 Professional Invoice Component
const Invoice = ({ order }) => {
  const {
    orderId,
    name,
    address,
    mobile,
    quantity,
    totalAmount,
    price,
    productName,
    delivery,
  } = order;

  return (
    <Document title={`Invoice-${orderId}`}>
      <Page size="A4" style={styles.page}>
        {/* 🏢 Company Logo & Header */}
        <Image src="/img/logo.png" style={styles.logo} />
        <Text style={styles.header}>চালান (Invoice)</Text>

        {/* 📅 Order & Customer Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.boldText}>চালান আইডি (Invoice ID):</Text>
            <Text>{orderId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>গ্রাহকের নাম (Customer Name):</Text>
            <Text>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>ঠিকানা (Address):</Text>
            <Text>{address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>মোবাইল (Mobile):</Text>
            <Text>{mobile}</Text>
          </View>
        </View>

        {/* 📦 Product Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, { width: "50%" }]}>Product</Text>
            <Text style={styles.columnHeader}>Quantity</Text>
            <Text style={styles.columnHeader}>Price</Text>
            <Text style={styles.columnHeader}>Delivery Charge</Text>
            <Text style={styles.columnHeader}>Total</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.column, { width: "50%" }]}>{productName}</Text>
            <Text style={styles.column}>{quantity}</Text>
            <Text style={styles.column}>{price} ৳</Text>
            <Text style={styles.column}>
              {delivery === "inside" ? 80 : 140} ৳
            </Text>
            <Text style={styles.column}>{totalAmount} ৳</Text>
          </View>
        </View>

        {/* 💰 Total Price */}
        <Text style={styles.totalContainer}>
          মোট মূল্য (Total Amount): {totalAmount} ৳
        </Text>
      </Page>
    </Document>
  );
};

export default Invoice;
