const { Router } = require("express");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("../middleware");

const userRouter = Router();

const signupBody = zod.object({
  username: zod
    .string()
    .email()
    .min(3, "username must be at least 3 character long"),
  password: zod.string().min(6, "password must be at least 6 character long"),
  firstName: zod.string().min(1, "First name is required"),
  lastName: zod.string().min(1, "Last name is required"),
});

userRouter.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body); // extracting success from the safeparse using destructuring

  if (!success) {
    return res.status(400).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already taken",
    });
  } else {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = newUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.floor(Math.random() * 10000),
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      message: "User created successfully",
      token,
    });
  }
});

const signinBody = zod.object({
  username: zod
    .string()
    .email()
    .min(3, "username must be at least 3 character long"),
  password: zod.string().min(6, "password must be at least 6 character long"),
});

userRouter.post("/signin", async function (req, res) {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if(!existingUser){
    return res.status(401).json({
      message: "User not found"
    })
  } else if (existingUser) {
    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.json({
      message: "User doesnot exist",
    });
  }
});

userRouter.delete("/logout", authMiddleware, async function (req, res) {
  try {
    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
    }

    User.deleteOne({
      user,
    });
    
  } catch (error) {
    res.status(403).json({
      error: error.message,
      message: "Somehthing went wrong"
    })
  }
});

const UpdateSignupBody = zod.object({
  password: zod.string().min(6, "password must be at least 6 character long"),
  firstName: zod.string().min(1, "First name is required"),
  lastName: zod.string().min(1, "Last name is required"),
});

userRouter.put("/update", authMiddleware, async function (req, res) {
  const { success } = UpdateSignupBody.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "Invalid Inputs",
    });
  }

  try {
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
    );

    return res.json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
});

userRouter.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      _id: { $ne: req.userId },
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
});

userRouter.get("/me", authMiddleware, async function (req, res) {
  try {
    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "An error occurred while fetching the user",
    });
  }
});

module.exports = {
  userRouter,
};
