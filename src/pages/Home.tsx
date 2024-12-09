import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { type TodoWithIsDone, type Todo } from "../types/todo.type";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<TodoWithIsDone[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:4000/todos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Todo[] = await response.json();
      const todosWithIsDone = data.map((todo) => ({ ...todo, isDone: false }));
      setData(todosWithIsDone);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(`알 수 없는 에러 발생: ${err}`));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm fetchData={fetchData} setError={setError} />
      <TodoList todos={data} setTodos={setData} />
    </>
  );
}
