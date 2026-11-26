# Génère le logo Anidex en SVG à partir d'une géométrie unique.
# Usage : python3 scripts/logo/gen-logo.py   (puis node scripts/logo/render-icons.mjs pour les PNG)
#
# - Repère : celui de l'image de référence du logo (panneau de ~620 × 1250 px).
# - Carte de l'Australie : contours Natural Earth déjà utilisés par l'appli (src/data/australiaMap.ts).
# - « ANIDEX » : contours des lettres de la police Inter ExtraBold (licence SIL OFL), extraits une fois
#   avec fontTools dans anidex-text.json, pour que le SVG ne dépende d'aucune police installée.
#
# Sorties : assets/logo/anidex-icon.svg (sans texte), assets/logo/anidex-logo.svg (avec « ANIDEX »),
# assets/logo/build/*.svg (variantes pour les PNG) et src/components/logoSvg.ts (pour l'appli).
import json, math, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
BG, CREAM, LEAF, LEAF2, VEIN = '#18452F', '#F5E9D3', '#7DAE4A', '#5E9A3A', '#3E7A2C'
CX = 312  # axe de symétrie

def ellipse(cx, cy, rx, ry, rot):
    # Doigt en forme d'œuf : bout large en haut (loin du coussinet), bout étroit en bas.
    def P(x, y): return f'{cx + x * rx:.1f} {cy + y * ry:.1f}'
    d = (f'M {P(0, -1)} C {P(0.6, -1)} {P(1, -0.62)} {P(1, -0.12)} '
         f'C {P(1, 0.45)} {P(0.52, 1)} {P(0, 1)} '
         f'C {P(-0.52, 1)} {P(-1, 0.45)} {P(-1, -0.12)} '
         f'C {P(-1, -0.62)} {P(-0.6, -1)} {P(0, -1)} Z')
    return f'<path d="{d}" transform="rotate({rot} {cx} {cy})"/>'

TOES = [(156, 509, 44, 71, -15), (253, 423, 46, 73, -6)]
TOES += [(2 * CX - x, y, rx, ry, -r) for x, y, rx, ry, r in TOES]

# Coussinet : dôme en haut, trois lobes arrondis en bas (moitié gauche, puis miroir).
def pad_path():
    left = [  # (c1, c2, point) en partant du sommet, vers la gauche
        ((262, 511), (228, 532), (205, 562)),
        ((178, 594), (148, 618), (148, 664)),
        ((148, 722), (190, 760), (234, 754)),
        ((252, 751), (264, 741), (279, 742)),
        ((292, 746), (300, 749), (CX, 749)),
    ]
    d = f'M {CX} 511 '
    for c1, c2, p in left: d += f'C {c1[0]} {c1[1]} {c2[0]} {c2[1]} {p[0]} {p[1]} '
    pts = [(CX, 511)] + [p for _, _, p in left]
    for i in range(len(left) - 1, -1, -1):
        c1, c2, p = left[i]; prev = pts[i]
        m = lambda q: (2 * CX - q[0], q[1])
        a, b, e = m(c2), m(c1), m(prev)
        d += f'C {a[0]} {a[1]} {b[0]} {b[1]} {e[0]} {e[1]} '
    return d + 'Z'

def leaf(base, tip, width, color):
    bx, by = base; tx, ty = tip
    mx, my = (bx + tx) / 2, (by + ty) / 2
    dx, dy = tx - bx, ty - by; n = math.hypot(dx, dy); px, py = -dy / n * width, dx / n * width
    shape = (f'<path fill="{color}" d="M {bx} {by} Q {mx + px:.1f} {my + py:.1f} {tx} {ty} '
             f'Q {mx - px:.1f} {my - py:.1f} {bx} {by} Z"/>')
    vx, vy = bx + dx * 0.82, by + dy * 0.82
    vein = f'<path d="M {bx + dx * 0.04:.1f} {by + dy * 0.04:.1f} L {vx:.1f} {vy:.1f}" stroke="{VEIN}" stroke-width="3" stroke-linecap="round" fill="none"/>'
    return shape + vein

LEAVES = [((162, 756), (34, 618), 62, LEAF), ((126, 690), (40, 522), 54, LEAF2)]
def leaves_svg():
    left = ''.join(leaf(b, t, w, c) for b, t, w, c in LEAVES)
    return f'<g>{left}</g><g transform="translate({2 * CX} 0) scale(-1 1)">{left}</g>'

def load_australia():
    src = open(f'{ROOT}/src/data/australiaMap.ts', encoding='utf8').read()
    size = re.search(r'width: (\d+),\s*height: (\d+)', src)
    order = re.findall(r"'(\w+)'", re.search(r'DRAW_ORDER[^=]*= \[([^\]]+)\]', src).group(1))
    paths = dict(re.findall(r"^  '?(\w+)'?: '(M[^']+)'", src[src.index('STATE_PATHS'):], re.M))
    return {'w': int(size.group(1)), 'h': int(size.group(2)), 'paths': [paths[k] for k in order]}

AUS = load_australia()
def australia(color):
    k = 0.545; x0, y0 = CX - AUS['w'] * k / 2 - 1, 559
    # Un seul tracé pour tous les États : pas de joint visible entre eux, quel que soit le moteur SVG.
    d = ' '.join(AUS['paths'])
    paths = f'<path d="{d}" fill="{color}" stroke="{color}" stroke-width="2.4" stroke-linejoin="round"/>'
    # Trait de la même couleur : masque les joints entre États (contour unique).
    return f'<g transform="translate({x0:.1f} {y0}) scale({k})">{paths}</g>'

def paw_svg(bg, cream, gap=12):
    toes = ''.join(ellipse(*t) for t in TOES)
    pad = f'<path d="{pad_path()}"/>'
    halo = f'<g fill="{bg}" stroke="{bg}" stroke-width="{gap * 2}" stroke-linejoin="round">{toes}{pad}</g>' if gap else ''
    return halo + f'<g fill="{cream}">{toes}{pad}</g>' + australia(bg)

def art(bg=BG, cream=CREAM, gap=12):
    return leaves_svg() + paw_svg(bg, cream, gap)

ART_BOX = (30, 340, 594, 760)  # x0, y0, x1, y1 du dessin (feuilles comprises)
TEXT = json.load(open(f'{HERE}/anidex-text.json'))
def text_svg(color, x_center, baseline, cap_px):
    k = cap_px / TEXT['cap']
    x = x_center - TEXT['width'] * k / 2
    return f'<path fill="{color}" transform="translate({x:.2f} {baseline}) scale({k:.5f})" d="{TEXT["d"]}"/>'

def fit(box_w, box_h, size, cx, cy):
    """Transforme ART_BOX pour qu'il tienne dans box_w × box_h, centré en (cx, cy)."""
    x0, y0, x1, y1 = ART_BOX; k = min(box_w / (x1 - x0), box_h / (y1 - y0))
    return f'translate({cx - (x0 + x1) / 2 * k:.2f} {cy - (y0 + y1) / 2 * k:.2f}) scale({k:.4f})', k

def svg(w, h, body, bg=None, title='Anidex'):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">'
            f'<title>{title}</title>{rect}{body}</svg>\n')

def icon(size=1024, art_w=0.80, bg=BG, transparent=False, mono=False):
    t, _ = fit(size * art_w, size * art_w, size, size / 2, size / 2)
    if mono:  # silhouette blanche (Android 13+, seul l'alpha compte) : découpes vraiment transparentes
        shapes = leaves_svg().replace(LEAF, '#fff').replace(LEAF2, '#fff').replace(VEIN, '#000') + paw_svg('#000', '#fff')
        body = (f'<defs><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="{size}" height="{size}">'
                f'<rect width="{size}" height="{size}" fill="#000"/><g transform="{t}">{shapes}</g></mask></defs>'
                f'<rect width="{size}" height="{size}" fill="#fff" mask="url(#m)"/>')
        return svg(size, size, body)
    return svg(size, size, f'<g transform="{t}">{art(bg)}</g>', None if transparent else bg)

def logo(w=1024, h=1024, bg=BG, transparent=False, text_color=CREAM):
    # Dessin en haut, « ANIDEX » dessous (proportions de l'image de référence).
    x0, y0, x1, y1 = ART_BOX
    total_h = (875 - y0)  # du haut du dessin à la ligne de base du texte
    k = min(w * 0.86 / (x1 - x0), h * 0.80 / total_h)
    ox, oy = w / 2 - (x0 + x1) / 2 * k, h / 2 - (y0 + 875) / 2 * k
    body = f'<g transform="translate({ox:.2f} {oy:.2f}) scale({k:.4f})">{art(bg)}{text_svg(text_color, CX, 872, 84)}</g>'
    return svg(w, h, body, None if transparent else bg, 'Anidex')

if __name__ == '__main__':
    out = f'{ROOT}/assets/logo'; build = f'{out}/build'
    os.makedirs(build, exist_ok=True)
    files = {
        f'{out}/anidex-icon.svg': icon(),                                  # icône (sans texte)
        f'{out}/anidex-logo.svg': logo(),                                  # logo avec « ANIDEX »
        f'{build}/icon-full.svg': icon(art_w=0.80),                        # icône iOS, favicon, PWA
        f'{build}/maskable.svg': icon(art_w=0.62),                         # PWA « maskable » (zone sûre 80 %)
        f'{build}/adaptive-fg.svg': icon(art_w=0.56, transparent=True),    # Android : premier plan (zone sûre 66 %)
        f'{build}/adaptive-bg.svg': svg(1024, 1024, '', BG),               # Android : fond
        f'{build}/mono.svg': icon(art_w=0.56, mono=True),                  # Android 13 : icône monochrome
        f'{build}/splash.svg': icon(art_w=0.92, transparent=True),         # écran de démarrage
    }
    for path, content in files.items(): open(path, 'w').write(content)
    # Pour l'appli (react-native-svg) : icône et logo complet, sur fond vert.
    mark = icon(art_w=0.86)
    full = logo(w=1024, h=1024)
    ts = ('// Fichier généré par scripts/logo/gen-logo.py — ne pas modifier à la main.\n'
          f'export const LOGO_COLORS = {json.dumps({"background": BG, "cream": CREAM, "leaf": LEAF})};\n'
          f'export const LOGO_MARK_SVG = {json.dumps(mark)};\n'
          f'export const LOGO_FULL_SVG = {json.dumps(full)};\n')
    open(f'{ROOT}/src/components/logoSvg.ts', 'w').write(ts)
    print('Logo généré :', ', '.join(os.path.relpath(p, ROOT) for p in files))
