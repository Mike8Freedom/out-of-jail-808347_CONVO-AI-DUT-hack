<p align="center">
  <img src="images/noemi-avatar.png" width="300" alt="Noemi — System Overseer" />
</p>

<h1 align="center">🔒 Out of Jail 808347</h1>

<h3 align="center">Mental Health Duolingo for Developer Teams</h3>

<p align="center">
  <i>A gamified CBT platform where daily therapy sessions feel like leveling up in a comic-book survival game — not booking a therapist.</i>
</p>

<p align="center">
  🎮 <a href="https://outofjail-808347.tilda.ws/">Live Build</a> · 
  🤖 <a href="https://outofjail-808347.tilda.ws/c1">AI Agent + Solana</a> · 
  🎬 <a href="https://vimeo.com/1144530154">Game Teaser</a> · 
  📄 <a href="docs/pitch-deck.pdf">Pitch Deck</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hackathon-Convo%20AI%20DUT%202026-00e5ff?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Track-Agora%20%2B%20Solana-ab47bc?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Live%20Demo-4caf50?style=for-the-badge" />
</p>

---

## 🔥 The Problem

Developer burnout is an industry-wide crisis with measurable business impact:

> **83%** of software developers experience burnout — [Haystack Analytics, 2024](https://www.usehaystack.io/blog/the-state-of-developer-burnout-2024)

| 😰 | 💸 | 📉 |
|:---:|:---:|:---:|
| **80%** of developers feel unhappy in their roles. **1 in 3** actively hate their job | **$150K–$350K** cost to replace a single burned-out engineer | **~3%** Day-30 retention on existing mental health apps |
| [Stack Overflow, 2024](https://survey.stackoverflow.co/2024/) | Recruitment + onboarding + lost productivity | Clinical, impersonal, disconnected from developer identity |

**73%** can't access mental-health care because it's too expensive.

> 💡 **The gap:** No product on the market treats developer mental health as a game worth playing — with real stakes, real characters, and real therapeutic outcomes.

---

## 🎮 The Solution

**Out of Jail** is a transmedia cyber-prison narrative where each therapy session is a level in a survival game.

### 🔄 Session Flow (4 Stages)

```
🎬 WORLD INTRO ──▶ 🗣️ PRISONER MSG ──▶ 🎙️ NOEMI SESSION ──▶ 🏆 REWARD
   Animated lore      Thematic monolog     Voice CBT w/ AI      NFT Capsule
   fragment            (identity, shadow,   prison warden        or next
                        loneliness...)                           level unlock
```

**🎬 Stage 1 — World Intro:** Short animation revealing a fragment of the cyber-prison universe.

**🗣️ Stage 2 — Prisoner's Message:** An audio monologue from the Creature (prisoner 808347) on a specific theme — loneliness, shadow acceptance, personal responsibility, crisis navigation. This primes emotional engagement.

**🎙️ Stage 3 — Noemi Session:** The core therapeutic loop. Noemi is an AI conversational agent operating as a prison warden / system overseer. She conducts structured CBT micro-sessions using:
- 🧠 Evidence-based CBT techniques (validated on large populations)
- 🧘 Mindfulness practices
- 🪞 Rogerian empathetic reflection
- 🔍 Frankl's logotherapy elements (meaning-finding)
- 🤝 Cacioppo's loneliness research framework

She asks one question at a time, reflects what the user shared, validates the emotional weight, and moves forward only when the user is ready.

**🏆 Stage 4 — Reward:** Successful session completion unlocks Memory Capsules — narrative fragments, micro-animations, and lore pieces that the player collects to map the cyber-prison world. This creates a **collection loop** that drives retention far beyond typical wellness apps.

---

## 🛠️ What We Built During the Hackathon

### 🎙️ Agora Integration — Conversational AI Voice Agent

We built a **real-time voice therapy widget** powered by Agora's Conversational AI platform:

- 🔊 **Full voice pipeline:** Player mic → Agora RTC (noise suppression, echo cancellation) → ASR → LLM (Noemi's character) → TTS → Agora RTC → Player headphones
- 🧩 **Custom embeddable widget** (`noemi-widget.html`) — built from scratch since Agora Agent Studio only offers telephony deployment
- 🌐 **CORS proxy server** (`proxy-server.js`) to route browser API calls to Agora's REST API
- 📋 **Structured CBT session prompt** — 4-phase therapeutic protocol (Grounding → Context → Core Questions → Integration) with mandatory empathetic reflection after each response
- ⏱️ **Session timer** with timed reward unlock (3-minute threshold)
- 🚀 **Public deployment** via ngrok tunnel, embedded on Tilda via iframe with microphone permissions

> ⚡ **Key technical challenge solved:** Agora's Conversational AI has no web embed — only telephony (SIP) deployment. We reverse-engineered the Agent Studio's REST API and built a complete browser-based RTC client from scratch: agent start, voice channel join, microphone publishing, and full session lifecycle management.

### ⬡ Solana Integration — Wallet + On-Chain Session Proof

- 👛 **Phantom wallet connect** — wallet-as-identity, no email/password required
- 🔐 **Session-gated rewards** — Mint button appears only after completing a voice session
- 💎 **Memory Capsule mint on Solana devnet** — on-chain memo transaction recording session metadata:

```json
{
  "type": "MemoryCapsule",
  "session": "CBT-Session-1",
  "creature": "808347",
  "level": 1,
  "next_level_unlocked": true,
  "session_type": "CBT_micro_session",
  "memory_capsule_id": "ooj-001"
}
```

- ✅ **Verifiable on Solana Explorer** — each completed session has an immutable on-chain proof

### 🎨 Game Build (70% complete pre-hackathon)

- 🌐 Multi-page narrative website on Tilda with full session flow
- 👤 Character design: Noemi (system overseer), Creature 808347 (prisoner)
- 🎥 Animated video loops for character presence
- 📝 Session scripts for 7 CBT micro-sessions

### 📧 Market Validation

- 📊 Founder outreach campaign launched during hackathon targeting dev teams in Southeast Asia
- ✅ Positive initial responses from target companies

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  🖥️ PLAYER BROWSER                   │
│  ┌───────────┐  ┌───────────┐  ┌────────────────┐  │
│  │ 👛 Phantom │  │ 🔊 Agora  │  │ 🤖 Noemi       │  │
│  │   Wallet   │  │  RTC SDK  │  │   Widget       │  │
│  └─────┬─────┘  └─────┬─────┘  └───────┬────────┘  │
└────────┼───────────────┼────────────────┼───────────┘
         │               │                │
         ▼               ▼                ▼
┌──────────────┐  ┌────────────┐  ┌──────────────────┐
│ ⬡ Solana     │  │ 🔊 Agora   │  │ 🌐 Proxy Server  │
│   Devnet     │  │   RTC      │  │   (Node.js)      │
│              │  │   Channel  │  └────────┬─────────┘
│ • Wallet ID  │  │            │           │
│ • Memo TX    │  │ • Voice    │           ▼
│ • NFT mint   │  │ • ASR/TTS  │  ┌──────────────────┐
│              │  │            │  │ 🤖 Agora Conv.   │
└──────────────┘  └────────────┘  │    AI API        │
                                  └──────────────────┘
```

---

## 🔮 Future Vision

### 🕯️ Dark Digital Confession Ritual (Agora Broadcast)
Live group sessions where one participant opens up while 10–15 anonymous listeners witness silently via Agora broadcast channels. Listeners record short voice messages of support — sealed and delivered as post-session gifts. Each ritual becomes a group NFT artifact on Solana.

### 🎸 Live Performances (Agora Streaming)
In-universe entertainment: Creature 808347 performs on a death arena stage. Live-streamed musical performances using Agora's audiovisual broadcasting, token-gated by player level.

### 🔗 Soulbound Progress Token
Non-transferable identity token (Metaplex Core + PermanentFreezeDelegate) mapping a player's self-exploration journey across multiple life dimensions. A portable, verifiable **"resilience passport."**

### 🔐 Encrypted Session Data (Solana)
Session transcripts encrypted on-chain. Players who volunteer anonymized data for AI model training contribute to a collectively-owned therapeutic intelligence — enabled by Solana's cryptographic infrastructure.

---

## 🗺️ Roadmap

| Month | 🎯 Milestone | 💰 Budget |
|:-----:|-------------|:---------:|
| **1** | 🎙️ Custom Noemi voice model, 3 full CBT scripts, Metaplex Core NFT mint with media | $1,500 |
| **2** | 🔗 Soulbound progress token, token-gated levels, 4 new scripts (shadow work, crisis) | $1,500 |
| **3** | 🕯️ Dark Confession Ritual MVP (Agora broadcast), group NFTs, pilot with 2-3 dev teams | $2,000 |
| **4** | 📊 Analytics dashboard for team leads, retention optimization, encrypted storage | $1,500 |
| **5** | 🏢 B2B pilot (5 companies, 50-100 users), season pass (SOL/USDC), live performance | $2,000 |
| **6** | 🚀 Public launch, mobile optimization, partnerships with mental health professionals | $1,500 |

> **💰 Total: $10,000** · 🎯 Target: 5 B2B pilots, 100+ active users, measurable retention improvement vs. industry 3% Day-30 baseline

---

## 📈 Market Opportunity

| | |
|---|---|
| 🎯 **Target** | Software dev teams (10–50 people) — game studios, SaaS, digital agencies |
| 💵 **Pricing** | $250–300/month per team member, 3-6 month commitment |
| 📊 **Unit economics** | 15 devs × $275/mo × 6mo = **$24,750/contract** vs. **$200K+** to replace 1 engineer |
| 🌏 **Geographic focus** | Southeast Asia — Vietnam 🇻🇳, Philippines 🇵🇭, Thailand 🇹🇭 |
| ✅ **Validation** | Founder outreach during hackathon — positive initial responses |

---

## 📋 Hackathon Submission Answers

### 🎙️ How does your project use Agora?

Out of Jail uses Agora's **Conversational AI** as the core voice therapy engine. Noemi conducts real-time CBT micro-sessions through the full voice pipeline (RTC → ASR → LLM → TTS → RTC). We built a **custom web widget** since Agent Studio only supports telephony — reverse-engineering the REST API to create a browser-based voice agent with session management, microphone publishing, and agent lifecycle control.

**Future:** Broadcast channels for anonymous group confession rituals (1 host, 10-15 silent listeners) and live streaming for in-universe entertainment.

### ⬡ How does your project use Solana?

Solana serves three functions:
1. **👛 Identity** — wallet connect replaces email/password, the wallet IS the player
2. **📜 Proof of therapy** — each completed session mints an on-chain memo with session metadata
3. **🏆 Reward system** — Memory Capsule NFTs (Metaplex Core) unlock narrative content and gate access to next levels

**Future:** Soulbound tokens, encrypted session storage, SOL/USDC season passes, collectively-owned AI training data via cryptographic consent.

### 🔄 What is the retention mechanism?

Unlike clinical wellness apps (3% Day-30 retention), Out of Jail drives return visits through:
1. 📖 **Narrative collection loop** — each session unlocks a piece of the cyber-prison world
2. 🤖 **Character relationship** — Noemi remembers, reflects, and evolves across sessions
3. ⬡ **Social proof** — on-chain progress visible to the player, verifiable by their team
4. 🔍 **Escalating depth** — early sessions handle symptoms; later sessions unlock deeper self-exploration

### ⬡ What is the benefit to the Solana network?

| Metric | 📅 3 Months | 📅 6–12 Months |
|--------|:-----------:|:--------------:|
| 👛 **Wallet Onboarding** | 150–400 new wallets | 1,500–3,000 wallets |
| 🔗 **On-Chain Achievements** | 800–1,200 transactions | 5,000–15,000 transactions |
| 💱 **Micro-Transactions** | 4–6 tx/user/month | 1,200–4,000 tx/month |
| 🎮 **Multi-Season Growth** | 6–10 planned seasons | Ongoing new players each season |

- ✅ Every player becomes an active Solana user from **Day 1**
- ✅ Progress stored on-chain — identity and transformation become **permanent**
- ✅ Recurring network activity — sustainable economy of session mints & season passes
- ✅ Mental health × blockchain — an **unexplored vertical** beyond DeFi/gaming

---

## 👤 Team

<table>
<tr>
<td width="120" align="center">
  <img src="images/char-nomad.png" width="80" /><br>
  <b>Mike Klementev</b><br>
  <i>Producer / Developer</i>
</td>
<td>

| Project | Details |
|---------|---------|
| 🎬 **Animaccord** Accelerator (2022) | Sci-Fi series handpicked from 20+ pros for GO GLOBAL 16+ for Amazon Prime |
| 🎮 **Origins of the Mountains** (2023) | Solo development of Smart Speaker Game Quest ($58K market value — 1518 Studio & HSE) |
| 🎨 **Toda Art Gallery UAE** (2 months) | Generated **$450,000** in revenue from a live show (script, AI content, producer) |
| 🏆 **WEB 3.0 Winner** — Yalla (2024) | Built a functional AI assistant for a major cyber-sport event. Solana / Compass, Abu Dhabi |
| 🧠 **SMU & APTOS** (2025) | NOEMI — AI conversational mental-health agent based on CBT scripts |
| 📱 **Mr. Golden Sheikh** (5 months) | Achieved **180,000+** TikTok followers/reach (Producer) |

</td>
</tr>
</table>

---

## ⚙️ Tech Stack

| Component | Technology |
|:----------|:-----------|
| 🎙️ Voice AI Agent | Agora Conversational AI (ASR + LLM + TTS) |
| 🔊 Voice Transport | Agora RTC SDK (Web) |
| 🧠 LLM | GPT-4.1-mini (via Agora pipeline) |
| 🗣️ TTS | MiniMax Speech 2.8 Turbo |
| 👂 ASR | Deepgram Nova-3 |
| ⬡ Blockchain | Solana (devnet) |
| 👛 Wallet | Phantom (wallet-adapter pattern) |
| 💎 NFT Framework | Metaplex Core (planned), Memo Program (current) |
| 🌐 Frontend | Vanilla HTML/JS, Tilda (game pages) |
| 🖥️ Proxy Server | Node.js (CORS proxy for Agora API) |
| 🚀 Deployment | ngrok (hackathon), Tilda (game site) |

---

## 📁 Repository Structure

```
📦 out-of-jail-808347
├── 🤖 noemi-widget.html      # Voice session widget (Agora + Phantom + NFT)
├── 🌐 proxy-server.js        # Node.js CORS proxy for Agora API
├── 🏠 index.html             # Game landing page
├── 📖 it-s1.html             # Session 1 intro
├── 📖 it-s2.html             # Session 2 intro
├── 🎮 m1.html                # Module 1
├── 🎮 m2.html                # Module 2
├── 🎨 images/                # Character art, UI assets
├── 📄 docs/
│   └── pitch-deck.pdf
└── 📋 README.md
```

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Mike8Freedom/out-of-jail-808347_CONVO-AI-DUT-hack.git
cd out-of-jail-808347_CONVO-AI-DUT-hack

# Start proxy server (required for Agora API calls)
node proxy-server.js

# Open in browser
open http://localhost:8080/noemi-widget.html
```

**Flow:** 👛 Connect Phantom → 🎙️ Start Session → 🗣️ Talk to Noemi → 🏆 Claim Reward

**Requirements:**
- 📦 Node.js 18+
- 👛 Phantom wallet browser extension (set to Solana devnet)
- 💰 Devnet SOL for NFT minting (free airdrop inside Phantom)

---

## 📜 License

MIT

---

<p align="center">
  <b>🔒 Built during Convo AI Hackathon — Danang University 2026</b><br>
  Agora + Solana Track<br><br>
  <i>"You earn your freedom one session at a time."</i>
</p>
