let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Initialize sqlite database connection
(async () => {
  db = await open({
    filename: './Backend/database.sqlite',
    driver: sqlite3.Database,
  });
  console.log("Database connected.");
})();

// function to fetch all products
async function fetchAllProducts(){
  let query = "SELECT * FROM products";
  let response = await db.all(query, []);
  return { products: response }
}

// Route to fetch all products
app.get("/products", async (req, res)=>{
  let results = await fetchAllProducts();

  res.status(200).json(results);
}); 

// function to fetch products by brand
async function fetchAllProductsByBrand(brand){
  let query = "SELECT * FROM products WHERE brand = ?";
  let response = await db.all(query, [brand]);
  return { products: response }
}

// Route to fetch products by brand
app.get("/products/brand/:brand", async (req, res)=>{
 let brand = req.params.brand;
 let results = await fetchAllProductsByBrand(brand);

 res.status(200).json(results);
});

// function to fetch products by category
async function fetchProductsByCategory(category){
  let query = "SELECT * FROM products WHERE category = ?";
  let response = await db.all(query, [category]);
  return { products: response }
}

// Route to fetch products by category
app.get("/products/category/:category", async (req, res)=>{
 let category = req.params.category;
 let results = await fetchProductsByCategory(category);

 res.status(200).json(results);
});

// function to fetch products by stock
async function fetchProductsByStock(stocks){
  let query = "SELECT * FROM products WHERE stock = ?";
  let response = await db.all(query, [stocks]);
  return { products: response };
}

// Route to fetch products by stock
app.get("/products/stock/:stocks", async (req, res)=>{
 let stocks = req.params.stocks;
 let results = await fetchProductsByStock(stocks);

 res.status(200).json(results);
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));