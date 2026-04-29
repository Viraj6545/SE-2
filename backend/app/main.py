from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from translator import translate

app = FastAPI(title="AgriTranslate Backend (minimal)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Pydantic schemas ────────────────────────────────────────────
class TranslateRequest(BaseModel):
    text: str | list[str]
    src_lang: str = "hin_Deva"
    tgt_lang: str = "eng_Latn"


class TranslateResponse(BaseModel):
    translations: list[str]


# ── Existing routes ─────────────────────────────────────────────
@app.get("/")
def read_root():
    return {"message": "AgriTranslate backend is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/terms/sample")
def sample_terms():
    return {
        "count": 2,
        "items": [
            {"id": 1, "term": "Crop Rotation", "category": "crops"},
            {"id": 2, "term": "Drip Irrigation", "category": "irrigation"}
        ]
    }


# ── Translate endpoint ─────────────────────────────────────────
@app.post("/translate", response_model=TranslateResponse)
def translate_text(req: TranslateRequest):
    """Translate text between Indic languages and English using IndicTrans2."""
    sentences = req.text if isinstance(req.text, list) else [req.text]
    result = translate(sentences, src_lang=req.src_lang, tgt_lang=req.tgt_lang)
    return TranslateResponse(translations=result)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
