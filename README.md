# 💳 Fintech Benefit Intelligence Platform

A context-aware microservices platform that helps users maximize their credit card benefits and rewards without invasive background tracking.

## 🚀 Features
* **Predictive Benefit Utilization:** Analyzes thresholds to improve credit card benefit utilization.
* **Privacy-by-Design Architecture:** Processes user inputs via tokenized sessions with zero data retention.
* **Smart Benefit Unlocker:** Dynamically suggests micro-transactions to unlock higher-tier rewards.

## 🧠 How It Works
* The React frontend captures user intent and sends it to a FastAPI backend.
* The backend securely processes the request using tokenized sessions.
* An AI-driven algorithm (integrated with REST APIs) analyzes threshold gaps and returns optimized spending suggestions.

## 🛠️ Technologies Used
* Python & FastAPI (Backend Microservices)
* React.js (Frontend UI)
* REST APIs & LLM Integrations

## 🔧 Installation & Local Setup

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload` (Runs on port 8000)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start` (Runs on port 3000)
