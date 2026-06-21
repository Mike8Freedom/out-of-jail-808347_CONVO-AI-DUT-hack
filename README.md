# Out of Jail 808347

**Mental Health Duolingo for Developer Teams**

> A gamified CBT platform where daily therapy sessions feel like leveling up in a comic-book survival game — not booking a therapist.

🎮 [Live Build](https://outofjail-808347.tilda.ws/) · 🤖 [AI Agent + Solana Page](https://outofjail-808347.tilda.ws/c1) · 🎬 [Game Teaser](https://vimeo.com/1144530154) · 📄 [Pitch Deck](/docs/pitch-deck.pdf)

---

## The Problem

Developer burnout is an industry-wide crisis with measurable business impact:

- **83% of software developers** experience burnout ([Haystack Analytics, 2024](https://www.usehaystack.io/blog/the-state-of-developer-burnout-2024)). **80%** feel unhappy in their roles, and **1 in 3** actively hate their job ([Stack Overflow Developer Survey, 2024](https://survey.stackoverflow.co/2024/))
- **73%** can't access mental-health care because it's too expensive
- Replacing a single burned-out engineer costs **$150K–$350K** depending on seniority
- Existing mental health apps have **~3% retention at Day 30** — they feel clinical, impersonal, and disconnected from developer identity

**The gap:** No product on the market treats developer mental health as a game worth playing — with real stakes, real characters, and real therapeutic outcomes.

## The Solution

Out of Jail is a transmedia cyber-prison narrative where each therapy session is a level in a survival game.

### Session Flow (4 Stages)

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌──────────────┐
│  1. WORLD INTRO  │───▶│  2. PRISONER MSG  │───▶│  3. NOEMI SESSION│───▶│  4. REWARD   │
│  Animated lore   │    │  Thematic monolog │    │  Voice CBT w/ AI │    │  NFT Capsule │
│  fragment        │    │  (identity, shadow│    │  prison warden   │    │  or next     │
│                  │    │   loneliness...)  │    │                  │    │  level unlock │
└─────────────────┘    └──────────────────┘    └─────────────────┘    └──────────────┘
```

**Stage 1 — World Intro:** Short animation revealing a fragment of the cyber-prison universe.

**Stage 2 — Prisoner's Message:** An audio monologue from the Creature (prisoner 808347) on a specific theme — loneliness, shadow acceptance, personal responsibility, crisis navigation. This primes emotional engagement.

**Stage 3 — Noemi Session:** The core therapeutic loop. Noemi is an AI conversational agent operating as a prison warden / system overseer. She conducts structured CBT micro-sessions using:
- Evidence-based CBT techniques (validated on large populations)
- Mindfulness practices
- Rogerian empathetic reflection
- Frankl's logotherapy elements (meaning-finding)
- Cacioppo's loneliness research framework

She asks one question at a time, reflects what the user shared, validates the emotional weight, and moves forward only when the user is ready.

**Stage 4 — Reward:** Successful session completion unlocks Memory Capsules — narrative fragments, micro-animations, and lore pieces that the player collects to map the cyber-prison world. This creates a collection loop that drives retention far beyond typical wellness apps.

## What We Built During the Hackathon

### Agora Integration — Conversational AI Voice Agent

We built a **real-time voice therapy widget** powered by Agora's Conversational AI platform:

- **Full voice pipeline:** Player mic → Agora RTC (noise suppression, echo cancellation) → ASR (speech-to-text) → LLM (Noemi's character prompt) → TTS → Agora RTC → Player headphones
- **Custom embeddable widget** (`noemi-widget.html`) — built from scratch since Agora Agent Studio only offers telephony deployment, not web embed
- **CORS proxy server** (`proxy-server.js`) to route browser API calls to Agora's REST API
- **Structured CBT session prompt** — Noemi follows a 4-phase therapeutic protocol (Grounding → Context → Core Questions → Integration) with mandatory empathetic reflection after each user response
- **Session timer** with timed reward unlock (3-minute threshold)
- **Public deployment** via ngrok tunnel, embedded on Tilda site via iframe with microphone permissions

**Key technical challenge solved:** Agora's Conversational AI has no web embed option — only telephony (SIP) deployment. We reverse-engineered the Agent Studio's REST API flow and built a complete browser-based RTC client that starts the agent, joins the voice channel, and manages the full session lifecycle.

### Solana Integration — Wallet + On-Chain Session Proof

- **Phantom wallet connect** — wallet-as-identity, no email/password required
- **Session-gated rewards** — Mint button appears only after completing a voice session
- **Memory Capsule mint on Solana devnet** — on-chain memo transaction recording session metadata:
  ```json
  {
    "type": "MemoryCapsule",
    "session": "CBT-Session-1",
    "creature": "808347",
    "level": 1,
    "next_level_unlocked": true,
    "session_type": "CBT_micro_session",
    "memory_capsule_id": "ooj-001",
    "duration_sec": 245
  }
  ```
- **Verifiable on Solana Explorer** — each completed session has an immutable on-chain proof

### Game Build (70% complete pre-hackathon)

- Multi-page narrative website on Tilda with full session flow
- Character design: Noemi (system overseer), Creature 808347 (prisoner)
- Animated video loops for character presence
- Session scripts for 7 CBT micro-sessions

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   PLAYER BROWSER                 │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐ │
│  │ Phantom   │  │ Agora    │  │ Noemi Widget  │ │
│  │ Wallet    │  │ RTC SDK  │  │ (HTML/JS)     │ │
│  └─────┬────┘  └─────┬────┘  └───────┬───────┘ │
└────────┼─────────────┼────────────────┼─────────┘
         │             │                │
         ▼             ▼                ▼
┌──────────────┐ ┌───────────┐  ┌──────────────┐
│ Solana       │ │ Agora     │  │ Proxy Server │
│ Devnet       │ │ RTC       │  │ (Node.js)    │
│              │ │ Channel   │  └──────┬───────┘
│ • Wallet ID  │ │           │         │
│ • Memo TX    │ │ • Voice   │         ▼
│ • NFT mint   │ │ • ASR     │  ┌──────────────┐
│              │ │ • TTS     │  │ Agora        │
└──────────────┘ └───────────┘  │ Conv. AI API │
                                │ (Agent mgmt) │
                                └──────────────┘
```

## Future Vision

### Dark Digital Confession Ritual (Agora Broadcast)
Live group sessions where one participant opens up while 10–15 anonymous listeners witness silently via Agora broadcast channels. Listeners can record short voice messages of support — sealed and delivered as post-session gifts. Each ritual is recorded as a group NFT artifact on Solana.

### Live Performances (Agora Streaming)
In-universe entertainment: Creature 808347 performs on a death arena stage. Live-streamed musical performances using Agora's audiovisual broadcasting, token-gated by player level.

### Soulbound Progress Token
Non-transferable identity token (Metaplex Core + PermanentFreezeDelegate) that maps a player's self-exploration journey across multiple life dimensions. A portable, verifiable "resilience passport."

### Encrypted Session Data (Solana)
Session transcripts encrypted on-chain. Players who volunteer anonymized data for AI model training contribute to a collectively-owned therapeutic intelligence — enabled by Solana's cryptographic infrastructure.

## Roadmap (6 months)

| Month | Milestone | Budget |
|-------|-----------|--------|
| 1 | Noemi voice quality upgrade (custom voice model), 3 full CBT session scripts, Metaplex Core NFT mint (real capsules with media) | $1,500 |
| 2 | Soulbound progress token, token-gated level access, 4 more session scripts covering shadow work, crisis navigation | $1,500 |
| 3 | Dark Digital Confession Ritual MVP (Agora broadcast), group NFT artifacts, first pilot with 2-3 dev teams (10-20 users) | $2,000 |
| 4 | Analytics dashboard for team leads (anonymized), retention optimization, encrypted session storage | $1,500 |
| 5 | B2B pilot program (5 companies, 50-100 users), season pass system (SOL/USDC payments), live performance prototype | $2,000 |
| 6 | Public launch, mobile optimization, partnership with mental health professionals for extended sessions | $1,500 |

**Total: $10,000** · Target: 5 B2B pilots, 100+ active users, measurable retention improvement vs. industry 3% Day-30 baseline.

## Market Opportunity

**Target segment:** Software development teams (10–50 people) — game studios, SaaS companies, digital agencies.

**Pricing model:** $250–300/month per team member, minimum 3-month commitment (6-month recommended).

**Unit economics example:**
- Team of 15 developers × $275/mo × 6 months = **$24,750 per contract**
- vs. replacing 1 burned-out senior dev: **$200,000+**
- ROI for the company: **8x return** if the tool prevents even one resignation

**Geographic focus (initial):** Southeast Asia — Vietnam (Da Nang, Hanoi), Philippines, Thailand. High density of dev teams, growing awareness of mental health, lower customer acquisition cost.

**Validation:** Founder outreach campaign launched during hackathon with positive initial responses from target companies.

## Hackathon Submission Answers

### How does your project use Agora?

Out of Jail uses Agora's **Conversational AI** as the core voice therapy engine. Noemi, the AI prison warden, conducts real-time CBT micro-sessions through Agora's full voice pipeline (RTC → ASR → LLM → TTS → RTC). We built a custom web widget since Agent Studio only supports telephony deployment — reverse-engineering the REST API to create a browser-based voice agent with session management, microphone publishing, and agent lifecycle control.

**Future Agora usage:** Broadcast channels for anonymous group confession rituals (1 host, 10-15 silent listeners) and live streaming for in-universe entertainment events.

### How does your project use Solana?

Solana serves three functions: **(1) Identity** — wallet connect replaces email/password, the wallet IS the player identity; **(2) Proof of therapy** — each completed session mints an on-chain memo transaction with session metadata, creating an immutable, verifiable record of progress; **(3) Reward system** — Memory Capsule NFTs (Metaplex Core) unlock narrative content and gate access to next levels.

**Future Solana usage:** Soulbound progress tokens (PermanentFreezeDelegate), encrypted session data storage, SOL/USDC season pass purchases, and collectively-owned AI training data via cryptographic consent.

### What is the retention mechanism?

Unlike clinical wellness apps (3% Day-30 retention), Out of Jail drives return visits through:
1. **Narrative collection loop** — each session unlocks a piece of the cyber-prison world
2. **Character relationship** — Noemi remembers, reflects, and evolves across sessions
3. **Social proof** — on-chain progress visible to the player, verifiable by their team
4. **Escalating depth** — early sessions handle symptoms; later sessions unlock deeper self-exploration, creating intrinsic motivation to continue

### What is the benefit to the Solana network?

| Metric | 3 Months | 6–12 Months |
|--------|----------|-------------|
| **Wallet Onboarding** | 150–400 new wallets during initial activation | 1,500–3,000 wallets as B2B pilots scale |
| **On-Chain Achievements** | 800–1,200 on-chain transactions in Season 1 | 5,000–15,000 transactions projected in first 6 months |
| **Micro-Transactions** | 4–6 tx per active user monthly | 1,200–4,000 tx/month as audience scales |
| **Multi-Season Growth** | 6–10 planned seasons | Ongoing influx of new players each season |

- **Every player becomes an active Solana user from Day 1** — wallet connect is the only identity mechanism
- **Progress is stored on-chain** — identity and transformation become permanent
- **Recurring network activity** — a sustainable economy of session mints, capsule trades, and season passes
- **Showcase use case:** Mental health × blockchain is an unexplored vertical that demonstrates Solana's utility beyond DeFi/gaming

## Team

**Mike Klementev** — Producer / Developer

| Project | Details |
|---------|---------|
| **Animaccord** Accelerator (2022) | Sci-Fi series handpicked from 20+ top pros for GO GLOBAL 16+ for Amazon Prime |
| **Origins of the Mountains** (2023) | Solo development of a Smart Speaker Game Quest ($58,000 market value validated by 1518 Studio & HSE) |
| **Toda Art Gallery UAE** (2 months) | Generated $450,000 in revenue from a live show (script, AI content, producer) |
| **WEB 3.0 Winner** — Yalla Hackathon (2024) | Developed and launched a functional AI assistant for a major cyber-sport event. Sponsored by Solana / Compass, Abu Dhabi |
| **SMU & APTOS** (2025) | NOEMI — AI conversational mental-health agent based on CBT scripts |
| **Mr. Golden Sheikh** (5 months) | Achieved 180,000+ TikTok followers/reach (Producer) |

## Tech Stack

| Component | Technology |
|-----------|------------|
| Voice AI Agent | Agora Conversational AI (ASR + LLM + TTS) |
| Voice Transport | Agora RTC SDK (Web) |
| LLM | GPT-4.1-mini (via Agora pipeline) |
| TTS | MiniMax Speech 2.8 Turbo |
| ASR | Deepgram Nova-3 |
| Blockchain | Solana (devnet) |
| Wallet | Phantom (wallet-adapter pattern) |
| NFT Framework | Metaplex Core (planned), Memo Program (current) |
| Frontend | Vanilla HTML/JS, Tilda (game pages) |
| Proxy Server | Node.js (CORS proxy for Agora API) |
| Deployment | ngrok (hackathon), Tilda (game site) |

## Repository Structure

```
├── noemi-widget.html      # Voice session widget (Agora + Phantom + NFT mint)
├── proxy-server.js        # Node.js CORS proxy for Agora Conversational AI API
├── index.html             # Game landing page
├── it-s1.html             # Session 1 intro
├── it-s2.html             # Session 2 intro
├── m1.html                # Module 1
├── m2.html                # Module 2
├── images/                # Character art, UI assets
│   ├── char-nomad-hero.png
│   ├── char-nomad.png
│   └── ...
├── docs/
│   ├── pitch-deck.pdf
│   ├── session-script-1.md
│   └── build-guide.md
└── README.md
```

## Quick Start

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/out-of-jail-808347.git
cd out-of-jail-808347

# Start proxy server (required for Agora API calls)
node proxy-server.js

# Open in browser
open http://localhost:8080/noemi-widget.html

# Flow: Connect Phantom Wallet → Start Session → Talk to Noemi → Claim Reward
```

**Requirements:**
- Node.js 18+
- Phantom wallet browser extension (set to Solana devnet)
- Devnet SOL for NFT minting (free airdrop inside Phantom)

## License

MIT

---

**Built during Convo AI Hackathon — Danang University 2026** · Agora + Solana Track

*"You earn your freedom one session at a time."*
