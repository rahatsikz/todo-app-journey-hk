/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericButton from "../Components/GenericButton";
import TodoForm from "../Components/TodoForm";
import { useState, useEffect } from "react";
import { BiSolidDownArrowCircle } from "react-icons/bi";

const Home = () => {
  // const [todocount, setTodocount] = useState<any>([]);
  const [viewForm, setViewForm] = useState(false);
  const [allData, setAllData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  let [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    setAllData(storedData);
    if (storedData) {
      // If data exists in local storage, parse it to the appropriate data type
      const parsedData = JSON.parse(storedData);

      if (search.length) {
        filteredData = allData.filter((indivData: any) =>
          indivData.title.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredData(filteredData);
      }
      if (category.length) {
        if (category === "All") {
          // filteredData = allData;
          setFilteredData(allData);
        } else {
          filteredData = allData.filter(
            (indivData: any) => indivData.category === category
          );

          setFilteredData(filteredData);
        }
      }

      if (
        search.length &&
        (category === "Personal Category" || category === "Work Category")
      ) {
        filteredData = allData.filter((indivData: any) => {
          const titleMatch = indivData.title
            .toLowerCase()
            .includes(search.toLowerCase());
          const categoryMatch = indivData.category === category;

          return titleMatch && categoryMatch;
        });
        setFilteredData(filteredData);
      } else if (category === "All Category" && search.length) {
        // Show all data when the category is "All"
        filteredData = allData.filter((indivData: any) =>
          indivData.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filteredData);
      } else {
        filteredData = allData;
      }
      setAllData(parsedData);
    }
  }, [search, category]);

  const handleSearch = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();

    const search = e.currentTarget.value;
    console.log({ search });
    setSearch(search);
    // console.log(filteredData);
    setViewForm(false);
  };
  const handleCategory = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();

    const selectedCategory = e.currentTarget.value;
    console.log({ selectedCategory });
    setCategory(selectedCategory);
    // console.log(filteredData);
    setViewForm(false);
  };

  const handleTodoDone = (index: any) => {
    const updatedData = [...allData];
    updatedData[index].done = !updatedData[index].done; // Toggle the "done" status
    setAllData(updatedData);

    // Update the data in localStorage
    localStorage.setItem("todos", JSON.stringify(updatedData));
  };

  return (
    <section className='py-12'>
      <div className='grid justify-center mb-8'>
        {allData.length > 0 && (
          <div className='grid lg:flex items-center gap-4'>
            <div className='form-control'>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Search'
                  onChange={handleSearch}
                  className='input input-bordered focus:outline-none'
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
            <div>
              <select
                className='select w-full border-[#333] focus:outline-none'
                name='selectcategory'
                onChange={handleCategory}
              >
                <option defaultValue={"All"}>All Category</option>
                <option value={"Personal Category"}>Personal Category</option>
                <option value={"Work Category"}>Work Category</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div
        className={`mx-auto grid gap-6 justify-center 
        ${
          allData.length % 2 === 0 && allData.length < 3
            ? "lg:grid-cols-2 w-6/12"
            : "lg:grid-cols-3 w-9/12"
        } 
       
        `}
      >
        {(!search.length || !category.length) &&
          allData?.map((todo: any, index: any) => (
            <div
              key={index}
              className={`border grid justify-start gap-3 max-w-lg px-12 py-4 rounded ${
                filteredData.length > 1 && "hidden"
              }`}
            >
              <div className='flex items-center gap-4'>
                <div>
                  {todo.priority === "High Priority" && (
                    <input
                      type='radio'
                      checked={todo.done}
                      onChange={() => handleTodoDone(index)}
                      name='radio-4'
                      className='radio radio-accent'
                    />
                  )}
                  {todo.priority === "Low Priority" && (
                    <input
                      type='radio'
                      checked={todo.done}
                      onChange={() => handleTodoDone(index)}
                      name='radio-2'
                      className='radio radio-primary'
                    />
                  )}
                  {todo.priority === "Normal Priority" && (
                    <input
                      type='radio'
                      checked={todo.done}
                      onChange={() => handleTodoDone(index)}
                      name='radio-6'
                      className='radio radio-warning'
                    />
                  )}
                </div>
                <div className='grid gap-1'>
                  <h1>{todo.title}</h1>
                  <p>{todo.description}</p>
                </div>
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

        {(search.length > 0 || category.length > 0) &&
          filteredData?.map((todo: any, index: any) => (
            <div
              key={index}
              className='border grid justify-start gap-3 max-w-lg px-12 py-4 rounded'
            >
              <div className='flex items-center gap-4'>
                <div>
                  {todo.priority === "High Priority" && (
                    <input
                      type='radio'
                      checked={todo.done}
                      onChange={() => handleTodoDone(index)}
                      name='radio-4'
                      className='radio radio-accent'
                    />
                  )}
                  {todo.priority === "Low Priority" && (
                    <input
                      type='radio'
                      checked={todo.done}
                      onChange={() => handleTodoDone(index)}
                      name='radio-2'
                      className='radio radio-primary'
                    />
                  )}
                  {todo.priority === "Normal Priority" && (
                    <input
                      type='radio'
                      checked={todo.done}
                      onChange={() => handleTodoDone(index)}
                      name='radio-6'
                      className='radio radio-warning'
                    />
                  )}
                </div>
                <div className='grid gap-1'>
                  <h1>{todo.title}</h1>
                  <p>{todo.description}</p>
                </div>
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

        {/* {search.length > 0 &&
          category.length > 0 &&
          filteredData?.map((todo: any, index: any) => (
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
          ))} */}
      </div>

      <div className='min-h-[16vh] flex justify-center items-center'>
        {!allData.length && <TodoForm />}
        {allData.length > 0 && !viewForm && (
          <div onClick={() => setViewForm(true)}>
            <GenericButton>
              <span>Add Task</span>
              <BiSolidDownArrowCircle />
            </GenericButton>
          </div>
        )}
        {viewForm && (
          <div className='mt-6'>
            <TodoForm />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
