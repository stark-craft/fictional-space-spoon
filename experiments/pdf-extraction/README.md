# Standalone PDF extraction diagnostic

An isolated Python experiment to investigate PDFs that upload successfully
but return empty text. It uses pypdf with a per-page PyMuPDF fallback.

**No OCR, no AI, no API calls, and no application modifications.**

This repository is public. **Never commit or upload private PDFs,
application source, credentials, or diagnostic text previews here.**

## Windows / PowerShell

Open PowerShell outside your main application folder, for example in
your home directory:

    cd $HOME
    git clone --branch test/pdf-extraction-2026-10-21 --single-branch https://github.com/stark-craft/fictional-space-spoon.git pdf-extraction-test
    cd .\pdf-extraction-test\experiments\pdf-extraction
    py --version
    py -m pip install -r requirements-dev.txt
    py -m pytest -q

Expected test result: six tests pass on generated PDFs.

Test a **local** PDF without printing its content:

    py diagnose_pdf.py "C:\path\to\YOUR-REPORT.pdf" --preview-chars 0

Do not copy the PDF into the repository and do not commit it.

## What the output means

- extraction_status: extracted, or unavailable if no selectable text was found
- page_count: page count even when an openable PDF has no selectable text
- character_count: length of returned text (up to the configured cap)
- pages_with_text: number of pages that produced selectable text
- engine_used: pypdf, PyMuPDF, or pypdf+PyMuPDF
- fallback_pages: 1-based page numbers where PyMuPDF supplied missing text
- empty_pages: 1-based page numbers that remained without text
- page_errors and diagnostics: clues about reader or page failures

An encrypted, corrupt, or unsupported PDF may produce an error and exit 2.
The default diagnostic output does **not** include the extracted PDF text.

## Next step

Share **only the JSON diagnostic result with no preview**. Compare it against
your application's earlier empty-text result. Then integrate a compatible
adapter into the current document parser in a reviewable feature branch.

This experiment does not include company application code or handle DOCX.
