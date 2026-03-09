# Quran Semantic Search Backend

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Build embeddings and FAISS index

```bash
python -m backend.build_index
```

## Run API

```bash
uvicorn backend.app:app --reload
```

## Endpoint

- `POST /search`
  - Body:

```json
{
  "query": "patience during hardship",
  "top_k": 5
}
```

Returns top semantically similar Quran verses with surah/ayah and similarity score.
