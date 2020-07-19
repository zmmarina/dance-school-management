const express = require ("express");
const routes = require ("./routes");
const nunjucks = require ("nunjucks");

const server = express();


server.use(routes);
server.use("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});



server.listen(5000, function(){
    console.log ("server is running");
});

