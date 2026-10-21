"""Run locally: py diagnose_pdf.py "C:\path\to\your.pdf"."""
import argparse
import json
from pathlib import Path

from pdf_extraction import PDFExtractionError, extract_pdf_text


def main():
    parser = argparse.ArgumentParser(
        description="Standalone PDF text extraction diagnostic (no OCR or AI)"
    )
    parser.add_argument("pdf", type=Path)
    parser.add_argument(
        "--preview-chars",
        type=int,
        default=0,
        help="Show first N text characters (default: 0, no PDF text displayed)",
    )
    args = parser.parse_args()

    try:
        result = extract_pdf_text(args.pdf.read_bytes())
        report = result.as_dict()
        report.pop("text")
        if args.preview_chars > 0:
            report["text_preview"] = result.text[:args.preview_chars]
        print(json.dumps(report, indent=2, ensure_ascii=False))
    except (PDFExtractionError, OSError) as exc:
        print(
            json.dumps(
                {
                    "error": str(exc),
                    "code": getattr(exc, "code", "file_error"),
                },
                indent=2,
            )
        )
        raise SystemExit(2)


if __name__ == "__main__":
    main()
