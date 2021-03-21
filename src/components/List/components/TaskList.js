import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import TaskItem from "./TaskItem";
import { create, update as updateTask, listen } from "../../../service/tasks";
import isEmpty from "lodash/isEmpty";
import "../style.css";
import keyBy from "lodash/keyBy";

export default forwardRef(({ updateUserComplition, close }, ref) => {
  const [item, setItem] = useState();
  const [taskList, setTaskList] = useState([]);
  const [key, setKey] = useState(Date.now());
  const [showMessage, setShowMessage] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (data) => {
      setItem(data);
      // setKey(Date.now());
    },
  }));

  const handleClose = useCallback(() => {
    setItem({});
    setTaskList([]);
    setShowMessage(false);
    close();
  }, [close]);

  useEffect(() => {
    if (isEmpty(item) || !item.id) {
      return;
    }
    const unsubscribe = listen(item.id, (data) => setTaskList(data));
    return unsubscribe;
  }, [item]);

  const handleSubmit = () => {
    const input = document.getElementById("taskTitle");

    if (!input.value) {
      setShowMessage(true);
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: input.value,
      done: false,
    };

    create(item.id, newTask);
    updateUserComplition(item.id, [...taskList, newTask]);
    setKey(Date.now());
    setShowMessage(false);
  };

  const handleUpdate = (taskId) => {
    updateTask(item.id, taskId, { done: true });
    const tasksMap = keyBy(taskList, "id");
    tasksMap[taskId].done = true;
    updateUserComplition(item.id, Object.values(tasksMap));
  };

  if (isEmpty(item)) {
    return null;
  }

  return (
    <div className="taskCol">
      <span onClick={handleClose} className="close">
        &times;
      </span>
      <div key={key} style={{ textAlign: "left" }}>
        <div className="taskInpun">
          <input
            style={{ verticalAlign: "middle", width: "75%" }}
            type="text"
            id="taskTitle"
            name="taskTitle"
          />
          <button onClick={handleSubmit} className="onAddButton">
            +
          </button>
        </div>
        {showMessage && (
          <span className="validateMessage">title is requir</span>
        )}
      </div>
      <span
        style={{ fontSize: "medium" }}
      >{`To-do list for ${item.name}`}</span>
      {(taskList || []).map((task) => (
        <TaskItem markAsDone={handleUpdate} key={task.id} {...task} />
      ))}
    </div>
  );
});
