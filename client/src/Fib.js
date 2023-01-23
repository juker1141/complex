import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexs, setSeenIndexs] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  async function fetchValues() {
    try {
      const values = await axios.get("/api/values/current");
      setValues(values.data);
    } catch (err) {}
  }

  async function fetchIndexs() {
    const seenIndexs = await axios.get("/api/values/all");
    setSeenIndexs(seenIndexs.data);
  }

  useEffect(() => {
    fetchValues();
    fetchIndexs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  }

  function renderSeenIndexs() {
    return seenIndexs.map(({ number }) => number).join(", ");
  }

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter your index:</label>
        <input
          type="text"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexs I have seen:</h3>
      {renderSeenIndexs()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
