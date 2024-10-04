
export const getDueDateInfo = (dueDate: string): { message: string; color: string } => {
  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const timeDifference = due.getTime() - today.getTime();
  const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); 
  let message: string;
  let color: string;

  if (dayDifference < 0) {
    message = "Overdue";
    color = "red"; 
  } else if (dayDifference === 0) {
    message = "Today"; 
    color = "blue";
  } else if (dayDifference === 1) {
    message = "Due tomorrow"; 
    color = "orange";
  } else {
    message = `Due in ${dayDifference} days`; 
    color = "green";
  }

  return { message, color };
};

