document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Simple toggle animation for burger icon lines
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
      spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    });
  }

  // Sticky Header on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '10px 0';
      header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.padding = '15px 0';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });

  // Testimonials Auto Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
  }

  function startSlideShow() {
    if (slides.length === 0) return;
    slideInterval = setInterval(nextSlide, 5000); // Change testimonial every 5 seconds
  }

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      currentSlide = index;
      showSlide(currentSlide);
      startSlideShow();
    });
  });

  showSlide(currentSlide);
  startSlideShow();

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });



  // Elevator Simulator Logic
  const simButtons = document.querySelectorAll('.cop-btn');
  const simCab = document.querySelector('.sim-cab');
  const floorIndicator = document.querySelector('.cop-floor-indicator');
  const upArrow = document.getElementById('arrow-up');
  const downArrow = document.getElementById('arrow-down');
  const infoTitle = document.querySelector('.sim-info-title');
  const infoDesc = document.querySelector('.sim-info-desc');

  const floorHeights = {
    'G': '20px',
    '1': '120px',
    '2': '220px',
    '3': '320px'
  };

  const floorIndex = { 'G': 0, '1': 1, '2': 2, '3': 3 };

  const floorInfo = {
    'G': {
      title: 'Ground Floor: Safety & Integrity Audits',
      desc: 'Our fundamental layer. Every elevator system we touch undergoes a rigorous 15-point safety inspection. We calibrate speed governors, check door safety sensors, inspect wire ropes, and configure the automatic rescue device (ARD) to guarantee zero entrapments.'
    },
    '1': {
      title: 'First Floor: Precision New Installations',
      desc: 'Sleek custom cabin structures. From panoramic capsule lifts and high-end residential glass elevators to heavy-duty goods/stretcher setups. Built with PMSM gearless traction motors, delivering whisper-quiet runs and 40% energy savings.'
    },
    '2': {
      title: 'Second Floor: Comprehensive Modernisation',
      desc: 'We transform legacy elevators. We upgrade manual swing/telescopic gates to automatic sliding doors, replace outdated relay controllers with smart microprocessor units, and redesign cabin interiors.'
    },
    '3': {
      title: 'Third Floor: Smart 24/7 AMC Maintenance',
      desc: 'Our top-tier service. GPS-dispatched engineers are armed with our proprietary Smart Diagnostics App, interfacing with elevator boards via Bluetooth to instantly read error codes. Backed by priority emergency breakdown responses within 30 minutes.'
    }
  };

  let currentFloor = 'G';
  let isMoving = false;

  if (simButtons.length > 0 && simCab) {
    simButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetFloor = btn.getAttribute('data-floor');
        if (targetFloor === currentFloor || isMoving) return;

        isMoving = true;

        // Deactivate all buttons during travel, activate only the clicked one
        simButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Set direction arrow
        const currentIdx = floorIndex[currentFloor];
        const targetIdx = floorIndex[targetFloor];

        if (targetIdx > currentIdx) {
          upArrow.classList.add('active');
          downArrow.classList.remove('active');
        } else {
          downArrow.classList.add('active');
          upArrow.classList.remove('active');
        }

        // Animate Cab movement
        simCab.style.bottom = floorHeights[targetFloor];

        // Animate digital display number change step-by-step
        let tempIdx = currentIdx;
        const step = targetIdx > currentIdx ? 1 : -1;
        const floorsArray = ['G', '1', '2', '3'];

        const displayInterval = setInterval(() => {
          tempIdx += step;
          floorIndicator.textContent = floorsArray[tempIdx];

          if (tempIdx === targetIdx) {
            clearInterval(displayInterval);

            // Reached destination!
            setTimeout(() => {
              // Turn off arrows
              upArrow.classList.remove('active');
              downArrow.classList.remove('active');

              // Load details with fade-in effect
              const info = floorInfo[targetFloor];
              const infoCard = document.querySelector('.sim-info-card');
              infoCard.style.opacity = '0';

              setTimeout(() => {
                infoTitle.textContent = info.title;
                infoDesc.textContent = info.desc;
                infoCard.style.opacity = '1';
                isMoving = false;
                currentFloor = targetFloor;
              }, 200);

            }, 300);
          }
        }, 400); // Time per floor step
      });
    });
  }

  // Biometric & Smart Phone Security Simulator
  const fingerprintBtn = document.getElementById('fingerprint-scan');
  const authMsg = document.getElementById('auth-msg');
  const screenAuth = document.getElementById('screen-auth');
  const screenDispatch = document.getElementById('screen-dispatch');
  const authStatusIcon = document.querySelector('.auth-status-icon');

  const dFloorBtns = document.querySelectorAll('.d-floor-btn');
  const btnCallLift = document.getElementById('btn-call-lift');
  const dispatchStatusMsg = document.getElementById('dispatch-status-msg');

  const lobbyIndicator = document.getElementById('lobby-indicator');
  const lobbyArrowUp = document.getElementById('lobby-arrow-up');
  const lobbyArrowDown = document.getElementById('lobby-arrow-down');
  const doorSystem = document.querySelector('.lobby-door-system');
  const readerLight = document.getElementById('reader-light');

  let isAuthorized = false;
  let isScanning = false;
  let isLobbyMoving = false;
  let lobbyCurrentFloor = 3;
  let selectedDispatchFloor = 'G';

  // 1. Biometric Scan Action
  if (fingerprintBtn) {
    fingerprintBtn.addEventListener('click', () => {
      if (isScanning || isAuthorized) return;

      isScanning = true;
      fingerprintBtn.classList.add('scanning');
      authMsg.textContent = 'Scanning biometric details...';
      readerLight.className = 'reader-led scanning-orange';

      setTimeout(() => {
        fingerprintBtn.classList.remove('scanning');
        isAuthorized = true;
        isScanning = false;

        // Show success status
        authStatusIcon.className = 'auth-status-icon active';
        authStatusIcon.innerHTML = '<i class="fas fa-unlock"></i>';
        authMsg.innerHTML = '<span style="color:#2ed573; font-weight:bold;">ACCESS GRANTED</span>';
        readerLight.className = 'reader-led active-green';

        // Transition to dispatch screen after 1.2 seconds
        setTimeout(() => {
          screenAuth.classList.remove('active');
          screenDispatch.classList.add('active');
        }, 1200);

      }, 2000);
    });
  }

  // 2. Select Floor in Smartphone App
  if (dFloorBtns.length > 0) {
    dFloorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (isLobbyMoving) return;
        dFloorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDispatchFloor = btn.getAttribute('data-df');
      });
    });
  }

  // 3. Dispatch / Call Lift Action
  if (btnCallLift) {
    btnCallLift.addEventListener('click', () => {
      if (isLobbyMoving) return;

      if (!isAuthorized) {
        // Flash reader red
        readerLight.className = 'reader-led';
        setTimeout(() => {
          readerLight.style.background = '#e74c3c';
          readerLight.style.boxShadow = '0 0 15px #e74c3c';
          alert('ACCESS DENIED: Please authorize via biometric scanner first.');
        }, 100);
        return;
      }

      isLobbyMoving = true;
      btnCallLift.disabled = true;
      btnCallLift.textContent = 'Dispatching...';
      dispatchStatusMsg.textContent = 'Connecting with elevator controller...';

      // Determine target numeric floor
      const targetMap = { 'G': 0, '1': 1, '2': 2, '3': 3 };
      const targetVal = targetMap[selectedDispatchFloor];

      // Calculate delay based on distance
      const distance = Math.abs(lobbyCurrentFloor - targetVal);

      // Update arrows in lobby panel
      if (targetVal > lobbyCurrentFloor) {
        lobbyArrowUp.classList.add('active');
        lobbyArrowDown.classList.remove('active');
      } else if (targetVal < lobbyCurrentFloor) {
        lobbyArrowDown.classList.add('active');
        lobbyArrowUp.classList.remove('active');
      }

      // Close doors if they are open
      doorSystem.classList.remove('open');

      // Simulate floor transitions step-by-step
      let tempFloor = lobbyCurrentFloor;
      const step = targetVal > lobbyCurrentFloor ? 1 : -1;
      const floorsList = ['G', '1', '2', '3'];

      const moveInterval = setInterval(() => {
        if (tempFloor === targetVal) {
          clearInterval(moveInterval);

          // Reached!
          setTimeout(() => {
            lobbyArrowUp.classList.remove('active');
            lobbyArrowDown.classList.remove('active');

            // Slide open doors!
            doorSystem.classList.add('open');

            btnCallLift.disabled = false;
            btnCallLift.textContent = 'Call Elevator';
            btnCallLift.style.background = 'var(--accent-color)';
            dispatchStatusMsg.textContent = `Arrived at Floor ${selectedDispatchFloor}. Doors opening...`;

            isLobbyMoving = false;
            lobbyCurrentFloor = targetVal;

            // Auto-close doors after 4 seconds
            setTimeout(() => {
              if (!isLobbyMoving) {
                doorSystem.classList.remove('open');
                dispatchStatusMsg.textContent = 'Idle';
              }
            }, 4000);

          }, 500);
          return;
        }

        tempFloor += step;
        lobbyCurrentFloor = tempFloor;

        // Update display on phone and wall
        lobbyIndicator.textContent = floorsList[tempFloor];
        dispatchStatusMsg.textContent = `Elevator moving... Passing Floor ${floorsList[tempFloor]}`;
      }, 1000); // 1 second per floor
    });
  }

  // Safety Simulator Script
  const btnNormal = document.getElementById('btn-saf-normal');
  const btnFall = document.getElementById('btn-saf-fall');
  const btnDoor = document.getElementById('btn-saf-door');
  const btnFire = document.getElementById('btn-saf-fire');
  const btnPower = document.getElementById('btn-saf-power');
  const btnOverload = document.getElementById('btn-saf-overload');
  const btnFull = document.getElementById('btn-saf-full');

  const safCab = document.getElementById('safety-cab-element');
  const safGov = document.getElementById('safety-gov-pulley');
  const jawL = document.getElementById('jaw-l');
  const jawR = document.getElementById('jaw-r');
  const sparks = document.getElementById('spark-effect-element');
  const doorL = document.getElementById('s-door-l');
  const doorR = document.getElementById('s-door-r');
  const irBeam = document.getElementById('ir-beam');
  const doorHand = document.getElementById('door-obs-hand');
  const cabMainLight = document.getElementById('saf-cab-main-light');

  // Cabin Indicators
  const iconFire = document.getElementById('icon-cab-fire');
  const iconAlarm = document.getElementById('icon-cab-alarm');
  const lightOverload = document.getElementById('light-cab-overload');
  const lightFull = document.getElementById('light-cab-fullload');

  const safTitle = document.getElementById('saf-detail-title');
  const safDesc = document.getElementById('saf-detail-desc');
  const cables = document.querySelectorAll('.cable');

  let normalInterval;
  let safState = 'normal'; // 'normal', 'falling', 'obstructed', 'fire', 'power', 'overload', 'full'

  function resetSafetyElements() {
    clearInterval(normalInterval);
    safCab.style.transition = 'none';
    safCab.style.top = '150px';
    safCab.style.transform = 'none';
    safGov.style.animation = 'none';
    jawL.style.background = '#7f8c8d';
    jawL.style.boxShadow = 'none';
    jawR.style.background = '#7f8c8d';
    jawR.style.boxShadow = 'none';
    sparks.style.opacity = '0';
    doorL.classList.remove('open-door');
    doorR.classList.remove('open-door');
    irBeam.style.display = 'none';
    doorHand.style.display = 'none';
    cables.forEach(c => {
      c.style.display = 'block';
      c.style.height = '150px';
    });

    // Reset cab lights and indicator elements
    if (cabMainLight) cabMainLight.style.background = '#3498db';
    if (iconFire) iconFire.style.display = 'none';
    if (iconAlarm) iconAlarm.style.display = 'none';
    if (lightOverload) lightOverload.style.display = 'none';
    if (lightFull) lightFull.style.display = 'none';

    // Reset buttons styles
    const allButtons = [btnNormal, btnFall, btnDoor, btnFire, btnPower, btnOverload, btnFull];
    allButtons.forEach(btn => {
      if (btn) {
        btn.style.background = '#2c3e50';
        btn.style.borderColor = '#34495e';
      }
    });
  }

  function startNormalMotion() {
    resetSafetyElements();
    safState = 'normal';
    if (btnNormal) {
      btnNormal.style.background = '#27ae60';
      btnNormal.style.borderColor = '#27ae60';
    }

    safTitle.textContent = 'Normal Running State';
    safDesc.textContent = 'The suspension cables share the cabin load equally. The mechanical speed governor spins at normal speeds. Everything is operating within safe parameters.';

    // Animate elevator going up and down slowly
    safCab.style.transition = 'top 3s ease-in-out';
    safGov.style.animation = 'spin-slow 3s infinite linear';

    function cycleNormal() {
      if (safState !== 'normal') return;
      safCab.style.top = safCab.style.top === '150px' ? '280px' : '150px';

      // Rotate governor based on direction
      if (safCab.style.top === '150px') {
        safGov.style.animation = 'spin-slow 3s infinite linear';
      } else {
        safGov.style.animation = 'spin-slow 3s infinite linear reverse';
      }

      normalInterval = setTimeout(cycleNormal, 3200);
    }
    cycleNormal();
  }

  // Trigger Normal Run on start
  if (btnNormal) {
    startNormalMotion();
    btnNormal.addEventListener('click', startNormalMotion);
  }

  // 1. Snap Cables & Free-fall
  if (btnFall) {
    btnFall.addEventListener('click', () => {
      if (safState === 'falling') return;
      resetSafetyElements();
      safState = 'falling';

      btnFall.style.background = '#e74c3c';
      btnFall.style.borderColor = '#e74c3c';

      safTitle.textContent = 'Speed Governor & Safety Gears Activated';
      safDesc.textContent = 'Cables snapped! The cabin begins to free-fall. Instantly, the over-speed governor locks up, pulling the safety gear lever. The friction jaws clamp the guide rails, locking the cab securely in place.';

      // Snapping Ropes
      cables.forEach(c => {
        c.style.height = '0px';
      });

      // Free fall begins
      setTimeout(() => {
        safCab.style.transition = 'top 0.4s cubic-bezier(0.6, 0.05, 0.9, 0.5)';
        safGov.style.animation = 'spin-fast 0.4s infinite linear';
        safCab.style.top = '300px';

        // Brake engages!
        setTimeout(() => {
          // Spin locks
          safGov.style.animation = 'none';

          // Clamp Rails (Jaws glow orange/red)
          jawL.style.background = '#e67e22';
          jawL.style.boxShadow = '0 0 15px #e67e22';
          jawR.style.background = '#e67e22';
          jawR.style.boxShadow = '0 0 15px #e67e22';

          // Sparks fly
          sparks.style.opacity = '1';

          // Shaking impact animation
          safCab.style.transition = 'none';
          safCab.style.transform = 'translateY(-5px)';
          setTimeout(() => {
            safCab.style.transform = 'translateY(3px)';
            setTimeout(() => {
              safCab.style.transform = 'none';
              sparks.style.opacity = '0';
              safTitle.textContent = 'Mechanical Lock Engaged (Safe!)';
            }, 100);
          }, 100);

        }, 400); // Snap and stop timing
      }, 500);
    });
  }

  // 2. Door Obstruction
  if (btnDoor) {
    btnDoor.addEventListener('click', () => {
      resetSafetyElements();
      safState = 'obstructed';

      btnDoor.style.background = '#f39c12';
      btnDoor.style.borderColor = '#f39c12';

      safTitle.textContent = 'Infrared Door Safety Curtain';
      safDesc.textContent = 'The doors attempt to close. An obstruction is introduced. The infrared beam is broken, triggering the controller to instantly reverse the doors and open them again.';

      safCab.style.top = '200px';

      setTimeout(() => {
        doorL.classList.add('open-door');
        doorR.classList.add('open-door');

        setTimeout(() => {
          doorL.classList.remove('open-door');
          doorR.classList.remove('open-door');

          setTimeout(() => {
            doorHand.style.display = 'block';
            irBeam.style.display = 'block';

            setTimeout(() => {
              irBeam.style.display = 'none';
              doorL.classList.add('open-door');
              doorR.classList.add('open-door');
              safTitle.textContent = 'Obstruction Detected (Doors Reversed)';

              setTimeout(() => {
                doorHand.style.display = 'none';
                if (btnDoor) {
                  btnDoor.style.background = '#2c3e50';
                  btnDoor.style.borderColor = '#34495e';
                }
              }, 1500);
            }, 500);
          }, 400);
        }, 500);
      }, 500);
    });
  }

  // 3. Fire Recall Mode
  if (btnFire) {
    btnFire.addEventListener('click', () => {
      resetSafetyElements();
      safState = 'fire';

      btnFire.style.background = '#e74c3c';
      btnFire.style.borderColor = '#e74c3c';

      safTitle.textContent = 'Fire Recall Operation Mode';
      safDesc.textContent = 'Recalling to Ground/Evacuation floor. Emergency recall takes priority, overriding all hall landing calls. Upon landing, doors open and remain disabled.';

      if (iconFire) iconFire.style.display = 'inline-block';
      if (iconAlarm) iconAlarm.style.display = 'inline-block';

      // Move cabin down to Ground Evacuation Level (280px)
      safCab.style.transition = 'top 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      safGov.style.animation = 'spin-slow 2s infinite linear';
      safCab.style.top = '280px';

      setTimeout(() => {
        safGov.style.animation = 'none';

        // Open doors and lock them open
        doorL.classList.add('open-door');
        doorR.classList.add('open-door');

        safTitle.textContent = 'Evacuation Floor Arrived (Safe)';
      }, 2100);
    });
  }

  // 4. Power Failure & ARD Rescue Mode
  if (btnPower) {
    btnPower.addEventListener('click', () => {
      resetSafetyElements();
      safState = 'power';

      btnPower.style.background = '#e67e22';
      btnPower.style.borderColor = '#e67e22';

      safTitle.textContent = 'Power Failure & ARD Activation';
      safDesc.textContent = 'Simulating power outage. The main cabin lights turn off. The Automatic Rescue Device (ARD) engages backup battery power, running the lift slowly to the nearest floor to release passengers.';

      // Blackout: dim main lights
      if (cabMainLight) cabMainLight.style.background = '#111';
      if (iconAlarm) {
        iconAlarm.style.display = 'inline-block';
        iconAlarm.style.animation = 'scale-pulse 0.5s infinite alternate';
      }

      // Move slowly to the nearest floor landing (e.g. from 150px to 200px)
      safCab.style.transition = 'top 2.5s ease-in-out';
      safGov.style.animation = 'spin-slow 4s infinite linear';
      safCab.style.top = '200px';

      setTimeout(() => {
        safGov.style.animation = 'none';

        // Backup power slides doors open
        doorL.classList.add('open-door');
        doorR.classList.add('open-door');

        safTitle.textContent = 'ARD Evacuation Complete';
        safDesc.textContent = 'Emergency backup system successfully brought the elevator to Floor 1 and opened doors. Passengers safely evacuated.';
      }, 2700);
    });
  }

  // 5. Overload Mode
  if (btnOverload) {
    btnOverload.addEventListener('click', () => {
      resetSafetyElements();
      safState = 'overload';

      btnOverload.style.background = '#e74c3c';
      btnOverload.style.borderColor = '#e74c3c';

      safTitle.textContent = 'Overload Sensor Protection';
      safDesc.textContent = 'Elevator load sensors detect weight exceeding 100% capacity limit. The doors remain open, an audible alarm triggers, and operations are suspended until weight is reduced.';

      if (lightOverload) lightOverload.style.display = 'inline-block';
      if (iconAlarm) iconAlarm.style.display = 'inline-block';

      // Slide doors open
      doorL.classList.add('open-door');
      doorR.classList.add('open-door');

      // Cabin stays completely stationary at 150px
      safCab.style.top = '150px';
    });
  }

  // 6. Full Load Express Mode
  if (btnFull) {
    btnFull.addEventListener('click', () => {
      resetSafetyElements();
      safState = 'full';

      btnFull.style.background = '#27ae60';
      btnFull.style.borderColor = '#27ae60';

      safTitle.textContent = 'Full Load Bypass (Express Run)';
      safDesc.textContent = 'Elevator weight registers at 80%+ capacity. The controller switches the cab to Express bypass mode, ignoring all landing hall calls and traveling directly to inside passenger destinations.';

      if (lightFull) lightFull.style.display = 'inline-block';

      // Express run up and down
      safCab.style.transition = 'top 1.5s ease-in-out';
      safGov.style.animation = 'spin-slow 1.5s infinite linear';
      safCab.style.top = '280px';

      setTimeout(() => {
        if (safState !== 'full') return;
        safGov.style.animation = 'spin-slow 1.5s infinite linear reverse';
        safCab.style.top = '150px';

        setTimeout(() => {
          if (safState !== 'full') return;
          safGov.style.animation = 'none';
          doorL.classList.add('open-door');
          doorR.classList.add('open-door');
          safTitle.textContent = 'Destination Reached (Hall Calls Ignored)';
        }, 1600);
      }, 1800);
    });
  }
});
