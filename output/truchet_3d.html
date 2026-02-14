<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔮 Truchet 3D Pattern Generator</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Space Mono', monospace;
            background: #050508;
            color: #e0e0e0;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            display: flex;
            height: 100vh;
        }
        
        .controls {
            width: 300px;
            background: linear-gradient(180deg, #0a0a10 0%, #060608 100%);
            padding: 24px;
            overflow-y: auto;
            border-right: 1px solid #1a1a25;
        }
        
        .controls h1 {
            font-family: 'Syne', sans-serif;
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 4px;
            background: linear-gradient(135deg, #ff6b9d, #c44dff, #6bffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .controls .subtitle {
            font-size: 0.7rem;
            color: #555;
            margin-bottom: 28px;
            letter-spacing: 1px;
        }
        
        .control-group {
            margin-bottom: 20px;
        }
        
        .control-group label {
            display: block;
            font-size: 0.65rem;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
        }
        
        .control-group select,
        .control-group input[type="range"] {
            width: 100%;
            background: #12121a;
            border: 1px solid #2a2a3a;
            color: #ddd;
            padding: 10px 12px;
            font-family: inherit;
            font-size: 0.8rem;
            border-radius: 6px;
            outline: none;
            transition: border-color 0.2s;
        }
        
        .control-group select:focus,
        .control-group input:focus {
            border-color: #c44dff;
        }
        
        input[type="range"] {
            -webkit-appearance: none;
            height: 6px;
            border-radius: 3px;
            background: linear-gradient(90deg, #ff6b9d, #c44dff);
            padding: 0;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(196, 77, 255, 0.5);
        }
        
        .color-row {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
        }
        
        .color-row input[type="color"] {
            flex: 1;
            height: 36px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            background: transparent;
        }
        
        .color-row input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 2px;
        }
        
        .color-row input[type="color"]::-webkit-color-swatch {
            border-radius: 4px;
            border: 1px solid #333;
        }
        
        .btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #ff6b9d, #c44dff);
            border: none;
            color: #fff;
            font-family: inherit;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 6px;
            cursor: pointer;
            transition: transform 0.15s, box-shadow 0.15s;
            margin-bottom: 8px;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(196, 77, 255, 0.4);
        }
        
        .btn.secondary {
            background: #1a1a25;
            border: 1px solid #2a2a3a;
        }
        
        .btn.secondary:hover {
            background: #22222f;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .canvas-area {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: 
                radial-gradient(ellipse at 30% 20%, rgba(196, 77, 255, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(107, 255, 255, 0.06) 0%, transparent 50%),
                #050508;
            position: relative;
        }
        
        canvas {
            border-radius: 12px;
            box-shadow: 
                0 0 0 1px rgba(255, 255, 255, 0.05),
                0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .hint {
            position: absolute;
            bottom: 20px;
            font-size: 0.65rem;
            color: #444;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="controls">
            <h1>🔮 Truchet 3D</h1>
            <div class="subtitle">GENERATIVE PATTERN MAPPER</div>
            
            <div class="control-group">
                <label>Shape</label>
                <select id="shape">
                    <option value="sphere">Sphere</option>
                    <option value="cube">Cube</option>
                    <option value="torus">Torus</option>
                    <option value="cylinder">Cylinder</option>
                    <option value="plane">Flat Plane</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>Tile Type</label>
                <select id="tileType">
                    <option value="arcs">Arcs</option>
                    <option value="triangles">Triangles</option>
                    <option value="diagonal">Diagonal Lines</option>
                    <option value="circles">Circles</option>
                    <option value="waves">Waves</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>Grid Size: <span id="gridVal">12</span></label>
                <input type="range" id="gridSize" min="4" max="32" value="12">
            </div>
            
            <div class="control-group">
                <label>Colors</label>
                <div class="color-row">
                    <input type="color" id="color1" value="#ff6b9d">
                    <input type="color" id="color2" value="#c44dff">
                </div>
                <div class="color-row">
                    <input type="color" id="color3" value="#6bffff">
                    <input type="color" id="color4" value="#1a1a25">
                </div>
            </div>
            
            <div class="control-group">
                <label>Animation Speed</label>
                <input type="range" id="speed" min="0" max="100" value="30">
            </div>
            
            <button class="btn" id="generate">Generate New</button>
            <button class="btn secondary" id="download">Download PNG</button>
            <button class="btn secondary" id="animate">Toggle Animation</button>
        </div>
        
        <div class="canvas-area">
            <canvas id="canvas" width="600" height="600"></canvas>
            <div class="hint">drag to rotate • scroll to zoom</div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        let state = {
            shape: 'sphere',
            tileType: 'arcs',
            gridSize: 12,
            colors: ['#ff6b9d', '#c44dff', '#6bffff', '#1a1a25'],
            speed: 0.3,
            animating: false,
            rotation: { x: 0.3, y: 0 },
            zoom: 1,
            time: 0
        };
        
        let seed = Math.random() * 10000;
        
        function seededRandom() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        }
        
        function resetSeed() {
            seed = Math.random() * 10000;
        }
        
        function project3D(x, y, z, width, height) {
            const fov = 400;
            const scale = fov / (fov + z);
            return {
                x: width / 2 + x * scale * state.zoom,
                y: height / 2 + y * scale * state.zoom
            };
        }
        
        function getSpherePoints(rows, cols) {
            const points = [];
            for (let i = 0; i < rows; i++) {
                const phi = (i / rows) * Math.PI;
                for (let j = 0; j < cols; j++) {
                    const theta = (j / cols) * Math.PI * 2;
                    const x = 180 * Math.sin(phi) * Math.cos(theta);
                    const y = 180 * Math.cos(phi);
                    const z = 180 * Math.sin(phi) * Math.sin(theta);
                    points.push({ x, y, z, phi, theta, i, j });
                }
            }
            return points;
        }
        
        function getCubePoints(rows, cols) {
            const points = [];
            const faces = 6;
            const perFace = Math.floor((rows * cols) / 6) + 1;
            
            for (let f = 0; f < faces; f++) {
                for (let i = 0; i < Math.sqrt(perFace); i++) {
                    for (let j = 0; j < Math.sqrt(perFace); j++) {
                        let x, y, z;
                        const s = 150;
                        const u = (i / Math.sqrt(perFace)) * 2 - 1;
                        const v = (j / Math.sqrt(perFace)) * 2 - 1;
                        
                        switch (f) {
                            case 0: x = s; y = u * s; z = v * s; break;
                            case 1: x = -s; y = u * s; z = -v * s; break;
                            case 2: y = s; x = u * s; z = v * s; break;
                            case 3: y = -s; x = u * s; z = -v * s; break;
                            case 4: z = s; x = u * s; y = v * s; break;
                            case 5: z = -s; x = u * s; y = -v * s; break;
                        }
                        points.push({ x, y, z, face: f });
                    }
                }
            }
            return points;
        }
        
        function rotateY(point, angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                ...point,
                x: point.x * cos - point.z * sin,
                z: point.x * sin + point.z * cos
            };
        }
        
        function rotateX(point, angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                ...point,
                y: point.y * cos - point.z * sin,
                z: point.y * sin + point.z * cos
            };
        }
        
        function drawTile(ctx, type, x, y, size, color1, color2, rotation) {
            ctx.save();
            ctx.translate(x + size / 2, y + size / 2);
            ctx.rotate(rotation * Math.PI / 2);
            
            const s = size * 0.45;
            
            switch (type) {
                case 'arcs':
                    ctx.strokeStyle = color1;
                    ctx.lineWidth = size * 0.15;
                    ctx.beginPath();
                    ctx.arc(-s/2, -s/2, s, 0, Math.PI/2);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(s/2, s/2, s, Math.PI, Math.PI * 1.5);
                    ctx.stroke();
                    break;
                    
                case 'triangles':
                    ctx.fillStyle = color1;
                    ctx.beginPath();
                    ctx.moveTo(-s, -s);
                    ctx.lineTo(s, -s);
                    ctx.lineTo(-s, s);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = color2;
                    ctx.beginPath();
                    ctx.moveTo(s, s);
                    ctx.lineTo(-s, s);
                    ctx.lineTo(s, -s);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 'diagonal':
                    ctx.strokeStyle = color1;
                    ctx.lineWidth = size * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(-s, -s);
                    ctx.lineTo(s, s);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(s, -s);
                    ctx.lineTo(-s, s);
                    ctx.stroke();
                    break;
                    
                case 'circles':
                    ctx.strokeStyle = color1;
                    ctx.lineWidth = size * 0.12;
                    ctx.beginPath();
                    ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fillStyle = color2;
                    ctx.beginPath();
                    ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'waves':
                    ctx.strokeStyle = color1;
                    ctx.lineWidth = size * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(-s, -s * 0.5);
                    ctx.quadraticCurveTo(0, s * 0.5, s, -s * 0.5);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(-s, s * 0.5);
                    ctx.quadraticCurveTo(0, -s * 0.5, s, s * 0.5);
                    ctx.stroke();
                    break;
            }
            
            ctx.restore();
        }
        
        function draw() {
            const w = canvas.width;
            const h = canvas.height;
            
            ctx.fillStyle = '#08080c';
            ctx.fillRect(0, 0, w, h);
            
            resetSeed();
            const n = state.gridSize * state.gridSize;
            
            let points = [];
            if (state.shape === 'sphere') {
                points = getSpherePoints(state.gridSize, state.gridSize);
            } else if (state.shape === 'cube') {
                points = getCubePoints(state.gridSize, state.gridSize);
            } else if (state.shape === 'torus') {
                const R = 150, r = 60;
                for (let i = 0; i < state.gridSize * 2; i++) {
                    const u = (i / (state.gridSize * 2)) * Math.PI * 2;
                    for (let j = 0; j < state.gridSize; j++) {
                        const v = (j / state.gridSize) * Math.PI * 2;
                        const x = (R + r * Math.cos(v)) * Math.cos(u);
                        const y = r * Math.sin(v);
                        const z = (R + r * Math.cos(v)) * Math.sin(u);
                        points.push({ x, y, z });
                    }
                }
            } else if (state.shape === 'cylinder') {
                for (let i = 0; i < state.gridSize * 2; i++) {
                    const theta = (i / (state.gridSize * 2)) * Math.PI * 2;
                    for (let j = 0; j < state.gridSize; j++) {
                        const y = ((j / state.gridSize) - 0.5) * 300;
                        const r = 150;
                        const x = r * Math.cos(theta);
                        const z = r * Math.sin(theta);
                        points.push({ x, y, z });
                    }
                }
            } else {
                for (let i = 0; i < state.gridSize; i++) {
                    for (let j = 0; j < state.gridSize; j++) {
                        points.push({
                            x: ((j / state.gridSize) - 0.5) * 300,
                            y: ((i / state.gridSize) - 0.5) * 300,
                            z: 0
                        });
                    }
                }
            }
            
            points = points.map(p => {
                let rp = rotateY(p, state.rotation.y + state.time);
                rp = rotateX(rp, state.rotation.x);
                return rp;
            });
            
            points.sort((a, b) => b.z - a.z);
            
            const visible = points.filter(p => p.z > -200);
            
            for (const point of visible) {
                const proj = project3D(point.x, point.y, point.z, w, h);
                const depth = (point.z + 200) / 400;
                const size = Math.max(8, 40 * depth * state.zoom);
                
                const colorIdx = Math.floor(seededRandom() * 4);
                const colorIdx2 = (colorIdx + 1) % 4;
                const color1 = state.colors[colorIdx];
                const color2 = state.colors[colorIdx2];
                const rotation = Math.floor(seededRandom() * 4);
                
                ctx.globalAlpha = Math.min(1, depth * 1.5);
                drawTile(ctx, state.tileType, proj.x - size/2, proj.y - size/2, size, color1, color2, rotation);
            }
            
            ctx.globalAlpha = 1;
            
            if (state.animating) {
                state.time += state.speed * 0.02;
                requestAnimationFrame(draw);
            }
        }
        
        function updateFromUI() {
            state.shape = document.getElementById('shape').value;
            state.tileType = document.getElementById('tileType').value;
            state.gridSize = parseInt(document.getElementById('gridSize').value);
            state.speed = parseInt(document.getElementById('speed').value);
            state.colors = [
                document.getElementById('color1').value,
                document.getElementById('color2').value,
                document.getElementById('color3').value,
                document.getElementById('color4').value
            ];
            document.getElementById('gridVal').textContent = state.gridSize;
            draw();
        }
        
        document.getElementById('shape').addEventListener('change', updateFromUI);
        document.getElementById('tileType').addEventListener('change', updateFromUI);
        document.getElementById('gridSize').addEventListener('input', updateFromUI);
        document.getElementById('speed').addEventListener('input', updateFromUI);
        document.getElementById('color1').addEventListener('input', updateFromUI);
        document.getElementById('color2').addEventListener('input', updateFromUI);
        document.getElementById('color3').addEventListener('input', updateFromUI);
        document.getElementById('color4').addEventListener('input', updateFromUI);
        
        document.getElementById('generate').addEventListener('click', () => {
            resetSeed();
            seed = Math.random() * 10000;
            draw();
        });
        
        document.getElementById('download').addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `truchet-${state.shape}-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
        
        document.getElementById('animate').addEventListener('click', () => {
            state.animating = !state.animating;
            if (state.animating) draw();
        });
        
        let isDragging = false;
        let lastMouse = { x: 0, y: 0 };
        
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastMouse = { x: e.clientX, y: e.clientY };
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - lastMouse.x;
            const dy = e.clientY - lastMouse.y;
            state.rotation.y += dx * 0.01;
            state.rotation.x += dy * 0.01;
            lastMouse = { x: e.clientX, y: e.clientY };
            if (!state.animating) draw();
        });
        
        canvas.addEventListener('mouseup', () => isDragging = false);
        canvas.addEventListener('mouseleave', () => isDragging = false);
        
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            state.zoom = Math.max(0.5, Math.min(2, state.zoom - e.deltaY * 0.001));
            if (!state.animating) draw();
        });
        
        draw();
    </script>
</body>
</html>
