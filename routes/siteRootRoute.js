//splash page for backend
//https://github.com/gitdagray/mern_stack_course/blob/main/lesson_04/routes/root.js

const express = require("express");
const router = express.Router();
const path = require("path");
const expressListEndpoints = require("express-list-endpoints");
const json2html = require("node-json2html");
const fs = require("fs");

router.get("/", (req, res) => {
  const endpoints = expressListEndpoints(req.app);

  // https://stackoverflow.com/questions/50030338/combine-filter-and-startswith-to-filter-array
  const apiEndpoints = endpoints.filter((endpoint) =>
    endpoint.path.startsWith("/api/")
  );
  console.log("endpoints from siteroute", endpoints);
  console.log("filtered endpoints from siteroute", apiEndpoints);

  let template_table_header = {
    "<>": "tr",
    html: [
      { "<>": "th", html: "Method(s)" },
      { "<>": "th", html: "Path" },
      { "<>": "th", html: "Middleware(s)" },
    ],
  };

  json2html.component.add("pathUrl", {
    "<>": "a",
    href: "${path}",
    text: "${path}",
  });
  let template_table_body = {
    "<>": "tr",
    html: [
      { "<>": "td", html: "${methods}" },
      { "<>": "td", html: [{ "[]": "pathUrl" }] },
      { "<>": "td", html: "${middlewares}" },
    ],
  };

  let table_header = json2html.render(apiEndpoints[0], template_table_header);

  let table_body = json2html.render(apiEndpoints, template_table_body);

  let endpointTable =
    "<table>\n<thead>" +
    table_header +
    "\n</thead>\n<tbody>\n" +
    table_body +
    "\n</tbody>\n</table>";

  /* 
    based on simple template method from:
    Jonas Schmedtman
    Udemy 
    The Complete JavaScript Course: Version 1 (2020)
    project: 99-bonus-1
  */
  fs.readFile(
    path.resolve(__dirname, `../views/template-index.html`),
    "utf-8",
    (err, data) => {
      let indexOutput = data;

      indexOutput = indexOutput.replace("{%TOC%}", endpointTable);

      res.send(indexOutput);
    }
  );
});

module.exports = router;
