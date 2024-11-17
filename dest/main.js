// const { log } = require("grunt");

// handle Lenis scroll
const lenis = new Lenis();
function handleLenisScroll() {
    lenis.on("scroll", (e) => {});
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}
window.addEventListener("load", handleLenisScroll());

function handleHeader() {
    const header = document.querySelector(".header");
    const selectLang = document.querySelector(
        ".header .header__cta .header__cta-lang .select .select__wrapper"
    );
    window.addEventListener("scroll", () => {
        if (window.scrollY > header?.offsetHeight) {
            header?.classList.add("--scroll");
            selectLang?.classList.add("--scroll");
        } else {
            header?.classList.remove("--scroll");
            selectLang?.classList.remove("--scroll");
        }
    });
}
handleHeader();

// cta header lang
function handleClickHeaderLang() {
    const lang = document.querySelector(".header .header__cta .header__cta-lang");
    const selectLang = document.querySelector(".header .header__cta .header__cta-lang .select");
    const itemsLang = document.querySelectorAll(
        ".header .header__cta .header__cta-lang .select .text"
    );
    const currentLang = document.querySelector(
        ".header .header__cta .header__cta-lang .current .text"
    );

    lang?.addEventListener("click", (e) => {
        e.stopPropagation();
        selectLang?.classList.toggle("--active");
    });

    itemsLang?.forEach((item) => {
        item.addEventListener("click", (e) => {
            let selectLang = item.innerText;

            let tempLang = currentLang?.innerText;
            currentLang.innerText = selectLang;
            item.innerText = tempLang;
        });
    });

    document.addEventListener("click", () => {
        selectLang?.classList.remove("--active");
    });
}
handleClickHeaderLang();

// menu mobile
function handleMenuMobile() {
    const hbgBtn = document.querySelector(".hamburgermenu ");
    const menuMobile = document.querySelector(".menumobile");
    const logo = document.querySelector(".header .header__logo");
    const lang = document.querySelector(".header .header__cta .header__cta-lang");
    const header = document.querySelector(".header .container-fluid");
    const body = document.querySelector(".homepage");
    const signup = document.querySelector(".signup");

    hbgBtn.addEventListener("click", () => {
        toggleActiveMenuMobile();
    });

    function toggleActiveMenuMobile() {
        hbgBtn?.classList.toggle("--close");
        menuMobile?.classList.toggle("--active");
        logo?.classList.toggle("--hidden");
        lang?.classList.toggle("--hidden");
        header?.classList.toggle("--right");
        if (menuMobile?.classList.contains("--active")) {
            body?.classList.add("--disable-scroll");
        } else {
            body?.classList.remove("--disable-scroll");
        }
        body?.classList.contains("--disable-scroll") ? lenis.stop() : lenis.start();
    }

    // remove Active when resize  > 1199.98px
    function removeMenuMobile() {
        window.addEventListener("resize", () => {
            let wWindow = window.innerWidth;

            if (wWindow > 1199.98) {
                hbgBtn?.classList.remove("--close");
                menuMobile?.classList.remove("--active");
                logo?.classList.remove("--hidden");
                lang?.classList.remove("--hidden");
                header?.classList.remove("--right");
                if (signup.classList.contains("--active")) {
                    body?.classList.add("--disable-scroll");
                    lenis.stop();
                } else {
                    body?.classList.remove("--disable-scroll");
                    lenis.start();
                }
            }
        });
    }
    removeMenuMobile();

    // click menu mobile click
    function handleScrollMenuMobile() {
        const list = document.querySelectorAll(".menumobile .menumobile__nav .headermenu a");
        list.forEach((item) => {
            item.addEventListener("click", () => {
                toggleActiveMenuMobile();
            });
        });
    }
    handleScrollMenuMobile();
}
handleMenuMobile();

function handleGotoTop() {
    const btn = document.querySelector(".footer .footer__gotop");
    const heigh = document.querySelector(
        ".schero .schero__slider .schero__slider-item .content .btn"
    ).offsetHeight;
    const container = document.querySelector(".showcontent");
    let rightPos = container.offsetLeft;

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });
    window.addEventListener("scroll", () => {
        if (window.scrollY > heigh) {
            if (!btn) return;
            btn.style.opacity = "1";
            btn.style.visibility = "visible";
            btn.style.right = `${rightPos}px`;
        } else {
            if (!btn) return;
            btn.style.opacity = "0";
            btn.style.visibility = "hidden";
        }
    });
    window.addEventListener("resize", () => {
        rightPos = container.offsetLeft;
        if (!btn) return;
        btn.style.right = `${rightPos}px`;
    });
}
handleGotoTop();

// progress scroll bar
function handleProgressbar() {
    let progressbar = document.querySelector(".progressbar");

    if (!progressbar) return;
    window.addEventListener("scroll", () => {
        let scrollProgess = window.scrollY;
        let windowHeight = window.innerHeight;
        let heightPages = document.body.offsetHeight - windowHeight;
        let percent = (scrollProgess / heightPages) * 100;
        progressbar.style.width = `${percent}%`;
    });
}
window.addEventListener("load", handleProgressbar());

// tabs news
function handlePostTabs() {
    let tabs = document.querySelectorAll(".post .post__tabs .tab");
    let list = document.querySelectorAll(".post .post__listwrapper .post__list");
    tabs?.forEach((tab) => {
        tab?.addEventListener("click", () => {
            tabs?.forEach((tab) => {
                tab?.classList.remove("--active");
            });
            tab?.classList.add("--active");
            let dataset = tab.dataset.tab;
            list?.forEach((item) => {
                item?.classList.remove("--active");
                if (item?.dataset.tab === dataset) {
                    item?.classList.add("--active");
                }
            });
        });
    });
}
handlePostTabs();

// show form sign up
function handleSignUp() {
    const btnMenuDesktop = document.querySelector(".header .header__cta .header__cta-btn"),
        btnMenuMoblie = document.querySelector(".menumobile .menumobile__btn"),
        signup = document.querySelector(".signup"),
        btnClose = document.querySelector(".signup .signup__close"),
        opacityBg = document.querySelector(".opactityblack");
    const menuMobile = document.querySelector(".menumobile");

    btnMenuDesktop?.addEventListener("click", () => {
        activeSignup();
    });

    btnMenuMoblie?.addEventListener("click", () => {
        activeSignup();
    });

    btnClose?.addEventListener("click", () => {
        activeSignup();
    });

    function activeSignup() {
        signup?.classList.toggle("--active");
        opacityActive();
    }

    function opacityActive() {
        if (signup?.classList.contains("--active")) {
            opacityBg?.classList.add("--active");
            document.body.classList.add("--disable-scroll");
            lenis.stop();
        } else {
            opacityBg?.classList.remove("--active");

            if (menuMobile?.classList.contains("--active")) {
                document.body.classList.add("--disable-scroll");
                lenis.stop();
            } else {
                document.body.classList.remove("--disable-scroll");
                lenis.start();
            }
        }
    }
}
handleSignUp();

//  handle popup video
function handlePopupVideo() {
    let videos = document.querySelectorAll("[data-btn-video]"),
        popup = document.querySelector(".popupvideo"),
        iframePopup = document.querySelector(
            ".popupvideo .popupvideo__inner .popupvideo__inner-iframe .videoframe"
        ),
        close = document.querySelector(
            ".popupvideo .popupvideo__inner .popupvideo__inner-iframe .close"
        ),
        opacity = document.querySelector(".popupvideo ");

    videos?.forEach((video) => {
        video?.addEventListener("click", () => {
            let idDataVideo = video.dataset.srcVideo;
            if (!idDataVideo) return;
            popup?.classList.add("--active");
            document.body?.classList.add("--disable-scroll");
            lenis.stop();

            iframePopup?.setAttribute(
                "src",
                `https://www.youtube.com/embed/${idDataVideo}&autoplay=1`
            );
        });
    });
    function closePopup() {
        close?.addEventListener("click", () => {
            popup?.classList.remove("--active");
            iframePopup?.setAttribute("src", ``);
            document.body?.classList.remove("--disable-scroll");
            lenis.start();
        });
        opacity?.addEventListener("click", (e) => {
            popup?.classList.remove("--active");
            iframePopup?.setAttribute("src", ``);
            opacityBg?.classList.remove("--active");
            document.body?.classList.remove("--disable-scroll");
            lenis.start();
        });
    }
    closePopup();
}

window.addEventListener("load", handlePopupVideo());

// ----------- scroll menu header ----------------
function handleMenuHeader() {
    let menus = document.querySelectorAll(".headermenu a");

    menus?.forEach((item) => {
        item?.addEventListener("click", (e) => {
            let header = document.querySelector(".header");
            document.body.classList.remove("--disable-scroll");
            lenis.start();
            if (scrollY < 10) {
                header = header.offsetHeight - 20;
            } else {
                header = header.offsetHeight;
            }
            let attr = item.getAttribute("href");
            e.preventDefault();
            removeActiveMenu();
            item?.classList.add("--active");
            window.scrollTo({
                top: document.querySelector(attr).offsetTop - header + 1,
                behavior: "smooth",
            });
        });
    });

    function removeActiveMenu() {
        menus?.forEach((item) => {
            item?.classList.remove("--active");
        });
    }

    function activeScroll() {
        window.addEventListener("scroll", () => {
            let sections = document.querySelectorAll("section[id]");
            sections.forEach((section, index) => {
                let header = document.querySelector(".header");
                if (scrollY < 10) {
                    header = header.offsetHeight - 20;
                } else {
                    header = header.offsetHeight;
                }
                let offsetTopSection = section.offsetTop - header;
                let heightSection = section.offsetHeight;

                if (
                    window.scrollY >= offsetTopSection - header &&
                    window.scrollY < heightSection + offsetTopSection
                ) {
                    removeActiveMenu();
                    menus[index]?.classList.add("--active");
                }
            });
        });
    }
    activeScroll();
}
window.addEventListener("load", handleMenuHeader());

// validate form sign up
function handleValidateForm() {
    let fullname = document.querySelector("#fullname"),
        email = document.querySelector("#email"),
        username = document.querySelector("#username"),
        password = document.querySelector("#password"),
        passwordcf = document.querySelector("#passwordcf"),
        checkboxSignup = document.querySelector(
            ".signup .signup__form .signup__form-check .label .checkbox"
        );

    // error
    function addError(input, message = "") {
        let errorMessage = input.parentElement.querySelector(".message");
        if (message === "") {
            input.classList.remove("--error");
            errorMessage.innerText = "";
        } else {
            input.classList.add("--error");
            errorMessage.innerText = message;
        }
    }

    // fullname
    function validateFullname() {
        let validateName = fullname?.value.trim();
        if (!fullname) return;
        if (validateName === "") {
            addError(fullname, "Please fill in Full name");
        } else {
            addError(fullname, "");
        }
    }
    validateOnChange(fullname, validateFullname);

    // email
    function validateEmail() {
        let validateEmail = email?.value.trim();
        if (!email) return;
        if (validateEmail === "") {
            addError(email, "Please fill in Email");
        } else if (!isEmail(validateEmail)) {
            addError(email, "Invalid Email");
        } else {
            addError(email, "");
        }

        function isEmail(text) {
            const regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(text);
        }
    }
    validateOnChange(email, validateEmail);

    //  Username
    function validateUserName() {
        let validateUserName = username?.value.trim();
        if (!username) return;
        if (validateUserName === "") {
            addError(username, "Please fill in Username");
        } else if (!isUsername(validateUserName)) {
            addError(username, "Invalid Username");
        } else {
            addError(username, "");
        }
        function isUsername(text) {
            const regex = /^[a-z0-9_.]+$/;
            return regex.test(text);
        }
    }
    validateOnChange(username, validateUserName);

    // password
    function validatePassword() {
        let validatePass = password?.value;
        if (!password) return;
        if (validatePass === "") {
            addError(password, "Please fill in Password");
        } else if (!isPassword(validatePass)) {
            addError(
                password,
                "Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter and number"
            );
        } else {
            addError(password, "");
        }

        // 1 kí tự hoa, 1 kí tự thường, 1 số
        function isPassword(text) {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            return regex.test(text);
        }
    }
    validateOnChange(password, validatePassword);

    // password confirm
    function validatePasswordConfirm() {
        let validatePassCF = passwordcf?.value;
        let validatePass = password?.value;

        if (validatePassCF === "") {
            addError(passwordcf, "Please fill in Confirm password");
        } else if (validatePass !== validatePassCF) {
            addError(passwordcf, "Confirm password does not match");
        } else {
            addError(passwordcf, "");
        }
    }
    validateOnChange(passwordcf, validatePasswordConfirm);

    // checkbox
    function validateCheckbox() {
        if (!checkboxSignup) return;

        if (checkboxSignup.checked === false) {
            addError(getParentElement(checkboxSignup, ".label"), "Please accept the terms");
        } else {
            addError(getParentElement(checkboxSignup, ".label"), "");
        }
    }

    // validateAll
    function validateALll() {
        validateFullname();
        validateEmail();
        validateUserName();
        validatePassword();
        validatePasswordConfirm();
        validateCheckbox();
    }

    // focus input
    function validateOnChange(ele, act) {
        ele.onchange = () => {
            act();
        };
    }
    // visible password
    function handleEyes() {
        let btnEye = document.querySelectorAll(".signup .signup__form .signup__form-group .eyes");
        btnEye.forEach((eye) => {
            let parent = getParentElement(eye, ".signup__form-group");
            if (!parent) return;
            eye.addEventListener("mousedown", () => {
                parent.querySelector("input").type = "text";
                eye.classList.add("--active");
            });
            eye.addEventListener("mouseup", () => {
                parent.querySelector("input").type = "password";
                eye.classList.remove("--active");
            });
        });
    }
    handleEyes();

    // get parent
    function getParentElement(ele, selector = "") {
        while (ele?.parentElement) {
            if (ele?.parentElement.matches(selector)) {
                return ele.parentElement;
            }
            ele = ele?.parentElement;
        }
        return;
    }

    // submit
    let btnsubmit = document.querySelector(".signup .signup__form .btn");
    btnsubmit.addEventListener("click", (e) => {
        e.preventDefault();
        validateALll();
    });
}

window.addEventListener("load", handleValidateForm());
// accordion
function handleAccordion() {
    const accordionItems = document.querySelectorAll(".accordion .accordion__item");
    // itemActive hiện tại
    let itemCurrentActive;
    accordionItems.forEach((item) => {
        item.children[0].addEventListener("click", () => {
            item.classList.toggle("--active");

            // gắn itemCurrent
            if (item.classList.contains("--active")) {
                itemCurrentActive = item;
            }

            // remove khi active item khác
            accordionItems.forEach((item) => {
                if (itemCurrentActive != item) {
                    item.classList.remove("--active");
                    item.children[1].style.height = "0px";
                    item.children[1].style.marginTop = "0px";
                }
            });

            let heightText = item.children[1].scrollHeight;
            if (item.classList.contains("--active")) {
                item.children[1].style.height = `${heightText}px`;
                item.children[1].style.marginTop = "13px";
            } else {
                item.children[1].style.height = "0px";
                item.children[1].style.marginTop = "0px";
            }
        });
    });
}
window.addEventListener("load", handleAccordion());

function handleSliderHero() {
    let slider = document.querySelector(".schero .schero__slider");
    // slider
    let flkty = new Flickity(slider, {
        // options
        cellAlign: "left",
        contain: true,
        draggable: ">1",
        wrapAround: true,
        prevNextButtons: false,
        autoPlay: 5000,
        lazyLoad: true,
        pauseAutoPlayOnHover: true,
        fade: true,

        on: {
            ready: function () {
                handleDots();
                getTotalPages();
            },
            change: function (index) {
                handlePagging(index);
            },
        },
    });

    // control
    let btnLeft = document.querySelector(
        ".schero .schero__bottom .schero__bottom-right .btn.--pre"
    );
    let btnRight = document.querySelector(
        ".schero .schero__bottom .schero__bottom-right .btn.--next"
    );

    btnLeft.addEventListener("click", () => {
        flkty.previous(true);
    });
    btnRight.addEventListener("click", () => {
        flkty.next(true);
    });

    // dots
    function handleDots() {
        let pagging = document.querySelector(".schero .schero__bottom .schero__bottom-left");
        let dots = document.querySelector(".flickity-page-dots");

        pagging.appendChild(dots);

        // let dots =  // let dots = document.querySelectorAll(
        //     ".schero .schero__bottom .schero__bottom-left .dots .dot"
        // );
        // function removeActiveDots() {
        //     dots.forEach((dot) => {
        //         dot.classList.remove("--active");
        //     });
        // }
        // dots.forEach((dot, index) => {
        //     dot.addEventListener("click", () => {
        //         removeActiveDots();
        //         flkty.select(index, true);
        //         dot.classList.add("--active");
        //     });
        // });
    }

    // pages
    function handlePagging(index) {
        let pageCurrent = document.querySelector(
            ".schero .schero__bottom .schero__bottom-left .pages .pages__current"
        );
        pageCurrent.innerText = (index + 1).toString().padStart(2, "0");
    }
    function getTotalPages() {
        let totalPages = document.querySelectorAll(
            ".schero .schero__slider .schero__slider-item"
        ).length;
        let pageTotal = document.querySelector(
            ".schero .schero__bottom .schero__bottom-left .pages .pages__total"
        );

        pageTotal.innerText = totalPages.toString().padStart(2, "0");
    }
}
window.addEventListener("load", handleSliderHero());

// carousel
function handleCarousel() {
    let carousel = document.querySelector(".sccarousel .sccarousel__list ");

    // carousel
    let flktyCarousel = new Flickity(carousel, {
        // options
        cellAlign: "left",
        contain: true,
        freeScroll: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false,
        draggable: ">1",
        lazyLoad: 7,
    });
    function handleScrollCarousel() {
        let barCarousel = document.querySelector(
            ".sccarousel .sccarousel__scroll .sccarousel__scroll-bar"
        );

        flktyCarousel.on("scroll", (progress) => {
            progress = Math.max(0, Math.min(1, progress));
            barCarousel.style.width = `${progress * 100}%`;
        });
    }
    handleScrollCarousel();
}
window.addEventListener("load", handleCarousel());

// gallery
function handleGallery() {
    Fancybox.bind("[data-fancybox = 'images'] ", {
        infinite: true,
        fade: true,
        compact: false,
        idle: false,

        animated: false,
        showClass: false,
        hideClass: false,

        dragToClose: false,
        contentClick: false,

        Images: {
            // Disable animation from/to thumbnail on start/close
            zoom: false,
        },

        Toolbar: {
            display: {
                left: [],
                middle: ["infobar"],
                right: ["close"],
            },
        },

        Thumbs: {
            type: "classic",
        },

        keyboardType: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev",
        },
    });
}
window.addEventListener("load", handleGallery());

function handleLoading() {
    let imgs = document.querySelectorAll("img"),
        imgLoad = imagesLoaded(imgs),
        lengthImgs = imgs.length,
        countImgs = 0;

    imgLoad.on("always", function (instance) {});

    imgLoad.on("fail", function (instance) {});
    imgLoad.on("done", function (instance) {
        handleLoadHidden();
    });
    imgLoad.on("progress", function (instance, image) {
        countImgs++;
        let percent = Math.round((countImgs / lengthImgs) * 100);
        handleProgressLoading(percent);
    });
    function handleProgressLoading(percent) {
        let loadProgress = document.querySelector(
                ".loading .loading__inner .loading__inner-progress"
            ),
            percentText = document.querySelector(".loading .loading__percent");
        if (!loadProgress) return;

        loadProgress.style.width = `${percent}%`;

        if (!percentText) return;
        percentText.innerText = `${percent}%`;
    }
    function handleLoadHidden() {
        let loading = document.querySelector(".loading");
        loading.classList.add("--loaded");
    }
}
handleLoading();
