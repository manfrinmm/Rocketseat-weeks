require("dotenv/config");

const App = require("./App");

App.listen(process.env.APP_PORT, process.env.APP_HOST);
