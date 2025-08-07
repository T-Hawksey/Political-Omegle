
# Political Omegle

This is a web application that connects users with opposing political views (Left vs. Right) for anonymous, peer-to-peer, video-based debates.

## Features

*   **Anonymous Video Chat:** Users can chat via video without revealing their identity.
*   **Peer-to-Peer:** Uses WebRTC for direct, low-latency video and audio communication, reducing server costs.
*   **Matchmaking:** The application pairs users with different political affiliations to encourage debate.
*   **Real-time Video/Audio:** Powered by WebRTC.
*   **Simple Interface:** A clean and straightforward UI for easy interaction.

## Tech Stack

*   **Backend (Signaling):** Node.js, Express, Socket.IO
*   **Frontend:** React, Vite, WebRTC (`simple-peer`), Socket.IO Client
*   **Deployment:** Configured for Render

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) and npm (or a similar package manager) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd political-omegle
    ```

2.  **Install root dependencies:**
    ```bash
    npm install
    ```

3.  **Install server dependencies:**
    ```bash
    npm run install-server
    ```

4.  **Install client dependencies:**
    ```bash
    npm run install-client
    ```

### Running the Application Locally

1.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:3000`.

2.  **Start the frontend development server:**
    Open a new terminal window and navigate to the `client` directory.
    ```bash
    cd client
    npm run dev
    ```
    The frontend will be accessible at the URL provided by Vite (usually `http://localhost:5173`).

## Deployment to Render

This project includes a `render.yaml` file, which makes deployment to [Render](https://render.com/) seamless.

1.  **Create a GitHub Repository:** Push the entire project folder to a new repository on your GitHub account.

2.  **Create a New Service on Render:**
    *   Go to your Render dashboard.
    *   Click **New +** and select **Blueprint**.
    *   Connect the GitHub repository you just created.
    *   Render will automatically detect the `render.yaml` file and configure the service.

3.  **Deploy:**
    *   Click **Create New Web Service**.
    *   Render will automatically run the `buildCommand` and `startCommand` specified in `render.yaml` to install dependencies, build the client, and start the server.

Your Political Omegle application will be live at the URL provided by Render.
