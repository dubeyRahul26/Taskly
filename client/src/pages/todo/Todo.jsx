import React, { useEffect, useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import TodoCard from "../../components/TodoCard";
import { Button, Input, Modal } from "antd";

const Todo = () => {
  const { todos, updateTodo, deleteTodo, addTodo } = useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const onUpdate = (id, data) => {
    updateTodo(id, data);
  };
  const onDelete = (id) => {
    deleteTodo(id);
  };
  const onToggleComplete = async (id, todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    await updateTodo(id, updatedTodo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (!title || !description) {
      toast.error("Please fill all the fields");
      return;
    }
    const newTodo = { title, description };
    await addTodo(newTodo);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {

    const value = e.target.value;
    setSearchText(value);
    if (value === "") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter((todo) => todo.title.toLowerCase().includes(value.toLowerCase())));
    }

  }
  useEffect(() => {
    console.log("Todos updated", todos);
  
    // Preserve search filter when todos update
    setFilteredTodos(
      searchText
        ? todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : todos
    );
  
    console.log("Updated filtered todos", filteredTodos);
  }, [todos, searchText]); // ✅ Include searchText as dependency
  


  return (
    <div className="mt-18 flex flex-col items-center bg-gradient-to-br from-[#E0F2FF] via-[#80C7F2] to-[#3171A6] p-4">
      <div className="flex w-11/12 flex-col md:flex-row items-center justify-between px-6 md:px-10 pt-2 md:pt-6 pb-4 md:pb-5 bg-white shadow-md rounded-md gap-4">
        <h2 className="text-2xl text-blue-400 font-bold text-center md:text-left shadow-[2px_2px_0px_rgba(0,0,0,0.3), 4px_4px_0px_rgba(0,0,0,0.2)]">
          Task Dashboard
        </h2>

        <input
          type="text"
          placeholder="Search Your Tasks Here..."
          className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
          value={searchText}
          onChange={handleSearch}
        />

        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition w-full md:w-auto"
          onClick={showModal}
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center p-4">
        {filteredTodos.map((todo, idx) => (
          <TodoCard
            key={idx}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>

      <Modal
        title={
          <h2 className="text-2xl font-bold text-blue-600 tracking-wide pb-2">
            Add Task
          </h2>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null} // Custom footer
        className="rounded-lg"
      >
        <div className="flex flex-col gap-5">
          {/* Title Input */}
          <Input
            placeholder="Title"
            className="rounded-lg p-3 border border-gray-300  focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md transition-all duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description Input */}
          <Input.TextArea
            placeholder="Description"
            autoSize={{ minRows: 3, maxRows: 6 }}
            className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md transition-all duration-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleOk}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
