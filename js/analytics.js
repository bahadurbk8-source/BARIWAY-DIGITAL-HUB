/* =========================================================
   BARIWAY DIGITAL HUB
   ANALYTICS ENGINE
   analytics.js v2.0 FINAL
   ---------------------------------------------------------
   Chart.js
   LocalStorage
   Dark / Light Mode
   Nepali / English
   Notifications
   Search
   Export Report
   Refresh
   Website / Project / Client / Service Analytics
   Cross-page Storage Sync
   Responsive Chart Refresh
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const ANALYTICS_STORAGE = {

    theme: "bariwayTheme",

    language: "bariwayLanguage",

    user: "bariwayUser",

    websites: "bariwayWebsites",

    projects: "bariwayProjects",

    clients: "bariwayClients",

    services: "bariwayServices",

    notifications: "bariwayNotifications",

    profilePhoto: "bariwayProfilePhoto"

};


/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_WEBSITES = [

    {
        id: 1,
        name: "BARIWAY Digital Hub",
        status: "active",
        category: "business",
        createdAt: "2026-01-15"
    },

    {
        id: 2,
        name: "Business Website",
        status: "active",
        category: "business",
        createdAt: "2026-02-10"
    },

    {
        id: 3,
        name: "Portfolio Website",
        status: "completed",
        category: "portfolio",
        createdAt: "2026-03-15"
    },

    {
        id: 4,
        name: "Municipality Portal",
        status: "progress",
        category: "portal",
        createdAt: "2026-04-08"
    },

    {
        id: 5,
        name: "Training Website",
        status: "planning",
        category: "education",
        createdAt: "2026-05-20"
    }

];


const DEFAULT_PROJECTS = [

    {
        id: 1,
        name: "BARIWAY Digital Hub",
        status: "completed",
        category: "web",
        createdAt: "2026-01-15"
    },

    {
        id: 2,
        name: "Municipality Certificate System",
        status: "progress",
        category: "software",
        createdAt: "2026-02-20"
    },

    {
        id: 3,
        name: "AI Assistant",
        status: "progress",
        category: "ai",
        createdAt: "2026-03-10"
    },

    {
        id: 4,
        name: "Business Website",
        status: "completed",
        category: "web",
        createdAt: "2026-04-05"
    },

    {
        id: 5,
        name: "Brand Identity",
        status: "completed",
        category: "design",
        createdAt: "2026-05-12"
    },

    {
        id: 6,
        name: "Training Platform",
        status: "planning",
        category: "training",
        createdAt: "2026-06-18"
    }

];


const DEFAULT_CLIENTS = [

    {
        id: 1,
        name: "Client 01",
        status: "active",
        createdAt: "2026-01-10"
    },

    {
        id: 2,
        name: "Client 02",
        status: "active",
        createdAt: "2026-02-12"
    },

    {
        id: 3,
        name: "Client 03",
        status: "active",
        createdAt: "2026-03-15"
    },

    {
        id: 4,
        name: "Client 04",
        status: "active",
        createdAt: "2026-04-10"
    },

    {
        id: 5,
        name: "Client 05",
        status: "active",
        createdAt: "2026-05-22"
    },

    {
        id: 6,
        name: "Client 06",
        status: "active",
        createdAt: "2026-06-14"
    }

];


const DEFAULT_SERVICES = [

    {
        id: 1,
        name: "Website Development",
        category: "web",
        status: "active",
        featured: "yes",
        createdAt: "2026-01-10"
    },

    {
        id: 2,
        name: "Software Development",
        category: "software",
        status: "active",
        featured: "yes",
        createdAt: "2026-02-10"
    },

    {
        id: 3,
        name: "AI Solutions",
        category: "ai",
        status: "active",
        featured: "yes",
        createdAt: "2026-03-10"
    },

    {
        id: 4,
        name: "Graphic Design",
        category: "design",
        status: "active",
        featured: "no",
        createdAt: "2026-04-10"
    },

    {
        id: 5,
        name: "Video Editing",
        category: "video",
        status: "active",
        featured: "no",
        createdAt: "2026-05-10"
    },

    {
        id: 6,
        name: "Digital Training",
        category: "training",
        status: "active",
        featured: "yes",
        createdAt: "2026-06-10"
    }

];


/* =========================================================
   STATE
========================================================= */

let websites = [];

let projects = [];

let clients = [];

let services = [];

let notifications = [];

let currentLanguage = "ne";

let performanceChart = null;

let websiteStatusChart = null;

let projectStatusChart = null;

let clientGrowthChart = null;

let resizeTimer = null;

let toastTimer = null;


/* =========================================================
   DOM
========================================================= */

const DOM = {

    performanceChart:
        document.getElementById("performanceChart"),

    websiteStatusChart:
        document.getElementById("websiteStatusChart"),

    projectStatusChart:
        document.getElementById("projectStatusChart"),

    clientGrowthChart:
        document.getElementById("clientGrowthChart"),

    performancePeriod:
        document.getElementById("performancePeriod"),

    languageBtn:
        document.getElementById("languageBtn"),

    themeBtn:
        document.getElementById("themeBtn"),

    logoutBtn:
        document.getElementById("logoutBtn"),

    notificationBtn:
        document.getElementById("notificationBtn"),

    notificationPanel:
        document.getElementById("notificationPanel"),

    notificationBadge:
        document.getElementById("notificationBadge"),

    notificationList:
        document.getElementById("notificationList"),

    notificationEmpty:
        document.getElementById("notificationEmpty"),

    notificationCountText:
        document.getElementById("notificationCountText"),

    clearNotificationsBtn:
        document.getElementById("clearNotificationsBtn"),

    currentLanguage:
        document.getElementById("currentLanguage"),

    refreshAnalyticsBtn:
        document.getElementById("refreshAnalyticsBtn"),

    exportAnalyticsBtn:
        document.getElementById("exportAnalyticsBtn"),

    analyticsSearch:
        document.getElementById("analyticsSearch"),

    sidebarAvatar:
        document.getElementById("sidebarAvatar"),

    sidebarName:
        document.getElementById("sidebarName"),

    sidebarRole:
        document.getElementById("sidebarRole"),

    miniAvatar:
        document.getElementById("miniAvatar"),

    mobileMenuBtn:
        document.getElementById("mobileMenuBtn"),

    sidebar:
        document.getElementById("sidebar"),

    sidebarOverlay:
        document.getElementById("sidebarOverlay"),

    serviceRanking:
        document.getElementById("serviceRanking"),

    projectProgressList:
        document.getElementById("projectProgressList"),

    websiteStatusLegend:
        document.getElementById("websiteStatusLegend"),

    projectStatusLegend:
        document.getElementById("projectStatusLegend"),

    websiteStatusTotal:
        document.getElementById("websiteStatusTotal"),

    projectStatusTotal:
        document.getElementById("projectStatusTotal"),

    toast:
        document.getElementById("analyticsToast"),

    toastMessage:
        document.getElementById("toastMessage"),

    toastIcon:
        document.getElementById("toastIcon")

};


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initAnalytics
);


function initAnalytics() {

    loadData();

    loadUser();

    loadTheme();

    loadLanguage();

    renderDashboard();

    setupEvents();

}


/* =========================================================
   MAIN RENDER
========================================================= */

function renderDashboard() {

    updateOverview();

    renderAllCharts();

    renderWebsiteLegend();

    renderProjectLegend();

    renderServiceRanking();

    renderProjectProgress();

    updateInsights();

    renderNotifications();

}


/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {

    websites = loadStorageArray(
        ANALYTICS_STORAGE.websites,
        DEFAULT_WEBSITES
    );

    projects = loadStorageArray(
        ANALYTICS_STORAGE.projects,
        DEFAULT_PROJECTS
    );

    clients = loadStorageArray(
        ANALYTICS_STORAGE.clients,
        DEFAULT_CLIENTS
    );

    services = loadStorageArray(
        ANALYTICS_STORAGE.services,
        DEFAULT_SERVICES
    );

    notifications = loadNotifications();

}


/* =========================================================
   STORAGE ARRAY
========================================================= */

function loadStorageArray(key, fallback) {

    try {

        const saved =
            localStorage.getItem(key);

        if (!saved) {

            return fallback.map(
                item => ({
                    ...item
                })
            );

        }

        const parsed =
            JSON.parse(saved);

        if (Array.isArray(parsed)) {

            return parsed;

        }

    } catch (error) {

        console.error(
            "Analytics storage error:",
            error
        );

    }

    return fallback.map(
        item => ({
            ...item
        })
    );

}


/* =========================================================
   OVERVIEW
========================================================= */

function updateOverview() {

    const totalWebsites =
        websites.length;

    const totalProjects =
        projects.length;

    const totalClients =
        clients.length;

    const completedProjects =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "completed"
        ).length;

    const successRate =
        totalProjects > 0
            ? Math.round(
                (
                    completedProjects /
                    totalProjects
                ) * 100
            )
            : 0;


    setText(
        "analyticsTotalWebsites",
        totalWebsites
    );

    setText(
        "analyticsTotalProjects",
        totalProjects
    );

    setText(
        "analyticsTotalClients",
        totalClients
    );

    setText(
        "analyticsSuccessRate",
        successRate + "%"
    );


    setText(
        "analyticsWebsiteChange",
        formatGrowth(
            calculateGrowth(websites)
        )
    );

    setText(
        "analyticsProjectChange",
        formatGrowth(
            calculateGrowth(projects)
        )
    );

    setText(
        "analyticsClientChange",
        formatGrowth(
            calculateGrowth(clients)
        )
    );

}


/* =========================================================
   GROWTH
========================================================= */

function calculateGrowth(data) {

    if (
        !Array.isArray(data) ||
        data.length < 2
    ) {

        return 0;

    }


    const dates =
        data
            .map(
                item =>
                    parseDate(
                        item.createdAt ||
                        item.date ||
                        item.created
                    )
            )
            .filter(Boolean);


    if (dates.length < 2) {

        return 0;

    }


    dates.sort(
        (a, b) => a - b
    );


    const midpoint =
        Math.floor(
            dates.length / 2
        );


    const previous =
        midpoint;

    const current =
        dates.length - midpoint;


    if (!previous) {

        return 0;

    }


    return Math.round(
        (
            (
                current -
                previous
            ) /
            previous
        ) * 100
    );

}


function formatGrowth(value) {

    if (value === 0) {

        return currentLanguage === "en"
            ? "No change"
            : "परिवर्तन छैन";

    }

    return value > 0
        ? `↑ ${value}%`
        : `↓ ${Math.abs(value)}%`;

}


/* =========================================================
   CHARTS
========================================================= */

function renderAllCharts() {

    destroyCharts();

    renderPerformanceChart();

    renderWebsiteStatusChart();

    renderProjectStatusChart();

    renderClientGrowthChart();

}


/* =========================================================
   PERFORMANCE CHART
========================================================= */

function renderPerformanceChart() {

    if (
        !DOM.performanceChart ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    const period =
        DOM.performancePeriod
            ? Number(
                DOM.performancePeriod.value
            ) || 6
            : 6;


    const months =
        getLastMonths(period);


    const projectData =
        months.map(
            month =>
                countByMonth(
                    projects,
                    month
                )
        );


    const completedData =
        months.map(
            month =>
                countByMonth(
                    projects.filter(
                        project =>
                            normalizeProjectStatus(
                                project.status
                            ) === "completed"
                    ),
                    month
                )
        );


    const clientData =
        months.map(
            month =>
                countByMonth(
                    clients,
                    month
                )
        );


    performanceChart =
        new Chart(
            DOM.performanceChart,
            {

                type: "line",

                data: {

                    labels:
                        months.map(
                            formatMonth
                        ),

                    datasets: [

                        {

                            label:
                                currentLanguage === "en"
                                    ? "Projects"
                                    : "प्रोजेक्ट",

                            data:
                                projectData,

                            tension: 0.4,

                            fill: true,

                            borderWidth: 2,

                            pointRadius: 4

                        },

                        {

                            label:
                                currentLanguage === "en"
                                    ? "Completed"
                                    : "सम्पन्न",

                            data:
                                completedData,

                            tension: 0.4,

                            fill: false,

                            borderWidth: 2,

                            pointRadius: 3

                        },

                        {

                            label:
                                currentLanguage === "en"
                                    ? "New Clients"
                                    : "नयाँ क्लाइन्ट",

                            data:
                                clientData,

                            tension: 0.4,

                            fill: false,

                            borderWidth: 2,

                            pointRadius: 3

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        mode: "index",

                        intersect: false

                    },

                    plugins: {

                        legend: {

                            position: "top",

                            align: "end",

                            labels: {

                                color:
                                    getTextColor(),

                                boxWidth: 10,

                                boxHeight: 10,

                                usePointStyle: true,

                                font: {

                                    size: 10

                                }

                            }

                        },

                        tooltip: {

                            enabled: true,

                            mode: "index",

                            intersect: false

                        }

                    },

                    scales: {

                        x: {

                            grid: {

                                display: false

                            },

                            ticks: {

                                color:
                                    getMutedColor(),

                                font: {

                                    size: 9

                                }

                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {

                                precision: 0,

                                color:
                                    getMutedColor(),

                                font: {

                                    size: 9

                                }

                            },

                            grid: {

                                color:
                                    getGridColor()

                            }

                        }

                    }

                }

            }
        );

}


/* =========================================================
   WEBSITE STATUS CHART
========================================================= */

function renderWebsiteStatusChart() {

    if (
        !DOM.websiteStatusChart ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    const statuses = {

        active: 0,

        completed: 0,

        progress: 0,

        planning: 0

    };


    websites.forEach(
        website => {

            const status =
                normalizeWebsiteStatus(
                    website.status
                );

            if (
                statuses[
                    status
                ] !== undefined
            ) {

                statuses[
                    status
                ]++;

            }

        }
    );


    const labels = [

        currentLanguage === "en"
            ? "Active"
            : "सक्रिय",

        currentLanguage === "en"
            ? "Completed"
            : "सम्पन्न",

        currentLanguage === "en"
            ? "In Progress"
            : "प्रगतिमा",

        currentLanguage === "en"
            ? "Planning"
            : "योजना"

    ];


    const values = [

        statuses.active,

        statuses.completed,

        statuses.progress,

        statuses.planning

    ];


    if (
        DOM.websiteStatusTotal
    ) {

        DOM.websiteStatusTotal.textContent =
            websites.length;

    }


    websiteStatusChart =
        new Chart(
            DOM.websiteStatusChart,
            {

                type: "doughnut",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            data: values,

                            borderWidth: 2,

                            hoverOffset: 7

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "68%",

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );

}


/* =========================================================
   PROJECT STATUS CHART
========================================================= */

function renderProjectStatusChart() {

    if (
        !DOM.projectStatusChart ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    const completed =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "completed"
        ).length;


    const progress =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "progress"
        ).length;


    const planning =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "planning"
        ).length;


    if (
        DOM.projectStatusTotal
    ) {

        DOM.projectStatusTotal.textContent =
            projects.length;

    }


    projectStatusChart =
        new Chart(
            DOM.projectStatusChart,
            {

                type: "doughnut",

                data: {

                    labels: [

                        currentLanguage === "en"
                            ? "Completed"
                            : "सम्पन्न",

                        currentLanguage === "en"
                            ? "In Progress"
                            : "प्रगतिमा",

                        currentLanguage === "en"
                            ? "Planning"
                            : "योजना"

                    ],

                    datasets: [

                        {

                            data: [

                                completed,

                                progress,

                                planning

                            ],

                            borderWidth: 2,

                            hoverOffset: 7

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "68%",

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );

}


/* =========================================================
   CLIENT GROWTH CHART
========================================================= */

function renderClientGrowthChart() {

    if (
        !DOM.clientGrowthChart ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    const months =
        getLastMonths(6);


    const clientData =
        months.map(
            month =>
                countByMonth(
                    clients,
                    month
                )
        );


    clientGrowthChart =
        new Chart(
            DOM.clientGrowthChart,
            {

                type: "bar",

                data: {

                    labels:
                        months.map(
                            formatMonth
                        ),

                    datasets: [

                        {

                            label:
                                currentLanguage === "en"
                                    ? "New Clients"
                                    : "नयाँ क्लाइन्ट",

                            data:
                                clientData,

                            borderRadius: 7,

                            borderWidth: 0

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            display: false

                        }

                    },

                    scales: {

                        x: {

                            grid: {

                                display: false

                            },

                            ticks: {

                                color:
                                    getMutedColor(),

                                font: {

                                    size: 9

                                }

                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {

                                precision: 0,

                                color:
                                    getMutedColor(),

                                font: {

                                    size: 9

                                }

                            },

                            grid: {

                                color:
                                    getGridColor()

                            }

                        }

                    }

                }

            }
        );

}


/* =========================================================
   WEBSITE LEGEND
========================================================= */

function renderWebsiteLegend() {

    if (!DOM.websiteStatusLegend) {

        return;

    }


    const data = {

        active: websites.filter(
            item =>
                normalizeWebsiteStatus(
                    item.status
                ) === "active"
        ).length,

        completed: websites.filter(
            item =>
                normalizeWebsiteStatus(
                    item.status
                ) === "completed"
        ).length,

        progress: websites.filter(
            item =>
                normalizeWebsiteStatus(
                    item.status
                ) === "progress"
        ).length,

        planning: websites.filter(
            item =>
                normalizeWebsiteStatus(
                    item.status
                ) === "planning"
        ).length

    };


    const labels = [

        ["active",
            currentLanguage === "en"
                ? "Active"
                : "सक्रिय"],

        ["completed",
            currentLanguage === "en"
                ? "Completed"
                : "सम्पन्न"],

        ["progress",
            currentLanguage === "en"
                ? "In Progress"
                : "प्रगतिमा"],

        ["planning",
            currentLanguage === "en"
                ? "Planning"
                : "योजना"]

    ];


    DOM.websiteStatusLegend.innerHTML =
        createLegendHTML(
            labels,
            data,
            websites.length
        );

}


/* =========================================================
   PROJECT LEGEND
========================================================= */

function renderProjectLegend() {

    if (!DOM.projectStatusLegend) {

        return;

    }


    const data = {

        completed: projects.filter(
            item =>
                normalizeProjectStatus(
                    item.status
                ) === "completed"
        ).length,

        progress: projects.filter(
            item =>
                normalizeProjectStatus(
                    item.status
                ) === "progress"
        ).length,

        planning: projects.filter(
            item =>
                normalizeProjectStatus(
                    item.status
                ) === "planning"
        ).length

    };


    const labels = [

        ["completed",
            currentLanguage === "en"
                ? "Completed"
                : "सम्पन्न"],

        ["progress",
            currentLanguage === "en"
                ? "In Progress"
                : "प्रगतिमा"],

        ["planning",
            currentLanguage === "en"
                ? "Planning"
                : "योजना"]

    ];


    DOM.projectStatusLegend.innerHTML =
        createLegendHTML(
            labels,
            data,
            projects.length
        );

}


/* =========================================================
   LEGEND HTML
========================================================= */

function createLegendHTML(
    labels,
    data,
    total
) {

    return labels.map(
        item => {

            const key =
                item[0];

            const label =
                item[1];

            const value =
                data[key] || 0;

            const percentage =
                total > 0
                    ? Math.round(
                        (
                            value /
                            total
                        ) * 100
                    )
                    : 0;


            return `

                <div class="legend-item">

                    <span
                        class="legend-dot ${key}">
                    </span>

                    <span>
                        ${escapeHTML(label)}
                    </span>

                    <strong>
                        ${value}
                    </strong>

                    <small>
                        ${percentage}%
                    </small>

                </div>

            `;

        }
    ).join("");

}


/* =========================================================
   SERVICE RANKING
========================================================= */

function renderServiceRanking() {

    if (!DOM.serviceRanking) {

        return;

    }


    if (!services.length) {

        DOM.serviceRanking.innerHTML =
            emptyState(
                currentLanguage === "en"
                    ? "No services available."
                    : "कुनै सेवा उपलब्ध छैन।"
            );

        return;

    }


    const categoryCounts = {};


    services.forEach(
        service => {

            const category =
                service.category ||
                "other";

            categoryCounts[category] =
                (
                    categoryCounts[category] ||
                    0
                ) + 1;

        }
    );


    const sorted =
        Object.entries(
            categoryCounts
        )
        .sort(
            (a, b) =>
                b[1] - a[1]
        )
        .slice(0, 6);


    const total =
        services.length;


    DOM.serviceRanking.innerHTML =
        sorted.map(
            ([category, count], index) => {

                const percentage =
                    Math.round(
                        (
                            count /
                            total
                        ) * 100
                    );


                return `

                    <div class="service-rank-item">

                        <div class="service-rank-top">

                            <div class="service-rank-number">
                                ${index + 1}
                            </div>

                            <div class="service-rank-name">

                                <strong>
                                    ${escapeHTML(
                                        getCategoryName(
                                            category
                                        )
                                    )}
                                </strong>

                                <span>
                                    ${count}
                                    ${
                                        currentLanguage === "en"
                                            ? "services"
                                            : "सेवा"
                                    }
                                </span>

                            </div>

                            <b>
                                ${percentage}%
                            </b>

                        </div>

                        <div class="service-rank-bar">

                            <span
                                style="width:${percentage}%">
                            </span>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   PROJECT PROGRESS
========================================================= */

function renderProjectProgress() {

    if (!DOM.projectProgressList) {

        return;

    }


    if (!projects.length) {

        DOM.projectProgressList.innerHTML =
            emptyState(
                currentLanguage === "en"
                    ? "No projects available."
                    : "कुनै प्रोजेक्ट उपलब्ध छैन।"
            );

        return;

    }


    const recentProjects =
        [...projects]
            .sort(
                (a, b) =>
                    getDateValue(b) -
                    getDateValue(a)
            )
            .slice(0, 6);


    DOM.projectProgressList.innerHTML =
        recentProjects.map(
            project => {

                const status =
                    normalizeProjectStatus(
                        project.status
                    );


                const percentage =
                    getProjectPercentage(
                        project,
                        status
                    );


                const statusText =
                    getProjectStatusName(
                        status
                    );


                return `

                    <div class="project-progress-item">

                        <div class="project-progress-head">

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        project.name ||
                                        (
                                            currentLanguage === "en"
                                                ? "Untitled Project"
                                                : "नाम नभएको प्रोजेक्ट"
                                        )
                                    )}
                                </strong>

                                <span>
                                    ${escapeHTML(
                                        statusText
                                    )}
                                </span>

                            </div>

                            <b>
                                ${percentage}%
                            </b>

                        </div>

                        <div class="project-progress-bar">

                            <span
                                style="width:${percentage}%">
                            </span>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   PROJECT PERCENTAGE
========================================================= */

function getProjectPercentage(
    project,
    status
) {

    if (
        typeof project.progress === "number"
    ) {

        return clamp(
            Math.round(
                project.progress
            ),
            0,
            100
        );

    }


    if (
        typeof project.progress === "string" &&
        project.progress.trim() !== ""
    ) {

        const number =
            parseInt(
                project.progress,
                10
            );


        if (!Number.isNaN(number)) {

            return clamp(
                number,
                0,
                100
            );

        }

    }


    if (status === "completed") {

        return 100;

    }


    if (status === "progress") {

        return 60;

    }


    return 20;

}


/* =========================================================
   SMART INSIGHTS
========================================================= */

function updateInsights() {

    const completed =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "completed"
        ).length;


    const progress =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "progress"
        ).length;


    const activeClients =
        clients.filter(
            client =>
                normalizeClientStatus(
                    client.status
                ) === "active"
        ).length;


    const featuredServices =
        services.filter(
            service =>
                isFeatured(
                    service.featured
                )
        ).length;


    const progressInsight =
        document.getElementById(
            "progressInsight"
        );


    const clientInsight =
        document.getElementById(
            "clientInsight"
        );


    const performanceInsight =
        document.getElementById(
            "performanceInsight"
        );


    if (progressInsight) {

        progressInsight.textContent =
            currentLanguage === "en"

                ? `${completed} projects completed and ${progress} projects are currently in progress.`

                : `${completed} वटा प्रोजेक्ट सम्पन्न भएका छन् र ${progress} वटा प्रोजेक्ट प्रगतिमा छन्।`;

    }


    if (clientInsight) {

        clientInsight.textContent =
            currentLanguage === "en"

                ? `${activeClients} active clients are currently recorded in your system.`

                : `तपाईंको प्रणालीमा हाल ${activeClients} सक्रिय क्लाइन्टहरू छन्।`;

    }


    if (performanceInsight) {

        performanceInsight.textContent =
            currentLanguage === "en"

                ? `${featuredServices} services are currently marked as featured.`

                : `हाल ${featuredServices} वटा सेवाहरू Featured रूपमा राखिएका छन्।`;

    }

}


/* =========================================================
   MONTH FUNCTIONS
========================================================= */

function getLastMonths(count) {

    const result = [];

    const now =
        new Date();


    for (
        let i = count - 1;
        i >= 0;
        i--
    ) {

        result.push(
            new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            )
        );

    }


    return result;

}


function countByMonth(
    data,
    month
) {

    return data.filter(
        item => {

            const date =
                parseDate(
                    item.createdAt ||
                    item.date ||
                    item.created
                );


            if (!date) {

                return false;

            }


            return (

                date.getFullYear() ===
                month.getFullYear()

                &&

                date.getMonth() ===
                month.getMonth()

            );

        }
    ).length;

}


/* =========================================================
   DATE
========================================================= */

function parseDate(value) {

    if (!value) {

        return null;

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}


function getDateValue(item) {

    const date =
        parseDate(
            item.createdAt ||
            item.date ||
            item.created
        );


    return date
        ? date.getTime()
        : 0;

}


function formatMonth(date) {

    return new Intl.DateTimeFormat(

        currentLanguage === "en"
            ? "en-US"
            : "ne-NP",

        {

            month: "short"

        }

    ).format(date);

}


/* =========================================================
   STATUS NORMALIZATION
========================================================= */

function normalizeProjectStatus(status) {

    if (!status) {

        return "planning";

    }


    const value =
        String(status)
            .toLowerCase()
            .trim();


    if (

        value === "completed" ||
        value === "complete" ||
        value === "done" ||
        value === "finished" ||
        value === "सम्पन्न"

    ) {

        return "completed";

    }


    if (

        value === "progress" ||
        value === "in progress" ||
        value === "ongoing" ||
        value === "working" ||
        value === "active" ||
        value === "प्रगतिमा"

    ) {

        return "progress";

    }


    return "planning";

}


function normalizeWebsiteStatus(status) {

    if (!status) {

        return "active";

    }


    const value =
        String(status)
            .toLowerCase()
            .trim();


    if (

        value === "completed" ||
        value === "complete" ||
        value === "done" ||
        value === "finished" ||
        value === "सम्पन्न"

    ) {

        return "completed";

    }


    if (

        value === "progress" ||
        value === "in progress" ||
        value === "ongoing" ||
        value === "development" ||
        value === "प्रगतिमा"

    ) {

        return "progress";

    }


    if (

        value === "planning" ||
        value === "planned" ||
        value === "योजना"

    ) {

        return "planning";

    }


    return "active";

}


function normalizeClientStatus(status) {

    if (!status) {

        return "active";

    }


    const value =
        String(status)
            .toLowerCase()
            .trim();


    if (

        value === "active" ||
        value === "approved" ||
        value === "सक्रिय"

    ) {

        return "active";

    }


    return value;

}


/* =========================================================
   STATUS NAMES
========================================================= */

function getProjectStatusName(status) {

    const names = {

        completed: {
            ne: "सम्पन्न",
            en: "Completed"
        },

        progress: {
            ne: "प्रगतिमा",
            en: "In Progress"
        },

        planning: {
            ne: "योजना",
            en: "Planning"
        }

    };


    return currentLanguage === "en"
        ? names[status].en
        : names[status].ne;

}


/* =========================================================
   CATEGORY
========================================================= */

function getCategoryName(category) {

    const categories = {

        web: {
            ne: "वेब",
            en: "Web"
        },

        software: {
            ne: "सफ्टवेयर",
            en: "Software"
        },

        ai: {
            ne: "AI",
            en: "AI"
        },

        design: {
            ne: "डिजाइन",
            en: "Design"
        },

        video: {
            ne: "भिडियो",
            en: "Video"
        },

        training: {
            ne: "तालिम",
            en: "Training"
        },

        business: {
            ne: "व्यवसाय",
            en: "Business"
        },

        portfolio: {
            ne: "पोर्टफोलियो",
            en: "Portfolio"
        },

        portal: {
            ne: "पोर्टल",
            en: "Portal"
        },

        education: {
            ne: "शिक्षा",
            en: "Education"
        },

        other: {
            ne: "अन्य",
            en: "Other"
        }

    };


    const item =
        categories[
            String(
                category || "other"
            ).toLowerCase()
        ];


    if (!item) {

        return category || "Other";

    }


    return currentLanguage === "en"
        ? item.en
        : item.ne;

}


/* =========================================================
   FEATURED
========================================================= */

function isFeatured(value) {

    return (

        value === true ||

        String(value)
            .toLowerCase()
            .trim() === "yes" ||

        String(value)
            .toLowerCase()
            .trim() === "true" ||

        String(value)
            .toLowerCase()
            .trim() === "featured"

    );

}


/* =========================================================
   THEME
========================================================= */

function loadTheme() {

    const saved =
        localStorage.getItem(
            ANALYTICS_STORAGE.theme
        );


    const theme =
        saved === "dark"
            ? "dark"
            : "light";


    applyTheme(
        theme,
        false
    );

}


function applyTheme(
    theme,
    redraw = true
) {

    if (theme === "dark") {

        document.documentElement
            .setAttribute(
                "data-theme",
                "dark"
            );

    } else {

        document.documentElement
            .removeAttribute(
                "data-theme"
            );

    }


    updateThemeButton();


    if (redraw) {

        renderAllCharts();

    }

}


function toggleTheme() {

    const isDark =
        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark";


    const theme =
        isDark
            ? "light"
            : "dark";


    localStorage.setItem(
        ANALYTICS_STORAGE.theme,
        theme
    );


    applyTheme(
        theme,
        true
    );

}


function updateThemeButton() {

    if (!DOM.themeBtn) {

        return;

    }


    const isDark =
        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark";


    DOM.themeBtn.innerHTML =
        isDark

            ? `<i class="fa-solid fa-sun"></i>`

            : `<i class="fa-solid fa-moon"></i>`;


    DOM.themeBtn.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

}


/* =========================================================
   LANGUAGE
========================================================= */

function loadLanguage() {

    const saved =
        localStorage.getItem(
            ANALYTICS_STORAGE.language
        );


    currentLanguage =
        saved === "en"
            ? "en"
            : "ne";


    applyLanguage(
        false
    );

}


function toggleLanguage() {

    currentLanguage =
        currentLanguage === "ne"
            ? "en"
            : "ne";


    localStorage.setItem(
        ANALYTICS_STORAGE.language,
        currentLanguage
    );


    applyLanguage(
        true
    );

}


function applyLanguage(
    redraw = true
) {

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


    document
        .querySelectorAll(
            "[data-placeholder-ne][data-placeholder-en]"
        )
        .forEach(
            element => {

                element.placeholder =
                    currentLanguage === "en"
                        ? element.dataset.placeholderEn
                        : element.dataset.placeholderNe;

            }
        );


    if (DOM.currentLanguage) {

        DOM.currentLanguage.textContent =
            currentLanguage === "en"
                ? "English"
                : "नेपाली";

    }


    if (redraw) {

        renderDashboard();

    }

}


/* =========================================================
   CHART COLORS
========================================================= */

function getTextColor() {

    const color =
        getComputedStyle(
            document.documentElement
        )
        .getPropertyValue(
            "--text"
        )
        .trim();


    return color ||
        (
            document.documentElement
                .getAttribute(
                    "data-theme"
                ) === "dark"
                    ? "#f8fafc"
                    : "#0f172a"
        );

}


function getMutedColor() {

    const color =
        getComputedStyle(
            document.documentElement
        )
        .getPropertyValue(
            "--text-light"
        )
        .trim();


    return color ||
        (
            document.documentElement
                .getAttribute(
                    "data-theme"
                ) === "dark"
                    ? "#94a3b8"
                    : "#64748b"
        );

}


function getGridColor() {

    const isDark =
        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark";


    return isDark
        ? "rgba(148,163,184,.10)"
        : "rgba(100,116,139,.12)";

}


/* =========================================================
   DESTROY CHARTS
========================================================= */

function destroyCharts() {

    if (performanceChart) {

        performanceChart.destroy();

        performanceChart = null;

    }


    if (websiteStatusChart) {

        websiteStatusChart.destroy();

        websiteStatusChart = null;

    }


    if (projectStatusChart) {

        projectStatusChart.destroy();

        projectStatusChart = null;

    }


    if (clientGrowthChart) {

        clientGrowthChart.destroy();

        clientGrowthChart = null;

    }

}


/* =========================================================
   USER PROFILE
========================================================= */

function loadUser() {

    try {

        const saved =
            localStorage.getItem(
                ANALYTICS_STORAGE.user
            );


        if (!saved) {

            return;

        }


        const user =
            JSON.parse(saved);


        const name =
            user.name ||
            user.fullName ||
            user.username ||
            "Tek Bahadur BK";


        const role =
            user.role ||
            user.plan ||
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


        if (DOM.sidebarAvatar) {

            DOM.sidebarAvatar.textContent =
                initials;

        }


        if (DOM.miniAvatar) {

            DOM.miniAvatar.textContent =
                initials;

        }


        loadProfilePhoto();

    } catch (error) {

        console.error(
            "User loading error:",
            error
        );

    }

}


/* =========================================================
   PROFILE PHOTO
========================================================= */

function loadProfilePhoto() {

    const photo =
        localStorage.getItem(
            ANALYTICS_STORAGE.profilePhoto
        );


    if (!photo) {

        return;

    }


    applyAvatarImage(
        DOM.sidebarAvatar,
        photo
    );


    applyAvatarImage(
        DOM.miniAvatar,
        photo
    );

}


function applyAvatarImage(
    element,
    photo
) {

    if (!element) {

        return;

    }


    element.style.backgroundImage =
        `url("${photo}")`;

    element.style.backgroundSize =
        "cover";

    element.style.backgroundPosition =
        "center";

    element.style.color =
        "transparent";

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function loadNotifications() {

    try {

        const saved =
            localStorage.getItem(
                ANALYTICS_STORAGE.notifications
            );


        if (!saved) {

            return [];

        }


        const parsed =
            JSON.parse(saved);


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Notification loading error:",
            error
        );

        return [];

    }

}


function saveNotifications() {

    localStorage.setItem(
        ANALYTICS_STORAGE.notifications,
        JSON.stringify(
            notifications
        )
    );

}


function renderNotifications() {

    notifications =
        loadNotifications();


    const unread =
        notifications.filter(
            item =>
                !isNotificationRead(
                    item
                )
        ).length;


    if (DOM.notificationBadge) {

        DOM.notificationBadge.textContent =
            unread > 99
                ? "99+"
                : unread;

        DOM.notificationBadge.style.display =
            unread > 0
                ? "flex"
                : "none";

    }


    if (DOM.notificationCountText) {

        DOM.notificationCountText.textContent =
            `${unread} ${
                currentLanguage === "en"
                    ? "unread"
                    : "नपढिएको"
            }`;

    }


    if (!DOM.notificationList) {

        return;

    }


    if (!notifications.length) {

        DOM.notificationList.innerHTML = "";

        if (DOM.notificationEmpty) {

            DOM.notificationEmpty.style.display =
                "flex";

        }

        return;

    }


    if (DOM.notificationEmpty) {

        DOM.notificationEmpty.style.display =
            "none";

    }


    DOM.notificationList.innerHTML =
        notifications
            .slice()
            .sort(
                (a, b) =>
                    getNotificationDate(b) -
                    getNotificationDate(a)
            )
            .map(
                notification =>
                    createNotificationHTML(
                        notification
                    )
            )
            .join("");

}


function createNotificationHTML(
    notification
) {

    const title =
        currentLanguage === "en"
            ? (
                notification.titleEn ||
                notification.title ||
                "Notification"
            )
            : (
                notification.titleNe ||
                notification.title ||
                "सूचना"
            );


    const message =
        currentLanguage === "en"
            ? (
                notification.messageEn ||
                notification.message ||
                ""
            )
            : (
                notification.messageNe ||
                notification.message ||
                ""
            );


    const type =
        notification.type ||
        "info";


    const read =
        isNotificationRead(
            notification
        );


    return `

        <div
            class="notification-item ${read ? "read" : "unread"}"
            data-notification-id="${escapeHTML(
                notification.id ??
                ""
            )}">

            <div class="notification-icon ${escapeHTML(type)}">

                <i class="${getNotificationIcon(type)}"></i>

            </div>

            <div class="notification-content">

                <strong>
                    ${escapeHTML(title)}
                </strong>

                <p>
                    ${escapeHTML(message)}
                </p>

                <small>
                    ${formatNotificationDate(
                        notification
                    )}
                </small>

            </div>

        </div>

    `;

}


function isNotificationRead(
    notification
) {

    return (

        notification.read === true ||

        notification.isRead === true ||

        notification.status === "read"

    );

}


function getNotificationIcon(
    type
) {

    const icons = {

        success:
            "fa-solid fa-circle-check",

        warning:
            "fa-solid fa-triangle-exclamation",

        error:
            "fa-solid fa-circle-xmark",

        info:
            "fa-solid fa-circle-info",

        project:
            "fa-solid fa-folder-open",

        client:
            "fa-solid fa-user-plus",

        service:
            "fa-solid fa-layer-group"

    };


    return icons[type] ||
        icons.info;

}


function getNotificationDate(
    notification
) {

    const date =
        parseDate(
            notification.createdAt ||
            notification.date ||
            notification.time
        );


    return date
        ? date.getTime()
        : 0;

}


function formatNotificationDate(
    notification
) {

    const date =
        parseDate(
            notification.createdAt ||
            notification.date ||
            notification.time
        );


    if (!date) {

        return currentLanguage === "en"
            ? "Recently"
            : "भर्खरै";

    }


    return new Intl.DateTimeFormat(

        currentLanguage === "en"
            ? "en-US"
            : "ne-NP",

        {

            dateStyle: "medium",

            timeStyle: "short"

        }

    ).format(date);

}


/* =========================================================
   CLEAR NOTIFICATIONS
========================================================= */

function clearNotifications() {

    if (!notifications.length) {

        showToast(
            currentLanguage === "en"
                ? "No notifications to clear."
                : "मेटाउन कुनै सूचना छैन।",
            "info"
        );

        return;

    }


    notifications =
        notifications.map(
            notification => ({

                ...notification,

                read: true,

                isRead: true

            })
        );


    saveNotifications();

    renderNotifications();


    showToast(
        currentLanguage === "en"
            ? "All notifications marked as read."
            : "सबै सूचनाहरू पढिएको रूपमा राखियो।",
        "success"
    );

}


/* =========================================================
   NOTIFICATION PANEL
========================================================= */

function toggleNotificationPanel() {

    if (!DOM.notificationPanel) {

        return;

    }


    const isOpen =
        DOM.notificationPanel
            .getAttribute(
                "aria-hidden"
            ) === "false";


    DOM.notificationPanel
        .setAttribute(
            "aria-hidden",
            isOpen
                ? "true"
                : "false"
        );


    DOM.notificationPanel
        .classList.toggle(
            "show",
            !isOpen
        );

}


/* =========================================================
   REFRESH
========================================================= */

function refreshAnalytics(
    showMessage = true
) {

    loadData();

    loadUser();

    renderDashboard();


    if (showMessage) {

        showToast(
            currentLanguage === "en"
                ? "Analytics refreshed successfully."
                : "Analytics सफलतापूर्वक Refresh भयो।",
            "success"
        );

    }

}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch() {

    if (!DOM.analyticsSearch) {

        return;

    }


    const query =
        DOM.analyticsSearch.value
            .trim()
            .toLowerCase();


    if (!query) {

        clearSearchHighlight();

        return;

    }


    const searchable =
        [

            ...projects.map(
                item => ({
                    type: "Project",
                    name: item.name || "",
                    data: item
                })
            ),

            ...clients.map(
                item => ({
                    type: "Client",
                    name: item.name || "",
                    data: item
                })
            ),

            ...websites.map(
                item => ({
                    type: "Website",
                    name: item.name || "",
                    data: item
                })
            ),

            ...services.map(
                item => ({
                    type: "Service",
                    name: item.name || "",
                    data: item
                })
            )

        ];


    const results =
        searchable.filter(
            item =>
                JSON.stringify(
                    item.data
                )
                .toLowerCase()
                .includes(query)
        );


    clearSearchHighlight();


    if (!results.length) {

        showToast(
            currentLanguage === "en"
                ? "No matching analytics data found."
                : "मिल्दो Analytics data भेटिएन।",
            "warning"
        );

        return;

    }


    const first =
        results[0];


    highlightSearchResult(
        first.type
    );


    showToast(
        currentLanguage === "en"
            ? `${results.length} matching record(s) found.`
            : `${results.length} वटा मिल्दो रेकर्ड भेटियो।`,
        "success"
    );

}


function highlightSearchResult(
    type
) {

    let selector = "";


    if (type === "Project") {

        selector =
            "#projectProgressList";

    }


    if (type === "Service") {

        selector =
            "#serviceRanking";

    }


    if (!selector) {

        return;

    }


    const element =
        document.querySelector(
            selector
        );


    if (!element) {

        return;

    }


    element.classList.add(
        "search-highlight"
    );


    element.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(
        () => {

            element.classList.remove(
                "search-highlight"
            );

        },
        1800
    );

}


function clearSearchHighlight() {

    document
        .querySelectorAll(
            ".search-highlight"
        )
        .forEach(
            element =>
                element.classList.remove(
                    "search-highlight"
                )
        );

}


/* =========================================================
   EXPORT REPORT
========================================================= */

function exportAnalyticsReport() {

    const now =
        new Date();


    const completed =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "completed"
        ).length;


    const progress =
        projects.filter(
            project =>
                normalizeProjectStatus(
                    project.status
                ) === "progress"
        ).length;


    const successRate =
        projects.length > 0
            ? Math.round(
                (
                    completed /
                    projects.length
                ) * 100
            )
            : 0;


    const report = [

        "BARIWAY DIGITAL HUB",

        currentLanguage === "en"
            ? "ANALYTICS REPORT"
            : "ANALYTICS रिपोर्ट",

        "========================================",

        `${currentLanguage === "en" ? "Generated" : "मिति"}: ${now.toLocaleString()}`,

        "",

        `${currentLanguage === "en" ? "Total Websites" : "कुल वेबसाइट"}: ${websites.length}`,

        `${currentLanguage === "en" ? "Total Projects" : "कुल प्रोजेक्ट"}: ${projects.length}`,

        `${currentLanguage === "en" ? "Total Clients" : "कुल क्लाइन्ट"}: ${clients.length}`,

        `${currentLanguage === "en" ? "Total Services" : "कुल सेवाहरू"}: ${services.length}`,

        `${currentLanguage === "en" ? "Success Rate" : "सफलता दर"}: ${successRate}%`,

        "",

        `${currentLanguage === "en" ? "Completed Projects" : "सम्पन्न प्रोजेक्ट"}: ${completed}`,

        `${currentLanguage === "en" ? "Projects In Progress" : "प्रगतिमा रहेका प्रोजेक्ट"}: ${progress}`,

        "",

        "----------------------------------------",

        currentLanguage === "en"
            ? "PROJECTS"
            : "प्रोजेक्टहरू",

        "----------------------------------------",

        ...projects.map(
            project =>
                `${project.name || "Untitled"} | ${getProjectStatusName(
                    normalizeProjectStatus(
                        project.status
                    )
                )}`
        ),

        "",

        "----------------------------------------",

        currentLanguage === "en"
            ? "SERVICES"
            : "सेवाहरू",

        "----------------------------------------",

        ...services.map(
            service =>
                `${service.name || "Unnamed Service"} | ${getCategoryName(
                    service.category
                )}`
        ),

        "",

        "----------------------------------------",

        currentLanguage === "en"
            ? "BARIWAY DIGITAL HUB"
            : "BARIWAY DIGITAL HUB",

        "From Nepal To The World"

    ].join("\n");


    const blob =
        new Blob(
            [report],
            {
                type:
                    "text/plain;charset=utf-8"
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
        `BARIWAY-Analytics-${formatFileDate(now)}.txt`;


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
            ? "Analytics report exported successfully."
            : "Analytics रिपोर्ट सफलतापूर्वक Export भयो।",
        "success"
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    if (!DOM.sidebar) {

        return;

    }


    DOM.sidebar.classList.toggle(
        "open"
    );


    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.classList.toggle(
            "show"
        );

    }

}


function closeMobileMenu() {

    if (DOM.sidebar) {

        DOM.sidebar.classList.remove(
            "open"
        );

    }


    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    const confirmed =
        window.confirm(

            currentLanguage === "en"

                ? "Are you sure you want to logout?"

                : "के तपाईं Logout गर्न चाहनुहुन्छ?"

        );


    if (!confirmed) {

        return;

    }


    window.location.href =
        "login.html";

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    if (
        !DOM.toast ||
        !DOM.toastMessage
    ) {

        return;

    }


    clearTimeout(
        toastTimer
    );


    DOM.toastMessage.textContent =
        message;


    if (DOM.toastIcon) {

        const icons = {

            success:
                "fa-solid fa-circle-check",

            warning:
                "fa-solid fa-triangle-exclamation",

            error:
                "fa-solid fa-circle-xmark",

            info:
                "fa-solid fa-circle-info"

        };


        DOM.toastIcon.className =
            icons[type] ||
            icons.success;

    }


    DOM.toast.className =
        `analytics-toast ${type} show`;


    toastTimer =
        setTimeout(
            () => {

                DOM.toast.classList.remove(
                    "show"
                );

            },
            3200
        );

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    if (DOM.themeBtn) {

        DOM.themeBtn.addEventListener(
            "click",
            toggleTheme
        );

    }


    if (DOM.languageBtn) {

        DOM.languageBtn.addEventListener(
            "click",
            toggleLanguage
        );

    }


    if (DOM.refreshAnalyticsBtn) {

        DOM.refreshAnalyticsBtn.addEventListener(
            "click",
            () =>
                refreshAnalytics(true)
        );

    }


    if (DOM.exportAnalyticsBtn) {

        DOM.exportAnalyticsBtn.addEventListener(
            "click",
            exportAnalyticsReport
        );

    }


    if (DOM.notificationBtn) {

        DOM.notificationBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleNotificationPanel();

            }
        );

    }


    if (DOM.clearNotificationsBtn) {

        DOM.clearNotificationsBtn.addEventListener(
            "click",
            clearNotifications
        );

    }


    if (DOM.analyticsSearch) {

        DOM.analyticsSearch.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    handleSearch();

                }

            }
        );


        DOM.analyticsSearch.addEventListener(
            "input",
            () => {

                if (
                    DOM.analyticsSearch.value
                        .trim() === ""
                ) {

                    clearSearchHighlight();

                }

            }
        );

    }


    if (DOM.performancePeriod) {

        DOM.performancePeriod.addEventListener(
            "change",
            () => {

                renderPerformanceChart();

            }
        );

    }


    if (DOM.logoutBtn) {

        DOM.logoutBtn.addEventListener(
            "click",
            handleLogout
        );

    }


    if (DOM.mobileMenuBtn) {

        DOM.mobileMenuBtn.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                DOM.notificationPanel &&
                DOM.notificationBtn &&
                !DOM.notificationPanel.contains(
                    event.target
                ) &&
                !DOM.notificationBtn.contains(
                    event.target
                )
            ) {

                DOM.notificationPanel
                    .classList.remove(
                        "show"
                    );

                DOM.notificationPanel
                    .setAttribute(
                        "aria-hidden",
                        "true"
                    );

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        renderAllCharts();

                    },
                    250
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

        const watchedKeys = [

            ANALYTICS_STORAGE.websites,

            ANALYTICS_STORAGE.projects,

            ANALYTICS_STORAGE.clients,

            ANALYTICS_STORAGE.services,

            ANALYTICS_STORAGE.notifications,

            ANALYTICS_STORAGE.theme,

            ANALYTICS_STORAGE.language,

            ANALYTICS_STORAGE.user,

            ANALYTICS_STORAGE.profilePhoto

        ];


        if (
            watchedKeys.includes(
                event.key
            )
        ) {

            loadData();

            loadUser();

            loadTheme();

            loadLanguage();

            renderDashboard();

        }

    }
);


/* =========================================================
   HELPERS
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


function emptyState(
    message
) {

    return `

        <div class="analytics-empty-state">

            <i class="fa-regular fa-folder-open"></i>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;

}


function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );

}


function getInitials(
    name
) {

    const value =
        String(
            name || ""
        ).trim();


    if (!value) {

        return "TB";

    }


    const parts =
        value
            .split(/\s+/)
            .filter(Boolean);


    if (parts.length === 1) {

        return parts[0]
            .slice(0, 2)
            .toUpperCase();

    }


    return (

        parts[0].charAt(0) +
        parts[parts.length - 1]
            .charAt(0)

    ).toUpperCase();

}


function formatFileDate(
    date
) {

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


/* =========================================================
   END
========================================================= */