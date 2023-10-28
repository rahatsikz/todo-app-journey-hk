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
      <div className='grid justify-center mb-8'>
        {todocount.length && (
          <div className='form-control'>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Search'
                className='input input-bordered'
              />
              <button className='btn bg-[#171717] btn-square'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='grid gap-4 justify-center'>
        {todocount.map((todo: any, index: any) => (
          <div
            key={index}
            className='border grid justify-start gap-3 max-w-lg px-12 py-4 rounded'
          >
            <div className='flex items-center gap-4'>
              <div>
                {todo.priority === "High Priority" && (
                  <input
                    type='radio'
                    name='radio-4'
                    className='radio radio-accent'
                  />
                )}
                {todo.priority === "Low Priority" && (
                  <input
                    type='radio'
                    name='radio-2'
                    className='radio radio-primary'
                  />
                )}
                {todo.priority === "Normal Priority" && (
                  <input
                    type='radio'
                    name='radio-6'
                    className='radio radio-warning'
                  />
                )}
              </div>
              <div className='grid gap-1'>
                <h1>{todo.title}</h1>
                <p>{todo.description}</p>
              </div>
              {/* <p>{todo.priority}</p> */}
              {/* <p>{todo.category}</p> */}
              {/* <p>{todo.calendar}</p> */}
            </div>
            <div className='flex items-center gap-2'>
              <div className='bg-primary h-2 w-2 rounded-full ml-10'> </div>
              <p> {todo.category} </p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='bg-primary h-2 w-2 rounded-full ml-10'> </div>
              <p> {todo.calendar.slice(0, -6)} </p>
            </div>
          </div>
        ))}
      </div>

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
