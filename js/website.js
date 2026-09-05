/* =========================================================
   BARIWAY DIGITAL HUB
   WEBSITE DEVELOPMENT MANAGEMENT
   website.js v2.1 FINAL STABLE
   ---------------------------------------------------------
   Features:
   • Website CRUD
   • Search
   • Filter
   • Sort
   • Grid / List View
   • Nepali / English
   • Dark / Light Mode
   • LocalStorage
   • Notifications
   • Export CSV
   • Mobile Sidebar
   • Profile Sync
   • Toast
   • Confirm Delete
   • Keyboard Shortcuts
   • Multi-tab Sync
   • Safe URL Handling
   • DOM Initialization Fixed
   ========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const STORAGE = {
    websites: "bariwayWebsites",
    theme: "bariwayTheme",
    language: "bariwayLanguage",
    user: "bariwayUser",
    profilePhoto: "bariwayProfilePhoto",
    notifications: "bariwayNotifications",
    view: "bariwayWebsiteView"
};


/* =========================================================
   DEFAULT WEBSITES
========================================================= */

const DEFAULT_WEBSITES = [
    {
        id: "web-001",
        name: "BARIWAY Digital Hub",
        client: "BARIWAY Digital Hub",
        category: "business",
        status: "completed",
        progress: 100,
        startDate: "2026-01-10",
        deadline: "2026-03-30",
        url: "https://example.com",
        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive"
        ],
        description:
            "A professional digital services and portfolio website for BARIWAY DIGITAL HUB.",
        createdAt: "2026-01-10T08:00:00"
    },

    {
        id: "web-002",
        name: "Municipality Service Portal",
        client: "Municipality Office",
        category: "business",
        status: "in-progress",
        progress: 65,
        startDate: "2026-04-01",
        deadline: "2026-09-30",
        url: "",
        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "PHP",
            "MySQL"
        ],
        description:
            "Online municipal service management and information portal.",
        createdAt: "2026-04-01T08:00:00"
    },

    {
        id: "web-003",
        name: "Creative Portfolio",
        client: "Creative Solutions",
        category: "portfolio",
        status: "planning",
        progress: 15,
        startDate: "2026-08-01",
        deadline: "2026-11-30",
        url: "",
        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        description:
            "Modern portfolio website for showcasing creative projects and services.",
        createdAt: "2026-08-01T08:00:00"
    }
];


/* =========================================================
   GLOBAL STATE
========================================================= */

let websites = [];
let currentLanguage = "ne";
let currentTheme = "light";
let currentView = "grid";
let editingWebsiteId = null;
let pendingDeleteId = null;
let toastTimer = null;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsiteApp
);


/* =========================================================
   INITIALIZE WEBSITE APP
========================================================= */

function initializeWebsiteApp() {

    try {

        loadWebsites();

        loadLanguage();

        loadTheme();

        loadView();

        loadUserProfile();

        bindEvents();

        updateLanguageUI();

        updateThemeUI();

        updateViewButtons();

        renderWebsites();

        updateStatistics();

        renderNotifications();

        updateNotificationBadge();

        console.log(
            "BARIWAY DIGITAL HUB | website.js v2.1 FINAL STABLE initialized."
        );

    } catch (error) {

        console.error(
            "Website application initialization error:",
            error
        );

    }

}


/* =========================================================
   LOAD WEBSITES
========================================================= */

function loadWebsites() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE.websites
            );

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {

                websites = parsed;

            } else {

                websites = [
                    ...DEFAULT_WEBSITES
                ];

                saveWebsites();

            }

        } else {

            websites = [
                ...DEFAULT_WEBSITES
            ];

            saveWebsites();

        }

    } catch (error) {

        console.error(
            "Website data loading error:",
            error
        );

        websites = [
            ...DEFAULT_WEBSITES
        ];

    }

}


/* =========================================================
   SAVE WEBSITES
========================================================= */

function saveWebsites() {

    try {

        localStorage.setItem(
            STORAGE.websites,
            JSON.stringify(websites)
        );

    } catch (error) {

        console.error(
            "Website data saving error:",
            error
        );

        showToast(
            currentLanguage === "ne"
                ? "वेबसाइट data सुरक्षित गर्न सकिएन।"
                : "Website data could not be saved.",
            "error"
        );

    }

}


/* =========================================================
   LOAD LANGUAGE
========================================================= */

function loadLanguage() {

    const savedLanguage =
        localStorage.getItem(
            STORAGE.language
        );

    if (
        savedLanguage === "ne" ||
        savedLanguage === "en"
    ) {

        currentLanguage =
            savedLanguage;

    } else {

        currentLanguage =
            "ne";

    }

}


/* =========================================================
   SAVE LANGUAGE
========================================================= */

function saveLanguage() {

    localStorage.setItem(
        STORAGE.language,
        currentLanguage
    );

}


/* =========================================================
   UPDATE LANGUAGE UI
========================================================= */

function updateLanguageUI() {

    document.documentElement.lang =
        currentLanguage === "ne"
            ? "ne"
            : "en";


    document
        .querySelectorAll(
            "[data-ne][data-en]"
        )
        .forEach(element => {

            const value =
                currentLanguage === "ne"
                    ? element.dataset.ne
                    : element.dataset.en;

            if (
                value !== undefined
            ) {

                element.textContent =
                    value;

            }

        });


    document
        .querySelectorAll(
            "[data-placeholder-ne][data-placeholder-en]"
        )
        .forEach(input => {

            input.placeholder =
                currentLanguage === "ne"
                    ? input.dataset.placeholderNe
                    : input.dataset.placeholderEn;

        });


    updateSelectOptions();


    const languageLabel =
        document.getElementById(
            "currentLanguage"
        );

    if (languageLabel) {

        languageLabel.textContent =
            currentLanguage === "ne"
                ? "नेपाली"
                : "English";

    }


    updateDynamicText();

}


/* =========================================================
   UPDATE SELECT OPTIONS
========================================================= */

function updateSelectOptions() {

    document
        .querySelectorAll(
            "option[data-ne][data-en]"
        )
        .forEach(option => {

            option.textContent =
                currentLanguage === "ne"
                    ? option.dataset.ne
                    : option.dataset.en;

        });

}


/* =========================================================
   TOGGLE LANGUAGE
========================================================= */

function toggleLanguage() {

    currentLanguage =
        currentLanguage === "ne"
            ? "en"
            : "ne";


    saveLanguage();

    updateLanguageUI();

    renderWebsites();

    renderNotifications();

    updateThemeUI();


    showToast(
        currentLanguage === "ne"
            ? "भाषा नेपालीमा परिवर्तन भयो।"
            : "Language changed to English.",
        "success"
    );

}


/* =========================================================
   LOAD THEME
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            STORAGE.theme
        );

    if (
        savedTheme === "dark" ||
        savedTheme === "light"
    ) {

        currentTheme =
            savedTheme;

    } else {

        currentTheme =
            "light";

    }

}


/* =========================================================
   SAVE THEME
========================================================= */

function saveTheme() {

    localStorage.setItem(
        STORAGE.theme,
        currentTheme
    );

}


/* =========================================================
   UPDATE THEME UI
========================================================= */

function updateThemeUI() {

    document.body.classList.toggle(
        "dark-mode",
        currentTheme === "dark"
    );


    const themeBtn =
        document.getElementById(
            "themeBtn"
        );


    if (!themeBtn) return;


    const icon =
        themeBtn.querySelector("i");


    if (!icon) return;


    if (
        currentTheme === "dark"
    ) {

        icon.className =
            "fa-solid fa-sun";


        themeBtn.setAttribute(
            "aria-label",
            currentLanguage === "ne"
                ? "लाइट मोड"
                : "Light mode"
        );

        themeBtn.setAttribute(
            "title",
            currentLanguage === "ne"
                ? "लाइट मोड"
                : "Light mode"
        );

    } else {

        icon.className =
            "fa-solid fa-moon";


        themeBtn.setAttribute(
            "aria-label",
            currentLanguage === "ne"
                ? "डार्क मोड"
                : "Dark mode"
        );

        themeBtn.setAttribute(
            "title",
            currentLanguage === "ne"
                ? "डार्क मोड"
                : "Dark mode"
        );

    }

}


/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {

    currentTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    saveTheme();

    updateThemeUI();


    showToast(
        currentTheme === "dark"
            ? (
                currentLanguage === "ne"
                    ? "डार्क मोड सक्रिय भयो।"
                    : "Dark mode enabled."
            )
            : (
                currentLanguage === "ne"
                    ? "लाइट मोड सक्रिय भयो।"
                    : "Light mode enabled."
            ),
        "success"
    );

}


/* =========================================================
   LOAD VIEW
========================================================= */

function loadView() {

    const saved =
        localStorage.getItem(
            STORAGE.view
        );


    if (
        saved === "grid" ||
        saved === "list"
    ) {

        currentView =
            saved;

    } else {

        currentView =
            "grid";

    }

}


/* =========================================================
   SET VIEW
========================================================= */

function setView(view) {

    currentView =
        view === "list"
            ? "list"
            : "grid";


    localStorage.setItem(
        STORAGE.view,
        currentView
    );


    updateViewButtons();

    renderWebsites();

}


/* =========================================================
   UPDATE VIEW BUTTONS
========================================================= */

function updateViewButtons() {

    const gridBtn =
        document.getElementById(
            "gridViewBtn"
        );

    const listBtn =
        document.getElementById(
            "listViewBtn"
        );


    gridBtn?.classList.toggle(
        "active",
        currentView === "grid"
    );


    listBtn?.classList.toggle(
        "active",
        currentView === "list"
    );

}


/* =========================================================
   LOAD USER PROFILE
========================================================= */

function loadUserProfile() {

    let user = null;


    try {

        const savedUser =
            localStorage.getItem(
                STORAGE.user
            );


        if (savedUser) {

            user =
                JSON.parse(
                    savedUser
                );

        }

    } catch (error) {

        console.warn(
            "User profile could not be loaded."
        );

    }


    const name =
        user?.name ||
        user?.username ||
        user?.fullName ||
        "टेकबहादुर बिक";


    const role =
        user?.role ||
        user?.plan ||
        "Premium Member";


    setText(
        "sidebarName",
        name
    );


    setText(
        "sidebarRole",
        role
    );


    const initials =
        getInitials(name);


    setText(
        "sidebarAvatar",
        initials
    );


    setText(
        "miniAvatar",
        initials
    );


    applyProfilePhoto();

}


/* =========================================================
   APPLY PROFILE PHOTO
========================================================= */

function applyProfilePhoto() {

    const photo =
        localStorage.getItem(
            STORAGE.profilePhoto
        );


    const avatars = [
        document.getElementById(
            "sidebarAvatar"
        ),
        document.getElementById(
            "miniAvatar"
        )
    ];


    avatars.forEach(
        avatar => {

            if (!avatar) return;


            if (photo) {

                avatar.style.backgroundImage =
                    `url("${photo}")`;

                avatar.style.backgroundSize =
                    "cover";

                avatar.style.backgroundPosition =
                    "center";

                avatar.style.backgroundRepeat =
                    "no-repeat";

                avatar.style.color =
                    "transparent";

                avatar.textContent =
                    "";

            } else {

                avatar.style.backgroundImage =
                    "";

                avatar.style.backgroundSize =
                    "";

                avatar.style.backgroundPosition =
                    "";

                avatar.style.color =
                    "";

            }

        }
    );

}


/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(name) {

    if (!name) return "TB";


    const clean =
        String(name)
            .trim()
            .split(/\s+/);


    if (
        clean.length === 1
    ) {

        return clean[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        clean[0].charAt(0) +
        clean[clean.length - 1].charAt(0)
    ).toUpperCase();

}


/* =========================================================
   EVENT BINDING
========================================================= */

function bindEvents() {

    /* -----------------------------------------
       Language
    ----------------------------------------- */

    bindClick(
        "languageBtn",
        toggleLanguage
    );


    /* -----------------------------------------
       Theme
    ----------------------------------------- */

    bindClick(
        "themeBtn",
        toggleTheme
    );


    /* -----------------------------------------
       Add Website
    ----------------------------------------- */

    bindClick(
        "addWebsiteBtn",
        openAddWebsiteModal
    );


    bindClick(
        "emptyAddWebsiteBtn",
        openAddWebsiteModal
    );


    /* -----------------------------------------
       Website Modal
    ----------------------------------------- */

    bindClick(
        "closeWebsiteModal",
        closeWebsiteModal
    );


    bindClick(
        "cancelWebsiteBtn",
        closeWebsiteModal
    );


    /* -----------------------------------------
       Website Form
    ----------------------------------------- */

    const form =
        document.getElementById(
            "websiteForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            handleWebsiteSubmit
        );

    }


    /* -----------------------------------------
       Website Search
    ----------------------------------------- */

    const search =
        document.getElementById(
            "websiteSearch"
        );


    if (search) {

        search.addEventListener(
            "input",
            handleSearch
        );

    }


    /* -----------------------------------------
       Global Search
    ----------------------------------------- */

    const globalSearch =
        document.getElementById(
            "globalWebsiteSearch"
        );


    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            handleGlobalSearch
        );

    }


    /* -----------------------------------------
       Status Filter
    ----------------------------------------- */

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderWebsites
        );

    }


    /* -----------------------------------------
       Sort
    ----------------------------------------- */

    const sort =
        document.getElementById(
            "sortWebsites"
        );


    if (sort) {

        sort.addEventListener(
            "change",
            renderWebsites
        );

    }


    /* -----------------------------------------
       View Buttons
    ----------------------------------------- */

    bindClick(
        "gridViewBtn",
        () => setView("grid")
    );


    bindClick(
        "listViewBtn",
        () => setView("list")
    );


    /* -----------------------------------------
       Export
    ----------------------------------------- */

    bindClick(
        "exportWebsitesBtn",
        exportWebsites
    );


    /* -----------------------------------------
       Notifications
    ----------------------------------------- */

    bindClick(
        "notificationBtn",
        toggleNotificationPanel
    );


    bindClick(
        "clearNotificationsBtn",
        clearNotifications
    );


    /* -----------------------------------------
       Confirm Delete
    ----------------------------------------- */

    bindClick(
        "confirmCancelBtn",
        closeConfirmModal
    );


    bindClick(
        "confirmDeleteBtn",
        confirmDeleteWebsite
    );


    /* -----------------------------------------
       Mobile Sidebar
    ----------------------------------------- */

    bindClick(
        "mobileMenuBtn",
        openMobileSidebar
    );


    bindClick(
        "sidebarOverlay",
        closeMobileSidebar
    );


    /* -----------------------------------------
       Logout
    ----------------------------------------- */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            handleLogout
        );

    }


    /* -----------------------------------------
       Progress Input
    ----------------------------------------- */

    const progressInput =
        document.getElementById(
            "websiteProgress"
        );


    if (progressInput) {

        progressInput.addEventListener(
            "input",
            () => {

                progressInput.value =
                    clampProgress(
                        progressInput.value
                    );

            }
        );

    }


    /* -----------------------------------------
       Keyboard
    ----------------------------------------- */

    document.addEventListener(
        "keydown",
        handleKeyboard
    );


    /* -----------------------------------------
       Outside Notification Click
    ----------------------------------------- */

    document.addEventListener(
        "click",
        handleOutsideClick
    );


    /* -----------------------------------------
       Modal Backdrop
    ----------------------------------------- */

    document.addEventListener(
        "click",
        handleModalBackdropClick
    );


    /* -----------------------------------------
       Mobile Navigation
    ----------------------------------------- */

    document.addEventListener(
        "click",
        handleMobileNavigation
    );

}


/* =========================================================
   BIND CLICK HELPER
========================================================= */

function bindClick(
    id,
    callback
) {

    const element =
        document.getElementById(id);


    if (!element) return;


    element.addEventListener(
        "click",
        callback
    );

}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch(event) {

    const global =
        document.getElementById(
            "globalWebsiteSearch"
        );


    if (global) {

        global.value =
            event.target.value;

    }


    renderWebsites();

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function handleGlobalSearch(event) {

    const local =
        document.getElementById(
            "websiteSearch"
        );


    if (local) {

        local.value =
            event.target.value;

    }


    renderWebsites();

}


/* =========================================================
   GET SEARCH TERM
========================================================= */

function getSearchTerm() {

    const local =
        document.getElementById(
            "websiteSearch"
        );


    const global =
        document.getElementById(
            "globalWebsiteSearch"
        );


    const value =
        local?.value ||
        global?.value ||
        "";


    return String(value)
        .trim()
        .toLowerCase();

}


/* =========================================================
   FILTER + SORT
========================================================= */

function getFilteredWebsites() {

    let result =
        [...websites];


    const search =
        getSearchTerm();


    const filter =
        document.getElementById(
            "statusFilter"
        )?.value ||
        "all";


    const sort =
        document.getElementById(
            "sortWebsites"
        )?.value ||
        "newest";


    /* -----------------------------------------
       Search
    ----------------------------------------- */

    if (search) {

        result =
            result.filter(
                site => {

                    const searchable = [

                        site.name,

                        site.client,

                        site.category,

                        site.status,

                        site.description,

                        ...(Array.isArray(
                            site.technologies
                        )
                            ? site.technologies
                            : [])

                    ]
                        .join(" ")
                        .toLowerCase();


                    return searchable.includes(
                        search
                    );

                }
            );

    }


    /* -----------------------------------------
       Status
    ----------------------------------------- */

    if (
        filter !== "all"
    ) {

        result =
            result.filter(
                site =>
                    site.status ===
                    filter
            );

    }


    /* -----------------------------------------
       Sort
    ----------------------------------------- */

    result.sort(
        (a, b) => {

            switch (sort) {

                case "oldest":

                    return (
                        new Date(
                            a.createdAt || 0
                        ) -
                        new Date(
                            b.createdAt || 0
                        )
                    );


                case "name":

                    return String(
                        a.name || ""
                    ).localeCompare(
                        String(
                            b.name || ""
                        ),
                        undefined,
                        {
                            sensitivity:
                                "base"
                        }
                    );


                case "progress":

                    return (
                        Number(
                            b.progress || 0
                        ) -
                        Number(
                            a.progress || 0
                        )
                    );


                case "newest":

                default:

                    return (
                        new Date(
                            b.createdAt || 0
                        ) -
                        new Date(
                            a.createdAt || 0
                        )
                    );

            }

        }
    );


    return result;

}


/* =========================================================
   RENDER WEBSITES
========================================================= */

function renderWebsites() {

    const container =
        document.getElementById(
            "websiteContainer"
        );


    const emptyState =
        document.getElementById(
            "websiteEmptyState"
        );


    if (!container) return;


    const filtered =
        getFilteredWebsites();


    container.innerHTML =
        "";


    if (
        filtered.length === 0
    ) {

        container.classList.remove(
            "list-view"
        );


        if (emptyState) {

            emptyState.hidden =
                false;

        }


        updateResultCount(0);

        return;

    }


    if (emptyState) {

        emptyState.hidden =
            true;

    }


    if (
        currentView === "list"
    ) {

        container.classList.add(
            "list-view"
        );

    } else {

        container.classList.remove(
            "list-view"
        );

    }


    filtered.forEach(
        (website, index) => {

            const card =
                createWebsiteCard(
                    website,
                    index
                );


            container.appendChild(
                card
            );

        }
    );


    updateResultCount(
        filtered.length
    );

}


/* =========================================================
   CREATE WEBSITE CARD
========================================================= */

function createWebsiteCard(
    website,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "website-card";


    card.dataset.id =
        website.id;


    card.style.animationDelay =
        `${index * 50}ms`;


    const status =
        getStatusInfo(
            website.status
        );


    const category =
        getCategoryName(
            website.category
        );


    const progress =
        clampProgress(
            website.progress
        );


    const technologies =
        Array.isArray(
            website.technologies
        )
            ? website.technologies
            : [];


    const techHTML =
        technologies.length
            ? technologies
                .slice(0, 5)
                .map(
                    tech =>
                        `<span class="tech-tag">${escapeHTML(
                            tech
                        )}</span>`
                )
                .join("")
            : `
                <span class="tech-tag">
                    HTML
                </span>
            `;


    const dateText =
        formatDate(
            website.deadline
        );


    const client =
        website.client ||
        (
            currentLanguage === "ne"
                ? "क्लाइन्ट छैन"
                : "No client"
        );


    const description =
        website.description ||
        (
            currentLanguage === "ne"
                ? "कुनै विवरण उपलब्ध छैन।"
                : "No description available."
        );


    const websiteUrl =
        website.url
            ? safeURL(
                website.url
            )
            : "";


    card.innerHTML = `

        <div class="website-card-top">

            <div class="website-card-icon">
                <i class="fa-solid fa-globe"></i>
            </div>

            <div class="website-status ${status.className}">

                <span class="status-dot"></span>

                ${escapeHTML(
                    status.label
                )}

            </div>

        </div>


        <div class="website-card-body">

            <h3 class="website-card-title">
                ${escapeHTML(
                    website.name
                )}
            </h3>


            <div class="website-client">

                <i class="fa-solid fa-user"></i>

                <span>
                    ${escapeHTML(
                        client
                    )}
                </span>

            </div>


            <div class="website-category">

                <i class="fa-solid fa-layer-group"></i>

                <span>
                    ${escapeHTML(
                        category
                    )}
                </span>

            </div>


            <p class="website-description">
                ${escapeHTML(
                    description
                )}
            </p>


            <div class="website-progress-section">

                <div class="progress-header">

                    <span>
                        ${
                            currentLanguage === "ne"
                                ? "प्रगति"
                                : "Progress"
                        }
                    </span>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="progress-track">

                    <div
                        class="progress-bar"
                        style="width:${progress}%">
                    </div>

                </div>

            </div>


            <div class="website-tech-list">

                ${techHTML}

            </div>


            <div class="website-meta">

                <div>

                    <i class="fa-solid fa-calendar-check"></i>

                    <span>
                        ${escapeHTML(
                            dateText
                        )}
                    </span>

                </div>


                ${
                    websiteUrl
                        ? `
                            <a
                                href="${websiteUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="website-link"
                                title="${
                                    currentLanguage === "ne"
                                        ? "वेबसाइट खोल्नुहोस्"
                                        : "Open website"
                                }">

                                <i class="fa-solid fa-arrow-up-right-from-square"></i>

                            </a>
                        `
                        : ""
                }

            </div>

        </div>


        <div class="website-card-actions">

            <button
                type="button"
                class="card-action edit-action"
                data-action="edit"
                data-id="${escapeAttribute(
                    website.id
                )}">

                <i class="fa-solid fa-pen"></i>

                <span>
                    ${
                        currentLanguage === "ne"
                            ? "सम्पादन"
                            : "Edit"
                    }
                </span>

            </button>


            <button
                type="button"
                class="card-action delete-action"
                data-action="delete"
                data-id="${escapeAttribute(
                    website.id
                )}">

                <i class="fa-solid fa-trash"></i>

                <span>
                    ${
                        currentLanguage === "ne"
                            ? "हटाउनुहोस्"
                            : "Delete"
                    }
                </span>

            </button>

        </div>

    `;


    card
        .querySelector(
            '[data-action="edit"]'
        )
        ?.addEventListener(
            "click",
            () =>
                openEditWebsiteModal(
                    website.id
                )
        );


    card
        .querySelector(
            '[data-action="delete"]'
        )
        ?.addEventListener(
            "click",
            () =>
                openConfirmModal(
                    website.id
                )
        );


    return card;

}


/* =========================================================
   STATUS INFO
========================================================= */

function getStatusInfo(status) {

    const data = {

        planning: {
            className:
                "status-planning",
            ne:
                "योजना",
            en:
                "Planning"
        },

        "in-progress": {
            className:
                "status-progress",
            ne:
                "निर्माण हुँदै",
            en:
                "In Progress"
        },

        completed: {
            className:
                "status-completed",
            ne:
                "सम्पन्न",
            en:
                "Completed"
        },

        "on-hold": {
            className:
                "status-hold",
            ne:
                "रोकिएको",
            en:
                "On Hold"
        }

    };


    const item =
        data[status] ||
        data.planning;


    return {

        className:
            item.className,

        label:
            currentLanguage === "ne"
                ? item.ne
                : item.en

    };

}


/* =========================================================
   CATEGORY NAME
========================================================= */

function getCategoryName(
    category
) {

    const data = {

        business: {
            ne:
                "Business Website",
            en:
                "Business Website"
        },

        portfolio: {
            ne:
                "Portfolio",
            en:
                "Portfolio"
        },

        ecommerce: {
            ne:
                "E-Commerce",
            en:
                "E-Commerce"
        },

        blog: {
            ne:
                "Blog / News",
            en:
                "Blog / News"
        },

        education: {
            ne:
                "Education",
            en:
                "Education"
        },

        other: {
            ne:
                "अन्य",
            en:
                "Other"
        }

    };


    const item =
        data[category] ||
        data.other;


    return currentLanguage === "ne"
        ? item.ne
        : item.en;

}


/* =========================================================
   RESULT COUNT
========================================================= */

function updateResultCount(
    count
) {

    const element =
        document.getElementById(
            "websiteResultCount"
        );


    if (!element) return;


    if (
        currentLanguage === "ne"
    ) {

        element.textContent =
            `${count} वेबसाइट`;

    } else {

        element.textContent =
            `${count} Website${
                count === 1
                    ? ""
                    : "s"
            }`;

    }

}


/* =========================================================
   DYNAMIC TEXT
========================================================= */

function updateDynamicText() {

    const filtered =
        getFilteredWebsites();


    updateResultCount(
        filtered.length
    );

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const total =
        websites.length;


    const planning =
        websites.filter(
            site =>
                site.status ===
                "planning"
        ).length;


    const active =
        websites.filter(
            site =>
                site.status ===
                "in-progress"
        ).length;


    const completed =
        websites.filter(
            site =>
                site.status ===
                "completed"
        ).length;


    setText(
        "totalWebsites",
        total
    );


    setText(
        "planningWebsites",
        planning
    );


    setText(
        "activeWebsites",
        active
    );


    setText(
        "completedWebsites",
        completed
    );

}


/* =========================================================
   OPEN ADD WEBSITE MODAL
========================================================= */

function openAddWebsiteModal() {

    editingWebsiteId =
        null;


    const form =
        document.getElementById(
            "websiteForm"
        );


    if (form) {

        form.reset();

    }


    setValue(
        "websiteId",
        ""
    );


    setValue(
        "websiteProgress",
        "0"
    );


    setValue(
        "websiteStatus",
        "planning"
    );


    setText(
        "websiteModalTitle",
        currentLanguage === "ne"
            ? "नयाँ वेबसाइट"
            : "New Website"
    );


    setSaveButtonText(
        currentLanguage === "ne"
            ? "वेबसाइट सुरक्षित गर्नुहोस्"
            : "Save Website"
    );


    openModal(
        "websiteModal"
    );


    focusInput(
        "websiteName"
    );

}


/* =========================================================
   OPEN EDIT WEBSITE MODAL
========================================================= */

function openEditWebsiteModal(
    id
) {

    const website =
        websites.find(
            site =>
                site.id === id
        );


    if (!website) {

        showToast(
            currentLanguage === "ne"
                ? "वेबसाइट भेटिएन।"
                : "Website not found.",
            "error"
        );

        return;

    }


    editingWebsiteId =
        website.id;


    setValue(
        "websiteId",
        website.id
    );


    setValue(
        "websiteName",
        website.name || ""
    );


    setValue(
        "websiteClient",
        website.client || ""
    );


    setValue(
        "websiteCategory",
        website.category ||
            "business"
    );


    setValue(
        "websiteStatus",
        website.status ||
            "planning"
    );


    setValue(
        "websiteProgress",
        clampProgress(
            website.progress
        )
    );


    setValue(
        "websiteStartDate",
        website.startDate || ""
    );


    setValue(
        "websiteDeadline",
        website.deadline || ""
    );


    setValue(
        "websiteUrl",
        website.url || ""
    );


    setValue(
        "websiteTechnologies",
        Array.isArray(
            website.technologies
        )
            ? website.technologies.join(
                ", "
            )
            : ""
    );


    setValue(
        "websiteDescription",
        website.description ||
            ""
    );


    setText(
        "websiteModalTitle",
        currentLanguage === "ne"
            ? "वेबसाइट सम्पादन"
            : "Edit Website"
    );


    setSaveButtonText(
        currentLanguage === "ne"
            ? "परिवर्तन सुरक्षित गर्नुहोस्"
            : "Save Changes"
    );


    openModal(
        "websiteModal"
    );


    focusInput(
        "websiteName"
    );

}


/* =========================================================
   SAVE BUTTON TEXT
========================================================= */

function setSaveButtonText(
    text
) {

    const button =
        document.getElementById(
            "saveWebsiteBtn"
        );


    if (!button) return;


    const span =
        button.querySelector(
            "span"
        );


    if (span) {

        span.textContent =
            text;

    } else {

        button.textContent =
            text;

    }

}


/* =========================================================
   HANDLE WEBSITE SUBMIT
========================================================= */

function handleWebsiteSubmit(
    event
) {

    event.preventDefault();


    const name =
        getValue(
            "websiteName"
        ).trim();


    if (!name) {

        showToast(
            currentLanguage === "ne"
                ? "कृपया वेबसाइट नाम लेख्नुहोस्।"
                : "Please enter website name.",
            "error"
        );


        focusInput(
            "websiteName"
        );


        return;

    }


    const progress =
        clampProgress(
            Number(
                getValue(
                    "websiteProgress"
                )
            )
        );


    let status =
        getValue(
            "websiteStatus"
        ) ||
        "planning";


    /* -----------------------------------------
       Auto Status
    ----------------------------------------- */

    if (
        progress === 100
    ) {

        status =
            "completed";

    } else if (
        progress > 0 &&
        progress < 100 &&
        status === "planning"
    ) {

        status =
            "in-progress";

    }


    const technologies =
        getValue(
            "websiteTechnologies"
        )
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    const existing =
        editingWebsiteId
            ? websites.find(
                site =>
                    site.id ===
                    editingWebsiteId
            )
            : null;


    const websiteData = {

        id:
            existing?.id ||
            generateId(),

        name,

        client:
            getValue(
                "websiteClient"
            ).trim(),

        category:
            getValue(
                "websiteCategory"
            ) ||
            "business",

        status,

        progress,

        startDate:
            getValue(
                "websiteStartDate"
            ),

        deadline:
            getValue(
                "websiteDeadline"
            ),

        url:
            getValue(
                "websiteUrl"
            ).trim(),

        technologies,

        description:
            getValue(
                "websiteDescription"
            ).trim(),

        createdAt:
            existing?.createdAt ||
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    /* -----------------------------------------
       UPDATE
    ----------------------------------------- */

    if (existing) {

        websites =
            websites.map(
                site =>
                    site.id ===
                    editingWebsiteId
                        ? websiteData
                        : site
            );


        saveWebsites();


        addNotification({

            type:
                "website",

            title:
                currentLanguage === "ne"
                    ? "वेबसाइट अपडेट भयो"
                    : "Website Updated",

            message:
                currentLanguage === "ne"
                    ? `"${name}" वेबसाइटको विवरण अपडेट गरिएको छ।`
                    : `"${name}" website has been updated.`

        });


        closeWebsiteModal();

        renderWebsites();

        updateStatistics();

        renderNotifications();


        showToast(
            currentLanguage === "ne"
                ? "वेबसाइट सफलतापूर्वक अपडेट भयो।"
                : "Website updated successfully.",
            "success"
        );


    } else {

        /* -----------------------------------------
           ADD
        ----------------------------------------- */

        websites.unshift(
            websiteData
        );


        saveWebsites();


        addNotification({

            type:
                "website",

            title:
                currentLanguage === "ne"
                    ? "नयाँ वेबसाइट थपियो"
                    : "New Website Added",

            message:
                currentLanguage === "ne"
                    ? `"${name}" वेबसाइट सफलतापूर्वक थपियो।`
                    : `"${name}" website was added successfully.`

        });


        closeWebsiteModal();

        renderWebsites();

        updateStatistics();

        renderNotifications();


        showToast(
            currentLanguage === "ne"
                ? "नयाँ वेबसाइट सफलतापूर्वक थपियो।"
                : "New website added successfully.",
            "success"
        );

    }


    editingWebsiteId =
        null;

}


/* =========================================================
   OPEN CONFIRM MODAL
========================================================= */

function openConfirmModal(
    id
) {

    const website =
        websites.find(
            site =>
                site.id === id
        );


    if (!website) return;


    pendingDeleteId =
        id;


    setText(
        "confirmTitle",
        currentLanguage === "ne"
            ? "वेबसाइट हटाउने?"
            : "Delete Website?"
    );


    setText(
        "confirmMessage",
        currentLanguage === "ne"
            ? `"${website.name}" हटाउन चाहनुहुन्छ? यो कार्य फिर्ता गर्न सकिँदैन।`
            : `Are you sure you want to delete "${website.name}"? This action cannot be undone.`
    );


    openModal(
        "confirmModal"
    );

}


/* =========================================================
   CONFIRM DELETE
========================================================= */

function confirmDeleteWebsite() {

    if (!pendingDeleteId) return;


    const website =
        websites.find(
            site =>
                site.id ===
                pendingDeleteId
        );


    if (!website) {

        closeConfirmModal();

        return;

    }


    websites =
        websites.filter(
            site =>
                site.id !==
                pendingDeleteId
        );


    saveWebsites();


    addNotification({

        type:
            "delete",

        title:
            currentLanguage === "ne"
                ? "वेबसाइट हटाइयो"
                : "Website Deleted",

        message:
            currentLanguage === "ne"
                ? `"${website.name}" वेबसाइट हटाइएको छ।`
                : `"${website.name}" website has been deleted.`

    });


    closeConfirmModal();

    renderWebsites();

    updateStatistics();

    renderNotifications();


    showToast(
        currentLanguage === "ne"
            ? "वेबसाइट हटाइयो।"
            : "Website deleted.",
        "success"
    );


    pendingDeleteId =
        null;

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (!modal) return;


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    const anyOpenModal =
        document.querySelector(
            ".modal-overlay.show"
        );


    if (!anyOpenModal) {

        document.body.classList.remove(
            "modal-open"
        );

    }

}


/* =========================================================
   CLOSE WEBSITE MODAL
========================================================= */

function closeWebsiteModal() {

    closeModal(
        "websiteModal"
    );


    editingWebsiteId =
        null;

}


/* =========================================================
   CLOSE CONFIRM MODAL
========================================================= */

function closeConfirmModal() {

    pendingDeleteId =
        null;


    closeModal(
        "confirmModal"
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function getNotifications() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE.notifications
            );


        if (!saved) return [];


        const parsed =
            JSON.parse(
                saved
            );


        return Array.isArray(
            parsed
        )
            ? parsed
            : [];

    } catch (error) {

        console.warn(
            "Notification loading error:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE NOTIFICATIONS
========================================================= */

function saveNotifications(
    notifications
) {

    try {

        localStorage.setItem(
            STORAGE.notifications,
            JSON.stringify(
                notifications.slice(
                    0,
                    50
                )
            )
        );

    } catch (error) {

        console.warn(
            "Notification saving error:",
            error
        );

    }

}


/* =========================================================
   ADD NOTIFICATION
========================================================= */

function addNotification(
    data
) {

    const notifications =
        getNotifications();


    notifications.unshift({

        id:
            generateId(),

        type:
            data.type ||
            "info",

        title:
            data.title ||
            (
                currentLanguage === "ne"
                    ? "सूचना"
                    : "Notification"
            ),

        message:
            data.message ||
            "",

        read:
            false,

        time:
            new Date().toISOString()

    });


    saveNotifications(
        notifications
    );


    updateNotificationBadge();

}


/* =========================================================
   RENDER NOTIFICATIONS
========================================================= */

function renderNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );


    const empty =
        document.getElementById(
            "notificationEmpty"
        );


    if (!list) return;


    const notifications =
        getNotifications();


    list.innerHTML =
        "";


    if (
        notifications.length === 0
    ) {

        if (empty) {

            empty.style.display =
                "flex";

        }


        setText(
            "notificationCountText",
            "0"
        );


        return;

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    notifications.forEach(
        notification => {

            const item =
                createNotificationItem(
                    notification
                );


            list.appendChild(
                item
            );

        }
    );


    const unread =
        notifications.filter(
            item =>
                !item.read
        ).length;


    setText(
        "notificationCountText",
        String(unread)
    );

}


/* =========================================================
   CREATE NOTIFICATION ITEM
========================================================= */

function createNotificationItem(
    notification
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        `notification-item ${
            notification.read
                ? "read"
                : "unread"
        }`;


    const icon =
        getNotificationIcon(
            notification.type
        );


    const time =
        formatRelativeTime(
            notification.time
        );


    item.innerHTML = `

        <div class="notification-icon">

            <i class="${icon}"></i>

        </div>


        <div class="notification-content">

            <strong>
                ${escapeHTML(
                    notification.title
                )}
            </strong>


            <p>
                ${escapeHTML(
                    notification.message
                )}
            </p>


            <small>
                ${escapeHTML(
                    time
                )}
            </small>

        </div>


        ${
            !notification.read
                ? `
                    <span
                        class="notification-unread-dot">
                    </span>
                `
                : ""
        }

    `;


    item.addEventListener(
        "click",
        () => {

            markNotificationRead(
                notification.id
            );

        }
    );


    return item;

}


/* =========================================================
   NOTIFICATION ICON
========================================================= */

function getNotificationIcon(
    type
) {

    const icons = {

        website:
            "fa-solid fa-globe",

        delete:
            "fa-solid fa-trash",

        success:
            "fa-solid fa-circle-check",

        warning:
            "fa-solid fa-triangle-exclamation",

        info:
            "fa-solid fa-circle-info"

    };


    return (
        icons[type] ||
        icons.info
    );

}


/* =========================================================
   MARK NOTIFICATION READ
========================================================= */

function markNotificationRead(
    id
) {

    const notifications =
        getNotifications();


    const updated =
        notifications.map(
            item =>
                item.id === id
                    ? {
                        ...item,
                        read: true
                    }
                    : item
        );


    saveNotifications(
        updated
    );


    renderNotifications();

    updateNotificationBadge();

}


/* =========================================================
   CLEAR NOTIFICATIONS
========================================================= */

function clearNotifications() {

    const notifications =
        getNotifications();


    if (
        notifications.length === 0
    ) {

        showToast(
            currentLanguage === "ne"
                ? "पढ्नका लागि कुनै सूचना छैन।"
                : "No notifications to mark.",
            "info"
        );


        return;

    }


    const updated =
        notifications.map(
            item => ({
                ...item,
                read: true
            })
        );


    saveNotifications(
        updated
    );


    renderNotifications();

    updateNotificationBadge();


    showToast(
        currentLanguage === "ne"
            ? "सबै सूचना पढिएको बनाइयो।"
            : "All notifications marked as read.",
        "success"
    );

}


/* =========================================================
   NOTIFICATION BADGE
========================================================= */

function updateNotificationBadge() {

    const badge =
        document.getElementById(
            "notificationBadge"
        );


    if (!badge) return;


    const notifications =
        getNotifications();


    const unread =
        notifications.filter(
            item =>
                !item.read
        ).length;


    badge.textContent =
        unread > 99
            ? "99+"
            : String(unread);


    badge.classList.toggle(
        "has-notifications",
        unread > 0
    );

}


/* =========================================================
   TOGGLE NOTIFICATION PANEL
========================================================= */

function toggleNotificationPanel(
    event
) {

    event?.stopPropagation();


    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (!panel) return;


    const isOpen =
        panel.classList.contains(
            "show"
        );


    if (isOpen) {

        closeNotificationPanel();

    } else {

        renderNotifications();


        panel.classList.add(
            "show"
        );


        panel.setAttribute(
            "aria-hidden",
            "false"
        );

    }

}


/* =========================================================
   CLOSE NOTIFICATION PANEL
========================================================= */

function closeNotificationPanel() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (!panel) return;


    panel.classList.remove(
        "show"
    );


    panel.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   OUTSIDE NOTIFICATION CLICK
========================================================= */

function handleOutsideClick(
    event
) {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const button =
        document.getElementById(
            "notificationBtn"
        );


    if (
        !panel ||
        !button
    ) return;


    if (
        panel.classList.contains(
            "show"
        ) &&
        !panel.contains(
            event.target
        ) &&
        !button.contains(
            event.target
        )
    ) {

        closeNotificationPanel();

    }

}


/* =========================================================
   EXPORT WEBSITES
========================================================= */

function exportWebsites() {

    if (
        websites.length === 0
    ) {

        showToast(
            currentLanguage === "ne"
                ? "Export गर्न कुनै वेबसाइट छैन।"
                : "There are no websites to export.",
            "warning"
        );


        return;

    }


    const headers = [

        currentLanguage === "ne"
            ? "वेबसाइट नाम"
            : "Website Name",

        currentLanguage === "ne"
            ? "क्लाइन्ट"
            : "Client",

        "Category",

        currentLanguage === "ne"
            ? "स्थिति"
            : "Status",

        "Progress",

        currentLanguage === "ne"
            ? "सुरु मिति"
            : "Start Date",

        "Deadline",

        "URL",

        "Technologies",

        currentLanguage === "ne"
            ? "विवरण"
            : "Description"

    ];


    const rows =
        websites.map(
            site => [

                site.name || "",

                site.client || "",

                getCategoryName(
                    site.category
                ),

                getStatusInfo(
                    site.status
                ).label,

                `${clampProgress(
                    site.progress
                )}%`,

                site.startDate || "",

                site.deadline || "",

                site.url || "",

                Array.isArray(
                    site.technologies
                )
                    ? site.technologies.join(
                        ", "
                    )
                    : "",

                site.description || ""

            ]
        );


    const csv =
        [
            headers,
            ...rows
        ]
            .map(
                row =>
                    row
                        .map(
                            cell =>
                                csvEscape(
                                    cell
                                )
                        )
                        .join(",")
            )
            .join(
                "\r\n"
            );


    const blob =
        new Blob(
            [
                "\uFEFF" +
                csv
            ],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `bariway-websites-${getDateStamp()}.csv`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    addNotification({

        type:
            "success",

        title:
            currentLanguage === "ne"
                ? "Website Export भयो"
                : "Website Exported",

        message:
            currentLanguage === "ne"
                ? `${websites.length} वटा वेबसाइटको data export गरियो।`
                : `${websites.length} website records were exported.`

    });


    renderNotifications();


    showToast(
        currentLanguage === "ne"
            ? "Website data Export भयो।"
            : "Website data exported successfully.",
        "success"
    );

}


/* =========================================================
   CSV ESCAPE
========================================================= */

function csvEscape(
    value
) {

    const text =
        String(
            value ?? ""
        );


    if (
        text.includes(",") ||
        text.includes('"') ||
        text.includes("\n") ||
        text.includes("\r")
    ) {

        return `"${text.replace(
            /"/g,
            '""'
        )}"`;

    }


    return text;

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openMobileSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    sidebar?.classList.add(
        "open"
    );


    overlay?.classList.add(
        "show"
    );


    document.body.classList.add(
        "sidebar-open"
    );

}


/* =========================================================
   CLOSE MOBILE SIDEBAR
========================================================= */

function closeMobileSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    sidebar?.classList.remove(
        "open"
    );


    overlay?.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "sidebar-open"
    );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function handleMobileNavigation(
    event
) {

    const link =
        event.target.closest(
            ".sidebar-nav a"
        );


    if (link) {

        closeMobileSidebar();

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    const confirmed =
        window.confirm(
            currentLanguage === "ne"
                ? "के तपाईं लगआउट गर्न चाहनुहुन्छ?"
                : "Are you sure you want to logout?"
        );


    if (!confirmed) return;


    /*
       User data permanently delete
       नगरी login page मा पठाइन्छ।
    */

    window.location.href =
        "login.html";

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function handleKeyboard(
    event
) {

    /* -----------------------------------------
       ESC
    ----------------------------------------- */

    if (
        event.key === "Escape"
    ) {

        closeWebsiteModal();

        closeConfirmModal();

        closeMobileSidebar();

        closeNotificationPanel();

    }


    /* -----------------------------------------
       CTRL / CMD + K
    ----------------------------------------- */

    if (
        (
            event.ctrlKey ||
            event.metaKey
        ) &&
        event.key.toLowerCase() ===
        "k"
    ) {

        event.preventDefault();


        const search =
            document.getElementById(
                "websiteSearch"
            );


        if (search) {

            search.focus();

            search.select();

        }

    }

}


/* =========================================================
   MODAL BACKDROP CLICK
========================================================= */

function handleModalBackdropClick(
    event
) {

    const modal =
        event.target.closest(
            ".modal-overlay"
        );


    if (
        !modal ||
        event.target !== modal
    ) return;


    if (
        modal.id ===
        "websiteModal"
    ) {

        closeWebsiteModal();

    }


    if (
        modal.id ===
        "confirmModal"
    ) {

        closeConfirmModal();

    }

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
    dateString
) {

    if (!dateString) {

        return currentLanguage === "ne"
            ? "मिति छैन"
            : "No date";

    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;

    }


    return new Intl.DateTimeFormat(
        currentLanguage === "ne"
            ? "ne-NP"
            : "en-US",
        {
            year:
                "numeric",
            month:
                "short",
            day:
                "numeric"
        }
    ).format(
        date
    );

}


/* =========================================================
   RELATIVE TIME
========================================================= */

function formatRelativeTime(
    dateString
) {

    const date =
        new Date(
            dateString
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    const diff =
        Math.max(
            0,
            Date.now() -
            date.getTime()
        );


    const minutes =
        Math.floor(
            diff / 60000
        );


    if (
        minutes < 1
    ) {

        return currentLanguage === "ne"
            ? "भर्खरै"
            : "Just now";

    }


    if (
        minutes < 60
    ) {

        return currentLanguage === "ne"
            ? `${minutes} मिनेट अघि`
            : `${minutes} min ago`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (
        hours < 24
    ) {

        return currentLanguage === "ne"
            ? `${hours} घण्टा अघि`
            : `${hours} hour${
                hours === 1
                    ? ""
                    : "s"
            } ago`;

    }


    const days =
        Math.floor(
            hours / 24
        );


    if (
        days < 7
    ) {

        return currentLanguage === "ne"
            ? `${days} दिन अघि`
            : `${days} day${
                days === 1
                    ? ""
                    : "s"
            } ago`;

    }


    return formatDate(
        date.toISOString().slice(
            0,
            10
        )
    );

}


/* =========================================================
   DATE STAMP
========================================================= */

function getDateStamp() {

    const date =
        new Date();


    return [

        date.getFullYear(),

        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        ),

        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        )

    ].join(
        "-"
    );

}


/* =========================================================
   PROGRESS CLAMP
========================================================= */

function clampProgress(
    value
) {

    let number =
        Number(
            value
        );


    if (
        Number.isNaN(
            number
        )
    ) {

        number =
            0;

    }


    return Math.min(
        100,
        Math.max(
            0,
            Math.round(
                number
            )
        )
    );

}


/* =========================================================
   GENERATE ID
========================================================= */

function generateId() {

    return (
        "web-" +
        Date.now().toString(
            36
        ) +
        "-" +
        Math.random()
            .toString(
                36
            )
            .substring(
                2,
                8
            )
    );

}


/* =========================================================
   SAFE URL
========================================================= */

function safeURL(
    url
) {

    if (!url) return "#";


    try {

        const parsed =
            new URL(
                url,
                window.location.origin
            );


        if (
            parsed.protocol ===
                "http:" ||
            parsed.protocol ===
                "https:"
        ) {

            return escapeAttribute(
                parsed.href
            );

        }


        return "#";

    } catch {

        return "#";

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
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
   GET VALUE
========================================================= */

function getValue(
    id
) {

    const element =
        document.getElementById(
            id
        );


    return element
        ? element.value
        : "";

}


/* =========================================================
   SET VALUE
========================================================= */

function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value ?? "";

    }

}


/* =========================================================
   FOCUS INPUT
========================================================= */

function focusInput(
    id
) {

    setTimeout(
        () => {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.focus();

            }

        },
        100
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "websiteToast"
        );


    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    const icon =
        document.getElementById(
            "toastIcon"
        );


    if (
        !toast ||
        !messageElement
    ) return;


    clearTimeout(
        toastTimer
    );


    messageElement.textContent =
        message;


    toast.classList.remove(
        "show",
        "success",
        "error",
        "warning",
        "info"
    );


    const validTypes = [
        "success",
        "error",
        "warning",
        "info"
    ];


    toast.classList.add(
        validTypes.includes(
            type
        )
            ? type
            : "info"
    );


    if (icon) {

        const icons = {

            success:
                "fa-solid fa-circle-check",

            error:
                "fa-solid fa-circle-xmark",

            warning:
                "fa-solid fa-triangle-exclamation",

            info:
                "fa-solid fa-circle-info"

        };


        icon.className =
            icons[type] ||
            icons.info;

    }


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3200
        );

}


/* =========================================================
   AUTO SYNC FROM OTHER TABS
========================================================= */

window.addEventListener(
    "storage",
    event => {

        /* Websites */

        if (
            event.key ===
            STORAGE.websites
        ) {

            loadWebsites();

            renderWebsites();

            updateStatistics();

        }


        /* Language */

        if (
            event.key ===
            STORAGE.language
        ) {

            loadLanguage();

            updateLanguageUI();

            renderWebsites();

            renderNotifications();

            updateThemeUI();

        }


        /* Theme */

        if (
            event.key ===
            STORAGE.theme
        ) {

            loadTheme();

            updateThemeUI();

        }


        /* Notifications */

        if (
            event.key ===
            STORAGE.notifications
        ) {

            renderNotifications();

            updateNotificationBadge();

        }


        /* User / Photo */

        if (
            event.key ===
                STORAGE.user ||
            event.key ===
                STORAGE.profilePhoto
        ) {

            loadUserProfile();

        }


        /* View */

        if (
            event.key ===
            STORAGE.view
        ) {

            loadView();

            updateViewButtons();

            renderWebsites();

        }

    }
);


/* =========================================================
   AUTO REFRESH NOTIFICATIONS
========================================================= */

setInterval(
    () => {

        renderNotifications();

        updateNotificationBadge();

    },
    30000
);


/* =========================================================
   GLOBAL API
========================================================= */

window.BariwayWebsite = {

    /* -----------------------------------------
       Get Websites
    ----------------------------------------- */

    getWebsites: () =>
        [...websites],


    /* -----------------------------------------
       Add Website
    ----------------------------------------- */

    addWebsite: website => {

        if (
            !website ||
            typeof website !==
            "object"
        ) {

            return false;

        }


        const newWebsite = {

            id:
                website.id ||
                generateId(),

            name:
                website.name ||
                "Untitled Website",

            client:
                website.client ||
                "",

            category:
                website.category ||
                "business",

            status:
                website.status ||
                "planning",

            progress:
                clampProgress(
                    website.progress
                ),

            startDate:
                website.startDate ||
                "",

            deadline:
                website.deadline ||
                "",

            url:
                website.url ||
                "",

            technologies:
                Array.isArray(
                    website.technologies
                )
                    ? website.technologies
                    : [],

            description:
                website.description ||
                "",

            createdAt:
                website.createdAt ||
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()

        };


        websites.unshift(
            newWebsite
        );


        saveWebsites();

        renderWebsites();

        updateStatistics();


        return newWebsite;

    },


    /* -----------------------------------------
       Refresh
    ----------------------------------------- */

    refresh: () => {

        loadWebsites();

        loadLanguage();

        loadTheme();

        loadView();

        loadUserProfile();

        updateLanguageUI();

        updateThemeUI();

        updateViewButtons();

        renderWebsites();

        updateStatistics();

        renderNotifications();

        updateNotificationBadge();

    },


    /* -----------------------------------------
       Set Language
    ----------------------------------------- */

    setLanguage: language => {

        if (
            language !== "ne" &&
            language !== "en"
        ) {

            return false;

        }


        currentLanguage =
            language;


        saveLanguage();

        updateLanguageUI();

        renderWebsites();

        renderNotifications();

        updateThemeUI();


        return true;

    },


    /* -----------------------------------------
       Set Theme
    ----------------------------------------- */

    setTheme: theme => {

        if (
            theme !== "light" &&
            theme !== "dark"
        ) {

            return false;

        }


        currentTheme =
            theme;


        saveTheme();

        updateThemeUI();


        return true;

    },


    /* -----------------------------------------
       Set View
    ----------------------------------------- */

    setView: view => {

        if (
            view !== "grid" &&
            view !== "list"
        ) {

            return false;

        }


        setView(
            view
        );


        return true;

    },


    /* -----------------------------------------
       Export
    ----------------------------------------- */

    export: () => {

        exportWebsites();

    }

};


/* =========================================================
   FINAL
========================================================= */

console.log(
    "BARIWAY DIGITAL HUB | website.js v2.1 FINAL STABLE loaded."
);