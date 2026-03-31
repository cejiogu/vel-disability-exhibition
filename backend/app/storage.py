from pathlib import Path
from typing import Optional
from uuid import uuid4

from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename


def save_uploaded_file(upload_root: Path, file: FileStorage, folder: str) -> Optional[str]:
    if not file or not file.filename:
        return None

    safe_name = secure_filename(file.filename)
    if not safe_name:
        return None

    extension = Path(safe_name).suffix
    relative_dir = Path(folder)
    destination_dir = upload_root / relative_dir
    destination_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid4().hex}{extension}"
    destination = destination_dir / filename
    file.save(destination)

    return f"/media/{relative_dir.as_posix()}/{filename}"
