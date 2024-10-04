import React, { useEffect, useState } from "react";

import { IModalForm } from "../interfaces/index";
import styles from "./form.module.css";

interface IToDoFormProps {
  onFormSubmit: (formData: IModalForm) => void;
  editingTask: IModalForm | null; // Prop for pre-filling data during editing
}
const initialFormData = {
  id: 0,
  title: "",
  description: "",
  dueDate: "",
};

const ToDoForm: React.FC<IToDoFormProps> = ({ onFormSubmit, editingTask }) => {
  const [formData, setFormData] = useState<IModalForm>(initialFormData);

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({
        ...initialFormData,
      });
    }
  }, [editingTask]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.dueDate.trim()
    )
      return alert("All fields are required");

    const finalFormData: IModalForm = {
      ...formData,
    };

    onFormSubmit(finalFormData); // Pass the form data back to the parent component
    setFormData(initialFormData);
  };

  return (
    <div style={{padding:'6px'}}>
      <form onSubmit={handleSubmit}>
        <div className={styles.labelContainer}>
          <label className={styles.labelInput}>
            Title <br></br>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={styles.inputField}
            />
          </label>

          <label className={styles.labelInput}>
            Description: <br></br>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={styles.inputField}
            />
          </label>

          <label className={styles.labelInput}>
            Completion Date: <br></br>
            <input
              type="date"
              name="dueDate"
              required
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={styles.inputField}

            />
          </label>
        </div>

        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
