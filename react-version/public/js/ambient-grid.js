(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const body = document.body;
    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-grid-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '1';
    body.insertBefore(canvas, body.firstChild);

    const ctx = canvas.getContext('2d');
    const spacing = 40;
    const pointSize = 1.5;
    const lineThreshold = 74;

    const state = {
        width: 0,
        height: 0,
        grid: [],
        lastScrollY: window.scrollY,
        lastTime: performance.now(),
        drift: 0,
        velocity: 0,
    };

    function getThemeColors() {
        const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark
            ? { dot: 'rgba(255, 255, 255, 0.10)', line: 'rgba(255, 255, 255, 0.07)' }
            : { dot: 'rgba(0, 0, 0, 0.12)', line: 'rgba(0, 0, 0, 0.08)' };
    }

    function buildGrid() {
        const cols = Math.ceil(state.width / spacing) + 2;
        const rows = Math.ceil(state.height / spacing) + 2;
        const grid = [];

        for (let row = 0; row < rows; row++) {
            const currentRow = [];
            for (let col = 0; col < cols; col++) {
                const depth = 0.7 + ((row + col) % 5) * 0.08;
                const x = col * spacing;
                const y = row * spacing;
                currentRow.push({ x, y, depth, seed: (row * 17 + col * 31) % 1000 });
            }
            grid.push(currentRow);
        }

        state.grid = grid;
    }

    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        state.width = window.innerWidth;
        state.height = window.innerHeight;

        canvas.width = Math.ceil(state.width * ratio);
        canvas.height = Math.ceil(state.height * ratio);
        canvas.style.width = state.width + 'px';
        canvas.style.height = state.height + 'px';
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        buildGrid();
    }

    function drawDotsAndLines(now) {
        const colors = getThemeColors();
        const elapsed = now * 0.001;
        const targetDrift = state.velocity * 0.7;
        state.drift += (targetDrift - state.drift) * 0.08;

        ctx.clearRect(0, 0, state.width, state.height);
        ctx.lineWidth = 1;

        const rows = state.grid.length;
        const cols = state.grid[0]?.length || 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = state.grid[row][col];
                const x = dot.x + (state.drift * 0.25 * dot.depth);
                const y = dot.y + state.drift * dot.depth + Math.sin(elapsed * 1.2 + dot.seed) * 0.5;

                if (x > -20 && x < state.width + 20 && y > -20 && y < state.height + 20) {
                    ctx.beginPath();
                    ctx.fillStyle = colors.dot;
                    ctx.globalAlpha = 0.75;
                    ctx.fillRect(x, y, pointSize, pointSize);
                    ctx.globalAlpha = 1;
                }

                if (col + 1 < cols) {
                    const neighbor = state.grid[row][col + 1];
                    const dx = (neighbor.x + state.drift * 0.25 * neighbor.depth) - (x);
                    const dy = (neighbor.y + state.drift * neighbor.depth) - y;
                    const distance = Math.hypot(dx, dy);
                    if (distance <= lineThreshold && distance > 0) {
                        const alpha = (1 - distance / lineThreshold) * (0.18 + Math.min(0.35, Math.abs(state.velocity) * 0.02));
                        ctx.beginPath();
                        ctx.moveTo(x + pointSize / 2, y + pointSize / 2);
                        ctx.lineTo(neighbor.x + pointSize / 2 + (state.drift * 0.25 * neighbor.depth), neighbor.y + pointSize / 2 + state.drift * neighbor.depth);
                        ctx.strokeStyle = colors.line;
                        ctx.globalAlpha = Math.min(0.9, Math.max(0.05, alpha));
                        ctx.stroke();
                    }
                }

                if (row + 1 < rows) {
                    const neighbor = state.grid[row + 1][col];
                    const dx = (neighbor.x + state.drift * 0.25 * neighbor.depth) - x;
                    const dy = (neighbor.y + state.drift * neighbor.depth) - y;
                    const distance = Math.hypot(dx, dy);
                    if (distance <= lineThreshold && distance > 0) {
                        const alpha = (1 - distance / lineThreshold) * (0.18 + Math.min(0.35, Math.abs(state.velocity) * 0.02));
                        ctx.beginPath();
                        ctx.moveTo(x + pointSize / 2, y + pointSize / 2);
                        ctx.lineTo(neighbor.x + pointSize / 2 + (state.drift * 0.25 * neighbor.depth), neighbor.y + pointSize / 2 + state.drift * neighbor.depth);
                        ctx.strokeStyle = colors.line;
                        ctx.globalAlpha = Math.min(0.9, Math.max(0.05, alpha));
                        ctx.stroke();
                    }
                }
            }
        }

        ctx.globalAlpha = 1;
    }

    function tick(now) {
        const dt = Math.max(16, now - state.lastTime);
        const deltaY = window.scrollY - state.lastScrollY;
        const nextVelocity = deltaY / dt;
        state.velocity += (nextVelocity * 26 - state.velocity) * 0.1;
        state.velocity *= Math.abs(state.velocity) < 0.02 ? 0.88 : 0.98;
        state.lastScrollY = window.scrollY;
        state.lastTime = now;

        drawDotsAndLines(now);
        window.requestAnimationFrame(tick);
    }

    function handleThemeChange() {
        buildGrid();
    }

    const observer = new MutationObserver(function () {
        handleThemeChange();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
    });

    window.addEventListener('scroll', function () {
        state.lastScrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('resize', resizeCanvas, { passive: true });
    prefersReducedMotion.addEventListener?.('change', function () {
        if (prefersReducedMotion.matches) {
            canvas.remove();
            window.removeEventListener('scroll', handleThemeChange);
        }
    });

    resizeCanvas();
    window.requestAnimationFrame(tick);
})();
