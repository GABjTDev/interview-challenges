import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    api.search(query.toLowerCase()).then((res) => setProducts(res));
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span className={product.price <= 100 ? "sale" : ""}>$ {product.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando....</p>
      )}
    </main>
  );
}

export default App;
