/**
 * ============================================================================
 * THIỆP CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10
 * Dynamic Interactive Web Greeting Card
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const skyContainer = document.getElementById('sky-container');
    const fireworksCanvas = document.getElementById('fireworks-canvas');
    const envelopeScene = document.getElementById('envelope-scene');
    const envelopeContainer = document.getElementById('envelope-container');
    const waxSeal = document.getElementById('wax-seal');
    const cardScene = document.getElementById('card-scene');
    const celebrationCard = document.getElementById('celebration-card');
    
    const btnBoostBalloons = document.getElementById('btn-boost-balloons');
    const btnReleaseBalloons = document.getElementById('btn-release-balloons');
    const btnResetEnvelope = document.getElementById('btn-reset-envelope');
    
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const soundWave = document.getElementById('sound-wave');
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');

    // --- Interactive Opening of Envelope ---
    function openEnvelope() {
        if (envelopeContainer.classList.contains('open')) return;

        envelopeContainer.classList.add('open');
        playChimeSound();
        initAudioEngine(); // Starts background music on first interaction

        // Launch celebratory fireworks
        launchHeartFireworks();

        // Release huge flock of balloons & hearts
        spawnBalloonsAndHearts(32, 45);

        setTimeout(() => {
            envelopeScene.classList.add('hidden');
            cardScene.classList.add('active');
        }, 700);
    }

    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
    });

    envelopeContainer.addEventListener('click', openEnvelope);

    // Reset Envelope Button
    btnResetEnvelope.addEventListener('click', () => {
        cardScene.classList.remove('active');
        envelopeScene.classList.remove('hidden');
        envelopeContainer.classList.remove('open');
        showToast("Đã gấp lại phong bì!");
    });

    // --- FLOATING HEARTS GENERATOR ---
    const heartColors = [
        '#ff4d79', '#ff7597', '#ff85a2', '#ff5e7e', 
        '#ff2a6d', '#ff94c2', '#ffa8a8', '#ff6b81', '#f368e0'
    ];

    function createFloatingHeart(x = null, isLarge = false) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        const size = isLarge ? Math.random() * 25 + 30 : Math.random() * 20 + 16;
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        const posX = x !== null ? x : Math.random() * (window.innerWidth - 40);
        const duration = Math.random() * 5 + 6; // 6-11s
        const drift = (Math.random() - 0.5) * 140;
        const rot = (Math.random() - 0.5) * 60;

        heart.style.left = `${posX}px`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.setProperty('--drift-x', `${drift}px`);
        heart.style.setProperty('--rot', `${rot}deg`);

        // SVG Heart for crisp rendering
        heart.innerHTML = `
            <svg viewBox="0 0 32 32" fill="${color}" width="100%" height="100%">
                <path d="M16 28.5l-2.3-2.1C5.6 19.1 0 14 0 7.8 0 2.8 3.9 0 8.9 0c2.8 0 5.6 1.3 7.1 3.4C17.5 1.3 20.3 0 23.1 0 28.1 0 32 2.8 32 7.8c0 6.2-5.6 11.3-13.7 18.6L16 28.5z"/>
            </svg>
        `;

        skyContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Auto generate gentle background hearts
    setInterval(() => {
        if (document.hidden) return;
        createFloatingHeart();
    }, 600);

    // --- FLOATING 3D BALLOONS GENERATOR ---
    const balloonPalettes = [
        { bg: 'linear-gradient(135deg, #ff4d79 0%, #d62050 100%)', knot: '#b0103a' },
        { bg: 'linear-gradient(135deg, #ff85a2 0%, #e65c80 100%)', knot: '#c43d60' },
        { bg: 'linear-gradient(135deg, #ffd700 0%, #e69500 100%)', knot: '#b87700' },
        { bg: 'linear-gradient(135deg, #f78fb3 0%, #e05275 100%)', knot: '#ba264b' },
        { bg: 'linear-gradient(135deg, #ff6b81 0%, #c82333 100%)', knot: '#9e1422' },
        { bg: 'linear-gradient(135deg, #e056fd 0%, #be2edd 100%)', knot: '#8914a3' }
    ];

    function createFloatingBalloon(customX = null, isHeartShape = null) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';

        const palette = balloonPalettes[Math.floor(Math.random() * balloonPalettes.length)];
        const posX = customX !== null ? customX : Math.random() * (window.innerWidth - 80) + 10;
        const duration = Math.random() * 6 + 9; // 9-15s
        const drift = (Math.random() - 0.5) * 160;
        const rot = (Math.random() - 0.5) * 25;
        const scale = Math.random() * 0.45 + 0.8;

        const isHeart = isHeartShape !== null ? isHeartShape : Math.random() > 0.45;

        balloon.style.left = `${posX}px`;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.setProperty('--drift-x', `${drift}px`);
        balloon.style.setProperty('--rot', `${rot}deg`);
        balloon.style.transform = `scale(${scale})`;

        if (isHeart) {
            balloon.innerHTML = `
                <div class="balloon-heart">
                    <svg viewBox="0 0 32 32">
                        <defs>
                            <linearGradient id="bal-grad-${Math.random().toString(36).substr(2, 5)}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#ff758c" />
                                <stop offset="50%" stop-color="#ff4d79" />
                                <stop offset="100%" stop-color="#c9184a" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#bal-grad)" d="M16 28.5l-2.3-2.1C5.6 19.1 0 14 0 7.8 0 2.8 3.9 0 8.9 0c2.8 0 5.6 1.3 7.1 3.4C17.5 1.3 20.3 0 23.1 0 28.1 0 32 2.8 32 7.8c0 6.2-5.6 11.3-13.7 18.6L16 28.5z" fill="${palette.knot}"/>
                        <circle cx="10" cy="8" r="3" fill="rgba(255,255,255,0.45)"/>
                    </svg>
                    <div class="balloon-string"></div>
                </div>
            `;
        } else {
            balloon.innerHTML = `
                <div class="balloon-body" style="background: ${palette.bg}">
                    <div class="balloon-knot" style="background: ${palette.knot}"></div>
                    <div class="balloon-string"></div>
                </div>
            `;
        }

        // Pop balloon on click
        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            popBalloon(balloon, e.clientX, e.clientY);
        });

        skyContainer.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, duration * 1000);
    }

    // Auto generate gentle background balloons periodically
    setInterval(() => {
        if (document.hidden) return;
        createFloatingBalloon();
    }, 1800);

    // Initial balloons
    for (let i = 0; i < 4; i++) {
        setTimeout(() => createFloatingBalloon(), i * 600);
    }

    // Pop Balloon Effect
    function popBalloon(balloonEl, x, y) {
        playPopSound();
        createSparkleBurst(x, y, 15);

        balloonEl.style.transition = 'transform 0.1s ease, opacity 0.1s ease';
        balloonEl.style.transform = 'scale(1.4)';
        balloonEl.style.opacity = '0';

        setTimeout(() => {
            balloonEl.remove();
        }, 120);
    }

    // Spawn multiple balloons and hearts (Rực rỡ ngập tràn màn hình)
    function spawnBalloonsAndHearts(balloonCount = 30, heartCount = 45) {
        for (let i = 0; i < balloonCount; i++) {
            setTimeout(() => {
                const posX = Math.random() * (window.innerWidth - 60) + 20;
                createFloatingBalloon(posX);
            }, i * 70);
        }

        for (let j = 0; j < heartCount; j++) {
            setTimeout(() => {
                const posX = Math.random() * (window.innerWidth - 40) + 10;
                createFloatingHeart(posX, true);
            }, j * 50);
        }
    }

    btnBoostBalloons.addEventListener('click', () => {
        spawnBalloonsAndHearts(36, 50);
        launchHeartFireworks();
        playChimeSound();
        showToast("🎈 Đã thả cơn mưa bóng bay & trái tim mừng Diệu Thơ!");
    });

    btnReleaseBalloons.addEventListener('click', () => {
        spawnBalloonsAndHearts(36, 50);
        playChimeSound();
        showToast("🎈 Đã thả đàn bóng bay rực rỡ chúc mừng 20/10!");
    });

    // --- INTERACTIVE CLICK / TOUCH SPARKLES ---
    window.addEventListener('click', (e) => {
        // Prevent sparking on interactive buttons directly if they handle it
        if (e.target.closest('button') || e.target.closest('input')) return;

        createClickHeart(e.clientX, e.clientY);
        createSparkleBurst(e.clientX, e.clientY, 8);
    });

    function createClickHeart(x, y) {
        const spark = document.createElement('div');
        spark.className = 'click-heart-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        const size = Math.random() * 16 + 22;
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];

        spark.innerHTML = `
            <svg viewBox="0 0 32 32" fill="${color}" width="${size}px" height="${size}px">
                <path d="M16 28.5l-2.3-2.1C5.6 19.1 0 14 0 7.8 0 2.8 3.9 0 8.9 0c2.8 0 5.6 1.3 7.1 3.4C17.5 1.3 20.3 0 23.1 0 28.1 0 32 2.8 32 7.8c0 6.2-5.6 11.3-13.7 18.6L16 28.5z"/>
            </svg>
        `;

        document.body.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 1000);
    }

    function createSparkleBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'click-heart-spark';
            const color = ['#ffd700', '#ff758c', '#ffffff', '#ff94c2'][Math.floor(Math.random() * 4)];
            const size = Math.random() * 6 + 4;
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const distance = Math.random() * 50 + 20;

            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.borderRadius = '50%';
            dot.style.background = color;
            dot.style.boxShadow = `0 0 8px ${color}`;
            dot.style.transform = `translate(${targetX}px, ${targetY}px)`;
            dot.style.transition = 'transform 0.7s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.7s ease';

            document.body.appendChild(dot);

            setTimeout(() => {
                dot.style.transform = `translate(${targetX * 1.5}px, ${targetY * 1.5 - 20}px) scale(0)`;
                dot.style.opacity = '0';
            }, 20);

            setTimeout(() => dot.remove(), 750);
        }
    }

    // --- CANVAS HEART FIREWORKS ---
    let canvasWidth = (fireworksCanvas.width = window.innerWidth);
    let canvasHeight = (fireworksCanvas.height = window.innerHeight);
    const ctx = fireworksCanvas.getContext('2d');

    window.addEventListener('resize', () => {
        canvasWidth = fireworksCanvas.width = window.innerWidth;
        canvasHeight = fireworksCanvas.height = window.innerHeight;
    });

    const particles = [];

    class FireworkHeartParticle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.012;

            // Heart math shape parametric equation
            const t = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2.5 + 1.2;
            const hx = 16 * Math.pow(Math.sin(t), 3);
            const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            this.vx = (hx / 16) * speed;
            this.vy = (hy / 16) * speed;
            this.gravity = 0.04;
            this.size = Math.random() * 3 + 2;
        }

        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function launchHeartFireworks() {
        const colors = ['#ff4d79', '#ffd700', '#ff9ff3', '#ffffff', '#ff6b81'];
        const centerX = window.innerWidth * (0.3 + Math.random() * 0.4);
        const centerY = window.innerHeight * (0.2 + Math.random() * 0.3);

        for (let i = 0; i < 90; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new FireworkHeartParticle(centerX, centerY, color));
        }
    }



    function animateFireworks() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw(ctx);

            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateFireworks);
    }
    animateFireworks();

    function showToast(message) {
        toastText.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ============================================================================
    // WEB AUDIO API SYNTHESIZER (Nhạc nền lãng mạn & Hiệu ứng âm thanh ngọt ngào)
    // ============================================================================
    let audioCtx = null;
    let isMusicPlaying = false;
    let musicInterval = null;

    function initAudioEngine() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        if (!isMusicPlaying) {
            startRomanticMelody();
        }
    }

    function playNote(freq, startTime, duration, type = 'sine', gainLevel = 0.12) {
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        // Soft envelope for romantic bell/music box piano tone
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    // Canon in D / Romantic Melody arpeggios
    const notesFreq = {
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77
    };

    const melodySequence = [
        ['C4', 'E4', 'G4', 'C5'],
        ['G4', 'B4', 'D5', 'G5'],
        ['A4', 'C5', 'E5', 'A5'],
        ['F4', 'A4', 'C5', 'F5'],
        ['C4', 'E4', 'G4', 'E5'],
        ['F4', 'A4', 'C5', 'D5'],
        ['G4', 'B4', 'D5', 'G5'],
        ['C4', 'E4', 'G4', 'C5']
    ];

    let currentBar = 0;

    function startRomanticMelody() {
        if (!audioCtx) return;
        isMusicPlaying = true;
        soundWave.classList.add('playing');
        musicToggleBtn.classList.add('active');

        function playBar() {
            if (!isMusicPlaying || !audioCtx) return;
            const now = audioCtx.currentTime;
            const chord = melodySequence[currentBar];

            chord.forEach((note, index) => {
                const freq = notesFreq[note];
                if (freq) {
                    playNote(freq, now + index * 0.4, 1.2, 'triangle', 0.09);
                    // Add subtle harmonic overtone for chime richness
                    playNote(freq * 2, now + index * 0.4 + 0.02, 0.7, 'sine', 0.025);
                }
            });

            currentBar = (currentBar + 1) % melodySequence.length;
        }

        playBar();
        musicInterval = setInterval(playBar, 1700);
    }

    function stopRomanticMelody() {
        isMusicPlaying = false;
        soundWave.classList.remove('playing');
        musicToggleBtn.classList.remove('active');
        if (musicInterval) {
            clearInterval(musicInterval);
            musicInterval = null;
        }
    }

    // Toggle Music Button
    musicToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!audioCtx) {
            initAudioEngine();
            return;
        }
        if (isMusicPlaying) {
            stopRomanticMelody();
            showToast("Đã tắt nhạc nền");
        } else {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            startRomanticMelody();
            showToast("Đang phát nhạc nền lãng mạn 🎵");
        }
    });

    // Chime Sound (Card Opening or Action)
    function playChimeSound() {
        if (!audioCtx) {
            initAudioEngine();
        }
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        chimeNotes.forEach((freq, idx) => {
            playNote(freq, now + idx * 0.07, 0.8, 'sine', 0.12);
        });
    }

    // Balloon Pop Sound
    function playPopSound() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    }
});
