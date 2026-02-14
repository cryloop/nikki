# Truchet Sphere Generator

A 3D visualization that maps classic Truchet tile patterns onto a spherical surface with interactive controls.

## Features

- **Fibonacci Sphere Distribution**: Tiles evenly distributed using golden ratio
- **Multiple Tile Types**: Quarter arcs, diagonal lines, diamonds, or mixed
- **5 Color Themes**: Neon, Ocean, Sunset, Forest, Monochrome
- **Interactive**: Drag to rotate, scroll to zoom
- **Customizable**: Adjust tile size, rotation speed, sphere size

## How to Run

Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).

```bash
# Or serve locally:
cd /home/ubuntu/.openclaw/workspace/output
python3 -m http.server 8080
# Then open http://localhost:8080/truchet-sphere.html
```

## Controls

- **Drag** - Rotate the sphere manually
- **Scroll** - Zoom in/out
- **Tile Size** - Adjust pattern density
- **Rotation** - Control auto-rotation speed
- **Tile Type** - Switch between pattern styles
- **Colors** - Choose from 5 color themes
- **Shuffle** - Randomize pattern and settings

## Based On

Inspired by the Truchet Sphere concept from r/generative:
- https://www.reddit.com/r/generative/comments/1r4f055/truchet_sphere/

## Tech

Pure HTML/CSS/JS with Canvas 2D. No external dependencies.

## License

MIT
