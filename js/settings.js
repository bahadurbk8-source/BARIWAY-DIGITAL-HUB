/* =========================================================
   BARIWAY DIGITAL HUB
   SETTINGS ENGINE
   settings.js v1.0
   Theme • Language • Notifications • Preferences • Export
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const SETTINGS_STORAGE = {

    theme: "bariwayTheme",

    language: "bariwayLanguage",

    compact: "bariwayCompactMode",

    notifications: "bariwayNotificationsEnabled",

    projectNotifications:
        "bariwayProjectNotifications",

    clientNotifications:
        "bariwayClientNotifications",

    stats:
        "bariwayShowStats",

    charts:
        "bariwayShowCharts"

};


/* =========================================================
   DOM
========================================================= */

const darkModeToggle =
    document.getElementById(
        "darkModeToggle"
    );

const compactModeToggle =
    document.getElementById(
        "compactModeToggle"
    );

const notificationsToggle =
    document.getElementById(
        "notificationsToggle"
    );

const projectNotificationToggle =
    document.getElementById(
        "projectNotificationToggle"
    );

const clientNotificationToggle =
    document.getElementById(
        "clientNotificationToggle"
    );

const statsToggle =
    document.getElementById(
        "statsToggle"
    );

const chartsToggle =
    document.getElementById(
        "chartsToggle"
    );

const languageNepali =
    document.getElementById(
        "languageNepali"
    );

const languageEnglish =
    document.getElementById(
        "languageEnglish"
    );

const languageBtn =
    document.getElementById(
        "languageBtn"
    );

const themeBtn =
    document.getElementById(
        "themeBtn"
    );

const currentLanguageElement =
    document.getElementById(
        "currentLanguage"
    );

const saveSettingsBtn =
    document.getElementById(
        "saveSettingsBtn"
    );

const exportDataBtn =
    document.getElementById(
        "exportDataBtn"
    );

const resetDataBtn =
    document.getElementById(
        "resetDataBtn"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


/* =========================================================
   STATE
========================================================= */

let currentLanguage = "ne";


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initSettings
);


function initSettings() {

    loadTheme();

    loadLanguage();

    loadPreferences();

    setupEvents();

}


/* =========================================================
   THEME
========================================================= */

function loadTheme() {

    const theme =
        localStorage.getItem(
            SETTINGS_STORAGE.theme
        ) || "light";


    applyTheme(
        theme,
        false
    );

}


function applyTheme(
    theme,
    save = true
) {

    if (
        theme === "dark"
    ) {

        document.documentElement
            .setAttribute(
                "data-theme",
                "dark"
            );

        if (darkModeToggle) {

            darkModeToggle.checked =
                true;

        }

    } else {

        document.documentElement
            .removeAttribute(
                "data-theme"
            );

        if (darkModeToggle) {

            darkModeToggle.checked =
                false;

        }

    }


    updateThemeIcon(
        theme === "dark"
    );


    if (save) {

        localStorage.setItem(
            SETTINGS_STORAGE.theme,
            theme
        );

    }

}


function toggleTheme() {

    const isDark =
        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark";


    applyTheme(
        isDark
            ? "light"
            : "dark"
    );

}


/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon(
    isDark
) {

    if (!themeBtn) return;


    themeBtn.innerHTML =

        isDark

            ? `<i class="fa-solid fa-sun"></i>`

            : `<i class="fa-solid fa-moon"></i>`;

}


/* =========================================================
   LANGUAGE
========================================================= */

function loadLanguage() {

    const saved =
        localStorage.getItem(
            SETTINGS_STORAGE.language
        );


    currentLanguage =
        saved === "en"
            ? "en"
            : "ne";


    updateLanguageControls();

    applyLanguage();

}


function changeLanguage(
    language
) {

    currentLanguage =
        language === "en"
            ? "en"
            : "ne";


    localStorage.setItem(
        SETTINGS_STORAGE.language,
        currentLanguage
    );


    updateLanguageControls();

    applyLanguage();

}


function toggleLanguage() {

    changeLanguage(
        currentLanguage === "ne"
            ? "en"
            : "ne"
    );

}


function updateLanguageControls() {

    if (languageNepali) {

        languageNepali.checked =
            currentLanguage === "ne";

    }


    if (languageEnglish) {

        languageEnglish.checked =
            currentLanguage === "en";

    }


    if (currentLanguageElement) {

        currentLanguageElement.textContent =

            currentLanguage === "en"

                ? "English"

                : "नेपाली";

    }

}


function applyLanguage() {

    document.documentElement
        .setAttribute(
            "lang",
            currentLanguage === "en"
                ? "en"
                : "ne"
        );


    document
        .querySelectorAll(
            "[data-ne][data-en]"
        )
        .forEach(
            element => {

                element.textContent =

                    currentLanguage === "en"

                        ? element.dataset.en

                        : element.dataset.ne;

            }
        );

}


/* =========================================================
   PREFERENCES
========================================================= */

function loadPreferences() {

    setCheckbox(

        compactModeToggle,

        getBoolean(
            SETTINGS_STORAGE.compact,
            false
        )

    );


    setCheckbox(

        notificationsToggle,

        getBoolean(
            SETTINGS_STORAGE.notifications,
            true
        )

    );


    setCheckbox(

        projectNotificationToggle,

        getBoolean(
            SETTINGS_STORAGE.projectNotifications,
            true
        )

    );


    setCheckbox(

        clientNotificationToggle,

        getBoolean(
            SETTINGS_STORAGE.clientNotifications,
            true
        )

    );


    setCheckbox(

        statsToggle,

        getBoolean(
            SETTINGS_STORAGE.stats,
            true
        )

    );


    setCheckbox(

        chartsToggle,

        getBoolean(
            SETTINGS_STORAGE.charts,
            true
        )

    );


    applyCompactMode();

}


function savePreferences() {

    localStorage.setItem(

        SETTINGS_STORAGE.compact,

        String(
            compactModeToggle
                ? compactModeToggle.checked
                : false
        )

    );


    localStorage.setItem(

        SETTINGS_STORAGE.notifications,

        String(
            notificationsToggle
                ? notificationsToggle.checked
                : true
        )

    );


    localStorage.setItem(

        SETTINGS_STORAGE.projectNotifications,

        String(
            projectNotificationToggle
                ? projectNotificationToggle.checked
                : true
        )

    );


    localStorage.setItem(

        SETTINGS_STORAGE.clientNotifications,

        String(
            clientNotificationToggle
                ? clientNotificationToggle.checked
                : true
        )

    );


    localStorage.setItem(

        SETTINGS_STORAGE.stats,

        String(
            statsToggle
                ? statsToggle.checked
                : true
        )

    );


    localStorage.setItem(

        SETTINGS_STORAGE.charts,

        String(
            chartsToggle
                ? chartsToggle.checked
                : true
        )

    );


    applyCompactMode();

}


function applyCompactMode() {

    const enabled =
        compactModeToggle
            ? compactModeToggle.checked
            : false;


    if (enabled) {

        document.documentElement
            .setAttribute(
                "data-compact",
                "true"
            );

    } else {

        document.documentElement
            .removeAttribute(
                "data-compact"
            );

    }

}


/* =========================================================
   HELPERS
========================================================= */

function getBoolean(
    key,
    defaultValue
) {

    const value =
        localStorage.getItem(
            key
        );


    if (value === null) {

        return defaultValue;

    }


    return value === "true";

}


function setCheckbox(
    element,
    value
) {

    if (element) {

        element.checked =
            value;

    }

}


/* =========================================================
   EXPORT DATA
========================================================= */

function exportData() {

    const data = {

        exportedAt:
            new Date()
                .toISOString(),

        application:
            "BARIWAY DIGITAL HUB",

        clients:
            readJSON(
                "bariwayClients",
                []
            ),

        projects:
            readJSON(
                "bariwayProjects",
                []
            ),

        services:
            readJSON(
                "bariwayServices",
                []
            ),

        notifications:
            readJSON(
                "bariwayNotifications",
                []
            ),

        settings: {

            theme:
                localStorage.getItem(
                    SETTINGS_STORAGE.theme
                ),

            language:
                localStorage.getItem(
                    SETTINGS_STORAGE.language
                ),

            compact:
                localStorage.getItem(
                    SETTINGS_STORAGE.compact
                )

        }

    };


    const json =
        JSON.stringify(
            data,
            null,
            4
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
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


    link.href = url;

    link.download =
        `bariway-backup-${getDateStamp()}.json`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();

    URL.revokeObjectURL(
        url
    );


    showToast(

        currentLanguage === "en"

            ? "Data exported successfully."

            : "Data सफलतापूर्वक Export भयो।",

        "success"

    );

}


/* =========================================================
   RESET DATA
========================================================= */

function resetAllData() {

    const message =

        currentLanguage === "en"

            ? "This will remove clients, projects, services and notifications from this browser. Continue?"

            : "यसले यस browser मा रहेका Clients, Projects, Services र Notifications हटाउनेछ। अगाडि बढ्ने हो?";


    const confirmed =
        window.confirm(
            message
        );


    if (!confirmed) return;


    const secondConfirm =

        window.confirm(

            currentLanguage === "en"

                ? "Are you absolutely sure? This action cannot be undone."

                : "के तपाईं पक्का हुनुहुन्छ? यो कार्य Undo गर्न सकिँदैन।"

        );


    if (!secondConfirm) return;


    const keys = [

        "bariwayClients",

        "bariwayProjects",

        "bariwayServices",

        "bariwayNotifications"

    ];


    keys.forEach(
        key =>
            localStorage.removeItem(
                key
            )
    );


    showToast(

        currentLanguage === "en"

            ? "Application data has been reset."

            : "Application data reset गरियो।",

        "success"

    );


    setTimeout(
        () => {

            location.reload();

        },
        1000
    );

}


/* =========================================================
   SAVE
========================================================= */

function saveSettings() {

    savePreferences();

    localStorage.setItem(

        SETTINGS_STORAGE.language,

        currentLanguage

    );


    localStorage.setItem(

        SETTINGS_STORAGE.theme,

        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark"
                ? "dark"
                : "light"

    );


    showToast(

        currentLanguage === "en"

            ? "Settings saved successfully."

            : "Settings सफलतापूर्वक Save भयो।",

        "success"

    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    const confirmed =

        window.confirm(

            currentLanguage === "en"

                ? "Are you sure you want to logout?"

                : "के तपाईं Logout गर्न चाहनुहुन्छ?"

        );


    if (!confirmed) return;


    window.location.href =
        "login.html";

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "info"
) {

    const old =
        document.querySelector(
            ".settings-toast"
        );


    if (old) {

        old.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `settings-toast ${type}`;


    const icon =

        type === "success"

            ? "fa-circle-check"

            : type === "danger"

                ? "fa-circle-xmark"

                : "fa-circle-info";


    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    document.body.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    toast.remove();

                },
                250
            );

        },
        3000
    );

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            toggleTheme
        );

    }


    if (languageBtn) {

        languageBtn.addEventListener(
            "click",
            toggleLanguage
        );

    }


    if (languageNepali) {

        languageNepali.addEventListener(
            "change",
            () =>
                changeLanguage("ne")
        );

    }


    if (languageEnglish) {

        languageEnglish.addEventListener(
            "change",
            () =>
                changeLanguage("en")
        );

    }


    if (darkModeToggle) {

        darkModeToggle.addEventListener(
            "change",
            toggleTheme
        );

    }


    if (compactModeToggle) {

        compactModeToggle.addEventListener(
            "change",
            applyCompactMode
        );

    }


    if (saveSettingsBtn) {

        saveSettingsBtn.addEventListener(
            "click",
            saveSettings
        );

    }


    if (exportDataBtn) {

        exportDataBtn.addEventListener(
            "click",
            exportData
        );

    }


    if (resetDataBtn) {

        resetDataBtn.addEventListener(
            "click",
            resetAllData
        );

    }


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }


    /*
       Auto-save preference toggles.
    */

    [

        notificationsToggle,

        projectNotificationToggle,

        clientNotificationToggle,

        statsToggle,

        chartsToggle

    ].forEach(
        element => {

            if (!element) return;


            element.addEventListener(
                "change",
                savePreferences
            );

        }
    );


}


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key ===
                SETTINGS_STORAGE.theme
        ) {

            loadTheme();

        }


        if (
            event.key ===
                SETTINGS_STORAGE.language
        ) {

            loadLanguage();

        }


        if (
            event.key ===
                SETTINGS_STORAGE.compact
        ) {

            loadPreferences();

        }

    }
);


/* =========================================================
   HELPERS
========================================================= */

function readJSON(
    key,
    fallback
) {

    try {

        const saved =
            localStorage.getItem(
                key
            );


        if (!saved) {

            return fallback;

        }


        const parsed =
            JSON.parse(
                saved
            );


        return parsed;

    } catch {

        return fallback;

    }

}


function getDateStamp() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(
            value ?? ""
        );


    return div.innerHTML;

}


/* =========================================================
   TOAST STYLE
========================================================= */

const toastStyle =
    document.createElement(
        "style"
    );


toastStyle.textContent = `

.settings-toast {

    position: fixed;

    right: 25px;

    bottom: 25px;

    z-index: 9999;

    min-width: 260px;

    max-width: 390px;

    padding: 13px 16px;

    border: 1px solid var(--border);

    border-radius: 12px;

    background: var(--card-bg);

    color: var(--text);

    box-shadow: var(--shadow-lg);

    display: flex;

    align-items: center;

    gap: 10px;

    font-size: 11px;

    font-weight: 650;

    opacity: 0;

    visibility: hidden;

    transform: translateY(15px);

    transition: .25s ease;

}


.settings-toast.show {

    opacity: 1;

    visibility: visible;

    transform: translateY(0);

}


.settings-toast.success i {

    color: var(--success);

}


.settings-toast.danger i {

    color: var(--danger);

}


.settings-toast.info i {

    color: var(--primary);

}


@media(max-width:520px) {

    .settings-toast {

        left: 15px;

        right: 15px;

        bottom: 15px;

        min-width: 0;

    }

}

`;


document.head.appendChild(
    toastStyle
);