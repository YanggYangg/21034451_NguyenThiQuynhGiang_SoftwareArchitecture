const CircuitBreaker = require("opossum");
const axios = require("axios");

const fetchProduct = (id) => axios.get(`http://localhost:3001/api/products/${id}`);


//CLOSE -> OPEN -> HALF -> OPEN -> CLOSED
const breaker = new CircuitBreaker(fetchProduct, {
  timeout: 5000,
  errorThresholdPercentage: 50,//% bug sau do open 50%
  resetTimeout: 10000,
  maxRetries: 3,
  backoff: [500, 1000, 2000]//500ms, 1s, 2s
});

breaker.on("open", () => console.log("Circuit OPEN - Dừng gọi ProductService"));
breaker.on("halfOpen", () => console.log("Circuit HALF-OPEN - Đang thử lại..."));
breaker.on("close", () => console.log("Circuit CLOSED - Bình thường"));
breaker.on("failure", () => console.log("Thất bại: "));
breaker.on("timeout", () => console.log("Timeout khi gọi ProductService"));
breaker.on("reject", () => console.log("Request bị reject vì breaker OPEN"));
breaker.on("retry", (err, currentAttempt) => {
  console.log(`Thử lại lần thứ ${currentAttempt}: ${err.message}`);
});

module.exports = breaker;
