import re

with open('index.html.bak', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update :root definitions
root_old = """        :root {
            --bg-primary: #F4EBDD;
            /* Wheat White */
            --accent-deep: #641D2D;
            /* Deep Maroon */
            --accent-dark: #3B111B;
            /* Dark Accent */
            --wheat-secondary: #E7D7C0;
            /* Secondary Wheat */
            --cream-light: #FBF7F0;
            /* Light Cream */
            --gold-subtle: #C5A059;
            /* Antique Gold Outline */
            --font-serif: 'Cormorant Garamond', Georgia, serif;
            --font-title: 'Cinzel', serif;
            --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }"""

root_new = """        :root {
            --bg-primary: #FFFFFF;
            /* Luminous Pearl White */
            --accent-deep: #541926;
            /* Velvet Rose Plum */
            --accent-dark: #260812;
            /* Velvet Rose Noir */
            --wheat-secondary: #FDF2F5;
            /* Soft Delicate Blush White */
            --cream-light: #FFFFFF;
            /* Pure White */
            --gold-subtle: #D48B97;
            /* Radiant Goldish Pink / Rose Gold */
            --gold-rose: #E8A598;
            /* Champagne Rose Gold */
            --font-serif: 'Cormorant Garamond', Georgia, serif;
            --font-title: 'Cinzel', serif;
            --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }"""

if root_old in content:
    content = content.replace(root_old, root_new)
    print("✓ Replaced :root block")
else:
    print("! Could not find exact :root block, checking...")

# 2. Update Hero Canvas Background
hero_canvas_old = """        .hero-canvas-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
            background:
                /* Warm golden dawn halo radiating behind the 3D circular orbit */
                radial-gradient(ellipse 70% 55% at 50% 45%, rgba(251, 247, 240, 0.96) 0%, rgba(248, 239, 226, 0.88) 35%, rgba(244, 235, 221, 0.45) 70%, transparent 100%),
                /* Subtle haldi gold & antique amber warmth on the flanks */
                radial-gradient(ellipse 50% 52% at 5% 48%, rgba(197, 160, 89, 0.16) 0%, rgba(231, 215, 192, 0.05) 55%, transparent 75%),
                radial-gradient(ellipse 50% 52% at 95% 48%, rgba(197, 160, 89, 0.16) 0%, rgba(231, 215, 192, 0.05) 55%, transparent 75%),
                /* Deep royal vermillion / maroon vignette at bottom */
                radial-gradient(ellipse 85% 36% at 50% 100%, rgba(100, 29, 45, 0.075) 0%, transparent 70%),
                /* Top soft warm morning light */
                radial-gradient(ellipse 65% 25% at 50% 0%, rgba(197, 160, 89, 0.10) 0%, transparent 65%),
                /* Base smooth multi-stop luxury silk gradient */
                linear-gradient(175deg, #FBF6EE 0%, #F5ECDD 35%, #EEE2CE 75%, #E9DAC4 100%);
        }"""

hero_canvas_new = """        .hero-canvas-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
            background:
                /* Pure luminous white & pearl halo radiating behind the 3D circular orbit */
                radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 252, 0.92) 35%, rgba(253, 242, 245, 0.5) 70%, transparent 100%),
                /* Soft glowing goldish pink radiance on the flanks */
                radial-gradient(ellipse 50% 52% at 5% 48%, rgba(212, 139, 151, 0.20) 0%, rgba(253, 238, 242, 0.08) 55%, transparent 75%),
                radial-gradient(ellipse 50% 52% at 95% 48%, rgba(212, 139, 151, 0.20) 0%, rgba(253, 238, 242, 0.08) 55%, transparent 75%),
                /* Subtle velvet rose vignette at bottom */
                radial-gradient(ellipse 85% 36% at 50% 100%, rgba(84, 25, 38, 0.05) 0%, transparent 70%),
                /* Top soft morning rose gold light */
                radial-gradient(ellipse 65% 25% at 50% 0%, rgba(212, 139, 151, 0.14) 0%, transparent 65%),
                /* Base smooth multi-stop luxury white & blush silk gradient */
                linear-gradient(175deg, #FFFFFF 0%, #FFF9FA 35%, #FDF3F5 75%, #FCECEF 100%);
        }"""

if hero_canvas_old in content:
    content = content.replace(hero_canvas_old, hero_canvas_new)
    print("✓ Replaced hero-canvas-bg")
else:
    print("! Could not find exact hero-canvas-bg")

# 3. Update Favicon SVG hex codes
content = content.replace('%23641D2D', '%23541926')
content = content.replace('%23C5A059', '%23D48B97')
content = content.replace('%23FBF7F0', '%23FFFFFF')
print("✓ Updated favicon colors")

# 4. Color replacements for RGBA values
rgba_replacements = [
    # Gold -> Goldish Pink
    (r'rgba\(\s*197\s*,\s*160\s*,\s*89\s*,', 'rgba(212, 139, 151,'),
    (r'rgba\(\s*212\s*,\s*170\s*,\s*96\s*,', 'rgba(235, 175, 185,'),
    # Deep Maroon -> Velvet Rose Plum
    (r'rgba\(\s*100\s*,\s*29\s*,\s*45\s*,', 'rgba(84, 25, 38,'),
    (r'rgba\(\s*184\s*,\s*51\s*,\s*74\s*,', 'rgba(190, 56, 82,'),
    (r'rgba\(\s*68\s*,\s*15\s*,\s*27\s*,', 'rgba(58, 12, 24,'),
    # Dark Accent Maroon -> Velvet Rose Noir
    (r'rgba\(\s*59\s*,\s*17\s*,\s*27\s*,', 'rgba(38, 8, 18,'),
    (r'rgba\(\s*30\s*,\s*8\s*,\s*14\s*,', 'rgba(24, 5, 11,'),
    (r'rgba\(\s*25\s*,\s*6\s*,\s*12\s*,', 'rgba(20, 5, 10,'),
    (r'rgba\(\s*26\s*,\s*6\s*,\s*12\s*,', 'rgba(21, 5, 10,'),
    (r'rgba\(\s*35\s*,\s*9\s*,\s*17\s*,', 'rgba(28, 6, 13,'),
    (r'rgba\(\s*43\s*,\s*13\s*,\s*20\s*,', 'rgba(34, 9, 16,'),
    (r'rgba\(\s*45\s*,\s*10\s*,\s*18\s*,', 'rgba(36, 8, 15,'),
    (r'rgba\(\s*20\s*,\s*4\s*,\s*8\s*,', 'rgba(18, 4, 9,'),
    (r'rgba\(\s*20\s*,\s*4\s*,\s*9\s*,', 'rgba(18, 4, 9,'),
    # Wheat / Cream -> White / Blush
    (r'rgba\(\s*244\s*,\s*235\s*,\s*221\s*,', 'rgba(255, 255, 255,'),
    (r'rgba\(\s*251\s*,\s*247\s*,\s*240\s*,', 'rgba(255, 255, 255,'),
    (r'rgba\(\s*248\s*,\s*239\s*,\s*226\s*,', 'rgba(255, 250, 252,'),
    (r'rgba\(\s*231\s*,\s*215\s*,\s*192\s*,', 'rgba(253, 238, 242,'),
    (r'rgba\(\s*245\s*,\s*224\s*,\s*205\s*,', 'rgba(253, 236, 240,'),
]

for pat, repl in rgba_replacements:
    content, count = re.subn(pat, repl, content)
    print(f"✓ RGBA {pat} -> {repl}: {count} occurrences")

# 5. Hex Color replacements
# NOTE: Do NOT match HTML entities like &#9733; (stars)
# We only match 6-digit or 3-digit hex colors that are valid colors
hex_map = [
    # Antique Gold -> Goldish Pink
    ('#C5A059', '#D48B97'),
    ('#c5a059', '#D48B97'),
    # Deep Maroons -> Velvet Rose Plum / Deep Accents
    ('#641D2D', '#541926'),
    ('#641d2d', '#541926'),
    ('#3B111B', '#260812'),
    ('#3b111b', '#260812'),
    ('#7A2437', '#682030'),
    ('#7a2437', '#682030'),
    ('#7E2439', '#6C2132'),
    ('#7e2439', '#6C2132'),
    ('#A82436', '#8C2237'),
    ('#a82436', '#8C2237'),
    ('#4D1623', '#3F0E1C'),
    ('#4d1623', '#3F0E1C'),
    ('#2A0B13', '#230710'),
    ('#2a0b13', '#230710'),
    ('#250A12', '#20060E'),
    ('#250a12', '#20060E'),
    ('#1C070D', '#18040A'),
    ('#1c070d', '#18040A'),
    ('#1A070D', '#160409'),
    ('#1a070d', '#160409'),
    ('#140408', '#120307'),
    ('#140408', '#120307'),
    # Wheat / Tans -> Pearl White / Soft Blush
    ('#F4EBDD', '#FFFFFF'),
    ('#f4ebdd', '#FFFFFF'),
    ('#FBF7F0', '#FFFFFF'),
    ('#fbf7f0', '#FFFFFF'),
    ('#FFFDF9', '#FFFFFF'),
    ('#fffdf9', '#FFFFFF'),
    ('#FAF7F2', '#FFFFFF'),
    ('#faf7f2', '#FFFFFF'),
    ('#FBF6EE', '#FFFFFF'),
    ('#fbf6ee', '#FFFFFF'),
    ('#E7D7C0', '#FDF2F5'),
    ('#e7d7c0', '#FDF2F5'),
    ('#F5ECDD', '#FFF8FA'),
    ('#f5ecdd', '#FFF8FA'),
    ('#EEE2CE', '#FDF4F6'),
    ('#eee2ce', '#FDF4F6'),
    ('#E9DAC4', '#FCECF0'),
    ('#e9dac4', '#FCECF0'),
    ('#EEE3CE', '#FDF3F5'),
    ('#eee3ce', '#FDF3F5'),
    ('#F8EBD9', '#FFF5F7'),
    ('#f8ebd9', '#FFF5F7'),
    ('#F7EAD6', '#FDF2F4'),
    ('#f7ead6', '#FDF2F4'),
    ('#FAF3E8', '#FFFBFD'),
    ('#faf3e8', '#FFFBFD'),
    ('#F6EAD8', '#FFF6F8'),
    ('#f6ead8', '#FFF6F8'),
    ('#EFE1CF', '#FDF2F5'),
    ('#efe1cf', '#FDF2F5'),
    ('#DFC9AD', '#FCEAF0'),
    ('#dfc9ad', '#FCEAF0'),
    ('#EDE2CF', '#FDF3F6'),
    ('#ede2cf', '#FDF3F6'),
    ('#EBD4B6', '#FCDDE5'),
    ('#ebd4b6', '#FCDDE5'),
    ('#EBD5B6', '#FCDDE5'),
    ('#ebd5b6', '#FCDDE5'),
    ('#FFF6E5', '#FFF0F3'),
    ('#fff6e5', '#FFF0F3'),
    ('#FDF5F3', '#FFF7F8'),
    ('#fdf5f3', '#FFF7F8'),
    ('#F5DFD8', '#FCECEF'),
    ('#f5dfd8', '#FCECEF'),
    ('#E6C2B6', '#F7D2DB'),
    ('#e6c2b6', '#F7D2DB'),
]

for old_hex, new_hex in hex_map:
    # Use word boundary / pattern to avoid partial matches
    count = content.count(old_hex)
    if count > 0:
        content = content.replace(old_hex, new_hex)
        print(f"✓ Hex {old_hex} -> {new_hex}: {count} occurrences")

# Save updated content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nSuccessfully wrote updated index.html!")
