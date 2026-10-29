# GAP//BREAKERS ✦ Rebuild Reality
### Cute ✦ Playful ✦ Funny ✦ Simple ✦ Professional

> **Hackathon:** Devlympics — Shunya 2026 (GDG on Campus · NSUT)  
> **Challenge / Theme:** **Bridge the Gap**  
> **Tagline:** Oops! Reality broke. Can you fix it together?  
> **Starring:** **Bloop the Bridge Builder** 🛠️  
> 📄 **Official Submission Package:** See [HACKATHON_SUBMISSION_PACKAGE.md](HACKATHON_SUBMISSION_PACKAGE.md) for full pitch scripts, architecture, and judge cheat sheets.

---

## The Big Idea

**GAP//BREAKERS** turns the hackathon theme (*"Which two sides should be able to connect, and what could exist between them to make that possible?"*) into a joyful, asymmetric cooperative browser game.

In our broken celestial world, islands have drifted apart because people stopped communicating. **No single player holds all the answers.** To rebuild the physical bridges and reignite the city's energy core, teammates must bridge:
1. **Information Asymmetry**: One player knows the *order*, one knows the *cipher*, one controls the *power console*.
2. **Language & Jargon Gaps**: Built-in Gemini AI live translations (English ↔ Hindi), simplifications, and visual metaphors.
3. **Cognitive Gaps**: Asymmetric roles (Navigator, Decoder, Engineer) designed so introverts, visual thinkers, and logical operators each shine.

---

## Quick Start (Play in 30 Seconds)

```bash
# 1. Install dependencies
npm install

# 2. Run the local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Verified Tests
```bash
npm test
```
*33 / 33 Unit Tests Passing (Deterministic state machines, bridge progression, puzzle validation, and scoring).*

### Production Build
```bash
npm run build
npm start
```
*Optimized production bundle with 0 TypeScript and 0 lint warnings.*

---

## How to Play (The 3 Asymmetric Perspectives)

| Role | Exclusive Clue | Responsibility |
| :--- | :--- | :--- |
| **Navigator** | Star Chart Route Map | Holds the true order of ancient runes: `1st Spiral → 2nd Sun → 3rd Wave`. |
| **Decoder** | Ancient Rune Cipher | Translates glyphs to energy colors: `Spiral = Cyan`, `Sun = Amber`, `Wave = Violet`. |
| **Engineer** | Power Console Switches | Flips the physical switches: `CYAN → AMBER → VIOLET`. |

---

## 🛠️ Procedural Web Audio API Sound Synthesizer

GAP//BREAKERS features an original, **100% procedural sound synthesizer** built directly on the browser's native **Web Audio API** (`lib/audio/soundEffects.ts`):
- **Zero External MP3s / 0ms Latency**: No missing audio files or network loading delays.
- **Micro-Interactions**:
  - Mechanical switch click with frequency pitch tuned to Cyan, Amber, and Violet.
  - Ascending celestial bridge restoration chime (`C5 → E5 → G5 → C6`).
  - Triumphant multi-voice C-major-9th orchestral victory fanfare.
  - Comical gentle wobble boop on incorrect sequences.
  - Cute bubbly pop for Bloop mascot emotions and messages.
- **Sound Toggle**: Instant mute/unmute control in the game header, persisted in `localStorage`.

---

## Hackathon Evaluator Quick-Test Guide

Short on time? We built dedicated testing tools specifically for judges:

1. Open `http://localhost:3000/game/mission-01`.
2. Click the gold **“Judge Guide”** button in the header.
3. Read the 3-step cheat sheet or click **“Run Auto-Solve Demo Loop”**.
4. Watch both clues broadcast, the sequence acknowledge, the switches activate in order, the bridge reconstruct itself, Bloop dance with confetti, and the transparent post-mission collaboration score appear!

---

## Gemini AI Transformation Engine

Powered by Google's **Gemini 1.5 Flash** (`/api/ai/transform`):
- **Translate**: Converts complex instructions between English and Hindi.
- **Simplify**: Strips away cognitive overload for quick tactical coordination.
- **Explain Differently**: Translates technical jargon into intuitive spatial metaphors.
- *Graceful Fallback*: If `GEMINI_API_KEY` is not set in `.env.local`, a deterministic fallback system provides instant sample translations so judges can test without API keys.

---

## Transparent Collaboration Score (No Fabricated Stats)

At the end of each mission, players receive a transparent **Collaboration Bridge Score** calculated strictly from observable events:

$$\text{Score} = \text{Completion (40)} + \text{Bridge (30)} + \text{Collaboration (20)} + \text{Accuracy (10)}$$

- **Zero fake metrics**: We never invent player empathy or psychological statistics.
- Observable telemetry tracks: completion time, correct actions, incorrect penalty activations, AI transformations used, and clues shared.

---

## Architecture

```
gap-breakers/
├── app/
│   ├── page.tsx               # Landing hero with floating islands & Bloop
│   ├── setup/page.tsx         # 3-step lightweight player onboarding
│   ├── lobby/page.tsx         # Campfire waiting room & room code sharing
│   ├── game/[missionId]/      # Asymmetric 3-panel collaborative game view
│   ├── results/page.tsx       # Post-mission collaboration report
│   ├── globals.css            # Cute & professional design tokens
│   └── api/ai/transform/      # Serverless Gemini AI transformation endpoint
├── components/game/
│   ├── Bloop.tsx              # Vector-animated mascot (7 emotional states)
│   ├── Avatars.tsx            # 6 custom illustrated character avatars
│   ├── WorldScene.tsx         # Floating island & 3-stage bridge animation
│   ├── CluePanel.tsx          # Collectible clue card with hint modal
│   ├── ControlPanel.tsx       # Tactile 3D switches with funny feedback
│   ├── MessageFeed.tsx        # Team chat with Gemini transform pills
│   ├── TeamPanel.tsx          # Roster with honest bot/player badges
│   └── MissionTimer.tsx       # High-contrast circular SVG timer
├── lib/
│   ├── audio/soundEffects.ts  # Web Audio API sound synthesizer
│   ├── game/state-machine.ts  # Deterministic pure state machines & scoring
│   ├── ai/types.ts            # Gemini prompt contracts & graceful fallbacks
│   └── validation/room.ts     # Room code generation & sanitization
├── stores/gameStore.ts        # Zustand + Immer reactive state management
└── __tests__/game.test.ts     # 33 Unit tests for all game rules
```

---

## Visual Design System & Identity

- **Primary Purple (`#7866E8`)**: Core brand actions & Decoder perspective.
- **Electric Blue (`#55A7F7`)**: Secondary actions & Navigator perspective.
- **Mint Green (`#9BE7C4`)**: Bridge repairs & Bloop mascot glow.
- **Soft Yellow (`#FFE28A`)**: Clue hints & Engineer perspective.
- **Coral Pink (`#FF9EAB`)**: Character accents & gentle warnings.
- **Canvas (`#FAF9F6`)**: High-contrast, warm, eye-friendly light surface.

---

## Devlympics Shunya 2026 Alignment

| Criteria | How GAP//BREAKERS Delivers |
| :--- | :--- |
| **Theme Fit ("Bridge the Gap")** | Literal & metaphorical bridges: info asymmetry, language translation, cognitive load. |
| **Originality & Wow Factor** | Custom mascot Bloop, tactile 3D switches, Web Audio synthesizer, Duolingo-level charm. |
| **Technical Excellence** | Next.js 16 App Router, Zustand, Immer, 33/33 unit tests, Web Audio, Gemini 1.5 Flash. |
| **Completeness & Polish** | Full game loop from landing to results, 0 unstyled classes, 0 build errors, honest telemetry. |

---
