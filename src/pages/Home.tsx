/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericButton from "../Components/GenericButton";
import TodoForm from "../Components/TodoForm";
import { useState, useEffect } from "react";
import { BiSolidDownArrowCircle } from "react-icons/bi";

const Home = () => {
  const [todocount, setTodocount] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todo")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodocount(data);
      });
  }, [todocount]);

  return (
    <section className='py-12'>
      <div className='min-h-[16vh] flex justify-center items-center'>
        {!todocount.length ? (
          <TodoForm />
        ) : (
          <GenericButton>
            <span>Add Task</span>
            <BiSolidDownArrowCircle />
          </GenericButton>
        )}
      </div>
    </section>
  );
};

export default Home;
