import { useState } from "react";

type TodoFormType = {
  fetchData: () => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
};

export default function TodoForm({ fetchData, setError }: TodoFormType) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const handleAddTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    try {
      const response = await fetch("http://localhost:4000/todos", {
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchData();
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(`알 수 없는 에러발생: ${err}`));
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleTitleChange}
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
