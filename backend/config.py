from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = ROOT_DIR / "dataset" / "quran_verses.csv"
INDEX_DIR = ROOT_DIR / "backend" / "data"
FAISS_INDEX_PATH = INDEX_DIR / "quran.faiss"
METADATA_PATH = INDEX_DIR / "verse_metadata.parquet"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
