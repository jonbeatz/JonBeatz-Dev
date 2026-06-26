# DesignMD Skill Pack

Extract, download, and apply production design systems using `@designmdcc/cli` and `getdesign.md`.

## Capabilities
- **Extracting Custom URLs**: Retrieve visual languages from live websites.
- **Downloading Curated Templates**: Fetch production-grade brand layouts directly from the `getdesign.md` catalog of 72 master brand alignments.
- **Enforcing Brand Memory**: Apply extracted design systems to mock-ups and production interfaces.

## Workflow

### 1. URL Extraction
Analyze custom live sites on the fly:
```bash
npx @designmdcc/cli <url> --out .cursor/DesignMD/DESIGN-<NAME>.md
```

### 2. Curated Brand Layouts (getdesign.md)
Download blueprint templates natively to target folders:
```bash
# List available brands
npx getdesign list

# Install brand layouts into our canon
npx getdesign add stripe --out .cursor/DesignMD/DESIGN-STRIPE.md
npx getdesign add tesla --out .cursor/DesignMD/DESIGN-TESLA.md
npx getdesign add bmw --out .cursor/DesignMD/DESIGN-BMW.md
npx getdesign add supabase --out .cursor/DesignMD/DESIGN-SUPABASE.md
```

### 3. Application
When building UI, read the relevant file in `.cursor/DesignMD/` and treat it as the "Design Source of Truth".

## Rules
- NEVER invent brand values if a `DESIGN-*.md` file exists.
- Always use `8px` rhythm and `16:9` cinematic grid (NovaMira standard) unless the extracted design specifies otherwise.
- Store all extractions in `.cursor/DesignMD/`.
