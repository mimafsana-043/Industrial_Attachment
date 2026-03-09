from backend.config import DATASET_PATH
from backend.services.index_builder import QuranIndexer


if __name__ == "__main__":
    QuranIndexer(DATASET_PATH).build()
    print("FAISS index and metadata generated successfully.")
