const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true
    },
    quantity: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
