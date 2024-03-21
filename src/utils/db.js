const mongoose = require("mongoose");
require('dotenv').config()

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL, {
    autoIndex: true,
    dbName: "portfolio"
  });

  console.log("Berhasil terhubung");
}
