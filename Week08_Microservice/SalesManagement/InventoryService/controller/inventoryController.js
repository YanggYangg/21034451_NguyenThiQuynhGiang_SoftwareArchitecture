const Inventory = require("../model/InventorySchema");

exports.getAllInventorys = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInventory = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const existing = await Inventory.findOne({ productId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Inventory for product already exists." });
    }

    const newInventory = new Inventory({ productId, quantity });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateInventoryQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity }  = req.body;
    try{
      //tim sp trong kho
      const inventory = await Inventory.findOne({ productId });
      if(!inventory){
        return res.status(404).json({ message: "Inventory not found." });
      }
      if(inventory.quantity < quantity){
        return res.status(400).json({ message: "Not enough inventory." });
      }
      inventory.quantity -= quantity;//cap nhat sl ton kho
      await inventory.save(); 
      res.status(200).json(inventory);
    }catch(err){
        console.error("Lỗi khi cập nhật tồn kho" , err.message);
        res.status(500).json({ error: "Không thể cập nhật tồn kho." });
    }
  }

  exports.getInventoryByProductId = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const inventory = await Inventory.findOne({ productId });
      if (!inventory) {
        return res.status(404).json({ message: 'Không tìm thấy tồn kho cho sản phẩm này' });
      }
      res.status(200).json(inventory);
    } catch (err) {
      console.error("Lỗi lấy tồn kho:", err.message);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };