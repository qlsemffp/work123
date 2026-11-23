/**
 * svgRenderer.js - 32단계 웨이퍼 제조 공정 동적 단면 SVG 렌더링 엔진
 * SK하이닉스 반도체 웨이퍼 제조 공정 (Wafer Fabrication) 기술 표준 반영
 */

class SvgWaferRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.showLabels = true;
    this.showDimensions = false;
    this.currentStep = 1;
    this.hoverCallback = null;
  }

  setHoverCallback(fn) {
    this.hoverCallback = fn;
  }

  toggleLabels(val) {
    this.showLabels = val !== undefined ? val : !this.showLabels;
    this.render(this.currentStep);
  }

  toggleDimensions(val) {
    this.showDimensions = val !== undefined ? val : !this.showDimensions;
    this.render(this.currentStep);
  }

  render(stepNum) {
    this.currentStep = stepNum;
    if (!this.container) return;

    const svgContent = this.generateSvg(stepNum);
    this.container.innerHTML = svgContent;
    this.attachInteractions();
  }

  generateSvg(stepNum) {
    const w = 800;
    const h = 480;

    return `
      <svg viewBox="0 0 ${w} ${h}" class="wafer-svg w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Background Gradients -->
          <linearGradient id="chamberBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#070c18" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <!-- Layer Gradients -->
          <linearGradient id="waferGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#0369a1" />
          </linearGradient>

          <linearGradient id="oxideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#ea580c" />
          </linearGradient>

          <linearGradient id="gateOxideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fb923c" />
            <stop offset="100%" stop-color="#f97316" />
          </linearGradient>

          <linearGradient id="prYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fde047" />
            <stop offset="100%" stop-color="#eab308" />
          </linearGradient>

          <linearGradient id="prPurpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c084fc" />
            <stop offset="100%" stop-color="#9333ea" />
          </linearGradient>

          <linearGradient id="polySiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>

          <linearGradient id="sdWellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>

          <linearGradient id="ildGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#be123c" />
          </linearGradient>

          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f1f5f9" />
            <stop offset="50%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>

          <linearGradient id="uvBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(192, 132, 252, 0.7)" />
            <stop offset="100%" stop-color="rgba(147, 51, 234, 0.15)" />
          </linearGradient>

          <linearGradient id="plasmaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(244, 63, 94, 0.8)" />
            <stop offset="100%" stop-color="rgba(239, 68, 68, 0.1)" />
          </linearGradient>

          <linearGradient id="ionBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(56, 189, 248, 0.85)" />
            <stop offset="100%" stop-color="rgba(14, 165, 233, 0.2)" />
          </linearGradient>

          <!-- Drop Shadows & Filters -->
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="layerShadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.4" />
          </filter>
        </defs>

        <!-- Cleanroom Chamber Background -->
        <rect width="${w}" height="${h}" fill="url(#chamberBg)" rx="12" />

        <!-- Grid Lines for Precision Engineering Feel -->
        <g opacity="0.08" stroke="#38bdf8" stroke-width="1">
          <line x1="100" y1="50" x2="100" y2="430" stroke-dasharray="4 4" />
          <line x1="250" y1="50" x2="250" y2="430" stroke-dasharray="4 4" />
          <line x1="350" y1="50" x2="350" y2="430" stroke-dasharray="4 4" />
          <line x1="400" y1="50" x2="400" y2="430" stroke-dasharray="2 2" stroke-width="1.5" />
          <line x1="450" y1="50" x2="450" y2="430" stroke-dasharray="4 4" />
          <line x1="550" y1="50" x2="550" y2="430" stroke-dasharray="4 4" />
          <line x1="700" y1="50" x2="700" y2="430" stroke-dasharray="4 4" />
          <line x1="100" y1="280" x2="700" y2="280" stroke-width="1" />
        </g>

        <!-- Dynamic Physical Layers by Step -->
        ${this.renderPhysicalLayers(stepNum)}

        <!-- Dynamic Process Effect Overlay (UV, Plasma, Ions, Heat, Slurry) -->
        ${this.renderProcessEffects(stepNum)}

        <!-- Engineering Dimensions & Labels -->
        ${this.renderOverlays(stepNum)}
      </svg>
    `;
  }

  renderPhysicalLayers(step) {
    let out = [];

    // 1. BASE WAFER (P-Type Bulk Silicon 기판) - Present in all steps
    out.push(`
      <g id="layer-wafer" class="cursor-pointer transition-all hover:opacity-95" data-part="wafer">
        <path d="M 100 280 L 700 280 L 700 420 Q 400 440 100 420 Z" fill="url(#waferGrad)" filter="url(#layerShadow)" />
        <text x="400" y="380" fill="#bae6fd" font-size="20" font-weight="700" text-anchor="middle" letter-spacing="3" opacity="0.85">Wafer</text>
        <text x="400" y="405" fill="#7dd3fc" font-size="11" text-anchor="middle" opacity="0.7">P-Type Bulk Silicon Substrate</text>
      </g>
    `);

    // 2. SOURCE / DRAIN N+ WELLS (Appears from Step 15 onwards)
    if (step >= 15) {
      out.push(`
        <g id="layer-sd-wells" class="transition-all" data-part="source-drain">
          <!-- Source Well (Left) -->
          <path d="M 230 280 Q 230 330 285 330 Q 340 330 340 280 Z" fill="url(#sdWellGrad)" stroke="#b45309" stroke-width="1.5" />
          <text x="285" y="310" fill="#78350f" font-size="16" font-weight="800" text-anchor="middle">S</text>
          <text x="285" y="324" fill="#92400e" font-size="9" font-weight="700" text-anchor="middle">N+</text>

          <!-- Drain Well (Right) -->
          <path d="M 460 280 Q 460 330 515 330 Q 570 330 570 280 Z" fill="url(#sdWellGrad)" stroke="#b45309" stroke-width="1.5" />
          <text x="515" y="310" fill="#78350f" font-size="16" font-weight="800" text-anchor="middle">D</text>
          <text x="515" y="324" fill="#92400e" font-size="9" font-weight="700" text-anchor="middle">N+</text>
        </g>
      `);
    } else if (step === 14) {
      // Step 14: Ions penetrating into wafer (dashed latent regions)
      out.push(`
        <g id="layer-sd-latent" opacity="0.6">
          <path d="M 230 280 Q 230 325 285 325 Q 340 325 340 280 Z" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" />
          <path d="M 460 280 Q 460 325 515 325 Q 570 325 570 280 Z" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" />
          <text x="285" y="305" fill="#f59e0b" font-size="11" text-anchor="middle">Implanted N</text>
          <text x="515" y="305" fill="#f59e0b" font-size="11" text-anchor="middle">Implanted N</text>
        </g>
      `);
    }

    // 3. INITIAL OXIDE (SiO₂) - Steps 1 through 6
    if (step === 1 || step === 2 || step === 3 || step === 4) {
      // Full blanket oxide
      out.push(`
        <rect id="layer-init-oxide" x="100" y="250" width="600" height="30" fill="url(#oxideGrad)" rx="2" stroke="#c2410c" stroke-width="1" />
        <text x="400" y="270" fill="#fff7ed" font-size="13" font-weight="600" text-anchor="middle">Silicon Oxide (SiO₂)</text>
      `);
    } else if (step === 5 || step === 6) {
      // Etched center oxide, left and right remaining
      out.push(`
        <g id="layer-init-oxide-etched">
          <!-- Left Oxide -->
          <rect x="100" y="250" width="150" height="30" fill="url(#oxideGrad)" stroke="#c2410c" stroke-width="1" />
          <text x="175" y="270" fill="#fff7ed" font-size="11" font-weight="600" text-anchor="middle">SiO₂</text>
          <!-- Right Oxide -->
          <rect x="550" y="250" width="150" height="30" fill="url(#oxideGrad)" stroke="#c2410c" stroke-width="1" />
          <text x="625" y="270" fill="#fff7ed" font-size="11" font-weight="600" text-anchor="middle">SiO₂</text>
        </g>
      `);
    }

    // 4. PR COATING (Step 2, 3, 4, 5)
    if (step === 2) {
      // Uniform Yellow PR
      out.push(`
        <rect id="layer-pr-1" x="100" y="215" width="600" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" opacity="0.95" />
        <text x="400" y="238" fill="#713f12" font-size="14" font-weight="700" text-anchor="middle">PR (Photoresist)</text>
      `);
    } else if (step === 3) {
      // Step 3 Exposure: Center PR has photochemical reaction (purple/latent)
      out.push(`
        <g id="layer-pr-exposure">
          <rect x="100" y="215" width="150" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
          <rect x="250" y="215" width="300" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" opacity="0.9" />
          <rect x="550" y="215" width="150" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
          <text x="400" y="238" fill="#faf5ff" font-size="13" font-weight="700" text-anchor="middle">Exposed PR (Decomposed)</text>
        </g>
      `);
    } else if (step === 4 || step === 5) {
      // Step 4 & 5: Center PR removed, opening window
      out.push(`
        <g id="layer-pr-developed">
          <rect x="100" y="215" width="150" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
          <text x="175" y="238" fill="#713f12" font-size="12" font-weight="700" text-anchor="middle">PR</text>
          <rect x="550" y="215" width="150" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
          <text x="625" y="238" fill="#713f12" font-size="12" font-weight="700" text-anchor="middle">PR</text>
        </g>
      `);
    }

    // 5. GATE OXIDE (Step 7 to 32)
    if (step >= 7) {
      out.push(`
        <!-- Gate Oxide Layer -->
        <rect id="layer-gate-oxide" x="350" y="275" width="100" height="5" fill="url(#gateOxideGrad)" stroke="#ea580c" stroke-width="0.8" />
      `);
    }

    // 6. POLY-SI GATE (Steps 9 to 32)
    if (step === 9) {
      // Blanket Poly-Si across the entire surface with center trench
      out.push(`
        <g id="layer-poly-blanket">
          <path d="M 100 250 L 100 210 L 250 210 L 250 230 L 550 230 L 550 210 L 700 210 L 700 250 L 550 250 L 550 280 L 250 280 L 250 250 Z" 
                fill="url(#polySiGrad)" stroke="#047857" stroke-width="1.5" />
          <text x="400" y="258" fill="#ecfdf5" font-size="16" font-weight="700" text-anchor="middle">Poly-Si (Polysilicon 전면 증착)</text>
        </g>
      `);
    } else if (step === 10) {
      // Poly-Si with PR on top
      out.push(`
        <g id="layer-poly-pr-coat">
          <path d="M 100 250 L 100 210 L 250 210 L 250 230 L 550 230 L 550 210 L 700 210 L 700 250 L 550 250 L 550 280 L 250 280 L 250 250 Z" 
                fill="url(#polySiGrad)" stroke="#047857" stroke-width="1" />
          <rect x="100" y="175" width="600" height="35" fill="url(#prPurpleGrad)" opacity="0.9" stroke="#7e22ce" stroke-width="1" />
          <text x="400" y="198" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">PR Coating</text>
        </g>
      `);
    } else if (step === 11) {
      // Step 11: Gate PR patterned, leaving central PR block
      out.push(`
        <g id="layer-poly-gate-photo">
          <path d="M 100 250 L 100 210 L 250 210 L 250 230 L 550 230 L 550 210 L 700 210 L 700 250 L 550 250 L 550 280 L 250 280 L 250 250 Z" 
                fill="url(#polySiGrad)" stroke="#047857" stroke-width="1" />
          <!-- Central Gate PR block -->
          <rect x="350" y="165" width="100" height="65" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1.5" />
          <text x="400" y="202" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle">Gate PR</text>
        </g>
      `);
    } else if (step === 12) {
      // Step 12: Gate Etch - poly etched, only gate pillar under PR remains
      out.push(`
        <g id="layer-gate-etched-with-pr">
          <!-- Gate Poly Pillar -->
          <rect x="350" y="210" width="100" height="65" fill="url(#polySiGrad)" stroke="#047857" stroke-width="1.5" />
          <text x="400" y="248" fill="#ecfdf5" font-size="14" font-weight="700" text-anchor="middle">Poly-Si</text>
          <!-- PR on top -->
          <rect x="350" y="165" width="100" height="45" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1.5" />
          <text x="400" y="192" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">PR</text>
        </g>
      `);
    } else if (step >= 13) {
      // Steps 13 to 32: Gate pillar standing cleanly
      out.push(`
        <g id="layer-gate-pillar" class="cursor-pointer transition-all hover:brightness-110" data-part="gate">
          <rect x="350" y="210" width="100" height="65" fill="url(#polySiGrad)" stroke="#047857" stroke-width="1.5" />
          <text x="400" y="250" fill="#ecfdf5" font-size="16" font-weight="800" text-anchor="middle">Gate</text>
          <text x="400" y="266" fill="#a7f3d0" font-size="9" text-anchor="middle">Poly-Si</text>
        </g>
      `);
    }

    // 7. ILD (Interlayer Dielectric) LAYER (Steps 16 to 32)
    if (step === 16) {
      // Step 16: Bumpy ILD before CMP
      out.push(`
        <g id="layer-ild-bumpy">
          <path d="M 100 280 L 100 170 C 250 170 300 120 400 120 C 500 120 550 170 700 170 L 700 280 L 450 280 L 450 210 L 350 210 L 350 280 Z" 
                fill="url(#ildGrad)" stroke="#9f1239" stroke-width="1.5" opacity="0.92" />
          <text x="400" y="155" fill="#ffe4e6" font-size="16" font-weight="800" text-anchor="middle">Oxidation / ILD (표면 요철 단차)</text>
        </g>
      `);
    } else if (step === 17) {
      // Step 17: CMP polishing in progress
      out.push(`
        <g id="layer-ild-cmp">
          <path d="M 100 280 L 100 170 L 350 170 L 350 210 L 450 210 L 450 170 L 700 170 L 700 280 Z" 
                fill="url(#ildGrad)" stroke="#9f1239" stroke-width="1.5" opacity="0.9" />
          <!-- Residual fading bump being flattened -->
          <path d="M 320 170 Q 400 135 480 170 Z" fill="#fb7185" opacity="0.4" stroke="#f43f5e" stroke-dasharray="3 3" />
        </g>
      `);
    } else if (step >= 18 && step <= 22) {
      // Flat solid ILD across the top
      out.push(`
        <g id="layer-ild-flat" class="cursor-pointer" data-part="ild">
          <path d="M 100 280 L 100 170 L 350 170 L 350 210 L 450 210 L 450 170 L 700 170 L 700 280 Z" 
                fill="url(#ildGrad)" stroke="#9f1239" stroke-width="1.5" opacity="0.9" />
          <text x="220" y="200" fill="#ffe4e6" font-size="15" font-weight="700">ILD (Planarized SiO₂)</text>
        </g>
      `);
    } else if (step >= 23) {
      // ILD with two contact holes cut through it
      out.push(`
        <g id="layer-ild-contact-holes" data-part="ild">
          <!-- Left section: x 100 to 265 -->
          <rect x="100" y="170" width="165" height="110" fill="url(#ildGrad)" stroke="#9f1239" stroke-width="1.5" />
          <!-- Middle section (above gate): x 305 to 495, wrapping around gate -->
          <path d="M 305 170 L 495 170 L 495 280 L 450 280 L 450 210 L 350 210 L 350 280 L 305 280 Z" 
                fill="url(#ildGrad)" stroke="#9f1239" stroke-width="1.5" />
          <!-- Right section: x 535 to 700 -->
          <rect x="535" y="170" width="165" height="110" fill="url(#ildGrad)" stroke="#9f1239" stroke-width="1.5" />
        </g>
      `);
    }

    // 8. CONTACT PR (Steps 19, 20, 21, 22)
    if (step === 19) {
      // PR on flat ILD
      out.push(`
        <rect id="layer-contact-pr" x="100" y="135" width="600" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" opacity="0.9" />
        <text x="400" y="158" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Contact Hole PR Coating</text>
      `);
    } else if (step === 20) {
      // Contact exposure (two purple exposed zones)
      out.push(`
        <g id="layer-contact-pr-exposed">
          <rect x="100" y="135" width="600" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
          <rect x="265" y="135" width="40" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="495" y="135" width="40" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
        </g>
      `);
    } else if (step === 21 || step === 22) {
      // Contact developed (holes in PR)
      out.push(`
        <g id="layer-contact-pr-developed">
          <rect x="100" y="135" width="165" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="305" y="135" width="190" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="535" y="135" width="165" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <text x="400" y="158" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Developed Contact Windows</text>
        </g>
      `);
    } else if (step === 23) {
      // In etch: PR still present on top
      out.push(`
        <g id="layer-contact-pr-in-etch">
          <rect x="100" y="135" width="165" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="305" y="135" width="190" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="535" y="135" width="165" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
        </g>
      `);
    }

    // 9. TUNGSTEN CONTACT PLUGS (Steps 26 to 32)
    if (step >= 26) {
      out.push(`
        <g id="layer-contact-plugs" data-part="plug">
          <!-- Left Plug (Source) -->
          <rect x="265" y="170" width="40" height="110" fill="url(#metalGrad)" stroke="#64748b" stroke-width="1.5" />
          <!-- Right Plug (Drain) -->
          <rect x="495" y="170" width="40" height="110" fill="url(#metalGrad)" stroke="#64748b" stroke-width="1.5" />
          <text x="285" y="230" fill="#0f172a" font-size="10" font-weight="800" text-anchor="middle" transform="rotate(-90 285 230)">W Plug</text>
          <text x="515" y="230" fill="#0f172a" font-size="10" font-weight="800" text-anchor="middle" transform="rotate(-90 515 230)">W Plug</text>
        </g>
      `);
    }

    // 10. TOP METAL LAYER (Steps 27 to 32)
    if (step === 27) {
      // Blanket continuous metal sheet
      out.push(`
        <g id="layer-metal-blanket">
          <rect x="100" y="110" width="600" height="60" fill="url(#metalGrad)" stroke="#475569" stroke-width="2" rx="3" />
          <text x="400" y="145" fill="#0f172a" font-size="18" font-weight="800" text-anchor="middle">Metal Layer (Al / Cu 전면 증착)</text>
        </g>
      `);
    } else if (step === 28) {
      // Metal with PR on top
      out.push(`
        <g id="layer-metal-pr-coated">
          <rect x="100" y="110" width="600" height="60" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
          <rect x="100" y="75" width="600" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <text x="400" y="98" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Metal PR Coating</text>
        </g>
      `);
    } else if (step === 29) {
      // Metal PR exposure: center gap exposed
      out.push(`
        <g id="layer-metal-pr-exposure">
          <rect x="100" y="110" width="600" height="60" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
          <rect x="100" y="75" width="270" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
          <rect x="370" y="75" width="60" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="430" y="75" width="270" height="35" fill="url(#prYellowGrad)" stroke="#ca8a04" stroke-width="1" />
        </g>
      `);
    } else if (step === 30) {
      // Metal PR developed (center open)
      out.push(`
        <g id="layer-metal-pr-developed">
          <rect x="100" y="110" width="600" height="60" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
          <rect x="100" y="75" width="270" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <rect x="430" y="75" width="270" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <text x="400" y="98" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">Center Open</text>
        </g>
      `);
    } else if (step === 31) {
      // Metal etched with PR still on top
      out.push(`
        <g id="layer-metal-etched-with-pr">
          <!-- Left Metal + PR -->
          <rect x="100" y="110" width="270" height="60" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
          <rect x="100" y="75" width="270" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
          <!-- Right Metal + PR -->
          <rect x="430" y="110" width="270" height="60" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
          <rect x="430" y="75" width="270" height="35" fill="url(#prPurpleGrad)" stroke="#7e22ce" stroke-width="1" />
        </g>
      `);
    } else if (step === 32) {
      // Step 32: Final Isolated Metal Lines (Source Metal vs Drain Metal)
      out.push(`
        <g id="layer-metal-final" class="cursor-pointer" data-part="metal">
          <!-- Left Metal Pad (Source) -->
          <rect x="100" y="110" width="270" height="60" fill="url(#metalGrad)" stroke="#334155" stroke-width="2" rx="3" />
          <text x="235" y="146" fill="#0f172a" font-size="16" font-weight="800" text-anchor="middle">Source Metal</text>

          <!-- Right Metal Pad (Drain) -->
          <rect x="430" y="110" width="270" height="60" fill="url(#metalGrad)" stroke="#334155" stroke-width="2" rx="3" />
          <text x="565" y="146" fill="#0f172a" font-size="16" font-weight="800" text-anchor="middle">Drain Metal</text>
        </g>
      `);
    }

    return out.join('\n');
  }

  renderProcessEffects(step) {
    let fx = [];

    // Step 1: High Temperature Oxidation Glow
    if (step === 1) {
      fx.push(`
        <g id="fx-thermal-oxidation" opacity="0.8">
          <rect x="100" y="245" width="600" height="10" fill="#f97316" filter="url(#glow)" />
          <text x="400" y="120" fill="#fb923c" font-size="18" font-weight="700" text-anchor="middle">♨ 800 ~ 1,100 ℃ Thermal Oxidation Tube</text>
          <text x="400" y="145" fill="#fdba74" font-size="13" text-anchor="middle">Si + O₂ → SiO₂ Passivation Growth</text>
        </g>
      `);
    }

    // Step 3: UV Light Exposure Beams
    if (step === 3) {
      fx.push(`
        <g id="fx-uv-exposure">
          <!-- Photomask -->
          <rect x="200" y="60" width="400" height="15" fill="#334155" stroke="#94a3b8" stroke-width="1.5" />
          <rect x="250" y="60" width="300" height="15" fill="none" stroke="#38bdf8" stroke-width="2" />
          <text x="400" y="50" fill="#c084fc" font-size="14" font-weight="700" text-anchor="middle">Quartz Photomask (UV Open Window)</text>
          <!-- Light Beams -->
          <polygon points="250,75 550,75 550,215 250,215" fill="url(#uvBeam)" />
          <line x1="280" y1="75" x2="280" y2="215" stroke="#c084fc" stroke-width="2" stroke-dasharray="6 4" opacity="0.8" />
          <line x1="400" y1="75" x2="400" y2="215" stroke="#e879f9" stroke-width="2" stroke-dasharray="6 4" opacity="0.8" />
          <line x1="520" y1="75" x2="520" y2="215" stroke="#c084fc" stroke-width="2" stroke-dasharray="6 4" opacity="0.8" />
          <text x="400" y="160" fill="#f5d0fe" font-size="15" font-weight="800" text-anchor="middle">⚡ DUV / UV Radiation</text>
        </g>
      `);
    }

    // Step 5: Plasma Dry Etch Ions
    if (step === 5) {
      fx.push(`
        <g id="fx-plasma-etch">
          <polygon points="250,80 550,80 550,250 250,250" fill="url(#plasmaGlow)" />
          <!-- Plasma Arrows -->
          <g stroke="#f43f5e" stroke-width="3" opacity="0.85">
            <line x1="300" y1="90" x2="300" y2="245" marker-end="url(#arrow)" />
            <line x1="360" y1="90" x2="360" y2="245" />
            <line x1="400" y1="90" x2="400" y2="245" />
            <line x1="440" y1="90" x2="440" y2="245" />
            <line x1="500" y1="90" x2="500" y2="245" />
          </g>
          <text x="400" y="140" fill="#fecdd3" font-size="16" font-weight="800" text-anchor="middle">CF₄/CHF₃ Reactive Plasma Dry Etch</text>
        </g>
      `);
    }

    // Step 6: O2 Plasma Ashing
    if (step === 6) {
      fx.push(`
        <g id="fx-ashing" opacity="0.75">
          <circle cx="175" cy="190" r="15" fill="#ec4899" filter="url(#glow)" />
          <circle cx="625" cy="190" r="15" fill="#ec4899" filter="url(#glow)" />
          <text x="400" y="140" fill="#f472b6" font-size="16" font-weight="700" text-anchor="middle">O₂ Plasma Ashing (PR Vaporization)</text>
        </g>
      `);
    }

    // Step 11: Gate Photomask & Exposure
    if (step === 11) {
      fx.push(`
        <g id="fx-gate-exposure">
          <!-- Gate Mask (Center Chrome Block) -->
          <rect x="200" y="60" width="400" height="15" fill="none" stroke="#94a3b8" stroke-width="1.5" />
          <rect x="350" y="60" width="100" height="15" fill="#0f172a" stroke="#ef4444" stroke-width="2" />
          <text x="400" y="50" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">Gate Mask (Center Opaque Chrome)</text>
          <!-- Left/Right Exposure Beams -->
          <polygon points="200,75 350,75 350,210 200,210" fill="url(#uvBeam)" />
          <polygon points="450,75 600,75 600,210 450,210" fill="url(#uvBeam)" />
        </g>
      `);
    }

    // Step 12: Gate Etch
    if (step === 12) {
      fx.push(`
        <g id="fx-gate-etch">
          <rect x="100" y="90" width="250" height="120" fill="url(#plasmaGlow)" opacity="0.6" />
          <rect x="450" y="90" width="250" height="120" fill="url(#plasmaGlow)" opacity="0.6" />
          <text x="400" y="120" fill="#fda4af" font-size="15" font-weight="700" text-anchor="middle">Anisotropic Poly-Si Etch (Vertical Sidewall)</text>
        </g>
      `);
    }

    // Step 14: Ion Implantation Beams (Self-Aligned)
    if (step === 14) {
      fx.push(`
        <g id="fx-ion-implant">
          <!-- Ion shower arrows -->
          <polygon points="100,50 700,50 700,280 100,280" fill="url(#ionBeam)" opacity="0.4" />
          <g stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="8 6">
            <line x1="250" y1="50" x2="250" y2="280" />
            <line x1="285" y1="50" x2="285" y2="280" />
            <line x1="320" y1="50" x2="320" y2="280" />
            <line x1="375" y1="50" x2="375" y2="210" stroke="#f43f5e" /> <!-- Blocked by Gate! -->
            <line x1="425" y1="50" x2="425" y2="210" stroke="#f43f5e" /> <!-- Blocked by Gate! -->
            <line x1="480" y1="50" x2="480" y2="280" />
            <line x1="515" y1="50" x2="515" y2="280" />
            <line x1="550" y1="50" x2="550" y2="280" />
          </g>
          <rect x="360" y="160" width="80" height="30" fill="#0f172a" rx="4" stroke="#f43f5e" stroke-width="1.5" />
          <text x="400" y="180" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">Gate Blocks Ions</text>
          <text x="400" y="40" fill="#7dd3fc" font-size="16" font-weight="800" text-anchor="middle">⚡ 5-Valence Ion Beam (As+ / P+) Self-Aligned</text>
        </g>
      `);
    }

    // Step 15: Rapid Thermal Annealing
    if (step === 15) {
      fx.push(`
        <g id="fx-anneal" opacity="0.9">
          <!-- Glowing thermal radiation waves -->
          <path d="M 120 270 Q 200 240 280 270 T 440 270 T 600 270 T 680 270" fill="none" stroke="#f59e0b" stroke-width="3" filter="url(#glow)" />
          <text x="400" y="90" fill="#f59e0b" font-size="18" font-weight="800" text-anchor="middle">🔥 RTA 고온 급속 열처리 (900 ~ 1,000 ℃)</text>
          <text x="400" y="115" fill="#fde68a" font-size="12" text-anchor="middle">Lattice Damage Healing & Dopant Electrical Activation</text>
        </g>
      `);
    }

    // Step 17: CMP Roller & Slurry
    if (step === 17) {
      fx.push(`
        <g id="fx-cmp-roller">
          <!-- Rotating CMP Polishing Head -->
          <circle cx="400" cy="100" r="45" fill="#e2e8f0" stroke="#475569" stroke-width="4" filter="url(#layerShadow)" />
          <circle cx="400" cy="100" r="18" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
          <!-- Rotation Arrow -->
          <path d="M 370 75 A 35 35 0 0 1 430 75" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round" />
          <text x="400" y="105" fill="#1e293b" font-size="10" font-weight="800" text-anchor="middle">ROTATION</text>
          <text x="400" y="35" fill="#a78bfa" font-size="16" font-weight="800" text-anchor="middle">Chemical Slurry + Polishing Pad</text>
        </g>
      `);
    }

    // Step 20: Dual Contact Hole Exposure
    if (step === 20) {
      fx.push(`
        <g id="fx-contact-exposure">
          <polygon points="265,60 305,60 305,135 265,135" fill="url(#uvBeam)" />
          <polygon points="495,60 535,60 535,135 495,135" fill="url(#uvBeam)" />
          <text x="400" y="45" fill="#c084fc" font-size="15" font-weight="700" text-anchor="middle">Contact Mask Overlay Exposure</text>
        </g>
      `);
    }

    // Step 23: Contact High Aspect Ratio Etch
    if (step === 23) {
      fx.push(`
        <g id="fx-contact-etch">
          <rect x="265" y="70" width="40" height="210" fill="url(#plasmaGlow)" />
          <rect x="495" y="70" width="40" height="210" fill="url(#plasmaGlow)" />
          <line x1="285" y1="70" x2="285" y2="280" stroke="#f43f5e" stroke-width="3" stroke-dasharray="6 4" />
          <line x1="515" y1="70" x2="515" y2="280" stroke="#f43f5e" stroke-width="3" stroke-dasharray="6 4" />
          <text x="400" y="45" fill="#f87171" font-size="15" font-weight="800" text-anchor="middle">High Aspect Ratio (HAR) Deep Etch</text>
        </g>
      `);
    }

    // Step 29: Metal Line Separation Exposure
    if (step === 29) {
      fx.push(`
        <g id="fx-metal-exposure">
          <polygon points="370,50 430,50 430,75 370,75" fill="url(#uvBeam)" />
          <text x="400" y="40" fill="#c084fc" font-size="14" font-weight="700" text-anchor="middle">Center Metal Isolation Slit Exposure</text>
        </g>
      `);
    }

    // Step 31: Metal Etch
    if (step === 31) {
      fx.push(`
        <g id="fx-metal-etch">
          <rect x="370" y="60" width="60" height="110" fill="url(#plasmaGlow)" />
          <text x="400" y="45" fill="#f43f5e" font-size="15" font-weight="800" text-anchor="middle">Metal Plasma Etch (S/D Disconnect)</text>
        </g>
      `);
    }

    // Step 32: Final Device Sparkle / Completion Callout
    if (step === 32) {
      fx.push(`
        <g id="fx-final-complete">
          <rect x="250" y="25" width="300" height="40" fill="#0f172a" rx="8" stroke="#10b981" stroke-width="2" filter="url(#glow)" />
          <text x="400" y="50" fill="#34d399" font-size="16" font-weight="800" text-anchor="middle">✔ MOSFET Unit Cell Completed!</text>
        </g>
      `);
    }

    return fx.join('\n');
  }

  renderOverlays(step) {
    if (!this.showLabels) return '';

    return `
      <!-- Step Badge in SVG Top Left -->
      <g id="svg-step-indicator" transform="translate(30, 30)">
        <rect width="130" height="42" fill="rgba(15, 23, 42, 0.85)" rx="8" stroke="#334155" stroke-width="1.5" />
        <text x="16" y="26" fill="#94a3b8" font-size="12" font-weight="600">STEP</text>
        <text x="56" y="28" fill="#38bdf8" font-size="20" font-weight="900">${String(step).padStart(2, '0')}</text>
        <text x="88" y="26" fill="#64748b" font-size="12">/ 32</text>
      </g>
    `;
  }

  attachInteractions() {
    if (!this.container) return;

    // Attach click/hover on clickable layers
    const clickableParts = this.container.querySelectorAll('[data-part]');
    clickableParts.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        const partKey = el.getAttribute('data-part');
        if (this.hoverCallback) this.hoverCallback(partKey, e);
      });
      el.addEventListener('click', (e) => {
        const partKey = el.getAttribute('data-part');
        if (this.hoverCallback) this.hoverCallback(partKey, e);
      });
    });
  }
}
