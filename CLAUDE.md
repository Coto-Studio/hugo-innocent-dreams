# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site for the book "Waking From Innocent Dreams" by Nelson/Roberto. The site uses a custom theme (hugo-theme-massively) and is deployed via Docker with Traefik reverse proxy and environment-specific configurations.

## Build and Development Commands

### Local Development
```bash
# Start Hugo development server (default environment)
hugo server

# Start with specific environment
hugo server --environment main
hugo server --environment dev

# Build site for specific environment
hugo --minify --environment main
hugo --minify --environment dev
```

### Docker Build
```bash
# Build Docker image (uses main environment by default)
docker build -t hugo-innocent-dreams .

# Build with specific environment
docker build --build-arg ENVIRONMENT=dev -t hugo-innocent-dreams:dev .
```

### Deployment
The project uses GitHub Actions for CI/CD:
- Pushes to `main` or `dev` branches trigger automated builds
- Workflow file: `.github/workflows/cs-hugo-build-and-deploy.yaml`
- Uses Coto Studio reusable workflows for Docker build and stack deployment
- Requires 1Password service account token for secrets management

Docker stack deployment template (`docker-stack-op.yaml.tpl`) uses 1Password template syntax (`{{ op://... }}`). The rendered file `docker-stack-op.yaml` is git-ignored.

## Architecture

### Multi-Environment Configuration
Hugo configuration is split across environments:
- `config/_default/` - Base configuration for all environments
- `config/main/` - Production environment (wakingfrominnocentdreams.com)
- `config/dev/` - Development/staging environment (beta.wakingfrominnocentdreams.com)
- Environment is specified via `--environment` flag or `ENVIRONMENT` build arg

### Custom Form System
The site implements a data-driven form builder:
- Forms defined in YAML: `data/forms/*.yaml`
- Rendered via shortcode: `layouts/shortcodes/form-builder.html`
- Usage in content: `{{< form-builder data="early-reader" >}}`
- Form fields support: text, textarea, checkbox, radio, select, star rating
- Integrated with submit-form.com for handling submissions
- Bot protection via BotPoison (keys in form YAML files)

Form YAML structure:
```yaml
formID: [submit-form.com ID]
botpoisonKey: [BotPoison public key]
submitText: [Button text]
fields:
  - id: field-name
    type: text|textarea|checkbox|radio|select|starrating|label
    labelText: Label
    # ... other field-specific properties
```

### Custom Components
Reusable partials in `layouts/partials/components/`:
- `form-newsletter-sign-up.html` - Newsletter signup with honeypot bot protection
- `page-header.html` - Standardized page headers

### Shortcodes
Available in `layouts/shortcodes/`:
- `form-builder.html` - Data-driven form generator (see above)
- `form-newsletter.html` - Simple newsletter form
- `box.html`, `button.html`, `button-group.html` - UI components
- `modal.html` - Modal dialog component
- `gallery.html`, `image.html` - Image display components

### Content Structure
- `content/_index.md` - Homepage
- `content/news/` - News/blog posts
- `content/blurb/` - Short content snippets
- `content/workshop/` - Workshop-related content
- `content/feedback/` - Feedback pages
- Static pages: `early-reader.md`, `spread-the-word.md`, `thank-you.md`, `success.md`

### Archetypes
Content templates in `archetypes/`:
- `default.md` - Standard page template
- `news.md` - News/blog post template
- `blurb.md` - Blurb template

### Internationalization
- i18n strings in `i18n/`
- Language configs in `config/_default/languages.toml`
- Content localized via `data/[lang]/` structure

### Theme
Uses custom fork of hugo-theme-massively as git submodule:
- Location: `themes/hugo-theme-massively`
- Repository: https://github.com/dewittn/hugo-theme-massively.git
- Theme modifications should be made in the submodule repository

### SCSS Architecture
Styles are in `assets/scss/` using Sass modules (`@use`):

```
assets/scss/
├── main.scss           # Entry point, imports all modules
├── libs/               # Core utilities
│   ├── _vars.scss      # Design tokens (colors, sizes, fonts)
│   ├── _functions.scss # Sass helper functions
│   ├── _mixins.scss    # Reusable mixins
│   ├── _breakpoints.scss # Responsive breakpoint system
│   └── _vendor.scss    # DEPRECATED - kept for reference only
├── base/               # Foundation styles
│   ├── _typography.scss # Font sizes, headings, text styles
│   └── _page.scss      # Base page styles
├── components/         # UI components (button, form, image, etc.)
└── layout/             # Page structure (header, footer, nav, intro)
```

Key design tokens in `_vars.scss`:
- `$size: (wrapper: 64rem, padding: 2rem, element-margin: 2rem)`
- `$font: (family: "Libre Caslon Text", family-heading: "Libre Caslon Display")`
- `$palette`: Color definitions with `invert` and `alt` variants

Breakpoint usage: `@include breakpoints.breakpoint("<=medium")`

## Hugo Modules
The project uses Hugo modules:
- `github.com/lokesh/lightbox2` - Image lightbox functionality
- Run `hugo mod get` to download/update modules

## Important Files

### Configuration
- `config/_default/params.toml` - Site metadata, Open Graph, theme settings
- `config/_default/config.toml` - Base Hugo configuration
- `config/_default/menu.toml` - Site navigation
- `config/_default/markup.toml` - Markdown rendering settings

### Deployment
- `Dockerfile` - Multi-stage build (Hugo build + static web server)
- `docker-stack-op.yaml.tpl` - Docker Swarm stack template with 1Password integration
- `.dockerignore` - Files excluded from Docker context
- `httpd.conf` - Static web server configuration

### Git
- `.gitmodules` - Theme submodule configuration
- Theme has local modifications and is modified (see git status)

## Development Notes

### Working with Forms
When adding/editing forms:
1. Create or modify YAML in `data/forms/[form-name].yaml`
2. Reference in content: `{{< form-builder data="[form-name]" >}}`
3. BotPoison key and submit-form.com ID required for functionality
4. Honeypot checkbox included in newsletter component for bot detection

### Environment-Specific Changes
- Always test changes in both `main` and `dev` environments
- Base URL differs between environments (see `config/main/config.toml` vs `config/dev/config.toml`)
- Docker image tags correspond to git branches (main/dev)

### Traefik Configuration
Docker stack includes Traefik labels for:
- HTTP to HTTPS redirect
- Let's Encrypt TLS certificates (certresolver: le-http)
- WWW redirect (main environment only)
- Load balancing across 2 replicas (main environment)
- Separate routing for main and dev environments

### Theme Modifications
The theme is a git submodule with local changes:
- Check theme status before making site-wide layout changes
- Theme overrides can be placed in root `layouts/` directory
- Submodule currently shows as modified in git status

### SCSS Conventions
- **IMPORTANT**: All CSS comes from SCSS files in `assets/scss/`. Do not create or edit `.css` files directly - they are generated by Hugo during build.
- Use native CSS properties (no vendor prefixes needed for modern browsers)
- Access design tokens via functions: `palette(fg)`, `font(family)`, `size(padding)`, `duration(transition)`
- Use `clamp()` for responsive typography: `font-size: clamp(min, preferred, max)`
- Breakpoint names: `xlarge`, `large`, `medium`, `small`, `xsmall`, `xxsmall`
