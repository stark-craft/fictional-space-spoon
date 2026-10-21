"""Standalone PDF text extraction with no OCR or AI calls.

Safe for isolated testing. Does not save files or modify application records.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from io import BytesIO
from typing import Any

MAX_FILE_BYTES = 150 * 1024 * 1024
MAX_PAGES = 500
DEFAULT_MAX_CHARS = 1_000_000
PYPDF_FILE_THRESHOLD = 20 * 1024 * 1024


class PDFExtractionError(Exception):
    """PDF extraction failed; code describes the diagnostic category."""

    def __init__(self, code: str, message: str):
        super().__init__(message)
        self.code = code


@dataclass
class PDFExtractionResult:
    text: str
    page_count: int
    character_count: int
    extraction_status: str
    pages_with_text: int
    engine_used: str
    fallback_pages: list[int] = field(default_factory=list)
    empty_pages: list[int] = field(default_factory=list)
    page_errors: dict[int, str] = field(default_factory=dict)
    diagnostics: list[str] = field(default_factory=list)

    def as_dict(self) -> dict[str, Any]:
        return {
            "text": self.text,
            "page_count": self.page_count,
            "character_count": self.character_count,
            "extraction_status": self.extraction_status,
            "pages_with_text": self.pages_with_text,
            "engine_used": self.engine_used,
            "fallback_pages": self.fallback_pages,
            "empty_pages": self.empty_pages,
            "page_errors": self.page_errors,
            "diagnostics": self.diagnostics,
        }


def _error_summary(exc: Exception) -> str:
    # Report errors only; never include extracted document text.
    return f"{type(exc).__name__}: {str(exc)[:250]}"


def _open_pypdf(data: bytes):
    from pypdf import PdfReader

    reader = PdfReader(BytesIO(data), strict=False)
    if reader.is_encrypted:
        try:
            unlocked = reader.decrypt("")
        except Exception as exc:
            raise PDFExtractionError(
                "encrypted", "PDF is encrypted and needs a password."
            ) from exc
        if not unlocked:
            raise PDFExtractionError(
                "encrypted", "PDF is encrypted and needs a password."
            )
    return reader


def _open_pymupdf(data: bytes):
    import pymupdf

    doc = pymupdf.open(stream=data, filetype="pdf")
    if doc.needs_pass and not doc.authenticate(""):
        doc.close()
        raise PDFExtractionError(
            "encrypted", "PDF is encrypted and needs a password."
        )
    return doc


def extract_pdf_text(
    data: bytes,
    *,
    max_pages: int = MAX_PAGES,
    max_chars: int = DEFAULT_MAX_CHARS,
) -> PDFExtractionResult:
    """Extract selectable text using pypdf and then PyMuPDF per page.

    Empty/image-only pages are not errors. If an opened PDF has no machine-
    readable text, return unavailable with its page count rather than
    fabricating an error or performing OCR.
    """
    if not isinstance(data, bytes) or not data:
        raise PDFExtractionError(
            "invalid_input", "PDF data must be non-empty bytes."
        )
    if len(data) > MAX_FILE_BYTES:
        raise PDFExtractionError(
            "file_too_large", "PDF exceeds the 150 MB upload limit."
        )
    if b"%PDF-" not in data[:min(1024 * 1024, len(data))]:
        raise PDFExtractionError(
            "invalid_header", "The file has no PDF header in its first 1 MB."
        )
    if max_chars < 1 or max_pages < 1:
        raise ValueError("max_chars and max_pages must be positive integers")

    diagnostics: list[str] = []
    page_errors: dict[int, str] = {}
    fallback_pages: list[int] = []
    page_text: list[str] | None = None
    count: int | None = None
    engine = "pypdf"
    mu_doc = None

    # Avoid heavy pypdf decoding for large PDFs.
    if len(data) <= PYPDF_FILE_THRESHOLD:
        try:
            reader = _open_pypdf(data)
            count = len(reader.pages)
            if count > max_pages:
                raise PDFExtractionError(
                    "too_many_pages",
                    f"PDF has {count} pages; limit is {max_pages}.",
                )
            page_text = [""] * count
            for i in range(count):
                try:
                    page_text[i] = (
                        reader.pages[i].extract_text() or ""
                    ).strip()
                except Exception as exc:
                    page_errors[i + 1] = (
                        "pypdf: " + _error_summary(exc)
                    )
            diagnostics.append("pypdf opened document")
        except PDFExtractionError as exc:
            if exc.code in {"too_many_pages", "encrypted"}:
                raise
            diagnostics.append("pypdf: " + _error_summary(exc))
        except Exception as exc:
            diagnostics.append("pypdf: " + _error_summary(exc))

    # Try PyMuPDF if pypdf could not open the PDF or returned empty pages.
    if page_text is None or any(not t for t in page_text):
        try:
            mu_doc = _open_pymupdf(data)
            mu_count = len(mu_doc)
            if mu_count > max_pages:
                raise PDFExtractionError(
                    "too_many_pages",
                    f"PDF has {mu_count} pages; limit is {max_pages}.",
                )
            if count is not None and count != mu_count:
                diagnostics.append(
                    f"Page count mismatch: pypdf={count}, PyMuPDF={mu_count}"
                )
            count = mu_count
            if page_text is None:
                page_text = [""] * count
                engine = "PyMuPDF"
            elif len(page_text) != count:
                page_text = (page_text + [""] * count)[:count]

            for i in range(count):
                if page_text[i]:
                    continue
                try:
                    candidate = (
                        mu_doc[i].get_text("text", sort=True) or ""
                    ).strip()
                    if candidate:
                        page_text[i] = candidate
                        fallback_pages.append(i + 1)
                        page_errors.pop(i + 1, None)
                except Exception as exc:
                    page_errors[i + 1] = (
                        "PyMuPDF: " + _error_summary(exc)
                    )
            diagnostics.append("PyMuPDF fallback completed")
        except PDFExtractionError:
            raise
        except ImportError as exc:
            diagnostics.append("PyMuPDF is not installed")
            if page_text is None:
                raise PDFExtractionError(
                    "dependency_missing",
                    "Neither extraction engine could read this file.",
                ) from exc
        except Exception as exc:
            diagnostics.append(
                "PyMuPDF: " + _error_summary(exc)
            )
            if page_text is None:
                raise PDFExtractionError(
                    "unreadable_pdf",
                    "Both PDF readers failed to open this document.",
                ) from exc
        finally:
            if mu_doc is not None:
                mu_doc.close()

    if page_text is None or count is None:
        raise PDFExtractionError(
            "unreadable_pdf",
            "PDF could not be opened by either extraction engine.",
        )

    empty_pages = [
        i + 1 for i, t in enumerate(page_text) if not t
    ]
    pages_with_text = count - len(empty_pages)
    if fallback_pages and engine == "pypdf":
        engine = "pypdf+PyMuPDF"

    full_text = "\n\n".join(t for t in page_text if t)
    if len(full_text) > max_chars:
        full_text = full_text[:max_chars]
        diagnostics.append(f"Text truncated to max_chars={max_chars}")

    status = "extracted" if full_text.strip() else "unavailable"
    if status == "unavailable":
        diagnostics.append(
            "No selectable text found; OCR was not attempted"
        )

    return PDFExtractionResult(
        text=full_text,
        page_count=count,
        character_count=len(full_text),
        extraction_status=status,
        pages_with_text=pages_with_text,
        engine_used=engine,
        fallback_pages=fallback_pages,
        empty_pages=empty_pages,
        page_errors=page_errors,
        diagnostics=diagnostics,
    )
