# Shiksha Sathi – Teacher Copilot

**Just-in-time, contextual coaching for government school teachers in India**

[Shikshalokam Theme 1 Hackathon Submission]

---

## 🚀 Live Demo

**https://your-app.vercel.app** *(Update with your deployment URL)*

## 🎥 Demo Video

[Embed YouTube/Vimeo link here]

---

## 📱 What it solves

Rural teachers like **Sunita** face a critical gap: they need immediate classroom support between monthly CRP visits. When a Class 4 subtraction lesson hits chaos—students confused about "zero in tens place" while fast finishers disrupt—there's no one to turn to.

**Shiksha Sathi** bridges this gap with **instant, actionable coaching** delivered right when teachers need it most.

### Sunita's Scenario:
- **Problem**: Class 4 subtraction → zero tens place confusion + fast finishers disrupting
- **Solution**: Gets 3 quick steps, 1 TLM activity using local materials, helper role strategies
- **Impact**: Resolves classroom chaos in minutes, not weeks

---

## 🛠️ Features

### Core Capabilities
- ✅ **Mobile-first, low-bandwidth optimized** UI
- ✅ **Context-aware micro-coaching** (class/subject/issue detection)
- ✅ **Local logging** + CRP dashboard mock for pattern detection
- ✅ **Voice input stubbed** (ready for Hindi ASR integration)
- ✅ **Offline-ready** architecture (localStorage persistence)
- ✅ **Smart history filters** by class and subject

### User Experience
- **Ask Screen**: Simple form with icons, voice button, green CTA
- **Suggestions**: Colorful context chips, sectioned strategies, activity ideas
- **History**: Filterable query log with status tracking
- **Coach View**: Mock CRP dashboard showing query patterns

---

## 📊 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (warm gradient theme)
- **Routing**: React Router v7
- **State**: React Context + localStorage
- **AI Logic**: Mock rule-based system (ready for LLM/NCERT RAG integration)
- **PWA**: Manifest + installable app support

---

## 📈 Impact

### Before Shiksha Sathi:
- ⏱️ Query-to-resolution: **Weeks** (waiting for CRP visit)
- 📉 Generic feedback, no context
- 😞 Teachers revert to rote teaching

### After Shiksha Sathi:
- ⚡ Query-to-resolution: **Seconds** (instant suggestions)
- 🎯 Context-aware, personalized strategies
- 😊 Teachers stay innovative, reduce burnout
- 📊 CRP pattern detection across clusters
- 🎓 FLN improvement at scale

---

## 🗺️ Next Steps

### Immediate Enhancements:
- [ ] **Hindi ASR** integration (Web Speech API / on-device)
- [ ] **NCERT content** retrieval-augmented generation
- [ ] **CRP backend** for multi-teacher aggregation
- [ ] **PWA offline mode** with service workers
- [ ] **Multilingual UI** (Hindi/English toggle)

### Future Vision:
- Real-time classroom analytics
- Peer teacher network
- Curriculum-aligned activity library
- Integration with government school systems

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppLayout.tsx   # Main layout with navigation
│   ├── QuestionForm.tsx # Form for asking questions
│   ├── SuggestionCard.tsx # Display suggestions
│   ├── HistoryList.tsx # List of past queries
│   └── ChipRow.tsx     # Tag chips display
├── pages/              # Screen components
│   ├── AskPage.tsx     # Home/Ask screen
│   ├── SuggestionsPage.tsx # Suggestions display
│   ├── HistoryPage.tsx # History list
│   ├── CoachPage.tsx   # Coach/CRP view
│   └── NotFoundPage.tsx # 404 page
├── store/              # State management
│   └── TeacherLogContext.tsx # Context for query history
├── lib/                 # Utilities
│   ├── mockCopilot.ts  # Mock AI logic (simple rule-based)
│   └── id.ts           # ID generation
└── types.ts            # TypeScript type definitions
```

---

## 🎯 Design Principles

1. **Mobile-First**: Large buttons (44px+), readable fonts, minimal navigation
2. **Low-Bandwidth Friendly**: Simple UI, minimal assets, fast loading
3. **Human Language**: Friendly, non-technical labels
4. **Immediate Action**: 2-3 bullet points, not long theory
5. **Local Materials**: Activities use sticks, stones, slate—things available in rural schools

---

## 📝 License

Built for Shikshalokam Theme 1 Hackathon demonstration purposes.

---

## 👥 Team

*[Add your team members here]*

---

## 🙏 Acknowledgments

- Shikshalokam for the hackathon opportunity
- Government school teachers across India for inspiration
- Open source community for amazing tools
