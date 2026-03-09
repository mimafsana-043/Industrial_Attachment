from __future__ import annotations

from pathlib import Path

import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

from backend.config import FAISS_INDEX_PATH, INDEX_DIR, METADATA_PATH, MODEL_NAME
from backend.services.dataset_loader import DatasetLoader


class QuranIndexer:
    def __init__(self, dataset_path: Path):
        self.loader = DatasetLoader(dataset_path)
        self.model = SentenceTransformer(MODEL_NAME)

    def build(self) -> None:
        INDEX_DIR.mkdir(parents=True, exist_ok=True)

        dataframe = self.loader.load()
        embeddings = self.model.encode(
            dataframe["search_text"].tolist(),
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=True,
        ).astype(np.float32)

        index = faiss.IndexFlatIP(embeddings.shape[1])
        index.add(embeddings)

        faiss.write_index(index, str(FAISS_INDEX_PATH))
        dataframe.to_parquet(METADATA_PATH, index=False)
