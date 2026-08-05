# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 2 | default, hover, focus |
| Link | 2 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: all;
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `Settings`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* background-color: rgb(122, 146, 158) → */ background-color: rgb(96, 122, 135);
```

**On focus:**

```css
/* background-color: rgb(122, 146, 158) → */ background-color: rgb(96, 122, 135);
```

**Transition:** `all`

### Button 2 — `Accept All`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On hover:**

```css
/* background-color: rgb(0, 163, 255) → */ background-color: rgb(13, 149, 225);
```

**On focus:**

```css
/* background-color: rgb(0, 163, 255) → */ background-color: rgb(13, 149, 225);
```

**Transition:** `all`

## Link Interactions

### Link 1 — `Free Website Template - Real Estate Webs`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgb(156, 201, 245) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(156, 201, 245) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `all`

### Link 2 — `Privacy Policy`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On focus:**

```css
/* outline: rgb(33, 150, 243) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(33, 150, 243) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `all`

## Interaction Rules

- Accent color `#00a3ff` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

