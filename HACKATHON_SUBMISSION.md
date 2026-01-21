# Shiksha Sathi – Just-in-time Teacher Copilot (Theme 1)

## 1-line Summary

AI copilot gives rural teachers instant strategies for real classroom chaos between CRP visits.

---

## Problem

**Sunita** is a primary teacher in rural Jharkhand. During a Class 4 maths lesson on subtraction, her students are at very different learning levels. Advanced students finish quickly and get disruptive, while struggling students are stuck on understanding "zero in the tens place".

Her **Cluster Resource Person (CRP)** only visits once a month for 10–30 minutes and gives generic feedback like "ensure all students are engaged". There is no real-time, situation-specific coaching. When Sunita feels stuck, she abandons innovative activities and goes back to rote, chalk-and-talk teaching. This contributes to teacher burnout and weak learning outcomes.

**Across India, government school teachers face similar issues:**
- ⏱️ Long lag time between a classroom problem and support
- 📉 Generic feedback that doesn't address the specific class, concept, or behaviour issue
- 🚫 No in-time, personalized, context-aware coaching accessible on their own, especially in low-resource, low-bandwidth environments

---

## Solution

**Shiksha Sathi** is a mobile-first web app that gives teachers just-in-time, personalized guidance for classroom management and pedagogy.

### How it works:

1. **Ask**: Teacher describes situation (Class 4, subtraction, zero in tens place, fast finishers disrupting)
2. **Get**: Instant suggestions with:
   - 3 immediate steps (next 5 minutes)
   - 1 short activity using local TLM (sticks, stones, slate)
   - Fast finisher management tips
3. **Log**: History saved locally, patterns visible to CRPs

### Demo

**[Embed 2-min demo video + 3 screenshots]**

**Screenshots:**
1. Ask screen with form
2. Suggestions with colorful context chips
3. History with filters

**Live Demo**: https://your-app.vercel.app  
**Video**: [YouTube/Vimeo link]  
**Repo**: [GitHub link]

---

## Why Theme 1

✅ **Just-in-time**: Instant suggestions when teachers need them (seconds, not weeks)  
✅ **Mobile/offline**: Works on low-end phones, localStorage persistence  
✅ **Teacher+CRP loop**: Teacher queries logged, CRP dashboard shows patterns  
✅ **Micro-strategies**: 2-3 bullet points + 1 activity, not long theory  
✅ **Deploy-ready**: Production UI, PWA support, error handling

---

## Impact

- ⚡ **Query-to-resolution**: Weeks → Seconds
- 🎯 **Context-aware**: Specific to class/subject/issue type
- 📊 **Pattern detection**: CRPs see common doubts across clusters
- 🎓 **FLN improvement**: Better learning outcomes at scale
- 😊 **Teacher retention**: Reduces burnout, keeps teachers innovative

---

## Technical Highlights

- **React 19 + TypeScript** for type safety
- **Tailwind CSS** for mobile-first, low-bandwidth UI
- **Mock AI** ready for LLM/NCERT RAG integration
- **PWA** manifest for installable app
- **localStorage** for offline persistence

---

## Future Roadmap

- Hindi ASR for voice input
- NCERT content integration
- CRP backend for multi-teacher aggregation
- Service worker for true offline mode
- Multilingual UI (Hindi/English)

---

## Team

*[Add team members]*
