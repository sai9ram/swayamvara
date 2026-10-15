import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

inline_style_matches = []
svg_matches = []

for idx, line in enumerate(lines, 1):
    # Check for style attributes with colors
    if 'style=' in line:
        if any(c in line for c in ['#', 'rgb', 'var(--']):
            inline_style_matches.append((idx, line.strip()))
    # Check for SVG attributes stroke or fill with hex/rgb
    if any(attr in line for attr in ['stroke="', 'fill="', 'stroke=\'', 'fill=\'']):
        if any(c in line for c in ['#', 'rgb']):
            svg_matches.append((idx, line.strip()))

print(f"\nInline styles with colors: {len(inline_style_matches)}")
for idx, line in inline_style_matches[:25]:
    print(f"L{idx}: {line[:120]}")

print(f"\nSVG stroke/fill with colors: {len(svg_matches)}")
for idx, line in svg_matches[:25]:
    print(f"L{idx}: {line[:120]}")
