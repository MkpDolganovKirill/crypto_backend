const jwt = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  if (!req.headers.accesstoken) {
    return res.status(400).send({ message: "Error! Check params!" });
  }
  const { accesstoken } = req.headers;
  try {
    const userInfo = jwt.verify(accesstoken, process.env.SECRET);
    req.user = userInfo;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Internal Error!" });
  }
};

module.exports = { isAuthenticate };
