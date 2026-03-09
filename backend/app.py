from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.services.search_service import QuranSearchService
from backend.schemas import SearchQuery, SearchResult


search_service = QuranSearchService()


@asynccontextmanager
async def lifespan(_: FastAPI):
    search_service.load_resources()
    yield


app = FastAPI(
    title="Quran Semantic Search API",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/search", response_model=list[SearchResult])
def search_verses(payload: SearchQuery) -> list[SearchResult]:
    return search_service.search(payload.query, payload.top_k)
