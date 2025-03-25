Task Manager Application
A simple yet effective task management application that allows users to add, view, edit, and manage tasks with due dates and completion status.

Features
Add Tasks: Create new tasks with name, description, and due date
Task Management: View all tasks in a clean interface
Status Tracking: Mark tasks as completed/pending
Filtering: Filter tasks by status (All/Pending/Completed)
Persistent Storage: Tasks are saved in browser's localStorage
Responsive Design: Works on both desktop and mobile devices

Files Structure
Copy
task-manager/
├── index.html          # Add new tasks page
├── task.html           # Task management page
├── index.js            # Shared JavaScript functionality
├── style.css           # Styling for index.html (Add Tasks)
├── task.css            # Styling for task.html (Manage Tasks)
How to Use
Add a New Task:

Open index.html in your browser

Fill in task name, description, and due date (optional)

Click "Add Task" button

View/Manage Tasks:

Click "View All Tasks" button to see your task list

Use the filter buttons (All/Pending/Completed) to view specific tasks

Edit, delete, or toggle task status using the action buttons

Navigation:

From the Add Tasks page: Click "View All Tasks"

From the Manage Tasks page: Click "Add New Task"

Technical Details
Frontend: Pure HTML, CSS, and JavaScript (no frameworks)

Storage: Uses browser's localStorage for persistence

Responsive: Adapts to different screen sizes

Browser Support
The application should work on all modern browsers including:

Chrome

Firefox

Safari

Edge

Implement drag-and-drop reordering

Add user authentication

Enable task sharing between users

Setup
No installation required! Simply open index.html in your web browser to start using the application.

