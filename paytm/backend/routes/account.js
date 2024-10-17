const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async function(req, res){
  const newAcc = await Account.findOne({
    userId: req.userId,
  })
  
  res.json({
    balance: newAcc.balance
  })
});

accountRouter.post("/transfer", authMiddleware, async function (req, res) {
  const { amount, to } = req.body;

  // Check for a valid amount
  if (amount <= 0) {
    return res.status(400).json({
      message: "Transfer amount must be greater than zero",
    });
  }

  try {
    // Find the sender's account
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({
        message: "Sender account not found",
      });
    }

    // Check for sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // Find the recipient's account
    const toAccount = await Account.findOne({
      userId: to,
    });

    if (!toAccount) {
      return res.status(404).json({
        message: "Receiver account not found",
      });
    }

    // Update the sender's account balance
    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    );

    // Update the receiver's account balance
    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    );

    // Respond with success
    return res.json({
      message: "Transfer successful",
      amount: amount,
      from: req.userId,
      to: to,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during the transfer",
      error: error.message,
    });
  }
});

module.exports = {
  accountRouter,
}
