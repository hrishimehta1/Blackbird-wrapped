export function playNFCSound() {
    let audioContext: AudioContext;

    // Check if AudioContext is available, otherwise try webkitAudioContext
    if (typeof window !== 'undefined' && window.AudioContext) {
        audioContext = new window.AudioContext();
    } else if (typeof window !== 'undefined' && (window as any).webkitAudioContext) {
        audioContext = new (window as any).webkitAudioContext();
    } else {
        console.error('Web Audio API not supported in this browser.');
        return; // Exit if audio context cannot be created
    }
    
    const oscillator = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const gainNode2 = audioContext.createGain();
    const masterGain = audioContext.createGain();
    
    oscillator.connect(gainNode);
    oscillator2.connect(gainNode2);
    gainNode.connect(masterGain);
    gainNode2.connect(masterGain);
    masterGain.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.08);
    
    oscillator2.frequency.setValueAtTime(1500, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.08);
    
    masterGain.gain.setValueAtTime(0.3, audioContext.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
    oscillator2.stop(audioContext.currentTime + 0.15);

    // Initialize audio context on first user interaction if suspended
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}
