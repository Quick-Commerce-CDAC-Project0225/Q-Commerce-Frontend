
// import React, { useState, useEffect } from 'react';
// import { Table } from 'react-bootstrap';
// import { fetchAllOrders } from '../../api/orderTempApi';

// export default function ManageOrder() {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null); // 🔄 Toggle view

//   useEffect(() => {
//     fetchAllOrders()
//       .then(data => {
//         console.log("Fetched orders:", data);
//         setOrders(data);
//       })
//       .catch(error => {
//         console.error("Error fetching orders:", error);
//         alert("Failed to fetch orders from server.");
//       });
//   }, []);

//   const toggleDetails = (orderId) => {
//     setExpandedOrderId(prev => (prev === orderId ? null : orderId));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Manage Orders</h2>

//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>ORDER ID</th>
//             <th>Address</th>
//             <th>Items</th>
//             <th>Total Amount</th>
//             <th>Status</th>
//             <th>Created</th>
//             <th>Updated</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <React.Fragment key={order.orderId}>
//               <tr onClick={() => toggleDetails(order.orderId)} style={{ cursor: 'pointer' }}>
//                 <td>{order.orderId}</td>
//                 <td>{order.address}</td>
//                 <td>{order.items?.length}</td>
//                 <td>₹{order.totalPrice.toFixed(2)}</td>
//                 <td>{order.status}</td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
//               </tr>

//               {expandedOrderId === order.orderId && (
//                 <tr>
//                   <td colSpan="7">
//                     <strong>Items:</strong>
//                     <Table striped bordered size="sm" className="mt-2">
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Product Name</th>
//                           <th>Price</th>
//                           <th>Quantity</th>
//                           <th>Total</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {order.items?.map((item, index) => (
//                           <tr key={item.orderItemId}>
//                             <td>{index + 1}</td>
//                             <td>{item.product?.name}</td>
//                             <td>₹{item.product?.price.toFixed(2)}</td>
//                             <td>{item.quantity}</td>
//                             <td>₹{item.price.toFixed(2)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { fetchAllOrders, updateOrderStatus } from '../../api/orderTempApi';

const STATUS_OPTIONS = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loadingStatusId, setLoadingStatusId] = useState(null);

  useEffect(() => {
    fetchAllOrders()
      .then(data => setOrders(data))
      .catch(error => {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders from server.");
      });
  }, []);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoadingStatusId(orderId);
      await updateOrderStatus(orderId, newStatus);

      // Update state locally
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status.");
    } finally {
      setLoadingStatusId(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Orders</h2>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ORDER ID</th>
            <th>Address</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order.orderId}>
              <tr onClick={() => toggleDetails(order.orderId)} style={{ cursor: 'pointer' }}>
                <td>{order.orderId}</td>
                <td>{order.address}</td>
                <td>{order.items?.length}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>
                  {loadingStatusId === order.orderId ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <select
                      value={order.status}
                      onClick={e => e.stopPropagation()}
                      onChange={e => handleStatusChange(order.orderId, e.target.value)}
                      className="form-select"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  )}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
              </tr>

              {expandedOrderId === order.orderId && (
                <tr>
                  <td colSpan="7">
                    <strong>Items:</strong>
                    <Table striped bordered size="sm" className="mt-2">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item, index) => (
                          <tr key={item.orderItemId}>
                            <td>{index + 1}</td>
                            <td>{item.product?.name}</td>
                            <td>{item.product?.description}</td>
                            <td>₹{item.product?.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
