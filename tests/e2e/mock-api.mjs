import { createServer } from "node:http";

const products = {
  items: [
    { id: 1, title: "Canvas Tote", category_name: "Bags", price_cents: 2450, in_stock: true },
    { id: 2, title: "Leather Wallet", category_name: "Accessories", price_cents: 1800, in_stock: true },
  ],
};

createServer((request, response) => {
  if (request.url !== "/api/products") {
    response.writeHead(404).end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(products));
}).listen(3101, "127.0.0.1");
