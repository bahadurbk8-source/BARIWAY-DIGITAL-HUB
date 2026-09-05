/* =========================================================
   BARIWAY DIGITAL HUB
   CENTRAL NOTIFICATION SYSTEM
   notifications.js v3.0 FINAL STABLE

   Professional • Clean • Responsive • Secure
   LocalStorage • Nepali/English
   Read / Unread • Badge • Dropdown
   Same-tab Sync • Cross-tab Sync
   Dashboard Integration
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const NOTIFICATION_CONFIG = {

    storageKey: "bariwayNotifications",

    languageKey: "bariwayLanguage",

    maxNotifications: 50,

    defaultLanguage: "ne"

};


/* =========================================================
   DEFAULT NOTIFICATIONS
========================================================= */

const DEFAULT_NOTIFICATIONS = [

    {
        id: "welcome-001",
        type: "welcome",
        icon: "fa-solid fa-hand",
        titleNe: "BARIWAY Digital Hub मा स्वागत छ",
        titleEn: "Welcome to BARIWAY Digital Hub",
        messageNe: "तपाईंको Professional Dashboard तयार छ।",
        messageEn: "Your Professional Dashboard is ready.",
        time: new Date().toISOString(),
        read: false
    },

    {
        id: "project-001",
        type: "project",
        icon: "fa-solid fa-folder-open",
        titleNe: "Project Update",
        titleEn: "Project Update",
        messageNe: "तपाईंको Project Management System सक्रिय छ।",
        messageEn: "Your Project Management System is active.",
        time: new Date().toISOString(),
        read: false
    },

    {
        id: "system-001",
        type: "system",
        icon: "fa-solid fa-circle-check",
        titleNe: "System Ready",
        titleEn: "System Ready",
        messageNe: "Dashboard का मुख्य features सफलतापूर्वक लोड भएका छन्।",
        messageEn: "The main Dashboard features have loaded successfully.",
        time: new Date().toISOString(),
        read: true
    }

];


/* =========================================================
   GLOBAL STATE
========================================================= */

let notifications = [];

let currentNotificationLanguage =
    getSavedLanguage();

let notificationsInitialized = false;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initNotificationsSystem
);


/* =========================================================
   INITIALIZE
========================================================= */

function initNotificationsSystem() {

    if (notificationsInitialized) {

        return;

    }

    notificationsInitialized = true;


    loadNotifications();

    setupNotificationButton();

    setupMarkAllRead();

    setupViewAll();

    setupOutsideClick();

    setupEscapeKey();

    setupLanguageSync();

    setupStorageSync();

    setupSameTabSync();

    renderNotifications();

}


/* =========================================================
   SAFE STORAGE
========================================================= */

function getStorage(key, fallback = null) {

    try {

        const value =
            localStorage.getItem(key);

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
            value
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


/* =========================================================
   LANGUAGE
========================================================= */

function getSavedLanguage() {

    const language =
        getStorage(
            NOTIFICATION_CONFIG.languageKey,
            NOTIFICATION_CONFIG.defaultLanguage
        );

    return language === "en"
        ? "en"
        : "ne";

}


/* =========================================================
   LOAD NOTIFICATIONS
========================================================= */

function loadNotifications() {

    const saved =
        getStorage(
            NOTIFICATION_CONFIG.storageKey,
            null
        );


    if (!saved) {

        notifications =
            cloneDefaultNotifications();

        saveNotifications();

        return;

    }


    try {

        const parsed =
            JSON.parse(saved);


        if (Array.isArray(parsed)) {

            notifications =
                normalizeNotifications(parsed);

        } else {

            notifications =
                cloneDefaultNotifications();

            saveNotifications();

        }

    } catch (error) {

        console.warn(
            "BARIWAY: Invalid notification data.",
            error
        );


        notifications =
            cloneDefaultNotifications();


        saveNotifications();

    }


    sortNotifications();

}


/* =========================================================
   CLONE DEFAULT
========================================================= */

function cloneDefaultNotifications() {

    return DEFAULT_NOTIFICATIONS.map(
        function (notification) {

            return {
                ...notification
            };

        }
    );

}


/* =========================================================
   NORMALIZE DATA
========================================================= */

function normalizeNotifications(list) {

    return list
        .filter(
            function (item) {

                return (
                    item &&
                    typeof item === "object"
                );

            }
        )
        .map(
            function (item) {

                return {

                    id:
                        item.id ||
                        `notification-${Date.now()}-${Math.random()}`,

                    type:
                        item.type ||
                        "system",

                    icon:
                        item.icon ||
                        "fa-solid fa-bell",

                    titleNe:
                        item.titleNe ||
                        "नयाँ सूचना",

                    titleEn:
                        item.titleEn ||
                        "New Notification",

                    messageNe:
                        item.messageNe ||
                        "",

                    messageEn:
                        item.messageEn ||
                        "",

                    time:
                        item.time ||
                        new Date().toISOString(),

                    read:
                        item.read === true ||
                        item.isRead === true

                };

            }
        )
        .slice(
            0,
            NOTIFICATION_CONFIG.maxNotifications
        );

}


/* =========================================================
   SAVE
========================================================= */

function saveNotifications() {

    sortNotifications();


    const success =
        setStorage(
            NOTIFICATION_CONFIG.storageKey,
            JSON.stringify(notifications)
        );


    if (success) {

        dispatchNotificationUpdate();

    }


    return success;

}


/* =========================================================
   SORT
========================================================= */

function sortNotifications() {

    notifications.sort(
        function (a, b) {

            return (
                new Date(b.time || 0) -
                new Date(a.time || 0)
            );

        }
    );

}


/* =========================================================
   NOTIFICATION BUTTON
========================================================= */

function setupNotificationButton() {

    const button =
        document.getElementById(
            "notificationBtn"
        );


    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (!button || !panel) {

        return;

    }


    if (
        button.dataset.notificationBound ===
        "true"
    ) {

        return;

    }


    button.dataset.notificationBound =
        "true";


    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (
                panel.classList.contains("show")
            ) {

                closeNotificationPanel();

            } else {

                openNotificationPanel();

            }

        }
    );

}


/* =========================================================
   OPEN PANEL
========================================================= */

function openNotificationPanel() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const button =
        document.getElementById(
            "notificationBtn"
        );


    if (!panel) {

        return;

    }


    panel.classList.add("show");


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "true"
        );

    }

}


/* =========================================================
   CLOSE PANEL
========================================================= */

function closeNotificationPanel() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const button =
        document.getElementById(
            "notificationBtn"
        );


    if (panel) {

        panel.classList.remove("show");

    }


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   MARK ALL READ
========================================================= */

function setupMarkAllRead() {

    const button =
        document.getElementById(
            "markAllRead"
        );


    if (!button) {

        return;

    }


    if (
        button.dataset.notificationBound ===
        "true"
    ) {

        return;

    }


    button.dataset.notificationBound =
        "true";


    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            markAllNotificationsAsRead();

        }
    );

}


/* =========================================================
   MARK ALL FUNCTION
========================================================= */

function markAllNotificationsAsRead() {

    let changed = false;


    notifications.forEach(
        function (notification) {

            if (!notification.read) {

                notification.read = true;

                changed = true;

            }

        }
    );


    if (changed) {

        saveNotifications();

    }


    renderNotifications();

}


/* =========================================================
   VIEW ALL
========================================================= */

function setupViewAll() {

    const button =
        document.getElementById(
            "viewAllNotifications"
        );


    if (!button) {

        return;

    }


    if (
        button.dataset.notificationBound ===
        "true"
    ) {

        return;

    }


    button.dataset.notificationBound =
        "true";


    button.addEventListener(
        "click",
        function () {

            openNotificationPanel();

        }
    );

}


/* =========================================================
   OUTSIDE CLICK
========================================================= */

function setupOutsideClick() {

    document.addEventListener(
        "click",
        function (event) {

            const wrapper =
                document.querySelector(
                    ".notification-wrapper"
                );


            if (!wrapper) {

                return;

            }


            if (
                !wrapper.contains(
                    event.target
                )
            ) {

                closeNotificationPanel();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeNotificationPanel();

            }

        }
    );

}


/* =========================================================
   LANGUAGE SYNC
========================================================= */

function setupLanguageSync() {

    window.addEventListener(
        "bariwayLanguageChanged",
        function (event) {

            const language =
                event.detail &&
                event.detail.language;


            if (
                language === "ne" ||
                language === "en"
            ) {

                updateNotificationLanguage(
                    language
                );

            }

        }
    );

}


/* =========================================================
   STORAGE SYNC
========================================================= */

function setupStorageSync() {

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                NOTIFICATION_CONFIG.languageKey
            ) {

                updateNotificationLanguage(
                    event.newValue || "ne"
                );

            }


            if (
                event.key ===
                NOTIFICATION_CONFIG.storageKey
            ) {

                loadNotifications();

                renderNotifications();

            }

        }
    );

}


/* =========================================================
   SAME TAB SYNC
========================================================= */

function setupSameTabSync() {

    window.addEventListener(
        "bariwayNotificationsUpdated",
        function () {

            loadNotifications();

            renderNotifications();

        }
    );

}


/* =========================================================
   RENDER
========================================================= */

function renderNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );


    const unreadCount =
        getUnreadCount();


    updateNotificationBadge(
        unreadCount
    );


    updateNotificationSubtitle(
        unreadCount
    );


    if (!list) {

        return;

    }


    sortNotifications();


    if (!notifications.length) {

        list.innerHTML =
            createEmptyState();

        return;

    }


    list.innerHTML =
        notifications
            .slice(
                0,
                NOTIFICATION_CONFIG.maxNotifications
            )
            .map(
                createNotificationHTML
            )
            .join("");


    attachNotificationEvents();

}


/* =========================================================
   CREATE NOTIFICATION
========================================================= */

function createNotificationHTML(notification) {

    const language =
        currentNotificationLanguage;


    const title =
        language === "en"
            ? notification.titleEn
            : notification.titleNe;


    const message =
        language === "en"
            ? notification.messageEn
            : notification.messageNe;


    const unreadClass =
        notification.read
            ? ""
            : "unread";


    const time =
        formatNotificationTime(
            notification.time
        );


    return `

        <div
            class="notification-item ${unreadClass}"
            data-id="${escapeHTML(notification.id)}">

            <div class="notification-icon">

                <i class="${escapeHTML(
                    notification.icon ||
                    "fa-solid fa-bell"
                )}"></i>

            </div>


            <div class="notification-content">

                <div class="notification-item-top">

                    <strong>
                        ${escapeHTML(title)}
                    </strong>

                    ${
                        notification.read
                            ? ""
                            : `
                                <span
                                    class="notification-unread-dot">
                                </span>
                              `
                    }

                </div>


                <p>
                    ${escapeHTML(message)}
                </p>


                <small>
                    ${escapeHTML(time)}
                </small>

            </div>


            ${
                notification.read
                    ? ""
                    : `
                        <button
                            type="button"
                            class="notification-read-btn"
                            data-notification-read="${escapeHTML(notification.id)}"
                            aria-label="${
                                currentNotificationLanguage === "en"
                                    ? "Mark as read"
                                    : "पढेको बनाउनुहोस्"
                            }">

                            <i class="fa-solid fa-check"></i>

                        </button>
                      `
            }

        </div>

    `;

}


/* =========================================================
   EMPTY STATE
========================================================= */

function createEmptyState() {

    if (
        currentNotificationLanguage === "en"
    ) {

        return `

            <div class="notification-empty">

                <div class="notification-empty-icon">

                    <i class="fa-regular fa-bell-slash"></i>

                </div>

                <strong>
                    No notifications
                </strong>

                <p>
                    You're all caught up.
                </p>

            </div>

        `;

    }


    return `

        <div class="notification-empty">

            <div class="notification-empty-icon">

                <i class="fa-regular fa-bell-slash"></i>

            </div>

            <strong>
                कुनै सूचना छैन
            </strong>

            <p>
                हाल सबै सूचनाहरू हेर्नुभएको छ।
            </p>

        </div>

    `;

}


/* =========================================================
   ITEM EVENTS
========================================================= */

function attachNotificationEvents() {

    const buttons =
        document.querySelectorAll(
            "[data-notification-read]"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const id =
                        button.getAttribute(
                            "data-notification-read"
                        );


                    markNotificationAsRead(id);

                }
            );

        }
    );


    const items =
        document.querySelectorAll(
            ".notification-item"
        );


    items.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const id =
                        item.getAttribute(
                            "data-id"
                        );


                    markNotificationAsRead(id);

                }
            );

        }
    );

}


/* =========================================================
   MARK ONE AS READ
========================================================= */

function markNotificationAsRead(id) {

    const notification =
        notifications.find(
            function (item) {

                return String(item.id) ===
                       String(id);

            }
        );


    if (!notification) {

        return;

    }


    if (notification.read) {

        return;

    }


    notification.read = true;


    saveNotifications();

    renderNotifications();

}


/* =========================================================
   UNREAD COUNT
========================================================= */

function getUnreadCount() {

    return notifications.filter(
        function (notification) {

            return (
                notification &&
                notification.read !== true
            );

        }
    ).length;

}


/* =========================================================
   BADGE
========================================================= */

function updateNotificationBadge(count) {

    const badge =
        document.getElementById(
            "notificationBadge"
        );


    if (!badge) {

        return;

    }


    badge.textContent =
        count > 99
            ? "99+"
            : String(count);


    badge.style.display =
        count > 0
            ? "flex"
            : "none";


    badge.setAttribute(
        "aria-label",
        `${count} unread notifications`
    );

}


/* =========================================================
   SUBTITLE
========================================================= */

function updateNotificationSubtitle(count) {

    const subtitle =
        document.getElementById(
            "notificationSubtitle"
        );


    if (!subtitle) {

        return;

    }


    if (
        currentNotificationLanguage === "en"
    ) {

        subtitle.textContent =
            count === 1
                ? "1 new notification"
                : `${count} new notifications`;

        return;

    }


    subtitle.textContent =
        `${toNepaliNumber(count)} नयाँ सूचनाहरू`;

}


/* =========================================================
   LANGUAGE UPDATE
========================================================= */

function updateNotificationLanguage(language) {

    if (
        language !== "ne" &&
        language !== "en"
    ) {

        return;

    }


    currentNotificationLanguage =
        language;


    renderNotifications();

}


/* =========================================================
   ADD NOTIFICATION
========================================================= */

function addNotification(options = {}) {

    const notification = {

        id:
            options.id ||
            `notification-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        type:
            options.type ||
            "system",

        icon:
            options.icon ||
            "fa-solid fa-bell",

        titleNe:
            options.titleNe ||
            "नयाँ सूचना",

        titleEn:
            options.titleEn ||
            "New Notification",

        messageNe:
            options.messageNe ||
            "",

        messageEn:
            options.messageEn ||
            "",

        time:
            new Date().toISOString(),

        read: false

    };


    notifications.unshift(
        notification
    );


    notifications =
        notifications.slice(
            0,
            NOTIFICATION_CONFIG.maxNotifications
        );


    saveNotifications();

    renderNotifications();


    return {
        ...notification
    };

}


/* =========================================================
   REMOVE NOTIFICATION
========================================================= */

function removeNotification(id) {

    const originalLength =
        notifications.length;


    notifications =
        notifications.filter(
            function (notification) {

                return String(notification.id) !==
                       String(id);

            }
        );


    if (
        notifications.length !==
        originalLength
    ) {

        saveNotifications();

        renderNotifications();

        return true;

    }


    return false;

}


/* =========================================================
   CLEAR ALL
========================================================= */

function clearAllNotifications() {

    notifications = [];


    saveNotifications();

    renderNotifications();

}


/* =========================================================
   RESET DEFAULT
========================================================= */

function resetNotifications() {

    notifications =
        cloneDefaultNotifications();


    saveNotifications();

    renderNotifications();

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatNotificationTime(value) {

    if (!value) {

        return currentNotificationLanguage === "en"
            ? "Just now"
            : "भर्खरै";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return currentNotificationLanguage === "en"
            ? "Just now"
            : "भर्खरै";

    }


    const now =
        new Date();


    const difference =
        Math.floor(
            (
                now.getTime() -
                date.getTime()
            ) / 1000
        );


    if (difference < 60) {

        return currentNotificationLanguage === "en"
            ? "Just now"
            : "भर्खरै";

    }


    const minutes =
        Math.floor(
            difference / 60
        );


    if (minutes < 60) {

        return currentNotificationLanguage === "en"
            ? `${minutes} min ago`
            : `${toNepaliNumber(minutes)} मिनेट अघि`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return currentNotificationLanguage === "en"
            ? `${hours} hr ago`
            : `${toNepaliNumber(hours)} घण्टा अघि`;

    }


    const days =
        Math.floor(
            hours / 24
        );


    if (days < 7) {

        return currentNotificationLanguage === "en"
            ? `${days} day${days > 1 ? "s" : ""} ago`
            : `${toNepaliNumber(days)} दिन अघि`;

    }


    return new Intl.DateTimeFormat(
        currentNotificationLanguage === "en"
            ? "en-US"
            : "ne-NP",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    ).format(date);

}


/* =========================================================
   NEPALI NUMBER
========================================================= */

function toNepaliNumber(number) {

    const nepaliDigits = [
        "०",
        "१",
        "२",
        "३",
        "४",
        "५",
        "६",
        "७",
        "८",
        "९"
    ];


    return String(number).replace(
        /\d/g,
        function (digit) {

            return nepaliDigits[
                Number(digit)
            ];

        }
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)

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
   UPDATE EVENT
========================================================= */

function dispatchNotificationUpdate() {

    try {

        window.dispatchEvent(
            new CustomEvent(
                "bariwayNotificationsUpdated",
                {
                    detail: {
                        count:
                            notifications.length,

                        unread:
                            getUnreadCount()

                    }

                }
            )
        );

    } catch (error) {

        console.warn(
            "BARIWAY: Notification event failed.",
            error
        );

    }

}


/* =========================================================
   GLOBAL API
========================================================= */

window.BariwayNotifications = {

    add:
        addNotification,

    remove:
        removeNotification,

    markAsRead:
        markNotificationAsRead,

    markAllAsRead:
        markAllNotificationsAsRead,

    clear:
        clearAllNotifications,

    reset:
        resetNotifications,

    getAll:
        function () {

            return notifications.map(
                function (notification) {

                    return {
                        ...notification
                    };

                }
            );

        },

    getUnreadCount:
        getUnreadCount,

    open:
        openNotificationPanel,

    close:
        closeNotificationPanel,

    setLanguage:
        updateNotificationLanguage,

    refresh:
        function () {

            loadNotifications();

            renderNotifications();

        }

};


/* =========================================================
   GLOBAL SHORTCUT
========================================================= */

window.addBariwayNotification =
    addNotification;


/* =========================================================
   END
   BARIWAY DIGITAL HUB
   notifications.js v3.0 FINAL STABLE
========================================================= */