const routes = require("express").Router();

routes.get("/jotgles", (req,res) => {
  res.status(200).send({messgae: "Jotgles fetched successfully!"})
});

exports.routes= routes;