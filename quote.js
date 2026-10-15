/**
 * Swayamvara Wedding Photography — Advanced Wedding Quotation Builder
 * Interactive State Engine & Integrated Modal Configurator
 * Reference Pricing: https://www.vaibhavambyvarun.in/quote.html
 */

(function () {
    'use strict';

    // 1. Master Configuration & Reference Pricing
    const QUOTE_DATA = {
        styles: {
            candid: {
                name: 'Candid Photography',
                desc: 'Authentic emotions, spontaneous laughter, and heartwarming unscripted moments.',
                img: '609948448_18090306871967204_1300483370148847510_n.jpg'
            },
            traditional: {
                name: 'Traditional Photography',
                desc: 'Classic portraits, graceful family rituals, and rich cultural ceremonies.',
                img: '634111725_18094156954967204_6789918060777664108_n.jpg'
            }
        },
        ceremonies: {
            engagement: {
                name: 'Engagement',
                desc: 'Rings exchange, intimate family blessings & warm celebratory dinner.',
                img: '491505012_18064652374967204_1171644279762775076_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 10000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 10000, thumb: 'Traditional Video.webp' },
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' },
                    { id: 'drone', name: 'Drone Coverage', price: 12000, thumb: 'Drone camera.webp' }
                ]
            },
            pelli_koduku: {
                name: 'Pelli Koduku & Haldi',
                desc: 'Traditional Telugu groom ceremony, sacred turmeric bath & family festivities.',
                img: '572900385_18083386771967204_4933992170849967498_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 10000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 10000, thumb: 'Traditional Video.webp' },
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' }
                ]
            },
            pelli_kuthuru: {
                name: 'Pelli Kuthuru & Haldi',
                desc: 'Bridal Nalugu rituals, joyous turmeric splashes & emotional moments.',
                img: '621829770_18085461035126499_5689806598605301436_n.webp',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 10000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 10000, thumb: 'Traditional Video.webp' },
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' }
                ]
            },
            mehandi: {
                name: 'Mehandi',
                desc: 'Intricate bridal henna artwork, colorful decor & cheerful gathering.',
                img: '654663041_18083966831601910_6151680735575874864_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 10000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 10000, thumb: 'Traditional Video.webp' },
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' }
                ]
            },
            reception: {
                name: 'Reception',
                desc: 'Grand stage entry, royal portraits, guest greetings & evening dinner.',
                img: '695789051_18102919540967204_5846810095421264545_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 10000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 10000, thumb: 'Traditional Video.webp' },
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' }
                ]
            },
            grand_wedding: {
                name: 'Grand Wedding',
                desc: 'Muhurtham, Jeelakarra Bellam, Mangalasutram, Talambralu & Saptapadi rituals.',
                img: '572985411_18083469049967204_562853622138040638_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 15000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 15000, thumb: 'Traditional Video.webp' },
                    { id: 'candid_photo', name: 'Candid Photo', price: 20000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 20000, thumb: 'Candid Video.avif' },
                    { id: 'drone', name: 'Drone Coverage', price: 12000, thumb: 'Drone camera.webp' }
                ]
            },
            vratham: {
                name: 'Vratham',
                desc: 'Satyanarayana Swamy Pooja, solemn mantras & sacred family blessings.',
                img: '634520398_18094154743967204_5441340631586413793_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 8000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 8000, thumb: 'Traditional Video.webp' }
                ]
            },
            sangeeth: {
                name: 'Sangeeth',
                desc: 'High-energy dance performances, musical night & joyful celebrations.',
                img: '696044466_18103008103967204_1966601098065850134_n.jpg',
                services: [
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' },
                    { id: 'trad_photo', name: 'Traditional Photo', price: 10000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 10000, thumb: 'Traditional Video.webp' }
                ]
            },
            pre_wedding: {
                name: 'Pre-Wedding',
                desc: 'Cinematic destination shoot, romantic couple portraits & teaser film.',
                img: '655579212_18145380064470216_2840087960424965128_n.jpg',
                services: [
                    { id: 'candid_photo', name: 'Candid Photo', price: 15000, thumb: 'Candid Camera.webp' },
                    { id: 'candid_video', name: 'Candid Video', price: 15000, thumb: 'Candid Video.avif' },
                    { id: 'drone', name: 'Drone Coverage', price: 12000, thumb: 'Drone camera.webp' }
                ]
            }
        },
        addons: {
            led_wall: {
                name: 'LED Wall (Optional)',
                desc: 'High-definition ultra-bright P3 indoor LED display screen for live ceremony feed & wedding trailer projection.',
                price: 15000,
                img: 'LED wall.webp',
                note: '8 hours per session'
            },
            live_streaming: {
                name: 'Live Streaming (Optional)',
                desc: 'Multi-camera HD broadcast over YouTube / private link so family and loved ones worldwide never miss a ritual.',
                price: 8000,
                img: 'live Stream.avif',
                note: '8 hours per session'
            }
        }
    };

    // 2. State Machine
    const state = {
        currentStep: 1,
        selectedStyle: 'candid',
        selectedServices: new Map(),
        selectedAddons: new Set(),
        customerDetails: {
            fullName: '',
            email: '',
            phone: '',
            venue: '',
            weddingDate: '',
            notes: ''
        },
        quoteId: 'SW-' + Math.floor(100000 + Math.random() * 900000)
    };

    function formatINR(number) {
        if (typeof number !== 'number') number = Number(number) || 0;
        return '₹' + number.toLocaleString('en-IN');
    }

    // 3. Inject Quotation Builder Modal into Document if not already on page
    function ensureModalExists() {
        let modalOverlay = document.getElementById('swayamvaraQuoteModal');
        if (modalOverlay) return modalOverlay;

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'quote-modal-overlay';
        modalOverlay.id = 'swayamvaraQuoteModal';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-label', 'Swayamvara Interactive Wedding Quotation Builder');

        modalOverlay.innerHTML = `
            <div class="quote-modal-dialog">
                <!-- Modal Top Navigation Bar -->
                <div class="quote-modal-top-bar">
                    <div class="quote-modal-brand">
                        <span class="brand-name">Swayamvara</span>
                        <span class="brand-sub">Interactive Wedding Quotation Builder</span>
                    </div>
                    <button type="button" class="quote-modal-close-btn" id="closeQuoteModalBtn" aria-label="Close Quotation Builder">
                        <span class="close-x">&times;</span>
                        <span>CLOSE</span>
                    </button>
                </div>

                <div class="quote-modal-inner-content">
                    <!-- Hero Banner -->
                    <section class="quote-hero-section" style="padding: clamp(36px, 5vw, 60px) 5vw clamp(30px, 4vw, 45px);" aria-label="Quotation Hero">
                        <div class="quote-hero-bg-accent" aria-hidden="true"></div>
                        <div class="quote-hero-container" style="gap: 30px;">
                            <div class="quote-hero-content-col">
                                <div class="quote-hero-eyebrow">YOUR CELEBRATION, BEAUTIFULLY PRESERVED</div>
                                <h2 class="quote-hero-title" style="font-size: clamp(2.2rem, 3.8vw, 3.4rem); margin-bottom: 16px;">
                                    Every Wedding Is Unique.<br>
                                    <em>Your Quote Should Be Too.</em>
                                </h2>
                                <p class="quote-hero-lead" style="margin-bottom: 20px; font-size: 1.05rem;">
                                    Choose the moments you want us to capture, personalize your wedding coverage, and build a quotation tailored to your celebration.
                                </p>
                                <span class="quote-hero-microcopy">A FEW SIMPLE STEPS &middot; A QUOTE MADE FOR YOU</span>
                            </div>
                            <div class="quote-hero-photo-wrap" style="max-width: 320px;">
                                <div class="quote-hero-photo-frame" style="padding: 10px;">
                                    <div class="quote-hero-photo-inner" style="aspect-ratio: 4/5;">
                                        <img src="654133454_18040384025685409_7668423551746430989_n.jpg"
                                            alt="Cinematic Indian Wedding Couple" loading="eager">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Quotation Workspace -->
                    <section class="quote-builder-section" id="builder" style="padding-top: 30px;">
                        <div class="quote-builder-container">
                            <!-- 4-Stage Progress Nav -->
                            <nav class="builder-progress-nav" id="builderProgressNav" aria-label="Quotation Configuration Stages">
                                <div class="progress-step-item active" data-step="1" role="button" tabindex="0">
                                    <div class="progress-num">01</div>
                                    <div class="progress-text-block">
                                        <span class="progress-label">STAGE 01</span>
                                        <span class="progress-title">Your Style</span>
                                    </div>
                                </div>
                                <div class="progress-step-item" data-step="2" role="button" tabindex="0">
                                    <div class="progress-num">02</div>
                                    <div class="progress-text-block">
                                        <span class="progress-label">STAGE 02</span>
                                        <span class="progress-title">Your Celebrations</span>
                                    </div>
                                </div>
                                <div class="progress-step-item" data-step="3" role="button" tabindex="0">
                                    <div class="progress-num">03</div>
                                    <div class="progress-text-block">
                                        <span class="progress-label">STAGE 03</span>
                                        <span class="progress-title">Your Enhancements</span>
                                    </div>
                                </div>
                                <div class="progress-step-item" data-step="4" role="button" tabindex="0">
                                    <div class="progress-num">04</div>
                                    <div class="progress-text-block">
                                        <span class="progress-label">STAGE 04</span>
                                        <span class="progress-title">Your Details</span>
                                    </div>
                                </div>
                            </nav>

                            <!-- Two-Column Workspace Layout -->
                            <div class="builder-workspace-grid">
                                <!-- LEFT COLUMN: Configurator Steps -->
                                <div class="builder-steps-wrapper">
                                    <!-- Step 1: Style Selection -->
                                    <div class="builder-step-pane active" id="stepPane1">
                                        <div class="step-header">
                                            <span class="step-eyebrow">STAGE 01 &bull; AESTHETIC DIRECTION</span>
                                            <h3 class="step-headline">How Would You Like Your Story Captured?</h3>
                                            <p class="step-description">
                                                Choose the photography style that reflects the way you want to remember your wedding. Your choice guides our camera composition and visual storytelling.
                                            </p>
                                        </div>
                                        <div class="style-selection-grid">
                                            <div class="style-card selected" data-style="candid" tabindex="0" role="radio" aria-checked="true">
                                                <div class="style-card-img-wrap">
                                                    <img src="609948448_18090306871967204_1300483370148847510_n.jpg" alt="Candid Wedding Photography Moments" loading="lazy">
                                                    <span class="style-card-badge">POPULAR CHOICE</span>
                                                </div>
                                                <div class="style-card-content">
                                                    <div class="style-card-header">
                                                        <h4 class="style-card-title">Candid Photography</h4>
                                                        <div class="style-check-indicator" aria-hidden="true">&#10003;</div>
                                                    </div>
                                                    <p class="style-card-desc">
                                                        Authentic emotions, spontaneous laughter, and heartwarming unscripted moments captured discreetly without posing.
                                                    </p>
                                                    <div class="style-included-pill">
                                                        <span>&#10004; INCLUDED IN CREATIVE DIRECTION</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="style-card" data-style="traditional" tabindex="0" role="radio" aria-checked="false">
                                                <div class="style-card-img-wrap">
                                                    <img src="634111725_18094156954967204_6789918060777664108_n.jpg" alt="Traditional Wedding Photography Portraits" loading="lazy">
                                                    <span class="style-card-badge">HERITAGE CLASSIC</span>
                                                </div>
                                                <div class="style-card-content">
                                                    <div class="style-card-header">
                                                        <h4 class="style-card-title">Traditional Photography</h4>
                                                        <div class="style-check-indicator" aria-hidden="true">&#10003;</div>
                                                    </div>
                                                    <p class="style-card-desc">
                                                        Classic portraits, family group photographs, and sacred ritual moments documented with timeless ceremonial reverence.
                                                    </p>
                                                    <div class="style-included-pill">
                                                        <span>&#10004; INCLUDED IN CREATIVE DIRECTION</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 2: Ceremony Accordions -->
                                    <div class="builder-step-pane" id="stepPane2">
                                        <div class="step-header">
                                            <span class="step-eyebrow">STAGE 02 &bull; CEREMONY COVERAGE</span>
                                            <h3 class="step-headline">Which Moments Should We Capture?</h3>
                                            <p class="step-description">
                                                Select the ceremonies you would like us to cover, then customize the photography and videography services for each event.
                                            </p>
                                        </div>
                                        <div class="ceremonies-accordion-list" id="ceremoniesAccordion"></div>
                                    </div>

                                    <!-- Step 3: Luxury Add-ons -->
                                    <div class="builder-step-pane" id="stepPane3">
                                        <div class="step-header">
                                            <span class="step-eyebrow">STAGE 03 &bull; BESPOKE EXPERIENCES</span>
                                            <h3 class="step-headline">Make Your Celebration Even More Memorable.</h3>
                                            <p class="step-description">
                                                Add optional experiences to complete your wedding coverage. Enhance your celebration with grand digital projection or live international broadcasting.
                                            </p>
                                        </div>
                                        <div class="addons-grid">
                                            <div class="addon-card" data-addon="led_wall">
                                                <div class="addon-card-img-wrap">
                                                    <img src="LED wall.webp" alt="Wedding Reception LED Wall Screen" loading="lazy">
                                                    <span class="addon-badge">GRAND VISUALS</span>
                                                </div>
                                                <div class="addon-content">
                                                    <div class="addon-title-row">
                                                        <h4 class="addon-title">LED Wall (Optional)</h4>
                                                        <span class="addon-price">&#8377;15,000</span>
                                                    </div>
                                                    <p class="addon-desc">
                                                        Ultra-bright, seamless high-definition P3 indoor LED display screen for live camera projection, guest greeting visuals, and pre-wedding trailer screening.
                                                    </p>
                                                    <div class="addon-footer">
                                                        <span class="addon-timing-note">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polyline points="12 6 12 12 16 14"></polyline>
                                                            </svg>
                                                            Working hours: 8 hours per session
                                                        </span>
                                                        <button type="button" class="addon-toggle-btn">+ Add Experience</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="addon-card" data-addon="live_streaming">
                                                <div class="addon-card-img-wrap">
                                                    <img src="live Stream.avif" alt="Wedding Live Streaming Broadcast" loading="lazy">
                                                    <span class="addon-badge">WORLDWIDE ACCESS</span>
                                                </div>
                                                <div class="addon-content">
                                                    <div class="addon-title-row">
                                                        <h4 class="addon-title">Live Streaming (Optional)</h4>
                                                        <span class="addon-price">&#8377;8,000</span>
                                                    </div>
                                                    <p class="addon-desc">
                                                        Multi-camera broadcast in pristine 1080p full HD with crisp audio feed, broadcasted via private YouTube link or custom webpage for family and friends abroad.
                                                    </p>
                                                    <div class="addon-footer">
                                                        <span class="addon-timing-note">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polyline points="12 6 12 12 16 14"></polyline>
                                                            </svg>
                                                            Working hours: 8 hours per session
                                                        </span>
                                                        <button type="button" class="addon-toggle-btn">+ Add Experience</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="addon-info-banner">
                                            <svg class="addon-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                            <span class="addon-info-text">
                                                <strong>Important Note:</strong> Working hours: 8 hours per session. The session duration is an operational guideline for on-site staff and equipment deployment, not an additional charge.
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Step 4: Your Details -->
                                    <div class="builder-step-pane" id="stepPane4">
                                        <div class="step-header">
                                            <span class="step-eyebrow">STAGE 04 &bull; PERSONALIZATION</span>
                                            <h3 class="step-headline">Let's Make Your Wedding Official.</h3>
                                            <p class="step-description">
                                                Share a few details so we can prepare your personalized wedding quotation and confirm our photography team's calendar availability.
                                            </p>
                                        </div>
                                        <div class="details-form-card">
                                            <form id="quoteCustomerForm" novalidate>
                                                <div class="details-form-grid">
                                                    <div class="form-field-group">
                                                        <label for="customerName" class="form-field-label">Full Name <span class="form-req-star">*</span></label>
                                                        <input type="text" id="customerName" class="form-input-text" placeholder="e.g. Sravanthi &amp; Karthik" required autocomplete="name">
                                                        <span class="form-error-msg" id="customerNameError">Please enter your full name.</span>
                                                    </div>
                                                    <div class="form-field-group">
                                                        <label for="customerEmail" class="form-field-label">Email Address <span class="form-req-star">*</span></label>
                                                        <input type="email" id="customerEmail" class="form-input-text" placeholder="e.g. sravanthi.k@gmail.com" required autocomplete="email">
                                                        <span class="form-error-msg" id="customerEmailError">Please enter a valid email address.</span>
                                                    </div>
                                                    <div class="form-field-group">
                                                        <label for="customerPhone" class="form-field-label">WhatsApp Number <span class="form-req-star">*</span></label>
                                                        <input type="tel" id="customerPhone" class="form-input-text" placeholder="+91 98765 43210" required autocomplete="tel">
                                                        <span class="form-error-msg" id="customerPhoneError">Please enter a valid 10-digit WhatsApp number.</span>
                                                    </div>
                                                    <div class="form-field-group">
                                                        <label for="customerDate" class="form-field-label">Wedding Date <span class="form-req-star">*</span></label>
                                                        <input type="date" id="customerDate" class="form-input-date" required>
                                                        <span class="form-error-msg" id="customerDateError">Please select your primary wedding date.</span>
                                                    </div>
                                                    <div class="form-field-group form-group-full">
                                                        <label for="customerVenue" class="form-field-label">Venue / City <span class="form-req-star">*</span></label>
                                                        <input type="text" id="customerVenue" class="form-input-text" placeholder="e.g. N Convention, Madhapur, Hyderabad" required>
                                                        <span class="form-error-msg" id="customerVenueError">Please specify your wedding venue or city.</span>
                                                    </div>
                                                    <div class="form-field-group form-group-full">
                                                        <label for="customerNotes" class="form-field-label">Ceremony Timings &amp; Special Requests (Optional)</label>
                                                        <textarea id="customerNotes" rows="3" class="form-input-textarea" placeholder="Tell us about specific muhurtham timings, multiple venues, or special traditions you would love us to highlight..."></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-privacy-reassurance">
                                                    <svg class="privacy-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                    </svg>
                                                    <span>Your details will only be used to prepare and coordinate your wedding photography quotation. We respect your privacy.</span>
                                                </div>
                                                <div style="margin-top: 32px; display: flex; justify-content: flex-end;">
                                                    <button type="submit" class="btn-luxury-maroon" style="padding: 18px 40px;">
                                                        <span>GENERATE MY WEDDING QUOTE ↗</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <!-- RIGHT COLUMN: Sticky Quotation Summary Panel -->
                                <aside class="builder-summary-sticky-col" aria-label="Live Quotation Summary">
                                    <div class="quote-summary-panel">
                                        <div class="summary-panel-header">
                                            <span class="summary-header-title">Your Wedding Quote</span>
                                            <span class="summary-header-badge" id="summaryItemBadge">0 Items</span>
                                        </div>
                                        <div class="summary-panel-body">
                                            <div class="summary-style-box">
                                                <span class="summary-style-label">Photography Style</span>
                                                <span class="summary-style-val" id="summarySelectedStyle">Candid Photography</span>
                                            </div>
                                            <div class="summary-items-list" id="summaryItemsList"></div>
                                        </div>
                                        <div class="summary-total-box">
                                            <div class="summary-total-label-row">
                                                <span class="summary-total-label">Estimated Total</span>
                                                <span class="summary-total-note">Transparent Pricing</span>
                                            </div>
                                            <div class="summary-grand-total" id="summaryGrandTotal">&#8377;0</div>
                                        </div>
                                        <div class="summary-panel-footer">
                                            <button type="button" class="btn-continue-step" id="btnContinueStep">
                                                <span>Continue to Celebrations &rarr;</span>
                                            </button>
                                            <button type="button" class="btn-back-step" id="btnBackStep" style="display: none;">
                                                &larr; Previous Step
                                            </button>
                                        </div>
                                    </div>
                                </aside>
                            </div>

                            <!-- STEP 5: Confirmation Screen -->
                            <div class="quote-confirmation-pane" id="stepPane5" aria-label="Personalized Quotation Confirmation">
                                <div class="confirmation-card-outer">
                                    <div class="confirmation-gold-border-decor" aria-hidden="true"></div>
                                    <div class="confirmation-header-block">
                                        <svg class="confirmation-mandala-motif" viewBox="0 0 100 100" fill="currentColor">
                                            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
                                            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="0.8"/>
                                            <path d="M50 18 C56 32, 60 40, 50 50 C40 40, 44 32, 50 18 Z" opacity="0.85"/>
                                            <path d="M50 82 C56 68, 60 60, 50 50 C40 60, 44 68, 50 82 Z" opacity="0.85"/>
                                            <path d="M18 50 C32 56, 40 60, 50 50 C40 40, 32 44, 18 50 Z" opacity="0.85"/>
                                            <path d="M82 50 C68 56, 60 60, 50 50 C60 40, 68 44, 82 50 Z" opacity="0.85"/>
                                            <circle cx="50" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                        <h3 class="confirmation-headline">Your Story Begins Here.</h3>
                                        <p class="confirmation-subtext">
                                            Thank you for sharing your celebration with us. Your selected services and details have been received and curated into your bespoke wedding package.
                                        </p>
                                        <span class="confirmation-ref-tag" id="confirmQuoteRef">REFERENCE: SW-2026-000000</span>
                                    </div>
                                    <div class="quote-certificate-body" id="quoteCertificatePrintArea">
                                        <div class="quote-client-details-grid">
                                            <div class="quote-detail-item">
                                                <span class="quote-detail-label">COUPLE NAME</span>
                                                <span class="quote-detail-val" id="confirmClientName">—</span>
                                            </div>
                                            <div class="quote-detail-item">
                                                <span class="quote-detail-label">WEDDING DATE</span>
                                                <span class="quote-detail-val" id="confirmClientDate">—</span>
                                            </div>
                                            <div class="quote-detail-item">
                                                <span class="quote-detail-label">EVENT VENUE &amp; CITY</span>
                                                <span class="quote-detail-val" id="confirmClientVenue">—</span>
                                            </div>
                                            <div class="quote-detail-item">
                                                <span class="quote-detail-label">WHATSAPP CONTACT</span>
                                                <span class="quote-detail-val" id="confirmClientPhone">—</span>
                                            </div>
                                            <div class="quote-detail-item">
                                                <span class="quote-detail-label">EMAIL ADDRESS</span>
                                                <span class="quote-detail-val" id="confirmClientEmail">—</span>
                                            </div>
                                            <div class="quote-detail-item">
                                                <span class="quote-detail-label">PRIMARY STYLE</span>
                                                <span class="quote-detail-val" id="confirmClientStyle">Candid Photography</span>
                                            </div>
                                        </div>
                                        <div class="quote-table-wrap">
                                            <table class="quote-table" aria-label="Itemized Services Table">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 40px;">#</th>
                                                        <th>Ceremony &amp; Selected Coverage Service</th>
                                                        <th style="text-align: right;">Amount (INR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="confirmTableBody"></tbody>
                                                <tfoot>
                                                    <tr class="quote-table-total-row">
                                                        <td colspan="2" style="font-family: 'Cinzel', serif; letter-spacing: 0.16em;">ESTIMATED GRAND TOTAL</td>
                                                        <td id="confirmGrandTotal">&#8377;0</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div class="quote-terms-box">
                                            <strong>Quotation Validity &amp; Booking Information:</strong><br>
                                            &bull; This estimate is generated based on your tailored ceremony selections and remains valid for <strong>15 days</strong> from generation.<br>
                                            &bull; Wedding dates are secured only upon deposit confirmation and mutual agreement.<br>
                                            &bull; Deliverables include curated high-resolution edited images, cinematographic 4K wedding films, and master keepsake albums.<br>
                                            &bull; Equipment working hours for add-ons (LED wall, live stream) are 8 hours per session.
                                        </div>
                                        <div class="confirmation-actions-bar">
                                            <button type="button" class="btn-action-pdf" id="btnPrintPdf">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                                                    <path d="M6 14h12v8H6z"/>
                                                </svg>
                                                <span>Download Quotation PDF</span>
                                            </button>
                                            <a href="#" class="btn-action-whatsapp" id="btnShareWhatsapp" target="_blank" rel="noopener">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12.031 0C5.39 0 0 5.391 0 12.031c0 2.125.563 4.156 1.625 5.953L.047 24l6.188-1.594c1.734 1 3.75 1.547 5.797 1.547 6.64 0 12.031-5.391 12.031-12.031S18.672 0 12.031 0zm0 21.844c-1.875 0-3.672-.516-5.234-1.469l-.375-.234-3.875 1 1.031-3.766-.25-.39c-1.047-1.625-1.594-3.516-1.594-5.469 0-5.438 4.422-9.859 9.859-9.859 5.438 0 9.859 4.422 9.859 9.859 0 5.438-4.422 9.859-9.859 9.859zm5.406-7.391c-.297-.156-1.75-.859-2.031-.953-.266-.109-.469-.156-.656.156-.203.297-.75.953-.922 1.156-.172.188-.344.219-.641.063-.297-.156-1.25-.469-2.391-1.484-.891-.797-1.484-1.781-1.656-2.078-.172-.297-.016-.453.125-.609.141-.141.297-.344.453-.516.141-.172.203-.297.297-.484.109-.203.047-.375-.031-.531s-.656-1.578-.891-2.156c-.234-.563-.484-.484-.656-.484h-.563c-.203 0-.516.078-.781.375s-1.047 1.016-1.047 2.484c0 1.469 1.078 2.891 1.219 3.094.156.188 2.094 3.203 5.078 4.484.703.313 1.25.484 1.688.625.719.234 1.375.203 1.891.125.578-.094 1.75-.719 2-1.406.25-.688.25-1.281.172-1.406-.063-.125-.266-.203-.563-.344z"/>
                                                </svg>
                                                <span>Send via WhatsApp</span>
                                            </a>
                                            <a href="#" class="btn-action-email" id="btnShareEmail">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                                    <polyline points="22,6 12,13 2,6"/>
                                                </svg>
                                                <span>Send via Email</span>
                                            </a>
                                            <button type="button" class="btn-action-home" id="btnEditQuote">
                                                <span>Modify Selections</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        return modalOverlay;
    }

    // Modal Visibility Controls
    function openQuoteModal() {
        const modal = ensureModalExists();
        initModalEventsOnce();
        updateUI();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeQuoteModal() {
        const modal = document.getElementById('swayamvaraQuoteModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Expose global methods
    window.openSwayamvaraQuoteBuilder = openQuoteModal;
    window.closeSwayamvaraQuoteBuilder = closeQuoteModal;

    // 4. Render Accordions
    function renderAccordions() {
        const accordionContainer = document.getElementById('ceremoniesAccordion');
        if (!accordionContainer) return;

        let html = '';
        Object.entries(QUOTE_DATA.ceremonies).forEach(([cKey, ceremony], index) => {
            const isFirst = index === 0;
            html += `
                <div class="ceremony-accordion-item ${isFirst ? 'open' : ''}" data-ceremony="${cKey}">
                    <button type="button" class="ceremony-header-trigger" aria-expanded="${isFirst ? 'true' : 'false'}">
                        <div class="ceremony-header-left">
                            <div class="ceremony-thumb-wrap">
                                <img src="${ceremony.img}" alt="${ceremony.name}" loading="lazy">
                            </div>
                            <div class="ceremony-title-info">
                                <div class="ceremony-title-row">
                                    <span class="ceremony-title">${ceremony.name}</span>
                                    <span class="ceremony-selected-count" id="count_${cKey}">0 Selected</span>
                                </div>
                                <span class="ceremony-subtitle">${ceremony.desc}</span>
                            </div>
                        </div>
                        <div class="ceremony-header-right">
                            <div class="ceremony-expand-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                        </div>
                    </button>
                    <div class="ceremony-accordion-body">
                        <div class="ceremony-body-inner">
                            <div class="ceremony-services-grid">
                                ${ceremony.services.map(srv => `
                                    <div class="service-card" data-ceremony="${cKey}" data-service="${srv.id}">
                                        <div class="service-card-left">
                                            <img src="${srv.thumb}" alt="${srv.name}" class="service-thumb" loading="lazy">
                                            <div class="service-details">
                                                <span class="service-name">${srv.name}</span>
                                                <span class="service-price">${formatINR(srv.price)}</span>
                                            </div>
                                        </div>
                                        <button type="button" class="service-toggle-btn" aria-label="Add ${srv.name}">
                                            <span class="toggle-icon">+</span>
                                            <span class="toggle-text">Add</span>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        accordionContainer.innerHTML = html;
    }

    // Modal Events Binding
    let eventsBound = false;
    function initModalEventsOnce() {
        if (eventsBound) return;
        eventsBound = true;

        renderAccordions();

        // Close modal buttons
        const closeBtn = document.getElementById('closeQuoteModalBtn');
        const modal = document.getElementById('swayamvaraQuoteModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeQuoteModal);
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeQuoteModal();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeQuoteModal();
        });

        // Step progress navigation clicks
        document.querySelectorAll('.progress-step-item').forEach(item => {
            item.addEventListener('click', () => {
                const step = parseInt(item.getAttribute('data-step'), 10);
                if (step) goToStep(step);
            });
        });

        // Style Card selection
        document.querySelectorAll('.style-card').forEach(card => {
            card.addEventListener('click', () => {
                const style = card.getAttribute('data-style');
                if (style) {
                    state.selectedStyle = style;
                    document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    updateUI();
                }
            });
        });

        // Accordion & Service toggle
        const accordionContainer = document.getElementById('ceremoniesAccordion');
        if (accordionContainer) {
            accordionContainer.addEventListener('click', (e) => {
                const headerTrigger = e.target.closest('.ceremony-header-trigger');
                if (headerTrigger) {
                    const item = headerTrigger.closest('.ceremony-accordion-item');
                    const isOpen = item.classList.contains('open');
                    item.classList.toggle('open', !isOpen);
                    headerTrigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
                    return;
                }

                const toggleBtn = e.target.closest('.service-toggle-btn');
                const card = e.target.closest('.service-card');
                if (toggleBtn || card) {
                    const targetCard = card || toggleBtn.closest('.service-card');
                    const cKey = targetCard.getAttribute('data-ceremony');
                    const sId = targetCard.getAttribute('data-service');
                    toggleService(cKey, sId);
                }
            });
        }

        // Add-ons selection
        document.querySelectorAll('.addon-card').forEach(card => {
            const btn = card.querySelector('.addon-toggle-btn');
            const handler = () => {
                const addonKey = card.getAttribute('data-addon');
                toggleAddon(addonKey);
            };
            if (btn) btn.addEventListener('click', handler);
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.addon-toggle-btn')) handler();
            });
        });

        // Continue and Back buttons in Summary
        const btnContinue = document.getElementById('btnContinueStep');
        const btnBack = document.getElementById('btnBackStep');
        if (btnContinue) btnContinue.addEventListener('click', handleNextStep);
        if (btnBack) btnBack.addEventListener('click', handlePrevStep);

        // Customer details form submit
        const quoteForm = document.getElementById('quoteCustomerForm');
        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm()) submitQuote();
            });
        }

        // Real-time input validation clear
        const inputs = ['customerName', 'customerEmail', 'customerPhone', 'customerVenue', 'customerDate'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    const err = document.getElementById(id + 'Error');
                    if (err) err.classList.remove('visible');
                });
            }
        });

        // Confirmation Actions
        const btnPrintPdf = document.getElementById('btnPrintPdf');
        const btnShareWhatsapp = document.getElementById('btnShareWhatsapp');
        const btnShareEmail = document.getElementById('btnShareEmail');
        const btnEditQuote = document.getElementById('btnEditQuote');

        if (btnPrintPdf) btnPrintPdf.addEventListener('click', () => window.print());
        if (btnShareWhatsapp) btnShareWhatsapp.addEventListener('click', shareViaWhatsApp);
        if (btnShareEmail) btnShareEmail.addEventListener('click', shareViaEmail);
        if (btnEditQuote) btnEditQuote.addEventListener('click', () => goToStep(2));

        // Minimum date setting
        const dateInput = document.getElementById('customerDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        restoreStateFromStorage();
    }

    // Toggle Service selection
    function toggleService(cKey, sId) {
        const ceremony = QUOTE_DATA.ceremonies[cKey];
        if (!ceremony) return;
        const srv = ceremony.services.find(s => s.id === sId);
        if (!srv) return;

        const key = `${cKey}__${sId}`;
        if (state.selectedServices.has(key)) {
            state.selectedServices.delete(key);
        } else {
            state.selectedServices.set(key, {
                ceremonyKey: cKey,
                serviceId: sId,
                name: srv.name,
                price: srv.price,
                ceremonyName: ceremony.name
            });
        }

        saveStateToStorage();
        updateUI();
    }

    // Toggle Add-on selection
    function toggleAddon(addonKey) {
        if (!QUOTE_DATA.addons[addonKey]) return;
        if (state.selectedAddons.has(addonKey)) {
            state.selectedAddons.delete(addonKey);
        } else {
            state.selectedAddons.add(addonKey);
        }
        saveStateToStorage();
        updateUI();
    }

    function calculateTotal() {
        let total = 0;
        state.selectedServices.forEach(srv => { total += srv.price; });
        state.selectedAddons.forEach(aKey => {
            if (QUOTE_DATA.addons[aKey]) total += QUOTE_DATA.addons[aKey].price;
        });
        return total;
    }

    function goToStep(stepNum) {
        if (stepNum < 1 || stepNum > 5) return;
        if (stepNum === 5 && !validateForm()) return;

        state.currentStep = stepNum;

        document.querySelectorAll('.progress-step-item').forEach(item => {
            const s = parseInt(item.getAttribute('data-step'), 10);
            item.classList.remove('active', 'completed');
            if (s === stepNum) item.classList.add('active');
            else if (s < stepNum) item.classList.add('completed');
        });

        document.querySelectorAll('.builder-step-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        const currentPane = document.getElementById(`stepPane${stepNum}`);
        if (currentPane) currentPane.classList.add('active');

        const confirmationPane = document.getElementById('stepPane5');
        const builderGrid = document.querySelector('.builder-workspace-grid');
        const progressNav = document.getElementById('builderProgressNav');

        if (stepNum === 5) {
            if (builderGrid) builderGrid.style.display = 'none';
            if (progressNav) progressNav.style.display = 'none';
            if (confirmationPane) confirmationPane.classList.add('active');
            renderConfirmationScreen();
        } else {
            if (builderGrid) builderGrid.style.display = 'grid';
            if (progressNav) progressNav.style.display = 'grid';
            if (confirmationPane) confirmationPane.classList.remove('active');
        }

        const btnContinue = document.getElementById('btnContinueStep');
        const btnBack = document.getElementById('btnBackStep');

        if (btnBack) btnBack.style.display = stepNum > 1 ? 'block' : 'none';

        if (btnContinue) {
            if (stepNum === 1) btnContinue.innerHTML = 'Continue to Celebrations &rarr;';
            else if (stepNum === 2) btnContinue.innerHTML = 'Continue to Add-ons &rarr;';
            else if (stepNum === 3) btnContinue.innerHTML = 'Continue to Details &rarr;';
            else if (stepNum === 4) btnContinue.innerHTML = 'Submit &amp; View Quote &rarr;';
        }

        const modalDialog = document.querySelector('.quote-modal-dialog');
        if (modalDialog) modalDialog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleNextStep() {
        if (state.currentStep === 4) {
            if (validateForm()) submitQuote();
        } else {
            goToStep(state.currentStep + 1);
        }
    }

    function handlePrevStep() {
        if (state.currentStep > 1) goToStep(state.currentStep - 1);
    }

    function validateForm() {
        let valid = true;
        const name = document.getElementById('customerName');
        const email = document.getElementById('customerEmail');
        const phone = document.getElementById('customerPhone');
        const venue = document.getElementById('customerVenue');
        const date = document.getElementById('customerDate');
        const notes = document.getElementById('customerNotes');

        const showError = (input, msgId) => {
            input.classList.add('error');
            const err = document.getElementById(msgId);
            if (err) err.classList.add('visible');
            valid = false;
        };

        if (!name || !name.value.trim()) showError(name, 'customerNameError');
        if (!email || !email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) showError(email, 'customerEmailError');
        if (!phone || !phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) showError(phone, 'customerPhoneError');
        if (!venue || !venue.value.trim()) showError(venue, 'customerVenueError');
        if (!date || !date.value.trim()) showError(date, 'customerDateError');

        if (valid) {
            state.customerDetails = {
                fullName: name.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                venue: venue.value.trim(),
                weddingDate: date.value.trim(),
                notes: notes ? notes.value.trim() : ''
            };
            saveStateToStorage();
        }
        return valid;
    }

    function submitQuote() {
        try {
            const pastQuotes = JSON.parse(localStorage.getItem('swayamvara_saved_quotes') || '[]');
            pastQuotes.unshift({
                id: state.quoteId,
                date: new Date().toISOString(),
                style: state.selectedStyle,
                services: Array.from(state.selectedServices.values()),
                addons: Array.from(state.selectedAddons),
                details: state.customerDetails,
                total: calculateTotal()
            });
            localStorage.setItem('swayamvara_saved_quotes', JSON.stringify(pastQuotes.slice(0, 10)));
        } catch (e) {
            console.error('Quote storage error', e);
        }
        goToStep(5);
    }

    function updateUI() {
        document.querySelectorAll('.style-card').forEach(card => {
            const s = card.getAttribute('data-style');
            card.classList.toggle('selected', s === state.selectedStyle);
        });

        document.querySelectorAll('.service-card').forEach(card => {
            const cKey = card.getAttribute('data-ceremony');
            const sId = card.getAttribute('data-service');
            const isSelected = state.selectedServices.has(`${cKey}__${sId}`);
            card.classList.toggle('selected', isSelected);
            const btn = card.querySelector('.service-toggle-btn');
            if (btn) {
                btn.innerHTML = isSelected 
                    ? `<span class="toggle-icon">✓</span> <span class="toggle-text">Added</span>` 
                    : `<span class="toggle-icon">+</span> <span class="toggle-text">Add</span>`;
            }
        });

        Object.keys(QUOTE_DATA.ceremonies).forEach(cKey => {
            let count = 0;
            state.selectedServices.forEach(s => {
                if (s.ceremonyKey === cKey) count++;
            });
            const badge = document.getElementById(`count_${cKey}`);
            if (badge) {
                if (count > 0) {
                    badge.textContent = `${count} Selected`;
                    badge.classList.add('visible');
                } else {
                    badge.classList.remove('visible');
                }
            }
        });

        document.querySelectorAll('.addon-card').forEach(card => {
            const aKey = card.getAttribute('data-addon');
            const isSelected = state.selectedAddons.has(aKey);
            card.classList.toggle('selected', isSelected);
            const btn = card.querySelector('.addon-toggle-btn');
            if (btn) btn.textContent = isSelected ? '✓ Selected' : '+ Add Experience';
        });

        renderSummary();
    }

    function renderSummary() {
        const total = calculateTotal();
        const totalFormatted = formatINR(total);
        const totalServiceCount = state.selectedServices.size + state.selectedAddons.size;

        const grandTotalElem = document.getElementById('summaryGrandTotal');
        const summaryBadge = document.getElementById('summaryItemBadge');

        if (grandTotalElem) grandTotalElem.textContent = totalFormatted;
        if (summaryBadge) summaryBadge.textContent = `${totalServiceCount} Items`;

        const styleName = QUOTE_DATA.styles[state.selectedStyle]?.name || 'Candid Photography';
        const styleValElem = document.getElementById('summarySelectedStyle');
        if (styleValElem) styleValElem.textContent = styleName;

        const itemsListElem = document.getElementById('summaryItemsList');
        if (!itemsListElem) return;

        if (totalServiceCount === 0) {
            itemsListElem.innerHTML = `
                <div class="summary-empty-state">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <p>No services selected yet.<br>Choose your ceremonies and coverage options to build your quote.</p>
                </div>
            `;
            return;
        }

        const grouped = {};
        state.selectedServices.forEach(s => {
            if (!grouped[s.ceremonyName]) grouped[s.ceremonyName] = [];
            grouped[s.ceremonyName].push(s);
        });

        let listHtml = '';
        Object.entries(grouped).forEach(([ceremonyName, sList]) => {
            listHtml += `
                <div class="summary-ceremony-group">
                    <div class="summary-ceremony-title"><span>${ceremonyName}</span></div>
                    ${sList.map(item => `
                        <div class="summary-service-row">
                            <span>&bull; ${item.name}</span>
                            <div>
                                <span class="summary-service-price">${formatINR(item.price)}</span>
                                <button type="button" class="remove-item-btn" data-key="${item.ceremonyKey}__${item.serviceId}" title="Remove">&times;</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        });

        if (state.selectedAddons.size > 0) {
            listHtml += `
                <div class="summary-ceremony-group">
                    <div class="summary-ceremony-title"><span>Optional Experiences</span></div>
                    ${Array.from(state.selectedAddons).map(aKey => {
                        const addon = QUOTE_DATA.addons[aKey];
                        if (!addon) return '';
                        return `
                            <div class="summary-service-row">
                                <span>&bull; ${addon.name}</span>
                                <div>
                                    <span class="summary-service-price">${formatINR(addon.price)}</span>
                                    <button type="button" class="remove-addon-btn" data-key="${aKey}" title="Remove">&times;</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        itemsListElem.innerHTML = listHtml;

        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.getAttribute('data-key');
                if (key) {
                    const [cKey, sId] = key.split('__');
                    toggleService(cKey, sId);
                }
            });
        });

        document.querySelectorAll('.remove-addon-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.getAttribute('data-key');
                if (key) toggleAddon(key);
            });
        });
    }

    function renderConfirmationScreen() {
        const total = calculateTotal();
        const details = state.customerDetails;

        const refElem = document.getElementById('confirmQuoteRef');
        if (refElem) refElem.textContent = `REFERENCE: ${state.quoteId}`;

        const nameElem = document.getElementById('confirmClientName');
        const phoneElem = document.getElementById('confirmClientPhone');
        const emailElem = document.getElementById('confirmClientEmail');
        const venueElem = document.getElementById('confirmClientVenue');
        const dateElem = document.getElementById('confirmClientDate');
        const styleElem = document.getElementById('confirmClientStyle');

        if (nameElem) nameElem.textContent = details.fullName || 'Valued Couple';
        if (phoneElem) phoneElem.textContent = details.phone || '—';
        if (emailElem) emailElem.textContent = details.email || '—';
        if (venueElem) venueElem.textContent = details.venue || 'Hyderabad';
        if (dateElem) dateElem.textContent = details.weddingDate || 'Upcoming Celebration';
        if (styleElem) styleElem.textContent = QUOTE_DATA.styles[state.selectedStyle]?.name || 'Candid Photography';

        const tableBody = document.getElementById('confirmTableBody');
        if (tableBody) {
            let rowsHtml = '';
            let itemIndex = 1;

            state.selectedServices.forEach(s => {
                rowsHtml += `
                    <tr>
                        <td style="font-weight: 600; width: 40px; color: var(--quote-gold-dark);">${itemIndex++}.</td>
                        <td><strong>${s.ceremonyName}</strong> &mdash; ${s.name}</td>
                        <td>${formatINR(s.price)}</td>
                    </tr>
                `;
            });

            state.selectedAddons.forEach(aKey => {
                const addon = QUOTE_DATA.addons[aKey];
                if (addon) {
                    rowsHtml += `
                        <tr>
                            <td style="font-weight: 600; width: 40px; color: var(--quote-gold-dark);">${itemIndex++}.</td>
                            <td><strong>Experience</strong> &mdash; ${addon.name} <span style="font-size: 0.8rem; opacity: 0.75;">(8h session)</span></td>
                            <td>${formatINR(addon.price)}</td>
                        </tr>
                    `;
                }
            });

            if (rowsHtml === '') {
                rowsHtml = `<tr><td colspan="3" style="text-align: center; padding: 20px; color: #888;">No services selected.</td></tr>`;
            }

            tableBody.innerHTML = rowsHtml;
        }

        const totalElem = document.getElementById('confirmGrandTotal');
        if (totalElem) totalElem.textContent = formatINR(total);
    }

    function shareViaWhatsApp() {
        const total = calculateTotal();
        const details = state.customerDetails;
        const style = QUOTE_DATA.styles[state.selectedStyle]?.name || 'Candid Photography';

        let msg = `*SWAYAMVARA WEDDING PHOTOGRAPHY QUOTATION*\n`;
        msg += `Reference ID: ${state.quoteId}\n`;
        msg += `------------------------------------\n`;
        msg += `*Couple:* ${details.fullName}\n`;
        msg += `*Date:* ${details.weddingDate}\n`;
        msg += `*Venue:* ${details.venue}\n`;
        msg += `*Selected Style:* ${style}\n\n`;
        msg += `*SELECTED CEREMONIES & SERVICES:*\n`;

        state.selectedServices.forEach(s => {
            msg += `• ${s.ceremonyName} &mdash; ${s.name}: ${formatINR(s.price)}\n`;
        });

        if (state.selectedAddons.size > 0) {
            msg += `\n*OPTIONAL EXPERIENCES:*\n`;
            state.selectedAddons.forEach(aKey => {
                const addon = QUOTE_DATA.addons[aKey];
                if (addon) msg += `• ${addon.name}: ${formatINR(addon.price)}\n`;
            });
        }

        msg += `------------------------------------\n`;
        msg += `*ESTIMATED GRAND TOTAL: ${formatINR(total)}*\n`;
        msg += `------------------------------------\n`;
        msg += `Hi Swayamvara Team! I have customized my wedding photography quotation on your website. Please check my details and confirm availability.`;

        window.open(`https://wa.me/917989304874?text=${encodeURIComponent(msg)}`, '_blank');
    }

    function shareViaEmail() {
        const total = calculateTotal();
        const details = state.customerDetails;
        const style = QUOTE_DATA.styles[state.selectedStyle]?.name || 'Candid Photography';

        const subject = encodeURIComponent(`Wedding Photography Quotation Request - ${details.fullName} (${state.quoteId})`);
        let body = `Hello Swayamvara Weddings Team,\n\nI have configured our wedding photography quotation with the following details:\n\n`;
        body += `Quote Reference: ${state.quoteId}\nName: ${details.fullName}\nPhone: ${details.phone}\nEmail: ${details.email}\nEvent Venue: ${details.venue}\nWedding Date: ${details.weddingDate}\nPhotography Style: ${style}\n\nItemized Services:\n`;

        state.selectedServices.forEach(s => {
            body += `- ${s.ceremonyName}: ${s.name} (${formatINR(s.price)})\n`;
        });

        if (state.selectedAddons.size > 0) {
            body += `\nOptional Experiences:\n`;
            state.selectedAddons.forEach(aKey => {
                const addon = QUOTE_DATA.addons[aKey];
                if (addon) body += `- ${addon.name} (${formatINR(addon.price)})\n`;
            });
        }

        body += `\nEstimated Grand Total: ${formatINR(total)}\n\nSpecial Notes:\n${details.notes || 'None'}\n\nThank you,\n${details.fullName}`;
        window.location.href = `mailto:swayamvaraphotos@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
    }

    function saveStateToStorage() {
        try {
            const data = {
                selectedStyle: state.selectedStyle,
                selectedServices: Array.from(state.selectedServices.entries()),
                selectedAddons: Array.from(state.selectedAddons),
                customerDetails: state.customerDetails,
                quoteId: state.quoteId
            };
            localStorage.setItem('swayamvara_current_quote_builder', JSON.stringify(data));
        } catch (e) {}
    }

    function restoreStateFromStorage() {
        try {
            const saved = localStorage.getItem('swayamvara_current_quote_builder');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.selectedStyle) state.selectedStyle = parsed.selectedStyle;
                if (Array.isArray(parsed.selectedServices)) state.selectedServices = new Map(parsed.selectedServices);
                if (Array.isArray(parsed.selectedAddons)) state.selectedAddons = new Set(parsed.selectedAddons);
                if (parsed.customerDetails) {
                    state.customerDetails = parsed.customerDetails;
                    const fields = {
                        customerName: parsed.customerDetails.fullName,
                        customerEmail: parsed.customerDetails.email,
                        customerPhone: parsed.customerDetails.phone,
                        customerVenue: parsed.customerDetails.venue,
                        customerDate: parsed.customerDetails.weddingDate,
                        customerNotes: parsed.customerDetails.notes
                    };
                    Object.entries(fields).forEach(([id, val]) => {
                        const el = document.getElementById(id);
                        if (el && val) el.value = val;
                    });
                }
            }
        } catch (e) {}
    }

    // 5. Global Link Binding: Attach to ALL "Build Your Quote" buttons across any page
    function bindAllQuoteButtons() {
        const triggers = document.querySelectorAll('a, button, [role="button"]');
        triggers.forEach(el => {
            const text = (el.textContent || '').trim().toLowerCase();
            const href = el.getAttribute('href') || '';
            const isQuoteBtn = text.includes('build your quote') || 
                               text.includes('build my quote') || 
                               href.includes('#build-quote') || 
                               href.includes('#quote-builder') ||
                               href === 'quote.html' ||
                               el.classList.contains('open-quote-modal-btn');

            if (isQuoteBtn && !el.classList.contains('quote-modal-close-btn') && !el.classList.contains('remove-item-btn')) {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    openQuoteModal();
                });
            }
        });
    }

    // Initialize on page load
    function init() {
        bindAllQuoteButtons();
        // If loaded with #build-quote or #quote-builder hash in URL
        if (window.location.hash === '#build-quote' || window.location.hash === '#quote-builder') {
            openQuoteModal();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
