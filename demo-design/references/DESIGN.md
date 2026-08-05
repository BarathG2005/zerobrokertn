# demo DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 10 · Fonts: 1 · Components: 2
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: none

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![demo Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a cool, approachable feel. The light background emphasizes content clarity. Typography uses **sans-serif** throughout — a clean, modern choice that maintains consistency. Spacing follows a **5px base grid** (standard density), with scale: 10, 15, 20, 30, 70px. The palette is predominantly monochromatic with **#00a3ff** as the single accent color — used sparingly for interactive elements and emphasis.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| background | `#ffffff` | background | Page background, darkest surface |
| surface | `#b3c8e7` | surface | Card and panel backgrounds |
| text-primary | `#243238` | text-primary | Headings and body text |
| text-muted | `#b0bec5` | text-muted | Captions, placeholders, secondary info |
| accent | `#00a3ff` | accent | CTAs, links, focus rings, active states |
| tile-color | `#da532c` | danger | Error states, destructive actions |
| info | `#9cc8f5` | info | Informational highlights |
| unknown | `#2d394b` | unknown | Palette color |
| theme-color | `#2196f3` | unknown | Palette color |
| unknown | `#000000` | unknown | Palette color |


---

## 3. Typography Rules

**Font Stack:**
- **sans-serif** — Heading 1, Heading 2, Heading 3, Body, Caption

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | sans-serif | 48px / 3rem | 700 |
| Heading 2 | sans-serif | 32px / 2rem | 600 |
| Heading 3 | sans-serif | 24px / 1.5rem | 600 |
| Body | sans-serif | 16px / 1rem | 400 |
| Caption | sans-serif | 12px / 0.75rem | 400 |

**Typographic Rules:**
- Use **sans-serif** for all text — do not mix font families
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Navigation (1)

**Navigation** — `html`

### Overlay (1)

**Modal** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 5px
- **Spacing scale:** 10, 15, 20, 30, 70
- **Border radius:** 3px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 2.5-5px | Tight: related items within a group |
| 10px | Medium: between groups |
| 15-20px | Wide: between sections |
| 30px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

No box-shadow values detected. The design appears to use a flat visual style.

**Z-Index Scale:** `100`


---

## 8. Do's and Don'ts

### Do's

- Use `#00a3ff` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Use **sans-serif** for all UI text
- Follow the **5px** spacing grid for all margins, padding, and gaps
- Use border and background shifts for elevation — not shadows
- Use border-radius from the scale: 3px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't mix font families — use sans-serif consistently
- Don't use arbitrary spacing values — stick to multiples of 5px
- Don't add box-shadow — this design system uses flat elevation
- Don't use gradients — the design uses solid colors only
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No box-shadow on any element
- No gradient backgrounds
- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| md | 679px | css |
| md | 719px | css |
| lg | 959px | css |
| 2xl | 1649px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #b3c8e7
Border: 1px solid var(--border)
Radius: 3px
Padding: 20px
Font: sans-serif
No shadows — use borders and surface colors for depth.
```

### Build a Button

```
Primary: bg #00a3ff, text white
Ghost: bg transparent, border var(--border)
Padding: 10px 20px
Radius: 3px
Hover: opacity 0.9 or lighter shade
Focus: ring with #00a3ff
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1280px, centered
Grid: 5px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #b3c8e7
Label: #b0bec5 (muted, 12px, uppercase)
Value: #243238 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid var(--border)
Focus: border-color #00a3ff
Label: #b0bec5 12px
Spacing: 20px between fields
Radius: 3px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: sans-serif, type scale from Section 3
4. Spacing: 5px grid
5. Components: match patterns from Section 4
6. Elevation: flat, surface shifts
```
