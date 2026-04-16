# PRISM — UI/UX Upgrade Delta
### What Changes, What's Removed, What's New, and How the Design Evolves
#### Based on: Prism_Backend_Stages_4_8.md + Prism_API_Upgrade_Brief.md

> This document is a precise diff against `PRISM_UI_SPEC.md`.
> Read it section by section. Every item is actionable.
> Do not re-read the original spec for the items listed here — this document overrides those sections.
> Where the original spec is unchanged, it stays as is. Only deltas are listed.

---

## OVERVIEW: WHY THESE CHANGES MATTER

The original spec was built on a **four-factor scoring engine** that used rough approximations — one price number, one liquidity aggregate, an order count. The backend has now been upgraded to use **five real microstructure factors** fed by four live API endpoints (Ticker, Order Book, Trades, Price History). This changes:

1. **What data exists to display** — More factors, more granular breakdowns.
2. **What the SignalCard looks like** — It must show order book data and order flow, not just liquidity and orders.
3. **What the Market Detail page shows** — Order book depth visualization, trade flow data, persistence ticks.
4. **What the Performance page shows** — Backtesting now has real 7-day historical data, not just forward-looking outcomes.
5. **What the Admin signal expand panel shows** — Five factor breakdown, not four.
6. **What the Landing Page says and shows** — The pitch language changes, the "How It Works" diagram changes, and the credibility section shows backtested data.
7. **What data the AI insight can reference** — The Gemini prompt now includes order book spread, net flow direction, and persistence — so AI cards must surface these richer insights.

---

## SECTION 1 — TYPOGRAPHY & TOKEN CHANGES

### New Tokens to Add to Tailwind Config

Add these color tokens to the existing palette. They cover the two new factor visualizations (Order Flow and Persistence) and the new order book depth display.

```js
// Add to tailwind.config.ts colors extension
'depth-bid':     '#0EA5E9',   // sky blue — bid side of order book
'depth-ask':     '#A855F7',   // purple — ask side of order book
'flow-buy':      '#16A34A',   // same as signal-green — net buying
'flow-sell':     '#DC2626',   // same as signal-red — net selling
'sigma-high':    '#F59E0B',   // amber — high sigma moves (> 3σ)
'sigma-extreme': '#EF4444',   // red — extreme sigma moves (> 5σ)
```

### New Typography Role

Add this to the typography scale in the spec:

| Role | Class | Usage |
|---|---|---|
| Sigma Label | `font-mono text-xs font-bold` + signal color | σ value displays (e.g., `+8.2σ`) |
| Factor Bar Label | `font-mono text-[9px] uppercase tracking-wide text-prism-text-3` | Factor bar labels in score breakdown |
| Market Baseline | `font-mono text-[10px] text-prism-text-3 line-through` | Showing "vs. baseline" comparisons |

---

## SECTION 2 — COMPONENT CHANGES

### 2.1 `SignalCard` — MAJOR CHANGES

**The SignalCard is the central product UI element. It must be rebuilt.**

#### What's Removed from the Original Spec:
- ~~`NGN 2.1M liquidity · 842 orders · 3.2x vol`~~ — This row showed the old four-factor data. **REMOVE IT ENTIRELY.**
- ~~`Liquidity: NGN 2.1M | Orders: 842 | Vol: 3.2x avg`~~ — Same row, different format. **REMOVE.**

#### What Replaces It (ROW 3 replacement):

ROW 3 is now a **two-row microstructure block** that shows the five-factor inputs in a compact, scannable format. It only appears when the card is not in `preview` mode (landing page cards keep a simplified version).

**New ROW 3A — Market Data Row:**
```
0.52 → 0.64  +12.0%  ·  +8.2σ  ·  Held 8 ticks
```
- `0.52 → 0.64`: `font-mono text-sm text-prism-text-1`.
- `+12.0%`: colored by direction — `text-signal-green` (up) or `text-signal-red` (down).
- `·` divider: `text-prism-text-3`.
- `+8.2σ`: `font-mono text-xs font-bold`. Color logic:
  - < 2σ: `text-prism-text-3`
  - 2–4σ: `text-sigma-high` (amber)
  - 5σ+: `text-sigma-extreme` (red/orange)
  This is the key new visible differentiator — sigma is a real quant concept that immediately tells users this move is unusual.
- `Held 8 ticks`: `font-mono text-xs text-prism-text-2`. Only show if `persistence_ticks >= 2`. If 0 or 1, omit this segment entirely.

**New ROW 3B — Order Flow Row:**
```
Bid 2.1M  ▶▶▶▶▶░░  Ask 840k  ·  +340k net buying
```
- `Bid 2.1M` / `Ask 840k`: `font-mono text-xs`. Bid in `text-depth-bid`, Ask in `text-depth-ask`.
- The small bar between them: a 48px horizontal bar split proportionally between bid depth (left, `bg-depth-bid`) and ask depth (right, `bg-depth-ask`). Height 4px, `rounded-full`.
  - This gives instant visual on whether buyers or sellers dominate.
- `+340k net buying` / `-180k net selling`: `font-mono text-xs`. Net buying in `text-flow-buy`, net selling in `text-flow-sell`. Show absolute NGN value in compact format (e.g., `340k`, `2.1M`).
- If `net_order_flow` is 0 or very small (< 5% of volume), show `Balanced flow` in `text-prism-text-3` instead.

**ROW 3B only shows on INFORMED_MOVE and UNCERTAIN cards.** For NOISE cards, ROW 3B is replaced by a single line:
```
Thin market — low participation signal
```
`font-mono text-xs text-signal-red-muted italic`.

#### Updated Full Card Structure:

```
┌────────────────────────────────────────────────────────┐
│  ROW 1: [ScoreBadge md]  [Market Title]  [time ago]   │
│                                                        │
│  ROW 2: [ClassificationChip]                          │
│                                                        │
│  ROW 3A: 0.52→0.64 +12.0% · +8.2σ · Held 8 ticks   │
│  ROW 3B: Bid 2.1M ████░░ Ask 840k · +340k net buying │
│           (NOT shown for NOISE)                       │
│                                                        │
│  ROW 4 (if AI insight):                               │
│  "Directional order flow shows consistent net buying  │
│   with no unusual spread widening..."                 │
│  font-sans text-xs italic text-prism-text-2           │
│  border-t border-prism-navy-3/50 pt-3 mt-3            │
│                                                        │
│  ROW 5: [View Market →]                               │
└────────────────────────────────────────────────────────┘
```

#### Updated Left Border Rule:
No change. Still `border-l-[3px]` in classification color.

#### Updated Preview Mode (Landing Page):
In `preview` mode, show ROW 1, ROW 2, ROW 3A only (no ROW 3B, no ROW 4, no ROW 5). ROW 3A sigma and tick fields are blurred for unauthenticated users:
- `blur-sm select-none` on the `+8.2σ` and `Held N ticks` segments.
- Overlay a tiny inline pill: `Sign in for full data` in `font-mono text-[9px] text-prism-text-3`.

---

### 2.2 `ScoreBadge` — Minor Change

**Add a tooltip on hover** (desktop only, `title` attribute or Radix tooltip):
```
Score: 86 / 100
MoveFactor: 0.87
LiquidityFactor: 0.72
VolumeFactor: 0.95
OrderFlowFactor: 0.61
PersistenceFactor: 0.80
```
`font-mono text-[10px]`, dark tooltip `bg-prism-navy-2 border border-prism-steel`.
This is for power users and judges. It makes the score feel earned, not arbitrary.

---

### 2.3 New Component: `OrderBookBar` (`src/components/ui/OrderBookBar.tsx`)

A standalone reusable component that shows the bid/ask balance.

**Props**: `bidDepth: number, askDepth: number, size?: 'sm' | 'md'`

**Visual**:
```
Bid 2.1M  [████████░░░░░░░]  Ask 840k
          bid% ←→ ask%
```
- Total bar width: `sm` = 80px, `md` = 120px. Height: `sm` = 4px, `md` = 6px.
- `bg-depth-bid` for bid fill, `bg-depth-ask` for ask fill.
- `border-prism-navy-4` background track.
- Left label: `Bid {value}` in `font-mono text-[10px] text-depth-bid`.
- Right label: `Ask {value}` in `font-mono text-[10px] text-depth-ask`.

Used in: SignalCard ROW 3B, Market Detail snapshot row, Admin signal expand.

---

### 2.4 New Component: `SigmaTag` (`src/components/ui/SigmaTag.tsx`)

**Props**: `sigma: number`

Renders: `+{sigma}σ` (or `−{sigma}σ` if negative).

Color:
- `sigma < 2`: `text-prism-text-3` (not notable)
- `2 ≤ sigma < 4`: `text-sigma-high font-bold` (notable)
- `sigma ≥ 5`: `text-sigma-extreme font-bold` (extreme)

`font-mono text-xs`. No border. Inline element.

Used in: SignalCard ROW 3A, Market Detail header, Admin signals table new column.

---

### 2.5 New Component: `FactorBreakdownBar` (`src/components/ui/FactorBreakdownBar.tsx`)

**Props**: `label: string, value: number, weight: number`

A labeled progress bar showing a single scoring factor.

```
MOVE FACTOR    [████████████░░░░]  0.87  (30%)
```
- Label: `font-mono text-[9px] uppercase tracking-wide text-prism-text-3 w-[100px]`.
- Bar: `bg-prism-navy-4 h-1.5 rounded-full w-32`. Fill: `bg-prism-accent` proportional to `value` (0–1).
- Value text: `font-mono text-[10px] text-prism-text-mono`.
- Weight text: `font-mono text-[9px] text-prism-text-3`.

Used in: Admin signal expand panel (5 bars now, not 4), Market Detail signal history expand.

**All five factors now displayed:**
```
MOVE FACTOR      [████████████░░░░]  0.87  (30%)
LIQUIDITY DEPTH  [█████████░░░░░░░]  0.72  (25%)
VOLUME SPIKE     [███████████████░]  0.95  (20%)
ORDER FLOW       [████████░░░░░░░░]  0.61  (15%)
PERSISTENCE      [████████████████]  0.80  (10%)
```

---

### 2.6 `SignalCardSkeleton` — Minor Change

Add skeleton shapes for the new ROW 3A and 3B:
- ROW 3A: `h-3 w-56 rounded` (price + sigma + ticks).
- ROW 3B: `h-4 w-40 rounded` (bid/ask bar row).

---

## SECTION 3 — LANDING PAGE CHANGES

### 3.1 Hero Section — Pitch Language Update

**Change the eyebrow label** from:
> `BUILT ON MARKET MICROSTRUCTURE THEORY`

To:
> `ORDER FLOW ANALYSIS · REAL-TIME MICROSTRUCTURE · AI INTERPRETATION`

Three segments separated by `·` dividers. Each segment is its own `span` so they can stagger in independently during the GSAP intro animation (0.1s stagger per segment).

**Change the sub-headline** from:
> `Prism quantifies whether a prediction market price move is informed trading, speculation, or noise — in real time.`

To:
> `Prism runs real-time order flow analysis on prediction markets. Using live order book depth, trade flow, and historical volatility baselines, it tells you whether a price move is genuinely informed — or just noise.`

`font-sans text-base md:text-lg text-prism-text-2 max-w-xl mt-4`.

**Hero Score Strip — Update Mini Cards:**

The three example signal mini-cards must now show the upgraded data format.

OLD mini-card:
```
[●86] INFORMED MOVE
Osun Election
0.52 → 0.64 (+12%)
NGN 2.1M · 842 ord
```

NEW mini-card:
```
[●86] INFORMED MOVE
Osun Election
0.52 → 0.64 (+12%)  +8.2σ
Bid 2.1M ████░░ Ask 840k
+340k net buying
```

Same card dimensions. ROW 3 and 4 are condensed. The `+8.2σ` tag is in `text-sigma-extreme`. The order book bar is `OrderBookBar` in `sm` size.

---

### 3.2 "How It Works" Section — MAJOR REDESIGN

**Replace the four-factor grid with a five-factor grid.**

The section title changes from:
> `Four factors. One score. Instant clarity.`

To:
> `Five real data feeds. One score. Instant clarity.`

**The D3 flow diagram** (`src/components/landing/ScoreFlowDiagram.tsx`) must be rebuilt:

OLD:
```
[MARKET MOVE] → [PRICE DELTA / LIQUIDITY / VOLUME / ORDERS] → [SCORE] → [CLASSIFICATION] → [AI]
```

NEW (matches the upgrade brief's diagram):
```
BAYSE API FEEDS
├── Ticker (real-time)          ──┐
├── Order Book (depth ladder)   ──┤→ PRISM SIGNAL ENGINE → SCORE → CLASSIFICATION → GEMINI AI
├── Trades (executed flow)      ──┤      (5 factors)
└── Price History (baseline)    ──┘
```

**D3 Build Notes:**
- Left column: four API feed nodes. Each is a `rect` with rounded corners, 12px height, width 180px.
- Colors: `fill: #0D1B2E, stroke: #2D4A6B`.
- Feed labels in `font-mono text-[10px]`: `Ticker`, `Order Book`, `Trades`, `Price History`.
- Small icon badges on each feed node (SVG icons, not external): a `clock` for Ticker, `layers` for Order Book, `arrow-right-left` for Trades, `chart-line` for Price History.
- All four feeds converge with animated bezier lines into the Engine node (center).
- Engine node: larger `rect`, 180×80px, fill `#1A2D45`, stroke `#3B82F6`.
  - Label: `PRISM ENGINE` in `font-mono text-xs uppercase text-prism-text-1`.
  - Below: five tiny dots vertically stacked, colored green/blue/amber/purple/teal — representing the five factors.
- Arrow to Score node (circle, same as before).
- Arrow to Classification (three chips: green/amber/red).
- Arrow to AI node: Gemini icon (stylized G) + "AI ANALYSIS" label.

**Animation**: same DrawSVG / strokeDashoffset technique. Stagger: feed lines draw first (0.8s), then Engine appears (scale 0.8→1), then score node counts up, then classification chips pop in, then AI node fades in.

**The five-factor cards grid** (below the diagram):

Remove the old four-card grid. Replace with five cards (`grid grid-cols-2 md:grid-cols-5 gap-3 mt-12`).

| # | Title | Icon | Tag | Weight |
|---|---|---|---|---|
| 1 | `Move Factor` | `TrendingUp` | `VOLATILITY-ADJUSTED` | 30% |
| 2 | `Liquidity Depth` | `Layers` | `ORDER BOOK` | 25% |
| 3 | `Volume Spike` | `Zap` | `TRADE VOLUME` | 20% |
| 4 | `Order Flow` | `ArrowRightLeft` | `NET DIRECTIONAL` | 15% |
| 5 | `Persistence` | `Timer` | `PRICE HOLDING` | 10% |

Each card (`border border-prism-navy-3 bg-prism-navy-2 rounded-lg p-4`):
```
┌──────────────────┐
│  [icon]          │
│  MOVE FACTOR     │  ← font-mono text-[9px] uppercase text-prism-text-3
│                  │
│  "How many σ is  │  ← font-sans text-xs text-prism-text-3
│  this move above │
│  the 7-day       │
│  baseline?"      │
│                  │
│  Weight: 30%     │  ← font-mono text-xs text-prism-accent
└──────────────────┘
```

Card descriptions (concise, written for non-quant users):

- **Move Factor (30%)**: "How many standard deviations is this move above this market's own 7-day baseline? A 10% move on a volatile market scores low. A 10% move on a stable market scores high."
- **Liquidity Depth (25%)**: "Total NGN volume sitting in the top 5 bid and ask levels. Deep books mean the market can absorb large orders without manipulation. Thin books = easy to fake."
- **Volume Spike (20%)**: "Is the trading volume right now 2–3x higher than the rolling average? Volume confirms conviction. A big price move on low volume is suspicious."
- **Order Flow (15%)**: "Are buyers or sellers driving this move? Net buy pressure (buys > sells) on an upward move = conviction. Random mixed flow = speculation."
- **Persistence (10%)**: "Has this move held across multiple consecutive polls, or did it reverse immediately? Informed moves persist. Noise collapses."

---

### 3.3 Social Proof / Accuracy Strip — UPDATE

**Change the three stats** to reflect the backtesting capability:

OLD:
```
64%  Directional accuracy    847  Signals tracked    3x  Outperforms random
```

NEW:
```
7 DAYS  Historical data     5 FACTORS  Scoring model     64%  Informed accuracy
backtested before launch    real microstructure data       vs 50% random baseline
```

The "7 DAYS" stat counts up from 0 → 7 (integer). The "5 FACTORS" counts up 0 → 5. The "64%" counts up as before.

**This matters.** The original strip made Prism sound like it had been running for a while. The new strip leads with "7 days backtested" which is a stronger, more honest, more defensible claim.

---

### 3.4 "The Science" Section — UPDATE Two Cards

**Change the three column titles and content:**

Column 1 keeps `Kyle's Lambda` — no change.

Column 2 keeps `Amihud Illiquidity` — no change.

Column 3: **REPLACE** `Adverse Selection` content with `Order Flow Imbalance` content:
- Title: `Order Flow Analysis`
- Tag: `DIRECTIONAL CONVICTION`
- Body: "We count every executed trade — buy or sell — in the last 15 minutes. Net buy pressure alongside a rising price is the clearest signal of genuine informed participation, not manipulation."
- Bottom tag: `Trade Flow · Participation`

> Note: Adverse Selection is still conceptually present (it's why Order Flow matters) — it just doesn't need its own card anymore. The new card is more concrete and visually connected to a real data feed the user can relate to.

---

### 3.5 Live Signal Preview Section — Signal Data Changes

The landing page live signals strip (`GET /signals/latest`) now returns richer data. The preview cards must update.

**For unauthenticated users**, blur these additional fields:
- `+8.2σ` sigma value → `blur-sm`.
- Order book bar → `blur-sm`.
- Net order flow text → `blur-sm`.

**The blur callout text** changes from:
> `Sign in to see full insights`

To:
> `Sign in to see order flow data and AI analysis`

Position: a small `bg-prism-navy-3/80 backdrop-blur-sm` overlay pill centered over the blurred row. `font-mono text-[9px] text-prism-text-2 px-2 py-1 rounded-full`.

---

## SECTION 4 — DASHBOARD PAGE CHANGES

### 4.1 Filter Bar — One Addition

Add a **sigma filter** as a second filter row (appears below the classification chips, collapsible):

A small `Show σ filter` toggle link (`font-mono text-[10px] text-prism-text-3 underline cursor-pointer`). When clicked, reveals:

```
Min σ threshold:  [○——•————]  1.0σ  to  Any
```

A single range input slider, `0.5 → 5.0`, step 0.5. Default: `0.5` (show all). At `2.0+` it filters to moves above 2σ. At `4.0+` it filters to extreme moves only.

Client-side filter applied to the TanStack Query data. No new API call needed.

This feature is optional/advanced — it's collapsed by default so it doesn't clutter the UI, but it's a meaningful power-user feature that differentiates the product.

---

### 4.2 Stats Panel — Add New Metrics

**Panel 1 (Today's Overview) — Add one line:**

After the informed/uncertain/noise breakdown, add:
```
Avg σ:  4.2     of all today's signals
```
`font-mono text-xs text-prism-text-mono`. Label in `font-mono text-[10px] text-prism-text-3`.

**Panel 2 (Top Signal Right Now) — Update:**

Show sigma value below the score:
```
┌────────────────────────────┐
│  TOP SIGNAL                │
│                            │
│  [●86]   +8.2σ             │
│  Osun Election Winner      │
│  0.52 → 0.64  +12%        │
│  +340k net buying          │  ← NEW LINE (net order flow, compact)
│  View →                    │
└────────────────────────────┘
```

---

### 4.3 Live Pulse Indicator — Wording Update

Change from:
> `LIVE · last updated {X}s ago`

To:
> `LIVE · {N} markets monitored · refreshed {X}s ago`

`N` comes from the markets list count in the TanStack Query cache.

---

## SECTION 5 — MARKET DETAIL PAGE CHANGES

This page gains the most from the upgrade. It now has significantly more data to display.

### 5.1 Market Snapshot Row — ADD NEW FIELDS

**Original snapshot row** showed: Current Probability, Liquidity, Total Orders, Last Updated.

**Updated snapshot row** — replace the old 4-item layout with a 6-item grid (`grid grid-cols-3 md:grid-cols-6 gap-4`):

| Field | Value Example | Source |
|---|---|---|
| Current Probability | `64.0%` | Ticker `lastPrice` |
| 7-Day Volatility | `σ = 1.8%/tick` | Computed from Price History |
| Bid Depth | `NGN 2.1M` | Order Book top-5 bids |
| Ask Depth | `NGN 840k` | Order Book top-5 asks |
| Spread | `1.2%` | `best_ask - best_bid` |
| Net Flow (15min) | `+340k buying` | Trades net direction |

Each field: `bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-3`.
Label: `font-mono text-[10px] uppercase text-prism-text-3`.
Value: `font-mono text-base font-bold text-prism-text-1` or signal color for Net Flow.

---

### 5.2 Order Book Visualization — NEW COMPONENT

**Add this as a new panel BELOW the snapshot row, ABOVE the probability chart.**

`src/components/charts/OrderBookDepth.tsx`

A horizontal depth chart using D3. This is a standard market microstructure visualization.

**Layout**: `bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-4`. Full width. Height: 120px desktop, 80px mobile.

**The chart**:
- X-axis: Price (probability) from 0% to 100%, center = mid price.
- Y-axis: Cumulative depth (NGN).
- Left side (prices below mid): bids accumulate rightward in `fill: rgba(14, 165, 233, 0.3)` (sky blue), `stroke: #0EA5E9`.
- Right side (prices above mid): asks accumulate leftward in `fill: rgba(168, 85, 247, 0.3)` (purple), `stroke: #A855F7`.
- A vertical dashed line at the mid price in `stroke: #E2E8F0, opacity: 0.4`.
- X-axis labels in `font-mono text-[9px] text-prism-text-3`.

**Above the chart**, a row of quick stats:
```
Bid Depth: NGN 2.1M  |  Ask Depth: NGN 840k  |  Spread: 1.2%  |  Mid Price: 58.5%
```
`font-mono text-xs`. Separator `|` in `text-prism-text-3`.

**Data source**: `GET /markets/{id}` which returns `latest_order_book` from Redis cache. If no order book data yet (first visit), show an `EmptyState` with message `Order book data will appear after the next poll cycle (approx. 60s)`.

---

### 5.3 Probability Chart — Enhancement

**Add a new overlay layer** to the existing D3 chart.

Below the probability line, add a **volume bar series**: small vertical bars at the bottom of the chart (occupying bottom 20% of chart height) representing `volume_period` per snapshot. Color: `fill: #3B82F6, opacity: 0.4`. This is standard in trading charts (like Tradingview).

**Add a second line** (optional, if data exists): the `mid_price` from order book snapshots, as a dashed line in `stroke: #8B5CF6, strokeDasharray: 4,2, opacity: 0.5`. Label it `Mid Price (OB)` in the chart legend.

**Add a small legend** (top-right of chart, absolute positioned):
```
── Price probability
- - Mid price (order book)
█  Volume
```
`font-mono text-[9px] text-prism-text-3`.

---

### 5.4 Signals History Table — UPDATE COLUMNS

**Remove column**: `LIQUIDITY` (the old single aggregate number).
**Remove column**: `ORDERS` (the old total order count).

**Add columns**:
- `σ` — The sigma value for each signal. Use `SigmaTag` component.
- `OB DEPTH` — `bid_depth + ask_depth` in compact NGN format.
- `NET FLOW` — `net_order_flow` formatted with `+/-` and color.

**Updated column order:**
`SCORE | CLASS | Δ PROB | σ | OB DEPTH | NET FLOW | PERSIST | TIME`

Column widths (guidance for CSS): Score 50px, Class 120px, ΔProb 70px, σ 55px, OB Depth 80px, Net Flow 90px, Persist 65px, Time 80px.

**Mobile**: Hide `OB DEPTH` and `PERSIST` columns. Show `SCORE | CLASS | Δ PROB | σ | TIME` only.

---

### 5.5 Signal Expand Row — UPDATE

The expandable row for each signal in the history table now shows the **5-factor breakdown** (not 4).

**New expanded panel layout:**
```
┌─────────────────────────────────────────────────────────┐
│  SIGNAL DETAIL  #1042  ·  Detected 14:23 UTC           │
│                                                         │
│  SCORE BREAKDOWN                                        │
│  MOVE FACTOR      ████████████░░  0.87  (30%)          │
│  LIQUIDITY DEPTH  █████████░░░░░  0.72  (25%)          │
│  VOLUME SPIKE     ███████████████ 0.95  (20%)          │
│  ORDER FLOW       ████████░░░░░░  0.61  (15%)          │
│  PERSISTENCE      ████████████░░  0.80  (10%)          │
│                                                         │
│  RAW INPUTS                                             │
│  7-day vol baseline: 1.8%   Move sigma: +8.2σ          │
│  Bid depth: NGN 2.1M        Ask depth: NGN 840k        │
│  Net flow: +340k buying     Persistence: 8 ticks       │
│                                                         │
│  AI INSIGHT                                             │
│  "Directional order flow shows consistent net          │
│   buying with no unusual spread widening..."           │
└─────────────────────────────────────────────────────────┘
```

**RAW INPUTS** section: 2-column grid of `DataRow` components. Labeled `font-mono text-[10px] uppercase text-prism-text-3 border-b border-prism-navy-3 pb-1 mb-2 mt-3`.

---

## SECTION 6 — PERFORMANCE PAGE CHANGES

### 6.1 Page Header — Language Update

**Sub-headline** changes from:
> `Historical accuracy of Prism signal classifications.`

To:
> `Backtested on 7 days of historical price data. Validated against real market outcomes.`

This is a meaningful change — it tells judges and users that the numbers are not hypothetical.

---

### 6.2 Summary Metrics Row — UPDATE

**Replace all four metric cards** with updated versions:

| Old | New |
|---|---|
| Total Signals Tracked | Total Signals Tracked (no change) |
| Resolved Signals | Backtested Signals ← rename, different badge |
| INFORMED Accuracy: 64% | INFORMED Accuracy: 64% ← keep but add context line |
| vs Random Baseline: +14pp | Avg σ of INFORMED signals ← replace this metric |

**Updated card 2** — `Backtested Signals`:
- Value: same number as resolved.
- Below value: `from 7-day price history` in `font-mono text-[9px] text-prism-text-3`.
- Badge icon: small `HistoryIcon` (Lucide `History`) next to the label.

**Updated card 3** — INFORMED Accuracy:
- Value: `64%` (no change).
- Below value: `vs 50% random baseline` in `font-mono text-[9px] text-signal-green`.
- Tiny upward arrow icon before the percentage.

**Updated card 4** — Avg σ of INFORMED signals:
- Value: e.g., `6.4σ` in `font-mono text-3xl font-bold text-sigma-extreme`.
- Label: `AVG σ (INFORMED)`.
- Below: `vs 1.8σ for NOISE signals` in `font-mono text-[9px] text-prism-text-3`.
This card powerfully illustrates that the scoring model actually works — high sigma moves get classified as INFORMED, low sigma as NOISE. This is the quant proof.

---

### 6.3 Performance Table — ADD COLUMNS

**Add these two columns** to the existing table:

Between `SCORE` and `CLASS`:
- `σ` — sigma value, using `SigmaTag` component.

Between `DIRECTION CALLED` and `PROB @ SIGNAL`:
- `OB SPREAD` — the bid-ask spread at the time of signal detection. `font-mono text-xs`. If spread was < 2%, show in `text-signal-green`. If > 5%, show in `text-signal-red`.

**The spread column is important** — it lets users see that INFORMED signals tend to have narrower spreads (the market is liquid and tight), while NOISE signals often have wide spreads. This adds analytical value to the table.

---

### 6.4 Accuracy Over Time Chart — UPDATE

**Add a second series to the existing chart:**

A second line: rolling 7-day average sigma of signals. Right Y-axis (or a small secondary chart below). Color: `stroke: #8B5CF6` (purple).

This shows users that as signals get more intense (higher sigma), accuracy improves. It's a powerful visual proof of the model.

If a second Y-axis feels too complex, make it a separate small sub-chart below the main chart with the same X-axis. Label: `Avg σ of signals`. Height: 80px.

---

### 6.5 New Panel: Backtest Results Summary

**Add this panel ABOVE the performance table**, between the metrics row and the score distribution chart.

```
┌─────────────────────────────────────────────────────────────┐
│  7-DAY BACKTEST RESULTS                                     │  ← eyebrow
│                                                             │
│  "Over 7 days of historical price data, Prism scored       │
│   every significant movement using the five-factor         │
│   model. High-confidence signals (≥70) showed 64%         │
│   directional accuracy — 14 percentage points above        │
│   the random baseline of 50%."                             │
│                                                             │
│  NOISE signals: 48% accuracy (near-random, as expected)    │
│  UNCERTAIN signals: 54% accuracy                           │
│  INFORMED signals: 64% accuracy                            │
└─────────────────────────────────────────────────────────────┘
```

Style: `bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-5`.
Quote text: `font-sans text-sm italic text-prism-text-2`.
Bottom three lines: `font-mono text-xs`. NOISE in `text-signal-red-muted`, UNCERTAIN in `text-signal-amber`, INFORMED in `text-signal-green`.

---

## SECTION 7 — ADMIN PAGES CHANGES

### 7.1 Admin Signals Page — TABLE COLUMN UPDATES

**Remove**: `VOL RATIO` column (the old rough ratio).
**Add**:
- `σ` column — sigma value using `SigmaTag`.
- `FLOW` column — net_order_flow direction. `▲` in green (buying), `▼` in red (selling), `—` if neutral.
- `PERSIST` column — persistence ticks. `font-mono text-xs`. If 0, `—`. If ≥ 5, highlight in `text-signal-green`.
- `SPREAD` column — order book spread at detection time. `font-mono text-xs`.

**Updated column order:**
`ID | MARKET | SCORE | CLASS | ΔPROB | σ | FLOW | PERSIST | SPREAD | AI? | TIME | OUTCOME`

**Mobile admin signals**: Show `ID | SCORE | CLASS | σ | TIME | OUTCOME` only.

---

### 7.2 Admin Signals Expand Panel — Updated (see Section 5.5 above)

The expand panel is the same spec as Market Detail Signal Expand. Use the same component (`SignalExpandPanel` or equivalent). No duplication needed — one component, used in two places.

---

### 7.3 Admin System Health — ADD JOB STATUS DETAILS

**Update the Job Schedule Panel** to show which jobs touch which data sources:

```
JOB NAME          │  FREQUENCY  │  FEEDS                         │  STATUS
ingestion_job     │  60s        │  Ticker + Trades               │  SUCCESS
ingestion_job     │  120s       │  + Order Book                  │  (every 2 cycles)
ingestion_job     │  300s       │  + Price History               │  (every 5 cycles)
ingestion_job     │  3600s      │  + Market List refresh         │  (every 60 cycles)
signal_detector   │  90s        │  All cached data               │  SUCCESS
outcome_evaluator │  30min      │  Snapshots (lookback)          │  SUCCESS
```

The `FEEDS` column is new. It makes it clear to the admin that different data types poll at different rates, which helps with debugging.

---

### 7.4 Admin Dashboard — ADD KPI

**Add a fifth KPI card** to the KPI grid (adjust to `grid-cols-3 md:grid-cols-5`):

```
┌───────────────────┐
│  AVG SIGNAL σ     │
│                   │
│  6.4σ             │
│  today's avg      │
└───────────────────┘
```
Value in `font-mono text-3xl font-bold text-sigma-extreme`.

---

## SECTION 8 — METHODOLOGY PAGE CHANGES

### 8.1 Formula Section — UPDATE

**Replace the old four-factor formula** code block with the new five-factor version:

```python
signal_score = 100 × (
  0.30 × MoveFactor           # Δprice / 7-day σ baseline, capped at 5σ
  0.25 × LiquidityFactor      # log10(bid_depth + ask_depth) / 7.0
  0.20 × VolumeFactor         # trade_volume / rolling_avg_volume, capped at 3x
  0.15 × OrderFlowFactor      # |net_order_flow| / avg_flow, capped at 2x
  0.10 × PersistenceFactor    # persistence_ticks / 5, capped at 1.0
)
```

Add a comment row explaining the weight change from the original PRD:
```
Note: Move factor weight reduced from 40% to 30% in v2.
Rationale: volatility-adjusted, so raw delta is a less
dominant input. The new Order Flow and Persistence factors
account for the rebalanced weight.
```
Style this as an inline comment in the code block (`text-prism-text-3` color inside the `<code>` block).

---

### 8.2 New Section: "What We Actually Measure"

**Add a new section** between "The Four Factors" (now "The Five Factors") and "Classification Thresholds".

Title: `What We Actually Measure`
Sub: `Each factor maps directly to a live data feed from the Bayse API.`

A table:

| Factor | Data Source | What It Proves |
|---|---|---|
| Move Factor | Ticker `lastPrice` vs Price History σ | Is this move statistically unusual for this market? |
| Liquidity Depth | Order Book top-5 bid + ask levels | Can the market absorb large orders without price impact? |
| Volume Spike | Trades `total_volume` vs rolling 1hr average | Are more participants active than usual? |
| Order Flow | Trades net (buys − sells) vs rolling average | Is there directional conviction, not just noise? |
| Persistence | Consecutive Ticker snapshots above delta threshold | Has the move held, or did it immediately reverse? |

Same table style as the existing Classification Threshold table.

---

### 8.3 Update the "Quant Concepts" Column Headers

In the existing "Four Factors" table (now "Five Factors"), update the `Quant Concept` column for the two new factors:

| Factor | Quant Concept (updated) |
|---|---|
| Order Flow Factor | Kyle's Lambda, Adverse Selection, Directional Order Flow Imbalance |
| Persistence Factor | Price Persistence Theory — informed moves sustain; noise reverts |

---

## SECTION 9 — GLOBAL CHANGES ACROSS ALL PAGES

### 9.1 Tagline Update

Wherever the tagline appears (header tooltip, footer, landing page CTA, about page), update:

**Old tagline**: `Separate Signal from Noise in Real-Time Prediction Markets`

**New tagline**: `Real-Time Order Flow Intelligence for Prediction Markets`

This tagline is technically stronger and more accurate to the product.

---

### 9.2 API Data Shape Update for Frontend Types

**Update `src/types/signal.ts`**:

Add these new fields to the `Signal` type interface:

```typescript
// src/types/signal.ts

export interface Signal {
  id: number;
  market_id: string;
  market_title?: string;

  // Price movement
  prev_probability: number;
  curr_probability: number;
  delta_p: number;
  direction: 'up' | 'down';

  // NEW scoring inputs
  historical_vol: number;           // 7-day σ baseline
  bid_depth: number;                // NGN top-5 bids
  ask_depth: number;                // NGN top-5 asks
  net_order_flow: number;           // NGN buys - sells
  trade_volume_period: number;      // NGN volume this window
  avg_volume_baseline: number;      // rolling 1hr avg volume
  persistence_ticks: number;        // consecutive ticks held

  // Score breakdown (all five now)
  score: number;
  classification: 'INFORMED_MOVE' | 'UNCERTAIN' | 'NOISE';
  move_factor: number;
  liquidity_factor: number;
  volume_factor: number;
  order_flow_factor: number;        // NEW
  persistence_factor: number;       // NEW

  // AI
  ai_insight?: string;
  ai_generated_at?: string;

  // Outcome
  outcome?: 'CORRECT' | 'REVERSED' | 'INCONCLUSIVE';
  prob_1hr_after?: number;

  detected_at: string;
}
```

**Update `src/types/market.ts`**:

Add order book type:

```typescript
export interface OrderBookLevel {
  price: number;
  size: number;
}

export interface OrderBookData {
  market_id: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  bid_depth_total: number;
  ask_depth_total: number;
  spread: number;
  mid_price: number;
  captured_at: string;
}

export interface MarketDetail {
  market: Market;
  latest_snapshot?: Snapshot;
  latest_order_book?: OrderBookData;  // NEW
  snapshot_count: number;
}
```

---

### 9.3 New TanStack Query Hook

**Add `src/hooks/useOrderBook.ts`**:

```typescript
export const useOrderBook = (marketId: string) =>
  useQuery({
    queryKey: ['orderbook', marketId],
    queryFn: () => api.get<OrderBookData>(`/markets/${marketId}`).then(r => r.data.latest_order_book),
    refetchInterval: 60_000,
    staleTime: 55_000,
    enabled: !!marketId,
  });
```

---

### 9.4 Helper Utility Functions

**Add to `src/lib/utils.ts`**:

```typescript
// Compute sigma from signal data
export const computeSigma = (delta_p: number, historical_vol: number): number => {
  const vol = Math.max(historical_vol, 0.005);
  return parseFloat((delta_p / vol).toFixed(1));
};

// Format sigma for display
export const formatSigma = (sigma: number): string => {
  return `${sigma >= 0 ? '+' : ''}${sigma.toFixed(1)}σ`;
};

// Format net order flow
export const formatFlow = (flow: number): string => {
  const abs = Math.abs(flow);
  const label = abs >= 1_000_000
    ? `${(abs / 1_000_000).toFixed(1)}M`
    : abs >= 1_000
    ? `${(abs / 1_000).toFixed(0)}k`
    : abs.toFixed(0);
  return `${flow >= 0 ? '+' : '-'}${label} ${flow >= 0 ? 'buying' : 'selling'}`;
};

// Format NGN compact
export const formatNGN = (value: number): string => {
  if (value >= 1_000_000) return `NGN ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `NGN ${(value / 1_000).toFixed(0)}k`;
  return `NGN ${value.toFixed(0)}`;
};
```

---

## SECTION 10 — WHAT TO REMOVE COMPLETELY

These items from the original spec are **deleted**. Remove them from the codebase with no replacement.

| Item | Location | Reason |
|---|---|---|
| `Liquidity: NGN 2.1M \| Orders: 842 \| Vol: 3.2x avg` data row | SignalCard ROW 3 | Replaced by new ROW 3A + 3B |
| Four-factor `WEIGHTS` display block | Admin signal expand | Replaced by five-factor `FactorBreakdownBar` |
| `OrderFactor` display anywhere | All pages | Renamed and reworked — now it's `OrderFlowFactor` with different logic |
| `vol_ratio` field display | SignalCard, Admin table | Absorbed into `volume_factor` display |
| "orders count" as standalone metric | All pages | Orders count is no longer a direct scoring input |
| `MARKETS_REFRESH_INTERVAL_SECONDS` as visible admin config | Admin system | Internal config, not worth surfacing in UI |
| Landing page `Score: [22] NOISE` example with `orders: 3` as the differentiator | Problem statement comparison cards | Update to use spread/flow as the differentiator |

---

## SECTION 11 — PROBLEM STATEMENT CARDS UPDATE (Landing Page §7.2)

**The two comparison cards on the landing page must be rewritten.** The old version used `orders: 3` to show a bad signal. The new version uses order book depth and spread, which are richer and more accurate.

**LEFT CARD (Bad scenario) — UPDATED:**
```
┌──────────────────────────────────────┐
│  MANIPULATION TRAP                   │
│                                      │
│  Market jumps +20%                   │
│  Order book: NGN 40k total depth     │
│  Spread: 8.5% (extremely wide)       │
│  Net flow: 0 (single actor)          │
│  Move: +2.1σ (barely above noise)    │
│                                      │
│  Score: [22] NOISE                   │
│                                      │
│  "Thin book, wide spread. One        │
│   person moved this. You just        │
│   got trapped."                      │
└──────────────────────────────────────┘
```

**RIGHT CARD (Good scenario) — UPDATED:**
```
┌──────────────────────────────────────┐
│  INFORMED MOVE                       │
│                                      │
│  Market moves +8%                    │
│  Order book: NGN 2.9M total depth    │
│  Spread: 1.2% (tight, liquid)        │
│  Net flow: +340k buying (strong)     │
│  Move: +8.2σ above 7-day baseline    │
│                                      │
│  Score: [86] INFORMED MOVE           │
│                                      │
│  "Deep book, tight spread, net       │
│   buying pressure. This is broad-    │
│   based conviction. Pay attention."  │
└──────────────────────────────────────┘
```

---

## SECTION 12 — SUMMARY TABLE: ALL CHANGES AT A GLANCE

| Page / Component | Change Type | Summary |
|---|---|---|
| Design Tokens | ADD | 6 new color tokens (depth-bid, depth-ask, flow-buy, flow-sell, sigma-high, sigma-extreme) |
| `SignalCard` | REBUILD ROW 3 | Remove old 3-stat row. Add ROW 3A (delta + σ + persistence) and ROW 3B (order book bar + net flow) |
| `ScoreBadge` | ADD | Hover tooltip showing all 5 factor values |
| `OrderBookBar` | NEW | Bid/ask balance bar component |
| `SigmaTag` | NEW | Colored sigma value display |
| `FactorBreakdownBar` | UPDATE | Now 5 bars (was 4). Add order_flow and persistence bars |
| `SignalCardSkeleton` | UPDATE | New skeleton shapes for ROW 3A/3B |
| Landing hero | UPDATE | Eyebrow text, sub-headline, mini card data |
| Landing `ScoreFlowDiagram` | REBUILD | 4 API feed nodes → engine → score → classification → AI |
| Landing "How It Works" | UPDATE | 5-factor grid replaces 4-factor grid. New descriptions. |
| Landing social proof strip | UPDATE | Stats change to 7-day backtest / 5 factors / 64% accuracy |
| Landing Science section | UPDATE | Col 3 changes from Adverse Selection to Order Flow Analysis |
| Landing live signals | UPDATE | Blur sigma + order book data for unauthed users |
| Landing comparison cards | REWRITE | Old: orders count. New: spread + depth + sigma |
| Dashboard filter bar | ADD | Optional sigma filter (collapsed by default) |
| Dashboard stats panel | UPDATE | Add avg σ and net flow to top signal panel |
| Dashboard live indicator | UPDATE | Add market count |
| Market Detail snapshot row | UPDATE | 6 fields (add vol baseline, bid/ask depth, spread, net flow) |
| Market Detail order book | NEW PANEL | `OrderBookDepth` D3 chart component |
| Market Detail probability chart | UPDATE | Add volume bars + mid-price line |
| Market Detail signals table | UPDATE | Remove liquidity/orders columns. Add σ, OB depth, net flow, persist |
| Market Detail signal expand | UPDATE | 5-factor breakdown + raw inputs |
| Performance page header | UPDATE | Tagline references backtest |
| Performance metrics | UPDATE | Card 4 changes to avg σ. Card 2 renamed to Backtested Signals |
| Performance table | ADD COLUMNS | σ and OB Spread columns |
| Performance accuracy chart | UPDATE | Second series: avg σ over time |
| Performance new panel | ADD | 7-day backtest results summary block |
| Methodology formula | UPDATE | 5-factor formula replaces 4-factor |
| Methodology new section | ADD | "What We Actually Measure" data source table |
| Admin signals table | UPDATE | Add σ, FLOW, PERSIST, SPREAD columns. Remove VOL RATIO |
| Admin signals expand | UPDATE | Same as Market Detail signal expand (shared component) |
| Admin system health | UPDATE | Job schedule shows feed sources per job |
| Admin dashboard KPI | ADD | 5th card: Avg Signal σ |
| Global tagline | UPDATE | "Order Flow Intelligence" replaces "Separate Signal from Noise" |
| `src/types/signal.ts` | UPDATE | 7 new fields added |
| `src/types/market.ts` | UPDATE | OrderBookLevel, OrderBookData, MarketDetail types added |
| `src/hooks/useOrderBook.ts` | NEW | TanStack Query hook for order book data |
| `src/lib/utils.ts` | ADD | computeSigma, formatSigma, formatFlow, formatNGN helpers |

---

*End of Prism UI/UX Upgrade Delta v1.0*
*Cross-reference against PRISM_UI_SPEC.md. This document is additive — only items listed here change.*
*All unlisted pages and components remain as specified in the original spec.*
