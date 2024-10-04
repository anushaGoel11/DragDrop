# Drag-and-Drop Task Management Board (TypeScript & React 18+)

This is a task management board built with React 18+ and TypeScript, designed to manage tasks by dragging and dropping them between different categories (or labels). The board uses the native HTML Drag and Drop API without any external drag-and-drop library.

## Features

- **Task Categories/Labels:** Create and manage tasks.
- **Ticket Management:** Each ticket/task includes a title, description, and an expiry date.
- **Drag-and-Drop Functionality:** Move tasks between categories using the native HTML Drag and Drop API.
- **Expiry Date Notification:** Notify the user when a task's expiry date is approaching, in an intuitive and user-friendly manner.
- **React 18 Features:** This project showcases several React 18 features, including concurrent rendering and other hooks.

## Technologies

- **React 18+:** For building the user interface.
- **TypeScript:** For type safety and improved development experience.
- **HTML Drag and Drop API:** To implement the drag-and-drop functionality without external libraries.

## Steps

+ **Clone the repository:**
  `git clone <Repo-url>`
+ **Install Dependencies:**
  `npm install`
+ **Start the project locally:**
  `npm start`
  
## Usage

- **Creating Tickets:** Click on the "+" button in the "Open" column to create new tasks. Provide a title, description, and expiry date for each task.
- **Drag and Drop:** You can drag tickets from one column to another (e.g., from "Open" to "In Progress").
- **Expiry Notifications:** The system will alert the user when a task is approaching its deadline (1 day before expiry).

## React 18 Features

This project takes advantage of React 18's new features, including:

- **Concurrent Rendering:** For improved performance during intensive UI updates.
- **Automatic Batching:** Used to reduce unnecessary re-renders.
- **useTransition:** To handle UI transitions smoothly during task updates
