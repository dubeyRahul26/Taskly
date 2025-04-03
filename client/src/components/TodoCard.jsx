import { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaUndo } from "react-icons/fa";
import { Button, Input, Modal } from "antd";

const TodoCard = ({ todo, onUpdate, onDelete, onToggleComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if(!title || !description){
        toast.error("Please fill all the fields");
        return;
    }
    const updatedTodo = {...todo, title, description};
    onUpdate(todo._id , updatedTodo);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
      <div
        className={`p-6 max-w-md bg-white shadow-md rounded-lg border transition ${
          todo.isCompleted ? "border-green-500" : "border-gray-300"
        }`}
      >
        {/* Title and Completed Indicator */}
        <div className="flex justify-between items-center">
          <h3
            className={`text-lg font-semibold ${
              todo.isCompleted ? "text-green-500 line-through" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              todo.isCompleted
                ? "bg-green-200 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {todo.isCompleted ? "Completed" : "Pending"}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-2">{todo.description}</p>

        {/* Buttons: Update, Delete, Toggle Complete */}
        <div className="mt-4 flex justify-between items-center gap-2">
          {/* Update Button */}
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition"
            onClick={setIsModalOpen}
            aria-label="Edit Todo"
          >
            <FaEdit /> Edit
          </button>

          <div className="flex space-x-2">
            {/* Toggle Completion */}
            <button
              className={`flex items-center gap-2 py-2 px-3 font-medium rounded-lg transition ${
                todo.isCompleted
                  ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              onClick={() => onToggleComplete(todo._id, todo)}
              aria-label={todo.isCompleted ? "Undo Completion" : "Mark as Done"}
            >
              {todo.isCompleted ? <FaUndo /> : <FaCheck />}
              {todo.isCompleted ? "Undo" : "Done"}
            </button>

            {/* Delete Button */}
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition"
              onClick={() => onDelete(todo._id)}
              aria-label="Delete Todo"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>

      <Modal
        title={
          <h2 className="text-2xl font-bold text-blue-600 tracking-wide pb-2">
            Update Todo
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
            onChange = {(e) => setDescription(e.target.value)}
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
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoCard;
