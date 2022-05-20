import type {Item} from "./types";

import {useEffect, useState, useRef} from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[] | null | undefined>(null);

  const inputRef: any = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    api.list().then(setItems);

    inputRef.current.focus();
  }, []);

  const handleDelete = (id: Number) => {
    let newItems: Item[] | null | undefined = items?.filter((item: Item) => item.id !== id);

    setItems(newItems);
  };

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input ref={inputRef} name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.id} className={item.completed ? styles.completed : ""}>
              {item.text} <button onClick={() => handleDelete(item.id)}>[X]</button>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
