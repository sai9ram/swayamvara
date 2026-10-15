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
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
    const drawerClose = document.querySelector('.mobile-drawer-close');

    function openMobileDrawer() {
        if (drawerOverlay) {
            drawerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileDrawer() {
        if (drawerOverlay) {
            drawerOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', openMobileDrawer);
    }
    if (drawerClose) {
        drawerClose.addEventListener('click', closeMobileDrawer);
    }
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', (e) => {
            if (e.target === drawerOverlay) {
                closeMobileDrawer();
            }
        });
    }

    // Close mobile drawer on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

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

})();
