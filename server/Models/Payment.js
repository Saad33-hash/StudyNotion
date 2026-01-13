const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    default: "Completed",
  },
  paymentMethod: {
    type: String,
    default: "Card",
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);

module.exports = PaymentModel;