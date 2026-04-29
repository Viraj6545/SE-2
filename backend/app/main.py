import os
from hashlib import sha1

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from translator import translate

try:
    import redis
except ImportError:
    redis = None

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


def _init_redis():
    redis_url = os.getenv("REDIS_URL")
    if not redis_url or redis is None:
        return None
    return redis.Redis.from_url(redis_url, decode_responses=True)


_redis = _init_redis()


def _cache_key(text: str, src_lang: str, tgt_lang: str) -> str:
    digest = sha1(text.encode("utf-8")).hexdigest()
    return f"translate:{src_lang}:{tgt_lang}:{digest}"


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
    src_lang = req.src_lang
    tgt_lang = req.tgt_lang

    if not sentences:
        return TranslateResponse(translations=[])

    cached = [None] * len(sentences)
    missing_texts = []
    missing_indexes = []

    if _redis is not None:
        try:
            keys = [_cache_key(text, src_lang, tgt_lang) for text in sentences]
            cached_values = _redis.mget(keys)
            for idx, value in enumerate(cached_values):
                if value is None:
                    missing_indexes.append(idx)
                    missing_texts.append(sentences[idx])
                else:
                    cached[idx] = value
        except Exception:
            missing_indexes = list(range(len(sentences)))
            missing_texts = list(sentences)
    else:
        missing_indexes = list(range(len(sentences)))
        missing_texts = list(sentences)

    if missing_texts:
        translated = translate(missing_texts, src_lang=src_lang, tgt_lang=tgt_lang)
        for i, idx in enumerate(missing_indexes):
            cached[idx] = translated[i]

        if _redis is not None:
            try:
                ttl_seconds = int(os.getenv("TRANSLATION_CACHE_TTL", "86400"))
                pipe = _redis.pipeline()
                for text, value in zip(missing_texts, translated):
                    pipe.setex(_cache_key(text, src_lang, tgt_lang), ttl_seconds, value)
                pipe.execute()
            except Exception:
                pass

    return TranslateResponse(translations=cached)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
