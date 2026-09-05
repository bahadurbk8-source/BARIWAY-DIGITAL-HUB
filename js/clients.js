/* =========================================================
   BARIWAY DIGITAL HUB
   CLIENT MANAGEMENT MODULE
   clients.js v2.0 FINAL

   Add • Edit • Delete
   Search • Filter
   LocalStorage
   Dark/Light Mode
   Nepali/English
   Modal System
   Notifications
   Dashboard Sync
   Responsive • Stable
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const CLIENT_CONFIG = {

    storage: {
        clients: "bariwayClients",
        theme: "bariwayTheme",
        language: "bariwayLanguage",
        notifications: "bariwayNotifications",
        user: "bariwayUser",
        legacyUser: "user"
    },

    defaultClients: [

        {
            id: "client-001",
            name: "BARIWAY Digital Hub",
            email: "info@bariway.com",
            phone: "+977 9800000000",
            project: "Digital Hub Website",
            status: "active",
            address: "Kathmandu, Nepal",
            createdAt: "2026-01-10"
        },

        {
            id: "client-002",
            name: "Municipality Office",
            email: "office@example.com",
            phone: "+977 9811111111",
            project: "Certificate Management System",
            status: "pending",
            address: "Nepal",
            createdAt: "2026-02-15"
        },

        {
            id: "client-003",
            name: "Creative Solutions",
            email: "hello@creative.com",
            phone: "+977 9822222222",
            project: "Brand Identity Design",
            status: "completed",
            address: "Pokhara, Nepal",
            createdAt: "2026-03-05"
        }

    ]

};


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let clients = [];

let currentLanguage = "ne";

let editingClientId = null;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initClients
);


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initClients() {

    loadClients();

    initLanguage();

    initTheme();

    initSearch();

    initStatusFilter();

    initModal();

    initClientForm();

    initLogout();

    initNavigation();

    renderClients();

    updateStatistics();

    updateCurrentYear();

}


/* =========================================================
   SAFE DOM HELPER
========================================================= */

function $(id) {

    return document.getElementById(id);

}


/* =========================================================
   CLIENT STORAGE
========================================================= */

function loadClients() {

    try {

        const saved =
            localStorage.getItem(
                CLIENT_CONFIG.storage.clients
            );


        if (saved) {

            const parsed =
                JSON.parse(saved);


            if (Array.isArray(parsed)) {

                clients = parsed;

                return;

            }

        }

    } catch (error) {

        console.warn(
            "BARIWAY: Unable to load clients.",
            error
        );

    }


    clients =
        CLIENT_CONFIG.defaultClients.map(
            client => ({ ...client })
        );


    saveClients();

}


/* =========================================================
   SAVE CLIENTS
========================================================= */

function saveClients() {

    try {

        localStorage.setItem(
            CLIENT_CONFIG.storage.clients,
            JSON.stringify(clients)
        );

    } catch (error) {

        console.warn(
            "BARIWAY: Unable to save clients.",
            error
        );

    }

}


/* =========================================================
   GENERATE UNIQUE ID
========================================================= */

function generateClientId() {

    return (
        "client-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


/* =========================================================
   RENDER CLIENT TABLE
========================================================= */

function renderClients() {

    const tableBody =
        $("clientTableBody");


    if (!tableBody) {
        return;
    }


    const searchInput =
        $("clientSearch");


    const statusFilter =
        $("statusFilter");


    const query =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const filter =
        statusFilter
            ? statusFilter.value
            : "all";


    let filteredClients =
        clients.filter(function (client) {

            const searchableText = [

                client.name,

                client.email,

                client.phone,

                client.project,

                client.address

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                !query ||
                searchableText.includes(query);


            const matchesStatus =
                filter === "all" ||
                client.status === filter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    tableBody.innerHTML = "";


    if (!filteredClients.length) {

        renderEmptyState(tableBody);

        return;

    }


    filteredClients.forEach(
        function (client) {

            tableBody.appendChild(
                createClientRow(client)
            );

        }
    );

}


/* =========================================================
   CREATE CLIENT ROW
========================================================= */

function createClientRow(client) {

    const row =
        document.createElement("tr");


    row.dataset.clientId =
        client.id;


    const status =
        normalizeStatus(client.status);


    row.innerHTML = `

        <td>

            <div class="client-name-cell">

                <div class="client-avatar">
                    ${getInitials(client.name)}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(client.name)}
                    </strong>

                    <small>
                        ${escapeHTML(client.address || "—")}
                    </small>

                </div>

            </div>

        </td>


        <td>

            <div class="contact-cell">

                <span>
                    <i class="fa-solid fa-envelope"></i>
                    ${escapeHTML(client.email || "—")}
                </span>

                <span>
                    <i class="fa-solid fa-phone"></i>
                    ${escapeHTML(client.phone || "—")}
                </span>

            </div>

        </td>


        <td>

            <span class="project-name">
                ${escapeHTML(client.project || "—")}
            </span>

        </td>


        <td>

            <span class="client-status status-${status}">
                ${getStatusLabel(status)}
            </span>

        </td>


        <td>

            <div class="client-actions">

                <button
                    type="button"
                    class="edit-client"
                    data-id="${escapeAttribute(client.id)}"
                    title="${currentLanguage === "en" ? "Edit" : "सम्पादन"}">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    type="button"
                    class="delete-client"
                    data-id="${escapeAttribute(client.id)}"
                    title="${currentLanguage === "en" ? "Delete" : "मेटाउनुहोस्"}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </td>

    `;


    const editButton =
        row.querySelector(".edit-client");


    const deleteButton =
        row.querySelector(".delete-client");


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                editClient(client.id);

            }
        );

    }


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            function () {

                deleteClient(client.id);

            }
        );

    }


    return row;

}


/* =========================================================
   EMPTY STATE
========================================================= */

function renderEmptyState(tableBody) {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td colspan="5">

            <div class="empty-state">

                <i class="fa-solid fa-users-slash"></i>

                <h3>
                    ${
                        currentLanguage === "en"
                            ? "No clients found"
                            : "कुनै क्लाइन्ट भेटिएन"
                    }
                </h3>

                <p>
                    ${
                        currentLanguage === "en"
                            ? "Try changing your search or filter."
                            : "Search वा Filter परिवर्तन गरेर पुनः प्रयास गर्नुहोस्।"
                    }
                </p>

            </div>

        </td>

    `;


    tableBody.appendChild(row);

}


/* =========================================================
   ADD CLIENT
========================================================= */

function addClient(event) {

    if (event) {
        event.preventDefault();
    }


    const name =
        $("clientName")?.value.trim();


    const email =
        $("clientEmail")?.value.trim();


    const phone =
        $("clientPhone")?.value.trim();


    const project =
        $("clientProject")?.value.trim();


    const status =
        $("clientStatus")?.value;


    const address =
        $("clientAddress")?.value.trim();


    if (!name || !email) {

        showMessage(
            currentLanguage === "en"
                ? "Please enter client name and email."
                : "कृपया क्लाइन्टको नाम र Email भर्नुहोस्।",
            "error"
        );

        return;

    }


    const newClient = {

        id: generateClientId(),

        name: name,

        email: email,

        phone: phone,

        project: project,

        status: status || "active",

        address: address,

        createdAt:
            new Date()
                .toISOString()
                .split("T")[0]

    };


    clients.unshift(newClient);


    saveClients();

    renderClients();

    updateStatistics();

    addNotification(
        "client",
        currentLanguage === "en"
            ? `New client added: ${name}`
            : `नयाँ क्लाइन्ट थपियो: ${name}`
    );


    closeModal();

    resetForm();


    showMessage(
        currentLanguage === "en"
            ? "Client added successfully."
            : "क्लाइन्ट सफलतापूर्वक थपियो।",
        "success"
    );

}


/* =========================================================
   EDIT CLIENT
========================================================= */

function editClient(id) {

    const client =
        clients.find(
            item => item.id === id
        );


    if (!client) {
        return;
    }


    editingClientId =
        id;


    if ($("clientId")) {
        $("clientId").value = id;
    }


    if ($("clientName")) {
        $("clientName").value =
            client.name || "";
    }


    if ($("clientEmail")) {
        $("clientEmail").value =
            client.email || "";
    }


    if ($("clientPhone")) {
        $("clientPhone").value =
            client.phone || "";
    }


    if ($("clientProject")) {
        $("clientProject").value =
            client.project || "";
    }


    if ($("clientStatus")) {
        $("clientStatus").value =
            client.status || "active";
    }


    if ($("clientAddress")) {
        $("clientAddress").value =
            client.address || "";
    }


    const modalTitle =
        $("modalTitle");


    if (modalTitle) {

        modalTitle.textContent =
            currentLanguage === "en"
                ? "Edit Client"
                : "क्लाइन्ट सम्पादन गर्नुहोस्";

    }


    openModal();

}


/* =========================================================
   UPDATE CLIENT
========================================================= */

function updateClient(event) {

    if (event) {
        event.preventDefault();
    }


    const index =
        clients.findIndex(
            client =>
                client.id === editingClientId
        );


    if (index === -1) {

        addClient(event);

        return;

    }


    const name =
        $("clientName")?.value.trim();


    const email =
        $("clientEmail")?.value.trim();


    if (!name || !email) {

        showMessage(
            currentLanguage === "en"
                ? "Please enter client name and email."
                : "कृपया क्लाइन्टको नाम र Email भर्नुहोस्।",
            "error"
        );

        return;

    }


    clients[index] = {

        ...clients[index],

        name: name,

        email: email,

        phone:
            $("clientPhone")?.value.trim() || "",

        project:
            $("clientProject")?.value.trim() || "",

        status:
            $("clientStatus")?.value || "active",

        address:
            $("clientAddress")?.value.trim() || ""

    };


    saveClients();

    renderClients();

    updateStatistics();


    addNotification(
        "client",
        currentLanguage === "en"
            ? `Client updated: ${name}`
            : `क्लाइन्ट अपडेट गरियो: ${name}`
    );


    closeModal();

    resetForm();


    showMessage(
        currentLanguage === "en"
            ? "Client updated successfully."
            : "क्लाइन्ट सफलतापूर्वक अपडेट भयो।",
        "success"
    );

}


/* =========================================================
   DELETE CLIENT
========================================================= */

function deleteClient(id) {

    const client =
        clients.find(
            item => item.id === id
        );


    if (!client) {
        return;
    }


    const message =
        currentLanguage === "en"
            ? `Delete "${client.name}"?`
            : `"${client.name}" लाई मेटाउन चाहनुहुन्छ?`;


    if (!window.confirm(message)) {
        return;
    }


    clients =
        clients.filter(
            item => item.id !== id
        );


    saveClients();

    renderClients();

    updateStatistics();


    addNotification(
        "client",
        currentLanguage === "en"
            ? `Client deleted: ${client.name}`
            : `क्लाइन्ट मेटाइयो: ${client.name}`
    );


    showMessage(
        currentLanguage === "en"
            ? "Client deleted successfully."
            : "क्लाइन्ट सफलतापूर्वक मेटाइयो।",
        "success"
    );

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const total =
        clients.length;


    const active =
        clients.filter(
            client =>
                client.status === "active"
        ).length;


    const pending =
        clients.filter(
            client =>
                client.status === "pending"
        ).length;


    const completed =
        clients.filter(
            client =>
                client.status === "completed"
        ).length;


    setText(
        "totalClients",
        total
    );


    setText(
        "activeClients",
        active
    );


    setText(
        "pendingClients",
        pending
    );


    setText(
        "completedClients",
        completed
    );


    /*
       Dashboard synchronization
    */

    window.dispatchEvent(
        new CustomEvent(
            "bariwayClientsUpdated",
            {
                detail: {
                    total,
                    active,
                    pending,
                    completed
                }
            }
        )
    );

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const search =
        $("clientSearch");


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        renderClients
    );


    search.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                search.value = "";

                renderClients();

                search.blur();

            }

        }
    );

}


/* =========================================================
   STATUS FILTER
========================================================= */

function initStatusFilter() {

    const filter =
        $("statusFilter");


    if (!filter) {
        return;
    }


    filter.addEventListener(
        "change",
        renderClients
    );

}


/* =========================================================
   MODAL SYSTEM
========================================================= */

function initModal() {

    const addButton =
        $("addClientBtn");


    const closeButton =
        $("closeModal");


    const cancelButton =
        $("cancelClient");


    const modal =
        $("clientModal");


    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                editingClientId = null;

                resetForm();

                setAddModalTitle();

                openModal();

            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                closeModal();

            }

        }
    );

}


function openModal() {

    const modal =
        $("clientModal");


    if (!modal) {
        return;
    }


    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        function () {

            $("clientName")?.focus();

        },
        100
    );

}


function closeModal() {

    const modal =
        $("clientModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );


    editingClientId = null;

    if ($("clientId")) {
        $("clientId").value = "";
    }

}


/* =========================================================
   CLIENT FORM
========================================================= */

function initClientForm() {

    const form =
        $("clientForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (editingClientId) {

                updateClient(event);

            } else {

                addClient(event);

            }

        }
    );

}


/* =========================================================
   RESET FORM
========================================================= */

function resetForm() {

    const form =
        $("clientForm");


    if (form) {

        form.reset();

    }


    if ($("clientId")) {

        $("clientId").value = "";

    }


    editingClientId = null;

}


/* =========================================================
   MODAL TITLE
========================================================= */

function setAddModalTitle() {

    const title =
        $("modalTitle");


    if (!title) {
        return;
    }


    title.textContent =
        currentLanguage === "en"
            ? "Add New Client"
            : "नयाँ क्लाइन्ट थप्नुहोस्";

}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function initLanguage() {

    currentLanguage =
        localStorage.getItem(
            CLIENT_CONFIG.storage.language
        ) || "ne";


    applyLanguage(
        currentLanguage
    );


    const languageButton =
        $("languageBtn");


    if (!languageButton) {
        return;
    }


    languageButton.addEventListener(
        "click",
        function () {

            changeLanguage(
                currentLanguage === "ne"
                    ? "en"
                    : "ne"
            );

        }
    );

}


function changeLanguage(language) {

    if (
        language !== "ne" &&
        language !== "en"
    ) {
        return;
    }


    currentLanguage =
        language;


    localStorage.setItem(
        CLIENT_CONFIG.storage.language,
        language
    );


    applyLanguage(language);

    renderClients();

    updateModalLanguage();

}


function applyLanguage(language) {

    document
        .querySelectorAll(
            "[data-ne][data-en]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    language === "en"
                        ? element.dataset.en
                        : element.dataset.ne;

            }
        );


    const languageText =
        $("currentLanguage");


    if (languageText) {

        languageText.textContent =
            language === "en"
                ? "English"
                : "नेपाली";

    }


    document
        .querySelectorAll(
            "[data-placeholder-ne][data-placeholder-en]"
        )
        .forEach(
            function (element) {

                element.placeholder =
                    language === "en"
                        ? element.dataset.placeholderEn
                        : element.dataset.placeholderNe;

            }
        );


    updateSelectLanguage();

}


function updateSelectLanguage() {

    const select =
        $("statusFilter");


    if (!select) {
        return;
    }


    select
        .querySelectorAll(
            "option[data-ne][data-en]"
        )
        .forEach(
            function (option) {

                option.textContent =
                    currentLanguage === "en"
                        ? option.dataset.en
                        : option.dataset.ne;

            }
        );

}


function updateModalLanguage() {

    const title =
        $("modalTitle");


    if (title) {

        if (editingClientId) {

            title.textContent =
                currentLanguage === "en"
                    ? "Edit Client"
                    : "क्लाइन्ट सम्पादन गर्नुहोस्";

        } else {

            setAddModalTitle();

        }

    }

}


/* =========================================================
   THEME SYSTEM
========================================================= */

function initTheme() {

    const savedTheme =
        localStorage.getItem(
            CLIENT_CONFIG.storage.theme
        ) || "dark";


    applyTheme(savedTheme);


    const themeButton =
        $("themeBtn");


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            toggleTheme
        );

    }

}


function applyTheme(theme) {

    const normalized =
        theme === "light"
            ? "light"
            : "dark";


    document.body.classList.toggle(
        "light",
        normalized === "light"
    );


    localStorage.setItem(
        CLIENT_CONFIG.storage.theme,
        normalized
    );


    updateThemeIcon();

}


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


function updateThemeIcon() {

    const button =
        $("themeBtn");


    if (!button) {
        return;
    }


    const icon =
        button.querySelector("i");


    if (!icon) {
        return;
    }


    const isLight =
        document.body.classList.contains(
            "light"
        );


    icon.classList.toggle(
        "fa-sun",
        isLight
    );


    icon.classList.toggle(
        "fa-moon",
        !isLight
    );


    button.title =
        isLight
            ? "Dark Mode"
            : "Light Mode";

}


/* =========================================================
   LOGOUT
========================================================= */

function initLogout() {

    const logoutButton =
        $("logoutBtn");


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        logout
    );

}


function logout() {

    const message =
        currentLanguage === "en"
            ? "Are you sure you want to logout?"
            : "के तपाईं Logout गर्न चाहनुहुन्छ?";


    if (!window.confirm(message)) {
        return;
    }


    localStorage.removeItem(
        CLIENT_CONFIG.storage.user
    );


    localStorage.removeItem(
        CLIENT_CONFIG.storage.legacyUser
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    document
        .querySelectorAll(
            ".sidebar-nav a"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(
                                ".sidebar-nav a"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                        link.classList.add(
                            "active"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   NOTIFICATION SYSTEM
========================================================= */

function addNotification(
    type,
    message
) {

    let notifications = [];


    try {

        const saved =
            localStorage.getItem(
                CLIENT_CONFIG.storage.notifications
            );


        if (saved) {

            const parsed =
                JSON.parse(saved);


            if (Array.isArray(parsed)) {

                notifications = parsed;

            }

        }

    } catch (error) {

        console.warn(
            "BARIWAY: Notification storage error.",
            error
        );

    }


    notifications.unshift({

        id:
            "notification-" +
            Date.now(),

        type: type,

        message: message,

        read: false,

        time:
            new Date().toISOString()

    });


    /*
       Keep latest 50 notifications
    */

    notifications =
        notifications.slice(0, 50);


    try {

        localStorage.setItem(
            CLIENT_CONFIG.storage.notifications,
            JSON.stringify(notifications)
        );

    } catch (error) {

        console.warn(
            "BARIWAY: Unable to save notification.",
            error
        );

    }


    /*
       Notify central notification system
    */

    window.dispatchEvent(
        new CustomEvent(
            "bariwayNotificationAdded",
            {
                detail: {
                    type,
                    message
                }
            }
        )
    );

}


/* =========================================================
   MESSAGE / TOAST
========================================================= */

function showMessage(
    message,
    type = "success"
) {

    let toast =
        document.querySelector(
            ".bariway-toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.className =
            "bariway-toast";


        document.body.appendChild(
            toast
        );

    }


    toast.className =
        "bariway-toast " + type;


    toast.innerHTML = `

        <i class="fa-solid ${
            type === "error"
                ? "fa-circle-exclamation"
                : "fa-circle-check"
        }"></i>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    requestAnimationFrame(
        function () {

            toast.classList.add(
                "show"
            );

        }
    );


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   HELPERS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        $(id);


    if (element) {

        element.textContent =
            value;

    }

}


function normalizeStatus(status) {

    const validStatuses = [

        "active",

        "pending",

        "completed"

    ];


    return validStatuses.includes(
        status
    )
        ? status
        : "pending";

}


function getStatusLabel(status) {

    const labels = {

        active: {
            ne: "सक्रिय",
            en: "Active"
        },

        pending: {
            ne: "प्रतीक्षामा",
            en: "Pending"
        },

        completed: {
            ne: "पूरा",
            en: "Completed"
        }

    };


    return labels[status]?.[
        currentLanguage
    ] || status;

}


function getInitials(name) {

    if (!name) {
        return "CL";
    }


    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);


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


function escapeHTML(value) {

    return String(value ?? "")
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


function escapeAttribute(value) {

    return escapeHTML(value);

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    new Date()
                        .getFullYear();

            }
        );

}


/* =========================================================
   GLOBAL API
========================================================= */

window.addClient =
    addClient;

window.editClient =
    editClient;

window.deleteClient =
    deleteClient;

window.changeLanguage =
    changeLanguage;

window.toggleTheme =
    toggleTheme;

window.logout =
    logout;


/* =========================================================
   END OF CLIENTS.JS v2.0 FINAL
========================================================= */