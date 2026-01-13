const Payment = require("../Models/Payment");
const Course = require("../Models/Course");
const mongoose = require("mongoose");

// Generate unique order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Create a new payment record
const createPayment = async (req, res) => {
  try {
    const { courses, amount } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide courses",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid amount",
      });
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Create payment record
    const payment = await Payment.create({
      orderId,
      user: userId,
      courses,
      amount,
      status: "Completed",
      purchaseDate: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment: {
        orderId: payment.orderId,
        amount: payment.amount,
        status: payment.status,
        purchaseDate: payment.purchaseDate,
      },
    });
  } catch (error) {
    console.log("Error in createPayment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to record payment",
      error: error.message,
    });
  }
};

// Get purchase history for a user
const getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const purchases = await Payment.find({ user: userId })
      .populate({
        path: "courses",
        select: "courseName thumbnail Price",
      })
      .sort({ purchaseDate: -1 }) // Most recent first
      .exec();

    return res.status(200).json({
      success: true,
      message: "Purchase history fetched successfully",
      purchases,
    });
  } catch (error) {
    console.log("Error in getPurchaseHistory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchase history",
      error: error.message,
    });
  }
};

// Get single payment details
const getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const payment = await Payment.findOne({ orderId, user: userId })
      .populate({
        path: "courses",
        select: "courseName thumbnail Price instructor",
        populate: {
          path: "instructor",
          select: "firstName lastName",
        },
      })
      .exec();

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment details fetched successfully",
      payment,
    });
  } catch (error) {
    console.log("Error in getPaymentDetails:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
      error: error.message,
    });
  }
};

module.exports = { createPayment, getPurchaseHistory, getPaymentDetails };