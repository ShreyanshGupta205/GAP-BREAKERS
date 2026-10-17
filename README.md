# GAP//BREAKERS — Rebuild Reality

> **Hackathon:** Devlympics Shunya 2026 · Challenge: Bridge the Gap  
> **Tagline:** Different realities. One impossible mission.

## Overview

GAP//BREAKERS is a multiplayer collaborative puzzle game where players with different information, languages, and communication needs must work together to repair a broken bridge and save a floating city.

### Core Mechanic
- **Navigator** sees the rune sequence order
- **Decoder** knows which rune maps to which color  
- **Engineer** controls the energy switches
- Players must communicate and combine knowledge to activate: **CYAN → AMBER → VIOLET**

---

## Quick Start

```bash
cd gap-breakers
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file in the `gap-breakers/` directory:

```bash
# AI Integration (optional — game works without this)
# Get your key from: https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# Multiplayer (optional — solo mode works without these)
# Create a project at: https://supabase.com/
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Without any credentials:** The game runs in solo demo mode with fallback AI transformations.  
**With GEMINI_API_KEY:** Live Gemini 1.5 Flash transformations are used.  
**With Supabase credentials:** Real-time multiplayer is enabled.

---

## Demonstration Flow (Hackathon Demo)

1. Open the app → Landing page with animated floating city
2. Click **ENTER THE RIFT** → Player setup
3. Enter a name, pick avatar and language → **Continue to Lobby**
4. Click **BEGIN MISSION** (solo mode auto-fills simulated teammates)
5. Use the **perspective switcher** (top yellow bar) to view each role:
   - **NAVIGATOR** → See the route map (Spiral → Sun → Wave)
   - **DECODER** → See the rune table (Spiral=Cyan, Sun=Amber, Wave=Violet)
   - **ENGINEER** → See the control panel
6. Share clues using the buttons in the Intel panel → Watch bridge light up
7. Acknowledge the sequence as Engineer
8. Activate switches: **CYAN → AMBER → VIOLET** → Bridge completes, city saved!
9. Click **VIEW RESULTS** → See bridge score with transparent formula
10. Click **PLAY AGAIN** or **RETURN HOME**

### AI Demo
- Send any message in the chat
- Click **Translate / Simplify / Visualize / Explain** on the message
- With `GEMINI_API_KEY`: Live Gemini response
- Without key: Pre-built fallback (clearly labeled)

---

## Running Tests

```bash
npm test
```

Tests cover:
- Correct sequence: CYAN → AMBER → VIOLET
- Incorrect sequences do not win
- Bridge sections progress only with real game events
- Timer triggers failure state
- Score uses only actual game events
- Room code validation

---

## Build

```bash
npm run build
npm start
```

---

## Architecture

```
gap-breakers/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── setup/page.tsx      # Player configuration
│   ├── lobby/page.tsx      # Room create/join
│   ├── game/[missionId]/   # Main gameplay
│   ├── results/page.tsx    # Post-mission report
│   └── api/ai/transform/   # Secure Gemini endpoint
├── components/game/        # Game UI components
├── lib/game/               # Pure game logic (testable)
├── lib/ai/                 # AI transformation service
├── lib/validation/         # Input validation
├── stores/                 # Zustand game state
├── types/                  # TypeScript definitions
└── __tests__/              # Jest test suite
```

---

## What's Implemented

✅ Landing page with animated floating city preview  
✅ Player setup (name, avatar, language, communication format, accessibility)  
✅ Mission lobby with room code generation/joining  
✅ Full gameplay screen with all panels  
✅ Navigator/Decoder/Engineer role-specific clues  
✅ Solo mode with perspective switcher for demos  
✅ Deterministic 3-symbol puzzle (CYAN → AMBER → VIOLET)  
✅ Bridge progression tied to real game events (not fake progress)  
✅ 3-minute countdown timer with visual ring  
✅ Victory and failure states  
✅ AI transformation endpoint (translate/simplify/visualize/explain)  
✅ Transparent fallback when Gemini key absent  
✅ Post-mission report with actual game events  
✅ Transparent bridge score formula  
✅ Replay and Return Home flows  
✅ Simulated teammates clearly labeled [SIM]  

## What Requires Configuration

⚙️ **Live Gemini AI**: Requires `GEMINI_API_KEY` — game works without it  
⚙️ **Real multiplayer**: Requires Supabase — solo mode fully functional without it  

## Known Limitations

- Multiplayer Supabase integration is scaffolded but not wired in this build (solo mode is primary demo path)
- Sound effects not included (gameplay works silently per spec)
- Mobile layout uses desktop grid (optimized for 1024px+ screens for the hackathon demo)
