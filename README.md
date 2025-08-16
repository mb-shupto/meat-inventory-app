Meat Inventory Management System
This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) to manage a meat processing facility's inventory. The system helps track products, monitor stock levels, prevent waste from expiration, and ensure food safety through a traceability and recall system.
🌟 Features
Product Management: Define and manage different meat products (e.g., animal type, cut, shelf life).
Inventory Tracking: Add and deplete stock with specific quantities, batch numbers, and expiration dates.
Expiration Alerts: A dashboard to automatically display products that are nearing their expiration date, helping to reduce waste.
Reporting & Analytics: Generate reports on total inventory value and quantities by product type, with data visualizations (charts).
Traceability & Recall: A system to log and manage product recalls by batch number, a critical feature for food safety compliance.
User Authentication: Secure registration and login for users with a role-based access control system (admin, manager, employee).
🛠️ Technology Stack
Frontend: React, React Hooks, React Chart.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens), bcrypt
State Management: React Context API
🚀 Getting Started
To run this project locally, follow these steps.
1. Prerequisites
Make sure you have the following installed:
Node.js (LTS version recommended)
npm (Node Package Manager)
MongoDB (local installation or a cloud service like MongoDB Atlas)
2. Backend Setup
Navigate to the backend directory and install the server dependencies:
cd backend
npm install


Create a .env file in the backend directory with your database connection string and a JWT secret key:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key


Start the backend server:
npm start


The server will run on http://localhost:5000.
3. Frontend Setup
In a new terminal, navigate to the frontend directory and install the client dependencies:
cd frontend
npm install


Start the frontend application:
npm start


The application will run on http://localhost:3000.
🤝 Contributing
This project is a work in progress. Feel free to fork the repository and contribute.
