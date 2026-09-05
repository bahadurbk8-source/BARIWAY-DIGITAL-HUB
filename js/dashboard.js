/* =========================================================
   BARIWAY DIGITAL HUB
   PROFESSIONAL DASHBOARD
   dashboard.js v5.2 FINAL STABLE

   Features:
   • User / Profile Integration
   • LocalStorage
   • Dark / Light Theme
   • Nepali / English Language
   • Nepal Date & Time
   • Dynamic Statistics
   • Chart.js
   • Project Chart
   • Search
   • Mobile Sidebar
   • Profile Photo
   • Notifications Integration
   • Navigation
   • Quick Actions
   • Logout
   • Same-tab Data Sync
   • Cross-tab Storage Sync
   • Keyboard Shortcuts
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const DASHBOARD_CONFIG = {

    storage: {
        user: "bariwayUser",
        legacyUser: "user",
        theme: "bariwayTheme",
        language: "bariwayLanguage",
        profilePhoto: "bariwayProfilePhoto",
        projects: "bariwayProjects",
        clients: "bariwayClients",
        services: "bariwayServices",
        notifications: "bariwayNotifications"
    },

    defaultStats: {
        projects: 24,
        clients: 58,
        services: 36,
        success: 98
    },

    chart: {
        labels: [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ],

        data: [
            3, 5, 4, 7,
            6, 8, 10, 12,
            9, 11, 13, 15
        ]
    }

};


/* =========================================================
   GLOBAL STATE
========================================================= */

let projectChart = null;
let dateTimeInterval = null;
let dashboardInitialized = false;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initDashboard
);


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initDashboard() {

    if (dashboardInitialized) {
        return;
    }

    dashboardInitialized = true;

    try {
        initUser();
        initTheme();
        initLanguage();
        initSidebar();
        initSearch();
        initProfilePhoto();
        initDateTime();
        initStatistics();
        initProjectChart();
        initChartFilter();
        initQuickActions();
        initNavigation();
        initNotificationBridge();
        initLogout();
        initCurrentYear();
        initKeyboardShortcuts();
        initDataSync();

    } catch (error) {

        console.error(
            "BARIWAY: Dashboard initialization error.",
            error
        );

    } finally {

        finishDashboardLoading();

    }
}



/* =========================================================
   DOM HELPERS
========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


function query(selector) {
    return document.querySelector(selector);
}


function queryAll(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================================
   TEXT HELPER
========================================================= */

function setText(id, value) {

    const element = getElement(id);

    if (element) {
        element.textContent = value ?? "";
    }

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getStorage(key, fallback = null) {

    try {

        const value = localStorage.getItem(key);

        return value !== null
            ? value
            : fallback;

    } catch (error) {

        console.warn(
            "BARIWAY: LocalStorage read failed.",
            error
        );

        return fallback;

    }

}


function setStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            String(value)
        );

        return true;

    } catch (error) {

        console.warn(
            "BARIWAY: LocalStorage write failed.",
            error
        );

        return false;

    }

}


function removeStorage(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.warn(
            "BARIWAY: LocalStorage remove failed.",
            error
        );

        return false;

    }

}


/* =========================================================
   JSON STORAGE
========================================================= */

function getJSONStorage(
    key,
    fallback = null
) {

    const raw = getStorage(key, null);

    if (!raw) {
        return fallback;
    }

    try {

        return JSON.parse(raw);

    } catch (error) {

        console.warn(
            `BARIWAY: Invalid JSON in "${key}".`,
            error
        );

        return fallback;

    }

}


/* =========================================================
   USER MANAGEMENT
========================================================= */

function getStoredUser() {

    const currentUser = getJSONStorage(
        DASHBOARD_CONFIG.storage.user,
        null
    );

    if (
        currentUser &&
        typeof currentUser === "object"
    ) {

        return currentUser;

    }


    const legacyUser = getJSONStorage(
        DASHBOARD_CONFIG.storage.legacyUser,
        null
    );

    if (
        legacyUser &&
        typeof legacyUser === "object"
    ) {

        return legacyUser;

    }


    return null;

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (
        !user ||
        typeof user !== "object"
    ) {

        return "User";

    }


    return (
        user.name ||
        user.fullName ||
        user.username ||
        user.userName ||
        user.displayName ||
        "User"
    );

}


/* =========================================================
   USER EMAIL
========================================================= */

function getUserEmail(user) {

    if (
        !user ||
        typeof user !== "object"
    ) {

        return "No email available";

    }


    return (
        user.email ||
        user.emailAddress ||
        "No email available"
    );

}


/* =========================================================
   INITIALIZE USER
========================================================= */

function initUser() {

    const user = getStoredUser();

    const name = getUserName(user);

    const email = getUserEmail(user);


    setText(
        "username",
        name
    );

    setText(
        "sidebarUserName",
        name
    );

    setText(
        "profileName",
        name
    );

    setText(
        "adminName",
        name
    );

    setText(
        "profileEmail",
        email
    );

}


/* =========================================================
   THEME SYSTEM
========================================================= */

function initTheme() {

    const savedTheme = getStorage(
        DASHBOARD_CONFIG.storage.theme,
        "dark"
    );

    applyTheme(savedTheme);


    const buttons = queryAll(
        "#darkModeBtn, #themeToggle, .dark-btn"
    );


    buttons.forEach(function (button) {

        if (
            button.dataset.themeBound === "true"
        ) {
            return;
        }


        button.dataset.themeBound = "true";


        button.addEventListener(
            "click",
            toggleTheme
        );

    });

}


/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(theme) {

    const normalized =
        theme === "light"
            ? "light"
            : "dark";


    document.body.classList.toggle(
        "light",
        normalized === "light"
    );


    setStorage(
        DASHBOARD_CONFIG.storage.theme,
        normalized
    );


    updateThemeIcons();


    if (projectChart) {
        updateChartTheme();
    }

}


/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {

    const isLight =
        document.body.classList.contains(
            "light"
        );


    applyTheme(
        isLight
            ? "dark"
            : "light"
    );

}


/* =========================================================
   UPDATE THEME ICONS
========================================================= */

function updateThemeIcons() {

    const buttons = queryAll(
        "#darkModeBtn, #themeToggle, .dark-btn"
    );


    const isLight =
        document.body.classList.contains(
            "light"
        );


    buttons.forEach(function (button) {

        const icon =
            button.querySelector("i");


        if (icon) {

            icon.classList.toggle(
                "fa-moon",
                !isLight
            );

            icon.classList.toggle(
                "fa-sun",
                isLight
            );

        }


        button.title =
            isLight
                ? "Dark Mode"
                : "Light Mode";


        button.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    });

}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function initLanguage() {

    const savedLanguage = getStorage(
        DASHBOARD_CONFIG.storage.language,
        "ne"
    );


    applyLanguage(savedLanguage);


    const languageBtn =
        getElement("languageBtn");

    const languageMenu =
        getElement("languageMenu");


    if (
        !languageBtn ||
        !languageMenu
    ) {

        return;

    }


    if (
        languageBtn.dataset.languageBound === "true"
    ) {

        return;

    }


    languageBtn.dataset.languageBound =
        "true";


    languageBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const isOpen =
                languageMenu.classList.toggle(
                    "show"
                );


            languageBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    languageMenu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        closeLanguageMenu
    );

}


/* =========================================================
   CLOSE LANGUAGE MENU
========================================================= */

function closeLanguageMenu() {

    const menu =
        getElement("languageMenu");

    const button =
        getElement("languageBtn");


    if (menu) {

        menu.classList.remove("show");

    }


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(language) {

    if (
        language !== "ne" &&
        language !== "en"
    ) {

        return;

    }


    setStorage(
        DASHBOARD_CONFIG.storage.language,
        language
    );


    applyLanguage(language);

    closeLanguageMenu();


    if (
        window.BariwayNotifications &&
        typeof window.BariwayNotifications.setLanguage ===
        "function"
    ) {

        try {

            window.BariwayNotifications.setLanguage(
                language
            );

        } catch (error) {

            console.warn(
                "BARIWAY: Notification language sync failed.",
                error
            );

        }

    }


    dispatchDataEvent(
        "bariwayLanguageChanged",
        {
            language
        }
    );

}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage(language) {

    const currentLanguage =
        language === "en"
            ? "en"
            : "ne";


    setStorage(
        DASHBOARD_CONFIG.storage.language,
        currentLanguage
    );


    setText(
        "languageText",
        currentLanguage === "en"
            ? "English"
            : "नेपाली"
    );


    const translatedElements =
        queryAll(
            "[data-ne][data-en]"
        );


    translatedElements.forEach(
        function (element) {

            const value =
                currentLanguage === "en"
                    ? element.getAttribute("data-en")
                    : element.getAttribute("data-ne");


            if (value !== null) {

                element.textContent =
                    value;

            }

        }
    );


    const searchInput =
        getElement("searchInput");


    if (searchInput) {

        searchInput.placeholder =
            currentLanguage === "en"
                ? "Search..."
                : "खोज्नुहोस्...";

    }


    updateStatisticLabels(
        currentLanguage
    );


    updateDashboardStaticLanguage(
        currentLanguage
    );


    dispatchDataEvent(
        "bariwayLanguageChanged",
        {
            language: currentLanguage
        }
    );

}


/* =========================================================
   DASHBOARD LANGUAGE LABELS
========================================================= */

function updateStatisticLabels(language) {

    const labels = {

        ne: {
            projects: "परियोजनाहरू",
            clients: "ग्राहकहरू",
            services: "सेवाहरू",
            success: "सफलता दर"
        },

        en: {
            projects: "Projects",
            clients: "Clients",
            services: "Services",
            success: "Success Rate"
        }

    };


    const current =
        labels[language] || labels.ne;


    queryAll(".stat-card").forEach(
        function (card) {

            const paragraph =
                card.querySelector("p");


            if (!paragraph) {
                return;
            }


            if (
                card.classList.contains(
                    "projects-card"
                )
            ) {

                paragraph.textContent =
                    current.projects;

            }


            if (
                card.classList.contains(
                    "clients-card"
                )
            ) {

                paragraph.textContent =
                    current.clients;

            }


            if (
                card.classList.contains(
                    "services-card"
                )
            ) {

                paragraph.textContent =
                    current.services;

            }


            if (
                card.classList.contains(
                    "success-card"
                )
            ) {

                paragraph.textContent =
                    current.success;

            }

        }
    );

}


/* =========================================================
   STATIC DASHBOARD LANGUAGE
========================================================= */

function updateDashboardStaticLanguage(language) {

    const isEnglish =
        language === "en";


    const quickTitle =
        getElement("quickAccessTitle");


    if (quickTitle) {

        quickTitle.textContent =
            isEnglish
                ? "⚡ Quick Access"
                : "⚡ द्रुत पहुँच";

    }


    const welcomeText =
        getElement("welcomeText");


    if (welcomeText) {

        welcomeText.textContent =
            isEnglish
                ? "Welcome to your Professional Dashboard. Manage your work and projects from here."
                : "तपाईंको Professional Dashboard मा स्वागत छ। आजको काम र Project हरू यहाँबाट व्यवस्थापन गर्नुहोस्।";

    }


    const currentUser =
        getStoredUser();


    const name =
        getUserName(currentUser);


    const welcomeUser =
        getElement("username");


    if (welcomeUser) {
        welcomeUser.textContent = name;
    }

}


/* =========================================================
   SIDEBAR
========================================================= */

function initSidebar() {

    const menuBtn =
        getElement("menuBtn");

    const sidebar =
        getElement("sidebar");


    if (
        !menuBtn ||
        !sidebar
    ) {

        return;

    }


    if (
        menuBtn.dataset.sidebarBound === "true"
    ) {

        return;

    }


    menuBtn.dataset.sidebarBound =
        "true";


    menuBtn.addEventListener(
        "click",
        function () {

            const isOpen =
                sidebar.classList.toggle(
                    "active"
                );


            updateMenuButton(isOpen);

        }
    );


    sidebar
        .querySelectorAll(
            ".sidebar-menu a"
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 700
                    ) {

                        closeSidebar();

                    }

                }
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth > 700
            ) {
                return;
            }


            if (
                !sidebar.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                sidebar.contains(event.target) ||
                menuBtn.contains(event.target)
            ) {
                return;
            }


            closeSidebar();

        }
    );

}


/* =========================================================
   CLOSE SIDEBAR
========================================================= */

function closeSidebar() {

    const sidebar =
        getElement("sidebar");


    if (sidebar) {

        sidebar.classList.remove(
            "active"
        );

    }


    updateMenuButton(false);

}


/* =========================================================
   MENU BUTTON
========================================================= */

function updateMenuButton(isOpen) {

    const menuBtn =
        getElement("menuBtn");


    if (!menuBtn) {
        return;
    }


    const icon =
        menuBtn.querySelector("i");


    if (icon) {

        icon.classList.toggle(
            "fa-bars",
            !isOpen
        );

        icon.classList.toggle(
            "fa-xmark",
            isOpen
        );

    }


    menuBtn.setAttribute(
        "aria-label",
        isOpen
            ? "Close Menu"
            : "Open Menu"
    );

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const searchInput =
        getElement("searchInput");


    if (!searchInput) {
        return;
    }


    if (
        searchInput.dataset.searchBound === "true"
    ) {
        return;
    }


    searchInput.dataset.searchBound =
        "true";


    searchInput.addEventListener(
        "input",
        function () {

            searchDashboard(
                searchInput.value
                    .trim()
                    .toLowerCase()
            );

        }
    );


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                searchInput.value = "";

                searchDashboard("");

                searchInput.blur();

            }

        }
    );

}


/* =========================================================
   DASHBOARD SEARCH
========================================================= */

function searchDashboard(queryText) {

    const items =
        queryAll(
            ".quick-card, " +
            ".project-item, " +
            ".activity-item, " +
            ".notification-item, " +
            ".progress-item"
        );


    items.forEach(function (item) {

        const text =
            item.textContent
                .toLowerCase();


        const visible =
            !queryText ||
            text.includes(queryText);


        item.style.display =
            visible
                ? ""
                : "none";

    });

}


/* =========================================================
   PROFILE PHOTO
========================================================= */

function initProfilePhoto() {

    loadProfilePhoto();


    const photoInput =
        getElement("photoInput");


    if (!photoInput) {
        return;
    }


    if (
        photoInput.dataset.photoBound === "true"
    ) {
        return;
    }


    photoInput.dataset.photoBound =
        "true";


    photoInput.addEventListener(
        "change",
        handleProfilePhoto
    );

}


/* =========================================================
   LOAD PROFILE PHOTO
========================================================= */

function loadProfilePhoto() {

    const photo =
        getStorage(
            DASHBOARD_CONFIG.storage.profilePhoto,
            null
        );


    if (photo) {

        setProfileImages(photo);

    }

}


/* =========================================================
   HANDLE PROFILE PHOTO
========================================================= */

function handleProfilePhoto(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    if (
        !file.type ||
        !file.type.startsWith("image/")
    ) {

        alert(
            "Please select a valid image file."
        );

        event.target.value = "";

        return;

    }


    const maxSize =
        5 * 1024 * 1024;


    if (file.size > maxSize) {

        alert(
            "Please select an image smaller than 5 MB."
        );

        event.target.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function () {

        const imageData =
            reader.result;


        if (
            typeof imageData !== "string"
        ) {
            return;
        }


        const saved =
            setStorage(
                DASHBOARD_CONFIG.storage.profilePhoto,
                imageData
            );


        if (!saved) {

            alert(
                "Unable to save profile photo."
            );

            return;

        }


        setProfileImages(
            imageData
        );


        addProfilePhotoNotification();

    };


    reader.onerror = function () {

        alert(
            "Unable to read the selected image."
        );

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   SET PROFILE IMAGES
========================================================= */

function setProfileImages(imageData) {

    if (!imageData) {
        return;
    }


    const profilePhoto =
        getElement("profilePhoto");


    const sidebarPhoto =
        getElement("sidebarProfilePhoto");


    if (profilePhoto) {

        profilePhoto.src =
            imageData;

    }


    if (sidebarPhoto) {

        sidebarPhoto.src =
            imageData;

    }

}


/* =========================================================
   PROFILE PHOTO NOTIFICATION
========================================================= */

function addProfilePhotoNotification() {

    if (
        typeof window.addBariwayNotification !==
        "function"
    ) {
        return;
    }


    try {

        window.addBariwayNotification({

            type: "profile",

            icon:
                "fa-solid fa-camera",

            titleNe:
                "Profile Photo अपडेट भयो",

            titleEn:
                "Profile Photo Updated",

            messageNe:
                "तपाईंको Profile Photo सफलतापूर्वक परिवर्तन भयो।",

            messageEn:
                "Your profile photo has been updated successfully."

        });

    } catch (error) {

        console.warn(
            "BARIWAY: Profile notification failed.",
            error
        );

    }

}


/* =========================================================
   DATE & TIME
========================================================= */

function initDateTime() {

    if (dateTimeInterval) {

        clearInterval(
            dateTimeInterval
        );

    }


    updateDateTime();


    dateTimeInterval =
        window.setInterval(
            updateDateTime,
            1000
        );

}


/* =========================================================
   UPDATE DATE & TIME
========================================================= */

function updateDateTime() {

    const dateElement =
        getElement("currentDate");


    const timeElement =
        getElement("currentTime");


    if (
        !dateElement ||
        !timeElement
    ) {
        return;
    }


    const now =
        new Date();


    const language =
        getStorage(
            DASHBOARD_CONFIG.storage.language,
            "ne"
        );


    let nepaliDate;


    try {

        nepaliDate =
            new Intl.DateTimeFormat(
                "ne-NP-u-ca-bikram",
                {
                    timeZone:
                        "Asia/Kathmandu",

                    weekday:
                        "long",

                    year:
                        "numeric",

                    month:
                        "long",

                    day:
                        "numeric"
                }
            ).format(now);

    } catch (error) {

        nepaliDate =
            new Intl.DateTimeFormat(
                "ne-NP",
                {
                    timeZone:
                        "Asia/Kathmandu",

                    dateStyle:
                        "full"
                }
            ).format(now);

    }


    let englishDate;


    try {

        englishDate =
            new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone:
                        "Asia/Kathmandu",

                    weekday:
                        "long",

                    year:
                        "numeric",

                    month:
                        "long",

                    day:
                        "numeric"
                }
            ).format(now);

    } catch (error) {

        englishDate =
            now.toLocaleDateString(
                "en-US"
            );

    }


    let time;


    try {

        time =
            new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone:
                        "Asia/Kathmandu",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit",

                    second:
                        "2-digit",

                    hour12:
                        true
                }
            ).format(now);

    } catch (error) {

        time =
            now.toLocaleTimeString(
                "en-US"
            );

    }


    dateElement.textContent =
        "📅 " +
        (
            language === "en"
                ? englishDate
                : nepaliDate
        );


    timeElement.textContent =
        "🕐 " + time;

}


/* =========================================================
   STATISTICS
========================================================= */

function initStatistics() {

    updateDashboardStatistics();

}


/* =========================================================
   DATA COUNT
========================================================= */

function getDataCount(
    storageKey,
    fallback
) {

    const data =
        getJSONStorage(
            storageKey,
            null
        );


    if (!Array.isArray(data)) {

        return fallback;

    }


    return data.length;

}


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

function updateDashboardStatistics() {

    const projects =
        getDataCount(
            DASHBOARD_CONFIG.storage.projects,
            DASHBOARD_CONFIG.defaultStats.projects
        );


    const clients =
        getDataCount(
            DASHBOARD_CONFIG.storage.clients,
            DASHBOARD_CONFIG.defaultStats.clients
        );


    const services =
        getDataCount(
            DASHBOARD_CONFIG.storage.services,
            DASHBOARD_CONFIG.defaultStats.services
        );


    setText(
        "projectCount",
        projects
    );


    setText(
        "clientCount",
        clients
    );


    setText(
        "serviceCount",
        services
    );


    setText(
        "successCount",
        DASHBOARD_CONFIG.defaultStats.success + "%"
    );


    updateProjectChartData();

}


/* =========================================================
   PROJECT CHART
========================================================= */

function initProjectChart() {

    const canvas =
        getElement("projectChart");


    if (!canvas) {
        return;
    }


    if (
        typeof Chart === "undefined"
    ) {

        console.warn(
            "BARIWAY: Chart.js is not loaded."
        );

        return;

    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
        return;
    }


    if (projectChart) {

        try {
            projectChart.destroy();
        } catch (error) {
            console.warn(
                "BARIWAY: Chart destroy failed.",
                error
            );
        }

        projectChart = null;

    }


    const isLight =
        document.body.classList.contains(
            "light"
        );


    const textColor =
        isLight
            ? "#475569"
            : "#e5e7eb";


    const gridColor =
        isLight
            ? "rgba(100,116,139,0.12)"
            : "rgba(255,255,255,0.08)";


    try {

        projectChart =
            new Chart(
                ctx,
                {

                    type: "line",

                    data: {

                        labels: [
                            ...DASHBOARD_CONFIG.chart.labels
                        ],

                        datasets: [

                            {

                                label:
                                    "Projects",

                                data: [
                                    ...DASHBOARD_CONFIG.chart.data
                                ],

                                tension:
                                    0.4,

                                fill:
                                    true,

                                borderWidth:
                                    3,

                                pointRadius:
                                    4,

                                pointHoverRadius:
                                    6

                            }

                        ]

                    },


                    options: {

                        responsive:
                            true,

                        maintainAspectRatio:
                            false,

                        interaction: {

                            intersect:
                                false,

                            mode:
                                "index"

                        },

                        plugins: {

                            legend: {

                                display:
                                    false

                            },

                            tooltip: {

                                enabled:
                                    true

                            }

                        },

                        scales: {

                            x: {

                                grid: {

                                    display:
                                        false

                                },

                                ticks: {

                                    color:
                                        textColor

                                }

                            },

                            y: {

                                beginAtZero:
                                    true,

                                ticks: {

                                    precision:
                                        0,

                                    color:
                                        textColor

                                },

                                grid: {

                                    color:
                                        gridColor

                                }

                            }

                        }

                    }

                }
            );


        updateProjectChartData();

    } catch (error) {

        console.error(
            "BARIWAY: Chart initialization failed.",
            error
        );

        projectChart = null;

    }

}


/* =========================================================
   UPDATE PROJECT CHART DATA
========================================================= */

function updateProjectChartData() {

    if (!projectChart) {
        return;
    }


    const projects =
        getJSONStorage(
            DASHBOARD_CONFIG.storage.projects,
            null
        );


    if (
        !Array.isArray(projects) ||
        projects.length === 0
    ) {

        return;

    }


    const monthlyData =
        new Array(12).fill(0);


    let validDateCount = 0;


    projects.forEach(
        function (project) {

            if (
                !project ||
                typeof project !== "object"
            ) {
                return;
            }


            const possibleDate =
                project.createdAt ||
                project.createdDate ||
                project.date ||
                project.startDate;


            if (!possibleDate) {
                return;
            }


            const date =
                new Date(
                    possibleDate
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {
                return;
            }


            monthlyData[
                date.getMonth()
            ]++;


            validDateCount++;

        }
    );


    if (
        validDateCount === 0
    ) {
        return;
    }


    projectChart
        .data
        .datasets[0]
        .data =
        monthlyData;


    projectChart.update(
        "none"
    );

}


/* =========================================================
   CHART THEME
========================================================= */

function updateChartTheme() {

    if (!projectChart) {
        return;
    }


    const isLight =
        document.body.classList.contains(
            "light"
        );


    const textColor =
        isLight
            ? "#475569"
            : "#e5e7eb";


    const gridColor =
        isLight
            ? "rgba(100,116,139,0.12)"
            : "rgba(255,255,255,0.08)";


    if (
        projectChart.options.scales.x
    ) {

        projectChart
            .options
            .scales
            .x
            .ticks
            .color =
            textColor;

    }


    if (
        projectChart.options.scales.y
    ) {

        projectChart
            .options
            .scales
            .y
            .ticks
            .color =
            textColor;


        projectChart
            .options
            .scales
            .y
            .grid
            .color =
            gridColor;

    }


    projectChart.update(
        "none"
    );

}


/* =========================================================
   CHART FILTER
========================================================= */

function initChartFilter() {

    const button =
        query(".chart-filter");


    if (!button) {
        return;
    }


    if (
        button.dataset.chartBound === "true"
    ) {
        return;
    }


    button.dataset.chartBound =
        "true";


    button.addEventListener(
        "click",
        function () {

            const language =
                getStorage(
                    DASHBOARD_CONFIG.storage.language,
                    "ne"
                );


            showDashboardToast(

                language === "en"
                    ? "This Year"
                    : "यो वर्ष",

                language === "en"
                    ? "Chart is showing yearly project data."
                    : "चार्टमा वार्षिक Project data देखाइएको छ।"

            );

        }
    );

}


/* =========================================================
   QUICK ACTIONS
========================================================= */

function initQuickActions() {

    queryAll(
        ".action-btn"
    ).forEach(function (button) {

        if (
            button.dataset.actionBound === "true"
        ) {
            return;
        }


        button.dataset.actionBound =
            "true";


        button.addEventListener(
            "click",
            function () {

                button.classList.add(
                    "clicked"
                );


                window.setTimeout(
                    function () {

                        button.classList.remove(
                            "clicked"
                        );

                    },
                    250
                );

            }
        );

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    queryAll(
        ".profile-btn"
    ).forEach(function (button) {

        if (
            button.hasAttribute("onclick")
        ) {
            return;
        }


        if (
            button.dataset.navigationBound ===
            "true"
        ) {
            return;
        }


        button.dataset.navigationBound =
            "true";


        button.addEventListener(
            "click",
            function () {

                window.location.href =
                    "profile.html";

            }
        );

    });


    const viewAll =
        query(".view-all");


    if (
        viewAll &&
        !viewAll.hasAttribute("href") &&
        viewAll.dataset.navigationBound !== "true"
    ) {

        viewAll.dataset.navigationBound =
            "true";


        viewAll.style.cursor =
            "pointer";


        viewAll.addEventListener(
            "click",
            function () {

                window.location.href =
                    "projects.html";

            }
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function initLogout() {

    /*
       Logout is connected through:
       onclick="logout()"
    */

}


function logout() {

    const language =
        getStorage(
            DASHBOARD_CONFIG.storage.language,
            "ne"
        );


    const message =
        language === "en"
            ? "Are you sure you want to logout?"
            : "के तपाईं Logout गर्न चाहनुहुन्छ?";


    if (
        !window.confirm(message)
    ) {
        return;
    }


    removeStorage(
        DASHBOARD_CONFIG.storage.user
    );


    removeStorage(
        DASHBOARD_CONFIG.storage.legacyUser
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const yearElement =
        getElement("currentYear");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   NOTIFICATION BRIDGE
========================================================= */

function initNotificationBridge() {

    window.addEventListener(
        "bariwayNotificationsUpdated",
        refreshNotificationBadge
    );


    refreshNotificationBadge();

}


/* =========================================================
   NOTIFICATION BADGE
========================================================= */

function refreshNotificationBadge() {

    const badge =
        getElement("notificationBadge");


    if (!badge) {
        return;
    }


    const notifications =
        getJSONStorage(
            DASHBOARD_CONFIG.storage.notifications,
            []
        );


    if (
        !Array.isArray(notifications)
    ) {

        badge.textContent =
            "0";

        return;

    }


    const unreadCount =
        notifications.filter(
            function (notification) {

                if (
                    !notification ||
                    typeof notification !== "object"
                ) {
                    return false;
                }


                return (
                    notification.read === false ||
                    notification.isRead === false ||
                    (
                        notification.read === undefined &&
                        notification.isRead === undefined
                    )
                );

            }
        ).length;


    badge.textContent =
        unreadCount > 99
            ? "99+"
            : String(unreadCount);

}


/* =========================================================
   DATA SYNCHRONIZATION
========================================================= */

function initDataSync() {

    window.addEventListener(
        "storage",
        function (event) {

            if (!event.key) {
                return;
            }


            const watchedKeys = [

                DASHBOARD_CONFIG.storage.projects,
                DASHBOARD_CONFIG.storage.clients,
                DASHBOARD_CONFIG.storage.services,
                DASHBOARD_CONFIG.storage.user,
                DASHBOARD_CONFIG.storage.profilePhoto,
                DASHBOARD_CONFIG.storage.theme,
                DASHBOARD_CONFIG.storage.language,
                DASHBOARD_CONFIG.storage.notifications

            ];


            if (
                !watchedKeys.includes(
                    event.key
                )
            ) {
                return;
            }


            switch (event.key) {

                case DASHBOARD_CONFIG.storage.projects:

                case DASHBOARD_CONFIG.storage.clients:

                case DASHBOARD_CONFIG.storage.services:

                    updateDashboardStatistics();

                    break;


                case DASHBOARD_CONFIG.storage.user:

                    initUser();

                    break;


                case DASHBOARD_CONFIG.storage.profilePhoto:

                    if (event.newValue) {

                        setProfileImages(
                            event.newValue
                        );

                    }

                    break;


                case DASHBOARD_CONFIG.storage.theme:

                    if (event.newValue) {

                        applyTheme(
                            event.newValue
                        );

                    }

                    break;


                case DASHBOARD_CONFIG.storage.language:

                    if (event.newValue) {

                        applyLanguage(
                            event.newValue
                        );

                    }

                    break;


                case DASHBOARD_CONFIG.storage.notifications:

                    refreshNotificationBadge();

                    break;

            }

        }
    );


    window.addEventListener(
        "bariwayDataUpdated",
        function () {

            updateDashboardStatistics();

            refreshNotificationBadge();

        }
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        function (event) {

            /*
               Ctrl + K / Cmd + K
            */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                const searchInput =
                    getElement("searchInput");


                if (searchInput) {

                    searchInput.focus();

                }

            }


            /*
               Escape
            */

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

                closeLanguageMenu();

                closeNotificationPanel();

            }

        }
    );

}


/* =========================================================
   CLOSE NOTIFICATION PANEL
========================================================= */

function closeNotificationPanel() {

    const panel =
        getElement("notificationPanel");


    const button =
        getElement("notificationBtn");


    if (panel) {

        panel.classList.remove(
            "show"
        );

    }


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   CUSTOM EVENT
========================================================= */

function dispatchDataEvent(
    eventName,
    detail = {}
) {

    try {

        window.dispatchEvent(
            new CustomEvent(
                eventName,
                {
                    detail
                }
            )
        );

    } catch (error) {

        console.warn(
            `BARIWAY: Unable to dispatch ${eventName}.`,
            error
        );

    }

}


/* =========================================================
   DASHBOARD TOAST
========================================================= */

function showDashboardToast(
    title,
    message
) {

    if (
        typeof window.showBariwayToast ===
        "function"
    ) {

        try {

            window.showBariwayToast(
                title,
                message
            );

            return;

        } catch (error) {

            console.warn(
                "BARIWAY: Central toast failed.",
                error
            );

        }

    }

}


/* =========================================================
   GLOBAL DASHBOARD API
========================================================= */

window.changeLanguage =
    changeLanguage;


window.logout =
    logout;


window.BariwayDashboard = {

    refresh: function () {

        initUser();
        updateDashboardStatistics();
        refreshNotificationBadge();

    },


    updateUser: function () {

        initUser();

    },


    updateTheme: function (theme) {

        applyTheme(theme);

    },


    updatePhoto: function (imageData) {

        if (imageData) {

            setProfileImages(
                imageData
            );

        }

    },


    updateStats: function () {

        updateDashboardStatistics();

    },


    refreshNotifications: function () {

        refreshNotificationBadge();

    }

};


/* =========================================================
   BEFORE PAGE UNLOAD
========================================================= */

window.addEventListener(
    "beforeunload",
    function () {

        if (dateTimeInterval) {

            clearInterval(
                dateTimeInterval
            );

            dateTimeInterval = null;

        }

    }
);


/* =========================================================
   END
   BARIWAY DIGITAL HUB
   dashboard.js v5.2 FINAL STABLE
========================================================= */