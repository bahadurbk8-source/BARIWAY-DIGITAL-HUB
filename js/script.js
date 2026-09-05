/* =========================================================
   BARIWAY DIGITAL HUB
   MAIN JAVASCRIPT
   script.js v3.4 FINAL STABLE

   Features:
   • Nepali / English
   • Full Page Translation
   • Dark / Light Mode
   • LocalStorage
   • Mobile Navigation
   • Outside Click
   • ESC Key Support
   • Smooth Navigation
   • Active Navigation
   • Accessibility
   • Backward Compatibility
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const BARIWAY_CONFIG = {

    languageKey: "siteLanguage",

    themeKey: "bariwayTheme",

    oldThemeKey: "siteTheme",

    defaultLanguage: "ne",

    defaultTheme: "dark",

    mobileBreakpoint: 900

};


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    /* =====================================================
       NEPALI
    ====================================================== */

    ne: {

        nav_home: "होम",
        nav_about: "हाम्रो बारेमा",
        nav_services: "सेवाहरू",
        nav_projects: "प्रोजेक्टहरू",
        nav_contact: "सम्पर्क",

        login: "लगइन",
        get_started: "सुरु गर्नुहोस् →",

        hero_badge:
            "🚀 नेपालबाट डिजिटल समाधान",

        hero_title_1:
            "हामी बनाउँदैछौँ",

        hero_title_2:
            "प्रविधिद्वारा",

        hero_title_3:
            "आम्दानी बढाउने तरिका",

        hero_description:
            "हामी आधुनिक वेबसाइट विकास, सफ्टवेयर, सिर्जनात्मक डिजाइन तथा AI समाधानमार्फत तपाईंको व्यवसायलाई डिजिटल रूपमा अगाडि बढाउन सहयोग गर्छौँ।",

        explore_services:
            "सेवाहरू हेर्नुहोस्",

        explore_services_arrow:
            "सेवाहरू हेर्नुहोस् →",

        happy_clients:
            "50+ खुसी ग्राहकहरू",

        trusted_businesses:
            "व्यवसाय तथा संस्थाहरूको विश्वास",

        public_viewer:
            "Public Viewer",

        people_viewing:
            "मानिसहरू अहिले वेबसाइट हेर्दैछन्",

        projects:
            "प्रोजेक्टहरू",

        clients:
            "ग्राहकहरू",

        services:
            "सेवाहरू",


        /* =================================================
           ABOUT
        ================================================== */

        about_label:
            "हाम्रो बारेमा",

        about_title_1:
            "हामी विचारलाई",

        about_title_2:
            "डिजिटल वास्तविकतामा बदल्छौँ।",

        about_subtitle:
            "नेपालबाट संसारभर डिजिटल समाधान",

        about_badge:
            "🚀 BARIWAY DIGITAL HUB",

        about_heading_1:
            "महत्त्वपूर्ण डिजिटल समाधान",

        about_heading_2:
            "हामी निर्माण गर्छौँ।",

        about_paragraph_1:
            "BARIWAY DIGITAL HUB आधुनिक डिजिटल सेवा तथा प्रविधिमा केन्द्रित प्लेटफर्म हो। हामी वेबसाइट विकास, सफ्टवेयर समाधान, ग्राफिक डिजाइन, AI समाधान तथा अन्य डिजिटल सेवाहरू प्रदान गर्छौँ।",

        about_paragraph_2:
            "हाम्रो उद्देश्य व्यक्ति, व्यवसाय तथा संस्थाहरूलाई आधुनिक र भरपर्दो डिजिटल समाधानमार्फत आफ्नो डिजिटल उपस्थिति बलियो बनाउन सहयोग गर्नु हो।",

        contact_us:
            "सम्पर्क गर्नुहोस्",

        creative:
            "Creative",

        creative_desc:
            "आधुनिक र आकर्षक डिजिटल विचारहरू।",

        professional:
            "Professional",

        professional_desc:
            "गुणस्तरीय विकास तथा डिजाइन।",

        reliable:
            "Reliable",

        reliable_desc:
            "सुरक्षित र भरपर्दो डिजिटल समाधान।",

        modern:
            "Modern",

        modern_desc:
            "नवीनतम प्रविधि तथा responsive समाधान।",


        /* =================================================
           SERVICES
        ================================================== */

        services_label:
            "हामी के गर्छौँ",

        our:
            "हाम्रा",

        services_title:
            "सेवाहरू",

        services_subtitle:
            "आधुनिक डिजिटल सेवाहरू",

        website_service:
            "Website Development",

        website_desc:
            "व्यवसाय तथा संस्थाहरूका लागि professional, modern र responsive websites।",

        software_service:
            "Software Development",

        software_desc:
            "संस्थाहरूका लागि custom software तथा management systems।",

        ai_service:
            "AI Solutions",

        ai_desc:
            "Smart AI-powered tools तथा automation solutions।",

        graphic_service:
            "Graphic Design",

        graphic_desc:
            "Logo, branding, banner तथा creative design services।",

        learn_more:
            "थप जान्नुहोस् →",


        /* =================================================
           PROJECTS
        ================================================== */

        projects_label:
            "हाम्रो काम",

        featured:
            "विशेष",

        projects_title:
            "प्रोजेक्टहरू",

        business_website:
            "Business Website",

        business_website_desc:
            "Professional company website।",

        admin_dashboard:
            "Admin Dashboard",

        admin_dashboard_desc:
            "Modern management dashboard।",

        brand_identity:
            "Brand Identity",

        brand_identity_desc:
            "Creative logo and branding project।",


        /* =================================================
           CONTACT
        ================================================== */

        lets_talk:
            "सम्पर्क गरौँ",

        contact_heading_1:
            "कुनै प्रोजेक्टको योजना छ?",

        contact_heading_2:
            "सँगै निर्माण गरौँ।",

        contact_description:
            "BARIWAY DIGITAL HUB सँग सम्पर्क गर्नुहोस् र सँगै उत्कृष्ट डिजिटल समाधान निर्माण गरौँ।",

        contact_us_arrow:
            "सम्पर्क गर्नुहोस् →",


        /* =================================================
           FOOTER
        ================================================== */

        footer_tagline:
            "सिकौँ • बनाऔँ • बढाऔँ • कमाऔँ",

        all_rights:
            "सर्वाधिकार सुरक्षित।"

    },


    /* =====================================================
       ENGLISH
    ====================================================== */

    en: {

        nav_home:
            "Home",

        nav_about:
            "About",

        nav_services:
            "Services",

        nav_projects:
            "Projects",

        nav_contact:
            "Contact",

        login:
            "Login",

        get_started:
            "Get Started →",


        /* =================================================
           HERO
        ================================================== */

        hero_badge:
            "🚀 DIGITAL SOLUTIONS FROM NEPAL",

        hero_title_1:
            "We Are Building",

        hero_title_2:
            "With Technology",

        hero_title_3:
            "Ways To Grow Your Income",

        hero_description:
            "We provide modern website development, software, creative design and AI solutions to help your business grow digitally.",

        explore_services:
            "Explore Services",

        explore_services_arrow:
            "Explore Services →",

        happy_clients:
            "50+ Happy Clients",

        trusted_businesses:
            "Trusted by businesses and organizations",

        public_viewer:
            "Public Viewer",

        people_viewing:
            "People are viewing our website",

        projects:
            "Projects",

        clients:
            "Clients",

        services:
            "Services",


        /* =================================================
           ABOUT
        ================================================== */

        about_label:
            "ABOUT US",

        about_title_1:
            "We Turn Ideas Into",

        about_title_2:
            "Digital Reality.",

        about_subtitle:
            "Digital solutions from Nepal to the world",

        about_badge:
            "🚀 BARIWAY DIGITAL HUB",

        about_heading_1:
            "Building Digital Solutions",

        about_heading_2:
            "That Matter.",

        about_paragraph_1:
            "BARIWAY DIGITAL HUB is a modern digital service and technology platform focused on website development, software solutions, graphic design, AI solutions and other digital services.",

        about_paragraph_2:
            "Our goal is to help individuals, businesses and organizations strengthen their digital presence through modern, reliable and practical digital solutions.",

        contact_us:
            "Contact Us",

        creative:
            "Creative",

        creative_desc:
            "Modern and attractive digital ideas.",

        professional:
            "Professional",

        professional_desc:
            "Quality-focused development and design.",

        reliable:
            "Reliable",

        reliable_desc:
            "Secure and trusted digital solutions.",

        modern:
            "Modern",

        modern_desc:
            "Latest technology and responsive solutions.",


        /* =================================================
           SERVICES
        ================================================== */

        services_label:
            "WHAT WE DO",

        our:
            "Our",

        services_title:
            "Services",

        services_subtitle:
            "Modern digital services",

        website_service:
            "Website Development",

        website_desc:
            "Professional, modern and responsive websites for businesses and organizations.",

        software_service:
            "Software Development",

        software_desc:
            "Custom software and management systems for organizations.",

        ai_service:
            "AI Solutions",

        ai_desc:
            "Smart AI-powered tools and automation solutions.",

        graphic_service:
            "Graphic Design",

        graphic_desc:
            "Logo, branding, banner and creative design services.",

        learn_more:
            "Learn More →",


        /* =================================================
           PROJECTS
        ================================================== */

        projects_label:
            "OUR WORK",

        featured:
            "Featured",

        projects_title:
            "Projects",

        business_website:
            "Business Website",

        business_website_desc:
            "Professional company website.",

        admin_dashboard:
            "Admin Dashboard",

        admin_dashboard_desc:
            "Modern management dashboard.",

        brand_identity:
            "Brand Identity",

        brand_identity_desc:
            "Creative logo and branding project.",


        /* =================================================
           CONTACT
        ================================================== */

        lets_talk:
            "LET'S TALK",

        contact_heading_1:
            "Have a project in mind?",

        contact_heading_2:
            "Let's build it.",

        contact_description:
            "Contact BARIWAY DIGITAL HUB and let's create something amazing together.",

        contact_us_arrow:
            "Contact Us →",


        /* =================================================
           FOOTER
        ================================================== */

        footer_tagline:
            "Learn • Build • Grow • Earn",

        all_rights:
            "All Rights Reserved."

    }

};


/* =========================================================
   SAFE LOCAL STORAGE
========================================================= */

function getStorageItem(key) {

    try {

        return localStorage.getItem(key);

    } catch (error) {

        console.warn(
            "LocalStorage read failed:",
            error
        );

        return null;

    }

}


function setStorageItem(key, value) {

    try {

        localStorage.setItem(
            key,
            value
        );

    } catch (error) {

        console.warn(
            "LocalStorage write failed:",
            error
        );

    }

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =================================================
           ELEMENTS
        ================================================== */

        const body =
            document.body;

        const html =
            document.documentElement;


        const languageBtn =
            document.getElementById(
                "languageBtn"
            );

        const languageMenu =
            document.getElementById(
                "languageMenu"
            );

        const languageText =
            document.getElementById(
                "languageText"
            );


        const themeBtn =
            document.getElementById(
                "themeBtn"
            );


        const menuBtn =
            document.getElementById(
                "menuBtn"
            );

        const mainNav =
            document.getElementById(
                "mainNav"
            );


        /* =================================================
           HELPER: CLOSE LANGUAGE MENU
        ================================================== */

        function closeLanguageMenu() {

            if (!languageMenu) {
                return;
            }

            languageMenu.classList.remove(
                "show"
            );

            if (languageBtn) {

                languageBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }


        /* =================================================
           HELPER: CLOSE MOBILE MENU
        ================================================== */

        function closeMobileMenu() {

            if (!mainNav) {
                return;
            }

            mainNav.classList.remove(
                "show"
            );

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                updateMenuIcon(false);

            }

        }


        /* =================================================
           MOBILE MENU ICON
        ================================================== */

        function updateMenuIcon(isOpen) {

            if (!menuBtn) {
                return;
            }

            const icon =
                menuBtn.querySelector("i");

            if (icon) {

                icon.className =
                    isOpen
                        ? "fas fa-times"
                        : "fas fa-bars";

            }

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close Menu"
                    : "Open Menu"
            );

        }


        /* =================================================
           LANGUAGE
        ================================================== */

        function applyLanguage(language) {

            const selectedLanguage =
                translations[language]
                    ? language
                    : BARIWAY_CONFIG.defaultLanguage;


            const languageData =
                translations[selectedLanguage];


            /* =============================================
               HTML LANG
            ============================================== */

            html.setAttribute(
                "lang",
                selectedLanguage
            );


            /* =============================================
               TRANSLATE ALL DATA-I18N
            ============================================== */

            document
                .querySelectorAll(
                    "[data-i18n]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.getAttribute(
                                "data-i18n"
                            );


                        if (
                            languageData[key] !== undefined
                        ) {

                            element.textContent =
                                languageData[key];

                        }

                    }
                );


            /* =============================================
               LANGUAGE BUTTON TEXT
            ============================================== */

            if (languageText) {

                languageText.textContent =
                    selectedLanguage === "ne"
                        ? "नेपाली"
                        : "English";

            }


            /* =============================================
               SAVE LANGUAGE
            ============================================== */

            setStorageItem(
                BARIWAY_CONFIG.languageKey,
                selectedLanguage
            );


            /* =============================================
               CLOSE LANGUAGE MENU
            ============================================== */

            closeLanguageMenu();

        }


        /* =================================================
           GLOBAL LANGUAGE FUNCTION
           Allows inline HTML / other scripts to use it
        ================================================== */

        window.changeLanguage =
            function (language) {

                applyLanguage(language);

            };


        /* =================================================
           LANGUAGE BUTTON
        ================================================== */

        if (
            languageBtn &&
            languageMenu
        ) {

            languageBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        languageMenu.classList.contains(
                            "show"
                        );


                    /* Close mobile menu */

                    closeMobileMenu();


                    /* Toggle language */

                    languageMenu.classList.toggle(
                        "show"
                    );


                    languageBtn.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );

                }
            );


            /* =============================================
               LANGUAGE OPTIONS
            ============================================== */

            languageMenu
                .querySelectorAll(
                    "[data-language]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function (event) {

                                event.preventDefault();

                                event.stopPropagation();


                                const language =
                                    this.getAttribute(
                                        "data-language"
                                    );


                                applyLanguage(
                                    language
                                );

                            }
                        );

                    }
                );


            /* =============================================
               PREVENT MENU CLOSE
            ============================================== */

            languageMenu.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }


        /* =================================================
           THEME
        ================================================== */

        function applyTheme(theme) {

            const selectedTheme =
                theme === "light"
                    ? "light"
                    : "dark";


            /* =============================================
               LIGHT MODE CLASS
            ============================================== */

            if (selectedTheme === "light") {

                body.classList.add(
                    "light-mode"
                );

            } else {

                body.classList.remove(
                    "light-mode"
                );

            }


            /* =============================================
               HTML DATA THEME
            ============================================== */

            html.setAttribute(
                "data-theme",
                selectedTheme
            );


            /* =============================================
               THEME BUTTON ICON
            ============================================== */

            if (themeBtn) {

                const icon =
                    themeBtn.querySelector("i");


                if (icon) {

                    icon.className =
                        selectedTheme === "dark"
                            ? "fas fa-sun"
                            : "fas fa-moon";

                }


                themeBtn.setAttribute(
                    "aria-pressed",
                    selectedTheme === "dark"
                        ? "true"
                        : "false"
                );


                themeBtn.setAttribute(
                    "aria-label",
                    selectedTheme === "dark"
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"
                );


                themeBtn.setAttribute(
                    "title",
                    selectedTheme === "dark"
                        ? "Light Mode"
                        : "Dark Mode"
                );

            }


            /* =============================================
               SAVE NEW THEME KEY
            ============================================== */

            setStorageItem(
                BARIWAY_CONFIG.themeKey,
                selectedTheme
            );

        }


        /* =================================================
           THEME BUTTON
        ================================================== */

        if (themeBtn) {

            themeBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isLight =
                        body.classList.contains(
                            "light-mode"
                        );


                    applyTheme(
                        isLight
                            ? "dark"
                            : "light"
                    );

                }
            );

        }


        /* =================================================
           MOBILE MENU
        ================================================== */

        if (
            menuBtn &&
            mainNav
        ) {

            menuBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        mainNav.classList.contains(
                            "show"
                        );


                    /* Close language */

                    closeLanguageMenu();


                    /* Toggle navigation */

                    mainNav.classList.toggle(
                        "show"
                    );


                    const newState =
                        !isOpen;


                    menuBtn.setAttribute(
                        "aria-expanded",
                        String(newState)
                    );


                    updateMenuIcon(
                        newState
                    );

                }
            );


            /* =============================================
               CLOSE AFTER NAV LINK CLICK
            ============================================== */

            mainNav
                .querySelectorAll("a")
                .forEach(
                    function (link) {

                        link.addEventListener(
                            "click",
                            function () {

                                closeMobileMenu();

                            }
                        );

                    }
                );

        }


        /* =================================================
           ACTIVE NAVIGATION
        ================================================== */

        const navLinks =
            document.querySelectorAll(
                "#mainNav a[href^='#']"
            );


        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        this.classList.add(
                            "active"
                        );

                    }
                );

            }
        );


        /* =================================================
           INTERSECTION OBSERVER
        ================================================== */

        if (
            "IntersectionObserver" in window &&
            sections.length &&
            navLinks.length
        ) {

            const observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    const id =
                                        entry.target.id;


                                    navLinks.forEach(
                                        function (link) {

                                            const href =
                                                link.getAttribute(
                                                    "href"
                                                );


                                            link.classList.toggle(
                                                "active",
                                                href ===
                                                "#" + id
                                            );

                                        }
                                    );

                                }

                            }
                        );

                    },
                    {
                        root: null,

                        threshold: 0.25,

                        rootMargin:
                            "-90px 0px -45% 0px"

                    }
                );


            sections.forEach(
                function (section) {

                    observer.observe(
                        section
                    );

                }
            );

        }


        /* =================================================
           SMOOTH NAVIGATION
        ================================================== */

        document
            .querySelectorAll(
                "a[href^='#']"
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function (event) {

                            const href =
                                this.getAttribute(
                                    "href"
                                );


                            /* Ignore plain # */

                            if (
                                !href ||
                                href === "#"
                            ) {

                                return;

                            }


                            const target =
                                document.querySelector(
                                    href
                                );


                            if (!target) {

                                return;

                            }


                            event.preventDefault();


                            closeMobileMenu();

                            closeLanguageMenu();


                            const navbar =
                                document.querySelector(
                                    ".navbar"
                                );


                            const offset =
                                navbar
                                    ? navbar.offsetHeight
                                    : 0;


                            const targetPosition =
                                target.getBoundingClientRect()
                                    .top +
                                window.pageYOffset -
                                offset;


                            window.scrollTo(
                                {
                                    top:
                                        Math.max(
                                            targetPosition,
                                            0
                                        ),

                                    behavior:
                                        "smooth"

                                }
                            );


                            /* =================================
                               UPDATE URL HASH
                            ================================== */

                            try {

                                history.replaceState(
                                    null,
                                    "",
                                    href
                                );

                            } catch (error) {

                                /* Ignore browser restrictions */

                            }

                        }
                    );

                }
            );


        /* =================================================
           OUTSIDE CLICK
        ================================================== */

        document.addEventListener(
            "click",
            function (event) {

                /* Language */

                if (
                    languageMenu &&
                    languageBtn &&
                    !languageMenu.contains(event.target) &&
                    !languageBtn.contains(event.target)
                ) {

                    closeLanguageMenu();

                }


                /* Mobile menu */

                if (
                    mainNav &&
                    menuBtn &&
                    !mainNav.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           ESC KEY
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" ||
                    event.key === "Esc"
                ) {

                    closeLanguageMenu();

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           WINDOW RESIZE
        ================================================== */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth >
                    BARIWAY_CONFIG.mobileBreakpoint
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           LOAD SAVED LANGUAGE
        ================================================== */

        const savedLanguage =
            getStorageItem(
                BARIWAY_CONFIG.languageKey
            ) ||
            BARIWAY_CONFIG.defaultLanguage;


        applyLanguage(
            savedLanguage
        );


        /* =================================================
           LOAD SAVED THEME
           -----------------------------------------------
           New key:
           bariwayTheme

           Old key:
           siteTheme

           Old users are automatically migrated.
        ================================================== */

        let savedTheme =
            getStorageItem(
                BARIWAY_CONFIG.themeKey
            );


        if (!savedTheme) {

            savedTheme =
                getStorageItem(
                    BARIWAY_CONFIG.oldThemeKey
                );

        }


        if (
            savedTheme !== "light" &&
            savedTheme !== "dark"
        ) {

            savedTheme =
                BARIWAY_CONFIG.defaultTheme;

        }


        applyTheme(
            savedTheme
        );


        /* =================================================
           INITIAL MOBILE ICON
        ================================================== */

        updateMenuIcon(false);


        /* =================================================
           PAGE VISIBILITY
           Re-check saved settings when returning to page
        ================================================== */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.visibilityState ===
                    "visible"
                ) {

                    const currentLanguage =
                        getStorageItem(
                            BARIWAY_CONFIG.languageKey
                        ) ||
                        BARIWAY_CONFIG.defaultLanguage;


                    let currentTheme =
                        getStorageItem(
                            BARIWAY_CONFIG.themeKey
                        );


                    if (!currentTheme) {

                        currentTheme =
                            getStorageItem(
                                BARIWAY_CONFIG.oldThemeKey
                            );

                    }


                    applyLanguage(
                        currentLanguage
                    );


                    applyTheme(
                        currentTheme ||
                        BARIWAY_CONFIG.defaultTheme
                    );

                }

            }
        );


        /* =================================================
           FINAL LOG
        ================================================== */

        console.log(
            "BARIWAY DIGITAL HUB - script.js v3.4 FINAL STABLE Loaded"
        );

    }
);