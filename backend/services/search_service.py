from __future__ import annotations

import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

from backend.config import DATASET_PATH, FAISS_INDEX_PATH, METADATA_PATH, MODEL_NAME
from backend.schemas import SearchResult
from backend.services.index_builder import QuranIndexer


class QuranSearchService:
    def __init__(self):
        self.model = SentenceTransformer(MODEL_NAME)
        self.index: faiss.Index | None = None
        self.metadata: pd.DataFrame | None = None

    def load_resources(self) -> None:
        if not FAISS_INDEX_PATH.exists() or not METADATA_PATH.exists():
            QuranIndexer(DATASET_PATH).build()

        self.index = faiss.read_index(str(FAISS_INDEX_PATH))
        self.metadata = pd.read_parquet(METADATA_PATH)

    def search(self, query: str, top_k: int = 5) -> list[SearchResult]:
        if self.index is None or self.metadata is None:
            raise RuntimeError("Search resources are not initialized.")

        query_embedding = self.model.encode(
            [query],
            convert_to_numpy=True,
            normalize_embeddings=True,
        ).astype(np.float32)

        scores, indices = self.index.search(query_embedding, top_k)

        results: list[SearchResult] = []
        for score, idx in zip(scores[0], indices[0]):
            if idx == -1:
                continue

            row = self.metadata.iloc[idx]
            results.append(
                SearchResult(
                    surah_name=str(row["surah_name"]),
                    surah_number=int(row["surah_number"]),
                    ayah_number=int(row["ayah_number"]),
                    arabic_text=str(row["arabic_text"]),
                    english_translation=str(row["english_translation"]),
                    similarity_score=float(score),
                )
            )

        return results
