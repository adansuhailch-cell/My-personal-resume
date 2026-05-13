        // set year
        document.getElementById('year').textContent = new Date().getFullYear();

        // animate SVG circular progress rings
        (function animateRings() {
            const rings = document.querySelectorAll('.ring-progress');

            rings.forEach((ring, index) => {
                const percent = parseFloat(ring.getAttribute('data-percent')) || 0;
                // read radius from r attribute
                const r = parseFloat(ring.getAttribute('r')) || (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radius')) || 48);
                const circumference = 2 * Math.PI * r;

                // set stroke-dasharray and initial offset
                ring.style.strokeDasharray = `${circumference}`;
                ring.style.strokeDashoffset = `${circumference}`;

                // small stagger for multiple rings
                const delay = 140 * index;

                // animate using requestAnimationFrame for smoother result
                setTimeout(() => {
                    // target offset
                    const offset = circumference * (1 - percent / 100);
                    // trigger transition (CSS transition is defined)
                    ring.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.2,.9,.3,1)';
                    ring.style.strokeDashoffset = offset;

                    // also update the numeric label inside the circle
                    const parent = ring.closest('.circle-skill');
                    if (parent) {
                        const valueEl = parent.querySelector('.value');
                        // animate number from 0 to percent
                        let start = 0;
                        const duration = 1200; // ms
                        const startTime = performance.now();
                        function tick(now) {
                            const elapsed = now - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = progress < 0.5 ? (2 * progress * progress) : (-1 + (4 - 2 * progress) * progress); // simple ease
                            const current = Math.round(start + (percent - start) * eased);
                            valueEl.textContent = current + '%';
                            if (progress < 1) requestAnimationFrame(tick);
                            else valueEl.textContent = Math.round(percent) + '%';
                        }
                        requestAnimationFrame(tick);
                    }
                }, delay + 120); // small offset
            });
        })();