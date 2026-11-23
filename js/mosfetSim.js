/**
 * mosfetSim.js - 완성된 MOSFET 소자 인터랙티브 동작 시뮬레이터 & 부위별 인스펙터
 * Gate Voltage (V_GS) 제어에 따른 반전층(Inversion Layer) 형성 및 전자(e-) 이동 시각화
 */

class MosfetSimulator {
  constructor(canvasId, infoContainerId) {
    this.canvas = document.getElementById(canvasId);
    this.infoContainer = document.getElementById(infoContainerId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    this.gateVoltage = 0.0; // 0.0V (OFF) ~ 3.3V (ON)
    this.drainVoltage = 1.8; // 1.8V
    this.thresholdVoltage = 0.7; // Vth = 0.7V
    this.isGateOn = false;

    this.particles = [];
    this.maxParticles = 60;
    this.animId = null;
    this.activeComponent = 'gate';

    this.init();
  }

  init() {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Init electron particles
    this.initParticles();

    // Start animation loop
    this.animate();

    // Render initial info
    this.selectComponent('gate');
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomStart = false) {
    // Coordinate mapping relative to canvas (width 600, height 360)
    // Source: x: 140~200, y: 200~240
    // Channel: x: 200~400, y: 200~215
    // Drain: x: 400~460, y: 200~240
    return {
      x: randomStart ? 140 + Math.random() * 60 : 140,
      y: 200 + Math.random() * 20,
      speed: 1.5 + Math.random() * 2,
      size: 2.5 + Math.random() * 2,
      stage: 'source' // 'source' -> 'channel' -> 'drain'
    };
  }

  setGateState(isOn) {
    this.isGateOn = isOn;
    this.gateVoltage = isOn ? 3.3 : 0.0;
    this.updateControlsUI();
    this.updateStatusDisplay();
  }

  setGateVoltage(v) {
    this.gateVoltage = parseFloat(v);
    this.isGateOn = this.gateVoltage >= this.thresholdVoltage;
    this.updateControlsUI();
    this.updateStatusDisplay();
  }

  updateControlsUI() {
    const slider = document.getElementById('gate-v-slider');
    const toggle = document.getElementById('gate-toggle-btn');
    const vVal = document.getElementById('gate-v-val');

    if (slider) slider.value = this.gateVoltage;
    if (vVal) vVal.textContent = `${this.gateVoltage.toFixed(1)} V`;

    if (toggle) {
      if (this.isGateOn) {
        toggle.textContent = 'Gate ON (+3.3V)';
        toggle.className = 'px-4 py-2 rounded-lg font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition-all';
      } else {
        toggle.textContent = 'Gate OFF (0.0V)';
        toggle.className = 'px-4 py-2 rounded-lg font-bold text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 transition-all';
      }
    }
  }

  updateStatusDisplay() {
    const statusBadge = document.getElementById('mosfet-state-badge');
    const currentVal = document.getElementById('current-ids-val');

    const isConducting = this.gateVoltage >= this.thresholdVoltage;

    if (statusBadge) {
      if (isConducting) {
        statusBadge.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>ON (도통 / 전도 상태)`;
        statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300';
      } else {
        statusBadge.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-rose-400 mr-1.5"></span>OFF (차단 상태)`;
        statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 border border-rose-500/50 text-rose-300';
      }
    }

    if (currentVal) {
      if (isConducting) {
        // Calculate mock Ids proportional to (Vgs - Vth)^2
        const ids = Math.max(0, Math.pow(this.gateVoltage - this.thresholdVoltage, 2) * 0.45).toFixed(2);
        currentVal.textContent = `${ids} mA`;
        currentVal.className = 'font-mono text-emerald-400 font-bold';
      } else {
        currentVal.textContent = '0.00 μA (Leakage Only)';
        currentVal.className = 'font-mono text-slate-400';
      }
    }
  }

  selectComponent(compKey) {
    this.activeComponent = compKey;
    const comp = MOSFET_COMPONENTS[compKey];
    if (!comp || !this.infoContainer) return;

    this.infoContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 shadow-lg animate-fadeIn">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
            ${comp.material}
          </span>
          <span class="text-xs text-slate-400 font-mono">Component Inspector</span>
        </div>
        <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          ${comp.name}
        </h4>
        <p class="text-sm text-slate-300 leading-relaxed mb-3">
          ${comp.role}
        </p>
        <div class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
          <span class="text-xs font-semibold text-amber-400 block mb-1">💡 엔지니어링 핵심:</span>
          <p class="text-xs text-slate-300">${comp.techDetail}</p>
        </div>
      </div>
    `;

    // Highlight button in UI
    const buttons = document.querySelectorAll('[data-comp-btn]');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-comp-btn') === compKey) {
        btn.classList.add('bg-red-500/20', 'border-red-500', 'text-white');
        btn.classList.remove('bg-slate-800/60', 'border-slate-700', 'text-slate-400');
      } else {
        btn.classList.remove('bg-red-500/20', 'border-red-500', 'text-white');
        btn.classList.add('bg-slate-800/60', 'border-slate-700', 'text-slate-400');
      }
    });
  }

  animate() {
    this.draw();
    this.updateParticles();
    this.animId = requestAnimationFrame(() => this.animate());
  }

  updateParticles() {
    const isConducting = this.gateVoltage >= this.thresholdVoltage;

    if (!isConducting) {
      // Particles stagnate or wander randomly in Source
      this.particles.forEach(p => {
        p.x += (Math.random() - 0.5) * 0.5;
        p.y += (Math.random() - 0.5) * 0.5;
        if (p.x > 195) p.x = 190;
        if (p.x < 140) p.x = 145;
        if (p.y > 235) p.y = 230;
        if (p.y < 205) p.y = 210;
      });
      return;
    }

    // When conducting, speed is proportional to gate voltage
    const speedMultiplier = 1.0 + (this.gateVoltage - this.thresholdVoltage) * 0.8;

    this.particles.forEach(p => {
      if (p.x < 200) {
        // In Source well: drift toward channel entrance
        p.x += p.speed * speedMultiplier * 0.8;
      } else if (p.x >= 200 && p.x < 400) {
        // In Channel: accelerate through inversion layer
        p.x += p.speed * speedMultiplier * 1.6;
        // Keep inside thin channel (y: 200~210)
        p.y += (205 - p.y) * 0.15;
      } else if (p.x >= 400 && p.x < 470) {
        // Entering Drain: collected by drain positive voltage
        p.x += p.speed * speedMultiplier;
        p.y += (Math.random() - 0.5) * 1.5;
      } else {
        // Reached Drain terminal -> recycle back to Source
        p.x = 140 + Math.random() * 20;
        p.y = 200 + Math.random() * 25;
      }
    });
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // Scaling factors based on 600x320 reference
    const scaleX = w / 600;
    const scaleY = h / 320;

    // Draw Base Substrate (P-Type Si)
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(40 * scaleX, 190 * scaleY, 520 * scaleX, 110 * scaleY);

    ctx.fillStyle = '#bae6fd';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('P-Type Silicon Substrate (Wafer)', 50 * scaleX, 280 * scaleY);

    // Draw Source Well (Left N+)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(130 * scaleX, 190 * scaleY);
    ctx.lineTo(210 * scaleX, 190 * scaleY);
    ctx.quadraticCurveTo(210 * scaleX, 250 * scaleY, 170 * scaleX, 250 * scaleY);
    ctx.quadraticCurveTo(130 * scaleX, 250 * scaleY, 130 * scaleX, 190 * scaleY);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('Source (N+)', 142 * scaleX, 215 * scaleY);

    // Draw Drain Well (Right N+)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(390 * scaleX, 190 * scaleY);
    ctx.lineTo(470 * scaleX, 190 * scaleY);
    ctx.quadraticCurveTo(470 * scaleX, 250 * scaleY, 430 * scaleX, 250 * scaleY);
    ctx.quadraticCurveTo(390 * scaleX, 250 * scaleY, 390 * scaleX, 190 * scaleY);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    ctx.fillStyle = '#fef3c7';
    ctx.fillText('Drain (N+)', 407 * scaleX, 215 * scaleY);

    // Inversion Layer (N-Channel) under Gate Oxide
    const isConducting = this.gateVoltage >= this.thresholdVoltage;
    if (isConducting) {
      const channelIntensity = Math.min(1, (this.gateVoltage - this.thresholdVoltage) / 1.5);
      ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + channelIntensity * 0.5})`;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10 * channelIntensity;
      ctx.fillRect(210 * scaleX, 190 * scaleY, 180 * scaleX, 12 * scaleY);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText('⚡ N-Channel (Inversion Layer)', 225 * scaleX, 200 * scaleY);
    } else {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.fillRect(210 * scaleX, 190 * scaleY, 180 * scaleX, 6 * scaleY);
      ctx.fillStyle = '#f87171';
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText('Barrier (No Channel / OFF)', 240 * scaleX, 200 * scaleY);
    }

    // Gate Oxide (Thin SiO2)
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(210 * scaleX, 184 * scaleY, 180 * scaleX, 6 * scaleY);

    // Poly-Si Gate Electrode
    ctx.fillStyle = '#059669';
    ctx.fillRect(230 * scaleX, 120 * scaleY, 140 * scaleX, 64 * scaleY);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(230 * scaleX, 120 * scaleY, 140 * scaleX, 64 * scaleY);

    ctx.fillStyle = '#ecfdf5';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('Gate (Poly-Si)', 260 * scaleX, 155 * scaleY);

    // ILD (Red Dielectric) Surrounding
    ctx.fillStyle = 'rgba(244, 63, 94, 0.85)';
    // Left ILD block
    ctx.fillRect(40 * scaleX, 80 * scaleY, 110 * scaleX, 110 * scaleY);
    // Middle ILD (between contact and gate)
    ctx.fillRect(190 * scaleX, 80 * scaleY, 40 * scaleX, 110 * scaleY);
    ctx.fillRect(370 * scaleX, 80 * scaleY, 40 * scaleX, 110 * scaleY);
    // Right ILD
    ctx.fillRect(450 * scaleX, 80 * scaleY, 110 * scaleX, 110 * scaleY);

    // Contact Plugs (Tungsten W)
    ctx.fillStyle = '#94a3b8';
    // Left Plug (Source)
    ctx.fillRect(150 * scaleX, 80 * scaleY, 40 * scaleX, 110 * scaleY);
    ctx.strokeRect(150 * scaleX, 80 * scaleY, 40 * scaleX, 110 * scaleY);
    // Right Plug (Drain)
    ctx.fillRect(410 * scaleX, 80 * scaleY, 40 * scaleX, 110 * scaleY);
    ctx.strokeRect(410 * scaleX, 80 * scaleY, 40 * scaleX, 110 * scaleY);

    // Metal Lines (Top)
    ctx.fillStyle = '#cbd5e1';
    // Source Metal Line
    ctx.fillRect(40 * scaleX, 35 * scaleY, 210 * scaleX, 45 * scaleY);
    ctx.strokeRect(40 * scaleX, 35 * scaleY, 210 * scaleX, 45 * scaleY);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('Source Metal (Vs = 0V)', 60 * scaleX, 62 * scaleY);

    // Drain Metal Line
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(350 * scaleX, 35 * scaleY, 210 * scaleX, 45 * scaleY);
    ctx.strokeRect(350 * scaleX, 35 * scaleY, 210 * scaleX, 45 * scaleY);
    ctx.fillStyle = '#0f172a';
    ctx.fillText('Drain Metal (Vd = +1.8V)', 370 * scaleX, 62 * scaleY);

    // Isolation Gap above Gate
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(250 * scaleX, 30 * scaleY, 100 * scaleX, 55 * scaleY);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(250 * scaleX, 30 * scaleY, 100 * scaleX, 55 * scaleY);
    ctx.fillStyle = '#f87171';
    ctx.font = '9px Inter, sans-serif';
    ctx.fillText('Etched Gap (배선 격리)', 256 * scaleX, 60 * scaleY);

    // Draw Electron Particles (e-)
    this.particles.forEach(p => {
      ctx.fillStyle = isConducting ? '#38bdf8' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(p.x * scaleX, p.y * scaleY, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
