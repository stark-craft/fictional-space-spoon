# Personalization Timing Cheat Sheet

Reset to fresh order:
`window.__resetUgPersonalization()`

Storage key:
`samsung_ug_personalization_v1`

Timings and weights:
- Promo focus dwell: after 3s, `+1`
- Live sports preview: after 2s score panel, `+3`
- Apps motion preview: after 6.5s trailer/motion phase, `+3`
- Detail page open: immediate, `+4`
- Primary action: immediate, `+6`
- App launch: immediate, `+8`
- QR open: immediate, `+5`
- Normal content click: immediate, `+2`

Reorder score:
`original-order tiny boost + matching tag score * 0.55 + category affinity score + platform score + recent-event boost`

Memory:
last 80 events only. With no stored events/scores, rows stay in original order.
