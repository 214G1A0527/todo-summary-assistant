# Todo Summary Assistant

This project is a full-stack web application developed as an internship assignment. It empowers users to efficiently manage their personal to-do lists and, uniquely, provides **AI-powered summaries of pending tasks** which can then be conveniently posted to a designated **Slack channel**.

---

## Live Deployments

You can explore the live versions of both the frontend and backend applications:

* **Frontend (React):** [https://coruscating-froyo-ad9e8b.netlify.app](https://coruscating-froyo-ad9e8b.netlify.app)
* **Backend API Base URL (Node.js/Express):** [https://todo-summary-assistant-fumj.onrender.com](https://todo-summary-assistant-fumj.onrender.com)

---

## Project Objective

The primary goal of this assignment was to construct a fully functional full-stack application demonstrating proficiency in:

* Implementing **CRUD (Create, Read, Update, Delete)** operations for to-do items.
* Integrating with a **real Large Language Model (LLM) API** for genuine text summarization.
* Interacting with **Slack** to post messages using webhooks.
* Successfully deploying both the frontend and backend components to cloud platforms.

---

## Features

### User-Facing Features

* **Todo Management:**
    * **Add Todo:** Easily add new to-do items with a description.
    * **View Todos:** See a clear list of all your to-do items, displaying their descriptions and completion status.
    * **Editing Todos:** and **Deleting Todos:**
* **AI-Powered Summarization & Notification:**
    * **Summarize Pending Todos:** A "Summarize Todos & Send to Slack" button triggers the backend to fetch all pending (incomplete) to-do items.
    * **LLM-Generated Summary:** These pending todos are then sent to **Cohere's powerful LLM** for a concise summary.
    * **Slack Integration:** The generated summary is automatically posted to a pre-configured Slack channel.
    * **User Feedback:** The UI displays a clear success or failure message after attempting to send the summary to Slack, providing immediate feedback.

### Technical Features

* **Frontend:** Built with **React** for a dynamic and interactive user interface.
* **Backend:** Developed using **Node.js with Express**, serving as the API layer and handling integrations.
* **LLM Integration:** Leverages the **Cohere API** to provide accurate and contextual summaries of tasks.
* **Slack Integration:** Communicates with Slack channels via **Incoming Webhooks**.
* **Database:** Utilizes **PostgreSQL** for robust and persistent storage of to-do items.
* **Hosting:** The frontend is hosted on **Netlify**, and the backend on **Render**, demonstrating cloud deployment capabilities.

---

## Technical Stack

* **Frontend:**
    * **React:** For building the user interface.
    * **Axios:** For making HTTP requests to the backend API.
    * Hosted on **Netlify**
* **Backend:**
    * **Node.js:** JavaScript runtime environment.
    * **Express:** Web framework for Node.js.
    * **`pg` (Node.js PostgreSQL client):** For direct database interaction with PostgreSQL.
    * **`dotenv`:** For managing environment variables.
    * **`cohere-ai` SDK:** To interact with the Cohere API.
    * **`nodemon`:** For automatic server restarts during development.
    * Hosted on **Render**
* **Database:**
    * **PostgreSQL:** Relational database for structured data storage.

---

## Backend Endpoints

The Node.js (Express) backend exposes the following RESTful API endpoints:

* **`GET /api/todos`**: Fetches all to-do items from the database.
    * Returns an array of todo objects.
* **`POST /api/todos`**: Adds a new to-do item to the database.
    * **Request Body:** `{"description": "Your todo description"}`
    * Returns the newly created todo object.
* **`DELETE /api/todos/:id`**: Deletes a specific to-do item by its ID.
    * **URL Parameter:** `:id` (the ID of the todo in PostgreSQL).
    * Returns a success message upon deletion.
* **`POST /api/summarize`**: Triggers the summarization process.
    * This endpoint fetches all pending todos, constructs a prompt, sends it to the **Cohere LLM** for summarization, and then attempts to post the generated summary to Slack.
    * **Request Body:** (Typically empty, as it acts on all pending todos) `{}`
    * Returns a success/failure message related to the Slack operation.

---

## Setup Instructions (Local Development)

To get this project running on your local machine, follow these steps for both the frontend and backend.

### Prerequisites

* Node.js
* npm (comes with Node.js) 
* A **PostgreSQL database instance** (local or cloud-hosted)
* A code editor (e.g., VS Code)
* Git

### 1. Backend Setup (`todo-summary-assistant/backend`)

1.  **Clone the Repository:**
    If you haven't already, clone the entire project repository:
    ```bash
    git clone [https://github.com/214G1A0527/todo-summary-assistant.git](https://github.com/214G1A0527/todo-summary-assistant.git)
    cd todo-summary-assistant
    ```
2.  **Navigate to Backend Directory:**
    ```bash
    cd backend
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
   
    ```
4.  **Environment Variables (`.env`)**:
    Create a file named `.env` in the `backend` directory (at the same level as `package.json`). This file will store sensitive information and API keys. Use the `.env.example` file provided in your repository as a guide.

    **`.env` Example (fill in your actual values):**
    ```
    PORT=3001 # Or your desired port
    DATABASE_URL="postgresql://user:password@host:port/database_name" # Your PostgreSQL connection string
    COHERE_API_KEY="your_cohere_api_key"
    SLACK_WEBHOOK_URL="your_slack_incoming_webhook_url"
    ```
    * **`PORT`**: The port your backend server will run on (e.g., `3001`).
    * **`DATABASE_URL`**: Your connection string for your PostgreSQL database. This should include credentials, host, port, and database name. Example: `postgresql://user:password@localhost:5432/todo_db`.
    * **`COHERE_API_KEY`**: Your API key obtained from Cohere.
    * **`SLACK_WEBHOOK_URL`**: The Incoming Webhook URL from your Slack app.

5.  **Database Initialization/Schema Setup:**
    Ensure your PostgreSQL database has a table named `todos` (or similar) with the necessary columns for your to-do items (e.g., `id` (primary key, auto-incrementing), `description` (TEXT), `completed` (BOOLEAN, default FALSE)). You'll need to manually create this table if you're not using an ORM with migrations.

6.  **Run the Backend Server:**
    ```bash
    npm start
   
    ```
    The backend API should now be running, typically on `http://localhost:3001` (or the `PORT` you configured). You should see messages indicating successful database connection and server startup.

### 2. Frontend Setup (`todo-summary-assistant/frontend`)

1.  **Navigate to Frontend Directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    
    ```

3.  **Run the Frontend Development Server:**
    ```bash
    npm start
  
    ```
    The React application should automatically open in your default web browser, usually at `http://localhost:3000` or a similar port.

---

## API Integrations Setup Guidance

This project relies on external APIs for its core functionality. Here's how to configure them:

### 1. PostgreSQL Database Setup

1.  **Obtain a PostgreSQL Database:**
    * You can set up PostgreSQL locally on your machine.
    * Alternatively, use a cloud-hosted free-tier service like **Supabase**, **Render Postgres**, **ElephantSQL**, or **Heroku Postgres**. These services provide a `DATABASE_URL` directly.
2.  **Create Database & Table:**
    * Once you have a PostgreSQL instance, create a new database for your project (e.g., `todo_db`).
    * Inside that database, create a `todos` table with the appropriate schema. A basic schema might look like this:
        ```sql
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            description TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
           
        );
        ```
3.  **Get Connection String:**
    * Obtain the connection string for your PostgreSQL database. It typically follows the format: `postgresql://user:password@host:port/database_name`.
    * **Add this complete string to your backend's `.env` file as `DATABASE_URL`**.

### 2. Cohere API Setup (for LLM Summarization)

1.  **Create a Cohere Account:** Sign up or log in at [https://cohere.com/](https://cohere.com/).
2.  **Access API Keys:** Navigate to your dashboard or API keys section.
3.  **Create a New API Key:** Generate a new API key. **Copy this key immediately as it's often shown only once.**
4.  **Add to `.env`:** **Add this API key to your backend's `.env` file as `COHERE_API_KEY`**.
5.  **Billing:** Note that while Cohere offers a free tier or trial credits, actual usage will incur costs after exceeding free limits. Monitor your usage on the Cohere dashboard.

### 3. Slack Incoming Webhooks Setup

1.  **Create a Slack App:**
    * Go to [https://api.slack.com/apps](https://api.slack.com/apps).
    * Click "Create New App" or select an existing one. Choose "From scratch."
    * Give your App a name and select the Slack workspace where you want to post summaries.
2.  **Activate Incoming Webhooks:**
    * In your Slack App settings, navigate to "Features" > "Incoming Webhooks".
    * Toggle "Activate Incoming Webhooks" to **On**.
3.  **Add New Webhook to Workspace:**
    * Scroll down and click "Add New Webhook to Workspace".
    * Select the specific channel where you want the summaries to appear (e.g., `#general`, `#todo-summaries`).
    * Click "Allow".
4.  **Copy the Webhook URL:**
    * You will be redirected back to the Incoming Webhooks page, and a new Webhook URL will be generated (e.g., `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXX`).
    * **Copy this entire URL and add it to your backend's `.env` file as `SLACK_WEBHOOK_URL`**.

---

## Design/Architecture Decisions

* **Monorepo Structure:** The project is organized as a monorepo (`todo-summary-assistant/backend`, `todo-summary-assistant/frontend`). This keeps related parts of the full-stack application together, simplifying version control and dependency management, while still allowing for independent development and deployment of each component.
* **Clear Separation of Concerns:**
    * The **React frontend** is solely responsible for the user interface, user interactions, and displaying data. It makes API calls to the backend and does not directly handle LLM or Slack integration logic.
    * The **Node.js/Express backend** acts as the central hub. It manages the database (PostgreSQL), exposes RESTful API endpoints for CRUD operations, and orchestrates the complex integrations with Cohere (LLM) and Slack. This ensures security (API keys are on the server-side) and maintainability.
* **RESTful API Design:** The backend adheres to REST principles, providing predictable and standardized ways for the frontend to interact with to-do resources (`/api/todos`).
* **Centralized LLM & Slack Logic:** All logic related to fetching pending todos, calling the LLM, and sending the summary to Slack is handled by a single backend endpoint (`/api/summarize`). This simplifies the frontend's role to just triggering this single operation.
* **Environment Variable Management:** Critical configuration details and API keys are stored in `.env` files (and excluded from version control via `.gitignore`). This is crucial for security and allows easy configuration across different deployment environments (local, development, production).
* **Cloud-Native Deployment:** Utilizing Netlify for the frontend and Render for the backend demonstrates practical deployment skills on modern cloud platforms, including understanding of their free tier capabilities and limitations.
* **Asynchronous Operations:** The backend efficiently handles potentially long-running operations (like LLM API calls and external webhook requests) asynchronously using Promises/async-await, ensuring the server remains responsive.

---

## Deliverables

This GitHub repository fulfills the requirements of the internship assignment and includes:

* The complete source code for both the React frontend and Node.js backend.
* A `.env.example` file in the `backend` directory, clearly listing all required environment variables for setup.
* This comprehensive `README.md` file, detailing:
    * Project setup instructions for local development.
    * Step-by-step guidance for configuring LLM (Cohere) and Slack integrations.
    * An overview of the key design and architecture decisions made during development.

---

**Feel free to open an issue or pull request if you have any questions or suggestions!**
