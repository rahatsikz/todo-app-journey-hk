import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TodoForm = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const priority = form.priority.value;
    const category = form.category.value;
    const calendar = form.calendar.value;

    // console.log({ title, description, priority, category, calendar });

    const realData = {
      title,
      description,
      priority,
      category,
      calendar,
    };

    const myData = localStorage.getItem("todos");

    // Get existing data from local storage
    const existingData = JSON.parse(myData as string) || [];

    // Combine the existing data with the new data
    const combinedData = [...existingData, realData];

    // Update state and local storage with the combined data
    localStorage.setItem("todos", JSON.stringify(combinedData));

    form.reset();

    toast("Task Added Successfully", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div>
      <form className='grid gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter Title'
          name='title'
          className='input w-full text-white'
          required
        />
        <input
          type='text'
          placeholder='Description'
          className='input w-full'
          name='description'
          required
        />
        <div className='grid grid-cols-2 gap-4'>
          {/* Priority */}
          <select className='select w-full max-w-xs' name='priority'>
            <option defaultValue={"Low Priority"}>Low Priority</option>
            <option value={"Normal Priority"}>Normal Priority</option>
            <option value={"High Priority"}>High Priority</option>
          </select>
          {/* Category */}
          <select className='select w-full max-w-xs' name='category'>
            <option defaultValue={"Personal"}>Personal Category</option>
            <option value={"Work"}>Work Category</option>
          </select>
        </div>
        <div>
          <input
            type='datetime-local'
            name='calendar'
            id=''
            className='bg-[#212121] py-3 px-3 rounded w-full input '
            required
          />
        </div>
        <div>
          <button
            type='submit'
            className='btn bg-[#212121] border-none btn-block hover:bg-[#262525]'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
