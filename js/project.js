/* =========================================================
   BARIWAY DIGITAL HUB
   PROJECT MANAGEMENT MODULE
   project.js v4.0 FINAL

   Professional • Stable • Responsive

   Features:
   • Add Project
   • Edit Project
   • Delete Project
   • View Details
   • Search
   • Filter
   • LocalStorage
   • Dark / Light Theme
   • Nepali / English
   • Notifications
   • Profile Sync
   • Dashboard Sync
   • Mobile Sidebar
   • Toast Messages
   • Keyboard Support
   ========================================================= */

"use strict";


/* =========================================================
   STORAGE KEYS
========================================================= */

const PROJECT_STORAGE_KEY =
    "bariwayProjects";

const PROFILE_STORAGE_KEY =
    "bariwayProfile";

const USER_STORAGE_KEY =
    "bariwayUser";

const THEME_STORAGE_KEY =
    "bariwayTheme";

const LANGUAGE_STORAGE_KEY =
    "bariwayLanguage";

const NOTIFICATION_STORAGE_KEY =
    "bariwayNotifications";


/* =========================================================
   DEFAULT PROJECTS
========================================================= */

const DEFAULT_PROJECTS = [

    {
        id: "project-1",

        title: "BARIWAY Digital Hub",

        category: "web",

        status: "completed",

        description:
            "A professional personal portfolio and digital services platform designed to showcase skills, services and projects.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive"
        ],

        year: "2026",

        icon: "fa-globe"
    },


    {
        id: "project-2",

        title:
            "Municipality Certificate Management System",

        category: "software",

        status: "progress",

        description:
            "डिजिटल रूपमा विभिन्न नगरपालिका प्रमाणपत्र व्यवस्थापन तथा अभिलेख राख्नका लागि निर्माण भइरहेको system।",

        technologies: [
            "Python",
            "PySide6",
            "SQLite"
        ],

        year: "2026",

        icon: "fa-building-columns"
    },


    {
        id: "project-3",

        title:
            "AI Assistant",

        category: "ai",

        status: "planning",

        description:
            "दैनिक digital कामहरूलाई सजिलो बनाउन intelligent AI assistant निर्माण गर्ने concept project।",

        technologies: [
            "Python",
            "AI",
            "API"
        ],

        year: "2026",

        icon: "fa-robot"
    }

];


/* =========================================================
   GLOBAL STATE
========================================================= */

let projects = [];

let currentLanguage = "ne";

let editingProjectId = null;

let viewingProjectId = null;


/* =========================================================
   DOM ELEMENTS
========================================================= */

let projectsGrid;

let emptyState;

let projectSearch;

let projectFilter;

let addProjectBtn;

let emptyAddProjectBtn;

let totalProjects;

let completedProjects;

let progressProjects;

let planningProjects;

let themeToggle;

let notificationBtn;

let notificationDot;

let notificationPanel;

let notificationList;

let notificationCount;

let notificationClose;

let markNotificationsRead;

let languageToggle;

let languageMenu;

let currentLanguageElement;

let datetime;

let sidebar;

let sidebarOverlay;

let menuToggle;

let sidebarClose;

let logoutBtn;

let sidebarName;

let sidebarAvatar;

let sidebarRole;

let projectFormModal;

let projectForm;

let projectFormTitle;

let projectFormClose;

let projectFormCancel;

let projectFormSubmit;

let projectTitleInput;

let projectCategoryInput;

let projectStatusInput;

let projectDescriptionInput;

let projectTechnologiesInput;

let projectYearInput;

let projectModal;

let modalClose;

let modalCloseBtn;

let modalEditBtn;

let modalDeleteBtn;

let modalTitle;

let modalDescription;

let modalIcon;

let modalCategory;

let modalStatus;

let modalYear;

let modalTechnologies;


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeProjects
);


function initializeProjects() {

    cacheElements();

    loadProjects();

    loadTheme();

    loadLanguage();

    syncProfile();

    renderProjects();

    updateStatistics();

    updateDateTime();

    updateNotificationIndicator();

    renderNotifications();

    updateCurrentYear();

    setupEvents();

    injectProjectStyles();

}


/* =========================================================
   CACHE DOM ELEMENTS
========================================================= */

function cacheElements() {

    projectsGrid =
        document.getElementById(
            "projectsGrid"
        );

    emptyState =
        document.getElementById(
            "emptyState"
        );

    projectSearch =
        document.getElementById(
            "projectSearch"
        );

    projectFilter =
        document.getElementById(
            "projectFilter"
        );

    addProjectBtn =
        document.getElementById(
            "addProjectBtn"
        );

    emptyAddProjectBtn =
        document.getElementById(
            "emptyAddProjectBtn"
        );


    totalProjects =
        document.getElementById(
            "totalProjects"
        );

    completedProjects =
        document.getElementById(
            "completedProjects"
        );

    progressProjects =
        document.getElementById(
            "progressProjects"
        );

    planningProjects =
        document.getElementById(
            "planningProjects"
        );


    themeToggle =
        document.getElementById(
            "themeToggle"
        );


    notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    notificationDot =
        document.getElementById(
            "notificationDot"
        );

    notificationPanel =
        document.getElementById(
            "notificationPanel"
        );

    notificationList =
        document.getElementById(
            "notificationList"
        );

    notificationCount =
        document.getElementById(
            "notificationCount"
        );

    notificationClose =
        document.getElementById(
            "notificationClose"
        );

    markNotificationsRead =
        document.getElementById(
            "markNotificationsRead"
        );


    languageToggle =
        document.getElementById(
            "languageToggle"
        );

    languageMenu =
        document.getElementById(
            "languageMenu"
        );

    currentLanguageElement =
        document.getElementById(
            "currentLanguage"
        );


    datetime =
        document.getElementById(
            "datetime"
        );


    sidebar =
        document.getElementById(
            "sidebar"
        );

    sidebarOverlay =
        document.getElementById(
            "sidebarOverlay"
        );

    menuToggle =
        document.getElementById(
            "menuToggle"
        );

    sidebarClose =
        document.getElementById(
            "sidebarClose"
        );

    logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    sidebarName =
        document.getElementById(
            "sidebarName"
        );

    sidebarAvatar =
        document.getElementById(
            "sidebarAvatar"
        );

    sidebarRole =
        document.getElementById(
            "sidebarRole"
        );


    projectFormModal =
        document.getElementById(
            "projectFormModal"
        );

    projectForm =
        document.getElementById(
            "projectForm"
        );

    projectFormTitle =
        document.getElementById(
            "projectFormTitle"
        );

    projectFormClose =
        document.getElementById(
            "projectFormClose"
        );

    projectFormCancel =
        document.getElementById(
            "projectFormCancel"
        );

    projectFormSubmit =
        document.getElementById(
            "projectFormSubmit"
        );


    projectTitleInput =
        document.getElementById(
            "projectTitle"
        );

    projectCategoryInput =
        document.getElementById(
            "projectCategory"
        );

    projectStatusInput =
        document.getElementById(
            "projectStatus"
        );

    projectDescriptionInput =
        document.getElementById(
            "projectDescription"
        );

    projectTechnologiesInput =
        document.getElementById(
            "projectTechnologies"
        );

    projectYearInput =
        document.getElementById(
            "projectYear"
        );


    projectModal =
        document.getElementById(
            "projectModal"
        );

    modalClose =
        document.getElementById(
            "modalClose"
        );

    modalCloseBtn =
        document.getElementById(
            "modalCloseBtn"
        );

    modalEditBtn =
        document.getElementById(
            "modalEditBtn"
        );

    modalDeleteBtn =
        document.getElementById(
            "modalDeleteBtn"
        );

    modalTitle =
        document.getElementById(
            "modalTitle"
        );

    modalDescription =
        document.getElementById(
            "modalDescription"
        );

    modalIcon =
        document.getElementById(
            "modalIcon"
        );

    modalCategory =
        document.getElementById(
            "modalCategory"
        );

    modalStatus =
        document.getElementById(
            "modalStatus"
        );

    modalYear =
        document.getElementById(
            "modalYear"
        );

    modalTechnologies =
        document.getElementById(
            "modalTechnologies"
        );

}


/* =========================================================
   LOAD PROJECTS
========================================================= */

function loadProjects() {

    try {

        const saved =
            localStorage.getItem(
                PROJECT_STORAGE_KEY
            );


        if (!saved) {

            projects =
                cloneDefaultProjects();

            saveProjects();

            return;
        }


        const parsed =
            JSON.parse(saved);


        if (
            Array.isArray(parsed)
        ) {

            projects =
                parsed.map(
                    normalizeProject
                );

            return;
        }


        projects =
            cloneDefaultProjects();

        saveProjects();


    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );

        projects =
            cloneDefaultProjects();

    }

}


/* =========================================================
   CLONE DEFAULT PROJECTS
========================================================= */

function cloneDefaultProjects() {

    return DEFAULT_PROJECTS.map(
        project => ({
            ...project,
            technologies: [
                ...project.technologies
            ]
        })
    );

}


/* =========================================================
   NORMALIZE PROJECT
========================================================= */

function normalizeProject(
    project,
    index
) {

    const category =
        validCategory(
            project.category
        )
            ? project.category
            : "web";


    const status =
        validStatus(
            project.status
        )
            ? project.status
            : "planning";


    const technologies =
        Array.isArray(
            project.technologies
        )
            ? project.technologies
                .map(
                    item =>
                        String(item).trim()
                )
                .filter(Boolean)
            : [];


    return {

        id:
            String(
                project.id ||
                `project-${Date.now()}-${index}`
            ),

        title:
            String(
                project.title ||
                "Untitled Project"
            ).trim(),

        category,

        status,

        description:
            String(
                project.description ||
                "Project description."
            ).trim(),

        technologies,

        year:
            String(
                project.year ||
                new Date().getFullYear()
            ),

        icon:
            project.icon ||
            getCategoryIcon(category)

    };

}


/* =========================================================
   SAVE PROJECTS
========================================================= */

function saveProjects() {

    try {

        localStorage.setItem(
            PROJECT_STORAGE_KEY,
            JSON.stringify(projects)
        );

        return true;

    } catch (error) {

        console.error(
            "Project save error:",
            error
        );

        showToast(
            getText(
                "Projects could not be saved.",
                "Projects सुरक्षित गर्न सकिएन।"
            ),
            "error"
        );

        return false;
    }

}


/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects() {

    if (!projectsGrid) {
        return;
    }


    const searchTerm =
        projectSearch
            ? projectSearch.value
                .trim()
                .toLowerCase()
            : "";


    const filter =
        projectFilter
            ? projectFilter.value
            : "all";


    const filtered =
        projects.filter(
            project => {

                const title =
                    String(
                        project.title || ""
                    ).toLowerCase();


                const description =
                    String(
                        project.description || ""
                    ).toLowerCase();


                const category =
                    getCategoryLabel(
                        project.category
                    ).toLowerCase();


                const technology =
                    Array.isArray(
                        project.technologies
                    )
                        ? project.technologies
                            .join(" ")
                            .toLowerCase()
                        : "";


                const matchesSearch =
                    !searchTerm ||
                    title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    category.includes(searchTerm) ||
                    technology.includes(searchTerm);


                const matchesFilter =
                    filter === "all" ||
                    project.status === filter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    projectsGrid
        .querySelectorAll(
            ".project-card"
        )
        .forEach(
            card => card.remove()
        );


    if (!filtered.length) {

        if (emptyState) {
            emptyState.hidden = false;
        }

        return;
    }


    if (emptyState) {
        emptyState.hidden = true;
    }


    filtered.forEach(
        project => {

            projectsGrid.appendChild(
                createProjectCard(
                    project
                )
            );

        }
    );

}


/* =========================================================
   CREATE PROJECT CARD
========================================================= */

function createProjectCard(
    project
) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "project-card";


    article.dataset.status =
        project.status;


    article.dataset.category =
        project.category;


    article.dataset.title =
        project.title;


    const statusLabel =
        getStatusLabel(
            project.status
        );


    const categoryLabel =
        getCategoryLabel(
            project.category
        );


    const technologies =
        Array.isArray(
            project.technologies
        )
            ? project.technologies
                .map(
                    tech =>
                        `<span>${escapeHTML(tech)}</span>`
                )
                .join("")
            : "";


    article.innerHTML = `

        <div class="project-image">

            <div class="project-image-icon">

                <i class="fa-solid ${escapeHTML(
                    project.icon
                )}"></i>

            </div>

            <span class="status-badge ${escapeHTML(
                project.status
            )}">

                ${escapeHTML(
                    statusLabel
                )}

            </span>

        </div>


        <div class="project-body">

            <span class="project-category">

                ${escapeHTML(
                    categoryLabel
                )}

            </span>


            <h2>

                ${escapeHTML(
                    project.title
                )}

            </h2>


            <p>

                ${escapeHTML(
                    project.description
                )}

            </p>


            <div class="tech-list">

                ${technologies}

            </div>


            <div class="project-footer">

                <span class="project-date">

                    <i class="fa-regular fa-calendar"></i>

                    ${escapeHTML(
                        project.year
                    )}

                </span>


                <div class="project-actions">

                    <button
                        type="button"
                        class="project-btn"
                        data-action="view"
                        data-id="${escapeHTML(
                            project.id
                        )}">

                        ${escapeHTML(
                            getText(
                                "View Project",
                                "हेर्नुहोस्"
                            )
                        )}

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>

            </div>

        </div>

    `;


    return article;

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStatistics() {

    const total =
        projects.length;


    const completed =
        projects.filter(
            project =>
                project.status ===
                "completed"
        ).length;


    const progress =
        projects.filter(
            project =>
                project.status ===
                "progress"
        ).length;


    const planning =
        projects.filter(
            project =>
                project.status ===
                "planning"
        ).length;


    if (totalProjects) {
        totalProjects.textContent =
            total;
    }


    if (completedProjects) {
        completedProjects.textContent =
            completed;
    }


    if (progressProjects) {
        progressProjects.textContent =
            progress;
    }


    if (planningProjects) {
        planningProjects.textContent =
            planning;
    }


    syncProjectCountToDashboard(
        total
    );

}


/* =========================================================
   OPEN DETAILS MODAL
========================================================= */

function openProjectModal(
    projectId
) {

    const project =
        projects.find(
            item =>
                item.id === projectId
        );


    if (!project) {
        return;
    }


    viewingProjectId =
        project.id;


    if (modalTitle) {

        modalTitle.textContent =
            project.title;

    }


    if (modalDescription) {

        modalDescription.textContent =
            project.description;

    }


    if (modalCategory) {

        modalCategory.textContent =
            getCategoryLabel(
                project.category
            );

    }


    if (modalStatus) {

        modalStatus.textContent =
            getStatusLabel(
                project.status
            );

        modalStatus.className =
            `status-text ${project.status}`;

    }


    if (modalYear) {

        modalYear.textContent =
            project.year;

    }


    if (modalIcon) {

        modalIcon.innerHTML =
            `<i class="fa-solid ${escapeHTML(
                project.icon
            )}"></i>`;

    }


    if (modalTechnologies) {

        modalTechnologies.innerHTML = "";


        if (
            Array.isArray(
                project.technologies
            ) &&
            project.technologies.length
        ) {

            project.technologies.forEach(
                technology => {

                    const tag =
                        document.createElement(
                            "span"
                        );

                    tag.textContent =
                        technology;

                    modalTechnologies.appendChild(
                        tag
                    );

                }
            );

        }

    }


    if (!projectModal) {
        return;
    }


    projectModal.classList.add(
        "active"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE DETAILS MODAL
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


    document.body.classList.remove(
        "modal-open"
    );


    viewingProjectId =
        null;

}


/* =========================================================
   OPEN ADD MODAL
========================================================= */

function openAddProjectModal() {

    editingProjectId =
        null;


    resetProjectForm();


    if (projectFormTitle) {

        projectFormTitle.textContent =
            getText(
                "Add Project",
                "Project थप्नुहोस्"
            );

    }


    updateFormSubmitButton(
        false
    );


    openProjectFormModal();

}


/* =========================================================
   OPEN EDIT MODAL
========================================================= */

function openEditProjectModal(
    projectId
) {

    const project =
        projects.find(
            item =>
                item.id === projectId
        );


    if (!project) {
        return;
    }


    editingProjectId =
        project.id;


    if (projectTitleInput) {

        projectTitleInput.value =
            project.title;

    }


    if (projectCategoryInput) {

        projectCategoryInput.value =
            project.category;

    }


    if (projectStatusInput) {

        projectStatusInput.value =
            project.status;

    }


    if (projectDescriptionInput) {

        projectDescriptionInput.value =
            project.description;

    }


    if (projectTechnologiesInput) {

        projectTechnologiesInput.value =
            Array.isArray(
                project.technologies
            )
                ? project.technologies.join(
                    ", "
                )
                : "";

    }


    if (projectYearInput) {

        projectYearInput.value =
            project.year;

    }


    if (projectFormTitle) {

        projectFormTitle.textContent =
            getText(
                "Edit Project",
                "Project सम्पादन गर्नुहोस्"
            );

    }


    updateFormSubmitButton(
        true
    );


    closeProjectModal();

    openProjectFormModal();


    setTimeout(
        () => {

            if (projectTitleInput) {
                projectTitleInput.focus();
            }

        },
        100
    );

}


/* =========================================================
   OPEN FORM MODAL
========================================================= */

function openProjectFormModal() {

    if (!projectFormModal) {
        return;
    }


    projectFormModal.classList.add(
        "active"
    );


    projectFormModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            if (projectTitleInput) {
                projectTitleInput.focus();
            }

        },
        120
    );

}


/* =========================================================
   CLOSE FORM MODAL
========================================================= */

function closeProjectFormModal() {

    if (!projectFormModal) {
        return;
    }


    projectFormModal.classList.remove(
        "active"
    );


    projectFormModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    editingProjectId =
        null;

}


/* =========================================================
   RESET FORM
========================================================= */

function resetProjectForm() {

    if (!projectForm) {
        return;
    }


    projectForm.reset();


    if (projectCategoryInput) {

        projectCategoryInput.value =
            "web";

    }


    if (projectStatusInput) {

        projectStatusInput.value =
            "planning";

    }


    if (projectYearInput) {

        projectYearInput.value =
            new Date().getFullYear();

    }

}


/* =========================================================
   FORM SUBMIT
========================================================= */

function handleProjectFormSubmit(
    event
) {

    event.preventDefault();


    const title =
        projectTitleInput
            ? projectTitleInput.value.trim()
            : "";


    const category =
        projectCategoryInput
            ? projectCategoryInput.value
            : "web";


    const status =
        projectStatusInput
            ? projectStatusInput.value
            : "planning";


    const description =
        projectDescriptionInput
            ? projectDescriptionInput.value.trim()
            : "";


    const technologyInput =
        projectTechnologiesInput
            ? projectTechnologiesInput.value
            : "";


    const year =
        projectYearInput
            ? projectYearInput.value
            : new Date().getFullYear();


    if (!title) {

        showToast(
            getText(
                "Please enter a project name.",
                "कृपया Project को नाम लेख्नुहोस्।"
            ),
            "warning"
        );

        if (projectTitleInput) {
            projectTitleInput.focus();
        }

        return;
    }


    if (!description) {

        showToast(
            getText(
                "Please enter project description.",
                "कृपया Project को विवरण लेख्नुहोस्।"
            ),
            "warning"
        );

        if (projectDescriptionInput) {
            projectDescriptionInput.focus();
        }

        return;
    }


    const technologies =
        technologyInput
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    const safeCategory =
        validCategory(category)
            ? category
            : "web";


    const safeStatus =
        validStatus(status)
            ? status
            : "planning";


    if (editingProjectId) {

        updateExistingProject({

            id:
                editingProjectId,

            title,

            category:
                safeCategory,

            status:
                safeStatus,

            description,

            technologies:
                technologies.length
                    ? technologies
                    : ["HTML"],

            year:
                String(year),

            icon:
                getCategoryIcon(
                    safeCategory
                )

        });

    } else {

        createNewProject({

            title,

            category:
                safeCategory,

            status:
                safeStatus,

            description,

            technologies:
                technologies.length
                    ? technologies
                    : ["HTML"],

            year:
                String(year),

            icon:
                getCategoryIcon(
                    safeCategory
                )

        });

    }

}


/* =========================================================
   CREATE NEW PROJECT
========================================================= */

function createNewProject(
    data
) {

    const newProject = {

        id:
            `project-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        title:
            data.title,

        category:
            data.category,

        status:
            data.status,

        description:
            data.description,

        technologies:
            data.technologies,

        year:
            data.year,

        icon:
            data.icon

    };


    projects.unshift(
        newProject
    );


    if (!saveProjects()) {
        return;
    }


    closeProjectFormModal();


    renderProjects();

    updateStatistics();


    addNotification(
        getText(
            `Project "${newProject.title}" was added.`,
            `"${newProject.title}" Project थपियो।`
        ),
        "success"
    );


    showToast(
        getText(
            "Project added successfully.",
            "Project सफलतापूर्वक थपियो।"
        ),
        "success"
    );

}


/* =========================================================
   UPDATE EXISTING PROJECT
========================================================= */

function updateExistingProject(
    updatedProject
) {

    const index =
        projects.findIndex(
            project =>
                project.id ===
                updatedProject.id
        );


    if (index === -1) {
        return;
    }


    projects[index] =
        updatedProject;


    if (!saveProjects()) {
        return;
    }


    closeProjectFormModal();


    renderProjects();

    updateStatistics();


    addNotification(
        getText(
            `Project "${updatedProject.title}" was updated.`,
            `"${updatedProject.title}" Project अपडेट भयो।`
        ),
        "info"
    );


    showToast(
        getText(
            "Project updated successfully.",
            "Project सफलतापूर्वक अपडेट भयो।"
        ),
        "success"
    );

}


/* =========================================================
   DELETE PROJECT
========================================================= */

function deleteProject(
    projectId
) {

    const project =
        projects.find(
            item =>
                item.id === projectId
        );


    if (!project) {
        return;
    }


    const confirmed =
        window.confirm(
            getText(
                `Delete "${project.title}"?`,
                `"${project.title}" Project मेटाउन चाहनुहुन्छ?`
            )
        );


    if (!confirmed) {
        return;
    }


    projects =
        projects.filter(
            item =>
                item.id !== projectId
        );


    if (!saveProjects()) {
        return;
    }


    closeProjectModal();


    renderProjects();

    updateStatistics();


    addNotification(
        getText(
            `Project "${project.title}" was deleted.`,
            `"${project.title}" Project हटाइयो।`
        ),
        "warning"
    );


    showToast(
        getText(
            "Project deleted successfully.",
            "Project सफलतापूर्वक हटाइयो।"
        ),
        "success"
    );

}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch() {

    renderProjects();

}


/* =========================================================
   FILTER
========================================================= */

function handleFilter() {

    renderProjects();

}


/* =========================================================
   DATE & TIME
========================================================= */

function updateDateTime() {

    if (!datetime) {
        return;
    }


    const now =
        new Date();


    const locale =
        currentLanguage === "en"
            ? "en-US"
            : "ne-NP";


    const date =
        now.toLocaleDateString(
            locale,
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );


    const time =
        now.toLocaleTimeString(
            locale,
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    const span =
        datetime.querySelector(
            "span"
        );


    if (span) {

        span.textContent =
            `${date} • ${time}`;

    }

}


/* =========================================================
   THEME
========================================================= */

function loadTheme() {

    const saved =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );


    const theme =
        saved === "dark"
            ? "dark"
            : "light";


    applyTheme(
        theme
    );

}


/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(
    theme
) {

    const isDark =
        theme === "dark";


    if (isDark) {

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


    updateThemeIcon(
        isDark
    );

}


/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {

    const isDark =
        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark";


    const newTheme =
        isDark
            ? "light"
            : "dark";


    localStorage.setItem(
        THEME_STORAGE_KEY,
        newTheme
    );


    applyTheme(
        newTheme
    );

}


/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon(
    isDark
) {

    if (!themeToggle) {
        return;
    }


    themeToggle.innerHTML =
        isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';


    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );


    themeToggle.setAttribute(
        "title",
        isDark
            ? getText(
                "Switch to light mode",
                "Light mode मा जानुहोस्"
            )
            : getText(
                "Switch to dark mode",
                "Dark mode मा जानुहोस्"
            )
    );

}


/* =========================================================
   LANGUAGE
========================================================= */

function loadLanguage() {

    const saved =
        localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        );


    currentLanguage =
        saved === "en"
            ? "en"
            : "ne";


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


    document.documentElement
        .setAttribute(
            "lang",
            lang
        );


    document
        .querySelectorAll(
            "[data-ne][data-en]"
        )
        .forEach(
            element => {

                element.textContent =
                    lang === "en"
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
                    lang === "en"
                        ? element.dataset.placeholderEn
                        : element.dataset.placeholderNe;

            }
        );


    if (currentLanguageElement) {

        currentLanguageElement.textContent =
            currentLanguage === "en"
                ? "English"
                : "नेपाली";

    }


    updateSelectLanguage();

    updateThemeIcon(
        document.documentElement
            .getAttribute(
                "data-theme"
            ) === "dark"
    );


    updateDateTime();

    renderProjects();

    updateStatistics();

    renderNotifications();

}


/* =========================================================
   UPDATE SELECT OPTIONS
========================================================= */

function updateSelectLanguage() {

    if (!projectFilter) {
        return;
    }


    Array.from(
        projectFilter.options
    ).forEach(
        option => {

            const translated =
                currentLanguage === "en"
                    ? option.dataset.en
                    : option.dataset.ne;


            if (translated) {

                option.textContent =
                    translated;

            }

        }
    );

}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(
    language
) {

    if (
        language !== "ne" &&
        language !== "en"
    ) {
        return;
    }


    currentLanguage =
        language;


    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );


    applyLanguage();


    closeLanguageMenu();


    showToast(
        getText(
            "Language changed to English.",
            "भाषा नेपालीमा परिवर्तन भयो।"
        ),
        "info"
    );

}


/* =========================================================
   LANGUAGE MENU
========================================================= */

function toggleLanguageMenu(
    event
) {

    if (event) {
        event.stopPropagation();
    }


    if (!languageMenu) {
        return;
    }


    languageMenu.classList.toggle(
        "active"
    );

}


/* =========================================================
   CLOSE LANGUAGE MENU
========================================================= */

function closeLanguageMenu() {

    if (languageMenu) {

        languageMenu.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function getNotifications() {

    try {

        const saved =
            localStorage.getItem(
                NOTIFICATION_STORAGE_KEY
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
            NOTIFICATION_STORAGE_KEY,
            JSON.stringify(
                notifications
            )
        );


        return true;


    } catch (error) {

        console.warn(
            "Notification save error:",
            error
        );

        return false;

    }

}


/* =========================================================
   ADD NOTIFICATION
========================================================= */

function addNotification(
    message,
    type = "info"
) {

    const notifications =
        getNotifications();


    notifications.unshift({

        id:
            `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        message:
            String(message),

        type:
            type,

        time:
            new Date().toISOString(),

        read:
            false

    });


    saveNotifications(
        notifications.slice(
            0,
            30
        )
    );


    updateNotificationIndicator();

    renderNotifications();

}


/* =========================================================
   NOTIFICATION INDICATOR
========================================================= */

function updateNotificationIndicator() {

    const notifications =
        getNotifications();


    const unread =
        notifications.filter(
            item =>
                item &&
                item.read === false
        ).length;


    if (notificationDot) {

        notificationDot.style.display =
            unread > 0
                ? "block"
                : "none";

    }


    if (notificationCount) {

        notificationCount.textContent =
            unread;

    }

}


/* =========================================================
   RENDER NOTIFICATIONS
========================================================= */

function renderNotifications() {

    if (!notificationList) {
        return;
    }


    const notifications =
        getNotifications();


    notificationList.innerHTML =
        "";


    if (!notifications.length) {

        notificationList.innerHTML = `

            <div class="notification-empty">

                <div class="notification-empty-icon">

                    <i class="fa-regular fa-bell-slash"></i>

                </div>

                <strong>
                    ${escapeHTML(
                        getText(
                            "No notifications",
                            "कुनै notification छैन"
                        )
                    )}
                </strong>

                <p>
                    ${escapeHTML(
                        getText(
                            "You're all caught up.",
                            "सबै notification हेर्नुभयो।"
                        )
                    )}
                </p>

            </div>

        `;

        updateNotificationIndicator();

        return;
    }


    notifications.forEach(
        notification => {

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


            item.innerHTML = `

                <div class="notification-icon ${escapeHTML(
                    notification.type || "info"
                )}">

                    <i class="fa-solid ${icon}"></i>

                </div>


                <div class="notification-content">

                    <p>
                        ${escapeHTML(
                            notification.message ||
                            ""
                        )}
                    </p>

                    <small>
                        ${escapeHTML(
                            formatNotificationTime(
                                notification.time
                            )
                        )}
                    </small>

                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    markNotificationAsRead(
                        notification.id
                    );

                }
            );


            notificationList.appendChild(
                item
            );

        }
    );


    updateNotificationIndicator();

}


/* =========================================================
   NOTIFICATION ICON
========================================================= */

function getNotificationIcon(
    type
) {

    const icons = {

        success:
            "fa-circle-check",

        warning:
            "fa-triangle-exclamation",

        error:
            "fa-circle-xmark",

        info:
            "fa-circle-info"

    };


    return (
        icons[type] ||
        icons.info
    );

}


/* =========================================================
   FORMAT NOTIFICATION TIME
========================================================= */

function formatNotificationTime(
    value
) {

    if (!value) {
        return "";
    }


    const date =
        new Date(value);


    if (Number.isNaN(
        date.getTime()
    )) {

        return "";

    }


    return date.toLocaleString(
        currentLanguage === "en"
            ? "en-US"
            : "ne-NP",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/* =========================================================
   MARK ONE NOTIFICATION READ
========================================================= */

function markNotificationAsRead(
    id
) {

    const notifications =
        getNotifications();


    const target =
        notifications.find(
            item =>
                item.id === id
        );


    if (!target) {
        return;
    }


    target.read =
        true;


    saveNotifications(
        notifications
    );


    renderNotifications();

}


/* =========================================================
   MARK ALL READ
========================================================= */

function markAllNotificationsRead() {

    const notifications =
        getNotifications();


    notifications.forEach(
        notification => {

            notification.read =
                true;

        }
    );


    saveNotifications(
        notifications
    );


    renderNotifications();


    showToast(
        getText(
            "All notifications marked as read.",
            "सबै notification read गरियो।"
        ),
        "success"
    );

}


/* =========================================================
   NOTIFICATION PANEL
========================================================= */

function openNotificationPanel() {

    if (!notificationPanel) {
        return;
    }


    notificationPanel.classList.add(
        "active"
    );


    notificationPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    renderNotifications();

}


/* =========================================================
   CLOSE NOTIFICATION PANEL
========================================================= */

function closeNotificationPanel() {

    if (!notificationPanel) {
        return;
    }


    notificationPanel.classList.remove(
        "active"
    );


    notificationPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   SIDEBAR
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


    document.body.classList.add(
        "sidebar-open"
    );

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


    document.body.classList.remove(
        "sidebar-open"
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    const confirmed =
        window.confirm(
            getText(
                "Are you sure you want to logout?",
                "के तपाईं Logout गर्न चाहनुहुन्छ?"
            )
        );


    if (!confirmed) {
        return;
    }


    window.location.href =
        "login.html";

}


/* =========================================================
   PROFILE SYNC
========================================================= */

function syncProfile() {

    try {

        const saved =
            localStorage.getItem(
                PROFILE_STORAGE_KEY
            );


        let profile =
            null;


        if (saved) {

            profile =
                JSON.parse(saved);

        }


        if (
            !profile ||
            typeof profile !== "object"
        ) {

            syncUserFallback();

            return;
        }


        const profileName =
            profile.name ||
            "टेक बहादुर BK";


        const role =
            profile.role ||
            "Premium Member";


        if (sidebarName) {

            sidebarName.textContent =
                profileName;

        }


        if (sidebarRole) {

            sidebarRole.textContent =
                role;

        }


        updateAvatar(
            sidebarAvatar,
            profileName,
            profile.photo
        );


    } catch (error) {

        console.warn(
            "Profile sync error:",
            error
        );

        syncUserFallback();

    }

}


/* =========================================================
   USER FALLBACK
========================================================= */

function syncUserFallback() {

    try {

        const saved =
            localStorage.getItem(
                USER_STORAGE_KEY
            );


        if (!saved) {
            return;
        }


        const user =
            JSON.parse(saved);


        if (
            !user ||
            typeof user !== "object"
        ) {
            return;
        }


        const name =
            user.name ||
            user.username ||
            "टेक बहादुर BK";


        if (sidebarName) {

            sidebarName.textContent =
                name;

        }


        updateAvatar(
            sidebarAvatar,
            name,
            user.photo ||
            user.profilePhoto
        );


    } catch (error) {

        console.warn(
            "User fallback error:",
            error
        );

    }

}


/* =========================================================
   UPDATE AVATAR
========================================================= */

function updateAvatar(
    avatarElement,
    name,
    photo
) {

    if (!avatarElement) {
        return;
    }


    avatarElement.innerHTML =
        "";


    if (photo) {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            photo;


        image.alt =
            "Profile photo";


        image.onerror =
            function () {

                avatarElement.innerHTML =
                    "";

                avatarElement.textContent =
                    getInitials(name);

            };


        avatarElement.appendChild(
            image
        );


        return;
    }


    avatarElement.textContent =
        getInitials(name);

}


/* =========================================================
   DASHBOARD SYNC
========================================================= */

function syncProjectCountToDashboard(
    count
) {

    try {

        const saved =
            localStorage.getItem(
                USER_STORAGE_KEY
            );


        if (!saved) {
            return;
        }


        const user =
            JSON.parse(saved);


        if (
            !user ||
            typeof user !== "object"
        ) {
            return;
        }


        user.totalProjects =
            count;


        localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(user)
        );


    } catch (error) {

        console.warn(
            "Dashboard sync error:",
            error
        );

    }

}


/* =========================================================
   FORM SUBMIT BUTTON
========================================================= */

function updateFormSubmitButton(
    isEdit
) {

    if (!projectFormSubmit) {
        return;
    }


    projectFormSubmit.innerHTML = isEdit

        ? `
            <i class="fa-solid fa-floppy-disk"></i>

            <span
                data-ne="Save Changes"
                data-en="Save Changes">
                ${
                    currentLanguage === "en"
                        ? "Save Changes"
                        : "परिवर्तन सुरक्षित गर्नुहोस्"
                }
            </span>
        `

        : `
            <i class="fa-solid fa-plus"></i>

            <span
                data-ne="Add Project"
                data-en="Add Project">
                ${
                    currentLanguage === "en"
                        ? "Add Project"
                        : "Project थप्नुहोस्"
                }
            </span>
        `;

}


/* =========================================================
   VALID CATEGORY
========================================================= */

function validCategory(
    category
) {

    return [
        "web",
        "software",
        "ai",
        "design",
        "video",
        "training"
    ].includes(category);

}


/* =========================================================
   VALID STATUS
========================================================= */

function validStatus(
    status
) {

    return [
        "completed",
        "progress",
        "planning"
    ].includes(status);

}


/* =========================================================
   CATEGORY LABEL
========================================================= */

function getCategoryLabel(
    category
) {

    const labels = {

        web:
            "Web Development",

        software:
            "Software Development",

        ai:
            "AI Solutions",

        design:
            "Graphic Design",

        video:
            "Video Editing",

        training:
            "Training"

    };


    return (
        labels[category] ||
        "Other"
    );

}


/* =========================================================
   CATEGORY ICON
========================================================= */

function getCategoryIcon(
    category
) {

    const icons = {

        web:
            "fa-globe",

        software:
            "fa-code",

        ai:
            "fa-robot",

        design:
            "fa-palette",

        video:
            "fa-video",

        training:
            "fa-graduation-cap"

    };


    return (
        icons[category] ||
        "fa-folder"
    );

}


/* =========================================================
   STATUS LABEL
========================================================= */

function getStatusLabel(
    status
) {

    const labels = {

        en: {

            completed:
                "Completed",

            progress:
                "In Progress",

            planning:
                "Planning"

        },


        ne: {

            completed:
                "सम्पन्न",

            progress:
                "प्रगतिमा",

            planning:
                "योजना"

        }

    };


    return (
        labels[currentLanguage][status] ||
        "Unknown"
    );

}


/* =========================================================
   GET TEXT
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
   INITIALS
========================================================= */

function getInitials(
    name
) {

    if (!name) {
        return "TB";
    }


    const words =
        String(name)
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
   CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    const element =
        document.getElementById(
            "currentYear"
        );


    if (element) {

        element.textContent =
            new Date()
                .getFullYear();

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

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
   TOAST
========================================================= */

function showToast(
    message,
    type = "info"
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
        `project-toast ${type}`;


    toast.setAttribute(
        "role",
        "status"
    );


    const iconMap = {

        success:
            "fa-circle-check",

        warning:
            "fa-triangle-exclamation",

        error:
            "fa-circle-xmark",

        info:
            "fa-circle-info"

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
            class="toast-close"
            aria-label="Close">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    const messageElement =
        toast.querySelector(
            "span"
        );


    if (messageElement) {

        messageElement.textContent =
            message;

    }


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


    const closeButton =
        toast.querySelector(
            ".toast-close"
        );


    let timeout =
        setTimeout(
            removeToast,
            3500
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                clearTimeout(
                    timeout
                );

                removeToast();

            }
        );

    }


    function removeToast() {

        if (!toast.parentNode) {
            return;
        }


        toast.classList.remove(
            "show"
        );


        setTimeout(
            () => {

                if (toast.parentNode) {
                    toast.remove();
                }

            },
            250
        );

    }

}


/* =========================================================
   EVENT SETUP
========================================================= */

function setupEvents() {


    /* Search */

    if (projectSearch) {

        projectSearch.addEventListener(
            "input",
            handleSearch
        );

    }


    /* Filter */

    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            handleFilter
        );

    }


    /* Add */

    if (addProjectBtn) {

        addProjectBtn.addEventListener(
            "click",
            openAddProjectModal
        );

    }


    if (emptyAddProjectBtn) {

        emptyAddProjectBtn.addEventListener(
            "click",
            openAddProjectModal
        );

    }


    /* Theme */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );

    }


    /* Language */

    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            toggleLanguageMenu
        );

    }


    if (languageMenu) {

        languageMenu
            .querySelectorAll(
                "[data-language]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            changeLanguage(
                                button.dataset.language
                            );

                        }
                    );

                }
            );

    }


    /* Notification */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                openNotificationPanel();

            }
        );

    }


    if (notificationClose) {

        notificationClose.addEventListener(
            "click",
            closeNotificationPanel
        );

    }


    if (markNotificationsRead) {

        markNotificationsRead.addEventListener(
            "click",
            markAllNotificationsRead
        );

    }


    /* Sidebar */

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


    /* Logout */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            handleLogout
        );

    }


    /* Project Form */

    if (projectForm) {

        projectForm.addEventListener(
            "submit",
            handleProjectFormSubmit
        );

    }


    if (projectFormClose) {

        projectFormClose.addEventListener(
            "click",
            closeProjectFormModal
        );

    }


    if (projectFormCancel) {

        projectFormCancel.addEventListener(
            "click",
            closeProjectFormModal
        );

    }


    if (projectFormModal) {

        const overlay =
            projectFormModal.querySelector(
                ".modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeProjectFormModal
            );

        }

    }


    /* Details Modal */

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


    if (modalEditBtn) {

        modalEditBtn.addEventListener(
            "click",
            () => {

                if (viewingProjectId) {

                    openEditProjectModal(
                        viewingProjectId
                    );

                }

            }
        );

    }


    if (modalDeleteBtn) {

        modalDeleteBtn.addEventListener(
            "click",
            () => {

                if (viewingProjectId) {

                    deleteProject(
                        viewingProjectId
                    );

                }

            }
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


    /* Project Card */

    if (projectsGrid) {

        projectsGrid.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-action='view']"
                    );


                if (!button) {
                    return;
                }


                openProjectModal(
                    button.dataset.id
                );

            }
        );

    }


    /* Global Click */

    document.addEventListener(
        "click",
        event => {

            if (
                languageMenu &&
                !languageMenu.contains(
                    event.target
                ) &&
                languageToggle &&
                !languageToggle.contains(
                    event.target
                )
            ) {

                closeLanguageMenu();

            }


            if (
                notificationPanel &&
                notificationPanel.classList.contains(
                    "active"
                ) &&
                !notificationPanel.contains(
                    event.target
                ) &&
                notificationBtn &&
                !notificationBtn.contains(
                    event.target
                )
            ) {

                closeNotificationPanel();

            }

        }
    );


    /* Keyboard */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeProjectModal();

                closeProjectFormModal();

                closeNotificationPanel();

                closeLanguageMenu();

                closeSidebar();

            }

        }
    );


    /* Resize */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeSidebar();

            }

        }
    );

}


/* =========================================================
   DYNAMIC PROJECT STYLES
========================================================= */

function injectProjectStyles() {

    if (
        document.getElementById(
            "projectDynamicStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "projectDynamicStyles";


    style.textContent = `

        /* ================================
           MODAL
        ================================= */

        .modal {

            position: fixed;

            inset: 0;

            z-index: 10000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            transition:
                opacity .25s ease,
                visibility .25s ease;

        }


        .modal.active {

            opacity: 1;

            visibility: visible;

            pointer-events: auto;

        }


        .modal-overlay {

            position: absolute;

            inset: 0;

            background:
                rgba(15, 23, 42, .62);

            backdrop-filter:
                blur(5px);

        }


        .modal-content {

            position: relative;

            z-index: 2;

            width: min(
                100%,
                650px
            );

            max-height:
                calc(100vh - 40px);

            overflow-y: auto;

            padding: 28px;

            border:
                1px solid
                var(--border);

            border-radius: 22px;

            background:
                var(--card-bg);

            color:
                var(--text);

            box-shadow:
                var(--shadow-lg);

            transform:
                translateY(18px)
                scale(.97);

            transition:
                transform .25s ease;

        }


        .modal.active
        .modal-content {

            transform:
                translateY(0)
                scale(1);

        }


        .modal-close {

            position: absolute;

            top: 16px;

            right: 16px;

            width: 38px;

            height: 38px;

            display: flex;

            align-items: center;

            justify-content: center;

            border: none;

            border-radius: 10px;

            background:
                var(--bg-soft);

            color:
                var(--text-light);

            cursor: pointer;

            transition:
                .2s ease;

        }


        .modal-close:hover {

            background:
                var(--primary-soft);

            color:
                var(--primary);

        }


        /* ================================
           FORM
        ================================= */

        .modal-header {

            padding-right: 45px;

            margin-bottom: 24px;

        }


        .modal-label {

            display: inline-flex;

            align-items: center;

            gap: 7px;

            margin-bottom: 7px;

            color:
                var(--primary);

            font-size: 11px;

            font-weight: 800;

            text-transform:
                uppercase;

            letter-spacing:
                .08em;

        }


        .modal-header h2 {

            margin: 0;

            font-size: 25px;

            font-weight: 800;

        }


        .form-group {

            margin-bottom: 17px;

        }


        .form-row {

            display: grid;

            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap: 15px;

        }


        .form-group label {

            display: flex;

            align-items: center;

            gap: 7px;

            margin-bottom: 7px;

            color:
                var(--text);

            font-size: 12px;

            font-weight: 700;

        }


        .form-group label i {

            color:
                var(--primary);

        }


        .form-group input,
        .form-group select,
        .form-group textarea {

            width: 100%;

            border:
                1px solid
                var(--border);

            border-radius: 11px;

            padding:
                12px 13px;

            outline: none;

            background:
                var(--input-bg, var(--bg-soft));

            color:
                var(--text);

            font-family:
                inherit;

            font-size: 13px;

            transition:
                border-color .2s ease,
                box-shadow .2s ease;

            box-sizing:
                border-box;

        }


        .form-group textarea {

            resize:
                vertical;

            min-height:
                105px;

        }


        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {

            border-color:
                var(--primary);

            box-shadow:
                0 0 0 3px
                var(--primary-soft);

        }


        .form-help {

            display: block;

            margin-top: 6px;

            color:
                var(--text-light);

            font-size: 10px;

        }


        .modal-actions {

            display: flex;

            align-items: center;

            justify-content: flex-end;

            flex-wrap: wrap;

            gap: 9px;

            margin-top: 23px;

        }


        .modal-actions button {

            border: none;

            border-radius: 10px;

            padding:
                11px 16px;

            display: inline-flex;

            align-items: center;

            justify-content: center;

            gap: 7px;

            font-family:
                inherit;

            font-size: 12px;

            font-weight: 700;

            cursor: pointer;

        }


        .secondary-btn {

            background:
                var(--bg-soft);

            color:
                var(--text);

            border:
                1px solid
                var(--border) !important;

        }


        .primary-btn {

            background:
                var(--primary);

            color:
                #fff;

        }


        .danger-btn {

            background:
                var(--danger, #ef4444);

            color:
                #fff;

        }


        /* ================================
           DETAILS MODAL
        ================================= */

        .details-modal {

            width:
                min(100%, 560px);

        }


        .modal-icon {

            width: 62px;

            height: 62px;

            display: flex;

            align-items: center;

            justify-content: center;

            margin-bottom: 15px;

            border-radius: 17px;

            background:
                var(--primary-soft);

            color:
                var(--primary);

            font-size: 25px;

        }


        .modal-category {

            display: inline-block;

            margin-bottom: 7px;

            color:
                var(--primary);

            font-size: 11px;

            font-weight: 800;

            text-transform:
                uppercase;

            letter-spacing:
                .05em;

        }


        .details-modal h2 {

            margin:
                0 0 10px;

            padding-right:
                40px;

            font-size:
                clamp(21px, 4vw, 29px);

        }


        .details-modal > p {

            margin: 0;

            color:
                var(--text-light);

            line-height:
                1.7;

            font-size:
                13px;

        }


        .modal-detail-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            padding:
                13px 0;

            border-bottom:
                1px solid
                var(--border);

        }


        .modal-detail-row:first-of-type {

            margin-top:
                18px;

        }


        .modal-detail-row span,
        .modal-technologies > span {

            color:
                var(--text-light);

            font-size:
                12px;

            font-weight:
                600;

        }


        .modal-detail-row strong {

            font-size:
                12px;

        }


        .status-text.completed {

            color:
                var(--success, #22c55e);

        }


        .status-text.progress {

            color:
                var(--warning, #f59e0b);

        }


        .status-text.planning {

            color:
                var(--primary);

        }


        .modal-technologies {

            margin-top:
                17px;

        }


        .modal-tech-list {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                7px;

            margin-top:
                9px;

        }


        .modal-tech-list span {

            padding:
                6px 9px;

            border-radius:
                7px;

            background:
                var(--primary-soft);

            color:
                var(--primary);

            font-size:
                10px;

            font-weight:
                700;

        }


        /* ================================
           LANGUAGE
        ================================= */

        .language-wrapper {

            position:
                relative;

        }


        .language-btn {

            height:
                38px;

            padding:
                0 10px;

            display:
                flex;

            align-items:
                center;

            gap:
                6px;

            border:
                1px solid
                var(--border);

            border-radius:
                9px;

            background:
                var(--card-bg);

            color:
                var(--text);

            font-family:
                inherit;

            font-size:
                11px;

            font-weight:
                700;

            cursor:
                pointer;

        }


        .language-menu {

            position:
                absolute;

            top:
                calc(100% + 8px);

            right:
                0;

            z-index:
                5000;

            min-width:
                130px;

            padding:
                6px;

            border:
                1px solid
                var(--border);

            border-radius:
                11px;

            background:
                var(--card-bg);

            box-shadow:
                var(--shadow-lg);

            opacity:
                0;

            visibility:
                hidden;

            transform:
                translateY(-5px);

            transition:
                .2s ease;

        }


        .language-menu.active {

            opacity:
                1;

            visibility:
                visible;

            transform:
                translateY(0);

        }


        .language-menu button {

            width:
                100%;

            padding:
                9px;

            border:
                none;

            border-radius:
                7px;

            background:
                transparent;

            color:
                var(--text);

            text-align:
                left;

            cursor:
                pointer;

            font-family:
                inherit;

            font-size:
                11px;

        }


        .language-menu button:hover {

            background:
                var(--primary-soft);

            color:
                var(--primary);

        }


        /* ================================
           NOTIFICATION PANEL
        ================================= */

        .notification-panel {

            position:
                fixed;

            top:
                76px;

            right:
                22px;

            z-index:
                9000;

            width:
                min(370px, calc(100vw - 30px));

            max-height:
                560px;

            display:
                flex;

            flex-direction:
                column;

            border:
                1px solid
                var(--border);

            border-radius:
                17px;

            background:
                var(--card-bg);

            box-shadow:
                var(--shadow-lg);

            opacity:
                0;

            visibility:
                hidden;

            transform:
                translateY(-8px);

            transition:
                .22s ease;

        }


        .notification-panel.active {

            opacity:
                1;

            visibility:
                visible;

            transform:
                translateY(0);

        }


        .notification-header {

            padding:
                15px 17px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            border-bottom:
                1px solid
                var(--border);

        }


        .notification-header > div {

            display:
                flex;

            align-items:
                center;

            gap:
                8px;

        }


        .notification-header strong {

            font-size:
                13px;

        }


        .notification-header small {

            min-width:
                20px;

            padding:
                3px 6px;

            border-radius:
                20px;

            background:
                var(--primary-soft);

            color:
                var(--primary);

            text-align:
                center;

            font-size:
                9px;

            font-weight:
                800;

        }


        .notification-header button {

            width:
                30px;

            height:
                30px;

            border:
                none;

            border-radius:
                8px;

            background:
                var(--bg-soft);

            color:
                var(--text-light);

            cursor:
                pointer;

        }


        .notification-list {

            max-height:
                425px;

            overflow-y:
                auto;

        }


        .notification-item {

            display:
                flex;

            gap:
                10px;

            padding:
                13px 15px;

            border-bottom:
                1px solid
                var(--border);

            cursor:
                pointer;

            transition:
                background .2s ease;

        }


        .notification-item:hover {

            background:
                var(--bg-soft);

        }


        .notification-item.unread {

            background:
                var(--primary-soft);

        }


        .notification-icon {

            width:
                34px;

            height:
                34px;

            flex-shrink:
                0;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                9px;

            background:
                var(--bg-soft);

            font-size:
                13px;

        }


        .notification-icon.success {

            color:
                var(--success, #22c55e);

        }


        .notification-icon.warning {

            color:
                var(--warning, #f59e0b);

        }


        .notification-icon.error {

            color:
                var(--danger, #ef4444);

        }


        .notification-icon.info {

            color:
                var(--primary);

        }


        .notification-content {

            min-width:
                0;

            flex:
                1;

        }


        .notification-content p {

            margin:
                0 0 4px;

            color:
                var(--text);

            font-size:
                11px;

            line-height:
                1.5;

        }


        .notification-content small {

            color:
                var(--text-light);

            font-size:
                9px;

        }


        .notification-empty {

            padding:
                45px 20px;

            text-align:
                center;

        }


        .notification-empty-icon {

            width:
                52px;

            height:
                52px;

            margin:
                0 auto 12px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                15px;

            background:
                var(--bg-soft);

            color:
                var(--text-light);

            font-size:
                20px;

        }


        .notification-empty strong {

            display:
                block;

            margin-bottom:
                4px;

            font-size:
                12px;

        }


        .notification-empty p {

            margin:
                0;

            color:
                var(--text-light);

            font-size:
                10px;

        }


        .notification-footer {

            padding:
                10px;

            border-top:
                1px solid
                var(--border);

        }


        .notification-footer button {

            width:
                100%;

            padding:
                9px;

            border:
                none;

            border-radius:
                8px;

            background:
                var(--bg-soft);

            color:
                var(--primary);

            font-family:
                inherit;

            font-size:
                10px;

            font-weight:
                700;

            cursor:
                pointer;

        }


        /* ================================
           TOAST
        ================================= */

        .project-toast {

            position:
                fixed;

            right:
                22px;

            bottom:
                22px;

            z-index:
                99999;

            width:
                min(390px, calc(100vw - 30px));

            padding:
                13px;

            display:
                flex;

            align-items:
                center;

            gap:
                10px;

            border:
                1px solid
                var(--border);

            border-radius:
                13px;

            background:
                var(--card-bg);

            color:
                var(--text);

            box-shadow:
                var(--shadow-lg);

            opacity:
                0;

            visibility:
                hidden;

            transform:
                translateY(15px);

            transition:
                .25s ease;

        }


        .project-toast.show {

            opacity:
                1;

            visibility:
                visible;

            transform:
                translateY(0);

        }


        .project-toast > i {

            flex-shrink:
                0;

            font-size:
                16px;

        }


        .project-toast > span {

            flex:
                1;

            font-size:
                11px;

            line-height:
                1.5;

        }


        .project-toast.success > i {

            color:
                var(--success, #22c55e);

        }


        .project-toast.warning > i {

            color:
                var(--warning, #f59e0b);

        }


        .project-toast.error > i {

            color:
                var(--danger, #ef4444);

        }


        .project-toast.info > i {

            color:
                var(--primary);

        }


        .toast-close {

            width:
                27px;

            height:
                27px;

            flex-shrink:
                0;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border:
                none;

            border-radius:
                7px;

            background:
                transparent;

            color:
                var(--text-light);

            cursor:
                pointer;

        }


        .toast-close:hover {

            background:
                var(--primary-soft);

            color:
                var(--text);

        }


        /* ================================
           RESPONSIVE
        ================================= */

        @media (max-width: 700px) {

            .topbar-actions .datetime {

                display:
                    none;

            }


            .language-btn span {

                display:
                    none;

            }


            .form-row {

                grid-template-columns:
                    1fr;

            }


            .modal-content {

                padding:
                    22px;

                border-radius:
                    17px;

            }


            .notification-panel {

                top:
                    70px;

                right:
                    15px;

            }

        }


        @media (max-width: 520px) {

            .modal {

                padding:
                    12px;

            }


            .modal-content {

                max-height:
                    calc(100vh - 24px);

            }


            .modal-actions {

                flex-direction:
                    column;

            }


            .modal-actions button {

                width:
                    100%;

            }


            .project-toast {

                left:
                    15px;

                right:
                    15px;

                bottom:
                    15px;

                width:
                    auto;

            }

        }


        @media (
            prefers-reduced-motion: reduce
        ) {

            .modal,
            .modal-content,
            .language-menu,
            .notification-panel,
            .project-toast {

                transition:
                    none;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   LIVE CLOCK
========================================================= */

setInterval(
    () => {

        if (
            document.readyState !==
            "loading"
        ) {

            updateDateTime();

        }

    },
    1000
);