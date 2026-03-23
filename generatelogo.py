import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patheffects as pe
from scipy.spatial import Delaunay
from shapely.geometry import Polygon, Point, MultiPolygon
import warnings
warnings.filterwarnings('ignore')

# ─────────────────────────────────────────────────────────────────────────────
# AFRICA OUTLINE (Mainland)
# ─────────────────────────────────────────────────────────────────────────────
africa_mainland = [
    (-5.9, 35.9), (-4.0, 35.7), (-2.0, 35.2), (0.0, 35.8), (2.5, 36.8), (5.0, 37.2), (7.5, 37.1), (9.5, 37.3), (10.5, 37.0), (11.5, 37.1),
    (12.5, 34.4), (13.5, 33.2), (14.0, 30.5), (15.0, 27.5), (15.5, 23.5), (20.0, 22.0), (25.0, 22.0), (30.0, 22.0), (33.0, 22.0), (34.0, 22.0),
    (36.0, 19.5), (37.5, 18.0), (37.5, 15.5), (39.5, 14.5), (41.5, 12.5), (42.5, 11.5), (43.5, 11.0), (44.5, 9.5), (46.0, 8.0), (48.5, 6.0),
    (50.5, 4.5), (51.5, 3.5), (51.3, 2.0), (50.5, 1.0), (44.5, -1.5), (42.0, -4.0), (40.5, -6.5), (40.0, -9.0), (39.5, -11.0), (36.5, -15.0),
    (35.5, -17.5), (35.0, -20.0), (34.5, -23.5), (35.5, -26.0), (32.5, -28.5), (30.5, -31.0), (28.0, -33.5), (26.5, -34.0), (25.0, -34.5),
    (22.5, -34.8), (20.0, -34.5), (18.5, -34.4), (17.5, -32.5), (16.5, -29.5), (15.5, -28.0), (12.5, -17.0), (12.0, -15.5), (12.0, -10.0),
    (12.5, -5.0), (11.5, -1.5), (9.5, 1.0), (8.5, 3.8), (6.0, 4.2), (3.5, 4.5), (1.5, 5.5), (0.0, 5.6), (-1.5, 5.1), (-3.0, 5.0), (-5.0, 4.8),
    (-7.5, 4.5), (-8.5, 4.6), (-10.5, 6.9), (-11.5, 8.5), (-13.0, 9.5), (-14.5, 10.5), (-15.0, 10.9), (-15.5, 11.5), (-16.5, 13.0), (-17.5, 14.7),
    (-17.2, 17.0), (-17.0, 20.0), (-16.5, 23.0), (-14.5, 23.5), (-13.5, 23.5), (-9.0, 27.7), (-8.7, 30.0), (-6.5, 33.0), (-5.9, 35.9)
]

madagascar = [
    (49.0, -12.0), (50.5, -13.5), (50.0, -16.0), (48.5, -20.0), (47.0, -24.0), (45.5, -25.5), (44.0, -25.0), (43.5, -22.0), (44.5, -18.0), (47.0, -14.0), (49.0, -12.0)
]

# Normalization
all_coords = np.array(africa_mainland + madagascar)
lon_min, lon_max = all_coords[:, 0].min() - 1, all_coords[:, 0].max() + 1
lat_min, lat_max = all_coords[:, 1].min() - 1, all_coords[:, 1].max() + 1

def normalize(lon, lat):
    x = (lon - lon_min) / (lon_max - lon_min)
    y = (lat - lat_min) / (lat_max - lat_min)
    return x, y

mainland_norm = [normalize(c[0], c[1]) for c in africa_mainland]
madagascar_norm = [normalize(c[0], c[1]) for c in madagascar]

mainland_poly = Polygon(mainland_norm)
madagascar_poly = Polygon(madagascar_norm)
africa_multipoly = MultiPolygon([mainland_poly, madagascar_poly])

# Interior Points
np.random.seed(42)
interior_pts = []
while len(interior_pts) < 550:
    px, py = np.random.uniform(0, 1), np.random.uniform(0, 1)
    if africa_multipoly.contains(Point(px, py)):
        interior_pts.append([px, py])

boundary_pts = []
for poly in [mainland_norm, madagascar_norm]:
    for i in range(len(poly) - 1):
        p1, p2 = poly[i], poly[i + 1]
        boundary_pts.append(list(p1))
        boundary_pts.append([(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2])

all_pts = np.array(interior_pts + boundary_pts)
tri = Delaunay(all_pts)

# Colors
GOLD        = '#C9922A'
GOLD_BRIGHT = '#FFD060'
BG          = '#1f2230'

# Precompute valid simplices and nodes
valid_simplices = []
node_set = set()
for simplex in tri.simplices:
    cen = all_pts[simplex].mean(axis=0)
    if africa_multipoly.contains(Point(cen[0], cen[1])):
        valid_simplices.append(simplex)
        for idx in simplex:
            node_set.add(idx)


def draw_map(ax, mx0, my0, mw, mh):
    """Draw the Africa mesh map on the given axes."""
    def tp(nx, ny):
        return mx0 + nx * mw, my0 + ny * mh

    for simplex in valid_simplices:
        pts = all_pts[simplex]
        px = [tp(p[0], p[1])[0] for p in pts] + [tp(pts[0][0], pts[0][1])[0]]
        py = [tp(p[0], p[1])[1] for p in pts] + [tp(pts[0][0], pts[0][1])[1]]
        ax.plot(px, py, color=GOLD, linewidth=0.3, alpha=0.5, zorder=5)

    for idx in node_set:
        px, py = tp(all_pts[idx][0], all_pts[idx][1])
        ax.plot(px, py, 'o', color=GOLD_BRIGHT, markersize=1.2, zorder=7)
        ax.plot(px, py, 'o', color=GOLD_BRIGHT, markersize=3.5, alpha=0.2, zorder=6)

    for poly in [mainland_norm, madagascar_norm]:
        axs = [tp(p[0], p[1])[0] for p in poly]
        ays = [tp(p[0], p[1])[1] for p in poly]
        for lw, al in [(5, 0.1), (2, 0.3), (0.8, 0.8)]:
            ax.plot(axs, ays, color=GOLD_BRIGHT, linewidth=lw, alpha=al, zorder=8)


# ═══════════════════════════════════════════════════════════════════════════════
# 1. MAP-ONLY LOGO (square, for loading screen / favicon)
# ═══════════════════════════════════════════════════════════════════════════════
fig_s = 10
fig1 = plt.figure(figsize=(fig_s, fig_s), facecolor=BG)
ax1 = fig1.add_axes([0, 0, 1, 1])
ax1.set_xlim(0, fig_s)
ax1.set_ylim(0, fig_s)
ax1.set_aspect('equal')
ax1.axis('off')

draw_map(ax1, mx0=1.0, my0=0.8, mw=8, mh=8.5)

out_map = 'client/assets/logo.png'
plt.savefig(out_map, dpi=200, bbox_inches='tight', facecolor=BG, pad_inches=0.3)
plt.close(fig1)
print(f"Saved map-only logo: {out_map}")


# ═══════════════════════════════════════════════════════════════════════════════
# 2. WIDE LOGO (text on LEFT, map on RIGHT)
# ═══════════════════════════════════════════════════════════════════════════════
fig_w, fig_h = 20, 8
fig2 = plt.figure(figsize=(fig_w, fig_h), facecolor=BG)
ax2 = fig2.add_axes([0, 0, 1, 1])
ax2.set_xlim(0, fig_w)
ax2.set_ylim(0, fig_h)
ax2.set_aspect('equal')
ax2.axis('off')

draw_map(ax2, mx0=12.0, my0=0.3, mw=6.5, mh=7.4)

# "The Real" on top line, "Africa" on bottom — LEFT side, stretched wide
tx = 1.2
ax2.text(
    tx, 5.2, "The Real",
    fontsize=72, color=GOLD, fontfamily='sans-serif',
    fontweight='bold', fontstyle='italic',
    ha='left', va='center', zorder=10,
    transform=ax2.transData,
    path_effects=[pe.withStroke(linewidth=1.5, foreground=GOLD + '33')]
)

# Draw "AFRICA" with manually spaced letters for a stretched look
africa_letters = "A F R I C A"
ax2.text(
    tx, 3.0, africa_letters,
    fontsize=88, color=GOLD_BRIGHT, fontfamily='sans-serif',
    fontweight='bold', ha='left', va='center',
    zorder=10,
    path_effects=[pe.withStroke(linewidth=2, foreground='#ffffff22')]
)

# Decorative line under the text
ax2.plot([tx, tx + 9.5], [1.8, 1.8], color=GOLD, linewidth=1.5, alpha=0.5, zorder=9)
dot_r = 0.08
for dx in [0, 9.5]:
    circle = plt.Circle((tx + dx, 1.8), dot_r, color=GOLD_BRIGHT, zorder=10)
    ax2.add_patch(circle)

out_wide = 'client/assets/logo-wide.png'
plt.savefig(out_wide, dpi=200, bbox_inches='tight', facecolor=BG, pad_inches=0.4)
plt.close(fig2)
print(f"Saved wide logo: {out_wide}")
