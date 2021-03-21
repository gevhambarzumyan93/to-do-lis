import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import "./style.css";
import { query, update as updateUser } from "../../service/users";
import keyBy from "lodash/keyBy";

export default () => {
  const userModalRef = useRef();
  const userTasksRef = useRef();
  const [activeKey, setActveKey] = useState();
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(Date.now());
  const [tasksListOpen, setTasksListOpen] = useState(false);

  useEffect(() => {
    query().then(setList);
  }, [index]);

  const createUser = () => {
    userModalRef.current.open();
  };

  const showTasks = (data) => {
    setTasksListOpen(true);
    setActveKey(data.id);
    userTasksRef.current.open(data);
  };

  const handleRefresh = useCallback(() => {
    setIndex(Date.now());
  }, []);

  const handleUpdate = (userId, taskList) => {
    const completion = taskList.reduce((acc, item) => {
      if (!item.done) {
        return acc;
      }
      acc = acc + 1;
      return acc;
    }, 0);
    const completionRate = Math.round((completion / taskList.length) * 100);
    updateUser(userId, {
      completion: completionRate,
    });
    const userListMap = keyBy(list, "id");
    userListMap[userId].completion = completionRate;
    setList(Object.values(userListMap));
  };

  return (
    <div className="row">
      <div className={!tasksListOpen ? "infoColFull" : "infoColClose"}>
        <table cellSpacing="0" className="table">
          <tbody>
            <Header onAdd={createUser} />
          </tbody>
          <tbody>
            {(list || []).map((item, index) => (
              <ListItem
                active={item.id === activeKey}
                handleOpent={showTasks}
                key={index}
                data={item}
              />
            ))}
          </tbody>
        </table>
      </div>
      <TaskList
        handleRefresh={handleRefresh}
        close={() => {
          setTasksListOpen(false);
          setActveKey("");
        }}
        ref={userTasksRef}
        updateUserComplition={handleUpdate}
      />
      <Modal handleRefresh={handleRefresh} ref={userModalRef} />
    </div>
  );
};
