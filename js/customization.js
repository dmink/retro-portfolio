;'use strict';

// Main navigation - mobile

    $(function() {

        var mobileMenuBtn = $('.js-menu-btn'),
            mobileMenu = $('.js-menu-mobile'),
            windowWidth = $(window).width(),
            mobileScreenWidth = 840;

        $(mobileMenuBtn).on( 'click', function(event) {
            event.preventDefault();
            mobileMenu.slideToggle();
            mobileMenu.addClass('main-menu__mobile');
        });

        $(window).resize( function() {
            if( windowWidth > mobileScreenWidth && mobileMenu.is(':hidden') ) {
                mobileMenu.removeAttr('style');
            }
        });

    });

// Sticky navigation - scrolling

    $(function() {
        $(window).scroll( function() {

            if($(this).scrollTop() >= 1) {
                $('.top-header').addClass('top-header--scrolling');
            }
            else{
                $('.top-header').removeClass('top-header--scrolling');
            }
        });
    });

// Main navigation - moving to anchor and active item

    $(function() {
        $(document).on("scroll", onScroll);

        $('a[href*="#anchor"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('a').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            var target = this.hash,
                menu = target;
            $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 50 + 'px'
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();

        $('.js-main-menu a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));

            if (refElement.position().top-50 <= scrollPos && refElement.position().top-50 + refElement.height() > scrollPos) {
                $('.js-main-menu li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }

    $(window).scroll(function() {

        if  ($(window).scrollTop() == $(document).height() - $(window).height()) {
            $('.js-main-menu li:last-child a').addClass('active');
            $('.js-menu-link-penult').removeClass('active');
        }
    });

// Slider promo

    $(function() {

        $('.js-slider-promo').slick({
            fade: true,
            prevArrow: "<span class='slider-promo__arrows slider-promo__arrow-left'></span>",
            nextArrow: "<span class='slider-promo__arrows slider-promo__arrow-right'></span>"
        });
    });

// Portfolio grid

    $(function() {

        var filterList = {

            init: function() {

                $('.js-portfolio-preview').mixItUp({
                    selectors: {
                        target: '.portfolio-preview__item',
                        filter: '.filter-list__label'
                    },
                    load: {
                        filter:
                            '.portfolio-html, ' +
                            '.portfolio-wordpress, ' +
                            '.portfolio-landing, ' +
                            '.portfolio-shop, ' +
                            '.portfolio-blog '
                    }
                });

            }

        };

        // Run the show!
        filterList.init();
    });

// Post links

    $(function() {
        $('.js-content-article a').attr({
            rel: 'nofollow',
            target: '_blank'
        });
    });

// Form validation

    $(function() {

        $( 'input.form-feedback__name, input.form-feedback__email, textarea.form-feedback__message' )
            .unbind().blur( function() {

            var fieldName = $(this).attr('name');
            var fieldValue = $(this).val();

            switch(fieldName) {

                case 'feedbackName':
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/;

                    if( fieldValue.length > 2 && fieldValue != '' && rv_name.test(fieldValue) ) {
                        $(this).addClass('form-feedback--correct');
                        $(this).next('.error-box').text('Принято')
                            .css('color','green');
                    } else {
                        $(this).removeClass('form-feedback--correct').addClass('form-feedback--error');
                    }
                    break;

                case 'feedbackEmail':
                    var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

                    if( fieldValue != '' && rv_email.test(fieldValue) ) {
                        $(this).addClass('form-feedback--correct');
                    } else {
                        $(this).removeClass('form-feedback--correct').addClass('form-feedback--error');
                    }
                    break;

                case 'feedbackMessage':

                    if( fieldValue != '' && fieldValue.length < 5000 ) {
                        $(this).addClass('form-feedback--correct');
                    } else {
                        $(this).removeClass('form-feedback--correct').addClass('form-feedback--error');
                    }
                    break;


            } // end switch()

        }); // end blur()

        $('form.form-feedback').submit(function(e) {

            e.preventDefault();

            if( $('.form-feedback--correct').length == 3 ) {

                $.ajax({
                    url: '../feedback/action.php',
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function() {
                        $( 'form.form-feedback :input' ).attr( 'disabled', 'disabled' );
                    },

                    success: function() {
                        $( 'form.form-feedback :text, textarea' ).removeClass('form-feedback--correct').next('.form-feedback__notice').text('');
                    }
                });

            } else {
                return false;
            }

        }); // end submit()

    });