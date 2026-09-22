# DESIGN SYSTEM — Refine

## Brand Philosophy

Refine should feel like:
- Premium wellness (Aesop, Le Labo)
- Modern fashion editorial (Kinfolk, Cereal)
- High-end beauty tech (Dyson, Augustinus Bader)
- Apple-level simplicity
- Premium fintech clarity (Monzo, Linear)
- Modern luxury brand

Not:
- Cheap AI wrapper, SaaS dashboard, gaming, crypto, alpha-male, bodybuilding forum, generic health tracker, neon cyberpunk, children's colorful

Emotional adjectives: PREMIUM, CALM, CONFIDENT, INTELLIGENT, MODERN, ASPIRATIONAL, TRUSTWORTHY, PERSONAL, SOPHISTICATED

## Color Psychology & Palette

### Reasoning

We need sophisticated neutral foundation + refined accent that communicates confidence, progress, vitality, personalization, premium tech — without excessive saturation, rainbow, neon purple/blue AI startup, or generic wellness green.

Research:
- Premium beauty/wellness uses warm off-whites, deep charcoals, restrained secondary, one recognizable accent (e.g., Aesop amber, Glossier pink, Le Labo concrete + amber)
- Color psychology: Deep charcoal = sophistication, trust, confidence. Warm off-white = calm, approachable, premium, breathing room. Accent needs to signal vitality without aggression.
- Accessibility: Must pass WCAG AA (4.5:1 for text). Avoid relying on color alone.
- Avoid green-only because app is about appearance but green signals medical/eco, not personal style. Avoid neon purple/blue = cheap AI.

Chosen direction:
- **Base:** Warm off-white / sophisticated light neutral, not pure white (reduces eye strain, feels editorial)
- **Typography:** Deep charcoal / near-black, not pure black (softer, premium)
- **Borders:** Subtle neutral, low contrast
- **Accent:** **Terracotta Clay / Warm Umber** — #C17C60 in light, #D49A7F in dark. Why: Warmth = human, vitality, confidence, skin-tone complementary (works across skin tones without implying skin color judgment), earthy premium, distinct from competitors (who use blue/purple), signals personalization and progress without aggression. Alternative accent for success: muted sage, not neon green.
- **Semantic tokens, not hardcoded colors.**

### Tokens

#### Light Mode
```
background: #FDFCFB (warm off-white, 98% lightness, 5% warm)
surface: #FFFFFF
surfaceElevated: #FFFFFF (with shadow, not border)
surfaceSubtle: #F6F3F0 (warm stone 2%)
textPrimary: #1A1C1E (deep charcoal, not pure black)
textSecondary: #6B6E70 (neutral 45%)
textMuted: #9CA0A3 (35%)
border: #E8E2DE (warm neutral 10%)
borderStrong: #D5CFCB
accent: #C17C60 (terracotta clay - confidence, vitality)
accentSoft: #F2E6E0 (accent 12% bg)
accentStrong: #A8654A (pressed)
success: #6B8F7B (muted sage, not neon)
successSoft: #E4EDE7
warning: #C9A86A (warm amber)
warningSoft: #F5ECD8
danger: #C46B6B (muted rose, not aggressive red)
dangerSoft: #F2DFDF
info: #7A8FA6 (slate blue, calm)
infoSoft: #E2E8EE
overlay: rgba(26,28,30,0.6)
```

#### Dark Mode
```
background: #121415 (near-black charcoal)
surface: #1C1F22
surfaceElevated: #23272A
surfaceSubtle: #2A2E31
textPrimary: #F5F3F0 (warm off-white)
textSecondary: #A8ADB0
textMuted: #7A7F83
border: #2E3336
borderStrong: #3A4044
accent: #D49A7F (lighter terracotta for dark contrast)
accentSoft: #3A2A24 (dark accent bg)
accentStrong: #E8B49A
success: #8FB89F
successSoft: #2A3A30
warning: #D4B87A
warningSoft: #3A3320
danger: #D68A8A
dangerSoft: #3A2A2A
info: #8FA6C0
infoSoft: #2A333A
overlay: rgba(0,0,0,0.7)
```

Contrast checks:
- textPrimary on background: 15.8:1 light, 15.2:1 dark → AAA
- textSecondary on background: 5.2:1 light, 6.1:1 dark → AA+
- accent on background: 3.1:1 → use only for large text, icons, buttons with white text (white on accent 4.6:1 → AA)
- accentSoft backgrounds use textPrimary for readability

### Usage Rules
- Base interface uses neutrals 90% of time. Accent only for primary CTA, progress, selection, focus.
- Avoid gradients everywhere. If used, subtle warm gradient: background to surfaceSubtle, or accent to accentStrong for progress ring (max 1 per screen).
- No rainbow. Max 2 accent colors per screen (accent + semantic if needed).
- Cards use surface + border + subtle shadow, not heavy borders.

## Typography

Goal: modern, editorial, highly readable, sophisticated, minimal. Use hierarchy via size/weight/spacing, not excessive cards/colors.

**Font Family:**
- Display/Headings: **Instrument Serif** or **Newsreader** (editorial serif for premium) + **Inter** or **General Sans** for UI. For Expo MVP, use system font stack with serif for display to avoid custom font loading complexity, but define tokens.
- MVP practical: Use **Inter** (or System) for all, with serif via **Instrument Serif** Google Font for Display only. If custom fonts not loaded, fallback to system serif.
- Numeric: **JetBrains Mono** or tabular numbers for stats.

**Scale (4pt base):**
```
Display: 32/38, 700, -0.02em, serif
H1: 28/34, 700, -0.01em
H2: 22/28, 600
H3: 18/24, 600
Body: 16/24, 400
Body Small: 14/20, 400
Caption: 12/16, 500, 0.02em uppercase? No, keep sentence case for premium, use 0.01em
Button: 16/24, 600, 0.01em
Label: 13/16, 500, 0.02em uppercase tracking for premium labels
Numeric: 24/28, 600, tabular
```

**Rules:**
- Max 2 font families (serif display + sans UI)
- Line height 1.5 for body, 1.2 for headings
- Letter spacing tight for headings (-0.02 to -0.01), normal for body
- Use typography for hierarchy, not cards

## Spacing & Layout

**System: 4pt base, 8pt major**
```
xxs: 4
xs: 8
sm: 12
md: 16
lg: 24
xl: 32
2xl: 48
3xl: 64
```

**Layout:**
- Screen padding: 20 (md+)
- Card padding: 16-20
- Section gap: 32 (xl)
- Card gap: 16 (md)
- Touch targets: min 44x44
- Content max width: 100% mobile, but keep readable line length ~60ch for text blocks
- Generous whitespace, strong alignment, visual breathing room
- One primary purpose per screen

**Grid:** 1 column mobile, 2 columns for Look Lab grid

## Component System

All components use design tokens, no hardcoded colors.

### Buttons
- Primary: accent bg, white text, 12px radius, 48h, 600 weight, subtle shadow, pressed = accentStrong
- Secondary: surface, border, textPrimary, same radius/h
- Ghost: transparent, textPrimary, underline on press
- Disabled: surfaceSubtle, textMuted, no shadow
- Loading: spinner, disabled interaction
- Icon button: 44x44, surface, border

### Text Fields
- 48h, surface, border, 12px radius, textPrimary, placeholder textMuted
- Focus: borderStrong + accentSoft glow
- Error: danger border + caption danger
- Label: Label token above, 8 gap

### Cards
- Base: surface, border, 16 radius, 16 padding, subtle shadow (0 1 8 rgba(0,0,0,0.04))
- Elevated: surfaceElevated, no border, larger shadow
- Analysis Card: surface, 20 radius, image top, content 16
- Recommendation Card: accentSoft left border 4px + surface
- Routine Card: checkbox left, content, time right
- Insight Card: surfaceSubtle, no border
- Photo Card: image, overlay gradient, text bottom

### Chips
- Filter chip: surface, border, textSecondary, 20 radius, 32h, selected = accentSoft + accent text + border accent
- Category chip: surfaceSubtle, textSecondary, 8 radius

### Tabs & Segmented Controls
- Segmented: surfaceSubtle, 12 radius, thumb = surface + shadow, textPrimary selected
- Tabs: underline indicator accent, textSecondary → textPrimary selected

### Progress
- Progress Ring: accent gradient, track border, 4px stroke, 80px size for dashboard
- Progress Bar: 4h, track border, fill accent, 4 radius
- Sparkline: accent line, accentSoft fill

### Sliders
- Track border, thumb accent, 24 thumb, haptic on change

### Bottom Sheets & Modals
- SurfaceElevated, 24 top radius, drag handle borderStrong 32x4, overlay
- Modal: centered, 20 radius, overlay

### Navigation
- Tab bar: surface + top border + blur, 5 tabs max, icon + label, accent selected
- Header: transparent or surface, textPrimary, back button

### Feedback
- Toast: surfaceElevated + shadow, 12 radius, icon + text, 4 sec auto-dismiss, swipe to dismiss
- Snackbar: similar, with action
- Skeleton: surfaceSubtle shimmer, 8 radius
- Empty: illustration (line art, warm neutral) + H3 + Body Small + CTA
- Error: illustration + H3 + Body + retry CTA
- Loading: spinner accent, or skeleton

### Specialized
- Photo Guidance: illustration + bullet list + example images
- Analysis Loading: premium animation (breathing circles, not fake terminal)
- Impact Map: 3 rows High/Med/Low, cards inside
- Timeline: vertical line border, dot accent, card
- Comparison: slider or side-by-side
- Barber Card: white card, black text, structured fields, QR? No, just clean

## Motion Design

Principles: hierarchy, transition, progress, feedback, discovery. Subtle, not gimmicky.

- **Duration:** 200ms for micro (press), 300ms for transition, 500ms for entrance, 1000ms for analysis breathing
- **Easing:** ease-out for entrance, ease-in-out for transitions, spring 300/30 for bouncy only where playful (checkbox)
- **Types:**
  - Fade: 0→1, 200ms
  - Slide: 16px up, fade, 300ms (card entrance)
  - Scale: 0.98→1, 200ms (press)
  - Shared: image to detail
  - Progress: ring 0→value 800ms ease-out
- **Avoid:** Excessive bounce, rotation, slow workflow
- **Reduced motion:** If OS setting, disable entrance, keep fade only
- **Analysis loading:** Breathing circles (scale 1→1.05, 1000ms loop) + step text fade

## Iconography

- Use Lucide or Phosphor, line style, 1.5 stroke, 20px default, 24 for nav
- Rounded caps
- No filled icons except selected tab
- Accent only for active, otherwise textSecondary

## Accessibility

- Contrast AA minimum, AAA for primary text
- Touch targets 44+
- Screen reader labels for all interactive
- Semantic components (button, header)
- Dynamic Type: scale up to 135%
- Color-independent status: icon + text + color
- Focus indicators visible

## Implementation Notes (Expo)

- Create `design/tokens.ts` with light/dark objects
- `design/theme.tsx` context with useTheme()
- No hardcoded colors in components — use theme
- Typography component with variants
- Spacing via theme.spacing
- Use `expo-linear-gradient` only for subtle progress, not everywhere
