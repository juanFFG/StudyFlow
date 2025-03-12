export class Pomodoro {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutos en segundos
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.timer = null;
        this.currentMode = 'work';
        this.cycles = 0;
        this.init();
    }
    
    init() {
        // Elementos DOM
        this.timeDisplay = document.getElementById('pomodoro-time');
        this.progressBar = document.getElementById('pomodoro-progress');
        this.startPauseBtn = document.getElementById('pomodoro-start-pause');
        this.resetBtn = document.getElementById('pomodoro-reset');
        this.playIcon = document.getElementById('pomodoro-play-icon');
        this.pauseIcon = document.getElementById('pomodoro-pause-icon');
        this.cyclesDisplay = document.getElementById('pomodoro-cycles');
        
        // Event listeners
        this.startPauseBtn.addEventListener('click', () => this.toggleStartPause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Botones de modo
        document.querySelectorAll('.pomodoro-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeMode(btn.dataset.mode, parseInt(btn.dataset.time));
                
                // Actualizar botones activos
                document.querySelector('.pomodoro-mode-btn.active').classList.remove('active');
                btn.classList.add('active');
            });
        });
        
        // Actualizar display
        this.updateDisplay();
    }
    
    toggleStartPause() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.completeTimer();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            clearInterval(this.timer);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }
    
    completeTimer() {
        this.pause();
        
        // Reproducir sonido de notificación
        this.playNotificationSound();
        
        // Si estamos en modo trabajo, incrementar ciclos y cambiar a descanso
        if (this.currentMode === 'work') {
            this.cycles++;
            this.cyclesDisplay.textContent = `${this.cycles} ciclos completados`;
            
            // Después de 4 ciclos, sugerir un descanso largo
            if (this.cycles % 4 === 0) {
                this.changeMode('long-break', 15);
                document.querySelector('.pomodoro-mode-btn.long-break').click();
            } else {
                this.changeMode('short-break', 5);
                document.querySelector('.pomodoro-mode-btn.short-break').click();
            }
        } else {
            // Si estamos en descanso, volver a trabajo
            this.changeMode('work', 25);
            document.querySelector('.pomodoro-mode-btn.work').click();
        }
    }
    
    changeMode(mode, minutes) {
        this.pause();
        this.currentMode = mode;
        this.totalTime = minutes * 60;
        this.timeLeft = this.totalTime;
        this.updateDisplay();
        
        // Actualizar color según el modo
        if (mode === 'work') {
            this.progressBar.style.setProperty('--pomodoro-work', 'var(--pomodoro-work)');
        } else if (mode === 'short-break') {
            this.progressBar.style.setProperty('--pomodoro-work', 'var(--pomodoro-short-break)');
        } else {
            this.progressBar.style.setProperty('--pomodoro-work', 'var(--pomodoro-long-break)');
        }
    }
    
    updateDisplay() {
        // Formatear tiempo
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Actualizar barra de progreso
        const progress = (1 - (this.timeLeft / this.totalTime)) * 100;
        this.progressBar.style.background = `conic-gradient(var(--pomodoro-work) ${progress}%, transparent ${progress}%)`;
    }
    
    playNotificationSound() {
        // Crear un sonido de notificación simple
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(830, audioContext.currentTime);
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio notification not supported');
        }
    }
}