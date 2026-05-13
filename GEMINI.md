# Project Instructions

## Communication Style
- **Laconic Answers:** Responses must be extremely concise, direct, and focused exclusively on intent and technical rationale. Avoid all conversational filler, preambles, and postambles.

## UX & UI Standards (Demo Readiness)
- **Transitions:** All layout changes (sidebar toggle, content shifting) must use smooth transitions (e.g., `transition-all duration-300 ease-in-out`).
- **Interactivity:** Interactive elements like dashboard cards should provide visual feedback via hover effects (e.g., `hover:scale-105`, `hover:drop-shadow-xl`).
- **Consistency:** Ensure user profile data (names, avatars) is synchronized across all components (`Navbar`, `UserProfile`).
- **Branding:** Maintain the "DEMO" status visibility in primary navigation components.
- **Color Mapping:** Use explicit style attributes or verified Tailwind classes for dynamic color indicators to avoid purge/jit issues in production.

## Architectural Patterns
- **Primary Screens (SME):** Focused on localized (Spanish) dashboard experience. Located in `src/pages` (Dashboard, Orders, Customers, Products). Data source: `src/data/pymeData.js`.
- **Secondary Screens (Enterprise):** Advanced tools (Kanban, Calendar, Editor, Charts). Accessible via the "Más" (More) page. Data source: `src/data/dummy.js`.
- **Mobile Navigation:** Primary navigation on mobile is handled by `src/components/BottomNav.jsx`.
- **Branding:** "AdminPYME" with "DEMO" badge must be present in `Sidebar` (desktop) and `Navbar` (mobile).

