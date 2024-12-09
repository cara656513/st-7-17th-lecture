import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../types/todo.type";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<null | Todo>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/todos/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
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

    fetchDetail();
  }, [id]);

  if (isLoading) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {data!.title}</p>
      <p>내용: {data!.contents}</p>
      <p>작성일자: {new Date(data!.createdAt).toDateString()}</p>
    </div>
  );
}
