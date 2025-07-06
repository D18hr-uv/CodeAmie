# CodeAmie - Your AI Code Review Assistant

CodeAmie is a web application that leverages AI (via Google's Gemini model) to provide code reviews. Users can input code snippets, select the programming language, and receive feedback on code quality, best practices, potential bugs, and more.

## Features

*   **AI-Powered Code Review:** Get intelligent feedback on your code.
*   **Multi-Language Support:** Select from a variety of common programming languages for more accurate reviews.
    *   Currently supported: JavaScript, JSX, Python, Java, C, C++, C#, Go, Ruby, PHP, Swift, TypeScript.
*   **Syntax Highlighting:** Code editor and review display with syntax highlighting for readability.
*   **Copy Functionality:** Easily copy your code or the AI-generated review to your clipboard.
*   **User-Friendly Interface:** Clean, dark-themed UI for a pleasant experience.
*   **Loading & Error States:** Clear feedback during API calls and for any errors encountered.

## Project Structure

The project is a monorepo with two main parts:

*   `Frontend/`: A React application built with Vite.
*   `BackEnd/`: A Node.js application with an Express server.

## Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (usually comes with Node.js)
*   A Google Gemini API Key

## Setup and Running the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd BackEnd
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `BackEnd/` directory and add your Google Gemini API key:
        ```
        GOOGLE_GEMINI_KEY=YOUR_GEMINI_API_KEY
        ```
    *   Start the backend server (defaults to `http://localhost:3000`):
        ```bash
        npm start
        ```
        Or for development with nodemon:
        ```bash
        npm run dev
        ```
        (This requires `nodemon` to be installed globally: `npm install -g nodemon`, or you can add it as a dev dependency to the backend: `cd BackEnd && npm install --save-dev nodemon`)


3.  **Frontend Setup:**
    *   Open a new terminal and navigate to the frontend directory:
        ```bash
        cd Frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   The frontend will try to connect to the backend at `http://localhost:3000`. If your backend is running on a different port, you might need to update `VITE_BACKEND_URL` in `Frontend/.env` (create this file if it doesn't exist) or directly in `Frontend/src/App.jsx`.
    *   Start the frontend development server (usually runs on `http://localhost:5173` or another available port):
        ```bash
        npm run dev
        ```

4.  **Access the application:**
    Open your browser and go to the address provided by the frontend development server (e.g., `http://localhost:5173`).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.