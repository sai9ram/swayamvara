/**
 * Swayamvara Wedding Photography - Core Interactive Engine
 * Handles Navigation, Mobile Drawer, Gallery Filtering, and Lightbox Preview
 */

(function () {
    'use strict';

    // 1. Sticky Header Scroll Effect
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 2. Mobile Drawer Navigation
    function initMobileDrawer() {
        const mobileBtns = document.querySelectorAll('.mobile-menu-btn');
        const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
        const drawerCloseBtns = document.querySelectorAll('.mobile-drawer-close');

        function openMobileDrawer(e) {
            if (e) e.preventDefault();
            if (drawerOverlay) {
                drawerOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeMobileDrawer(e) {
            if (e) e.preventDefault();
            if (drawerOverlay) {
                drawerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        mobileBtns.forEach(btn => {
            btn.addEventListener('click', openMobileDrawer);
        });

        drawerCloseBtns.forEach(btn => {
            btn.addEventListener('click', closeMobileDrawer);
        });

        if (drawerOverlay) {
            drawerOverlay.addEventListener('click', (e) => {
                if (e.target === drawerOverlay) {
                    closeMobileDrawer(e);
                }
            });
        }

        // Close mobile drawer on link click without preventing navigation
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (drawerOverlay) {
                    drawerOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileDrawer);
    } else {
        initMobileDrawer();
    }

    // 3. Back to Top Smooth Scroll
    document.querySelectorAll('.footer-back-top').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 4. Global Photo Lightbox Modal
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxLoc = document.getElementById('lightboxLoc');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentItems = [];
    let currentIndex = 0;

    function openLightbox(items, index) {
        currentItems = items;
        currentIndex = index;
        updateLightboxContent();
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function updateLightboxContent() {
        if (!currentItems || currentItems.length === 0 || !lightboxImg) return;
        const item = currentItems[currentIndex];
        const src = item.getAttribute('data-img') || item.getAttribute('src');
        const title = item.getAttribute('data-title') || item.getAttribute('alt') || 'Swayamvara Wedding Memory';
        const loc = item.getAttribute('data-loc') || item.getAttribute('data-category') || 'Hyderabad & Destination Weddings';

        lightboxImg.src = src;
        lightboxImg.alt = title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxLoc) lightboxLoc.textContent = loc;
    }

    function showNext() {
        if (currentItems.length > 0) {
            currentIndex = (currentIndex + 1) % currentItems.length;
            updateLightboxContent();
        }
    }

    function showPrev() {
        if (currentItems.length > 0) {
            currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
            updateLightboxContent();
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Attach click events to clickable gallery cards
    const galleryCards = Array.from(document.querySelectorAll('.gallery-item-card, .clickable-photo'));
    galleryCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            // Find visible cards based on current filter
            const visibleCards = galleryCards.filter(c => c.offsetParent !== null);
            const visibleIdx = visibleCards.indexOf(card);
            openLightbox(visibleCards.length > 0 ? visibleCards : galleryCards, visibleIdx !== -1 ? visibleIdx : idx);
        });
    });

    // 5. Portfolio Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-tab-btn');
    const portfolioItems = document.querySelectorAll('.gallery-item-card');
    const filterCounter = document.getElementById('activeFilterCount');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterVal = btn.getAttribute('data-filter');
                let count = 0;

                portfolioItems.forEach(item => {
                    const cat = item.getAttribute('data-category');
                    if (filterVal === 'all' || cat === filterVal) {
                        item.classList.remove('hidden');
                        item.style.display = '';
                        count++;
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });

                if (filterCounter) {
                    filterCounter.textContent = count;
                }
            });
        });
    }

    // 5. Cinematic Intro Splash Screen Engine (Full Intro with Final Brand Name & Smooth Landing)
    (function initSplashScreen() {
        const splash = document.getElementById('siteSplashScreen');
        if (!splash) return;

        const desktopVideo = document.getElementById('splashVideoDesktop');
        const mobileVideo = document.getElementById('splashVideoMobile');
        const skipBtn = document.getElementById('splashSkipBtn');
        const soundBtn = document.getElementById('splashSoundBtn');
        const progressBar = document.getElementById('splashProgressBar');

        // Lock background page scroll while splash plays
        document.documentElement.classList.add('splash-active');
        document.body.classList.add('splash-active');

        // Responsive video selection: Mobile (<= 768px), Desktop (> 768px)
        const isMobile = window.innerWidth <= 768;
        const activeVideo = isMobile ? mobileVideo : desktopVideo;
        const inactiveVideo = isMobile ? desktopVideo : mobileVideo;

        // Unload inactive video to prevent downloading unused heavy video file
        if (inactiveVideo) {
            try {
                inactiveVideo.pause();
                inactiveVideo.removeAttribute('src');
                const srcElem = inactiveVideo.querySelector('source');
                if (srcElem) srcElem.removeAttribute('src');
                inactiveVideo.load();
            } catch (e) {}
        }

        let isDismissed = false;

        function dismissSplash() {
            if (isDismissed) return;
            isDismissed = true;

            // Trigger smooth cinematic fade out & scale
            splash.classList.add('is-dismissed');

            // Unlock background scroll immediately so the landed page is interactive
            document.documentElement.classList.remove('splash-active');
            document.body.classList.remove('splash-active');

            // Complete landing cleanup after transition finishes
            setTimeout(() => {
                if (activeVideo) {
                    try { activeVideo.pause(); } catch (e) {}
                }
                splash.style.display = 'none';
            }, 1150);
        }

        if (activeVideo) {
            activeVideo.muted = true; // Required by all browsers for autoplay
            activeVideo.playbackRate = 1.0; // Play at full natural speed so the final Brand Name plays completely

            // Sync progress indicator bar
            activeVideo.addEventListener('timeupdate', () => {
                if (progressBar && activeVideo.duration) {
                    const pct = Math.min(100, (activeVideo.currentTime / activeVideo.duration) * 100);
                    progressBar.style.width = pct + '%';
                }
            });

            // Smooth exit when the full intro animation finishes and Brand Name settles
            activeVideo.addEventListener('ended', () => {
                // Hold briefly on the final Brand Name before smoothly fading into the index page
                setTimeout(dismissSplash, 450);
            });

            // Trigger autoplay
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    activeVideo.muted = true;
                    activeVideo.play().catch(() => {});
                });
            }
        }

        // Sound toggle button (Desktop video features an audio track)
        if (soundBtn && activeVideo) {
            const iconMuted = soundBtn.querySelector('.icon-muted');
            const iconUnmuted = soundBtn.querySelector('.icon-unmuted');

            soundBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                activeVideo.muted = !activeVideo.muted;
                if (!activeVideo.muted) {
                    if (iconMuted) iconMuted.style.display = 'none';
                    if (iconUnmuted) iconUnmuted.style.display = 'inline-block';
                    soundBtn.style.borderColor = '#C5A059';
                    soundBtn.style.color = '#FFFFFF';
                } else {
                    if (iconMuted) iconMuted.style.display = 'inline-block';
                    if (iconUnmuted) iconUnmuted.style.display = 'none';
                    soundBtn.style.borderColor = 'rgba(197, 160, 89, 0.45)';
                    soundBtn.style.color = '#FBF7F0';
                }
            });
        }

        // Skip button handler
        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissSplash();
            });
        }

        // Keyboard navigation (Escape key skips intro immediately)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.code === 'Escape') {
                dismissSplash();
            }
        });

        // Fail-safe safety timeout: set beyond full video length (10s desktop, 8s mobile)
        // so it NEVER prematurely cuts off the intro or Brand Name
        setTimeout(dismissSplash, 12500);
    })();

})();


