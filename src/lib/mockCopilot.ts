import type { CopilotSuggestions, TeacherQueryInput } from '../types'

function includesAny(haystack: string, needles: string[]) {
  const lower = haystack.toLowerCase()
  return needles.some((n) => lower.includes(n.toLowerCase()))
}

// Detect if input contains Hindi/Hinglish
function detectLanguage(text: string): 'hindi' | 'english' {
  const hindiKeywords = [
    'bacche', 'bacchon', 'samajh', 'samajh nahi', 'atak', 'atak gaye', 'galat',
    'sahi', 'sikhana', 'sikhaye', 'kya', 'kaise', 'kyun', 'nahi aa raha',
    'samasya', 'musibat', 'madad', 'zroorat'
  ]
  const lower = text.toLowerCase()
  return hindiKeywords.some(kw => lower.includes(kw)) ? 'hindi' : 'english'
}

/**
 * Mock “AI brain” for hackathon prototype.
 * Replace this with an actual LLM + guardrails + retrieval later.
 */
export function getMockSuggestions(input: TeacherQueryInput): CopilotSuggestions {
  const { classLevel, subject, issueType, description } = input

  const language = detectLanguage(description)
  const isHindi = language === 'hindi'

  const chips: string[] = [`Class ${classLevel}`, subject, issueType]

  const mentionsSubtraction = includesAny(description, [
    'subtraction', 'subtract', 'minus', 'borrowing', 'regroup',
    'ghataana', 'ghatana', 'subtraction'
  ])
  const mentionsZeroTens = includesAny(description, [
    'zero in tens', '0 in tens', 'tens place is zero', '0 tens',
    'zero tens place', 'shunya'
  ])
  const mentionsFastFinishers = includesAny(description, [
    'fast finish', 'advanced', 'quickly', 'disrupt', 'disturb', 'noise',
    'tez', 'jaldi', 'khatam', 'awaz', 'shor'
  ])

  if (subject === 'Math' && mentionsSubtraction) chips.push('Subtraction')
  if (mentionsZeroTens) chips.push('Zero in tens place')
  if (mentionsFastFinishers) chips.push('Fast finishers')
  
  // Add NCERT reference for math
  if (subject === 'Math' && classLevel >= 1 && classLevel <= 5) {
    chips.push(`NCERT Class ${classLevel}`)
  }

  // Default: short, concrete micro-coaching (2–3 bullets + 1 activity)
  const immediateSteps: string[] = isHindi
    ? [
        '60 second ruk jao: do bacchon ko slate/board par apna kaam dikhane do (ek sahi, ek galat).',
        'Aage ka step zor se bolo, poora solution nahi: "Hum regroup kar rahe hain kyunki 0 tens hain. Pehle hundreds se borrow karein."',
        '5 minute ke liye baithak badlo: ek steady learner ko struggling learner ke saath pair karo; fast finishers ko helper role do.',
      ]
    : [
        'Pause for 60 seconds: ask 2 students to show their work on slate/board (one correct, one common mistake).',
        'Say the "next step" out loud, not the full solution: "We are regrouping because there are 0 tens. We borrow from hundreds first."',
        'Regroup seating for 5 minutes: pair a steady learner with a struggling learner; give fast finishers a helper role.',
      ]

  const activityIdea = isHindi
    ? {
        title: '5-minute "Place Value Swap" - sticks/stones se',
        materials: ['10 sticks = 1 bundle (tens)', 'single sticks/stones (ones)', 'chalk/board'],
        steps: [
          'Floor/board par 1 "hundreds" box, 1 "tens" box, 1 "ones" box banayein.',
          'Bundles ke saath ek number dikhayen: jaise, 302 = 3 hundreds, 0 tens, 2 ones.',
          'Poochho: "Subtract karne ke liye, agar tens 0 hain toh kya karein?" Physically swap: 1 hundred → 10 tens; phir 1 ten → 10 ones (agar zarurat ho).',
          'Har group ko ek example do aur apne shabdon mein swap explain karne do.',
        ],
      }
    : {
        title: '5-minute "Place Value Swap" with sticks/stones',
        materials: ['10 sticks = 1 bundle (tens)', 'single sticks/stones (ones)', 'chalk/board'],
        steps: [
          'Make 1 "hundreds" box, 1 "tens" box, 1 "ones" box on the floor/board.',
          'Show a number with bundles: e.g., 302 = 3 hundreds, 0 tens, 2 ones.',
          'Ask: "To subtract, what do we do if tens are 0?" Physically swap: 1 hundred → 10 tens; then 1 ten → 10 ones (only if needed).',
          'Let each group do one example and explain the swap in their own words.',
        ],
      }

  const fastFinisherTips: string[] = isHindi
    ? [
        'Ek "challenge card" do: do alag subtraction questions banao jo dono ka answer same ho.',
        '"Quiet coach" assign karo: ek peer ke steps ko 3-point checklist se check karo (place value, regrouping, final answer).',
      ]
    : [
        'Give a "challenge card": make two different subtraction questions that both equal the same answer.',
        'Assign "quiet coach": check one peer\'s steps using a 3-point checklist (place value, regrouping, final answer).',
      ]

  // Small rule tweaks to be more contextual without feeling "black-box".
  if (issueType === 'Behaviour') {
    immediateSteps.splice(
      0,
      immediateSteps.length,
      isHindi
        ? 'Bacche ko nahi, behavior ko naam do: "Main side-talk dekh rahi hoon. 5 minute shanti chahiye."'
        : 'Name the behaviour, not the child: "I\'m seeing side-talk. We need quiet for 5 minutes."',
      isHindi
        ? 'Ek clear micro-task do: "Fast finishers, challenge card solve karo aur ek tip likho."'
        : 'Give a clear micro-task: "Fast finishers, solve the challenge card and write 1 tip for others."',
      isHindi
        ? 'Quick reset use karo: 10-second clap pattern / hand signal, phir resume.'
        : 'Use a quick reset: 10-second clap pattern / hand signal, then resume.'
    )
  }

  if (subject !== 'Math') {
    // Keep it usable for other subjects with simple, generic micro-steps.
    activityIdea.title = isHindi
      ? '5-minute "Think–Pair–Share" - local examples ke saath'
      : '5-minute "Think–Pair–Share" with local examples'
    activityIdea.materials = ['slate/notebook', 'board', 'local objects/pictures (optional)']
    activityIdea.steps.splice(
      0,
      activityIdea.steps.length,
      isHindi
        ? 'Aaj ke topic se related 1 simple sawaal puchho (ek sentence).'
        : 'Ask 1 simple question related to today\'s topic (one sentence).',
      isHindi
        ? 'Bacche 30 second silently socho, phir pair mein share karo.'
        : 'Students think silently for 30 seconds, then pair up and share.',
      isHindi
        ? '2 pairs ko bulao: ek accha answer + ek common confusion; example se gently correct karo.'
        : 'Call 2 pairs: one good answer + one common confusion; correct gently with an example.',
      isHindi
        ? '1-minute mini-task do: notebook/slate mein 2 examples likho.'
        : 'Give a 1-minute mini-task: write 2 examples in their notebook/slate.'
    )
  }

  if (mentionsZeroTens) {
    immediateSteps.unshift(
      isHindi
        ? 'Ek anchor line use karo: "Agar tens place 0 hai, toh pehle hundreds se borrow karein, phir tens banayein."'
        : 'Use one anchor line: "If the tens place is 0, we borrow from hundreds first, then make tens."'
    )
  }

  if (!mentionsFastFinishers) {
    fastFinisherTips.splice(
      0,
      fastFinisherTips.length,
      isHindi
        ? 'Early finishers se ek quick "how I solved it" picture step-by-step banwane ko kaho.'
        : 'Ask early finishers to draw a quick "how I solved it" picture step-by-step for others.',
      isHindi
        ? 'Unhe ek extension question do (thoda mushkil) taaki wo quietly engaged rahein.'
        : 'Give them one extension question (slightly harder) so they stay engaged quietly.'
    )
  }

  return {
    summaryChips: chips,
    immediateSteps,
    activityIdea,
    fastFinisherTips,
  }
}

