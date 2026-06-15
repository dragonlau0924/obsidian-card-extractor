# Card Extractor for Obsidian

Extract structured cards from your Obsidian notes with hierarchical context preservation. Perfect for creating flashcards, building mind maps, or organizing knowledge blocks.

## Features

### 🎯 Smart Pattern Matching
- Extracts cards using customizable regex patterns
- Filters out plain text automatically
- Preserves only structured content blocks

### 🌲 Hierarchy Preservation
- Maintains H1, H2, and H3 heading relationships
- Creates exportable knowledge trees
- Perfect for mind map conversion

### ✨ Clean Output
- Zero noise: no metadata, timestamps, or annotations
- Pure content extraction
- Cards separated by clean spacing

### ⚡ Flexible Usage
- Command palette integration
- Sidebar icon for quick access
- Customizable keyboard shortcuts
- Configurable export settings

## Installation

### From Obsidian Community Plugins (Recommended)
1. Open Obsidian Settings
2. Navigate to Community Plugins → Browse
3. Search for "Card Extractor"
4. Click Install, then Enable

### Manual Installation
1. Download the latest release from [Releases](https://github.com/dragonlau0924/obsidian-card-extractor/releases)
2. Extract the files to `<vault>/.obsidian/plugins/card-extractor/`
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

## Usage

### Card Format

Cards must follow this structure:

```markdown
### Question or Topic Title?
- Key point 1
	- Detail A
	- Detail B
- Key point 2
	- Detail C
【Notes】
- Your personal understanding
【Reference】
- Source material or quotes
<!--ID: 1234567890-->
```

**Format rules:**
- Start with a level 3 heading (`###`)
- End with an HTML comment containing an ID (`<!--ID: number-->`)
- Content between can include lists, bold text, links, etc.

### Example

**Input note:**
```markdown
# Cognitive Science

## Memory Systems

### What is working memory?
- Capacity limit
	- Typically holds **7±2** information chunks
【Notes】
- Working memory is the bottleneck of cognition
【Reference】
- Working memory temporarily stores and processes information, with limited but crucial capacity.
<!--ID: 1724420858671-->

Some plain text that won't be extracted.

### What is long-term memory?
- Storage types
	- Declarative memory (facts, events)
	- Procedural memory (skills, habits)
【Notes】
- Long-term memory has virtually unlimited capacity
【Reference】
- Long-term memory can store information indefinitely through consolidation processes.
<!--ID: 1724420858672-->
```

**Output (with hierarchy mode):**
```markdown
# Cognitive Science

## Memory Systems

### What is working memory?
- Capacity limit
	- Typically holds **7±2** information chunks
【Notes】
- Working memory is the bottleneck of cognition
【Reference】
- Working memory temporarily stores and processes information, with limited but crucial capacity.
<!--ID: 1724420858671-->

### What is long-term memory?
- Storage types
	- Declarative memory (facts, events)
	- Procedural memory (skills, habits)
【Notes】
- Long-term memory has virtually unlimited capacity
【Reference】
- Long-term memory can store information indefinitely through consolidation processes.
<!--ID: 1724420858672-->
```

### Commands

Open Command Palette (`Cmd/Ctrl + P`) and search for:

- **Extract Cards from Current Note** - Extract with full validation
- **Quick Extract Cards** - Fast extraction with default settings

Or click the 📄 icon in the left sidebar.

### Settings

Access plugin settings in Settings → Card Extractor:

| Setting | Description | Default |
|---------|-------------|---------|
| Export Folder | Where extracted cards are saved | `+` (inbox) |
| Open After Export | Auto-open the exported file | Enabled |
| Overwrite Existing | Overwrite or create new timestamped file | Disabled |

## Use Cases

### 📚 Flashcard Creation
Extract cards from reading notes and convert them to Anki, Quizlet, or other spaced repetition systems.

### 🗺️ Mind Mapping
Export hierarchical structures directly to mind mapping tools (MarkMap, XMind, MindNode).

### 📝 Knowledge Base Organization
Pull out key concepts from long-form notes into structured, reusable knowledge blocks.

### 🎓 Study Material Preparation
Quickly compile exam materials from scattered notes across your vault.

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/dragonlau0924/obsidian-card-extractor.git
cd obsidian-card-extractor

# Install dependencies
npm install

# Build for production
npm run build

# Development mode (auto-rebuild)
npm run dev
```

### Project Structure

```
src/
├── main.ts                    # Plugin entry point
├── settings.ts                # Settings panel
├── extractor/
│   ├── pattern.ts             # Regex pattern definitions
│   ├── parser.ts              # Content parsing (flat mode)
│   ├── validator.ts           # Format validation
│   └── hierarchy-parser.ts    # Hierarchical parsing
├── exporter/
│   ├── markdown.ts            # Markdown formatting
│   └── file-manager.ts        # File operations
└── ui/
    └── commands.ts            # Command registration
```

## Roadmap

- [ ] Custom pattern templates
- [ ] Batch extraction (multiple files)
- [ ] Multiple export formats (JSON, CSV)
- [ ] Direct Anki export
- [ ] Smart paragraph splitting for mind maps
- [ ] Card format validation and auto-fix

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have feature requests:
- Open an issue on [GitHub Issues](https://github.com/dragonlau0924/obsidian-card-extractor/issues)
- Join the discussion in [GitHub Discussions](https://github.com/dragonlau0924/obsidian-card-extractor/discussions)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- Built with the [Obsidian Plugin API](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- Inspired by spaced repetition and knowledge management workflows

---

**Note:** This plugin is in active development. Breaking changes may occur in early versions. Please check release notes before updating.
