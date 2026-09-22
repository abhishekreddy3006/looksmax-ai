from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze, coach, plan
from app.config import settings

app = FastAPI(
    title="Refine API",
    description="AI Personal Appearance & Self-Care Coach — Provider-agnostic, privacy-first",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, restrict in prod to app origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)
app.include_router(coach.router)
app.include_router(plan.router)

@app.get("/")
async def root():
    return {
        "name": "Refine API",
        "version": "1.0.0",
        "status": "ok",
        "provider": "mock (demo) — configure OPENAI_API_KEY or GEMINI_API_KEY for real AI",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "ok", "provider": "mock"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.api_host, port=settings.api_port, reload=True)
