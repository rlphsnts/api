/* Dependencies and Modules */
const jwt = require("jsonwebtoken");
const secret = "CourseBookingAPI";

/* Token Creation */
module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
  // Token is retrieved from the request header
  // Authorization (Auth Tab) > Bearer Token

  console.log(req.headers.authorization);

  let token = req.headers.authorization;
  if (typeof token === "undefined") {
    return res.send({ auth: "Login Required" });
  } else {
    console.log(token);
    token = token.slice(7, token.length);
    console.log(token);

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        return res.send({
          auth: `Failed`,
          message: error.message,
        });
      } else {
        console.log(decodedToken);
        // Contains Data from our Token

        req.user = decodedToken;

        next();
        // Will let us proceed to the next controller
      }
    });
  }
};

// Verify if user account is admin or not
module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.send({
      auth: `Failed`,
      message: `Action Forbidden`,
    });
  }
};

/*
module.exports.verifyAdmin = (req, res, next) => {
  let token = req.headers.authorization;

  token = token.substring(7, token.length);

  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      return res.send({
        auth: "Failed",
        message: error.message,
      });
    } else {
      req.user = decodedToken;
      if (req.user.isAdmin) {
        next();
      } else {
        res.send({
          auth: "Failed",
          message: "Action Forbidden",
        });
      }
    }
  });
};
*/