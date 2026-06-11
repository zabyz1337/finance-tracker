import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/init-balance", async (req, res) => {
  try {
    const { amount } = req.body;

    if (typeof amount !== "number" || amount < 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const user = await User.create({
      currentBalance: amount,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/add-balance", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.currentBalance += amount;

    user.transactions.push({
      type: "income",
      amount,
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-expense", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.currentBalance < amount) {
      return res.status(400).json({ message: "Not enough money" });
    }

    user.currentBalance -= amount;

    user.transactions.push({
      type: "expense",
      amount,
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/balance", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      currentBalance: user.currentBalance,
      transactions: user.transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;