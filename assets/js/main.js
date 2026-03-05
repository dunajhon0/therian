/* ============================================
   THERIAN COMMUNITY — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVIGATION ==========
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navAnchors.forEach(a => a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 50);
        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
        // Scroll-to-top button
        document.querySelector('.scroll-top')?.classList.toggle('visible', window.scrollY > 600);
        lastScroll = window.scrollY;
    });

    // Scroll to top
    document.querySelector('.scroll-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== SCROLL REVEAL ==========
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ========== FAQ ACCORDION ==========
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            // Toggle current
            if (!isActive) item.classList.add('active');
        });
    });

    // ========== GALLERY FILTERS ==========
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.dataset.filter;
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            document.querySelectorAll('.gallery-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // ========== STATS ANIMATION ==========
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.bar-item-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width || '0%';
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stats-grid').forEach(g => statsObserver.observe(g));

    // ========== COOKIE CONSENT ==========
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieConsent = localStorage.getItem('therian_cookie_consent');

    if (!cookieConsent && cookieBanner) {
        setTimeout(() => cookieBanner.classList.add('show'), 1500);
    }

    window.acceptCookies = (level) => {
        localStorage.setItem('therian_cookie_consent', level);
        cookieBanner?.classList.remove('show');
        if (level === 'all') {
            loadAdSense();
            loadAnalytics();
        } else if (level === 'essential') {
            // Only essential cookies — no third-party scripts
        }
    };

    function loadAdSense() {
        // AdSense script is loaded globally via <head> (async).
        // This function marks that the user has granted consent for advertising cookies.
        // No additional script injection needed.
    }

    function loadAnalytics() {
        // Placeholder: Insert Google Analytics / GA4 here
        console.log('[Therian] Analytics: consent granted, ready to load analytics.');
    }

    // Load third-party on returning visitors who accepted
    if (cookieConsent === 'all') {
        loadAdSense();
        loadAnalytics();
    }

    // ========== GPT LINK BOX ==========
    const gptInput = document.getElementById('gpt-url-input');
    const gptBtn = document.getElementById('gpt-open-btn');
    const gptError = document.getElementById('gpt-error');

    gptBtn?.addEventListener('click', () => {
        const url = gptInput?.value.trim();
        gptError?.classList.remove('show');

        if (!url) {
            showGptError('Por favor, introduce un enlace.');
            return;
        }

        // Basic URL validation
        try {
            const parsed = new URL(url);
            if (!parsed.protocol.startsWith('http')) {
                showGptError('El enlace debe comenzar con https://');
                return;
            }
            // Open in new tab safely
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch {
            showGptError('El formato del enlace no es válido. Asegúrate de copiar la URL completa.');
        }
    });

    gptInput?.addEventListener('input', () => gptError?.classList.remove('show'));

    function showGptError(msg) {
        if (gptError) {
            gptError.textContent = msg;
            gptError.classList.add('show');
        }
    }

    // ========== AMBIENT MUSIC PLAYER (HTML5 Audio) ==========
    const musicToggle = document.getElementById('music-toggle');
    const musicPanel = document.querySelector('.music-panel');
    const trackBtns = document.querySelectorAll('.track-btn');
    const volumeSlider = document.getElementById('volume-slider');

    let currentAudio = null;
    let currentTrack = null;

    const trackSources = {
        forest: 'assets/audio/bosque.mp3',
        wind: 'assets/audio/noche.mp3',
        rain: 'assets/audio/lluvia.mp3'
    };

    function stopCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        currentTrack = null;
        musicToggle?.classList.remove('playing');
        trackBtns.forEach(b => b.classList.remove('active'));
    }

    musicToggle?.addEventListener('click', () => {
        musicPanel?.classList.toggle('open');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.music-player')) {
            musicPanel?.classList.remove('open');
        }
    });

    trackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const trackId = btn.dataset.track;

            if (currentTrack === trackId) {
                // Stop current track
                stopCurrentAudio();
                return;
            }

            // Stop previous
            stopCurrentAudio();

            // Play new track
            const src = trackSources[trackId];
            if (src) {
                currentAudio = new Audio(src);
                currentAudio.loop = true;
                currentAudio.volume = volumeSlider ? volumeSlider.value / 100 : 0.5;
                currentAudio.play().catch(e => console.log('Audio play error:', e));

                currentTrack = trackId;
                btn.classList.add('active');
                musicToggle?.classList.add('playing');
            }
        });
    });

    volumeSlider?.addEventListener('input', () => {
        if (currentAudio) {
            currentAudio.volume = volumeSlider.value / 100;
        }
    });

    // ========== IMAGE FALLBACK ==========
    document.querySelectorAll('img[data-fallback]').forEach(img => {
        img.addEventListener('error', function () {
            if (!this.dataset.retried) {
                this.dataset.retried = 'true';
                this.src = this.dataset.fallback || 'data:image/svg+xml,' + encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f5f0e8"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="14">Imagen no disponible</text></svg>'
                );
            }
        });
    });

    // ========== QUIZ / ENCUESTA THERIAN ==========
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');
    const quizRetryBtn = document.getElementById('quiz-retry-btn');
    const MAX_SCORE = 16; // 8 preguntas × 2 pts máx

    const LEVELS = [
        {
            min: 0, max: 5,
            icon: '🌱',
            label: 'Explorador Inicial',
            desc: 'Acabas de dar tus primeros pasos en el mundo therian. Esta guía es el lugar perfecto para descubrir qué es la therianthropy, la identidad therian y mucho más. ¡Bienvenido/a!'
        },
        {
            min: 6, max: 10,
            icon: '🌿',
            label: 'Conocedor Curioso',
            desc: 'Tienes nociones básicas sobre la therianthropy y la comunidad therian. Ya distingues los conceptos clave, aunque aún hay mucho por explorar. Sigue leyendo para profundizar.'
        },
        {
            min: 11, max: 15,
            icon: '🌳',
            label: 'Entendido en Therianthropy',
            desc: 'Conoces bien la identidad therian, su historia y sus símbolos. Tus respuestas demuestran que has investigado o vivido de cerca esta comunidad. ¡Gran nivel!'
        },
        {
            min: 16, max: Infinity,
            icon: '🐺',
            label: 'Experto en la Comunidad',
            desc: 'Dominas la therianthropy a fondo: sus orígenes en Usenet, el teriotipo, los tipos de shifting y la evolución de la comunidad. Eres un referente. ¡Impresionante!'
        }
    ];

    // Mark fieldset as answered when user picks an option
    document.querySelectorAll('.quiz-question').forEach(fieldset => {
        fieldset.addEventListener('change', () => {
            fieldset.classList.add('answered');
        });
    });

    function calcScore() {
        let total = 0;
        const names = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
        names.forEach(name => {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            if (checked) total += parseInt(checked.value, 10);
        });
        return total;
    }

    function allAnswered() {
        const names = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
        return names.every(name => document.querySelector(`input[name="${name}"]:checked`));
    }

    function showResult(score) {
        const level = LEVELS.find(l => score >= l.min && score <= l.max);
        const pct = Math.min(Math.round((score / MAX_SCORE) * 100), 100);

        document.getElementById('quiz-result-icon').textContent = level.icon;
        document.getElementById('quiz-result-level').textContent = level.label;
        document.getElementById('quiz-result-desc').textContent = level.desc;
        document.getElementById('quiz-score-label').textContent =
            `Puntuación: ${score} / ${MAX_SCORE} puntos`;

        // Hide form, show result
        quizForm.style.display = 'none';
        quizResult.removeAttribute('hidden');

        // Trigger animation on next frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                quizResult.classList.add('show');
                document.getElementById('quiz-score-bar').style.width = pct + '%';
            });
        });

        // Smooth scroll to result
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Re-observe reveal elements in case they haven't fired
        document.querySelectorAll('#encuesta .reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }

    function resetQuiz() {
        quizResult.classList.remove('show');
        document.getElementById('quiz-score-bar').style.width = '0';
        setTimeout(() => {
            quizResult.setAttribute('hidden', '');
            quizForm.reset();
            quizForm.style.display = '';
            document.querySelectorAll('.quiz-question').forEach(f => f.classList.remove('answered'));
            quizForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
    }

    quizForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!allAnswered()) {
            // Highlight first unanswered question
            const names = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
            const first = names.find(n => !document.querySelector(`input[name="${n}"]:checked`));
            if (first) {
                const fieldset = document.querySelector(`[data-question="${first.replace('q', '')}"]`);
                fieldset?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                fieldset?.classList.add('unanswered-shake');
                setTimeout(() => fieldset?.classList.remove('unanswered-shake'), 600);
            }
            return;
        }
        showResult(calcScore());
    });

    quizRetryBtn?.addEventListener('click', resetQuiz);

});
