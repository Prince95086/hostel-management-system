import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.connect("mongodb://127.0.0.1:27017/hostelDB")
  .then(() => console.log("MongoDB Connected"));

// Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

// 🔹 List of admins to add
const admins = [
  { email: "bh1@pu.com", password: "bh1@123" },
  { email: "bh2@pu.com", password: "bh2@123" },
  { email: "bh3@pu.com", password: "bh3@123" },
  { email: "bh4@pu.com", password: "bh4@123" },
  { email: "bh5@pu.com", password: "bh5@123" },
  { email: "bh6@pu.com", password: "bh6@123" },
  { email: "bh7@pu.com", password: "bh7@123" },
  { email: "bh8@pu.com", password: "bh8@123" },
  { email: "gh1@pu.com", password: "gh1@123" },
  { email: "gh2@pu.com", password: "gh2@123" },
  { email: "gh3@pu.com", password: "gh3@123" },
  { email: "gh4@pu.com", password: "gh4@123" },
  { email: "gh5@pu.com", password: "gh5@123" },
  { email: "gh6@pu.com", password: "gh6@123" },
  { email: "gh7@pu.com", password: "gh7@123" },
  { email: "gh8@pu.com", password: "gh8@123" },
  { email: "gh9@pu.com", password: "gh9@123" },
  { email: "gh10@pu.com", password: "gh10@123" },
  
];

const insertAdmins = async () => {
  try {
    for (let admin of admins) {
      const exists = await Admin.findOne({ email: admin.email });

      if (exists) {
        console.log(`⚠ ${admin.email} already exists`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(admin.password, 10);

      await Admin.create({
        email: admin.email,
        password: hashedPassword,
      });

      console.log(`✅ ${admin.email} inserted`);
    }

    console.log("🎉 All admins processed");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

insertAdmins();
