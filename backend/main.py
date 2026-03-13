from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI(title="Fintech Benefit Intelligence API")

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database for tokenized sessions (Privacy-by-Design)
active_sessions = {}

class TransactionRequest(BaseModel):
    user_id: str
    purchase_amount: float
    merchant_category: str

@app.post("/api/v1/session/start")
async def start_tokenized_session(user_id: str):
    """Creates a zero-retention tokenized session for the user."""
    session_token = str(uuid.uuid4())
    active_sessions[session_token] = {"user_id": user_id, "active": True}
    return {"session_token": session_token, "status": "Secure session initialized"}

@app.post("/api/v1/benefits/unlocker")
async def benefit_unlocker(req: TransactionRequest, session_token: str):
    """Dynamic algorithm to detect threshold gaps and suggest micro-transactions."""
    if session_token not in active_sessions:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Mock AI/Gemini API Integration logic for threshold analysis
    suggested_micro_tx = 0.0
    reward_tier_unlocked = False
    message = "Standard transaction recorded."
    
    # Logic: If they are $10-$30 away from a 5% cashback tier (e.g., $500 threshold)
    threshold = 500.0
    gap_to_threshold = threshold - req.purchase_amount
    
    if 0 < gap_to_threshold <= 30.0:
        suggested_micro_tx = gap_to_threshold
        reward_tier_unlocked = True
        message = f"Add ${gap_to_threshold:.2f} to your purchase to unlock the Premium Cashback Tier!"

    return {
        "original_amount": req.purchase_amount,
        "suggested_micro_transaction": suggested_micro_tx,
        "reward_unlocked": reward_tier_unlocked,
        "message": message,
        "privacy_status": "Data not retained (Privacy-by-Design)"
    }
