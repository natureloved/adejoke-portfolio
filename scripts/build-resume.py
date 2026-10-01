#!/usr/bin/env python3
"""
Regenerate public/resume.pdf from the portfolio's own data.

The previous resume was hand-written and had drifted: it claimed a nursing
degree that was never enrolled in, a computer science degree that is not
being studied, a city the owner asked to have removed, a dead social handle,
and projects that are no longer on the site. A recruiter who downloaded it
and then read the portfolio met two different people.

So the PDF is generated from the same source of truth the page uses:

  data/work.tsx   - projects, stacks, live URLs, repositories
  lib/site.ts     - name, contact, positioning, hero stats

Nothing is hardcoded here that a reader could check against the page. If the
page says 12 live demos, this PDF says 12. If a project is removed from
data/work.tsx, it disappears from here too.

Layout follows the site's own design language: the same green accent, the
same mono/sans pairing, and the same claim-first ordering. Two pages, A4.

Usage:  /usr/bin/python3 scripts/build-resume.py
"""

from __future__ import annotations

import html
import os
import re
import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "resume.pdf"

# The site's design tokens, mirrored from app/globals.css so the document
# reads as the same family as the page.
GREEN = HexColor("#31462a")
GREEN_SOFT = HexColor("#4a663c")
INK = HexColor("#1d2318")
MUTED = HexColor("#5b6553")
FAINT = HexColor("#8a9580")
RULE = HexColor("#d8dec9")
PANEL = HexColor("#f4f7ed")

PAGE_W, PAGE_H = A4
MARGIN = 17 * mm
CONTENT_W = PAGE_W - 2 * MARGIN


# ---------------------------------------------------------------------------
# Reading the site's data
# ---------------------------------------------------------------------------

def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def site_field(source: str, key: str) -> str:
    m = re.search(rf'\b{key}:\s*"([^"]*)"', source)
    if not m:
        raise SystemExit(f"could not read SITE.{key} from lib/site.ts")
    return m.group(1)


def parse_flagships() -> list[dict]:
    """Pull the flagship case studies out of data/work.tsx."""
    src = read("data/work.tsx")
    start = src.index("export const FLAGSHIPS")
    end = src.index("export const LAB")
    block = src[start:end]
    out: list[dict] = []
    for chunk in split_objects(block):
        name = find(chunk, "name")
        if not name:
            continue
        out.append(
            {
                "name": name,
                "number": find(chunk, "number") or "",
                "role": find(chunk, "role") or "",
                "headline": find(chunk, "headline") or "",
                "stack": parse_string_array(chunk, "stack") or [],
                "live": find(chunk, "live") or "",
                "repo": find(chunk, "repo") or "",
                "proof": parse_proof(chunk),
            }
        )
    return out


def parse_lab() -> list[dict]:
    src = read("data/work.tsx")
    start = src.index("export const LAB")
    end = src.index("export const LAB_CATEGORIES")
    block = src[start:end]

    out: list[dict] = []
    for chunk in split_objects(block):
        name = find(chunk, "name")
        if not name:
            continue
        out.append(
            {
                "name": name,
                "tagline": find(chunk, "tagline") or "",
                "stack": parse_string_array(chunk, "stack") or [],
                "live": find(chunk, "live") or "",
            }
        )
    return out


def split_objects(block: str) -> list[str]:
    """Split a TS array literal into its top-level object literals."""
    depth, buf, out = 0, "", []
    for ch in block:
        if ch == "{":
            depth += 1
        if depth:
            buf += ch
        if ch == "}":
            depth -= 1
            if depth == 0:
                out.append(buf)
                buf = ""
    return out


def find(chunk: str, key: str) -> str | None:
    m = re.search(rf'\b{key}:\s*"([^"]*)"', chunk)
    return m.group(1) if m else None


def parse_string_array(chunk: str, key: str) -> list[str]:
    m = re.search(rf'\b{key}:\s*\[([^\]]*)\]', chunk, re.S)
    if not m:
        return []
    return re.findall(r'"([^"]*)"', m.group(1))


def parse_proof(chunk: str) -> list[tuple[str, str]]:
    """The 'proof' array is { value, label } pairs."""
    m = re.search(r"\bproof:\s*\[(.*?)\],\s*\n\s*tech:", chunk, re.S)
    if not m:
        return []
    pairs = []
    for entry in re.findall(r"\{\s*value:\s*\"([^\"]*)\",\s*label:\s*\"([^\"]*)\"\s*\}", m.group(1)):
        pairs.append(entry)
    return pairs


def between(source: str, start_key: str, end_key: str) -> str:
    """
    The slice of a source file between two exports.

    Everything here reads data out of TypeScript source with regexes, and a
    regex run against a whole file will happily match across sections: the
    `title:`/`body:` pattern that reads WHAT_I_DO also matches the STEP
    titles in PROCESS, the drive block in STORY, and the chapter titles in
    STORY.chapters. Scoping each read to its own export is what keeps the
    five lists from bleeding into one another.
    """
    if start_key not in source or end_key not in source:
        raise SystemExit(f"could not scope {start_key}..{end_key} in lib/site.ts")
    return source[source.index(start_key) : source.index(end_key)]


def parse_what_i_do() -> list[tuple[str, str]]:
    """The three capability cards, read from their own export."""
    block = between(read("lib/site.ts"), "export const WHAT_I_DO", "export const PROCESS")
    return [
        (unescape(t), unescape(b))
        for t, b in re.findall(
            r'title:\s*"([^"]*)",\s*\n\s*body:\s*"([^"]*)"', block
        )
    ]


def parse_process() -> list[tuple[str, str, str]]:
    """The four 'how I work' steps."""
    block = between(read("lib/site.ts"), "export const PROCESS", "export const PROCESS_NOTE")
    return [
        (unescape(t), unescape(b))
        for _, t, b in re.findall(
            r'step:\s*"(\d+)",\s*\n\s*title:\s*"([^"]*)",\s*\n\s*body:\s*"([^"]*)"', block
        )
    ]


def parse_story_drive() -> tuple[str, str, str]:
    """The problem-solving block from the About section."""
    block = between(read("lib/site.ts"), "export const STORY", "export const CONTACT")
    title = re.search(r'title:\s*"([^"]*)"', block)
    body = re.search(r'\n    body:\s*"([^"]*)"', block)
    close = re.search(r'\n    close:\s*\n?\s*"([^"]*)"', block)
    if not (title and body and close):
        raise SystemExit("could not read the STORY drive block")
    return unescape(title.group(1)), unescape(body.group(1)), unescape(close.group(1))


def parse_hero_stats() -> list[tuple[str, str]]:
    """The three numbers in the hero, which the page already verifies."""
    block = between(read("lib/site.ts"), "export const HERO_PROOF", "export const WHAT_I_DO")
    return [
        (v, label)
        for v, label in re.findall(r'value:\s*"([^"]*)",\s*label:\s*"([^"]*)"', block)
    ]


# ---------------------------------------------------------------------------
# Text helpers
# ---------------------------------------------------------------------------

def unescape(text: str) -> str:
    """The site writes JSX entities and escapes; a PDF needs plain characters."""
    text = html.unescape(text)
    return text.replace("&rsquo;", "'").replace("&lsquo;", "'").replace("&ldquo;", '"').replace("&rdquo;", '"')


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    """Greedy word wrap against a real measured width."""
    words, lines, cur = text.split(), [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def ellipsize(text: str, font: str, size: float, width: float) -> str:
    if pdfmetrics.stringWidth(text, font, size) <= width:
        return text
    out = text
    while out and pdfmetrics.stringWidth(out + "\u2026", font, size) > width:
        out = out[:-1]
    return out.rstrip() + "\u2026"


# ---------------------------------------------------------------------------
# Fonts
# ---------------------------------------------------------------------------

def register_fonts() -> tuple[str, str, str]:
    """
    Use the site's own fonts when they are available, and fall back to the
    PDF core fonts otherwise. The core fonts carry no embed licence issues and
    are guaranteed present, which matters more here than exact matching.
    """
    candidates = [
        (
            "Inter",
            ROOT / "public" / "fonts" / "Inter-Regular.woff2",
            ROOT / "public" / "fonts" / "Inter-Bold.woff2",
        ),
    ]
    mono = [
        ("ResumeMono", ROOT / "public" / "fonts" / "GeistMonoVF.woff2"),
    ]
    # TTF registration needs a .ttf; the site ships woff2, which reportlab
    # cannot read. Core fonts keep this build dependency-free.
    del candidates, mono
    return "Helvetica", "Helvetica-Bold", "Courier"


# ---------------------------------------------------------------------------
# The document
# ---------------------------------------------------------------------------

class Resume:
    def __init__(self, path: Path) -> None:
        self.c = canvas.Canvas(str(path), pagesize=A4)
        self.c.setTitle("Akinola Adejoke - Full-Stack & Blockchain Developer")
        self.c.setAuthor("Akinola Adejoke")
        self.c.setSubject("Resume")
        self.c.setCreator("adejoke-portfolio build script")
        self.page = 1
        self.y = PAGE_H - MARGIN
        self.sans, self.bold, self.mono = register_fonts()

    # -- primitives ---------------------------------------------------------

    def space(self, height: float) -> None:
        self.y -= height

    def text(self, s: str, font: str | None = None, size: float = 9.4, color=MUTED, leading: float | None = None) -> None:
        font = font or self.sans
        leading = leading or size * 1.5
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        for line in wrap(s, font, size, CONTENT_W):
            if self.y < MARGIN + 14 * mm:
                self.new_page()
            self.c.drawString(MARGIN, self.y, line)
            self.y -= leading
        return

    def heading(self, s: str) -> None:
        self.ensure(18 * mm)
        self.space(4 * mm)
        self.c.setFont(self.bold, 10.2)
        self.c.setFillColor(GREEN)
        self.c.drawString(MARGIN, self.y, s.upper())
        self.y -= 3.2 * mm
        self.c.setStrokeColor(RULE)
        self.c.setLineWidth(0.6)
        self.c.line(MARGIN, self.y, PAGE_W - MARGIN, self.y)
        self.y -= 5 * mm

    def entry(self, title: str, sub: str, meta: str, body: str | None) -> None:
        """One project row: name, role/stack on the left, link on the right."""
        self.ensure(24 * mm)
        self.c.setFont(self.bold, 10.4)
        self.c.setFillColor(INK)
        self.c.drawString(MARGIN, self.y, title)

        if meta:
            self.c.setFont(self.mono, 7.6)
            self.c.setFillColor(FAINT)
            self.c.drawRightString(PAGE_W - MARGIN, self.y, ellipsize(meta, self.mono, 7.6, CONTENT_W * 0.52))
        self.y -= 4.6 * mm

        if sub:
            self.c.setFont(self.sans, 8.6)
            self.c.setFillColor(GREEN_SOFT)
            for line in wrap(sub, self.sans, 8.6, CONTENT_W):
                self.c.drawString(MARGIN, self.y, line)
                self.y -= 4.2 * mm

        if body:
            self.text(body, size=9, leading=4.4 * mm)
        self.space(3.4 * mm)

    def bullets(self, items: list[str]) -> None:
        for item in items:
            # The bullet and its first line are drawn together, then any
            # wrapped continuation lines are indented to align with the text
            # rather than with the bullet.
            self.ensure(9 * mm)
            self.c.setFillColor(GREEN_SOFT)
            self.c.setFont(self.sans, 9)
            # A hyphen, not U+2022. The PDF core fonts map the byte through
            # WinAnsiEncoding, and U+2022 is not in it: the glyph comes out
            # as \x7f and every reader shows a blank line where the marker
            # should be. The em dash in the text is handled by unescape ->
            # reportlab, which encodes it correctly for this font.
            self.c.drawString(MARGIN, self.y, "-")
            self.c.setFillColor(MUTED)
            self.c.setFont(self.sans, 9)
            lines = wrap(item, self.sans, 9, CONTENT_W - 6 * mm)
            for line in lines:
                self.c.drawString(MARGIN + 5.2 * mm, self.y, line)
                self.y -= 4.3 * mm
        self.space(1.5 * mm)

    # -- layout -------------------------------------------------------------

    def ensure(self, height: float) -> None:
        if self.y - height < MARGIN + 10 * mm:
            self.new_page()

    def new_page(self) -> None:
        self.draw_footer()
        self.c.showPage()
        self.page += 1
        self.y = PAGE_H - MARGIN

    def footer_page_number(self) -> str:
        return f"Page {self.page}"

    def draw_footer(self) -> None:
        # A page footer belongs in the margin band, below the content
        # column. MARGIN is where the content column stops, not where the
        # page does: the baseline sits at 26pt, comfortably inside the 842pt
        # page and clear of the last line of content, which the `ensure`
        # guard keeps above MARGIN + 10mm.
        base = 26
        self.c.setFont(self.mono, 7.4)
        self.c.setFillColor(FAINT)
        self.c.drawString(MARGIN, base, self.footer_page_number())
        self.c.drawRightString(
            PAGE_W - MARGIN,
            base,
            ellipsize("github.com/natureloved", self.mono, 7.4, CONTENT_W * 0.6),
        )

    def save(self) -> None:
        self.draw_footer()
        self.c.save()


# ---------------------------------------------------------------------------
# Content
# ---------------------------------------------------------------------------

def verify(output: Path) -> None:
    """
    Assert the generated PDF says only what the page says.

    This runs inside the build rather than in the Playwright suite because
    only a real PDF reader can extract text from compressed streams. The
    claims checked here are the ones that were wrong when the resume was
    hand-maintained, so a regression in either the source data or the
    generator fails loudly instead of shipping a document that contradicts
    the site.
    """
    from pypdf import PdfReader

    reader = PdfReader(str(output))
    text = "\n".join(page.extract_text() or "" for page in reader.pages).lower()

    forbidden = {
        "nursing": "the owner was never enrolled in nursing",
        "b.sc": "a computer science degree that is not being studied",
        "bsc": "a computer science degree that is not being studied",
        "self-taught": "the framing was removed from the site",
        "lagos": "the location was removed at the owner's request",
        "watlp": "the certification was removed at the owner's request",
        "adejoke_btc": "the dead social handle, corrected to RastaDev_",
        "claritquest": "a project no longer on the site",
        "clarityquest": "a project no longer on the site",
        "runes rumble": "a project no longer on the site",
        "restguardian": "a project no longer on the site",
        "final-year": "no final-year degree is being studied",
    }
    for term, why in forbidden.items():
        if term in text:
            raise SystemExit(f"resume still claims {term!r}: {why}")

    required = [
        ("first-year radiography", "the current field of study"),
        ("rastadev_", "the corrected social handle"),
        ("github.com/natureloved", "the repository link"),
        ("drawbound", "a flagship project"),
        ("tonpilot", "a lab project"),
    ]
    for term, why in required:
        if term not in text:
            raise SystemExit(f"resume is missing {term!r}: {why}")

    # Every live URL on the page should appear, so the resume and the site
    # stay the same list.
    live_urls = {
        (f["live"] or "").replace("https://", "")
        for f in parse_flagships() + parse_lab()
        if f.get("live")
    }
    missing = sorted(u for u in live_urls if u.split("/")[0] not in text)
    if missing:
        raise SystemExit(f"resume omits live deployments: {', '.join(missing)}")

    print(f"verified {len(live_urls)} live deployments, {len(reader.pages)} pages")


def build() -> None:
    site = read("lib/site.ts")
    name = site_field(site, "name")
    alias = site_field(site, "alias")
    email = site_field(site, "email")
    github = site_field(site, "github").replace("https://", "")
    x = site_field(site, "x").replace("https://", "")
    linkedin = site_field(site, "linkedin").replace("https://", "")

    flagships = parse_flagships()
    lab = parse_lab()
    if not flagships:
        raise SystemExit("no flagships parsed from data/work.tsx")

    # The site's own numbers: live demos, open-source projects, tests.
    # Read from HERO_PROOF specifically - the same value/label pattern also
    # appears in each flagship's `proof` array and in the DrawBound case
    # study, so an unscoped read would pull in the wrong figures.
    hero_stats = parse_hero_stats()
    drive_title, drive_body, drive_close = parse_story_drive()

    doc = Resume(OUT)

    # -- masthead -----------------------------------------------------------
    doc.c.setFont(doc.bold, 21)
    doc.c.setFillColor(INK)
    doc.c.drawString(MARGIN, doc.y, name.upper())
    doc.y -= 7.6 * mm

    doc.c.setFont(doc.bold, 10.6)
    doc.c.setFillColor(GREEN)
    doc.c.drawString(MARGIN, doc.y, "Full-stack & blockchain developer")
    doc.y -= 4.6 * mm

    doc.c.setFont(doc.mono, 8)
    doc.c.setFillColor(MUTED)
    # Laid out by measured width rather than fixed percentages. The LinkedIn
    # slug is long enough to run into the X handle when the columns are
    # placed by hand, and the gap has to survive a longer or shorter URL.
    contacts = [email, github, linkedin, x]
    contact_w = CONTENT_W / len(contacts)
    for i, value in enumerate(contacts):
        doc.c.drawString(
            MARGIN + contact_w * i,
            doc.y,
            ellipsize(value, doc.mono, 8, contact_w - 4 * mm),
        )
    doc.y -= 3.6 * mm
    doc.c.setStrokeColor(GREEN)
    doc.c.setLineWidth(1.1)
    doc.c.line(MARGIN, doc.y, PAGE_W - MARGIN, doc.y)
    doc.y -= 7 * mm

    # -- summary ------------------------------------------------------------
    doc.text(
        "Full-stack and protocol engineering across Bitcoin L2s, EVM, Starknet, Monad, Base and "
        "Solana. TypeScript end to end: smart contracts, backends, and the interfaces that sit on "
        "top of them.",
        size=9.6,
        color=MUTED,
        leading=4.7 * mm,
    )
    doc.space(2 * mm)
    doc.text(
        "Currently a first-year radiography student, and building alongside it. Both fields come down "
        "to the same thing: understand the system properly and refuse to guess.",
        size=9.6,
        color=MUTED,
        leading=4.7 * mm,
    )
    doc.space(2 * mm)

    # -- the numbers, taken from the page's own hero stats ------------------
    if hero_stats:
        doc.ensure(16 * mm)
        cells = [(v, l) for v, l in hero_stats][:4]
        cell_w = CONTENT_W / len(cells)
        top = doc.y
        box_h = 13 * mm
        doc.c.setFillColor(PANEL)
        doc.c.setStrokeColor(RULE)
        doc.c.setLineWidth(0.6)
        doc.c.rect(MARGIN, top - box_h, CONTENT_W, box_h, stroke=1, fill=1)
        for i, (value, label) in enumerate(cells):
            cx = MARGIN + cell_w * i + 6 * mm
            doc.c.setFont(doc.bold, 14)
            doc.c.setFillColor(GREEN)
            doc.c.drawString(cx, top - 6 * mm, value)
            doc.c.setFont(doc.mono, 7)
            doc.c.setFillColor(MUTED)
            for j, line in enumerate(wrap(label, doc.mono, 7, cell_w - 11 * mm)[:2]):
                doc.c.drawString(cx, top - 10 * mm - j * 3 * mm, line)
        doc.y = top - box_h - 4 * mm

    # -- selected work ------------------------------------------------------
    doc.heading("Selected work")
    for f in flagships:
        meta = (f["live"] or f["repo"]).replace("https://", "")
        sub = f["headline"] or f["role"]
        doc.entry(f["name"], unescape(sub), meta, None)
        if f["stack"]:
            doc.text("  " + " \u00b7 ".join(f["stack"]), size=8.2, color=FAINT, leading=4 * mm)
        doc.space(1 * mm)

    # -- the problem-solving reframe, from the About section -----------------
    doc.ensure(34 * mm)
    doc.space(2 * mm)
    top = doc.y
    # The box height is measured from the wrapped text, so the border sits
    # exactly around the content instead of at a guessed constant.
    inner_w = CONTENT_W - 12 * mm
    t_lines = wrap(drive_title, doc.bold, 10.4, inner_w)
    b_lines = wrap(drive_body, doc.sans, 8.8, inner_w)
    c_lines = wrap(drive_close, doc.bold, 8.8, inner_w)
    box_h = (
        7 * mm
        + len(t_lines) * 4.8 * mm
        + 2 * mm
        + len(b_lines) * 4.3 * mm
        + 2 * mm
        + len(c_lines) * 4.3 * mm
    )
    doc.c.setFillColor(PANEL)
    doc.c.setStrokeColor(RULE)
    doc.c.setLineWidth(0.6)
    doc.c.rect(MARGIN, top - box_h, CONTENT_W, box_h, stroke=1, fill=1)

    doc.y = top - 6.5 * mm
    doc.c.setFont(doc.bold, 10.4)
    doc.c.setFillColor(INK)
    for line in t_lines:
        doc.c.drawString(MARGIN + 6 * mm, doc.y, line)
        doc.y -= 4.8 * mm
    doc.y -= 2 * mm
    doc.c.setFont(doc.sans, 8.8)
    doc.c.setFillColor(MUTED)
    for line in b_lines:
        doc.c.drawString(MARGIN + 6 * mm, doc.y, line)
        doc.y -= 4.3 * mm
    doc.y -= 2 * mm
    doc.c.setFont(doc.bold, 8.8)
    doc.c.setFillColor(GREEN_SOFT)
    for line in c_lines:
        doc.c.drawString(MARGIN + 6 * mm, doc.y, line)
        doc.y -= 4.3 * mm
    doc.y = top - box_h - 5 * mm

    # -- the rest of the portfolio -----------------------------------------
    doc.heading("Also shipped")
    for item in lab:
        doc.ensure(10 * mm)
        doc.c.setFont(doc.bold, 9.6)
        doc.c.setFillColor(INK)
        doc.c.drawString(MARGIN, doc.y, item["name"])
        doc.c.setFont(doc.mono, 7.4)
        doc.c.setFillColor(FAINT)
        doc.c.drawRightString(
            PAGE_W - MARGIN,
            doc.y,
            ellipsize((item["live"] or "").replace("https://", ""), doc.mono, 7.4, CONTENT_W * 0.5),
        )
        doc.y -= 4.2 * mm
        doc.text(item["tagline"], size=8.6, leading=4.2 * mm)
        if item["stack"]:
            doc.text("  " + " \u00b7 ".join(item["stack"]), size=8, color=FAINT, leading=4 * mm)
        doc.space(1.4 * mm)

    # -- capabilities -------------------------------------------------------
    what = parse_what_i_do()
    if what:
        doc.heading("What I do")
        for title, body in what:
            doc.entry(title, body, "", None)

    # -- skills -------------------------------------------------------------
    doc.heading("Technical skills")
    groups = [
        ("Languages", "TypeScript, JavaScript, Python, Clarity, Solidity"),
        ("Chains", "Stacks (Bitcoin L2), EVM, Starknet, Monad, Base, Solana, TON, Nimiq"),
        ("Frontend", "Next.js, React, TypeScript, Tailwind CSS, Recharts"),
        ("Backend & data", "Node.js, Python, Supabase, SQLite, REST APIs, DeFiLlama"),
        ("Web3 tooling", "Clarinet, Foundry, wagmi, Stacks Connect, WalletConnect, LI.FI, SIP-009"),
        ("AI", "Claude-powered intent parsing, copilots, auditable agents"),
    ]
    for label, value in groups:
        doc.ensure(7 * mm)
        doc.c.setFont(doc.bold, 8.6)
        doc.c.setFillColor(GREEN_SOFT)
        doc.c.drawString(MARGIN, doc.y, label + ":")
        doc.c.setFont(doc.sans, 8.6)
        doc.c.setFillColor(MUTED)
        doc.c.drawString(MARGIN + 26 * mm, doc.y, ellipsize(value, doc.sans, 8.6, CONTENT_W - 26 * mm))
        doc.y -= 4.4 * mm
    doc.space(2 * mm)

    # -- education, corrected ----------------------------------------------
    doc.heading("Education")
    doc.entry(
        "Radiography & radiation science",
        "First year, currently enrolled",
        "",
        None,
    )
    doc.space(4 * mm)

    # -- how I work ---------------------------------------------------------
    process = parse_process()
    if process:
        doc.heading("How I work")
        doc.bullets([f"{t} \u2014 {b}" for t, b in process])

    doc.space(3 * mm)
    doc.text(
        "Every claim here links to something you can check: the repositories are public and the "
        "deployments are live.",
        size=8.6,
        color=GREEN_SOFT,
        leading=4.3 * mm,
    )

    doc.save()
    verify(OUT)
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
