const products = [
  { name: "Laptop", category: "Electronics", price: "$999" },
  { name: "Headphones", category: "Electronics", price: "$199" },
  { name: "Coffee Mug", category: "Home", price: "$15" },
  { name: "Notebook", category: "Stationery", price: "$5" },
  { name: "Running Shoes", category: "Footwear", price: "$85" }
];

const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const resultsList = document.getElementById("resultsList");
const noResults = document.getElementById("noResults");

function displayProducts(items) {
  resultsList.innerHTML = ""; 

  if (items.length === 0) {
    noResults.style.display = "block"; 
    resultsCount.textContent = "0 items found";
    return;
  }

  noResults.style.display = "none"; 
  resultsCount.textContent = `${items.length} items found`;

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "result-item";
    li.innerHTML = `
      <div>
        <p class="result-item__name">${item.name}</p>
        <span class="result-item__category">${item.category}</span>
      </div>
      <span class="result-item__price">${item.price}</span>
    `;
    resultsList.appendChild(li);
  });
}

searchInput.addEventListener("input", (e) => {
  const textTyped = e.target.value.toLowerCase().trim();

  const matchedProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(textTyped) ||
      product.category.toLowerCase().includes(textTyped)
  );

  displayProducts(matchedProducts); 
});

displayProducts(products);