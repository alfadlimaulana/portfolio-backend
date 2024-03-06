const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://alfadlims:270802@portfoliocluster.svmbp3t.mongodb.net/?retryWrites=true&w=majority", {
    autoIndex: true,
    dbName: "portfolio"
  });

  console.log("Berhasil terhubung");
}
