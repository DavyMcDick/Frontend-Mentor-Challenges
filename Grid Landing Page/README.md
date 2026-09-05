# Bridge Collective landing page

A Frontend Mentor challenge built with HTML, Tailwind CSS, and a small JavaScript menu. The aim is to understand each change, compare it with the supplied design, and check that the page still works.

## Project links

- [Live demo](https://davymcdick.github.io/Frontend-Mentor-Challenges/Grid%20Landing%20Page/)
- [Source code](https://github.com/DavyMcDick/Frontend-Mentor-Challenges/tree/main/Grid%20Landing%20Page)

This challenge lives in the `Grid Landing Page` folder of the shared repository. Run the development commands below from inside that folder.

## Start here

Use Node.js 20 or newer. Run `npm ci` to install the exact development tools recorded in `package-lock.json`. Then run `npm run build` and open `index.html` in your browser.

The generated stylesheet is included at `assets/styles.css`, so opening the page does not require an internet connection. Dependencies are needed when rebuilding or testing, not when viewing the finished page.

## Where changes belong

| File | Responsibility |
| --- | --- |
| `index.html` | Content, meaningful HTML structure, and Tailwind layout classes. This is the only page entry point. |
| `styles/input.css` | Font loading, design colors, shared card styles, and menu positioning. Edit this source stylesheet. |
| `assets/styles.css` | Generated CSS used by the browser. Rebuild it; do not edit it by hand. |
| `menu.js` | Opening, closing, and keyboard behavior. |
| `tests/landing.spec.js` | Browser checks that you can rerun after changes. |
| `design/` and `style-guide.md` | The visual references and supplied design values. |

## A workflow you can practice

1. Choose one change, such as the space inside a statistics card. State what you expect to see before editing.
2. Run `npm run dev`. This watches your HTML and CSS and regenerates the stylesheet when you save. It is a CSS watcher, not a web server; refresh the open page yourself.
3. Find the relevant rule. For shared card spacing, begin with `.stat-card` in `styles/input.css`. Padding is the space inside the card, like packing material inside a box.
4. Make one small change and refresh. Compare it at mobile and desktop widths. Explain to yourself why it changed both sizes or only one.
5. Run `npm test` to rebuild the CSS and check the layout and menu. Review the result before making the next change.
6. Before publishing, run `npm run build`. Publish `index.html`, `menu.js`, and `assets/` together. Include the regenerated CSS whenever its source changes.

## Why the files are arranged this way

- HTML describes the content; CSS controls its appearance; JavaScript adds behavior. Separate files make each part easier to find and review.
- Tailwind is compiled before publishing. The browser receives ordinary CSS instead of downloading a script to generate styles. See the [official CLI workflow](https://tailwindcss.com/docs/installation/tailwind-cli).
- Exact dependency versions and the lockfile make installations repeatable. Keep both `package.json` and `package-lock.json` when sharing the source.
- One shared header-height variable keeps the navigation panel aligned with the header.
- Navigation is visible without JavaScript. The script hides it only after attaching the menu controls.
- Decorative icons have empty alternative text; controls have useful names and visible keyboard focus.

## Layout and navigation

Below 768px, the introduction and four cards stack. From 768px, the cards form two columns. From 1024px, the introduction takes 45% of the main area beside the grid. The tablet arrangement is inferred because only mobile and desktop reference images are included.

The menu supports its toggle, overlay dismissal, Escape, and a keyboard focus loop. The dimmed content cannot receive focus while it is open. Dismissal restores focus to the toggle; following a section link moves focus to that section.

About, Our Work, and Partners link to existing sections. Annual Report and Donate are marked unavailable and are not clickable until real destinations are supplied.

## Verification

`npm test` uses headless Google Chrome through Playwright. Install Chrome if it is not already present. To use Edge instead in PowerShell, set `$env:PLAYWRIGHT_CHANNEL = 'msedge'` before running the tests.

The tests cover five widths (320, 375, 768, 1024, 1440), card placement, overflow, menu size, keyboard use, mouse dismissal, focus restoration, disabled destinations, local assets, JavaScript-disabled navigation, hover, and a short viewport equivalent to 200% zoom reflow. Mobile and desktop screenshots are saved under `test-results/` for visual comparison; failures also retain diagnostic artifacts. These generated files are ignored by Git.

Automation does not replace looking at the page. Compare the screenshots with `design/mobile-design.jpg` and `design/desktop-design.jpg`; also try real browser zoom, Tab and Shift+Tab, and opening the menu after scrolling. Tests use Chrome, not a cross-browser accessibility certification.

## Practice explaining the design

Before changing the layout, try answering: which element holds all four cards, and why does changing that parent's columns move all four together? Then inspect one card and identify what keeps the icon and number above its label. These are useful checkpoints for understanding Grid and Flexbox.

Animations, remote data, new pages, and offline installation are outside this version.

Challenge by [Frontend Mentor](https://www.frontendmentor.io).

