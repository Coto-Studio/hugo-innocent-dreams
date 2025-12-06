# Frontend Refresh Implementation Plan

This document outlines a phased approach to refreshing the frontend of the Waking From Innocent Dreams website. The goal is to address the "zoomed in" feeling while modernizing the SCSS codebase.

---

## Phase 1: Code Cleanup

**Goal:** Remove outdated patterns, fix bugs, and simplify the codebase before making visual changes.

### 1.1 Fix Font Family Typo
- **File:** `assets/scss/libs/_vars.scss`
- **Line:** 24
- **Change:** `"Libre Caslon Tex"` → `"Libre Caslon Text"`
- **Risk:** Low

### 1.2 Remove Vendor Prefix Mixin Usage
The `@include vendor()` mixin is no longer needed—all target browsers support these properties unprefixed.

**Files to update:**

| File | Approximate Changes |
|------|---------------------|
| `assets/scss/base/_typography.scss` | 1 call |
| `assets/scss/components/_button.scss` | 2 calls |
| `assets/scss/components/_form.scss` | 6 calls |
| `assets/scss/components/_image.scss` | ~3 calls |
| `assets/scss/components/_row.scss` | ~4 calls |
| `assets/scss/layout/_wrapper.scss` | 4 calls |
| `assets/scss/layout/_intro.scss` | 8 calls |
| `assets/scss/layout/_header.scss` | 6 calls |
| `assets/scss/layout/_nav.scss` | 5 calls |
| `assets/scss/layout/_footer.scss` | 10+ calls |
| `assets/scss/layout/_main.scss` | ~3 calls |
| `assets/scss/layout/_navPanel.scss` | ~5 calls |

**Example transformation:**
```scss
// Before
@include vendor("display", "flex");
@include vendor("align-items", "center");
@include vendor("transition", "opacity 0.5s ease");

// After
display: flex;
align-items: center;
transition: opacity 0.5s ease;
```

### 1.3 Modernize Placeholder Selectors
- **File:** `assets/scss/components/_form.scss`
- **Lines:** 229-243, 304-322
- **Change:** Replace vendor-specific placeholder pseudo-elements with standard `::placeholder`

**Before:**
```scss
::-webkit-input-placeholder { opacity: 1; }
:-moz-placeholder { opacity: 1; }
::-moz-placeholder { opacity: 1; }
:-ms-input-placeholder { opacity: 1; }
```

**After:**
```scss
::placeholder { opacity: 1; }
```

### 1.4 Remove Dead/Commented Code
| File | Lines | Description |
|------|-------|-------------|
| `_nav.scss` | 20-24 | Commented min-height, line-height, padding |
| `_footer.scss` | 48-53 | Commented border-left rules |
| `_form.scss` | 31-32, 37-39 | Empty `:before` content rules |
| `_typography.scss` | 14-16 | Commented breakpoint |
| `_wrapper.scss` | 63-66 | Empty orientation rule |

### 1.5 Optional: Remove Vendor Mixin Files
After completing 1.2, consider whether to keep or remove:
- `assets/scss/libs/_vendor.scss` (292 lines)

**Decision:** Keep but deprecate with a comment, or remove entirely if no edge cases remain.

### 1.6 Testing Phase 1
- [ ] Run `hugo server` and verify site renders correctly
- [ ] Check browser DevTools for any CSS errors
- [ ] Test on Chrome, Firefox, Safari
- [ ] Verify all transitions/animations still work
- [ ] Check mobile nav panel functionality

---

## Phase 2: Proportion Adjustments

**Goal:** Reduce the "zoomed in" feeling by scaling down typography and adjusting content width.

### 2.1 Reduce Base Font Size
- **File:** `assets/scss/base/_typography.scss`
- **Lines:** 11-25

**Before:**
```scss
html {
  font-size: 16pt;

  @include breakpoints.breakpoint("<=large") {
    font-size: 14pt;
  }

  @include breakpoints.breakpoint("<=xxsmall") {
    font-size: 12pt;
  }
}
```

**After:**
```scss
html {
  font-size: 14pt;

  @include breakpoints.breakpoint("<=large") {
    font-size: 13pt;
  }

  @include breakpoints.breakpoint("<=xxsmall") {
    font-size: 11pt;
  }
}
```

### 2.2 Reduce Body Text Size
- **File:** `assets/scss/base/_typography.scss`
- **Lines:** 31-40

**Before:**
```scss
body,
input,
select,
textarea {
  font-family: font(family);
  font-weight: font(weight);
  font-size: 1.25rem;
  line-height: 1.8;
}
```

**After:**
```scss
body,
input,
select,
textarea {
  font-family: font(family);
  font-weight: font(weight);
  font-size: 1.125rem;
  line-height: 1.75;
}
```

### 2.3 Reduce Heading Scale
- **File:** `assets/scss/base/_typography.scss`
- **Lines:** 95-124

**Before:**
```scss
h1 {
  font-size: clamp(1.4rem, 4vw + 1rem, 4rem);
  line-height: 1.1;
  margin: 0 0 size(element-margin) 0;
}

h2 {
  font-size: clamp(1.2rem, 2vw + 1rem, 3rem);
  line-height: 1.3;
  margin: 0 0 (size(element-margin) * 0.75) 0;
}

h3 {
  font-size: 1.25rem;
  ...
}
```

**After:**
```scss
h1 {
  font-size: clamp(1.3rem, 3vw + 0.75rem, 2.75rem);
  line-height: 1.15;
  margin: 0 0 size(element-margin) 0;
}

h2 {
  font-size: clamp(1.1rem, 2vw + 0.5rem, 2rem);
  line-height: 1.3;
  margin: 0 0 (size(element-margin) * 0.75) 0;
}

h3 {
  font-size: 1.125rem;
  ...
}
```

### 2.4 Reduce Post Header Size
- **File:** `assets/scss/layout/_main.scss`
- **Lines:** 45-50

**Before:**
```scss
> h1, h2 {
  font-size: clamp(1.4rem, 4vw + 1rem, 3.75rem);
  line-height: 1.1;
  margin: 0 0 size(element-margin) 0;
}
```

**After:**
```scss
> h1, h2 {
  font-size: clamp(1.3rem, 3vw + 0.75rem, 2.5rem);
  line-height: 1.15;
  margin: 0 0 size(element-margin) 0;
}
```

### 2.5 Reduce Intro Section Typography
- **File:** `assets/scss/layout/_intro.scss`
- **Lines:** 28-40

**Before:**
```scss
h1 {
  font-size: 5rem;
  line-height: 1;
  text-shadow: 2px 2px 2px black;
}

p {
  font-size: 2.5rem;
  ...
}
```

**After:**
```scss
h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  text-shadow: 2px 2px 2px black;
}

p {
  font-size: 1.75rem;
  ...
}
```

Also update medium/small breakpoint sizes proportionally.

### 2.6 Reduce Content Max-Width
- **File:** `assets/scss/libs/_vars.scss`
- **Line:** 18

**Before:**
```scss
wrapper: 72rem,
```

**After:**
```scss
wrapper: 64rem,
```

### 2.7 Adjust Header Logo Size
- **File:** `assets/scss/layout/_header.scss`
- **Lines:** 42-43

**Before:**
```scss
font-size: 2.25rem;
...
padding: 1rem 1.75rem;
```

**After:**
```scss
font-size: 1.875rem;
...
padding: 0.875rem 1.5rem;
```

Also adjust breakpoint sizes proportionally.

### 2.8 Testing Phase 2
- [ ] Run `hugo server` and compare to original screenshots
- [ ] Test on 13" MacBook Air (primary target)
- [ ] Test on large display (5K)
- [ ] Test on mobile devices
- [ ] Verify text remains readable (not too small)
- [ ] Check that proportions feel balanced
- [ ] Verify intro section still has visual impact

---

## Phase 3: Spacing Refinements

**Goal:** Fine-tune spacing now that proportions are corrected. This phase may be minimal or unnecessary after Phase 2.

### 3.1 Evaluate Current Spacing
After Phase 2, assess whether spacing still feels cramped. The reduced font sizes may naturally improve the spacing perception.

### 3.2 Potential Adjustments

#### Navigation Padding (if needed)
- **File:** `assets/scss/layout/_nav.scss`
- **Line:** 56

```scss
// Current
padding: 1rem;

// Potential
padding: 1.125rem 1.25rem;
```

#### Form Field Spacing (if needed)
- **File:** `assets/scss/components/_form.scss`
- **Line:** 49

```scss
// Current
$gutter: (size(element-margin) * 0.75);

// Potential
$gutter: (size(element-margin) * 0.875);
```

#### Footer Section Padding (if needed)
- **File:** `assets/scss/layout/_footer.scss`
- Adjust the complex padding calculations if sections feel too tight

#### Button Sizing (if needed)
- **File:** `assets/scss/components/_button.scss`

```scss
// Current
min-height: 3rem;
line-height: 3rem;
padding: 0 2rem;

// Potential
min-height: 2.75rem;
line-height: 2.75rem;
padding: 0 1.75rem;
```

### 3.3 Add Breathing Room to Content (if needed)
- **File:** `assets/scss/layout/_main.scss`

```scss
// Add max-width constraint for text content
> .post {
  p, ul, ol, blockquote {
    max-width: 60ch;
  }
}
```

### 3.4 Testing Phase 3
- [ ] Compare before/after screenshots
- [ ] Verify improvements address the original concerns
- [ ] Final cross-browser testing
- [ ] Final responsive testing

---

## Phase 4: Modern CSS Enhancements (Optional/Future)

These are lower priority improvements for future consideration:

### 4.1 CSS Custom Properties ✅ COMPLETED
- Added CSS custom properties to `:root` in `_vars.scss`
- Properties defined for all three palettes: default, alt, and invert
- Sass `$palette` map retained for backward compatibility
- Enables future theming and potential dark mode support

### 4.2 Replace Custom Grid with CSS Grid ✅ COMPLETED
- Replaced `fixed-grid` mixin usage in `_main.scss > .posts` with native CSS Grid
- Uses `display: grid` with `grid-template-columns` and `gap`
- Responsive behavior maintained via breakpoints
- Simpler, more readable code

### 4.3 Add `prefers-reduced-motion` Support ✅ COMPLETED
- Added global `@media (prefers-reduced-motion: reduce)` in `_page.scss`
- Disables all animations and transitions for users who prefer reduced motion
- Respects accessibility preferences

### 4.4 Upgrade Font Awesome ⏸️ DEFERRED
**Status:** Not recommended at this time.

**Current state:**
- Uses Font Awesome v4 (`fa-*` classes)
- Icons used in: nav, footer, intro button, star ratings, form buttons, modals
- CSS loaded from `/css/font-awesome.min.css`

**Why deferred:**
- Icon classes are in theme partials (submodule) - requires coordinated theme update
- Only ~15 unique icons used - not a significant performance concern
- Migration would require updating both theme templates and local shortcodes
- v4 → v6 requires class name changes (`fa` → `fa-solid`, many icon name changes)

**Future path if needed:**
1. Audit all `fa-*` usage in templates
2. Create icon mapping from v4 to v6 names
3. Update theme submodule first, then local templates
4. Consider switching to a lighter solution (Heroicons, custom SVG sprites)

### 4.5 Remove jQuery Dependency ⏸️ DEFERRED
**Status:** Not recommended at this time.

**Current state:**
- jQuery v3.x in theme (`themes/hugo-theme-massively/assets/js/jquery.min.js`)
- Dependencies: `jquery.scrollex.min.js`, `jquery.scrolly.min.js`, `util.js`
- `main.js` heavily uses jQuery for: parallax effects, nav panel, scroll detection, breakpoint management

**Why deferred:**
- `main.js` (258 lines) would need complete rewrite
- Scroll effects rely on `scrollex` plugin for viewport-based triggers
- Nav panel uses custom jQuery `.panel()` plugin
- Parallax uses custom jQuery `._parallax()` plugin
- Breaking change risk is high for minimal benefit

**Future path if needed:**
1. Replace `breakpoints` with CSS media queries + `matchMedia()`
2. Replace `scrollex` with IntersectionObserver API
3. Replace parallax with CSS `transform: translateZ()` or remove entirely
4. Replace nav panel with CSS-only solution + minimal vanilla JS
5. Test thoroughly on all breakpoints and browsers

---

## Rollback Plan

If any phase introduces issues:

1. Each phase should be committed separately
2. Git tags can mark stable points: `pre-phase-1`, `post-phase-1`, etc.
3. Hugo's built-in server allows quick visual verification
4. Keep original values commented temporarily during testing

---

## Success Criteria

- [ ] Site no longer feels "zoomed in" on 13" displays
- [ ] Readability is maintained (text not too small)
- [ ] Proportions feel balanced across all viewport sizes
- [ ] All functionality preserved (nav, forms, animations)
- [ ] Codebase is cleaner and more maintainable
- [ ] No visual regressions on existing pages
