/* =========================================================
   TRADITIONAL KERALA WEDDING INVITATION - INTERACTION SCRIPT
   Gokul & Arya - 25 October 2026
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // 1. Audio Player Management (Play/Pause, Mute/Unmute)
  // ---------------------------------------------------------
  const audio = document.getElementById('weddingMusic');
  const musicWidget = document.getElementById('musicWidget');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const muteToggleBtn = document.getElementById('muteToggleBtn');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const iconUnmuted = document.getElementById('iconUnmuted');
  const iconMuted = document.getElementById('iconMuted');

  let isAudioPlaying = false;

  function updateAudioUI() {
    if (!audio.paused && !audio.ended) {
      isAudioPlaying = true;
      musicWidget.classList.add('music-playing');
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
    } else {
      isAudioPlaying = false;
      musicWidget.classList.remove('music-playing');
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
    }

    if (audio.muted) {
      iconUnmuted.classList.add('hidden');
      iconMuted.classList.remove('hidden');
    } else {
      iconUnmuted.classList.remove('hidden');
      iconMuted.classList.add('hidden');
    }
  }

  function playAudio() {
    audio.play().then(() => {
      updateAudioUI();
    }).catch(err => {
      console.log('Audio autoplay prevented or waiting for interaction:', err);
    });
  }

  function pauseAudio() {
    audio.pause();
    updateAudioUI();
  }

  musicToggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  });

  muteToggleBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateAudioUI();
  });

  audio.addEventListener('play', updateAudioUI);
  audio.addEventListener('pause', updateAudioUI);
  audio.addEventListener('ended', updateAudioUI);

  // ---------------------------------------------------------
  // 2. Opening Cover Gate Interaction
  // ---------------------------------------------------------
  const coverGate = document.getElementById('coverGate');
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  const invitationContent = document.getElementById('invitationContent');

  openInvitationBtn.addEventListener('click', () => {
    // 1. Play music upon user gesture
    playAudio();

    // 2. Trigger opening animation
    coverGate.classList.add('opened');
    invitationContent.classList.remove('hidden-initially');

    // 3. Smooth scroll to invitation top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Allow pointer events to pass through
      coverGate.style.display = 'none';
    }, 900);

    // 4. Trigger celebration petal burst
    triggerPetalBurst();
  });

  // ---------------------------------------------------------
  // 3. Live Countdown to Wedding Ceremony
  //    Target: October 25, 2026 at 11:30 AM IST (UTC+05:30)
  // ---------------------------------------------------------
  const targetDate = new Date('2026-10-25T11:30:00+05:30').getTime();

  const countDaysEl = document.getElementById('countDays');
  const countHoursEl = document.getElementById('countHours');
  const countMinutesEl = document.getElementById('countMinutes');
  const countSecondsEl = document.getElementById('countSeconds');
  const countdownGrid = document.getElementById('countdownGrid');
  const countdownCompleted = document.getElementById('countdownCompleted');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      // Countdown reached zero
      if (countdownGrid) countdownGrid.classList.add('hidden');
      if (countdownCompleted) countdownCompleted.classList.remove('hidden');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countDaysEl.textContent = String(days).padStart(2, '0');
    countHoursEl.textContent = String(hours).padStart(2, '0');
    countMinutesEl.textContent = String(minutes).padStart(2, '0');
    countSecondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------------------------------------------------------
  // 4. Save to Calendar Functionality (.ics file generation)
  // ---------------------------------------------------------
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      // Ceremony Date: 2026-10-25 11:30 AM to 12:15 PM IST
      // UTC: 2026-10-25 06:00:00Z to 06:45:00Z
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Gokul & Arya Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:gokul-arya-wedding-20261025@ceremony',
        'DTSTAMP:20260922T120000Z',
        'DTSTART:20261025T060000Z',
        'DTEND:20261025T064500Z',
        'SUMMARY:Wedding Ceremony - Gokul & Arya',
        'DESCRIPTION:Wedding Ceremony of Gokul and Arya at Bhavana Auditorium, Cheemoor, Venjaramoodu.',
        'LOCATION:Bhavana Auditorium, Cheemoor, Venjaramoodu',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Gokul_Arya_Wedding_Ceremony.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ---------------------------------------------------------
  // 5. Image Fallback Handling
  // ---------------------------------------------------------
  function setupImageFallback(imgElement, fallbackSrc) {
    if (!imgElement) return;
    imgElement.addEventListener('error', () => {
      if (imgElement.src !== fallbackSrc) {
        imgElement.src = fallbackSrc;
      }
    });
  }

  setupImageFallback(document.getElementById('couplePhoto'), 'couple.jpg');
  setupImageFallback(document.getElementById('groomPhoto'), 'groom.jpg');
  setupImageFallback(document.getElementById('bridePhoto'), 'bride.jpg');
  setupImageFallback(document.getElementById('locationQrImg'), 'images/location.jpg');

  // ---------------------------------------------------------
  // 6. Ambient Falling Flower Petals & Golden Sparkles (Canvas)
  // ---------------------------------------------------------
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const TOTAL_PETALS = 32;

  class Petal {
    constructor(isBurst = false) {
      this.reset(isBurst);
    }

    reset(isBurst = false) {
      this.x = Math.random() * width;
      this.y = isBurst ? Math.random() * height * 0.5 : -20 - Math.random() * 50;
      this.size = Math.random() * 8 + 8; // Petal size
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.opacity = Math.random() * 0.5 + 0.4;
      this.type = Math.random() > 0.4 ? 'rose' : (Math.random() > 0.5 ? 'jasmine' : 'gold');
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.8 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'rose') {
        // Soft red/pink rose petal
        ctx.fillStyle = '#d94b68';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size, -this.size, this.size / 2, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size / 2, this.size / 2, -this.size, 0, 0);
        ctx.fill();
      } else if (this.type === 'jasmine') {
        // Sacred white/cream Kerala jasmine petal
        ctx.fillStyle = '#fff9eb';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
        // Golden accent at petal base
        ctx.fillStyle = '#e5c158';
        ctx.beginPath();
        ctx.arc(0, this.size * 0.6, 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Soft golden particle
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Initialize petals
  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(new Petal(true));
  }

  function triggerPetalBurst() {
    for (let i = 0; i < 25; i++) {
      petals.push(new Petal(true));
    }
    // Fade out extra petals after burst
    setTimeout(() => {
      petals.splice(TOTAL_PETALS);
    }, 4000);
  }

  function renderLoop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(renderLoop);
  }

  renderLoop();
});
