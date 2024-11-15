# Timer App

## Overview

This is a timer application built with Next.js. The app allows users to register, log in, and track time on different activities. Firebase is used for authentication and data management, and there are various reusable components and helper functions that enhance the functionality of the app.

## Features

- **User Authentication**: Allows users to register and log in.
- **Time Tracking**: Track and log time spent on various tasks.
- **History Tracking**: View previous logs of time-tracked activities.
- **Responsive Design**: Built to be responsive across devices.
- **Firebase Integration**: Firebase used for authentication and real-time data management.

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   Configure Firebase:
   Set up a Firebase project and configure authentication.
   Update src/firebase/firebaseConfig.ts with your Firebase configuration.
   Set up environment variables:
   Copy .env.local.example to .env.local and add the necessary Firebase keys.
   Run the app:

   ```bash
   npm run dev
   ```

   Scripts

   ```bash
   npm run dev
   ```

   Start the development server.

   ```bash
   npm run build
   ```

   Build the app for production.

   ```bash
   npm run start
   ```

   Start the production server.

   ```bash
   npm test
   ```

   Run unit tests with Jest.
