import { useState } from "react";

export default function TodoForm({ fetchData, setError }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    try {
      await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          title,
          contents,
          isCompleted: false,
          createdAt: Date.now(),
        }),
      });
      await fetchData();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
