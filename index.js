const http = require("node:http");
const qs = require("node:querystring");
const calculator = require("./calculator");
const port = 3000;

const server = http.createServer((req, res) => {
  let body = "";
  if (req.method == "POST") {
    console.log("POST");
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const post = qs.parse(body);
      const numbers = post.number;
      const result = calculator.add(numbers);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Result: " + result);
    });
  } else {
    let html = `
      <html>
        <body>
          <form method="post" action="http://localhost:3000">
            <h3>Numbers</h3>
            <input type="text" name="number" />
            <input type="submit" value="Add" />
          </form>
        </body>
      </html>
    `;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }
});

server.listen(port, () => {
  console.log(`server listening on port: http://localhost:${port}`);
});
