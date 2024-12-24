export class ThemeMode {
    private currentMode: string;

    constructor(initialMode: string) {
        const savedMode = localStorage.getItem("mode");
        this.currentMode = savedMode ? JSON.parse(savedMode) : initialMode;
    }

    setMode(mode: string) {
        this.currentMode = mode;
        localStorage.setItem("mode", JSON.stringify(mode));
    }

    getMode() {
        return this.currentMode;
    }
}