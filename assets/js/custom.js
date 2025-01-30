/*--------------------- Copyright (c) Impel Car Dealer -----------------------
[Master Javascript]
Project: Impel Car Dealer html
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    var Impel = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-------------- Impel Car Dealer Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.loader();
            this.bottom_top();
            this.toggle_menu();
            this.header_search();
            this.banner_tab();
            this.banner_slider();
            this.type_slider();
            this.filter_tab();
            this.offer_counter();
            this.testi_video();
            this.formValidation();
            this.copy_right();
            this.scroll_anim();
            this.history_tab();
            this.service_tab();
            this.price_slider();
            this.product_view();
            this.auto_tab();
            this.sell_tab();
            this.file_upload();
        },
        /*-------------- Impel Car Dealer Functions Calling ---------------------------------------------------
        --------------------------------------------------------------------------------------------------*/
        /*-----------------------------------------------------
        Loader
        -----------------------------------------------------*/
        loader: function() {
            $(window).on("load", function() {
                $(".loader").fadeOut();
                $(".spinner").delay(500).fadeOut("slow");
            });
        },
        /*-----------------------------------------------------
        Bottom To Top
        -----------------------------------------------------*/
        bottom_top: function() {
            if ($("#button").length > 0) {
                var btn = $("#button");
                var fixed = $(".impl_header_wrapper");
                $(window).scroll(function() {
                    if ($(window).scrollTop() > 200) {
                        btn.addClass("show");
                        fixed.addClass("fixed");
                    } else {
                        btn.removeClass("show");
                        fixed.removeClass("fixed");
                    }
                });
                btn.on("click", function(e) {
                    e.preventDefault();
                    $("html, body").animate({
                        scrollTop: 0
                    }, "200");
                });
            }
        },
        /*-----------------------------------------------------
        Toggle Menu
        -----------------------------------------------------*/
        toggle_menu: function() {
            $(document).on("click", function(event) {
                var $trigger = $(".impl_menu_dd");
                if ($trigger !== event.target && !$trigger.has(event.target).length) {
                    $(".impl_sub_menu").removeClass("open");
                }
            });
            $(".impl_toggle_btn, .impl_body_overlay").on("click", function() {
                $("body").toggleClass("menu-open");
            });
            $('.impl_menu_dd a').click(function(event) {
                event.stopPropagation(); // Prevent event bubbling
                const $thisDropdown = $(this).next('.impl_sub_menu');
                // Close all other dropdowns
                $('.impl_sub_menu').not($thisDropdown).removeClass('open');
                // Toggle the clicked dropdown's content
                $thisDropdown.toggleClass('open');
            });
        },
        /*-----------------------------------------------------
            Form Validation
        -----------------------------------------------------*/

        formValidation: function() {
            function checkRequire(formId, targetResp) {
                targetResp.html('');
                var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
                var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
                var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
                var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
                var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
                var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
                var check = 0;
                $('#er_msg').remove();
                var target = (typeof formId == 'object') ? $(formId) : $('#' + formId);
                target.find('input , textarea , select').each(function() {
                    if ($(this).hasClass('require')) {
                        if ($(this).val().trim() == '') {
                            check = 1;
                            $(this).focus();
                            $(this).parent('div').addClass('form_error');
                            targetResp.html('You missed out some fields.');
                            $(this).addClass('error');
                            return false;
                        } else {
                            $(this).removeClass('error');
                            $(this).parent('div').removeClass('form_error');
                        }
                    }
                    if ($(this).val().trim() != '') {
                        var valid = $(this).attr('data-valid');
                        if (typeof valid != 'undefined') {
                            if (!eval(valid).test($(this).val().trim())) {
                                $(this).addClass('error');
                                $(this).focus();
                                check = 1;
                                targetResp.html($(this).attr('data-error'));
                                return false;
                            } else {
                                $(this).removeClass('error');
                            }
                        }
                    }
                });
                return check;
            }
            $(".submitForm").on('click', function() {
                var _this = $(this);
                var targetForm = _this.closest('form');
                var errroTarget = targetForm.find('.response');
                var check = checkRequire(targetForm, errroTarget);

                if (check == 0) {
                    var formDetail = new FormData(targetForm[0]);
                    formDetail.append('form_type', _this.attr('form-type'));
                    $.ajax({
                        method: 'post',
                        url: 'ajaxmail.php',
                        data: formDetail,
                        cache: false,
                        contentType: false,
                        processData: false
                    }).done(function(resp) {
                        console.log(resp);
                        if (resp == 1) {
                            targetForm.find('input').val('');
                            targetForm.find('textarea').val('');
                            errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
                        } else {
                            errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
                        }
                    });
                }
            });
        },
        /*-----------------------------------------------------
        Header Search Bar
        -----------------------------------------------------*/
        header_search: function() {
            $(".impl_header_search, .impl_search_close").on("click", function() {
                $(".impl_search_area").toggleClass("open");
            });
        },
        /*-----------------------------------------------------
        Banner Tab
        -----------------------------------------------------*/
        banner_tab: function() {
            $('.impl_banner_tab li a').on('click', function() {
                var target = $(this).attr('data-rel');
                $('.impl_banner_tab li a').removeClass('active');
                $(this).addClass('active');
                $("#" + target).fadeIn('slow').siblings(".impl_banner_pane").hide();
                return false;
            });
        },
        /*-----------------------------------------------------
        Banner Slider
        -----------------------------------------------------*/
        banner_slider: function() {
            var swiper = new Swiper(".impl_banner_slider .swiper", {
                loop: true,
                speed: 2000,
                grabCursor: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".impl_banner_slider .swiper-button-next",
                    prevEl: ".impl_banner_slider .swiper-button-prev",
                },
            });
        },
        /*-----------------------------------------------------
        Browse By Type Slider
        -----------------------------------------------------*/
        type_slider: function() {
            var swiper = new Swiper('.impl_type_slider .swiper', {
                slidesPerView: 2,
                spaceBetween: 20,
                loop: true,
                speed: 2000,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".impl_type_slider .swiper-button-next",
                    prevEl: ".impl_type_slider .swiper-button-prev",
                },
                breakpoints: {
                    1400: {
                        slidesPerView: 6,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    360: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    }
                }
            });
        },
        /*-----------------------------------------------------
        Filter Tab
        -----------------------------------------------------*/
        filter_tab: function() {
            var $btns = $('.impl_fiter_tab .impl_btn').click(function() {
                if (this.id == 'all') {
                    $('.impl_fiter_pane .row > div').fadeIn(450);
                } else {
                    var $el = $('.' + this.id).fadeIn(450);
                    $('.impl_fiter_pane .row > div').not($el).hide();
                }
                $btns.removeClass('active');
                $(this).addClass('active');
            })
        },
        /*-----------------------------------------------------
        Offer Counter
        -----------------------------------------------------*/
        offer_counter: function() {
            const counter = document.querySelectorAll('.counter');
            // covert to array
            const array = Array.from(counter);
            // select array element
            array.map((item) => {
                // data layer
                let counterInnerText = item.textContent;
                let count = 1;
                let speed = item.dataset.speed / counterInnerText

                function counterUp() {
                    item.textContent = count++
                        if (counterInnerText < count) {
                            clearInterval(stop);
                        }
                }
                const stop = setInterval(() => {
                    counterUp();
                }, speed);
            })
        },
        /*-----------------------------------------------------
        Testimonial Video
        -----------------------------------------------------*/
        testi_video: function() {
            if ($('.video_popup').length > 0) {
                $('.video_popup').magnificPopup({
                    type: 'iframe',
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler">' +
                            '<div class="mfp-close"></div>' +
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                            '<div class="mfp-title">Some caption</div>' +
                            '</div>',
                        patterns: {
                            youtube: {
                                index: 'youtube.com/',
                                id: 'v=',
                                src: 'https://www.youtube.com/embed/8lQzkwqhKTk'
                            }
                        }
                    }
                });
            }
        },
        /*-----------------------------------------------------
        Copy Right
        -----------------------------------------------------*/
        copy_right: function() {
            document.getElementById("copyYear").innerHTML = new Date().getFullYear();
        },
        /*-----------------------------------------------------
        History Tab
        -----------------------------------------------------*/
        history_tab: function() {
            $('.impl_history_tab li a').on('click', function() {
                var target = $(this).attr('data-rel');
                $('.impl_history_tab li a').removeClass('active');
                $(this).addClass('active');
                $("#" + target).fadeIn('slow').siblings(".impl_history_pane").hide();
                return false;
            });
        },
        /*-----------------------------------------------------
        Price Range Slider
        -----------------------------------------------------*/
        price_slider: function() {
            const rangeInput = document.querySelectorAll(".range-input input"),
                priceInput = document.querySelectorAll(".price-input input"),
                range = document.querySelector(".impl_range_slider .impl_progress");
            let priceGap = 1000;
            priceInput.forEach((input) => {
                input.addEventListener("input", (e) => {
                    let minPrice = parseInt(priceInput[0].value),
                        maxPrice = parseInt(priceInput[1].value);
                    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                        if (e.target.className === "input-min") {
                            rangeInput[0].value = minPrice;
                            range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                        } else {
                            rangeInput[1].value = maxPrice;
                            range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                        }
                    }
                });
            });
            rangeInput.forEach((input) => {
                input.addEventListener("input", (e) => {
                    let minVal = parseInt(rangeInput[0].value),
                        maxVal = parseInt(rangeInput[1].value);
                    if (maxVal - minVal < priceGap) {
                        if (e.target.className === "range-min") {
                            rangeInput[0].value = maxVal - priceGap;
                        } else {
                            rangeInput[1].value = minVal + priceGap;
                        }
                    } else {
                        priceInput[0].value = minVal;
                        priceInput[1].value = maxVal;
                        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                    }
                });
            });
        },
        /*-----------------------------------------------------
        Service Tab
        -----------------------------------------------------*/
        service_tab: function() {
            $('.impl_service_tab li a').on('click', function() {
                var target = $(this).attr('data-rel');
                $('.impl_service_tab li a').removeClass('active');
                $(this).addClass('active');
                $("#" + target).fadeIn('slow').siblings(".impl_service_pane").hide();
                return false;
            });
        },
        /*-----------------------------------------------------
        Car Review
        -----------------------------------------------------*/
        product_view: function() {
            var thumbs = $('.img-selection').find('img');
            thumbs.click(function() {
                var src = $(this).attr('src');
                var dp = $('.display-img');
                var img = $('.zoom');
                dp.attr('src', src);
                img.attr('src', src);
            });
            $(".img-thumb").click(function() {
                $('.img-thumb').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        /*-----------------------------------------------------
        Auto Tab
        -----------------------------------------------------*/
        auto_tab: function() {
            $('.impl_auto_tab li a').on('click', function() {
                var target = $(this).attr('data-rel');
                $('.impl_auto_tab li a').removeClass('active');
                $(this).addClass('active');
                $("#" + target).fadeIn('slow').siblings(".impl_auto_pane").hide();
                return false;
            });
        },
        /*-----------------------------------------------------
        Sell Tab
        -----------------------------------------------------*/
        sell_tab: function() {
            $('.impl_sell_tab li a').on('click', function() {
                var target = $(this).attr('data-rel');
                $('.impl_sell_tab li a').removeClass('active');
                $(this).addClass('active');
                $("#" + target).fadeIn('slow').siblings(".impl_sell_pane").hide();
                return false;
            });
        },
        /*-----------------------------------------------------
        File Upload
        -----------------------------------------------------*/
        file_upload: function() {
            let input = document.getElementById("inputTag");
            let imageName = document.getElementById("imageName")
            addEventListener("change", () => {
                let inputImage = document.querySelector("input[type=file]").files[0];
                imageName.innerText = inputImage.name;
            })
        },
        /*-----------------------------------------------------
        Animate On Scroll
        -----------------------------------------------------*/
        scroll_anim: function() {
            AOS.init({
                duration: 1000,
                offset: 0,
                delay: 100,
            })
        },
    };
    Impel.init();
})(jQuery);