CanteenKart 🍽️

CanteenKart is a full-stack web-based application designed to digitize and streamline cafeteria operations in college environments. It enables students to register, order food, recharge accounts online, and avoid cash-based transactions, reducing wait times and improving service efficiency.


---

📌 Project Objective

To solve common problems in college canteens such as:

Long queues for ordering and billing

Inconvenient cash transactions

Lack of transparency in transactions


With CanteenKart, students can preorder food, make online payments, receive SMS alerts for transactions, and track wallet balance with ease.


---

🛠 Tech Stack

Layer	Technology

Frontend	ReactJS, JavaScript, Tailwind CSS
Backend	Node.js with ExpressJS
Database	MySQL
Others	Axios, dotenv, nodemon, Multer, bcrypt



---

🗂️ Project Structure

backend/: ExpressJS API Server

src/: Routes, Controllers

config/: DB connection & Middleware

uploads/: Static file handling (e.g. food images)


frontend/: ReactJS Single Page Application

public/: Static HTML and assets

src/: Pages, Components, Hooks


MenuImages/: Sample images for menu items

updated db/: SQL schema and sample data

.gitignore: Specifies files/folders ignored by Git



---

✨ Key Features

Student Registration and Wallet Creation

Menu Category and Item Management (Admin)

Online Wallet Recharge and Manual Recharge

Food Pre-Ordering (Online Booking)

Product Search by Name or Category

Role-based Login: Student, Admin, Staff

Order Management and Status Update

Account Deactivation for graduated students

SMS/Email Notifications for transactions



---

📥 Installation Guide

1. Clone the Repository

Open a terminal and run the following commands:

git clone https://github.com/Akash0033/CAFE_MANAGEMENT.git

cd CAFE_MANAGEMENT


2. Install Prerequisites

Make sure the following are installed:

Node.js version 18 or higher

MySQL Server or XAMPP (recommended)


If you don’t have MySQL or phpMyAdmin, download and install XAMPP from: https://www.apachefriends.org/index.html Then start Apache and MySQL from the XAMPP Control Panel.

3. Configure Environment Variables

Create a file named .env inside the backend/ folder and add the following content:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=canteenKartDB

EMAIL=your_email

EMAIL_PASSWORD=your_email_16_digit_password


4. Initialize the Database Using phpMyAdmin

1. Open http://localhost/phpmyadmin


2. Create a new database named canteenkart_db


3. Click on the Import tab


4. Choose the schema.sql file from the updated db/ folder and import it


5. Optionally, import seed.sql for demo data



5. Run the Application

For Backend:

Go to the backend folder

Run npm install

Then run npm run serve


For Frontend:

Open a new terminal

Navigate to the frontend folder

Run npm install

Then run npm start


After both are running, visit http://localhost:3000 to access the application.


---

🔒 User Roles

Role	Access Level

Student	Book food, recharge wallet
Admin	Manage users, menu, recharge
Staff	View and prepare orders



---

📦 Modules Overview

Login & Registration: Auth for students/admins

Category: Manage food categories

Items: CRUD for menu items

Online Booking: Place orders via React UI

Recharge: Manual & online wallet top-up

Deactivate: Disable accounts after graduation

Search: Find menu items quickly

Admin Dashboard: Analytics and control panel



---

📊 Database Tables (Simplified)

Table	Key Columns

users	user_id, username, password, user_type
students	student_id, name, roll_no, course, deposit
categories	category_id, category_name
items	item_id, category_name, item_name, price
bookings	booking_id, itemname, quantity, serving_time
recharge	recharge_id, roll_no, recharge_amount, balance
deactivate	student_id, reg_no, status



---

🔭 Future Enhancements

Mobile App Integration (React Native)

QR Code-based payment and login

Multi-canteen or branch support

Real-time order tracking for students

Self-service recharge system



---

🧪 Testing

To run tests, open a terminal and use the following command:

npm run test



---

📜 License

MIT License – Feel free to use, modify, and contribute.


---

🙌 Authors & Acknowledgements

Akash (Lead Developer)

Based on academic project report: "CanteenKart"

Tools used: VS Code, MySQL Workbench, Postman, XAMPP



---

📚 References

ReactJS – https://reactjs.org

ExpressJS – https://expressjs.com

MySQL – https://www.mysql.com

Tailwind CSS – https://tailwindcss.com



---

Enjoy smarter canteen management with CanteenKart! 🍕🍹

