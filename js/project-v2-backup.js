/* =========================================================
   BARIWAY DIGITAL HUB
   PROJECTS PAGE
   project.js v2.0 FINAL

   Stable • Clean • Responsive • Cross-Browser

   Features:
   • Search
   • Filter
   • Statistics
   • Dark / Light Mode
   • LocalStorage Theme
   • Mobile Sidebar
   • Project Modal
   • Date & Time
   • Dynamic Year
   • Logout
   • Notification Toast
   • Add Project Placeholder
   • Keyboard Shortcuts
   • Safe Body Scroll
   • Chrome / Firefox / Edge Compatible
========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL STATE
========================================================= */

const PROJECT_STORAGE = {

    theme: "bariwayTheme"

};


let dateTimeInterval = null;


/* =========================================================
   02. DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTheme();
        initSidebar();
        initSearch();
        initFilter();
        initStatistics();
        initProjectModal();
        initDateTime();
        initCurrentYear();
        initLogout();
        initNotification();
        initAddProject();
        initKeyboardShortcuts();

        updateProjectStats();
        filterProjects();

    }
);


/* =========================================================
   03. DOM SELECTORS
========================================================= */

const body =
    document.body;


const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const sidebarClose =
    document.getElementById(
        "sidebarClose"
    );


const projectSearch =
    document.getElementById(
        "projectSearch"
    );


const projectFilter =
    document.getElementById(
        "projectFilter"
    );


const projectsGrid =
    document.getElementById(
        "projectsGrid"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const projectModal =
    document.getElementById(
        "projectModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalCloseBtn =
    document.getElementById(
        "modalCloseBtn"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


/* =========================================================
   04. THEME SYSTEM
========================================================= */

function initTheme() {

    if (!themeToggle) {
        return;
    }


    const savedTheme =
        localStorage.getItem(
            PROJECT_STORAGE.theme
        );


    if (savedTheme === "dark") {

        setDarkTheme(true);

    } else {

        setDarkTheme(false);

    }


    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {

    const isDark =
        body.classList.contains(
            "dark-theme"
        );


    setDarkTheme(!isDark);

}


/* =========================================================
   SET THEME
========================================================= */

function setDarkTheme(isDark) {

    if (isDark) {

        body.classList.add(
            "dark-theme"
        );

        localStorage.setItem(
            PROJECT_STORAGE.theme,
            "dark"
        );

    } else {

        body.classList.remove(
            "dark-theme"
        );

        localStorage.setItem(
            PROJECT_STORAGE.theme,
            "light"
        );

    }


    updateThemeIcon(isDark);

}


/* =========================================================
   UPDATE THEME ICON
========================================================= */

function updateThemeIcon(isDark) {

    if (!themeToggle) {
        return;
    }


    const icon =
        themeToggle.querySelector(
            "i"
        );


    if (!icon) {
        return;
    }


    if (isDark) {

        icon.className =
            "fa-solid fa-sun";


        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );


        themeToggle.setAttribute(
            "title",
            "Light Mode"
        );

    } else {

        icon.className =
            "fa-solid fa-moon";


        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );


        themeToggle.setAttribute(
            "title",
            "Dark Mode"
        );

    }

}


/* =========================================================
   05. SIDEBAR
========================================================= */

function initSidebar() {

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            openSidebar
        );

    }


    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth <=
                        768
                    ) {

                        closeSidebar();

                    }

                }
            );

        });


    window.addEventListener(
        "resize",
        handleResize
    );

}


/* =========================================================
   OPEN SIDEBAR
========================================================= */

function openSidebar() {

    if (!sidebar) {
        return;
    }


    sidebar.classList.add(
        "open"
    );


    if (sidebarOverlay) {

        sidebarOverlay.classList.add(
            "active"
        );

    }


    updateBodyScroll();

}


/* =========================================================
   CLOSE SIDEBAR
========================================================= */

function closeSidebar() {

    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.classList.remove(
            "active"
        );

    }


    updateBodyScroll();

}


/* =========================================================
   RESIZE HANDLER
========================================================= */

function handleResize() {

    if (
        window.innerWidth > 768 &&
        sidebar
    ) {

        sidebar.classList.remove(
            "open"
        );


        if (sidebarOverlay) {

            sidebarOverlay.classList.remove(
                "active"
            );

        }

    }


    updateBodyScroll();

}


/* =========================================================
   BODY SCROLL CONTROL
========================================================= */

function updateBodyScroll() {

    const sidebarOpen =
        sidebar &&
        sidebar.classList.contains(
            "open"
        );


    const modalOpen =
        projectModal &&
        projectModal.classList.contains(
            "active"
        );


    document.body.style.overflow =
        sidebarOpen || modalOpen
            ? "hidden"
            : "";

}


/* =========================================================
   06. SEARCH
========================================================= */

function initSearch() {

    if (!projectSearch) {
        return;
    }


    projectSearch.addEventListener(
        "input",
        filterProjects
    );

}


/* =========================================================
   07. FILTER
========================================================= */

function initFilter() {

    if (!projectFilter) {
        return;
    }


    projectFilter.addEventListener(
        "change",
        filterProjects
    );

}


/* =========================================================
   FILTER PROJECTS
========================================================= */

function filterProjects() {

    if (!projectsGrid) {
        return;
    }


    const searchTerm =
        projectSearch
            ? projectSearch.value
                .trim()
                .toLowerCase()
            : "";


    const selectedStatus =
        projectFilter
            ? projectFilter.value
            : "all";


    const cards =
        projectsGrid.querySelectorAll(
            ".project-card"
        );


    let visibleCount = 0;


    cards.forEach(
        card => {

            const title =
                (
                    card.dataset.title ||
                    ""
                ).toLowerCase();


            const category =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            const status =
                (
                    card.dataset.status ||
                    ""
                ).toLowerCase();


            const text =
                card.textContent
                    .toLowerCase();


            const matchesSearch =
                !searchTerm ||
                title.includes(
                    searchTerm
                ) ||
                category.includes(
                    searchTerm
                ) ||
                text.includes(
                    searchTerm
                );


            const matchesFilter =
                selectedStatus === "all" ||
                status === selectedStatus;


            const visible =
                matchesSearch &&
                matchesFilter;


            if (visible) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    updateEmptyState(
        visibleCount === 0
    );

}


/* =========================================================
   EMPTY STATE
========================================================= */

function updateEmptyState(
    show
) {

    if (!emptyState) {
        return;
    }


    emptyState.hidden =
        !show;

}


/* =========================================================
   08. PROJECT STATISTICS
========================================================= */

function initStatistics() {

    updateProjectStats();

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateProjectStats() {

    if (!projectsGrid) {
        return;
    }


    const cards =
        projectsGrid.querySelectorAll(
            ".project-card"
        );


    let total = 0;
    let completed = 0;
    let progress = 0;
    let planning = 0;


    cards.forEach(
        card => {

            total++;


            switch (
                card.dataset.status
            ) {

                case "completed":

                    completed++;

                    break;


                case "progress":

                    progress++;

                    break;


                case "planning":

                    planning++;

                    break;

            }

        }
    );


    setStat(
        "totalProjects",
        total
    );


    setStat(
        "completedProjects",
        completed
    );


    setStat(
        "progressProjects",
        progress
    );


    setStat(
        "planningProjects",
        planning
    );

}


/* =========================================================
   SET STAT
========================================================= */

function setStat(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   09. PROJECT MODAL
========================================================= */

function initProjectModal() {

    const buttons =
        document.querySelectorAll(
            ".project-btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const name =
                        button.dataset.project ||
                        "Project";


                    openProjectModal(
                        name
                    );

                }
            );

        }
    );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (projectModal) {

        const overlay =
            projectModal.querySelector(
                ".modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeProjectModal
            );

        }

    }

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openProjectModal(
    projectName
) {

    if (!projectModal) {
        return;
    }


    if (modalTitle) {

        modalTitle.textContent =
            projectName;

    }


    if (modalDescription) {

        modalDescription.textContent =
            `${projectName} को विस्तृत जानकारी तथा project details यहाँ उपलब्ध हुनेछ।`;

    }


    projectModal.classList.add(
        "active"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    updateBodyScroll();


    if (modalClose) {

        window.setTimeout(
            () => {

                modalClose.focus();

            },
            50
        );

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.classList.remove(
        "active"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    updateBodyScroll();

}


/* =========================================================
   10. DATE & TIME
========================================================= */

function initDateTime() {

    const datetime =
        document.getElementById(
            "datetime"
        );


    if (!datetime) {
        return;
    }


    const text =
        datetime.querySelector(
            "span"
        );


    if (!text) {
        return;
    }


    updateDateTime(text);


    if (dateTimeInterval) {

        clearInterval(
            dateTimeInterval
        );

    }


    dateTimeInterval =
        window.setInterval(
            () => {

                updateDateTime(
                    text
                );

            },
            1000
        );

}


/* =========================================================
   UPDATE DATE TIME
========================================================= */

function updateDateTime(
    element
) {

    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );


    const time =
        now.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    element.textContent =
        `${date} • ${time}`;

}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }

}


/* =========================================================
   12. LOGOUT
========================================================= */

function initLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (!logoutBtn) {
        return;
    }


    logoutBtn.addEventListener(
        "click",
        handleLogout
    );

}


/* =========================================================
   LOGOUT HANDLER
========================================================= */

function handleLogout() {

    const confirmed =
        window.confirm(
            "के तपाईं Logout गर्न चाहनुहुन्छ?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "bariwayUser"
    );


    localStorage.removeItem(
        "user"
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   13. NOTIFICATION
========================================================= */

function initNotification() {

    const button =
        document.getElementById(
            "notificationBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            showToast(
                "हाल कुनै नयाँ notification छैन।",
                "fa-bell"
            );

        }
    );

}


/* =========================================================
   14. ADD PROJECT
========================================================= */

function initAddProject() {

    const button =
        document.getElementById(
            "addProjectBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            showToast(
                "Add Project feature चाँडै उपलब्ध हुनेछ।",
                "fa-plus"
            );

        }
    );

}


/* =========================================================
   15. TOAST
========================================================= */

function showToast(
    message,
    iconName = "fa-info"
) {

    const oldToast =
        document.querySelector(
            ".project-toast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "project-toast";


    const icon =
        document.createElement(
            "i"
        );


    icon.className =
        `fa-solid ${iconName}`;


    const text =
        document.createElement(
            "span"
        );


    text.textContent =
        message;


    toast.appendChild(
        icon
    );


    toast.appendChild(
        text
    );


    Object.assign(
        toast.style,
        {
            position: "fixed",
            right: "22px",
            bottom: "22px",
            zIndex: "3000",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "13px 17px",
            borderRadius: "10px",
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
            fontSize: "12px",
            opacity: "0",
            transform: "translateY(10px)",
            transition: "opacity .25s ease, transform .25s ease"
        }
    );


    document.body.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.style.opacity =
                "1";

            toast.style.transform =
                "translateY(0)";

        }
    );


    window.setTimeout(
        () => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateY(10px)";


            window.setTimeout(
                () => {

                    if (
                        toast.parentNode
                    ) {

                        toast.remove();

                    }

                },
                250
            );

        },
        2500
    );

}


/* =========================================================
   16. KEYBOARD SHORTCUTS
========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            const active =
                document.activeElement;


            const tag =
                active &&
                active.tagName
                    ? active.tagName.toUpperCase()
                    : "";


            /*
             * Escape
             */

            if (
                event.key === "Escape"
            ) {

                if (
                    projectModal &&
                    projectModal.classList.contains(
                        "active"
                    )
                ) {

                    closeProjectModal();

                    return;

                }


                if (
                    sidebar &&
                    sidebar.classList.contains(
                        "open"
                    )
                ) {

                    closeSidebar();

                    return;

                }

            }


            /*
             * Ctrl + K / Cmd + K
             */

            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (projectSearch) {

                    projectSearch.focus();

                    projectSearch.select();

                }

                return;

            }


            /*
             * "/" Search Shortcut
             */

            if (
                event.key === "/" &&
                tag !== "INPUT" &&
                tag !== "TEXTAREA" &&
                tag !== "SELECT"
            ) {

                event.preventDefault();


                if (projectSearch) {

                    projectSearch.focus();

                }

            }

        }
    );

}


/* =========================================================
   17. PUBLIC HELPERS
========================================================= */

function resetProjectView() {

    if (projectSearch) {

        projectSearch.value = "";

    }


    if (projectFilter) {

        projectFilter.value =
            "all";

    }


    filterProjects();

}


window.BARIWAYProjects = {

    filterProjects,
    updateProjectStats,
    resetProjectView,
    openProjectModal,
    closeProjectModal,
    setDarkTheme

};


/* =========================================================
   18. FINAL SAFETY
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (dateTimeInterval) {

            clearInterval(
                dateTimeInterval
            );

        }

    }
);


/* =========================================================
   END OF project.js v2.0 FINAL
========================================================= */