import React, { useEffect, useState, useTransition } from "react";

import { IModalForm } from "../interfaces";
import Modal from "./Modal";
import { getDueDateInfo } from "../utils/helper";
import styles from "./screen.module.css"

const ToDoBoard = () => {
  const [columns, setColumns] = useState<{ [key: string]: IModalForm[] }>({
    Open: [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        dueDate: "2024-10-03", 
      },
      {
        id: 2,
        title: "Title 2",
        description: "Description 2",
        dueDate: "2024-09-29", 
      },
      {
        id: 3,
        title: "Title 3",
        description: "Description 2",
        dueDate: "2024-10-05", 
      },
    ],
    "In Progress": [],
    Resolve: [],
    "For Review": [],
    Closed: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<IModalForm | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const alertDueDates = () => {
      Object.values(columns)
        .flat()
        .forEach((task) => {
          const { message } = getDueDateInfo(task.dueDate);
          if (message === 'Due tomorrow') {
            alert(`Task "${task.title}" is due tomorrow.`);
          }
        });
    };

    alertDueDates();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditingTask(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (task: IModalForm) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData: IModalForm) => {

    if (editingTask) {
      setColumns((prev) => {
        const updatedColumns = { ...prev };
        for (const key in updatedColumns) {
          updatedColumns[key] = updatedColumns[key].map((task) =>
            task.id === editingTask.id ? formData : task
          );
        }
        return updatedColumns;
      });
    } else {
      const newTask: IModalForm = {
        ...formData,
        id: Date.now(),
      };

      setColumns((prev) => ({
        ...prev,
        Open: [...prev.Open, newTask],
      }));
    }

    setEditingTask(null);
    setIsModalOpen(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, toColumn: string) => {
    const itemId = event.dataTransfer.getData("item");
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;
    startTransition(() => {
      setColumns((prev) => {
        const itemToMove = prev[fromColumn].find(
          (task) => task.id === Number(itemId)
        );

        if (!itemToMove) return prev;

        const fromData = prev[fromColumn].filter(
          (task) => task.id !== Number(itemId)
        );

        const toData = [...prev[toColumn], itemToMove];

        return {
          ...prev,
          [fromColumn]: fromData,
          [toColumn]: toData,
        };
      });
    });
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    item: IModalForm,
    fromColumn: string
  ) => {
    event.dataTransfer.setData("item", item.id.toString());
    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  return (
    <>
     <h2 style={{textAlign:'center'}}>ToDo - Board</h2>
   
    <div className={styles.container}>

     
      {Object.keys(columns).map((column: string) => (
        <div
          key={column}
          className={styles.column}
          onDrop={(event) => onDrop(event, column)}
          onDragOver={onDragOver}
        >
          <div className={styles.columnContainer}>
            <p className={styles.columnText}>{column}</p>
            {column === "Open" && <button onClick={handleOpenModal}>+</button>}
          </div>
          {isPending && <div>Loading...</div>}

          {columns[column].map((item: IModalForm) => {
            const { message, color } = getDueDateInfo(item.dueDate); 

            return (
              <div
                key={item.id}
                className={styles.item}
                draggable
                onDragStart={(event) => onDragStart(event, item, column)}
              >
                {" "}
                <div className={styles["status-header"]}>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </div>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>
                  {item.dueDate}
                </p>
                <div
                  className={styles.messagePara}
                >
                  <p style={{ color: color }}>{message}</p>
                  <p
                    className={styles.columnPara}
                  >
                    {column}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFormSubmit={handleFormSubmit}
        editingTask={editingTask}
      />
    </div>
    </>
  );
};

export default ToDoBoard;
