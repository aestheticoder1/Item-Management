# 🧺 Item Management Web App

This is a full-stack web application built as part of an assignment. The app allows users to add and view various items with images, view detailed information, and send enquiries via email.

---

## 🔧 Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router
- React Toastify
- React Responsive Carousel

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer (for email enquiries)
- dotenv (for environment config)

---

## 🚀 Features

### ✅ Add Item Page
- Form to add:
  - Item name
  - Item type
  - Description
  - Cover image
  - Additional images
- Images are converted to base64 before sending to the backend.
- Success toast after item is added.

### ✅ View Items Page
- Displays all added items.
- Each item card shows name and cover image.
- Clicking a card opens detailed view.

### ✅ Item Details Page
- Carousel of images.
- Full details of item.
- "Enquire" button sends item details to a configured email via Nodemailer.

---

