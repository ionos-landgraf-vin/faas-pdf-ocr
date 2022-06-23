const lambda_handler = require("./../../index.js");

(function () {
  lambda_handler().then(
    (...args) => console.log("success: ", args),
    (...args) => console.err("error: ", args),
  );
})();
