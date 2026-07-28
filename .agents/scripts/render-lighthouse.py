from pathlib import Path
import fitz
pdf=Path('attached_assets/lighthouse_1785246261744.pdf')
out=Path('.agents/outputs/lighthouse-pages')
doc=fitz.open(pdf)
print('pages', doc.page_count)
print('metadata', doc.metadata)
for i,page in enumerate(doc):
    pix=page.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False)
    path=out/f'page-{i+1}.png'; pix.save(path)
    print(f'PAGE {i+1}\n{page.get_text("text")[:9000]}\n---')
