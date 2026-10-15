/**
 * Swayamvara Wedding Photography — Minimalist Quotation Builder
 * Clean, visually appealing, step-by-step interactive configurator
 */

(function () {
    'use strict';

    // 1. Reference Ceremonies and Services Data with camera thumbnails
    const QUOTE_DATA = {
        styles: {
            candid: {
                name: 'Candid Photography',
                desc: 'Natural emotions, unscripted laughter & heartfelt moments.',
                img: 'Candid Camera.webp'
            },
            traditional: {
                name: 'Traditional Photography',
                desc: 'Classic portraits, family pictures & sacred cultural rituals.',
                img: 'Traditional camera.jpg'
            }
        },
        ceremonies: {
            engagement: {
                name: 'Engagement',
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
                img: '634520398_18094154743967204_5441340631586413793_n.jpg',
                services: [
                    { id: 'trad_photo', name: 'Traditional Photo', price: 8000, thumb: 'Traditional camera.jpg' },
                    { id: 'trad_video', name: 'Traditional Video', price: 8000, thumb: 'Traditional Video.webp' }
                ]
            },
            sangeeth: {
                name: 'Sangeeth',
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
                name: 'LED Wall Display',
                desc: 'P3 indoor LED screen for live ceremony feed & highlights.',
                price: 15000,
                img: 'LED wall.webp',
                note: '8 hours per session'
            },
            live_streaming: {
                name: 'Live Streaming',
                desc: 'Multi-camera HD YouTube/web stream for overseas family.',
                price: 8000,
                img: 'live Stream.avif',
                note: '8 hours per session'
            }
        }
    };

    // 2. Application State — allows selecting Candid, Traditional, or BOTH
    const state = {
        currentStep: 1,
        selectedStyles: new Set(['candid', 'traditional']), // Both selectable!
        selectedServices: new Map(),
        selectedAddons: new Set(),
        customerDetails: {
            fullName: '',
            phone: '',
            email: '',
            venue: '',
            weddingDate: '',
            notes: ''
        },
        quoteId: 'SW-' + Math.floor(100000 + Math.random() * 900000)
    };

    function formatINR(num) {
        return '₹' + (Number(num) || 0).toLocaleString('en-IN');
    }

    function getSelectedStyleLabel() {
        const hasCandid = state.selectedStyles.has('candid');
        const hasTrad = state.selectedStyles.has('traditional');
        if (hasCandid && hasTrad) return 'Both Candid & Traditional Photography';
        if (hasCandid) return 'Candid Photography';
        if (hasTrad) return 'Traditional Photography';
        return 'Photography Coverage';
    }

    // 3. Inject Clean Minimalist Modal
    function ensureModalExists() {
        let modalOverlay = document.getElementById('swayamvaraQuoteModal');
        if (modalOverlay) return modalOverlay;

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'quote-modal-overlay';
        modalOverlay.id = 'swayamvaraQuoteModal';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-label', 'Swayamvara Wedding Quotation Builder');

        modalOverlay.innerHTML = `
            <div class="quote-modal-dialog">
                <!-- Clean Header -->
                <div class="q-modal-header">
                    <div class="q-brand">
                        <span class="q-brand-name">Swayamvara</span>
                        <span class="q-brand-badge">&bull; Wedding Quotation</span>
                    </div>
                    <button type="button" class="q-close-btn" id="qCloseBtn" aria-label="Close">&times;</button>
                </div>

                <!-- Minimal Stepper -->
                <div class="q-stepper" id="qStepper">
                    <button type="button" class="q-step-tab active" data-step="1">
                        <span class="q-step-num">1</span>
                        <span class="q-step-title">Style</span>
                    </button>
                    <span class="q-step-sep">&rsaquo;</span>
                    <button type="button" class="q-step-tab" data-step="2">
                        <span class="q-step-num">2</span>
                        <span class="q-step-title">Ceremonies</span>
                    </button>
                    <span class="q-step-sep">&rsaquo;</span>
                    <button type="button" class="q-step-tab" data-step="3">
                        <span class="q-step-num">3</span>
                        <span class="q-step-title">Add-ons</span>
                    </button>
                    <span class="q-step-sep">&rsaquo;</span>
                    <button type="button" class="q-step-tab" data-step="4">
                        <span class="q-step-num">4</span>
                        <span class="q-step-title">Details</span>
                    </button>
                </div>

                <!-- Scrollable Body -->
                <div class="q-body">
                    <!-- Step 1: Style Selection (Both Selectable) -->
                    <div class="q-pane active" id="qPane1">
                        <div class="q-title-wrap">
                            <h2 class="q-title">Choose Your Photography Style</h2>
                            <p class="q-sub">Select one or both styles. Most couples choose both for complete coverage.</p>
                        </div>
                        <div class="q-style-grid">
                            <div class="q-style-card selected" data-style="candid">
                                <img src="${QUOTE_DATA.styles.candid.img}" alt="Candid Photography" class="q-style-img">
                                <div class="q-style-meta">
                                    <h3 class="q-style-name">Candid Photography</h3>
                                    <p class="q-style-desc">${QUOTE_DATA.styles.candid.desc}</p>
                                    <span class="q-style-pill">✓ Selected</span>
                                </div>
                            </div>
                            <div class="q-style-card selected" data-style="traditional">
                                <img src="${QUOTE_DATA.styles.traditional.img}" alt="Traditional Photography" class="q-style-img">
                                <div class="q-style-meta">
                                    <h3 class="q-style-name">Traditional Photography</h3>
                                    <p class="q-style-desc">${QUOTE_DATA.styles.traditional.desc}</p>
                                    <span class="q-style-pill">✓ Selected</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Ceremonies & Services with Camera Images -->
                    <div class="q-pane" id="qPane2">
                        <div class="q-title-wrap">
                            <h2 class="q-title">Select Your Ceremonies</h2>
                            <p class="q-sub">Tap on any event to add photography or videography coverage.</p>
                        </div>
                        <div class="q-ceremonies-list" id="qCeremoniesList">
                            <!-- Populated dynamically via renderCeremonies() -->
                        </div>
                    </div>

                    <!-- Step 3: Add-ons -->
                    <div class="q-pane" id="qPane3">
                        <div class="q-title-wrap">
                            <h2 class="q-title">Optional Experiences</h2>
                            <p class="q-sub">Add stage displays or worldwide broadcasting for your celebration.</p>
                        </div>
                        <div class="q-addons-grid">
                            <div class="q-addon-card" data-addon="led_wall">
                                <img src="LED wall.webp" alt="LED Wall" class="q-addon-img">
                                <div class="q-addon-meta">
                                    <div class="q-addon-left">
                                        <span class="q-addon-title">LED Wall Display</span>
                                        <span class="q-addon-price">&#8377;15,000</span>
                                        <span class="q-addon-note">8 hours session</span>
                                    </div>
                                    <button type="button" class="q-addon-toggle">+ Add</button>
                                </div>
                            </div>
                            <div class="q-addon-card" data-addon="live_streaming">
                                <img src="live Stream.avif" alt="Live Streaming" class="q-addon-img">
                                <div class="q-addon-meta">
                                    <div class="q-addon-left">
                                        <span class="q-addon-title">Live Streaming</span>
                                        <span class="q-addon-price">&#8377;8,000</span>
                                        <span class="q-addon-note">8 hours session</span>
                                    </div>
                                    <button type="button" class="q-addon-toggle">+ Add</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Details Form -->
                    <div class="q-pane" id="qPane4">
                        <div class="q-title-wrap">
                            <h2 class="q-title">Where &amp; When Is Your Wedding?</h2>
                            <p class="q-sub">Share a few details so we can check availability and generate your quote.</p>
                        </div>
                        <div class="q-form-wrap">
                            <form id="qForm" novalidate>
                                <div class="q-form-grid">
                                    <div>
                                        <label class="q-label" for="qName">Full Name *</label>
                                        <input type="text" id="qName" class="q-input" placeholder="e.g. Sravanthi &amp; Karthik" required>
                                        <span class="q-field-err" id="qNameErr">Please enter your name</span>
                                    </div>
                                    <div>
                                        <label class="q-label" for="qPhone">WhatsApp Number *</label>
                                        <input type="tel" id="qPhone" class="q-input" placeholder="+91 98765 43210" required>
                                        <span class="q-field-err" id="qPhoneErr">Valid 10-digit number required</span>
                                    </div>
                                    <div>
                                        <label class="q-label" for="qEmail">Email Address *</label>
                                        <input type="email" id="qEmail" class="q-input" placeholder="e.g. name@gmail.com" required>
                                        <span class="q-field-err" id="qEmailErr">Valid email required</span>
                                    </div>
                                    <div>
                                        <label class="q-label" for="qDate">Wedding Date *</label>
                                        <input type="date" id="qDate" class="q-input" required>
                                        <span class="q-field-err" id="qDateErr">Please select a date</span>
                                    </div>
                                    <div class="q-field-full">
                                        <label class="q-label" for="qVenue">Venue / City *</label>
                                        <input type="text" id="qVenue" class="q-input" placeholder="e.g. N Convention, Madhapur, Hyderabad" required>
                                        <span class="q-field-err" id="qVenueErr">Please enter venue or city</span>
                                    </div>
                                    <div class="q-field-full">
                                        <label class="q-label" for="qNotes">Special Requests / Timings (Optional)</label>
                                        <input type="text" id="qNotes" class="q-input" placeholder="Any specific rituals or timings...">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Step 5: Official Branded Quotation Document -->
                    <div class="q-pane" id="qPane5">
                        <div class="q-quotation-doc" id="qPrintableDocument">
                            <!-- Branded Header -->
                            <div class="q-doc-header">
                                <div class="q-doc-brand">
                                    <div class="q-doc-crest">✦ &nbsp; ✦ &nbsp; ✦</div>
                                    <h1 class="q-doc-logo-title">SWAYAMVARA</h1>
                                    <div class="q-doc-logo-sub">LUXURY WEDDING PHOTOGRAPHY &bull; CINEMATOGRAPHY</div>
                                    <div class="q-doc-contact">
                                        <span>Jubilee Hills, Hyderabad &bull; Vijayawada &bull; Destination Weddings</span>
                                        <span>+91 79893 04874 &bull; hello@swayamvara.in &bull; swayamvara.in</span>
                                    </div>
                                </div>
                                <div class="q-doc-meta">
                                    <span class="q-doc-type-pill">OFFICIAL WEDDING QUOTATION</span>
                                    <div class="q-doc-ref" id="qDocRef">REF: SW-000000</div>
                                    <div class="q-doc-meta-item">Date of Issue: <strong id="qDocDate">—</strong></div>
                                    <div class="q-doc-meta-item">Price Validity: <strong>15 Days</strong></div>
                                </div>
                            </div>

                            <!-- Client & Celebration Details -->
                            <div class="q-doc-client-card">
                                <div class="q-doc-card-title">PREPARED EXCLUSIVELY FOR</div>
                                <div class="q-doc-client-grid">
                                    <div><span class="q-doc-lbl">Honored Couple:</span> <strong id="qDocName">—</strong></div>
                                    <div><span class="q-doc-lbl">Wedding Date:</span> <strong id="qDocDateVal">—</strong></div>
                                    <div><span class="q-doc-lbl">Ceremony Venue:</span> <strong id="qDocVenue">—</strong></div>
                                    <div><span class="q-doc-lbl">Contact / WhatsApp:</span> <strong id="qDocPhone">—</strong></div>
                                    <div class="q-doc-full-col"><span class="q-doc-lbl">Photography Direction:</span> <strong id="qDocStyle">Candid &amp; Traditional Photography</strong></div>
                                </div>
                            </div>

                            <!-- Scope of Coverage Table -->
                            <div class="q-doc-table-wrap">
                                <table class="q-doc-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 44px; text-align: center;">#</th>
                                            <th style="width: 28%;">Event / Ceremony</th>
                                            <th>Scope of Service &amp; Inclusions</th>
                                            <th style="text-align: right; width: 22%;">Investment</th>
                                        </tr>
                                    </thead>
                                    <tbody id="qDocTableBody">
                                        <!-- Dynamically generated rows -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Investment Summary Box -->
                            <div class="q-doc-total-box">
                                <div class="q-doc-total-left">
                                    <div class="q-doc-privilege-badge">✓ DIGITAL MASTER GALLERY &amp; COLOR GRADING INCLUDED</div>
                                    <p class="q-doc-total-note">All figures in Indian Rupees (INR). Valid across all chosen wedding locations.</p>
                                </div>
                                <div class="q-doc-total-right">
                                    <div class="q-doc-total-lbl">ESTIMATED TOTAL INVESTMENT</div>
                                    <div class="q-doc-total-val" id="qDocGrandTotal">&#8377;0</div>
                                </div>
                            </div>

                            <!-- Deliverables & Payment Milestones -->
                            <div class="q-doc-terms-grid">
                                <div class="q-doc-terms-box">
                                    <div class="q-doc-box-title">STANDARD DELIVERABLES</div>
                                    <ul class="q-doc-list">
                                        <li>Master Color-Graded High-Resolution Photographs</li>
                                        <li>4K Ultra-HD Cinematic Wedding Highlights &amp; Full Film</li>
                                        <li>Private Online Cloud Gallery with 1-Year Access</li>
                                        <li>High-Speed Digital Master Drive Delivery</li>
                                    </ul>
                                </div>
                                <div class="q-doc-terms-box">
                                    <div class="q-doc-box-title">PAYMENT MILESTONES</div>
                                    <ul class="q-doc-list">
                                        <li><strong>25% Advance:</strong> Upon booking to lock the dates</li>
                                        <li><strong>50% Milestone:</strong> 7 days prior to wedding events</li>
                                        <li><strong>25% Settlement:</strong> Upon delivery of final films &amp; gallery</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Authorized Sign-off -->
                            <div class="q-doc-sign-wrap">
                                <div class="q-doc-seal">
                                    <div class="q-doc-seal-badge">SWAYAMVARA</div>
                                    <span>Creative Visual Studio &bull; Hyderabad</span>
                                </div>
                                <div class="q-doc-sign-block">
                                    <div class="q-doc-sign-line"></div>
                                    <strong>Authorized Signature</strong>
                                    <span>Swayamvara Wedding Photography</span>
                                </div>
                            </div>
                        </div>

                        <!-- On-screen Action Controls (Hidden in PDF/Print) -->
                        <div class="q-receipt-actions">
                            <button type="button" class="q-btn-pdf" id="qPrintBtn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Download / Print Branded Quotation (PDF)
                            </button>
                            <a href="#" class="q-btn-wa" id="qWaBtn" target="_blank" rel="noopener">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.554 1.769.82 2.796.82 3.183 0 5.769-2.587 5.77-5.768.001-3.181-2.585-5.768-5.77-5.768zm3.385 8.167c-.145.407-.743.766-1.042.812-.299.046-.689.071-2.023-.466-1.606-.646-2.639-2.274-2.719-2.381-.08-.107-.643-.855-.643-1.631 0-.776.407-1.159.551-1.317.144-.158.315-.198.421-.198.106 0 .212.001.305.006.098.005.23-.037.36.275.132.315.452 1.103.492 1.183.04.08.067.173.013.28-.053.107-.08.173-.16.267-.08.093-.167.208-.239.28-.08.08-.163.167-.07.327.093.16.413.681.886 1.102.609.542 1.123.71 1.283.79.16.08.253.067.347-.04.093-.107.4-466.507-.626.107-.16.213-.133.36-.08.147.053.933.44 1.093.52.16.08.267.12.307.187.04.067.04.387-.105.794z"/></svg>
                                Send on WhatsApp
                            </a>
                            <button type="button" class="q-btn-modify" id="qModifyBtn">Edit Selections</button>
                        </div>
                    </div>
                </div>

                <!-- Floating Bottom Bar -->
                <div class="q-footer-bar" id="qFooterBar">
                    <div class="q-footer-summary">
                        <span class="q-footer-total" id="qFooterTotal">&#8377;0</span>
                        <span class="q-footer-count" id="qFooterCount">0 services selected</span>
                    </div>
                    <div class="q-footer-nav">
                        <button type="button" class="q-btn-back" id="qBackBtn" style="display: none;">&larr; Back</button>
                        <button type="button" class="q-btn-next" id="qNextBtn">Continue to Ceremonies &rarr;</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        return modalOverlay;
    }

    // 4. Render Ceremonies Accordion with Camera Images
    function renderCeremonies() {
        const container = document.getElementById('qCeremoniesList');
        if (!container) return;

        let html = '';
        Object.entries(QUOTE_DATA.ceremonies).forEach(([cKey, ceremony], idx) => {
            const isFirst = idx === 0;
            html += `
                <div class="q-ceremony-card ${isFirst ? 'open' : ''}" data-ceremony="${cKey}">
                    <button type="button" class="q-ceremony-header" aria-expanded="${isFirst ? 'true' : 'false'}">
                        <div class="q-ceremony-left">
                            <img src="${ceremony.img}" alt="${ceremony.name}" class="q-ceremony-thumb" loading="lazy">
                            <div>
                                <span class="q-ceremony-title">${ceremony.name}</span>
                                <span class="q-ceremony-tag" id="qTag_${cKey}" style="display: none;">0 added</span>
                            </div>
                        </div>
                        <div class="q-ceremony-arrow">&darr;</div>
                    </button>
                    <div class="q-services-grid">
                        ${ceremony.services.map(s => `
                            <button type="button" class="q-service-btn" data-ceremony="${cKey}" data-service="${s.id}">
                                <div class="q-service-left">
                                    <img src="${s.thumb}" alt="${s.name}" class="q-service-thumb" loading="lazy">
                                    <div class="q-service-info">
                                        <span class="q-service-title">${s.name}</span>
                                        <span class="q-service-price">${formatINR(s.price)}</span>
                                    </div>
                                </div>
                                <div class="q-service-icon">+</div>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Modal Visibility
    function openModal() {
        const modal = ensureModalExists();
        initModalEventsOnce();
        updateUI();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('swayamvaraQuoteModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    window.openSwayamvaraQuoteBuilder = openModal;
    window.closeSwayamvaraQuoteBuilder = closeModal;

    let eventsInitialized = false;
    function initModalEventsOnce() {
        if (eventsInitialized) return;
        eventsInitialized = true;

        renderCeremonies();

        // Close button
        const closeBtn = document.getElementById('qCloseBtn');
        const modal = document.getElementById('swayamvaraQuoteModal');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Step tabs navigation
        document.querySelectorAll('.q-step-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const s = parseInt(tab.getAttribute('data-step'), 10);
                if (s) goToStep(s);
            });
        });

        // Style selection (Both selectable toggle)
        document.querySelectorAll('.q-style-card').forEach(card => {
            card.addEventListener('click', () => {
                const style = card.getAttribute('data-style');
                if (style) {
                    if (state.selectedStyles.has(style)) {
                        // Keep at least one selected
                        if (state.selectedStyles.size > 1) {
                            state.selectedStyles.delete(style);
                        }
                    } else {
                        state.selectedStyles.add(style);
                    }
                    updateStyleCards();
                    updateUI();
                }
            });
        });

        // Ceremony header toggle & service toggle
        const ceremoniesList = document.getElementById('qCeremoniesList');
        if (ceremoniesList) {
            ceremoniesList.addEventListener('click', (e) => {
                const header = e.target.closest('.q-ceremony-header');
                if (header) {
                    const card = header.closest('.q-ceremony-card');
                    card.classList.toggle('open');
                    header.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
                    return;
                }

                const sBtn = e.target.closest('.q-service-btn');
                if (sBtn) {
                    const cKey = sBtn.getAttribute('data-ceremony');
                    const sId = sBtn.getAttribute('data-service');
                    toggleService(cKey, sId);
                }
            });
        }

        // Addon selection
        document.querySelectorAll('.q-addon-card').forEach(card => {
            card.addEventListener('click', () => {
                const aKey = card.getAttribute('data-addon');
                toggleAddon(aKey);
            });
        });

        // Footer buttons
        const nextBtn = document.getElementById('qNextBtn');
        const backBtn = document.getElementById('qBackBtn');
        if (nextBtn) nextBtn.addEventListener('click', handleNext);
        if (backBtn) backBtn.addEventListener('click', handleBack);

        // Receipt actions
        const printBtn = document.getElementById('qPrintBtn');
        const waBtn = document.getElementById('qWaBtn');
        const modifyBtn = document.getElementById('qModifyBtn');
        if (printBtn) printBtn.addEventListener('click', printQuotation);
        if (waBtn) waBtn.addEventListener('click', shareWhatsApp);
        if (modifyBtn) modifyBtn.addEventListener('click', () => goToStep(2));

        // Form error clearing
        ['qName', 'qPhone', 'qEmail', 'qDate', 'qVenue'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    const err = document.getElementById(id + 'Err');
                    if (err) err.classList.remove('visible');
                });
            }
        });

        // Minimum date setting
        const dateInput = document.getElementById('qDate');
        if (dateInput) {
            dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
        }

        updateStyleCards();
    }

    function updateStyleCards() {
        document.querySelectorAll('.q-style-card').forEach(card => {
            const style = card.getAttribute('data-style');
            const isSel = state.selectedStyles.has(style);
            card.classList.toggle('selected', isSel);
            const pill = card.querySelector('.q-style-pill');
            if (pill) {
                pill.textContent = isSel ? '✓ Selected' : '+ Select Style';
            }
        });
    }

    function toggleService(cKey, sId) {
        const ceremony = QUOTE_DATA.ceremonies[cKey];
        if (!ceremony) return;
        const s = ceremony.services.find(item => item.id === sId);
        if (!s) return;

        const key = `${cKey}__${sId}`;
        if (state.selectedServices.has(key)) {
            state.selectedServices.delete(key);
        } else {
            state.selectedServices.set(key, {
                ceremonyKey: cKey,
                serviceId: sId,
                name: s.name,
                price: s.price,
                ceremonyName: ceremony.name
            });
        }
        updateUI();
    }

    function toggleAddon(aKey) {
        if (!QUOTE_DATA.addons[aKey]) return;
        if (state.selectedAddons.has(aKey)) {
            state.selectedAddons.delete(aKey);
        } else {
            state.selectedAddons.add(aKey);
        }
        updateUI();
    }

    function calculateTotal() {
        let total = 0;
        state.selectedServices.forEach(s => { total += s.price; });
        state.selectedAddons.forEach(aKey => {
            if (QUOTE_DATA.addons[aKey]) total += QUOTE_DATA.addons[aKey].price;
        });
        return total;
    }

    function goToStep(step) {
        if (step < 1 || step > 5) return;
        if (step === 5 && !validateForm()) return;

        state.currentStep = step;

        // Stepper tabs
        document.querySelectorAll('.q-step-tab').forEach(tab => {
            const num = parseInt(tab.getAttribute('data-step'), 10);
            tab.classList.remove('active', 'completed');
            if (num === step) tab.classList.add('active');
            else if (num < step) tab.classList.add('completed');
        });

        // Step Panes
        document.querySelectorAll('.q-pane').forEach(p => p.classList.remove('active'));
        const activePane = document.getElementById(`qPane${step}`);
        if (activePane) activePane.classList.add('active');

        // Footer buttons state
        const footerBar = document.getElementById('qFooterBar');
        const nextBtn = document.getElementById('qNextBtn');
        const backBtn = document.getElementById('qBackBtn');
        const stepper = document.getElementById('qStepper');

        if (step === 5) {
            if (footerBar) footerBar.style.display = 'none';
            if (stepper) stepper.style.display = 'none';
            renderReceipt();
        } else {
            if (footerBar) footerBar.style.display = 'flex';
            if (stepper) stepper.style.display = 'flex';
        }

        if (backBtn) backBtn.style.display = step > 1 && step < 5 ? 'block' : 'none';

        if (nextBtn) {
            if (step === 1) nextBtn.innerHTML = 'Continue to Ceremonies &rarr;';
            else if (step === 2) nextBtn.innerHTML = 'Continue to Add-ons &rarr;';
            else if (step === 3) nextBtn.innerHTML = 'Continue to Details &rarr;';
            else if (step === 4) nextBtn.innerHTML = 'Generate Quote &rarr;';
        }

        const dialog = document.querySelector('.quote-modal-dialog');
        if (dialog) dialog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleNext() {
        if (state.currentStep === 4) {
            if (validateForm()) goToStep(5);
        } else {
            goToStep(state.currentStep + 1);
        }
    }

    function handleBack() {
        if (state.currentStep > 1) goToStep(state.currentStep - 1);
    }

    function validateForm() {
        let valid = true;
        const name = document.getElementById('qName');
        const phone = document.getElementById('qPhone');
        const email = document.getElementById('qEmail');
        const date = document.getElementById('qDate');
        const venue = document.getElementById('qVenue');
        const notes = document.getElementById('qNotes');

        const err = (input, msgId) => {
            input.classList.add('error');
            const el = document.getElementById(msgId);
            if (el) el.classList.add('visible');
            valid = false;
        };

        if (!name || !name.value.trim()) err(name, 'qNameErr');
        if (!phone || !phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) err(phone, 'qPhoneErr');
        if (!email || !email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) err(email, 'qEmailErr');
        if (!date || !date.value.trim()) err(date, 'qDateErr');
        if (!venue || !venue.value.trim()) err(venue, 'qVenueErr');

        if (valid) {
            state.customerDetails = {
                fullName: name.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim(),
                weddingDate: date.value.trim(),
                venue: venue.value.trim(),
                notes: notes ? notes.value.trim() : ''
            };
        }
        return valid;
    }

    function updateUI() {
        // Update service button states
        document.querySelectorAll('.q-service-btn').forEach(btn => {
            const cKey = btn.getAttribute('data-ceremony');
            const sId = btn.getAttribute('data-service');
            const isSel = state.selectedServices.has(`${cKey}__${sId}`);
            btn.classList.toggle('selected', isSel);
            const icon = btn.querySelector('.q-service-icon');
            if (icon) icon.textContent = isSel ? '✓' : '+';
        });

        // Update ceremony count badges
        Object.keys(QUOTE_DATA.ceremonies).forEach(cKey => {
            let count = 0;
            state.selectedServices.forEach(s => {
                if (s.ceremonyKey === cKey) count++;
            });
            const tag = document.getElementById(`qTag_${cKey}`);
            if (tag) {
                if (count > 0) {
                    tag.textContent = `${count} added`;
                    tag.style.display = 'inline-block';
                } else {
                    tag.style.display = 'none';
                }
            }
        });

        // Update addon card states
        document.querySelectorAll('.q-addon-card').forEach(card => {
            const aKey = card.getAttribute('data-addon');
            const isSel = state.selectedAddons.has(aKey);
            card.classList.toggle('selected', isSel);
            const toggle = card.querySelector('.q-addon-toggle');
            if (toggle) toggle.textContent = isSel ? '✓ Added' : '+ Add';
        });

        // Update footer totals
        const total = calculateTotal();
        const totalCount = state.selectedServices.size + state.selectedAddons.size;
        const totalEl = document.getElementById('qFooterTotal');
        const countEl = document.getElementById('qFooterCount');

        if (totalEl) totalEl.textContent = formatINR(total);
        if (countEl) countEl.textContent = `${totalCount} ${totalCount === 1 ? 'service' : 'services'} selected`;
    }

    function renderReceipt() {
        const total = calculateTotal();
        const details = state.customerDetails;
        const styleLabel = getSelectedStyleLabel();

        const refEl = document.getElementById('qDocRef');
        if (refEl) refEl.textContent = `REF: ${state.quoteId}`;

        const totalEl = document.getElementById('qDocGrandTotal');
        if (totalEl) totalEl.textContent = formatINR(total);

        const dateEl = document.getElementById('qDocDate');
        if (dateEl) {
            const today = new Date();
            dateEl.textContent = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        }

        const nameEl = document.getElementById('qDocName');
        const weddingDateEl = document.getElementById('qDocDateVal');
        const venueEl = document.getElementById('qDocVenue');
        const phoneEl = document.getElementById('qDocPhone');
        const styleEl = document.getElementById('qDocStyle');

        if (nameEl) nameEl.textContent = details.fullName || '—';
        if (weddingDateEl) {
            if (details.weddingDate) {
                const wDate = new Date(details.weddingDate);
                weddingDateEl.textContent = !isNaN(wDate)
                    ? wDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                    : details.weddingDate;
            } else {
                weddingDateEl.textContent = '—';
            }
        }
        if (venueEl) venueEl.textContent = details.venue || '—';
        if (phoneEl) phoneEl.textContent = details.phone || '—';
        if (styleEl) styleEl.textContent = styleLabel || 'Candid & Traditional Photography';

        const body = document.getElementById('qDocTableBody');
        if (body) {
            let rows = '';
            let idx = 1;

            // Photography Style Direction Row
            rows += `
                <tr class="q-doc-row-style">
                    <td style="text-align: center; color: var(--q-gold); font-weight: 700;">★</td>
                    <td><strong style="color: var(--q-maroon);">Photography Direction</strong></td>
                    <td>
                        <strong style="color: var(--q-charcoal);">${styleLabel}</strong>
                        <div class="q-doc-subtext">Signature aesthetic curation across all selected ceremonies</div>
                    </td>
                    <td style="text-align: right; color: var(--q-gold); font-weight: 700;">Included</td>
                </tr>
            `;

            // Service scope mapping
            const serviceScopeMap = {
                candid_photo: 'Candid Still Storytelling &bull; Full Frame Mirrorless Kit &bull; Master Candid Artist',
                trad_photo: 'Traditional Ceremony &amp; Family Portraiture &bull; Studio Strobe Kit &bull; Senior Photographer',
                candid_video: 'Cinematic 4K Highlights Film &bull; Prime Cinema Lenses &amp; 3-Axis Gimbal Stabilizer',
                trad_video: 'Full Traditional Video Coverage &bull; Broadcast 4K Cinema Camera &amp; Pro Audio',
                drone: 'Aerial 4K Cinematography &bull; Venue &amp; Baraat Aerial Perspectives &bull; Certified Pilot'
            };

            state.selectedServices.forEach(s => {
                const scope = serviceScopeMap[s.serviceId] || 'Professional Wedding Coverage with Master Creative Equipment';
                rows += `
                    <tr>
                        <td style="text-align: center; color: #888;">${idx++}</td>
                        <td><strong style="color: var(--q-maroon);">${s.ceremonyName}</strong></td>
                        <td>
                            <strong style="color: var(--q-charcoal);">${s.name}</strong>
                            <div class="q-doc-subtext">${scope}</div>
                        </td>
                        <td style="text-align: right; font-weight: 700; color: var(--q-maroon);">${formatINR(s.price)}</td>
                    </tr>
                `;
            });

            // Addon scope mapping
            const addonScopeMap = {
                pre_wedding: '8-Hour Outdoor &amp; Scenic Destination Shoot &bull; 2 Concept Changes &bull; 30 Retouched Masters',
                couple_teaser: '4K Vertical Cinematic Reel &bull; Next-Day Turnaround for Instagram &amp; Social Highlights',
                album_premium: '40 Ultra-HD Luster Pages (250 Photos) &bull; Italian Leatherette Handcrafted Box Cover',
                live_led: 'Dual High-Brightness Outdoor LED Screen Feed &bull; Live Multi-Camera Switcher Setup'
            };

            state.selectedAddons.forEach(aKey => {
                const addon = QUOTE_DATA.addons[aKey];
                if (addon) {
                    const scope = addonScopeMap[aKey] || 'Curated Luxury Wedding Experience Add-on';
                    rows += `
                        <tr class="q-doc-row-addon">
                            <td style="text-align: center; color: #888;">${idx++}</td>
                            <td><strong style="color: var(--q-gold);">Experience Add-on</strong></td>
                            <td>
                                <strong style="color: var(--q-charcoal);">${addon.name}</strong>
                                <div class="q-doc-subtext">${scope}</div>
                            </td>
                            <td style="text-align: right; font-weight: 700; color: var(--q-maroon);">${formatINR(addon.price)}</td>
                        </tr>
                    `;
                }
            });

            if (!state.selectedServices.size && !state.selectedAddons.size) {
                rows += `<tr><td colspan="4" style="text-align: center; color: #888; padding: 24px;">No ceremony services selected. Please modify your selection.</td></tr>`;
            }

            body.innerHTML = rows;
        }
    }

    function printQuotation() {
        const docEl = document.getElementById('qPrintableDocument');
        if (!docEl) {
            window.print();
            return;
        }

        const printWin = window.open('', '_blank', 'width=960,height=1100');
        if (printWin) {
            printWin.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Swayamvara Wedding Photography — Quotation \${state.quoteId}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #ffffff;
            color: #1A1A1A;
            padding: 24px 32px;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        .q-quotation-doc {
            width: 100%;
            max-width: 820px;
            margin: 0 auto;
            border: 1.5px solid #D4AF37;
            border-radius: 8px;
            padding: 32px 36px;
            background: #ffffff;
        }
        .q-doc-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #581D2B;
            padding-bottom: 18px;
            margin-bottom: 20px;
        }
        .q-doc-crest {
            color: #D4AF37;
            font-size: 0.9rem;
            letter-spacing: 0.3em;
            margin-bottom: 4px;
        }
        .q-doc-logo-title {
            font-family: 'Cinzel', serif;
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            color: #581D2B;
            line-height: 1;
        }
        .q-doc-logo-sub {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.22em;
            color: #9E7B34;
            margin-top: 5px;
        }
        .q-doc-contact {
            font-size: 0.74rem;
            color: #666;
            margin-top: 8px;
            line-height: 1.5;
        }
        .q-doc-contact span { display: block; }
        .q-doc-meta { text-align: right; }
        .q-doc-type-pill {
            display: inline-block;
            background: #581D2B;
            color: #ffffff;
            padding: 4px 14px;
            border-radius: 20px;
            font-family: 'Cinzel', serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            margin-bottom: 8px;
        }
        .q-doc-ref {
            font-family: 'Cinzel', serif;
            font-size: 0.95rem;
            font-weight: 700;
            color: #9E7B34;
            margin-bottom: 4px;
        }
        .q-doc-meta-item {
            font-size: 0.78rem;
            color: #555;
            margin-top: 2px;
        }
        .q-doc-client-card {
            background: #FAF7F2;
            border: 1px solid #E6DCCE;
            border-radius: 6px;
            padding: 14px 18px;
            margin-bottom: 20px;
        }
        .q-doc-card-title {
            font-family: 'Cinzel', serif;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            color: #581D2B;
            border-bottom: 1px solid rgba(88, 29, 43, 0.15);
            padding-bottom: 6px;
            margin-bottom: 10px;
        }
        .q-doc-client-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px 18px;
            font-size: 0.82rem;
        }
        .q-doc-lbl { color: #777; margin-right: 4px; }
        .q-doc-full-col { grid-column: 1 / -1; }
        .q-doc-table-wrap { margin-bottom: 20px; }
        .q-doc-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.82rem;
        }
        .q-doc-table th {
            background: #581D2B;
            color: #ffffff;
            font-family: 'Cinzel', serif;
            font-size: 0.74rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            padding: 9px 12px;
            text-align: left;
        }
        .q-doc-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #EEE5D8;
            vertical-align: middle;
        }
        .q-doc-subtext {
            font-size: 0.72rem;
            color: #777;
            margin-top: 2px;
        }
        .q-doc-row-style { background: #FAF7F2; }
        .q-doc-row-addon { background: #FFFDF9; }
        .q-doc-total-box {
            background: linear-gradient(135deg, #FAF7F2 0%, #F5EDE0 100%);
            border: 1.5px solid #D4AF37;
            border-radius: 6px;
            padding: 14px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .q-doc-privilege-badge {
            display: inline-block;
            font-size: 0.68rem;
            font-weight: 700;
            color: #581D2B;
            letter-spacing: 0.1em;
        }
        .q-doc-total-note {
            font-size: 0.72rem;
            color: #777;
            margin-top: 3px;
        }
        .q-doc-total-right { text-align: right; }
        .q-doc-total-lbl {
            font-size: 0.68rem;
            letter-spacing: 0.16em;
            font-weight: 700;
            color: #777;
        }
        .q-doc-total-val {
            font-family: 'Cinzel', serif;
            font-size: 1.8rem;
            font-weight: 700;
            color: #581D2B;
            line-height: 1.1;
        }
        .q-doc-terms-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            border-top: 1px solid #E5D8C5;
            padding-top: 16px;
            margin-bottom: 20px;
        }
        .q-doc-terms-box {
            background: #FAF7F2;
            border: 1px solid #EBE2D4;
            border-radius: 6px;
            padding: 12px 14px;
        }
        .q-doc-box-title {
            font-family: 'Cinzel', serif;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            color: #581D2B;
            margin-bottom: 8px;
        }
        .q-doc-list {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 0.74rem;
            color: #555;
            line-height: 1.6;
        }
        .q-doc-list li {
            position: relative;
            padding-left: 12px;
            margin-bottom: 3px;
        }
        .q-doc-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #D4AF37;
            font-weight: bold;
        }
        .q-doc-sign-wrap {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-top: 1.5px solid #581D2B;
            padding-top: 14px;
        }
        .q-doc-seal {
            font-size: 0.74rem;
            color: #777;
        }
        .q-doc-seal-badge {
            font-family: 'Cinzel', serif;
            font-weight: 700;
            color: #581D2B;
            letter-spacing: 0.12em;
        }
        .q-doc-sign-block {
            text-align: right;
            font-size: 0.74rem;
            color: #555;
        }
        .q-doc-sign-line {
            width: 140px;
            border-bottom: 1px solid #999;
            margin-bottom: 6px;
            margin-left: auto;
        }
        .q-doc-sign-block strong {
            display: block;
            color: #581D2B;
        }
        @page {
            size: A4 portrait;
            margin: 10mm;
        }
    </style>
</head>
<body>
    \${docEl.outerHTML}
    <script>
        window.onload = function() {
            window.focus();
            setTimeout(function() {
                window.print();
            }, 400);
        };
    <\/script>
</body>
</html>`);
            printWin.document.close();
        } else {
            window.print();
        }
    }

    function shareWhatsApp() {
        const total = calculateTotal();
        const details = state.customerDetails;
        const styleLabel = getSelectedStyleLabel();

        let msg = `*SWAYAMVARA WEDDING PHOTOGRAPHY QUOTATION*\n`;
        msg += `Reference ID: ${state.quoteId}\n`;
        msg += `------------------------------------\n`;
        msg += `*Couple:* ${details.fullName}\n`;
        msg += `*Wedding Date:* ${details.weddingDate}\n`;
        msg += `*Venue:* ${details.venue}\n`;
        msg += `*Selected Style:* ${styleLabel}\n\n`;
        msg += `*SERVICES SELECTED:*\n`;

        state.selectedServices.forEach(s => {
            msg += `• ${s.ceremonyName} - ${s.name}: ${formatINR(s.price)}\n`;
        });

        state.selectedAddons.forEach(aKey => {
            const a = QUOTE_DATA.addons[aKey];
            if (a) msg += `• ${a.name}: ${formatINR(a.price)}\n`;
        });

        msg += `------------------------------------\n`;
        msg += `*ESTIMATED TOTAL: ${formatINR(total)}*\n`;
        msg += `------------------------------------\n`;
        msg += `Hi Swayamvara team, I created this quote on your website. Please confirm availability!`;

        window.open(`https://wa.me/917989304874?text=${encodeURIComponent(msg)}`, '_blank');
    }

    // 5. Global Link Binding
    function bindQuoteButtons() {
        const elements = document.querySelectorAll('a, button, [role="button"]');
        elements.forEach(el => {
            const text = (el.textContent || '').trim().toLowerCase();
            const href = el.getAttribute('href') || '';
            const matches = text.includes('build your quote') ||
                            text.includes('build my quote') ||
                            text.includes('launch quote builder') ||
                            href.includes('#build-quote') ||
                            href.includes('#quote-builder') ||
                            el.classList.contains('open-quote-modal-btn');

            if (matches && !el.classList.contains('q-close-btn') && !el.classList.contains('q-btn-modify')) {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal();
                });
            }
        });
    }

    function init() {
        bindQuoteButtons();
        if (window.location.hash === '#build-quote' || window.location.hash === '#quote-builder') {
            openModal();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
