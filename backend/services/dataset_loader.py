from pathlib import Path

import pandas as pd


REQUIRED_COLUMNS = {
    "surah_number",
    "surah_name",
    "ayah_number",
    "arabic_text",
    "english_translation",
}


class DatasetLoader:
    def __init__(self, dataset_path: Path):
        self.dataset_path = dataset_path

    def load(self) -> pd.DataFrame:
        if not self.dataset_path.exists():
            raise FileNotFoundError(
                f"Dataset not found at {self.dataset_path}. "
                "Add dataset/quran_verses.csv with required columns."
            )

        dataframe = pd.read_csv(self.dataset_path)
        missing_columns = REQUIRED_COLUMNS.difference(dataframe.columns)
        if missing_columns:
            missing = ", ".join(sorted(missing_columns))
            raise ValueError(f"Missing required columns in dataset: {missing}")

        dataframe = dataframe.sort_values(["surah_number", "ayah_number"]).reset_index(drop=True)
        dataframe["search_text"] = dataframe["english_translation"].fillna("")
        return dataframe
