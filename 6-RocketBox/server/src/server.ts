import "dotenv/config";

import app from "./app";

const serverPort = process.env.PORT || 3333;

app.listen(serverPort, () => {
  console.log("Server started on port 3333 🚀");
});
