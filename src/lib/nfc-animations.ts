export function createEnhancedParticles(element: HTMLElement) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (Math.PI * 2 * i) / 12;
        const radius = 30 + Math.random() * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        particle.style.animationDuration = (1.5 + Math.random()) + 's';
        
        element.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

export function createSuccessCheck(element: HTMLElement) {
    const check = document.createElement('div');
    check.className = 'success-check show';
    element.appendChild(check);
    
    setTimeout(() => {
        check.remove();
    }, 800);
}

export function createSoundWaves(element: HTMLElement) {
    const soundWaves = document.createElement('div');
    soundWaves.className = 'sound-waves';
    
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        soundWaves.appendChild(wave);
    }
    
    element.appendChild(soundWaves);
    
    setTimeout(() => {
        soundWaves.remove();
    }, 1500);
}

export function createEnhancedRipple(element: HTMLElement) {
    const ripple = document.createElement('div');
    ripple.className = 'tap-ripple';
    element.appendChild(ripple);
    
    setTimeout(() => {
        const ripple2 = document.createElement('div');
        ripple2.className = 'tap-ripple-2';
        element.appendChild(ripple2);
        
        setTimeout(() => {
            ripple2.remove();
        }, 1500);
    }, 150);
    
    setTimeout(() => {
        ripple.remove();
    }, 1200);
} 