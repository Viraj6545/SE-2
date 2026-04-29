"""
IndicTrans2 translation service.
Loads the model lazily on first request and exposes a translate() function.
"""

import gc
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from indic_processor import IndicProcessor

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Lazy-loaded globals
_tokenizer = None
_model = None
_ip = None
_current_direction = None

def _get_direction(src_lang: str, tgt_lang: str) -> str:
    """Determine the model direction based on source and target languages."""
    if src_lang == "eng_Latn" and tgt_lang != "eng_Latn":
        return "en-indic"
    elif src_lang != "eng_Latn" and tgt_lang == "eng_Latn":
        return "indic-en"
    elif src_lang != "eng_Latn" and tgt_lang != "eng_Latn":
        return "indic-indic"
    else:
        raise ValueError("Cannot translate English to English.")

def _load_model(direction: str):
    """Load tokenizer, model and processor for the specified direction."""
    global _tokenizer, _model, _ip, _current_direction

    if _current_direction == direction:
        return  # already loaded the correct model

    # Unload previous model to free RAM/VRAM
    if _model is not None:
        print(f"[translator] Unloading {_current_direction} model to save memory...")
        del _tokenizer
        del _model
        del _ip
        _tokenizer = None
        _model = None
        _ip = None
        gc.collect()
        if torch.cuda.is_available():
            torch.cuda.empty_cache()

    model_name = f"ai4bharat/indictrans2-{direction}-1B"
    print(f"[translator] Loading tokenizer from {model_name} ...")
    _tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)

    print(f"[translator] Loading model on {DEVICE} ...")
    extra_kwargs = {}
    if DEVICE == "cuda":
        extra_kwargs["attn_implementation"] = "flash_attention_2"

    _model = AutoModelForSeq2SeqLM.from_pretrained(
        model_name,
        trust_remote_code=True,
        torch_dtype=torch.float16,
        **extra_kwargs,
    ).to(DEVICE)

    _ip = IndicProcessor(inference=True)
    _current_direction = direction
    print(f"[translator] Model {model_name} loaded and ready.")


def translate(
    sentences: list[str],
    src_lang: str = "hin_Deva",
    tgt_lang: str = "eng_Latn",
) -> list[str]:
    """Translate a list of sentences from src_lang to tgt_lang using IndicTrans2."""
    direction = _get_direction(src_lang, tgt_lang)
    _load_model(direction)

    batch = _ip.preprocess_batch(sentences, src_lang=src_lang, tgt_lang=tgt_lang)

    inputs = _tokenizer(
        batch,
        truncation=True,
        padding="longest",
        return_tensors="pt",
        return_attention_mask=True,
    ).to(DEVICE)

    with torch.no_grad():
        generated_tokens = _model.generate(
            **inputs,
            use_cache=True,
            min_length=0,
            max_length=256,
            num_beams=5,
            num_return_sequences=1,
        )

    decoded = _tokenizer.batch_decode(
        generated_tokens,
        skip_special_tokens=True,
        clean_up_tokenization_spaces=True,
    )

    translations = _ip.postprocess_batch(decoded, lang=tgt_lang)
    return translations
