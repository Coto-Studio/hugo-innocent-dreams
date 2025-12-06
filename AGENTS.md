# AGENTS.md

## Build Commands
```bash
# Development server
hugo server --environment main
hugo server --environment dev

# Production build
hugo --minify --environment main
hugo --minify --environment dev

# Docker build
docker build -t hugo-innocent-dreams .
docker build --build-arg ENVIRONMENT=dev -t hugo-innocent-dreams:dev .
```

## Code Style Guidelines

### Hugo/HTML
- Use 2-space indentation for HTML templates
- Follow Hugo template conventions: `{{ . }}` for data, `{{ partial "" }}` for includes
- Place custom layouts in `layouts/` directory, not in theme

### YAML/Configuration
- Use 2-space indentation for YAML files
- Form definitions go in `data/forms/` with descriptive names
- Environment-specific configs in `config/[env]/`

### SCSS
- Follow theme's SCSS structure (base/, components/, layout/, libs/)
- Use 2-space indentation
- Main entry point: `assets/scss/main.scss`

### Content
- Use frontmatter with title, date, and draft status
- Place content in appropriate directories (news/, blurb/, workshop/)
- Use shortcodes for reusable components: `{{< form-builder data="form-name" >}}`

### File Naming
- kebab-case for files and directories
- Use descriptive names for forms and content types

### Forms
- Always include botpoisonKey and formID in form YAML
- Use form-builder shortcode for rendering
- Include honeypot protection for newsletter forms