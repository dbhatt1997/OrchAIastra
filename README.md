# 🧠 OrchAIstra

**OrchAIstra** is an orchestration platform that enables users to configure and operate multiple AI nodes such as ChatGPT, Claude, Gemini, and more — in parallel or sequentially — for streamlined workflows and intelligent automation.

## 🚀 Features

- ⚙️ **AI Node Orchestration** – Run multiple models in parallel, sequentially, or in multi level.
- 🏷️ **Tag-Based Roles** – Assign roles and operations to each node using customizable tags.
- 🔄 **Modular Pipelines** – Build reusable and dynamic AI pipelines using drag-and-drop.
- 📊 **Real-Time Execution Monitoring** – Visualize and debug how each node responds and flows through the pipeline.
- 💬 **Multi-Agent Conversation Handling** – Enable advanced dialogues between multiple AI agents.

## 📂 Project Structure

- Frontend # React UI built with MUI and React Flow
- Backend # FastAPI backend handling execution and coordination

## 🖥️ Tech Stack

| Frontend        | Backend        | Styling        | Other Tools               |
|-----------------|----------------|----------------|---------------------------|
| React (with TS) | Python FastAPI | MUI, Emotion   | React Flow, Zustand       |
| React Router    |  Uvicorn       | Custom Hooks   | Context API, CRA          |

## 📦 Setup

### 1. Clone the Repository
git clone [https://github.com/your-username/orchaiastra.git](https://github.com/dbhatt1997/OrchAIastra.git)
cd OrchAIastra

### 2. Setup Database
docker compose up

### 3. Setup Backend
- cd Backend
- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- uvicorn main:app --reload 

### 4. Setup Frontend
- cd Frontend/orchaistra
- npm i
- npm run start

## How It Works

![Screenshot](./assets/demo1.png)
![Screenshot](./assets/demo2.png)
![Screenshot](./assets/demo3.png)
![Screenshot](./assets/demo4.png)
![Screenshot](./assets/demo4.png)
![Screenshot](./assets/demo5.png)
