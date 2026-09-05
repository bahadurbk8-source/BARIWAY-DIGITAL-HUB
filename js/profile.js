/* =========================================================
   BARIWAY DIGITAL HUB
   PROFILE MODULE
   profile.js v3.0 FINAL

   Professional • Stable • Responsive
   Save • Reset • Photo Upload
   LocalStorage • Theme • Language
   Profile Completion • Dashboard Sync
   Cross-Browser • Error Safe
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE KEYS
========================================================= */

const PROFILE_STORAGE_KEY = "bariwayProfile";
const USER_STORAGE_KEY = "bariwayUser";
const THEME_STORAGE_KEY = "bariwayTheme";
const LANGUAGE_STORAGE_KEY = "bariwayLanguage";
const NOTIFICATION_STORAGE_KEY = "bariwayNotifications";

/* =========================================================
   DEFAULT PROFILE
========================================================= */

const DEFAULT_PROFILE = {
    name: "टेक बहादुर BK",
    email: "",
    phone: "",
    address: "",
    role: "Digital Solutions Professional",
    bio: "",
    photo: ""
};

/* =========================================================
   GLOBAL STATE
========================================================= */

let profile = { ...DEFAULT_PROFILE };
let currentLanguage = "ne";

/* =========================================================
   DOM ELEMENTS
========================================================= */

let profileForm = null;
let fullName = null;
let email = null;
let phone = null;
let address = null;
let role = null;
let bio = null;
let profilePhoto = null;
let resetProfile = null;
let themeBtn = null;
let languageBtn = null;
let currentLanguageElement = null;
let logoutBtn = null;

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", initializeProfile);

function initializeProfile() {
    cacheElements();

    loadProfile();
    loadTheme();
    loadLanguage();

    fillProfileForm();
    updateProfileUI();
    updateCompletion();

    setupProfileEvents();
    injectToastStyles();

    syncDashboardProfile();
}

/* =========================================================
   CACHE DOM ELEMENTS
========================================================= */

function cacheElements() {
    profileForm = document.getElementById("profileForm");
    fullName = document.getElementById("fullName");
    email = document.getElementById("email");
    phone = document.getElementById("phone");
    address = document.getElementById("address");
    role = document.getElementById("role");
    bio = document.getElementById("bio");
    profilePhoto = document.getElementById("profilePhoto");
    resetProfile = document.getElementById("resetProfile");
    themeBtn = document.getElementById("themeBtn");
    languageBtn = document.getElementById("languageBtn");
    currentLanguageElement =
        document.getElementById("currentLanguage");
    logoutBtn = document.getElementById("logoutBtn");
}

/* =========================================================
   LOAD PROFILE
========================================================= */

function loadProfile() {
    try {
        const saved = localStorage.getItem(PROFILE_STORAGE_KEY);

        if (!saved) {
            profile = { ...DEFAULT_PROFILE };
            return;
        }

        const parsed = JSON.parse(saved);

        if (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed)
        ) {
            profile = {
                ...DEFAULT_PROFILE,
                ...parsed
            };
        } else {
            profile = { ...DEFAULT_PROFILE };
        }
    } catch (error) {
        console.error("Profile loading error:", error);

        profile = { ...DEFAULT_PROFILE };
    }
}

/* =========================================================
   SAVE PROFILE
========================================================= */

function saveProfile() {
    try {
        localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify(profile)
        );

        return true;
    } catch (error) {
        console.error("Profile save error:", error);

        showToast(
            getText(
                "Could not save profile.",
                "प्रोफाइल सुरक्षित गर्न सकिएन।"
            ),
            "error"
        );

        return false;
    }
}

/* =========================================================
   FILL FORM
========================================================= */

function fillProfileForm() {
    if (fullName) {
        fullName.value = profile.name || "";
    }

    if (email) {
        email.value = profile.email || "";
    }

    if (phone) {
        phone.value = profile.phone || "";
    }

    if (address) {
        address.value = profile.address || "";
    }

    if (role) {
        role.value = profile.role || "";
    }

    if (bio) {
        bio.value = profile.bio || "";
    }
}

/* =========================================================
   GET FORM DATA
========================================================= */

function getFormData() {
    return {
        name: fullName
            ? fullName.value.trim()
            : "",

        email: email
            ? email.value.trim()
            : "",

        phone: phone
            ? phone.value.trim()
            : "",

        address: address
            ? address.value.trim()
            : "",

        role: role
            ? role.value.trim()
            : "",

        bio: bio
            ? bio.value.trim()
            : "",

        photo: profile.photo || ""
    };
}

/* =========================================================
   HANDLE PROFILE SUBMIT
========================================================= */

function handleProfileSubmit(event) {
    event.preventDefault();

    const newProfile = getFormData();

    /* NAME VALIDATION */

    if (!newProfile.name) {
        showToast(
            getText(
                "Please enter your full name.",
                "कृपया आफ्नो पूरा नाम लेख्नुहोस्।"
            ),
            "warning"
        );

        if (fullName) {
            fullName.focus();
        }

        return;
    }

    /* EMAIL VALIDATION */

    if (
        newProfile.email &&
        !isValidEmail(newProfile.email)
    ) {
        showToast(
            getText(
                "Please enter a valid email address.",
                "कृपया सही Email address लेख्नुहोस्।"
            ),
            "warning"
        );

        if (email) {
            email.focus();
        }

        return;
    }

    /* SAVE */

    profile = {
        ...DEFAULT_PROFILE,
        ...newProfile
    };

    const saved = saveProfile();

    if (!saved) {
        return;
    }

    /* SYNC */

    syncDashboardProfile();

    /* UI */

    updateProfileUI();
    updateCompletion();

    /* NOTIFICATION */

    addProfileNotification(
        getText(
            "Profile updated successfully.",
            "प्रोफाइल सफलतापूर्वक अपडेट भयो।"
        )
    );

    showToast(
        getText(
            "Profile saved successfully.",
            "प्रोफाइल सफलतापूर्वक सुरक्षित भयो।"
        ),
        "success"
    );
}

/* =========================================================
   UPDATE PROFILE UI
========================================================= */

function updateProfileUI() {
    const initials = getInitials(profile.name);

    /* HERO */

    setText(
        "heroName",
        profile.name || "—"
    );

    setText(
        "heroRole",
        profile.role ||
        "Digital Solutions Professional"
    );

    /* SIDEBAR */

    setText(
        "sidebarName",
        profile.name || "—"
    );

    setText(
        "sidebarRole",
        "Premium Member"
    );

    /* OVERVIEW */

    setText(
        "overviewName",
        profile.name || "—"
    );

    setText(
        "overviewEmail",
        profile.email || "—"
    );

    setText(
        "overviewPhone",
        profile.phone || "—"
    );

    setText(
        "overviewAddress",
        profile.address || "—"
    );

    /* AVATARS */

    updateAvatar(
        "profileAvatar",
        initials
    );

    updateAvatar(
        "miniAvatar",
        initials
    );

    updateAvatar(
        "sidebarAvatar",
        initials
    );
}

/* =========================================================
   UPDATE AVATAR
========================================================= */

function updateAvatar(elementId, initials) {
    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.innerHTML = "";

    if (profile.photo) {
        const image = document.createElement("img");

        image.src = profile.photo;
        image.alt = "Profile photo";
        image.loading = "lazy";

        image.onerror = function () {
            profile.photo = "";
            element.textContent = initials;

            saveProfile();
        };

        element.appendChild(image);

        return;
    }

    element.textContent = initials;
}

/* =========================================================
   PROFILE PHOTO UPLOAD
========================================================= */

function handlePhotoUpload(event) {
    const file =
        event.target.files &&
        event.target.files[0];

    if (!file) {
        return;
    }

    /* FILE TYPE */

    if (!file.type.startsWith("image/")) {
        showToast(
            getText(
                "Please select an image file.",
                "कृपया image file चयन गर्नुहोस्।"
            ),
            "warning"
        );

        event.target.value = "";
        return;
    }

    /* FILE SIZE */

    if (file.size > 2 * 1024 * 1024) {
        showToast(
            getText(
                "Image must be smaller than 2 MB.",
                "Image 2 MB भन्दा सानो हुनुपर्छ।"
            ),
            "warning"
        );

        event.target.value = "";
        return;
    }

    /* FILE READER */

    const reader = new FileReader();

    reader.onload = function () {
        profile.photo = reader.result;

        const saved = saveProfile();

        if (!saved) {
            return;
        }

        updateProfileUI();
        updateCompletion();
        syncDashboardProfile();

        addProfileNotification(
            getText(
                "Profile photo updated.",
                "प्रोफाइल फोटो अपडेट भयो।"
            )
        );

        showToast(
            getText(
                "Profile photo updated.",
                "प्रोफाइल फोटो अपडेट भयो।"
            ),
            "success"
        );
    };

    reader.onerror = function () {
        showToast(
            getText(
                "Could not load the image.",
                "फोटो load गर्न सकिएन।"
            ),
            "error"
        );

        event.target.value = "";
    };

    reader.readAsDataURL(file);
}

/* =========================================================
   RESET PROFILE
========================================================= */

function handleResetProfile() {
    const confirmed = window.confirm(
        getText(
            "Reset your profile to default information?",
            "प्रोफाइललाई default information मा reset गर्ने हो?"
        )
    );

    if (!confirmed) {
        return;
    }

    profile = {
        ...DEFAULT_PROFILE
    };

    const saved = saveProfile();

    if (!saved) {
        return;
    }

    fillProfileForm();
    updateProfileUI();
    updateCompletion();
    syncDashboardProfile();

    if (profilePhoto) {
        profilePhoto.value = "";
    }

    addProfileNotification(
        getText(
            "Profile was reset.",
            "प्रोफाइल reset भयो।"
        )
    );

    showToast(
        getText(
            "Profile has been reset.",
            "प्रोफाइल reset भयो।"
        ),
        "info"
    );
}

/* =========================================================
   PROFILE COMPLETION
========================================================= */

function updateCompletion() {
    const fields = [
        profile.name,
        profile.email,
        profile.phone,
        profile.address,
        profile.role,
        profile.bio,
        profile.photo
    ];

    const completed = fields.filter(
        value =>
            String(value || "").trim() !== ""
    ).length;

    const percent = Math.round(
        (completed / fields.length) * 100
    );

    setText(
        "completionPercent",
        `${percent}%`
    );

    const completionBar =
        document.getElementById(
            "completionBar"
        );

    if (completionBar) {
        completionBar.style.width =
            `${percent}%`;

        completionBar.setAttribute(
            "aria-valuenow",
            String(percent)
        );

        completionBar.setAttribute(
            "aria-valuemin",
            "0"
        );

        completionBar.setAttribute(
            "aria-valuemax",
            "100"
        );
    }
}

/* =========================================================
   THEME
========================================================= */

function loadTheme() {
    let saved = null;

    try {
        saved = localStorage.getItem(
            THEME_STORAGE_KEY
        );
    } catch (error) {
        console.warn("Theme loading error:", error);
    }

    const theme =
        saved === "dark"
            ? "dark"
            : "light";

    applyTheme(theme);
}

/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(theme) {
    const isDark = theme === "dark";

    if (isDark) {
        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );
    } else {
        document.documentElement.removeAttribute(
            "data-theme"
        );
    }

    updateThemeIcon(isDark);

    if (themeBtn) {
        themeBtn.setAttribute(
            "aria-pressed",
            String(isDark)
        );

        themeBtn.setAttribute(
            "title",
            getText(
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode",

                isDark
                    ? "Light mode मा जानुहोस्"
                    : "Dark mode खोल्नुहोस्"
            )
        );
    }
}

/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {
    const isDark =
        document.documentElement.getAttribute(
            "data-theme"
        ) === "dark";

    const newTheme =
        isDark
            ? "light"
            : "dark";

    try {
        localStorage.setItem(
            THEME_STORAGE_KEY,
            newTheme
        );
    } catch (error) {
        console.warn(
            "Theme save error:",
            error
        );
    }

    applyTheme(newTheme);
}

/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon(isDark) {
    if (!themeBtn) {
        return;
    }

    themeBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
}

/* =========================================================
   LANGUAGE
========================================================= */

function loadLanguage() {
    let saved = null;

    try {
        saved = localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        );
    } catch (error) {
        console.warn(
            "Language loading error:",
            error
        );
    }

    currentLanguage =
        saved === "en"
            ? "en"
            : "ne";

    applyLanguage();
}

/* =========================================================
   TOGGLE LANGUAGE
========================================================= */

function toggleLanguage() {
    currentLanguage =
        currentLanguage === "ne"
            ? "en"
            : "ne";

    try {
        localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            currentLanguage
        );
    } catch (error) {
        console.warn(
            "Language save error:",
            error
        );
    }

    applyLanguage();
}

/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {
    const lang =
        currentLanguage === "en"
            ? "en"
            : "ne";

    document.documentElement.setAttribute(
        "lang",
        lang
    );

    /* TEXT */

    document
        .querySelectorAll(
            "[data-ne][data-en]"
        )
        .forEach(element => {
            element.textContent =
                lang === "en"
                    ? element.dataset.en
                    : element.dataset.ne;
        });

    /* PLACEHOLDERS */

    document
        .querySelectorAll(
            "[data-placeholder-ne][data-placeholder-en]"
        )
        .forEach(element => {
            element.placeholder =
                lang === "en"
                    ? element.dataset.placeholderEn
                    : element.dataset.placeholderNe;
        });

    /* LANGUAGE BUTTON */

    if (currentLanguageElement) {
        currentLanguageElement.textContent =
            lang === "en"
                ? "English"
                : "नेपाली";
    }

    /* THEME BUTTON TITLE */

    const isDark =
        document.documentElement.getAttribute(
            "data-theme"
        ) === "dark";

    updateThemeIcon(isDark);

    if (themeBtn) {
        themeBtn.setAttribute(
            "title",
            getText(
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode",

                isDark
                    ? "Light mode मा जानुहोस्"
                    : "Dark mode खोल्नुहोस्"
            )
        );
    }
}

/* =========================================================
   DASHBOARD PROFILE SYNC
========================================================= */

function syncDashboardProfile() {
    try {
        let user = {};

        const oldUser =
            localStorage.getItem(
                USER_STORAGE_KEY
            );

        if (oldUser) {
            try {
                const parsed =
                    JSON.parse(oldUser);

                if (
                    parsed &&
                    typeof parsed === "object" &&
                    !Array.isArray(parsed)
                ) {
                    user = parsed;
                }
            } catch (error) {
                console.warn(
                    "Existing user data could not be parsed."
                );
            }
        }

        const syncedUser = {
            ...user,

            name:
                profile.name || "",

            username:
                profile.name || "",

            email:
                profile.email || "",

            phone:
                profile.phone || "",

            address:
                profile.address || "",

            role:
                profile.role || "",

            bio:
                profile.bio || "",

            photo:
                profile.photo || ""
        };

        localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(syncedUser)
        );

    } catch (error) {
        console.error(
            "Dashboard sync error:",
            error
        );
    }
}

/* =========================================================
   PROFILE NOTIFICATION
========================================================= */

function addProfileNotification(message) {
    try {
        let notifications = [];

        const saved =
            localStorage.getItem(
                NOTIFICATION_STORAGE_KEY
            );

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                notifications = parsed;
            }
        }

        notifications.unshift({
            id:
                Date.now() +
                Math.random()
                    .toString(36)
                    .slice(2),

            message: message,

            type: "profile",

            time:
                new Date().toISOString(),

            read: false
        });

        /* Keep latest 30 */

        notifications =
            notifications.slice(0, 30);

        localStorage.setItem(
            NOTIFICATION_STORAGE_KEY,
            JSON.stringify(notifications)
        );

    } catch (error) {
        console.warn(
            "Notification save error:",
            error
        );
    }
}

/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {
    const confirmed = window.confirm(
        getText(
            "Are you sure you want to logout?",
            "के तपाईं Logout गर्न चाहनुहुन्छ?"
        )
    );

    if (!confirmed) {
        return;
    }

    window.location.href = "login.html";
}

/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "info"
) {
    const oldToast =
        document.querySelector(
            ".profile-toast"
        );

    if (oldToast) {
        oldToast.remove();
    }

    const toast =
        document.createElement("div");

    toast.className =
        `profile-toast ${type}`;

    toast.setAttribute(
        "role",
        "status"
    );

    const iconMap = {
        success: "fa-circle-check",
        warning: "fa-triangle-exclamation",
        error: "fa-circle-xmark",
        info: "fa-circle-info"
    };

    const icon =
        iconMap[type] ||
        iconMap.info;

    toast.innerHTML = `
        <i
            class="fa-solid ${icon}"
            aria-hidden="true">
        </i>

        <span></span>

        <button
            type="button"
            class="profile-toast-close"
            aria-label="Close">
            <i
                class="fa-solid fa-xmark"
                aria-hidden="true">
            </i>
        </button>
    `;

    const messageElement =
        toast.querySelector("span");

    if (messageElement) {
        messageElement.textContent =
            message;
    }

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    let timeout = setTimeout(
        removeToast,
        3500
    );

    const closeButton =
        toast.querySelector(
            ".profile-toast-close"
        );

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            event => {
                event.stopPropagation();

                clearTimeout(timeout);
                removeToast();
            }
        );
    }

    toast.addEventListener(
        "click",
        event => {
            if (
                event.target.closest(
                    ".profile-toast-close"
                )
            ) {
                return;
            }

            clearTimeout(timeout);
            removeToast();
        }
    );

    function removeToast() {
        toast.classList.remove("show");

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 250);
    }
}

/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {
    if (!name) {
        return "TB";
    }

    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (!words.length) {
        return "TB";
    }

    if (words.length === 1) {
        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
}

/* =========================================================
   SET TEXT
========================================================= */

function setText(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

/* =========================================================
   LANGUAGE TEXT HELPER
========================================================= */

function getText(
    english,
    nepali
) {
    return currentLanguage === "en"
        ? english
        : nepali;
}

/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupProfileEvents() {

    /* PROFILE FORM */

    if (profileForm) {
        profileForm.addEventListener(
            "submit",
            handleProfileSubmit
        );
    }

    /* PHOTO */

    if (profilePhoto) {
        profilePhoto.addEventListener(
            "change",
            handlePhotoUpload
        );
    }

    /* RESET */

    if (resetProfile) {
        resetProfile.addEventListener(
            "click",
            handleResetProfile
        );
    }

    /* THEME */

    if (themeBtn) {
        themeBtn.addEventListener(
            "click",
            toggleTheme
        );
    }

    /* LANGUAGE */

    if (languageBtn) {
        languageBtn.addEventListener(
            "click",
            toggleLanguage
        );
    }

    /* LOGOUT */

    if (logoutBtn) {
        logoutBtn.addEventListener(
            "click",
            handleLogout
        );
    }
}

/* =========================================================
   DYNAMIC TOAST CSS
========================================================= */

function injectToastStyles() {
    if (
        document.getElementById(
            "profileToastStyles"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "profileToastStyles";

    style.textContent = `
        .profile-toast {
            position: fixed;
            right: 25px;
            bottom: 25px;
            z-index: 99999;

            min-width: 280px;
            max-width: 420px;

            padding: 13px 14px;

            display: flex;
            align-items: center;
            gap: 10px;

            border: 1px solid var(--border);
            border-radius: 13px;

            background: var(--card-bg);
            color: var(--text);

            box-shadow: var(--shadow-lg);

            font-size: 12px;
            font-weight: 650;

            opacity: 0;
            visibility: hidden;

            transform: translateY(15px);

            transition:
                opacity .25s ease,
                visibility .25s ease,
                transform .25s ease;

            cursor: pointer;
        }

        .profile-toast.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .profile-toast > i {
            flex-shrink: 0;
            font-size: 15px;
        }

        .profile-toast > span {
            flex: 1;
            line-height: 1.5;
        }

        .profile-toast.success > i {
            color: var(--success);
        }

        .profile-toast.warning > i {
            color: var(--warning);
        }

        .profile-toast.error > i {
            color: var(--danger);
        }

        .profile-toast.info > i {
            color: var(--primary);
        }

        .profile-toast-close {
            width: 27px;
            height: 27px;

            flex-shrink: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 0;
            border-radius: 8px;

            background: transparent;
            color: var(--text-light);

            cursor: pointer;
        }

        .profile-toast-close:hover {
            background: var(--primary-soft);
            color: var(--text);
        }

        @media (max-width: 520px) {
            .profile-toast {
                left: 15px;
                right: 15px;
                bottom: 15px;

                min-width: 0;
                max-width: none;
            }
        }
    `;

    document.head.appendChild(style);
}