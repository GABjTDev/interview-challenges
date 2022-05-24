import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  useEffect(() => {
    const sessionQuery = window.sessionStorage.getItem("query");

    if (sessionQuery) {
      setQuery(sessionQuery);
      api.search(sessionQuery.toLocaleLowerCase()).then(setProducts);
    } else {
      api.search(query.toLocaleLowerCase()).then(setProducts);
    }
  }, [query]);

  useEffect(() => {
    setProducts([]);
    const sessionOrder = window.sessionStorage.getItem("order");

    if (sessionOrder) {
      setOrder(sessionOrder);
      api.filter(sessionOrder).then(setProducts);
    } else {
      api.filter(order).then(setProducts);
    }
  }, [order]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={(e) => {
          window.sessionStorage.setItem("query", e.target.value);
          setQuery(e.target.value);
        }}
      />
      <label htmlFor="orderBy">Order by:</label>
      <select
        id="orderBy"
        name="orderBy"
        value={order}
        onChange={(e) => {
          window.sessionStorage.setItem("order", e.target.value);
          setOrder(e.target.value);
        }}
      >
        <option value="">---</option>
        <option value="alfa">Alfabéticamente</option>
        <option value="precio">Precio</option>
      </select>
      <ul>
        {products.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          products.map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {Math.floor(product.price * 100).toLocaleString("es-AR")}</span>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;
