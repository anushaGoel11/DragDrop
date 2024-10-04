import { IModalForm } from "../interfaces";
import React from "react";
import ToDoForm from "./ToDoForm";
import styles from './Modal.module.css'

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormSubmit: (formData: IModalForm) => void;
  editingTask: IModalForm | null; 
};

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, onFormSubmit, editingTask }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalStyle}>
      <div className={styles.modalContentStyle}>
        <div className={styles.modalHeader}>
        <h2 >{editingTask ? "Edit Task" : "Add Task"}</h2>
        <button onClick={onClose}>X</button>
        </div>
        
        <ToDoForm
          onFormSubmit={onFormSubmit}
          editingTask={editingTask} 
          
        />
      </div>
    </div>
  );
};


export default Modal;
