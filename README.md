# zoiko-meds

## Zoi — ZoikoMeds Availability Assistant

Zoi is a conversational AI assistant integrated across the ZoikoMeds platform. It provides medicine availability lookups, platform navigation, persona-appropriate onboarding, and structured escalation to humans.

### Architecture

```
<ZoiProvider>            — session, persona, feature flags, consent state
 ├─ <ZoiLauncher/>       — page-aware label logic (pill, bottom-right)
 └─ <ZoiPanel/>          — dialog with focus management
     ├─ <ZoiHeader/>
     ├─ <ZoiViewport/>   — message list
     │    ├─ <MessageText/>
     │    ├─ <AvailabilityCard/>   — confidence-scored availability display
     │    ├─ <EscalationForm/>
     │    └─ <GuardrailNotice/>
     ├─ <ChipRow/>
     └─ <ZoiComposer/>   — input with send and rate limiting
```

### Persona routing

Zoi identifies user intent within the first exchange:

| Persona      | Entry point               |
|--------------|---------------------------|
| Patient      | `/patient/*`              |
| Pharmacy     | `/pharmacy/*`             |
| Enterprise   | `/enterprise/*`           |
| Wholesale    | `/wholesale/*`            |
| Login/Auth   | `/sign-in`, `/login`      |

### Key design decisions

- **Grounded responses** — availability data rendered as structured cards with confidence tiers (High/Moderate/Low), never as raw prose
- **Defense in depth** — safety classifier (pre), system policy (in), output validator (post)
- **No medical advice** — hard refusal boundary with warm human handoff
- **Conversation design** — precise, calm, humane. No emoji, no exclamation marks
- **Session handling** — anonymous by default, authenticated only on logged-in surfaces

### Usage

Zoi is added at the layout level and is available on every page:

```tsx
import { Zoi } from "@/components/zoi";

// In layout:
<Zoi />
```

### Run locally

```bash
npm install
npm run dev -- --webpack
```