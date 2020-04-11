require("dotenv/config");

const App = require("./App");

App.listen(process.env.APP_PORT, () => {
  console.log(` server started on port ${process.env.APP_PORT}`);
});
