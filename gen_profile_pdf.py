#!/usr/bin/env python3
"""Vardhini Vastu — Company Profile PDF Generator (vv2 Design System)"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os, sys

W, H = A4  # 595.27 x 841.89 pt

# vv2 colour palette
BG   = colors.HexColor('#fafaf9')
SF   = colors.HexColor('#ffffff')
BD   = colors.HexColor('#e7e5e0')
TX   = colors.HexColor('#0c0a09')
TX2  = colors.HexColor('#57534e')
TX3  = colors.HexColor('#a8a29e')
OR   = colors.HexColor('#ea580c')
ORL  = colors.HexColor('#fff7ed')
ORM  = colors.HexColor('#fed7aa')
DK   = colors.HexColor('#0c0a09')
DK2  = colors.HexColor('#161412')
DK3  = colors.HexColor('#1c1917')
DK4  = colors.HexColor('#292524')
WHITE = colors.HexColor('#ffffff')

MARGIN = 48
COL = W - 2 * MARGIN

# Register Arial (supports ₹ ™ ★ on Windows)
FONT_DIR = r'C:\Windows\Fonts'
try:
    pdfmetrics.registerFont(TTFont('VV',  os.path.join(FONT_DIR, 'arial.ttf')))
    pdfmetrics.registerFont(TTFont('VVB', os.path.join(FONT_DIR, 'arialbd.ttf')))
    pdfmetrics.registerFont(TTFont('VVI', os.path.join(FONT_DIR, 'ariali.ttf')))
    F, FB, FI = 'VV', 'VVB', 'VVI'
    print("Using Arial TTF fonts")
except Exception as e:
    F, FB, FI = 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique'
    print(f"Fallback to Helvetica: {e}")


# ─────────────── helpers ────────────────────────────────────────────────────

def wrap(c, text, x, y, max_w, font=None, size=10, col=None, lh=14, align='left'):
    """Wrap and draw text. Returns y after last line."""
    fn = font or F
    cl = col or TX
    c.setFont(fn, size)
    c.setFillColor(cl)
    words = text.split()
    lines, cur = [], []
    for w in words:
        test = ' '.join(cur + [w])
        if c.stringWidth(test, fn, size) <= max_w:
            cur.append(w)
        else:
            if cur:
                lines.append(' '.join(cur))
            cur = [w]
    if cur:
        lines.append(' '.join(cur))
    cy = y
    for line in lines:
        if align == 'center':
            c.drawCentredString(x + max_w / 2, cy, line)
        elif align == 'right':
            c.drawRightString(x + max_w, cy, line)
        else:
            c.drawString(x, cy, line)
        cy -= lh
    return cy


def rr(c, x, y, w, h, r=8, fill=None, stroke=None, sw=0.5):
    """Draw rounded rect."""
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill else 0, stroke=1 if stroke else 0)


def txt(c, text, x, y, font=None, size=10, col=None, align='left'):
    c.setFont(font or F, size)
    c.setFillColor(col or TX)
    if align == 'center':
        c.drawCentredString(x, y, text)
    elif align == 'right':
        c.drawRightString(x, y, text)
    else:
        c.drawString(x, y, text)


def eyebrow(c, label, y):
    txt(c, label, MARGIN, y, font=FB, size=7.5, col=OR)


def h1(c, text, y, col=None):
    txt(c, text, MARGIN, y, font=FB, size=28, col=col or TX)


def divider(c, y, col=None):
    c.setFillColor(col or BD)
    c.rect(0, y, W, 0.6, fill=1, stroke=0)


def footer(c, page, total=7):
    divider(c, 26, BD)
    txt(c, 'VARDHINI VASTU  ·  vardhinivastu.in  ·  +91 97391 05574',
        MARGIN, 14, font=F, size=7.5, col=TX3)
    txt(c, f'{page} / {total}', W - MARGIN, 14, font=F, size=7.5, col=TX3, align='right')


def badge_pill(c, x, y, label, bg=DK3, fg=TX3):
    pw = c.stringWidth(label, F, 7.5) + 20
    rr(c, x, y - 5, pw, 18, r=9, fill=bg)
    txt(c, label, x + 10, y + 2, font=F, size=7.5, col=fg)
    return x + pw + 8


# ─────────────── page 1 : cover ─────────────────────────────────────────────

def page1(c):
    # Full dark bg
    c.setFillColor(DK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Orange top bar
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    # Brand name
    txt(c, 'VARDHINI VASTU', MARGIN, H - 68, font=FB, size=34, col=WHITE)
    txt(c, 'vardhinivastu.in', MARGIN, H - 88, font=F, size=11, col=TX3)

    # VIDS badge
    bx, by = MARGIN, H - 122
    rr(c, bx, by, 210, 21, r=10, fill=DK3)
    c.setFillColor(OR)
    c.circle(bx + 13, by + 10.5, 4, fill=1, stroke=0)
    txt(c, 'VIDS™  SCIENTIFIC  METHODOLOGY', bx + 24, by + 7,
        font=FB, size=7.5, col=TX3)

    # Main headline
    txt(c, 'Scientific Vastu Consulting', MARGIN, H - 168, font=FB, size=27, col=WHITE)
    txt(c, 'Zero Demolition. Real Results.', MARGIN, H - 200, font=FB, size=27, col=OR)

    # Description
    desc = ('Vardhini Vastu is Bangalore’s leading scientific Vastu consultancy. '
            'Founded by Raghavendra Hebbur, we apply the proprietary VIDS™ methodology '
            '— combining classical Vastu Shastra with modern instrumentation — to bring '
            'measurable positive energy to homes, offices, factories, and commercial spaces. '
            'Every recommendation is zero-demolition and backed by a written report.')
    wrap(c, desc, MARGIN, H - 236, COL - 40, font=F, size=10.5, col=TX3, lh=16)

    # Separator
    c.setFillColor(DK4)
    c.rect(MARGIN, H - 298, COL, 0.6, fill=1, stroke=0)

    # Stats 4-col
    sy = H - 334
    sw = COL / 4
    stats = [('3,200+', 'Consultations'), ('18+', 'Years Experience'),
             ('620+', 'Properties'), ('★ 5.0', 'Google Rating')]
    for i, (num, lbl) in enumerate(stats):
        sx = MARGIN + i * sw + sw / 2
        txt(c, num, sx, sy, font=FB, size=22, col=WHITE, align='center')
        txt(c, lbl, sx, sy - 17, font=F, size=8.5, col=TX3, align='center')

    # Separator
    c.setFillColor(DK4)
    c.rect(MARGIN, H - 368, COL, 0.6, fill=1, stroke=0)

    # Trust pills
    px = MARGIN
    py = H - 392
    for item in ['✓ Zero Demolition', '✓ VIDS™ Method',
                 '✓ Lecher Antenna', '✓ Written Report', '✓ 18+ Years']:
        px = badge_pill(c, px, py, item, bg=DK3, fg=TX3)

    # Decorative large bg text
    c.setFillColor(colors.HexColor('#111009'))
    c.setFont(FB, 110)
    c.drawString(MARGIN - 8, 68, 'VASTU')

    # Bottom contact strip
    c.setFillColor(DK2)
    c.rect(0, 0, W, 50, fill=1, stroke=0)
    txt(c, 'WhatsApp / Call', MARGIN, 34, font=FB, size=8.5, col=OR)
    txt(c, '+91 97391 05574  ·  Info@vardhinivastu.in  ·  Bangalore, India',
        MARGIN, 18, font=F, size=8.5, col=WHITE)
    txt(c, 'Google Rating', W - MARGIN, 34, font=FB, size=8.5, col=OR, align='right')
    txt(c, '★ 5.0 / 5.0  (248 reviews)', W - MARGIN, 18, font=F, size=8.5,
        col=WHITE, align='right')


# ─────────────── page 2 : about ─────────────────────────────────────────────

def page2(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    eyebrow(c, 'ABOUT THE CONSULTANT', H - 54)
    h1(c, 'Raghavendra Hebbur', H - 88)
    txt(c, 'Lead Vastu Consultant & Founder, Vardhini Vastu',
        MARGIN, H - 108, font=F, size=11, col=TX2)
    # accent line
    c.setFillColor(OR)
    c.rect(MARGIN, H - 120, 56, 2, fill=1, stroke=0)

    bio = ('With over 18 years of professional practice, Raghavendra Hebbur has established '
           'himself as one of India’s most trusted scientific Vastu consultants. His approach '
           'bridges the gap between ancient Vastu Shastra wisdom and modern instrumentation, '
           'delivering results that are measurable, practical, and completely free of demolition.')
    y = wrap(c, bio, MARGIN, H - 148, COL, font=F, size=10.5, col=TX2, lh=16)

    # Credentials box
    box_y = y - 20
    box_h = 198
    rr(c, MARGIN, box_y - box_h, COL, box_h, r=10, fill=ORL, stroke=ORM, sw=0.7)

    creds = [
        ('18+ Years',       'Professional Vastu practice spanning residential, commercial & industrial sectors'),
        ('3,200+',          'Consultations completed across Bangalore, India, and international clients'),
        ('Classical',       'Trained in Vastu Shastra — precise 16-zone compass-based analysis methodology'),
        ('Certified',       'Lecher Antenna practitioner for scientific geopathic stress detection'),
        ('Global Reach',    'NRI clients served in USA, UK, UAE, Singapore & Australia (online)'),
        ('Media Featured',  'Covered by Times of India and India’s leading real estate publications'),
    ]
    cy = box_y - 28
    for num, desc in creds:
        nw = c.stringWidth(num, FB, 10.5)
        txt(c, num, MARGIN + 16, cy, font=FB, size=10.5, col=OR)
        txt(c, desc, MARGIN + 16 + nw + 10, cy, font=F, size=9, col=TX2)
        cy -= 28

    # Google rating callout
    gy = box_y - box_h - 22
    rr(c, MARGIN, gy - 48, COL, 48, r=8, fill=DK)
    txt(c, '★ 5.0 / 5.0', MARGIN + 18, gy - 20, font=FB, size=20, col=OR)
    txt(c, 'Google Business Rating', MARGIN + 126, gy - 20, font=F, size=10, col=WHITE)
    txt(c, '248 verified reviews  ·  Residential · Commercial · Industrial · Online',
        MARGIN + 126, gy - 35, font=F, size=8, col=TX3)

    footer(c, 2)


# ─────────────── page 3 : services ──────────────────────────────────────────

def page3(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    eyebrow(c, 'SERVICES', H - 54)
    h1(c, 'Our Consultation Services', H - 88)
    txt(c, 'End-to-end scientific Vastu solutions for every property type.',
        MARGIN, H - 108, font=F, size=11, col=TX2)

    services = [
        ('RES', 'Residential Vastu',
         'Apartments, villas, row houses & plots. Full 16-zone compass analysis with detailed written report.',
         '₹15,000'),
        ('COM', 'Commercial Vastu',
         'Offices, retail spaces, showrooms & co-working. Energy mapping for business productivity.',
         '₹51,000+'),
        ('IND', 'Industrial Vastu',
         'Factories, warehouses, manufacturing plants & IT parks. Production-flow optimisation.',
         '₹51,000+'),
        ('WEB', 'Online Consultation',
         'Floor plan analysis + video call. Available worldwide for NRI and outstation clients.',
         '₹5,000'),
        ('RPT', 'Pre-Purchase Report',
         'Vastu assessment before buying a plot or property. Avoid problematic sites early.',
         '₹5,000'),
        ('SCI', 'Lecher Antenna Scan',
         'Scientific geopathic stress mapping using Lecher Antenna instrumentation.',
         'Included'),
    ]

    cw = (COL - 14) / 2
    ch = 112
    gap = 14
    sy = H - 142

    for i, (icon, title, desc, price) in enumerate(services):
        col = i % 2
        row = i // 2
        cx = MARGIN + col * (cw + gap)
        cy = sy - row * (ch + gap)

        rr(c, cx, cy - ch, cw, ch, r=8, fill=SF, stroke=BD, sw=0.5)

        # icon badge
        rr(c, cx + 12, cy - 32, 30, 20, r=6, fill=ORL)
        txt(c, icon, cx + 27, cy - 26, font=FB, size=6.5, col=OR, align='center')

        txt(c, title, cx + 50, cy - 24, font=FB, size=11, col=TX)
        wrap(c, desc, cx + 12, cy - 50, cw - 24, font=F, size=8.5, col=TX2, lh=13)
        txt(c, price, cx + 12, cy - ch + 18, font=FB, size=11, col=OR)

    footer(c, 3)


# ─────────────── page 4 : VIDS methodology ──────────────────────────────────

def page4(c):
    # Split: left dark / right light
    c.setFillColor(DK)
    c.rect(0, 0, W / 2, H, fill=1, stroke=0)
    c.setFillColor(BG)
    c.rect(W / 2, 0, W / 2, H, fill=1, stroke=0)
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    # ── LEFT ──────────────────────────────────────────────────────
    LM  = MARGIN
    LCW = W / 2 - MARGIN - 20

    txt(c, 'METHODOLOGY', LM, H - 54, font=FB, size=7.5, col=OR)
    txt(c, 'VIDS™', LM, H - 86, font=FB, size=30, col=WHITE)
    txt(c, 'Vastu Integral Diagnostic System', LM, H - 108, font=F, size=10, col=TX3)
    y = wrap(c, 'Our proprietary 4-step framework combining classical Vastu Shastra '
             'with modern instrumentation — delivering results without a single brick removed.',
             LM, H - 134, LCW, font=F, size=9, col=TX3, lh=14)

    # Quote box
    qy = y - 18
    rr(c, LM, qy - 56, LCW, 56, r=6, fill=DK3)
    txt(c, '“', LM + 12, qy - 10, font=FB, size=28, col=ORM)
    wrap(c, 'No walls need to be broken. No construction required. '
         'VIDS™ delivers results through intelligent remedies alone.',
         LM + 14, qy - 28, LCW - 28, font=FI, size=8.5, col=WHITE, lh=13)

    # VIDS steps
    vids = [
        ('V', 'Vastu Shastra',   'Classical 16-zone analysis, compass-accurate'),
        ('I', 'Instrumentation', 'Lecher Antenna & geopathic stress detection'),
        ('D', 'Diagnosis',       'Zone-by-zone mapping, blockage identification'),
        ('S', 'Solutions',       'Zero-demolition remedies: colour, furniture, yantras'),
    ]
    step_y = qy - 84
    for letter, title, desc in vids:
        c.setFillColor(OR)
        c.circle(LM + 16, step_y + 5, 14, fill=1, stroke=0)
        txt(c, letter, LM + 16, step_y, font=FB, size=14, col=WHITE, align='center')
        txt(c, title,  LM + 38, step_y + 6, font=FB, size=11, col=WHITE)
        txt(c, desc,   LM + 38, step_y - 8, font=F,  size=8.5, col=TX3)

        # connecting line
        if letter != 'S':
            c.setStrokeColor(DK4)
            c.setLineWidth(0.7)
            c.line(LM + 16, step_y - 10, LM + 16, step_y - 32)
        step_y -= 52

    # ── RIGHT ────────────────────────────────────────────────────
    RM  = W / 2 + 24
    RCW = W / 2 - 48

    txt(c, 'WHY VARDHINI VASTU', RM, H - 54, font=FB, size=7.5, col=OR)
    wrap(c, 'Key Differentiators', RM, H - 88, RCW, font=FB, size=22, col=TX, lh=28)

    diffs = [
        ('Zero Demolition',
         'All remedies are non-invasive — no breaking walls, no construction. Intelligent placement changes only.'),
        ('Scientific Instruments',
         'Lecher Antenna detects geopathic stress and electromagnetic imbalances invisible to the naked eye.'),
        ('Written Report Delivered',
         'Every consultation ends with a detailed written report — your personal roadmap to positive energy.'),
        ('48-Hour Turnaround',
         'Comprehensive diagnostic report delivered within 48 hours of the site visit.'),
        ('Follow-Up Support Included',
         'Post-consultation support included. We track your progress and refine remedies if needed.'),
    ]
    dy = H - 130
    for dtitle, ddesc in diffs:
        rr(c, RM, dy - 2, 14, 14, r=4, fill=ORL)
        txt(c, '✓', RM + 7, dy + 1, font=FB, size=8.5, col=OR, align='center')
        txt(c, dtitle, RM + 22, dy + 3, font=FB, size=10, col=TX)
        dy = wrap(c, ddesc, RM + 22, dy - 10, RCW - 22,
                  font=F, size=8.5, col=TX2, lh=13)
        dy -= 10

    footer(c, 4)


# ─────────────── page 5 : pricing ───────────────────────────────────────────

def page5(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    eyebrow(c, 'INVESTMENT', H - 54)
    h1(c, 'Transparent Pricing', H - 88)
    txt(c, 'Fixed, all-inclusive fees. No hidden charges. No surprises.',
        MARGIN, H - 108, font=F, size=11, col=TX2)

    headers = ['Service', 'Bangalore', 'Outside Bangalore']
    cws = [COL * 0.46, COL * 0.27, COL * 0.27]
    rows = [
        ('Apartment / Row House',      '₹15,000',   '₹21,000 + travel'),
        ('Villa / Independent House',  '₹25,000',   '₹30,000 + travel'),
        ('Commercial / Industrial',    '₹51,000+',  '₹51,000+ + travel'),
        ('Online Consultation',        '₹5,000',    '₹5,000'),
        ('Pre-Purchase Plot Report',   '₹5,000',    '₹5,000'),
    ]

    ty = H - 148
    rh = 34

    # header bar
    c.setFillColor(DK)
    c.rect(MARGIN, ty - 26, COL, 26, fill=1, stroke=0)
    x = MARGIN
    for hdr, cw in zip(headers, cws):
        txt(c, hdr, x + 10, ty - 17, font=FB, size=9, col=WHITE)
        x += cw

    # data rows
    for ri, row in enumerate(rows):
        ry = ty - 26 - (ri + 1) * rh
        bg = SF if ri % 2 == 0 else BG
        c.setFillColor(bg)
        c.setStrokeColor(BD)
        c.setLineWidth(0.4)
        c.rect(MARGIN, ry, COL, rh, fill=1, stroke=1)
        x = MARGIN
        for ci, (cell, cw) in enumerate(zip(row, cws)):
            txt(c, cell, x + 10, ry + rh / 2 - 4,
                font=FB if ci > 0 else F,
                size=10 if ci > 0 else 9.5,
                col=OR if ci > 0 else TX)
            x += cw

    # Highlight boxes
    ny = ty - 26 - len(rows) * rh - 28
    hw = (COL - 32) / 3
    highlights = [
        ('₹5,000',  'Online worldwide — NRI clients included'),
        ('Zero',         'Hidden charges. All-inclusive pricing'),
        ('48 hrs',       'Written report delivery after site visit'),
    ]
    for i, (num, lbl) in enumerate(highlights):
        hx = MARGIN + i * (hw + 16)
        rr(c, hx, ny - 58, hw, 58, r=8, fill=ORL, stroke=ORM, sw=0.7)
        txt(c, num, hx + hw / 2, ny - 24, font=FB, size=17, col=OR, align='center')
        wrap(c, lbl, hx + 10, ny - 42, hw - 20,
             font=F, size=8, col=TX2, lh=12, align='center')

    # footnote
    txt(c, 'All consultations include a detailed written report. Online consultations require floor plan + photos sent in advance.',
        MARGIN, ny - 76, font=F, size=8, col=TX3)

    footer(c, 5)


# ─────────────── page 6 : testimonials ──────────────────────────────────────

def page6(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    eyebrow(c, 'CLIENT TESTIMONIALS', H - 54)
    h1(c, 'What Clients Say', H - 88)
    txt(c, '248 verified 5-star reviews on Google  ·  Residential · Commercial · Online',
        MARGIN, H - 108, font=F, size=11, col=TX2)

    testimonials = [
        ("Raghavendra’s VIDS™ analysis of our Whitefield villa completely transformed the energy. "
         "Within 3 months we saw a remarkable positive shift in family harmony and business results.",
         'Srinivas R.', 'Whitefield, Bangalore'),
        ("As a builder with 40+ projects across Bangalore, I consult Raghavendra before every "
         "layout finalisation. His pre-purchase reports have saved us from multiple problematic sites.",
         'Mohan K.', 'Real Estate Developer, Bangalore'),
        ("We hired Raghavendra for our Koramangala office after years of stagnation. "
         "Post-consultation, our team productivity and deal closure rate improved significantly.",
         'Priya S.', 'Startup Founder, Koramangala'),
        ("Being in Dubai, I was sceptical about online Vastu. But the floor plan analysis and "
         "video consultation were incredibly detailed. The written report covered every room.",
         'Arun T.', 'NRI Client, Dubai'),
    ]

    cw = (COL - 14) / 2
    ch = 126
    gap = 14
    sy = H - 148

    for i, (quote, name, loc) in enumerate(testimonials):
        col = i % 2
        row = i // 2
        cx = MARGIN + col * (cw + gap)
        cy = sy - row * (ch + gap)

        rr(c, cx, cy - ch, cw, ch, r=8, fill=SF, stroke=BD, sw=0.5)

        # orange quote mark
        txt(c, '“', cx + 12, cy - 12, font=FB, size=30, col=ORM)
        wrap(c, quote, cx + 12, cy - 44, cw - 24, font=F, size=8.5, col=TX2, lh=13)

        # author divider
        c.setFillColor(BD)
        c.rect(cx + 12, cy - ch + 32, cw - 24, 0.5, fill=1, stroke=0)
        txt(c, name, cx + 12, cy - ch + 22, font=FB, size=9, col=TX)
        txt(c, loc,  cx + 12, cy - ch + 11, font=F,  size=8, col=TX3)

    # Rating strip
    gy = sy - 2 * (ch + gap) - 22
    rr(c, MARGIN, gy - 42, COL, 42, r=8, fill=DK)
    txt(c, '★ 5.0 / 5.0', MARGIN + 18, gy - 17, font=FB, size=20, col=OR)
    txt(c, 'Google Business Rating', MARGIN + 128, gy - 17, font=F, size=10, col=WHITE)
    txt(c, '248 verified reviews  ·  vardhinivastu.in',
        MARGIN + 128, gy - 31, font=F, size=8.5, col=TX3)

    footer(c, 6)


# ─────────────── page 7 : contact / CTA ─────────────────────────────────────

def page7(c):
    c.setFillColor(DK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(OR)
    c.rect(0, H - 3, W, 3, fill=1, stroke=0)

    txt(c, 'BOOK A CONSULTATION', MARGIN, H - 54, font=FB, size=7.5, col=OR)
    txt(c, 'Ready to Transform', MARGIN, H - 98,  font=FB, size=32, col=WHITE)
    txt(c, 'Your Space?',        MARGIN, H - 136, font=FB, size=32, col=OR)

    wrap(c, 'Book a consultation with Raghavendra Hebbur — Bangalore’s leading scientific '
         'Vastu consultant. Zero demolition. Written report. Real, lasting results.',
         MARGIN, H - 170, COL - 60, font=F, size=11, col=TX3, lh=17)

    contacts = [
        ('WHATSAPP',   '+91 97391 05574',      'Fastest response — reply within 2 hours'),
        ('PHONE',      '+91 97391 05574',      'Mon–Sat, 9 AM to 7 PM IST'),
        ('EMAIL',      'Info@vardhinivastu.in',     'For enquiries, documents & proposals'),
        ('WEBSITE',    'vardhinivastu.in',          'Book online, view testimonials & portfolio'),
    ]

    cw = (COL - 14) / 2
    ch = 70
    gap = 14
    cy = H - 238

    for i, (label, value, note) in enumerate(contacts):
        col = i % 2
        row = i // 2
        cx = MARGIN + col * (cw + gap)
        yy = cy - row * (ch + gap)

        rr(c, cx, yy - ch, cw, ch, r=8, fill=DK3, stroke=DK4, sw=0.5)
        txt(c, label, cx + 14, yy - 18, font=FB, size=7.5, col=OR)
        txt(c, value, cx + 14, yy - 36, font=FB, size=11,  col=WHITE)
        txt(c, note,  cx + 14, yy - 50, font=F,  size=8,   col=TX3)

    # Service areas
    ay = cy - 2 * (ch + gap) - 30
    txt(c, 'SERVING', MARGIN, ay, font=FB, size=7.5, col=TX3)
    ax = MARGIN
    for area in ['All of Bangalore', 'Karnataka', 'India (Onsite + Online)',
                 'International NRI Clients (Online)']:
        ax = badge_pill(c, ax, ay - 24, area, bg=DK3, fg=WHITE)

    # Divider
    c.setFillColor(DK4)
    c.rect(MARGIN, 80, COL, 0.5, fill=1, stroke=0)

    # Bottom branding
    txt(c, 'VIDS™  VASTU INTEGRAL DIAGNOSTIC SYSTEM',
        W / 2, 68, font=FB, size=8, col=TX3, align='center')
    txt(c, 'Vardhini Vastu  ·  Bangalore, Karnataka, India  ·  vardhinivastu.in',
        W / 2, 54, font=F, size=8, col=DK4, align='center')
    txt(c, '© 2026 Vardhini Vastu. All rights reserved. VIDS™ is a proprietary methodology.',
        W / 2, 40, font=F, size=7.5, col=colors.HexColor('#3d3733'), align='center')


# ─────────────── main ────────────────────────────────────────────────────────

def main():
    out = r'C:\Users\raghu\VV\VardhiniVastu_Profile_2026.pdf'

    c = pdfcanvas.Canvas(out, pagesize=A4)
    c.setTitle('Vardhini Vastu — Company Profile 2026')
    c.setAuthor('Raghavendra Hebbur')
    c.setSubject('Scientific Vastu Consulting — Zero Demolition. Real Results.')
    c.setCreator('Vardhini Vastu')

    pages = [page1, page2, page3, page4, page5, page6, page7]
    for fn in pages:
        fn(c)
        c.showPage()

    c.save()
    print(f'✓  PDF saved: {out}')
    return out


if __name__ == '__main__':
    main()
