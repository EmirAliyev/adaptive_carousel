document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const golfSvgEl = document.querySelector(".golf__label-check");
  const golfTextEl = document.querySelector(".golf__label-img");
  const becomeSponsor = document.querySelector(".become-sponsor__btn-round");

  const golfModal = document.querySelector(".modal-golf");
  const sponsorModal = document.querySelector(".sponsor-modal");
  const speakersModal = document.querySelector(".speakers-modal");

  const speakersModalClose = document.querySelector(".speakers-modal__close");
  const golfModalClose = document.querySelector(".modal-golf__close");
  const sponsorModalClose = document.querySelector(".sponsor-modal__close");
  const speakersModalCloseBottom = document.querySelector(
    ".speakers-modal__close-btn"
  );
  const sponsorModalCloseBottom = document.querySelector(
    ".sponsor-modal__bottom-close"
  );

  const scrollTriggerToSpeakers = document.querySelector(
    ".pop-left__item-speakers"
  );
  const scrollTriggerToSchedule = document.querySelector(
    ".pop-left__item-schedule"
  );
  const scrollTriggerToPhotos = document.querySelector(
    ".pop-left__item-photos"
  );
  const scrollTriggerToSponsors = document.querySelector(
    ".pop-left__item-sponsors"
  );

  const targetSpeakers = document.querySelector(".speakers-section");
  const targetSchedule = document.querySelector(".schedule-section");
  const targetGallery = document.querySelector(".gallery-section");
  const targetSponsors = document.querySelector(".sponsors-section");

  function scrollToSection(el) {
    locoScroll.scrollTo(el);
  }

  scrollTriggerToSpeakers.addEventListener("click", () =>
    scrollToSection(targetSpeakers)
  );

  scrollTriggerToSchedule.addEventListener("click", () =>
    scrollToSection(targetSchedule)
  );

  scrollTriggerToPhotos.addEventListener("click", () =>
    scrollToSection(targetGallery)
  );
  scrollTriggerToSponsors.addEventListener("click", () =>
    scrollToSection(targetSponsors)
  );

  let modalIsLoading = false;

  const showWithAnimation = (element) => {
    element.classList.remove("is-hidden");
    element.classList.add("is-visible");

    TweenMax.from(element, 1, { y: "100%", ease: Power2.easeOut });

    setTimeout(() => {
      modalIsLoading = false;
    }, 1000);
  };

  const hideWithAnimation = (element) => {
    if (element === speakersModal) {
      contentForImages.forEach((item) => {
        item.classList.remove("is-visible");
        item.classList.add("is-hidden");
      });
    }
    TweenMax.to(element, 1, {
      y: "100%",
      ease: Power2.easeOut,
      onComplete: () => {
        TweenMax.set(element, { clearProps: "all" });
        element.classList.remove("is-visible");
        element.classList.add("is-hidden");
      },
    });

    setTimeout(() => {
      modalIsLoading = false;
    }, 1000);
  };

  const toggleModal = (element) => {
    if (modalIsLoading) {
      return;
    }
    modalIsLoading = true;
    if (element.classList.contains("is-visible")) {
      hideWithAnimation(element);
    } else {
      showWithAnimation(element);
    }
  };

  golfSvgEl.addEventListener("click", function () {
    toggleModal(golfModal);
  });

  golfTextEl.addEventListener("click", function () {
    toggleModal(golfModal);
  });
  golfModalClose.addEventListener("click", function () {
    toggleModal(golfModal);
  });

  becomeSponsor.addEventListener("click", function () {
    toggleModal(sponsorModal);
  });

  sponsorModalClose.addEventListener("click", function () {
    toggleModal(sponsorModal);
  });
  sponsorModalCloseBottom.addEventListener("click", function () {
    toggleModal(sponsorModal);
  });

  speakersModalClose.addEventListener("click", function () {
    toggleModal(speakersModal);
  });
  speakersModalCloseBottom.addEventListener("click", function () {
    toggleModal(speakersModal);
  });

  let marqueeSlider = null;

  // Создайте функцию для инициализации Swiper
  function initSwiper() {
    // Проверка ширины экрана
    if (window.innerWidth > 1024) {
      // Инициализация Swiper, если еще не был инициализирован
      if (!marqueeSlider) {
        marqueeSlider = new Swiper("#speakersMarquee", {
          loop: true,
          clickable: false,
          autoplay: false,
          allowTouchMove: false,
          slidesPerView: 8,
          slidesPerGroup: 1,
          speed: 1000,
          effect: "slide",
        });
      }
    } else {
      // Если ширина экрана меньше или равна 1024, и Swiper был инициализирован, уничтожьте его
      if (marqueeSlider) {
        marqueeSlider.destroy();
        marqueeSlider = null; // Установите значение в null, чтобы показать, что Swiper не инициализирован
      }
    }
  }

  // Инициализация Swiper при загрузке страницы
  initSwiper();

  // Обработчик события ресайза
  window.addEventListener("resize", () => {
    // При изменении размера экрана деактивируйте или активируйте Swiper
    initSwiper();
  });

  let sliderSpeakers = $(".slider-for");
  let sliderSpeakersNav = $(".slider-nav");

  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: ".slider-nav",
    
  });
  $(".slider-nav").slick({
    slidesToShow: 10,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    variableWidth: true,
    prevArrow: $(".custom-prev-button"),
    nextArrow: $(".custom-next-button"),
  });

  let sliderFor = document.querySelector(".slider-for");
  let sliderForImages = document.querySelectorAll(".swiper-slide");
  let contentForImages = document.querySelectorAll(
    ".speakers-modal__content-item"
  );
  const imagesArray = sliderFor.dataset.images.split(",");
  let content;

  sliderForImages.forEach(function (image) {
    image.addEventListener("click", function () {
      if (modalIsLoading) {
        return;
      }
      modalIsLoading = true;
      let dataIndex = image.getAttribute("data-index");
      content = contentForImages[dataIndex];
      sliderSpeakers.slick("slickGoTo", dataIndex);
      sliderSpeakersNav.slick("slickGoTo", dataIndex);
      if (speakersModal.classList.contains("is-hidden")) {
        content.classList.add("is-visible");
        content.classList.remove("is-hidden");
        showWithAnimation(speakersModal);
        $(".slider-for, .slider-nav").slick("setPosition");
      } else {
        content.classList.add("is-hidden");
        content.classList.remove("is-visible");
        hideWithAnimation(speakersModal);
      }
    });
  });

  sliderSpeakers.on("afterChange", function (event, slick, currentSlide) {
    content.classList.add("is-hidden");
    content.classList.remove("is-visible");
    content = contentForImages[currentSlide];
    content.classList.add("is-visible");
  });

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1,
    tablet: {
      smooth: true,
      breakpoint: 0,
      direction: "vertical", // Например, горизонтальная прокрутка на планшетах
    },
    mobile: {
      smooth: true,
      breakpoint: 0,
      direction: "vertical", // Например, горизонтальная прокрутка на планшетах
    },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("[data-scroll-container]").style.transform
      ? "transform"
      : "fixed",
  });

  gsap.fromTo(
    ".header-left",
    {
      opacity: 0,
      y: 0,
      x: "-100%",
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".start-section__mobile-btn",
    {
      opacity: 0,
      y: 0,
      x: "-200%",
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".header-right",
    {
      opacity: 0,
      y: 0,
      x: 300,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".header-text__first",
    {
      opacity: 0,
      y: 0,
      x: -300,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".header-text__second",
    {
      opacity: 0,
      y: 0,
      x: 900,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".header-text-big",
    {
      opacity: 0,
      x: 0,
      y: 300,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );

  const tlTopPop = gsap.timeline();
  tlTopPop.to(".pop", { yPercent: 100 });

  ScrollTrigger.create({
    animation: tlTopPop,
    scroller: ".scrollContainer",
    trigger: ".start-section",
    start: "90% top",
    end: "bottom top",
    scrub: 2,
  });

  const tlTopMobBtn = gsap.timeline();
  tlTopMobBtn.to(".start-section__mobile-btn", { xPercent: -200 });

  ScrollTrigger.create({
    animation: tlTopMobBtn,
    scroller: ".scrollContainer",
    trigger: ".header-left",
    start: "90% top",
    end: "100% top",
    scrub: 2,
  });

  const tlHeaderLeft = gsap.timeline();
  tlHeaderLeft.to(".header-left", { xPercent: -100 });

  ScrollTrigger.create({
    animation: tlHeaderLeft,
    scroller: ".scrollContainer",
    trigger: ".header-left",
    start: "top top",
    end: "50% top",
    scrub: 2,
  });

  const tlHeaderRight = gsap.timeline();
  tlHeaderRight.to(".header-right", { xPercent: 100 });

  ScrollTrigger.create({
    animation: tlHeaderRight,
    scroller: ".scrollContainer",
    trigger: ".header-right",
    start: "top top",
    end: "50% top",
    scrub: 2,
  });

  const tlHeaderTitleTop = gsap.timeline();
  tlHeaderTitleTop.to(".header-text__first", { xPercent: -100 });

  const tlHeaderTitleBottom = gsap.timeline();
  tlHeaderTitleBottom.to(".header-text__second", { xPercent: 200 });

  ScrollTrigger.create({
    animation: tlHeaderTitleTop,
    scroller: ".scrollContainer",
    trigger: ".start-section__text",
    start: "top top",
    end: "bottom top",
    scrub: 2,
  });

  ScrollTrigger.create({
    animation: tlHeaderTitleBottom,
    scroller: ".scrollContainer",
    trigger: ".start-section__text",
    start: "80px top",
    end: "bottom top",
    scrub: 2,
  });

  const tlHeaderTextBig = gsap.timeline();
  tlHeaderTextBig.to(".header-text-big", { xPercent: -200 });

  ScrollTrigger.create({
    animation: tlHeaderTextBig,
    scroller: ".scrollContainer",
    trigger: ".start-section__text",
    start: "180px top",
    end: "bottom top",
    scrub: 2,
  });

  const tlSpeakersTitle = gsap.timeline();
  tlSpeakersTitle.from(".speakers__title", { xPercent: 100, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSpeakersTitle,
    scroller: ".scrollContainer",
    trigger: ".speakers__title",
    start: "top bottom",
    end: "100% bottom",
    scrub: 2,
  });

  const tlSpeakersImg = gsap.timeline();
  tlSpeakersImg.from(".speaker-block__img", { xPercent: -100, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSpeakersImg,
    scroller: ".scrollContainer",
    trigger: ".speaker-block__img",
    start: "10% bottom",
    end: "20% bottom",
    scrub: 2,
  });

  const tlSpeakersText = gsap.timeline();
  tlSpeakersText.from(".speaker-block__text", { xPercent: 100, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSpeakersText,
    scroller: ".scrollContainer",
    trigger: ".speaker-block__text",
    start: "15% bottom",
    end: "25% bottom",
    scrub: 2,
  });

  const tlSchedules_1 = gsap.timeline();
  tlSchedules_1
    .from(".schedule-section-title", { xPercent: -100, opacity: 0 })
    .from(".schedule_first", { xPercent: -100, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSchedules_1,
    scroller: ".scrollContainer",
    trigger: ".schedule_first",
    start: "5% bottom",
    end: "15% bottom",
    scrub: 2,
  });

  const tlSchedules_2 = gsap.timeline();
  tlSchedules_2.from(".schedule_second", { yPercent: 10, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSchedules_2,
    scroller: ".scrollContainer",
    trigger: ".schedule_second",
    start: "5% bottom",
    end: "15% bottom",
    scrub: 2,
  });

  const tlSchedules_3 = gsap.timeline();
  tlSchedules_3.from(".schedule_third", { xPercent: -100, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSchedules_3,
    scroller: ".scrollContainer",
    trigger: ".schedule_third",
    start: "5% bottom",
    end: "15% bottom",
    scrub: 2,
  });

  const tlGalleryTop = gsap.timeline();
  tlGalleryTop.from(".gallery-block-top", { xPercent: 110, opacity: 0 });

  ScrollTrigger.create({
    animation: tlGalleryTop,
    scroller: ".scrollContainer",
    trigger: ".gallery-block-top",
    start: "10% bottom",
    end: "25% bottom",
    scrub: 2,
  });

  const tlGalleryBottom = gsap.timeline();
  tlGalleryBottom.from(".gallery-block-bottom", {
    xPercent: -110,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlGalleryBottom,
    scroller: ".scrollContainer",
    trigger: ".gallery-block-bottom",
    start: "10% bottom",
    end: "25% bottom",
    scrub: 2,
  });

  const tlFormInstruction = gsap.timeline();
  tlFormInstruction
    .from(".form-section__title", {
      xPercent: -300,
      opacity: 0,
    })
    .from(".form-section__instruction", {
      xPercent: 300,
      opacity: 0,
    });

  ScrollTrigger.create({
    animation: tlFormInstruction,
    scroller: ".scrollContainer",
    trigger: ".form-section",
    start: "20% bottom",
    end: "30% bottom",
    scrub: 2,
  });

  const tlFormInputs = gsap.timeline();

  tlFormInputs.from(".input-form__item", { yPercent: 100, opacity: 0 });
  ScrollTrigger.create({
    animation: tlFormInputs,
    scroller: ".scrollContainer",
    trigger: ".input-form",
    start: "top bottom",
    end: "30% center",
    scrub: 2,
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  const tlBook = gsap.timeline();
  tlBook
    .from(".book_description-main", { xPercent: 200, opacity: 0 })
    .from(".sub-first", { xPercent: -200, opacity: 0 })
    .from(".sub-second", { xPercent: 200, opacity: 0 })
    .from(".book_btn", { xPercent: -200, opacity: 0 });

  ScrollTrigger.create({
    animation: tlBook,
    scroller: ".scrollContainer",
    trigger: ".book-section",
    start: "20% bottom",
    end: "60% bottom",
    scrub: 2,
  });

  const tlSponsors_1 = gsap.timeline();
  tlSponsors_1.from(".sponsors-row-first__item", { xPercent: 200, opacity: 0 });

  ScrollTrigger.create({
    animation: tlSponsors_1,
    scroller: ".scrollContainer",
    trigger: ".sponsors-row-first__item",
    start: "40% bottom",
    end: "80% bottom",
    scrub: 2,
  });

  const tlSponsors_2 = gsap.timeline();
  tlSponsors_2.from(".sponsors-row-second__item", {
    xPercent: -200,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlSponsors_2,
    scroller: ".scrollContainer",
    trigger: ".sponsors-row-second__item",
    start: "40% bottom",
    end: "80% bottom",
    scrub: 2,
  });

  const tlSponsors_3 = gsap.timeline();
  tlSponsors_3.from(".sponsors-row-third__item", {
    xPercent: 200,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlSponsors_3,
    scroller: ".scrollContainer",
    trigger: ".sponsors-row-third__item",
    start: "40% bottom",
    end: "80% bottom",
    scrub: 2,
  });

  const tlSponsorsTitle = gsap.timeline();
  tlSponsorsTitle.from(".sponsors-section-title", {
    xPercent: 200,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlSponsorsTitle,
    scroller: ".scrollContainer",
    trigger: ".sponsors-row-first__item",
    start: "start bottom",
    end: "10% bottom",
    scrub: 2,
  });

  const tlBecomeSponsorRound = gsap.timeline();
  tlBecomeSponsorRound.from(".become-sponsor__btn-round", {
    yPercent: 300,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlBecomeSponsorRound,
    scroller: ".scrollContainer",
    trigger: ".become-sponsor-section",
    start: "20% bottom",
    end: "60% bottom",
    scrub: 2,
  });

  const tlBecomeSponsorDesc = gsap.timeline();
  tlBecomeSponsorDesc.from(".become-sponsor__description", {
    xPercent: -100,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlBecomeSponsorDesc,
    scroller: ".scrollContainer",
    trigger: ".become-sponsor-section",
    start: "start bottom",
    end: "40% bottom",
    scrub: 2,
  });

  const tlBecomeSponsorTitle = gsap.timeline();
  tlBecomeSponsorTitle
    .from(".become-sponsor__title", {
      xPercent: -200,
      opacity: 0,
    })
    .from(".become-sponsor__feedback", {
      xPercent: 200,
      opacity: 0,
    });

  ScrollTrigger.create({
    animation: tlBecomeSponsorTitle,
    scroller: ".scrollContainer",
    trigger: ".become-sponsor__btn",
    start: "start bottom",
    end: "100% bottom",
    scrub: 2,
  });

  const tlBecomeSponsorBtn = gsap.timeline();
  tlBecomeSponsorBtn.from(".become-sponsor__btn", {
    yPercent: 100,
    opacity: 0,
  });

  ScrollTrigger.create({
    animation: tlBecomeSponsorBtn,
    scroller: ".scrollContainer",
    trigger: ".become-sponsor__btn",
    start: "bottom bottom",
    end: "120% bottom",
    scrub: 2,
  });
});

document
  .querySelector(".show-all-speakers")
  .addEventListener("click", function () {
    let marquee = document.getElementById("speakersMarquee");
    let button = document.querySelector(".show-all-speakers-icon");
    let tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (marquee.classList.contains("show-all-clicked")) {
      tl.to(marquee, { maxHeight: "40.5rem", duration: 0.5 });
      tl.to(button, { rotation: 0, duration: 0.5 }, "-=0.5"); // Вращение кнопки обратно
    } else {
      let scrollHeightRem =
        marquee.scrollHeight /
          parseFloat(getComputedStyle(document.documentElement).fontSize) +
        "rem";
      tl.to(marquee, { maxHeight: scrollHeightRem, duration: 0.5 });
      tl.to(button, { rotation: 180, duration: 0.5 }, "-=0.5"); // Вращение кнопки на 180 градусов
    }

    marquee.classList.toggle("show-all-clicked");
  });

document
  .querySelector(".show-all-gallery")
  .addEventListener("click", function () {
    let marquee = document.getElementById("gallerySection");
    let button = document.querySelector(".show-all-gallery-icon");
    let tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (marquee.classList.contains("show-all-clicked")) {
      tl.to(marquee, { maxHeight: "52rem", duration: 0.5 });
      tl.to(
        button,
        { rotation: 0, duration: 0.5, ease: "power2.inOut" },
        "-=0.5"
      ); // Вращение кнопки обратно
    } else {
      let scrollHeightRem =
        marquee.scrollHeight /
          parseFloat(getComputedStyle(document.documentElement).fontSize) +
        "rem";
      tl.to(marquee, { maxHeight: scrollHeightRem, duration: 0.5 });
      tl.to(
        button,
        { rotation: 180, duration: 0.5, ease: "power2.inOut" },
        "-=0.5"
      ); // Вращение кнопки на 180 градусов
    }

    marquee.classList.toggle("show-all-clicked");
  });
