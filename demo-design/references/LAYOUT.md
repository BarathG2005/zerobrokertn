# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 5px

**Scale:** `10, 15, 20, 30, 70` px

| Spacing | Semantic Use |
|---------|-------------|
| 5px | Tight — within a component |
| 10px | Medium — between sibling items |
| 20px | Wide — between sections |
| 40px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `header#frame-panel.header` | row | — | center | — | 4 |
| `section.content` | row | — | — | — | 1 |

## Structural Containers

### `<header>` (`header#frame-panel.header`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
padding:          10px 70px 10px 30px
children:         4
```

### `<section>` (`section.content`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      —
children:         1
```

## Layout Rules

- Primary layout system: **Flexbox**
- Every spacing value must be a multiple of **5px**
- Never use arbitrary margin/padding values outside the spacing scale

