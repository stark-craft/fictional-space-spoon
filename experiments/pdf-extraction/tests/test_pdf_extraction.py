from io import BytesIO

import pytest
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas

from pdf_extraction import PDFExtractionError, extract_pdf_text


def sample_pdf(text_pages):
    output = BytesIO()
    pdf_canvas = canvas.Canvas(output)
    for text in text_pages:
        if text:
            pdf_canvas.drawString(72, 720, text)
        pdf_canvas.showPage()
    pdf_canvas.save()
    return output.getvalue()


def test_text_extraction_and_page_count():
    pdf = sample_pdf(["Readable PDF text", "Another readable page"])
    result = extract_pdf_text(pdf)
    assert result.page_count == 2
    assert result.pages_with_text == 2
    assert result.extraction_status == "extracted"
    assert "Another readable page" in result.text
    assert result.character_count == len(result.text)


def test_empty_page_does_not_erase_other_pages():
    result = extract_pdf_text(
        sample_pdf(["First page", None, "Third page"])
    )
    assert result.page_count == 3
    assert result.pages_with_text == 2
    assert result.empty_pages == [2]
    assert result.extraction_status == "extracted"


def test_no_text_retains_page_count():
    result = extract_pdf_text(sample_pdf([None, None]))
    assert result.page_count == 2
    assert result.extraction_status == "unavailable"
    assert result.character_count == 0


def test_invalid_pdf_bytes():
    with pytest.raises(PDFExtractionError, match="no PDF header"):
        extract_pdf_text(b"not a pdf")


def test_page_limit():
    with pytest.raises(PDFExtractionError) as error:
        extract_pdf_text(
            sample_pdf(["first", "second"]),
            max_pages=1,
        )
    assert error.value.code == "too_many_pages"


def test_password_protected_pdf():
    reader = PdfReader(
        BytesIO(sample_pdf(["secret text"]))
    )
    writer = PdfWriter()
    writer.append_pages_from_reader(reader)
    writer.encrypt("testpassword")
    output = BytesIO()
    writer.write(output)
    with pytest.raises(PDFExtractionError) as error:
        extract_pdf_text(output.getvalue())
    assert error.value.code == "encrypted"
