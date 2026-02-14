# Halftone Pattern Generator

Interactive halftone pattern generator with animated dots, multiple styles, and color schemes.

## Features

- **Animated Halftone Dots** - Pulsing, rotating, flowing patterns
- **Multiple Styles**: Grid, Hexagonal, Concentric, Wave, Spiral
- **5 Color Themes**: Classic B&W, Vintage Newspaper, Cyberpunk, Sepia, Ocean
- **Interactive**: Mouse influence on patterns
- **Customizable**: Dot size, spacing, speed, color theme

## How to Run

Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).

```bash
# Or serve locally:
cd /home/ubuntu/.openclaw/workspace/output
python3 -m http.server 8080
# Then open http://localhost:8080/halftone-gen.html
```

## Controls

- **Mouse Move** - Influence dot behavior
- **Pattern Style** - Grid, Hex, Concentric, Wave, Spiral
- **Dot Size** - Adjust dot radius
- **Spacing** - Adjust gap between dots
- **Speed** - Animation speed
- **Colors** - Choose from 5 color themes
- **Pause/Play** - Toggle animation

## Based On

Inspired by the "Shades of Halftone" article from Hacker News:
https://blog.maximeheckel.com/posts/shades-of-halftone/

## Tech

Pure HTML/CSS/JS with Canvas 2D. No external dependencies.

## License

MIT
