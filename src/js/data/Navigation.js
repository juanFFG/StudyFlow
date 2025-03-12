export class Navigation {
    constructor(views, dashboardViews) {
        this.views = views; // Vistas principales
        this.dashboardViews = dashboardViews; // Vistas dentro de Dashboard
        this.currentView = null;
    }

    init() {
        // Ocultar todas las vistas
        this.views.forEach(view => document.getElementById(view).classList.add('inactive'));
        this.dashboardViews.forEach(view => document.getElementById(view).classList.add('inactive'));

        // Mostrar la vista inicial
        this.showView(this.views[0]);

        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', () => {
                const viewId = button.getAttribute('data-view');
                this.showView(viewId);
                this.navigateTo(viewId);
            });
        });

        window.addEventListener('popstate', () => {
            const viewId = history.state?.view || this.views[0];
            this.showView(viewId);
        });
    }

    showView(viewId) {
        console.log("🔄 Cambiando a vista:", viewId);
        localStorage.setItem("currentScreen", viewId);

        // Verifica si la vista es parte del dashboard
        if (this.dashboardViews.includes(viewId)) {
            console.log("📌 Vista dentro de dashboard");
            document.getElementById('dashboardScreen').classList.remove('inactive');

            this.dashboardViews.forEach(view => {
                if (document.getElementById(view)) {
                    if (view === viewId) {
                        document.getElementById(view).classList.remove('inactive');
                    } else {
                        document.getElementById(view).classList.add('inactive');
                    }
                }
            });
        } else {
            console.log("📌 Vista principal fuera del dashboard");
            // Ocultar todas las vistas principales
            this.views.forEach(view => {
                if (document.getElementById(view)) {
                    if (view === viewId) {
                        document.getElementById(view).classList.remove('inactive');
                    } else {
                        document.getElementById(view).classList.add('inactive');
                    }
                }
            });

            // Ocultar dashboard si no se está navegando a él
            if (viewId !== "dashboardScreen") {
                document.getElementById('dashboardScreen')?.classList.add('inactive');
            }
        }

        this.currentView = viewId;
    }


    navigateTo(viewId) {
        if (![...this.views, ...this.dashboardViews].includes(viewId)) return;
        this.showView(viewId);
        history.pushState({ view: viewId }, '', `#${viewId}`);
    }
}
