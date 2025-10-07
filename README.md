# Zap-Shift Courier Service

A modern, full-stack courier delivery management platform built with **React** and **Firebase**, featuring multi-role access, real-time tracking, and seamless parcel management.

---

## ✨ Live Demo

🔗 **Primary URL**: [https://zap-shift-client-3b673.web.app](https://zap-shift-client-3b673.web.app)
🔗 **Firebase URL**: [https://zap-shift-client-3b673.firebaseapp.com](https://zap-shift-client-3b673.firebaseapp.com)
---

## 🎯 Features

### 👥 Multi-Role System

* **👑 Admin Panel**: Full system control, user management, analytics
* **🚴 Rider Dashboard**: Delivery management, earnings tracking, route optimization
* **👤 User Portal**: Parcel booking, real-time tracking, payment processing

### 📦 Core Functionalities

* 🔐 **Secure Authentication** with Firebase Auth
* 📍 **Real-time Parcel Tracking**
* 💳 **Integrated Payment System**
* 🗺️ **Service Coverage Management**
* 📊 **Advanced Analytics Dashboard**
* 📱 **Responsive Design**
* ⚡ **Fast Performance** with Vite

---

## 🚀 Quick Start

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* Firebase account

### Installation

1. **Clone the repository**

```bash
git clone [https://github.com/your-username/zap-shift-client.git](https://github.com/ruhulshanto/zap-shift-client.git)
cd zap-shift-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Deploy to Firebase**

```bash
firebase deploy
```

---

## 🔐 Demo Credentials

| Role         | Email                    | Password     | Access                    |
| ------------ | ------------------------ | ------------ | ------------------------- |
| **👑 Admin** | `admin@gmail.com`        | `Admin123`   | Full system access        |
| **🚴 Rider** | `hydro@track.com`        | `Hydrotrack` | Delivery management       |
| **👤 User**  | Create via Register page | Custom       | Parcel booking & tracking |

---

## 🏗️ Project Architecture

zap-shift-client/
├── firebase/                 # Firebase configuration
├── dist/                     # Build output
├── public/                   # Static assets
│   ├── serviceCenter.json
│   └── vite.svg
└── src/
    ├── components/           # Reusable components
    │   ├── Loading.jsx
    │   └── UpdateProfile.jsx
    ├── firebase/
    │   └── firebase.init.js
    ├── hooks/                # Custom React hooks
    │   ├── useAuth.jsx
    │   ├── useAxios.jsx
    │   ├── useAxiosSecure.jsx
    │   ├── useUpdateTracking.jsx
    │   └── useUserRole.jsx
    ├── Layout/               # Application layouts
    │   ├── AuthLayout.jsx
    │   ├── DashboardLayout.jsx
    │   └── RootLayout.jsx
    ├── Pages/                # All application pages
    │   ├── Authentication/   # Login/Register flows
    │   ├── Coverage/         # Service areas
    │   ├── Dashboard/        # Role-specific dashboards
    │   ├── Payment/          # Payment processing
    │   ├── Home/             # Landing pages
    │   └── shared/           # Common components
    ├── Provider/             # Context providers
    ├── SendParcel/           # Parcel booking
    ├── routes/               # Protected routes
    └── router.jsx


## 🛠️ Technology Stack

### Frontend

* **⚛️ React 18** - UI library
* **🎨 CSS3 & Tailwind CSS** - Styling and animations
* **⚡ Vite** - Build tool and dev server
* **🔄 React Router** - Client-side routing

### Backend & Services

* **🔥 Firebase Auth** - Authentication
* **📡 Firebase Firestore** - Database
* **☁️ Firebase Hosting** - Deployment
* **💳 Firebase Extensions** - Payment processing

### Development Tools

* **ESLint** - Code linting
* **Git** - Version control

---

## 📋 Key Pages & Features

### 🏠 Home & Marketing

* Landing page, service overview, client reviews, FAQ

### 🔐 Authentication

* User registration, login, Google OAuth, profile management

### 📊 Dashboard (Role-based)

* **Admin**: User & rider management, analytics, revenue tracking
* **Rider**: Delivery assignments, earnings, route optimization
* **User**: Parcel booking, real-time tracking, payment history

### 📦 Parcel Management

* Send parcels, track parcels, payment processing, delivery history

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🆘 Support

* Open an issue on GitHub
* Contact: `ruhulshanto8082@gmail.com`


