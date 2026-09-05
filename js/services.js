/* =========================================================
   BARIWAY DIGITAL HUB
   SERVICES MANAGEMENT
   services.js v2.0 FINAL

   Professional • Stable • Responsive

   Features:
   • Add Service
   • Edit Service
   • Delete Service
   • Search
   • Category Filter
   • Status Filter
   • Featured Services
   • Statistics
   • LocalStorage
   • Dark / Light Mode
   • Language Toggle
   • Date & Time
   • Notifications
   • Logout
   • User Profile
   • Toast Messages
   • Modal Management
   • Keyboard Support
========================================================= */

"use strict";


/* =========================================================
   GLOBAL
========================================================= */

let services = [];
let editingServiceId = null;
let isNepali = true;

const STORAGE_KEY = "bariwayServices";
const THEME_KEY = "bariwayTheme";
const USER_KEY = "bariwayUser";


/* =========================================================
   DEFAULT SERVICES
========================================================= */

const defaultServices = [

    {
        id: 1,
        name: "Website Development",
        category: "web",
        status: "active",
        price: "Starting from $100",
        featured: true,
        description:
            "Professional responsive websites designed for businesses, portfolios and organizations."
    },

    {
        id: 2,
        name: "Software Development",
        category: "software",
        status: "active",
        price: "Starting from $250",
        featured: true,
        description:
            "Custom desktop and business software solutions built according to your requirements."
    },

    {
        id: 3,
        name: "AI Solutions",
        category: "ai",
        status: "active",
        price: "Starting from $150",
        featured: true,
        description:
            "Modern AI-powered solutions, automation and intelligent digital tools for your business."
    },

    {
        id: 4,
        name: "Graphic Design",
        category: "design",
        status: "active",
        price: "Starting from $50",
        featured: false,
        description:
            "Creative logos, social media graphics, branding materials and professional designs."
    },

    {
        id: 5,
        name: "Digital Marketing",
        category: "marketing",
        status: "active",
        price: "Starting from $100",
        featured: false,
        description:
            "Digital marketing strategies to improve online presence, reach and business growth."
    },

    {
        id: 6,
        name: "Video Editing",
        category: "video",
        status: "active",
        price: "Starting from $40",
        featured: false,
        description:
            "Professional video editing for social media, YouTube, promotional and business content."
    },

    {
        id: 7,
        name: "Computer Training",
        category: "training",
        status: "inactive",
        price: "Starting from $30",
        featured: false,
        description:
            "Practical computer and digital skills training for beginners and professionals."
    }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const elements = {

    serviceGrid:
        document.getElementById("serviceGrid"),

    emptyState:
        document.getElementById("emptyState"),

    totalServices:
        document.getElementById("totalServices"),

    activeServices:
        document.getElementById("activeServices"),

    inactiveServices:
        document.getElementById("inactiveServices"),

    featuredServices:
        document.getElementById("featuredServices"),

    serviceCount:
        document.getElementById("serviceCount"),

    serviceSearch:
        document.getElementById("serviceSearch"),

    categoryFilter:
        document.getElementById("serviceCategoryFilter"),

    statusFilter:
        document.getElementById("serviceStatusFilter"),

    addServiceBtn:
        document.getElementById("addServiceBtn"),

    modal:
        document.getElementById("serviceModal"),

    modalClose:
    document.getElementById("closeModal"),

    modalCancel:
        document.getElementById("modalCancel"),

    modalTitle:
        document.getElementById("modalTitle"),

    modalSubtitle:
        document.getElementById("modalSubtitle"),

    serviceForm:
        document.getElementById("serviceForm"),

    serviceName:
        document.getElementById("serviceName"),

    serviceCategory:
        document.getElementById("serviceCategory"),

    serviceStatus:
        document.getElementById("serviceStatus"),

    servicePrice:
        document.getElementById("servicePrice"),

    serviceFeatured:
        document.getElementById("serviceFeatured"),

    serviceDescription:
        document.getElementById("serviceDescription"),

    saveButtonText:
        document.getElementById("saveButtonText"),

    datetime:
        document.getElementById("datetime"),

    themeToggle:
        document.getElementById("themeToggle"),

    languageBtn:
        document.getElementById("languageBtn"),

    currentLanguage:
        document.getElementById("currentLanguage"),

    notificationBtn:
        document.getElementById("notificationBtn"),

    logoutBtn:
        document.getElementById("logoutBtn"),

    sidebarUserName:
        document.getElementById("sidebarUserName"),

    sidebarAvatar:
        document.getElementById("sidebarAvatar"),

    currentYear:
        document.getElementById("currentYear")

};


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadServices();

    loadTheme();

    loadUser();

    updateDateTime();

    setInterval(updateDateTime, 1000);

    updateYear();

    setupEvents();

    renderServices();

});


/* =========================================================
   LOAD SERVICES
========================================================= */

function loadServices() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            services =
                cloneDefaultServices();

            saveServices();

            return;

        }


        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {

            services =
                cloneDefaultServices();

            saveServices();

            return;

        }


        /*
         * पुरानो/गलत data भएमा
         * default structure सुरक्षित राख्ने
         */

        services =
            parsed
                .filter(isValidService)
                .map(normalizeService);


        /*
         * यदि LocalStorage मा
         * कुनै service नै छैन भने
         */

        if (services.length === 0) {

            services =
                cloneDefaultServices();

            saveServices();

        }

    } catch (error) {

        console.error(
            "Services loading error:",
            error
        );

        services =
            cloneDefaultServices();

        saveServices();

    }

}


/* =========================================================
   CLONE DEFAULT SERVICES
========================================================= */

function cloneDefaultServices() {

    return defaultServices.map(service => ({
        ...service
    }));

}


/* =========================================================
   VALIDATE SERVICE
========================================================= */

function isValidService(service) {

    return (
        service &&
        typeof service === "object" &&
        service.name &&
        service.category &&
        service.status
    );

}


/* =========================================================
   NORMALIZE SERVICE
========================================================= */

function normalizeService(service) {

    return {

        id:
            service.id ||
            Date.now() +
            Math.floor(Math.random() * 1000),

        name:
            String(service.name || "").trim(),

        category:
            service.category || "web",

        status:
            service.status === "inactive"
                ? "inactive"
                : "active",

        price:
            String(service.price || "").trim(),

        featured:
            service.featured === true ||
            service.featured === "yes",

        description:
            String(
                service.description || ""
            ).trim()

    };

}


/* =========================================================
   SAVE SERVICES
========================================================= */

function saveServices() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(services)
        );

    } catch (error) {

        console.error(
            "Unable to save services:",
            error
        );

        showToast(
            "Unable to save services."
        );

    }

}


/* =========================================================
   SETUP EVENTS
========================================================= */

function setupEvents() {

    /* ADD */

    elements.addServiceBtn?.addEventListener(
        "click",
        openAddModal
    );


    /* MODAL CLOSE */

   elements.modalClose?.addEventListener(
    "click",
    function(event) {

        event.preventDefault();
        event.stopPropagation();

        closeModal();

    }
);


    elements.modalCancel?.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        closeModal();

    }
);

    /* OUTSIDE CLICK */

    elements.modal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elements.modal
            ) {

                closeModal();

            }

        }
    );


    /* FORM */

    elements.serviceForm?.addEventListener(
        "submit",
        handleServiceSubmit
    );


    /* SEARCH */

    elements.serviceSearch?.addEventListener(
        "input",
        renderServices
    );


    /* CATEGORY */

    elements.categoryFilter?.addEventListener(
        "change",
        renderServices
    );


    /* STATUS */

    elements.statusFilter?.addEventListener(
        "change",
        renderServices
    );


    /* THEME */

    elements.themeToggle?.addEventListener(
        "click",
        toggleTheme
    );


    /* LANGUAGE */

    elements.languageBtn?.addEventListener(
        "click",
        toggleLanguage
    );


    /* NOTIFICATION */

    elements.notificationBtn?.addEventListener(
        "click",
        showNotification
    );


    /* LOGOUT */

    elements.logoutBtn?.addEventListener(
        "click",
        logout
    );


    /* ESCAPE */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                elements.modal?.classList.contains(
                    "show"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   RENDER SERVICES
========================================================= */

function renderServices() {

    if (!elements.serviceGrid) return;


    const search =
        elements.serviceSearch?.value
            ?.trim()
            .toLowerCase() || "";


    const category =
        elements.categoryFilter?.value ||
        "all";


    const status =
        elements.statusFilter?.value ||
        "all";


    const filteredServices =
        services.filter(service => {

            const searchableText =
                `
                ${service.name}
                ${service.description}
                ${getCategoryName(service.category)}
                ${service.price}
                `.toLowerCase();


            const matchesSearch =
                searchableText.includes(search);


            const matchesCategory =
                category === "all" ||
                service.category === category;


            const matchesStatus =
                status === "all" ||
                service.status === status;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );

        });


    /*
     * पुराना cards हटाउने
     */

    elements.serviceGrid
        .querySelectorAll(
            ".service-card"
        )
        .forEach(card => card.remove());


    /*
     * EMPTY STATE
     */

    if (
        filteredServices.length === 0
    ) {

        if (elements.emptyState) {

            elements.emptyState.hidden =
                false;

        }

    } else {

        if (elements.emptyState) {

            elements.emptyState.hidden =
                true;

        }


        /*
         * Featured पहिले
         */

        const sortedServices =
            [...filteredServices].sort(
                (a, b) => {

                    if (
                        a.featured &&
                        !b.featured
                    ) return -1;

                    if (
                        !a.featured &&
                        b.featured
                    ) return 1;

                    return (
                        b.id - a.id
                    );

                }
            );


        sortedServices.forEach(
            service => {

                elements.serviceGrid.appendChild(
                    createServiceCard(service)
                );

            }
        );

    }


    updateStats();

    updateServiceCount(
        filteredServices.length
    );

}


/* =========================================================
   CREATE SERVICE CARD
========================================================= */

function createServiceCard(service) {

    const card =
        document.createElement("article");


    card.className =
        "service-card";


    card.dataset.id =
        service.id;


    const icon =
        getCategoryIcon(
            service.category
        );


    const category =
        getCategoryName(
            service.category
        );


    const statusText =
        service.status === "active"
            ? "Active"
            : "Inactive";


    const featuredHTML =
        service.featured
            ? `
                <span class="featured-badge">
                    <i class="fa-solid fa-star"></i>
                    Featured
                </span>
              `
            : "";


    card.innerHTML = `

        <div class="service-card-top">

            <div class="service-icon">

                <i class="${icon}"></i>

            </div>

            <span
                class="service-status ${service.status}"
            >
                ${statusText}
            </span>

        </div>


        <h3>
            ${escapeHTML(service.name)}
        </h3>


        <span class="service-category">
            ${escapeHTML(category)}
        </span>


        <p class="service-description">
            ${escapeHTML(service.description)}
        </p>


        <div class="service-card-footer">

            <div>

                <div class="service-price">

                    <small>
                        Starting Price
                    </small>

                    ${
                        escapeHTML(
                            service.price ||
                            "Contact for price"
                        )
                    }

                </div>

                ${featuredHTML}

            </div>


            <div class="service-actions">

                <button
                    type="button"
                    class="service-action edit"
                    title="Edit Service"
                    data-action="edit"
                    data-id="${service.id}"
                >

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    type="button"
                    class="service-action delete"
                    title="Delete Service"
                    data-action="delete"
                    data-id="${service.id}"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

    `;


    /*
     * EDIT
     */

    card
        .querySelector(
            '[data-action="edit"]'
        )
        ?.addEventListener(
            "click",
            () => editService(service.id)
        );


    /*
     * DELETE
     */

    card
        .querySelector(
            '[data-action="delete"]'
        )
        ?.addEventListener(
            "click",
            () => deleteService(service.id)
        );


    return card;

}


/* =========================================================
   OPEN ADD MODAL
========================================================= */

function openAddModal() {

    editingServiceId = null;


    elements.serviceForm?.reset();


    if (elements.serviceStatus) {

        elements.serviceStatus.value =
            "active";

    }


    if (elements.serviceFeatured) {

        elements.serviceFeatured.value =
            "no";

    }


    if (elements.modalTitle) {

        elements.modalTitle.textContent =
            "Add New Service";

    }


    if (elements.modalSubtitle) {

        elements.modalSubtitle.textContent =
            "Create a professional service.";

    }


    if (elements.saveButtonText) {

        elements.saveButtonText.textContent =
            "Save Service";

    }


    openModal();


    setTimeout(
        () =>
            elements.serviceName?.focus(),
        150
    );

}


/* =========================================================
   EDIT SERVICE
========================================================= */

function editService(id) {

    const service =
        services.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!service) {

        showToast(
            "Service not found."
        );

        return;

    }


    editingServiceId =
        service.id;


    elements.serviceName.value =
        service.name;


    elements.serviceCategory.value =
        service.category;


    elements.serviceStatus.value =
        service.status;


    elements.servicePrice.value =
        service.price || "";


    elements.serviceFeatured.value =
        service.featured
            ? "yes"
            : "no";


    elements.serviceDescription.value =
        service.description;


    elements.modalTitle.textContent =
        "Edit Service";


    elements.modalSubtitle.textContent =
        "Update your professional service.";


    elements.saveButtonText.textContent =
        "Update Service";


    openModal();


    setTimeout(
        () =>
            elements.serviceName?.focus(),
        150
    );

}


/* =========================================================
   HANDLE SERVICE SUBMIT
========================================================= */

function handleServiceSubmit(event) {

    event.preventDefault();


    const name =
        elements.serviceName.value.trim();


    const category =
        elements.serviceCategory.value;


    const status =
        elements.serviceStatus.value;


    const price =
        elements.servicePrice.value.trim();


    const featured =
        elements.serviceFeatured.value ===
        "yes";


    const description =
        elements.serviceDescription
            .value
            .trim();


    if (!name) {

        showToast(
            "Please enter service name."
        );

        elements.serviceName.focus();

        return;

    }


    if (!description) {

        showToast(
            "Please enter service description."
        );

        elements.serviceDescription.focus();

        return;

    }


    /*
     * EDIT
     */

    if (editingServiceId !== null) {

        const index =
            services.findIndex(
                service =>
                    Number(service.id) ===
                    Number(editingServiceId)
            );


        if (index === -1) {

            showToast(
                "Service not found."
            );

            return;

        }


        services[index] = {

            ...services[index],

            name,

            category,

            status,

            price,

            featured,

            description

        };


        saveServices();

        closeModal();

        renderServices();

        showToast(
            "Service updated successfully."
        );


        editingServiceId = null;

        return;

    }


    /*
     * ADD
     */

    const newService = {

        id:
            Date.now(),

        name,

        category,

        status,

        price,

        featured,

        description

    };


    services.unshift(
        newService
    );


    saveServices();

    closeModal();

    renderServices();


    showToast(
        "Service added successfully."
    );

}


/* =========================================================
   DELETE SERVICE
========================================================= */

function deleteService(id) {

    const service =
        services.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!service) return;


    const confirmed =
        confirm(
            `Delete "${service.name}"?\n\nThis action cannot be undone.`
        );


    if (!confirmed) return;


    services =
        services.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveServices();

    renderServices();


    showToast(
        "Service deleted successfully."
    );

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStats() {

    const total =
        services.length;


    const active =
        services.filter(
            service =>
                service.status ===
                "active"
        ).length;


    const inactive =
        services.filter(
            service =>
                service.status ===
                "inactive"
        ).length;


    const featured =
        services.filter(
            service =>
                service.featured === true
        ).length;


    setNumber(
        elements.totalServices,
        total
    );


    setNumber(
        elements.activeServices,
        active
    );


    setNumber(
        elements.inactiveServices,
        inactive
    );


    setNumber(
        elements.featuredServices,
        featured
    );

}


/* =========================================================
   SET NUMBER
========================================================= */

function setNumber(
    element,
    value
) {

    if (!element) return;

    element.textContent =
        value;

}


/* =========================================================
   UPDATE SERVICE COUNT
========================================================= */

function updateServiceCount(count) {

    if (!elements.serviceCount)
        return;


    elements.serviceCount.textContent =
        `${count} ${
            count === 1
                ? "Service"
                : "Services"
        }`;

}


/* =========================================================
   MODAL OPEN
========================================================= */

function openModal() {

    if (!elements.modal) return;

    elements.modal.classList.add("show");

    elements.modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   MODAL CLOSE
========================================================= */

function closeModal() {

    if (!elements.modal) return;

    elements.modal.classList.remove("show");

    elements.modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

    document.body.style.overflow = "";

    editingServiceId = null;

}

/* =========================================================
   CATEGORY ICON
========================================================= */

function getCategoryIcon(category) {

    const icons = {

        web:
            "fa-solid fa-globe",

        software:
            "fa-solid fa-code",

        ai:
            "fa-solid fa-robot",

        design:
            "fa-solid fa-palette",

        marketing:
            "fa-solid fa-bullhorn",

        video:
            "fa-solid fa-video",

        training:
            "fa-solid fa-graduation-cap"

    };


    return (
        icons[category] ||
        "fa-solid fa-briefcase"
    );

}


/* =========================================================
   CATEGORY NAME
========================================================= */

function getCategoryName(category) {

    const categories = {

        web:
            "Web Development",

        software:
            "Software Development",

        ai:
            "AI Solutions",

        design:
            "Graphic Design",

        marketing:
            "Digital Marketing",

        video:
            "Video Editing",

        training:
            "Training"

    };


    return (
        categories[category] ||
        "Digital Service"
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


/* =========================================================
   THEME LOAD
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        );


    const theme =
        savedTheme === "dark"
            ? "dark"
            : "light";


    document.documentElement
        .setAttribute(
            "data-theme",
            theme
        );


    updateThemeIcon(
        theme === "dark"
    );

}


/* =========================================================
   THEME TOGGLE
========================================================= */

function toggleTheme() {

    const currentTheme =
        document.documentElement
            .getAttribute(
                "data-theme"
            );


    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    document.documentElement
        .setAttribute(
            "data-theme",
            newTheme
        );


    localStorage.setItem(
        THEME_KEY,
        newTheme
    );


    updateThemeIcon(
        newTheme === "dark"
    );


    showToast(
        newTheme === "dark"
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

}


/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon(isDark) {

    if (!elements.themeToggle)
        return;


    elements.themeToggle.innerHTML =
        isDark
            ? `
                <i class="fa-solid fa-sun"></i>
              `
            : `
                <i class="fa-solid fa-moon"></i>
              `;


    elements.themeToggle.title =
        isDark
            ? "Light Mode"
            : "Dark Mode";


    elements.themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

}


/* =========================================================
   DATE & TIME
========================================================= */

function updateDateTime() {

    if (!elements.datetime)
        return;


    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "ne-NP",
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


    const span =
        elements.datetime.querySelector(
            "span"
        );


    if (span) {

        span.textContent =
            `${date} • ${time}`;

    }

}


/* =========================================================
   LANGUAGE TOGGLE
========================================================= */

function toggleLanguage() {

    isNepali =
        !isNepali;


    if (elements.currentLanguage) {

        elements.currentLanguage.textContent =
            isNepali
                ? "नेपाली"
                : "English";

    }


    showToast(
        isNepali
            ? "नेपाली भाषा चयन गरिएको छ।"
            : "English language selected."
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function showNotification() {

    const active =
        services.filter(
            service =>
                service.status ===
                "active"
        ).length;


    showToast(
        active > 0
            ? `${active} active services available.`
            : "No active services."
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) return;


    localStorage.removeItem(
        "bariwayLoggedIn"
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   LOAD USER
========================================================= */

function loadUser() {

    try {

        const savedUser =
            localStorage.getItem(
                USER_KEY
            );


        if (!savedUser)
            return;


        const user =
            JSON.parse(
                savedUser
            );


        const username =
            user.name ||
            user.username ||
            user.fullName;


        if (
            username &&
            elements.sidebarUserName
        ) {

            elements.sidebarUserName
                .textContent =
                username;

        }


        if (
            username &&
            elements.sidebarAvatar
        ) {

            elements.sidebarAvatar
                .textContent =
                getInitials(
                    username
                );

        }

    } catch (error) {

        console.error(
            "User loading error:",
            error
        );

    }

}


/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(name) {

    if (!name)
        return "TB";


    const parts =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


/* =========================================================
   YEAR
========================================================= */

function updateYear() {

    if (!elements.currentYear)
        return;


    elements.currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "serviceToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "serviceToast";


        toast.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>

            <span></span>

        `;


        Object.assign(
            toast.style,
            {

                position: "fixed",

                right: "25px",

                bottom: "25px",

                zIndex: "99999",

                minWidth: "250px",

                maxWidth: "380px",

                padding:
                    "13px 16px",

                borderRadius:
                    "12px",

                background:
                    "#111827",

                color:
                    "#ffffff",

                fontSize:
                    "12px",

                fontWeight:
                    "600",

                display:
                    "flex",

                alignItems:
                    "center",

                gap:
                    "10px",

                boxShadow:
                    "0 12px 35px rgba(0,0,0,.25)",

                opacity:
                    "0",

                transform:
                    "translateY(15px)",

                transition:
                    ".25s ease"

            }
        );


        document.body.appendChild(
            toast
        );

    }


    const span =
        toast.querySelector(
            "span"
        );


    if (span) {

        span.textContent =
            message;

    }


    requestAnimationFrame(() => {

        toast.style.opacity =
            "1";

        toast.style.transform =
            "translateY(0)";

    });


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(() => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateY(15px)";

        }, 2500);

}


/* =========================================================
   RESET SERVICES
========================================================= */

function resetServices() {

    const confirmed =
        confirm(
            "Reset all services to default services?"
        );


    if (!confirmed)
        return;


    services =
        cloneDefaultServices();


    saveServices();

    renderServices();


    showToast(
        "Services reset successfully."
    );

}


/* =========================================================
   GLOBAL API
========================================================= */

window.BariwayServices = {

    getAll() {

        return [...services];

    },


    add(service) {

        if (!service)
            return;


        services.unshift({

            id:
                Date.now(),

            name:
                service.name ||
                "New Service",

            category:
                service.category ||
                "web",

            status:
                service.status ||
                "active",

            price:
                service.price ||
                "",

            featured:
                service.featured === true,

            description:
                service.description ||
                ""

        });


        saveServices();

        renderServices();

    },


    reset() {

        resetServices();

    },


    clear() {

        services = [];

        saveServices();

        renderServices();

    }

};


/* =========================================================
   DEBUG INFO
========================================================= */

console.log(
    "BARIWAY Services Management v2.0 loaded."
);

console.log(
    "Total Services:",
    services.length
);