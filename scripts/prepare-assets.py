from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parents[1]
photos = root / 'public/images/portfolio'
rows = []
for path in sorted(photos.glob('*.jpg')):
    name = path.stem.replace('-v4-adesivos-comerciais', '').replace('Envelopamento-Automotivo-', '').lower()
    with Image.open(path) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        width, height = image.size
        image.save(photos / (name + '.webp'), 'WEBP', quality=87, method=6)
        if width > 520:
            thumb = image.copy()
            thumb.thumbnail((520, 520))
            thumb.save(photos / (name + '-small.webp'), 'WEBP', quality=83, method=6)
    if 'ambientacao' in name or name in ['galeria-01', 'galeria-03']:
        category, section = 'Ambientação comercial', 'Portfólio / serviços'
    elif 'ambulancia' in name or name == 'galeria-05':
        category, section = 'Ambulâncias', 'Portfólio'
    elif 'kombi' in name:
        category, section = 'Kombis', 'Portfólio'
    elif 'cacamba' in name or 'je-lateral' in name:
        category, section = 'Utilitários com caçamba', 'Portfólio / serviços'
    elif 'carros-pequenos' in name:
        category, section = 'Carros', 'Portfólio'
    elif 'bau-0' in name or name == 'galeria-04':
        category, section = 'Caminhões', 'Portfólio / hero' if 'bau-01' in name else 'Portfólio'
    elif 'bau' in name or 'fiorino' in name:
        category, section = 'Utilitários com baú', 'Portfólio'
    else:
        category, section = 'Vans', 'Portfólio'
    if name == 'salus-3-van-10':
        section = 'Portfólio / apresentação da V4'
    rows.append([name + '.webp', 'https://v4adesivos.com.br/wp-content/uploads/2024/08/' + path.name, category, f'{width} × {height}', section])
doc = '# Imagens reais da V4 Adesivos\n\n'
doc += 'Origem: site oficial e páginas internas da V4. Uso nesta demonstração solicitado pelo usuário. A publicação permanece privada. Não foi identificada licença aberta: a reutilização pública das fotos deve ser confirmada com a V4. Não há imagens de IA, bancos genéricos, alterações de marcas nem montagens.\n\n'
doc += 'Os JPG originais ficam em `public/images/portfolio/`; os WebP mantêm o enquadramento e não ampliam a resolução. Variantes `-small.webp` têm até 520 px. Algumas fotos de `galeria-*` e as duas versões de `van-instituto-*` se repetem; não são contadas como trabalhos diferentes na seleção.\n\n'
doc += '| Arquivo otimizado | URL original | Categoria | Resolução | Uso |\n|---|---|---|---|---|\n'
doc += '\n'.join('| ' + ' | '.join(row) + ' |' for row in rows)
doc += '\n\n## Marca\n\n`public/images/logo-v4.png`: https://v4adesivos.com.br/wp-content/uploads/2022/08/logo-v4-adesivos-comerciais-110px.png . Marca original, sem alteração.\n'
(root / 'IMAGENS.md').write_text(doc, encoding='utf-8')
print(json.dumps({'photos': len(rows), 'source': str(photos), 'webp_bytes': sum(p.stat().st_size for p in photos.glob('*.webp'))}))
