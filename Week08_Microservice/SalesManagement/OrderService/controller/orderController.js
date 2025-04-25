const axios = require("axios");
const Order = require("../model/orderSchema");
const breaker = require("../middlewares/circuitBreaker"); // Import circuit breaker

exports.createOrder = async (req, res) => {
  const { customerId, products } = req.body;

  try {
    //check customer
    const customerResponse = await axios.get(`http://localhost:3000/api/customers/${customerId}`);
    if (!customerResponse.data) {
      return res.status(404).json({ error: "Customer không tồn tại." });
    }
    //check product
    for (const item of products) {
      const response = await axios.get(`http://localhost:3001/api/products/${item.productId}`);
      if (!response.data) {
        return res.status(400).json({ error: `Product với ID ${item.productId} không tồn tại.` });
      }
      

      //check inventory
      const inventoryResponse = await axios.get(`http://localhost:3003/api/inventorys/getInventoryByProductId/${item.productId}`);
      if (!inventoryResponse.data || inventoryResponse.data.quantity < item.quantity) {
        return res.status(400).json({ error: `Không đủ số lượng tồn kho cho sản phẩm với ID ${item.productId}.` });
      }
      //tru sl ton kho
      const newQuantity = inventoryResponse.data.quantity - item.quantity;
      await axios.put(`http://localhost:3003/api/inventorys/updateInventory/${item.productId}`, { quantity: item.quantity });
    
      //update lai stock
      const isInStock = newQuantity > 0;
      await axios.put(`http://localhost:3001/api/products/updatedProduct/${item.productId}`, { inStock: isInStock });
    
    
    }

    const order = await Order.create({ customerId, products });
    res.status(201).json(order);
  } catch (err) {
    console.error("Lỗi kiểm tra sản phẩm:", err.message);
    console.error("Chi tiết lỗi:", err.response?.data || err);
    res.status(500).json({
      error: "Không thể xác minh productId, customerId từ Product Service, Customer Service.",
      detail: err.message
    });
  }
};


// exports.createOrder = async (req, res) => {
//   const { customerId, products } = req.body;

//   try {
//     for (const item of products) {
//       try {
//         const response = await breaker.fire(item.productId);
//         if (!response.data) {
//           return res.status(400).json({ error: `Product với ID ${item.productId} không tồn tại.` });
//         }
//       } catch (err) {
//         console.error("Circuit breaker error:", err.message);
//         return res.status(500).json({
//           error: "Không thể kết nối tới ProductService. Circuit breaker đang OPEN hoặc ProductService lỗi."
//         });
//       }
//     }

//     const order = await Order.create({ customerId, products });
//     res.status(201).json(order);

//   } catch (err) {
//     console.error("Lỗi:", err.message);
//     res.status(500).json({ error: "Đã xảy ra lỗi khi tạo order." });
//   }
// };

