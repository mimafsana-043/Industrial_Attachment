from pydantic import BaseModel, Field


class SearchQuery(BaseModel):
    query: str = Field(..., min_length=2, description="Natural language query")
    top_k: int = Field(default=5, ge=1, le=20)


class SearchResult(BaseModel):
    surah_name: str
    surah_number: int
    ayah_number: int
    arabic_text: str
    english_translation: str
    similarity_score: float
