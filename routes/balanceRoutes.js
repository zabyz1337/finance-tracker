import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Создать пользователя с начальным балансом
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

export default router;