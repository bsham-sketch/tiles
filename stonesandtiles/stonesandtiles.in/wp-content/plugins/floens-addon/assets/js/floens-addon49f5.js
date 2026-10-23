(function ($) {
  "use strict";

  function floens_cuved_circle() {
    let circleTypeElm = $(".curved-circle__item");
    if (circleTypeElm.length) {
      circleTypeElm.each(function () {
        let elm = $(this);
        let options = elm.data("circle-text-options");
        elm.circleType(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  floens_cuved_circle();

  var WidgetDefaultHandler = function ($scope) {
    if ($scope.find(".wow").length) {
      var wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true // act on asynchronously loaded content (default is true)
      });
      wow.init();
    }

    // Sidebar
    if ($scope.find(".sidebar-btn__toggler").length) {
      $scope.find(".sidebar-btn__toggler").on("click", function (e) {
        e.preventDefault();
        $scope.find(".sidebar-one").toggleClass("active");
        $("body").toggleClass("locked");
      });
    }

    // team hover image
    $scope.find(".team-two__image--one").addClass("active");

    $scope.find(".team-two__item")
      .on("mouseenter", function () {
        var index = $(this).index();
        $scope.find(".team-two__image").removeClass("active").eq(index).addClass("active");
      })
      .on("mouseleave", function () {
        $scope.find(".team-two__image--one").addClass("active");
      });

    $scope.find(".team-two__image--one").addClass("active");

    // show cursor when services carousel is hovered
    $scope.find(".services-one__carousel")
      .on("mouseenter", function () {
        $scope.find(".services-one__cursor").fadeIn();
      })
      .on("mouseleave", function () {
        $scope.find(".services-one__cursor").fadeOut();
      });

    $scope.find(".services-one__carousel").on("mousemove", function (e) {
      var cursor = $scope.find(".services-one__cursor");
      var posX = e.pageX - $(this).offset().left - cursor.width() / 2;
      var posY = e.pageY - $(this).offset().top - cursor.height() / 2;

      cursor.css({
        left: posX + "px",
        top: posY + "px"
      });
    });


    //Fact Counter + Text Count
    if ($scope.find(".count-box").length) {
      $scope.find(".count-box").appear(
        function () {
          var $t = $(this),
            n = $t.find(".count-text").attr("data-stop"),
            r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
            $t.addClass("counted");
            $({
              countNum: $t.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            });
          }
        }, {
          accY: 0
        }
      );
    }

    // slick slider
    let floensslickCarousel = $scope.find(".floens-slick__carousel");
    if (floensslickCarousel.length) {
      floensslickCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let floensslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    // slick slider
    let floensslickCarouselWithCounter = $scope.find(
      ".floens-slick__carousel--with-counter"
    );

    if (floensslickCarouselWithCounter.length) {
      floensslickCarouselWithCounter.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");

        function addLeadingZero(num, size) {
          num = num.toString();
          while (num.length < size) num = "0" + num;
          return num;
        }
        elm
          .on("init", function (event, slick) {
            elm.append(
              '<div class="hero-slider__counter"><span class="hero-slider__counter__total"></span> <span class="hero-slider__counter__current"></span></div>'
            );
            elm
              .find(".hero-slider__counter__current")
              .text(addLeadingZero(slick.currentSlide + 1, 2));
            elm
              .find(".hero-slider__counter__total")
              .text(addLeadingZero(slick.slideCount, 2));
          })
          .slick("object" === typeof options ? options : JSON.parse(options))
          .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            elm
              .find(".hero-slider__counter__current")
              .text(addLeadingZero(nextSlide + 1, 2));
          });
      });
    }

    // owl slider
    let floensowlCarousel = $scope.find(".floens-owl__carousel");
    if (floensowlCarousel.length) {
      floensowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }

    let floensowlCarouselNav = $scope.find(".floens-owl__carousel--custom-nav");
    if (floensowlCarouselNav.length) {
      floensowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }

    if ($scope.find(".odometer").length) {
      var odo = $scope.find(".odometer");
      odo.each(function () {
        $(this).appear(function () {
          var countNumber = $(this).attr("data-count");
          $(this).html(countNumber);
        });
      });
    }

    if ($scope.find(".masonry-layout").length) {
      $scope.find(".masonry-layout").imagesLoaded(function () {
        $scope.find(".masonry-layout").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($scope.find(".img-popup").length) {
      var groups = {};
      $scope.find(".img-popup").each(function () {
        var id = parseInt($(this).attr("data-group"), 10);

        if (!groups[id]) {
          groups[id] = [];
        }

        groups[id].push(this);
      });

      $.each(groups, function () {
        $(this).magnificPopup({
          type: "image",
          closeOnContentClick: true,
          closeBtnInside: false,
          gallery: {
            enabled: true
          }
        });
      });
    }

    if ($scope.find(".floens-masonary").length) {
      $scope.find(".floens-masonary").imagesLoaded(function () {
        $scope.find(".floens-masonary").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($scope.find(".post-filter").length) {
      $scope.find(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $scope.find(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $scope.find(".floens-filter").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($scope.find(".post-filter.has-dynamic-filters-counter").length) {
      // var allItem = $('.single-filter-item').length;
      var activeFilterItem = $scope.find(".post-filter.has-dynamic-filters-counter").find(
        "li"
      );
      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $scope.find(".floens-filter").find(filterElement).length;
        $(this)
          .children(".filter-text")
          .append('<span class="count">(' + count + ")</span>");
      });
    }

    if ($scope.find(".masonary-layout").length) {
      $scope.find(".masonary-layout").isotope({
        layoutMode: "masonry"
      });
    }
    if ($scope.find(".post-filter").length) {
      $scope
        .find(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $scope.find(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $scope.find(".filter-layout").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($scope.find(".tabs-box").length) {
      $scope.find(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
        e.preventDefault();
        var target = $($(this).attr("data-tab"));

        if ($(target).is(":visible")) {
          return false;
        } else {
          target
            .parents(".tabs-box")
            .find(".tab-buttons")
            .find(".tab-btn")
            .removeClass("active-btn");
          $(this).addClass("active-btn");
          target
            .parents(".tabs-box")
            .find(".tabs-content")
            .find(".tab")
            .fadeOut(0);
          target
            .parents(".tabs-box")
            .find(".tabs-content")
            .find(".tab")
            .removeClass("active-tab");
          $(target).fadeIn(300);
          $(target).addClass("active-tab");
        }
      });
    }

    if ($scope.find(".neighborhoods__faq").length) {
      $scope
        .find(".neighborhoods__faq")
        .find(".accrodion")
        .each(function () {
          $(this).on("click", function () {
            let tabName = $(this).data("name");
            $scope.find(".neighborhoods__img-box")
              .find(".neighborhoods__location-1")
              .removeClass("active");
            $scope.find(".neighborhoods__img-box")
              .find(".neighborhoods__location-1." + tabName)
              .addClass("active");
          });
        });
    }

    //accordion
    if ($scope.find(".floens-accordion").length) {
      var accordionGrp = $scope.find(".floens-accordion");
      accordionGrp.each(function () {
        var accordionName = $(this).data("grp-name");
        var Self = $(this);
        var accordion = Self.find(".accordion");
        Self.addClass(accordionName);
        Self.find(".accordion .accordion-content").hide();
        Self.find(".accordion.active").find(".accordion-content").show();
        accordion.each(function () {
          $(this)
            .find(".accordion-title")
            .on("click", function () {
              if ($(this).parent().hasClass("active") === false) {
                $scope.find(".floens-accordion." + accordionName)
                  .find(".accordion")
                  .removeClass("active");
                $scope.find(".floens-accordion." + accordionName)
                  .find(".accordion")
                  .find(".accordion-content")
                  .slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".accordion-content").slideDown();
              }
            });
        });
      });
    }

    // Popular Causes Progress Bar
    if ($scope.find(".count-bar").length) {
      $scope.find(".count-bar").appear(
        function () {
          var el = $(this);
          var percent = el.data("percent");
          $(el).css("width", percent).addClass("counted");
        }, {
          accY: -50
        }
      );
    }

    // Popular Causes Progress Bar
    if ($scope.find(".circle-progress").length) {
      $scope.find(".circle-progress").appear(function () {
        let circleProgress = $scope.find(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }

    //Fact Counter + Text Count
    if ($scope.find(".count-box").length) {
      $scope.find(".count-box").appear(
        function () {
          var $t = $(this),
            n = $t.find(".count-text").attr("data-stop"),
            r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
            $t.addClass("counted");
            $({
              countNum: $t.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            });
          }
        }, {
          accY: 0
        }
      );
    }

    let thmSwiperSliders = $scope.find(".thm-swiper__slider");
    if (thmSwiperSliders.length) {
      thmSwiperSliders.each(function () {
        let elm = $(this);
        let options = elm.data("swiper-options");
        let thmSwiperSlider = new Swiper(
          elm,
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let thmOwlCarousels = $scope.find(".floens-owl__carousel");
    if (thmOwlCarousels.length) {
      thmOwlCarousels.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let thmOwlNavCarousels = $scope.find(".thm-owl__carousel--custom-nav");
    if (thmOwlNavCarousels.length) {
      thmOwlNavCarousels.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }

    if ($scope.find("#testimonials-two__thumb").length) {
      let testimonialsThumb = new Swiper("#testimonials-two__thumb", {
        slidesPerView: 3,
        spaceBetween: 0,
        speed: 1400,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        loop: true,
        autoplay: {
          delay: 5000
        }
      });

      let testimonialsCarousel = new Swiper("#testimonials-two__carousel", {
        observer: true,
        observeParents: true,
        speed: 1400,
        mousewheel: false,
        slidesPerView: 1,
        autoplay: {
          delay: 5000
        },
        thumbs: {
          swiper: testimonialsThumb
        },
        pagination: {
          el: "#testimonials-one__carousel-pagination",
          type: "bullets",
          clickable: true
        }
      });
    }
    if ($scope.find(".post-filter").length) {
      var postFilterList = $scope.find(".post-filter li");
      // for first init
      $scope.find(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $scope.find(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }
    if ($scope.find(".curved-circle--item").length) {
      $scope.find(".curved-circle--item").circleType();
    }

    // Date Picker
    if ($scope.find(".floens-datepicker").length) {
      $scope.find(".floens-datepicker").each(function () {
        $(this).datepicker();
      });
    }

    if ($("#datepicker").length) {
      $("#datepicker").datepicker();
    }

    if ($("#datepicker2").length) {
      $("#datepicker2").datepicker();
    }

    floens_stretch();

    function floens_stretch() {
      var i = $(window).width();
      $scope.find(".row .floens-stretch-element-inside-column").each(function () {
        var $this = $(this),
          row = $this.closest(".row"),
          cols = $this.closest('[class^="col-"]'),
          colsheight = $this.closest('[class^="col-"]').height(),
          rect = this.getBoundingClientRect(),
          l = row[0].getBoundingClientRect(),
          s = cols[0].getBoundingClientRect(),
          r = rect.left,
          d = i - rect.right,
          c = l.left + (parseFloat(row.css("padding-left")) || 0),
          u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
          p = s.left,
          f = i - s.right,
          styles = {
            "margin-left": 0,
            "margin-right": 0
          };
        if (Math.round(c) === Math.round(p)) {
          var h = parseFloat($this.css("margin-left") || 0);
          styles["margin-left"] = h - r;
        }
        if (Math.round(u) === Math.round(f)) {
          var w = parseFloat($this.css("margin-right") || 0);
          styles["margin-right"] = w - d;
        }
        $this.css(styles);
      });
    }
  };

  var WidgetFaqHandler = function ($scope) {
    if ($scope.find(".accrodion-grp").length) {
      var accrodionGrp = $scope.find(".accrodion-grp");
      accrodionGrp.each(function () {
        var accrodionName = $(this).data("grp-name");
        var Self = $(this);
        var accordion = Self.find(".accrodion");
        Self.addClass(accrodionName);
        Self.find(".accrodion .accrodion-content").hide();
        Self.find(".accrodion.active").find(".accrodion-content").show();
        accordion.each(function () {
          $(this)
            .find(".accrodion-title")
            .on("click", function () {
              if ($(this).parent().hasClass("active") === false) {
                $scope.find(".accrodion-grp." + accrodionName)
                  .find(".accrodion")
                  .removeClass("active");
                $scope.find(".accrodion-grp." + accrodionName)
                  .find(".accrodion")
                  .find(".accrodion-content")
                  .slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".accrodion-content").slideDown();
              }
            });
        });
      });
    }
  };


  var WidgetFooterSubscribeHandler = function ($scope) {
    // mailchimp form
    if ($scope.find(".mc-form").length) {
      $scope.find(".mc-form").each(function () {
        var Self = $(this);
        var mcURL = Self.data("url");
        var mcResp = Self.parent().find(".mc-form__response");

        Self.ajaxChimp({
          url: mcURL,
          callback: function (resp) {
            // appending response
            mcResp.append(function () {
              return '<p class="mc-message">' + resp.msg + "</p>";
            });
            // making things based on response
            if (resp.result === "success") {
              // Do stuff
              Self.removeClass("errored").addClass("successed");
              mcResp.removeClass("errored").addClass("successed");
              Self.find("input").val("");

              mcResp.find("p").fadeOut(10000);
            }
            if (resp.result === "error") {
              Self.removeClass("successed").addClass("errored");
              mcResp.removeClass("successed").addClass("errored");
              Self.find("input").val("");

              mcResp.find("p").fadeOut(10000);
            }
          }
        });
      });
    }
  };

  //elementor front start
  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/widget",
      WidgetDefaultHandler
    );

    elementorFrontend.hooks.addAction(
      "frontend/element_ready/floens-faq.default",
      WidgetFaqHandler
    );

    elementorFrontend.hooks.addAction(
      "frontend/element_ready/footer-subscribe.default",
      WidgetFooterSubscribeHandler
    );
  });

  let loginForm = $("#floens-login");
  let loginResult = $(".login-result");

  // login
  if (loginForm.length) {
    loginForm.submit(function (event) {
      event.preventDefault();

      var login = "action=signup_paragon&param=login&" + $(this).serialize();
      $.ajax({
        type: "POST",
        url: floens_login_object.ajaxurl,
        data: login,
        beforeSend: function () {
          // setting a timeout
          loginResult.addClass("loading");
        },
        success: function (data) {
          loginResult.removeClass("loading");
          if (data.status == 2) {
            loginResult.removeClass("alert alert-warning");
            loginResult.html(data.message).addClass("alert alert-success");
            window.location.href = floens_login_object.login_redirect_url;
          } else if (data.status == 1) {
            loginResult.html(data.message).addClass("alert alert-warning");
          } else {
            loginResult
              .html(floens_login_object.message)
              .addClass("alert alert-warning");
          }
        }
      });
    });
  }

  let registrationForm = $("#floens-registration");
  let registrationResult = $(".registration-result");
  // register
  if (registrationForm.length) {
    registrationForm.submit(function (event) {
      event.preventDefault();

      var signupForm =
        "action=signup_paragon&param=register&" + $(this).serialize();
      $.ajax({
        type: "POST",
        url: floens_login_object.ajaxurl,
        data: signupForm,
        beforeSend: function () {
          // setting a timeout
          registrationResult.addClass("loading");
        },
        success: function (data) {
          registrationResult.removeClass("loading");
          if (data.status == 2) {
            registrationResult.removeClass("alert alert-warning");
            registrationResult
              .html(data.message)
              .addClass("alert alert-success");
            window.location.href = floens_login_object.registration_redirect_url;
          } else {
            registrationResult
              .html(data.message)
              .addClass("alert alert-warning");
          }
        }
      });
    });
  }

})(jQuery);