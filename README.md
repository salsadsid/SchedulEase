# SchedulEase

Effortless appointment management. Schedule, view, and manage your appointments seamlessly with SchedulEase.

## Features

- User authentication with Firebase
- Schedule appointments with optional audio messages
- View received and sent appointments
- Cancel appointments before the scheduled time
- Real-time updates and responsive design

## Project Structure

- **Frontend:** Vite + React + JavaScript
- **Backend:** Firebase (Firestore, Authentication, Storage)
- **UI:** Tailwind CSS + ShadCN

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/salsadsid/SchedulEase.git
cd SchedulEase
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Configure Firebase

Create a Firebase project and set up Firestore, Authentication, and Storage.

- Copy the Firebase config object from your Firebase project settings.
- Create a .env file in the root of your project and add your Firebase configuration:

```bash
VITE_APIKEY=your-api-key
VITE_AUTHDOMAIN=your-auth-domain
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-storage-bucket
VITE_MESSAGINGSENDERID=your-messaging-sender-id
VITE_APPID=your-app-id
VITE_MEASUREMENTID=your-measurement-id
```

### 4. Start the development server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

This will start the Vite development server, and you can access the project at `http://localhost:5173`
