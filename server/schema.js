const mongoose = require("mongoose");

// User Info
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserSchema);

// Dashboard Info
const DashboardSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "DashboardInfo",
  }
);
mongoose.model("DashboardInfo", DashboardSchema);
