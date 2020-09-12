(function ($) {
    "use strict";

    //Menu Sticky
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 60) {
            $('.menu--sticky').addClass('sticky--on');
        } else if ($(window).scrollTop() >= 0) {
            $('.menu--sticky').removeClass('sticky--on');
        }
    });

    var windowWidth = $(window).width();
    if(localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', '{"product":[]}');
    }
    /* responsive mobile menu */
    function mobileMenu(dropDownTrigger, dropDown){
        $('.navbar '+dropDown).slideUp();
        $(dropDownTrigger).removeAttr('data-toggle');

        $('.navbar '+dropDownTrigger).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active').siblings(dropDown)
                .slideToggle().parent().siblings('.dropdown')
                .children(dropDown).slideUp().siblings(dropDownTrigger).removeClass('active');
        })
    }


    if(windowWidth < 992){
        // mobileMenu('.dropdown-toggle', '');
        mobileMenu('.nav-item.dropdown .nav-link', '.mega-menu,.dropdown-menu');
    }

    /*
     * Replace all SVG images with inline SVG
     */
    const svgCon = () => {

        $('img.svg').each(function () {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');

        });
    }

    // tooltip trigger
    $('[data-toggle="tooltip"]').tooltip();

    //select2 trigger
    $(document).ready(function () {
        $(".select2_default").select2({
            placeholder: "Multiple Select",
            width: "100%",
            containerCssClass: "form-control"
        });

        function selecWithIcon(selected) {
            if (!selected.id) {
                return selected.text;
            }
            var $elem = $(
                "<span><span class='la la-" + selected.element.value + "'></span>" + selected.text + "</span>"
            );
            return $elem;
        }

        $(".select2_tagged").select2({
            multiple: true,
            placeholder: "Select options",
            containerCssClass: "form-control"
        });

        $(".selection_with_icon").select2({
            templateResult: selecWithIcon,
            containerCssClass: "form-control",
            dropdownCssClass: "custom_select_with_icon"

        });
    });

    /* bar rating plugin installation */
    $('.give_rating').barrating({
        theme: 'fontawesome-stars'
    });

    //range slider dark
    $("#slider-range2").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#amount2").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount2").val("$" + $("#slider-range2").slider("values", 0) +
        " - $" + $("#slider-range2").slider("values", 1));

    //Trumbowyg Editor
    $('#text-editor').trumbowyg();

    /* go top */
    var scrollTop = $('.go_top');
    $(window).on('scroll', function () {
        var distanceFromTop = $(document).scrollTop();
        if(distanceFromTop > 117){
            scrollTop.fadeIn(400);
        }
        else{
            scrollTop.fadeOut(400);
        }
    });
    scrollTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $(".custom-upload").change(function(){
        $(".file-name").text(this.files[0].name);
    });

    const video = () => {
        $('.video-iframe').magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: function(url) {
                            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                            if ( !m || !m[1] ) return null;
                            return m[1];
                        },
                        src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: function(url) {
                            var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                            if ( !m || !m[5] ) return null;
                            return m[5];
                        },
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }

    $(document).ready(() => {
        //Video Popup
        video();
        //initialize counterUp js
        $('.count_up').counterUp();
        svgCon();
        //initialize video bg
        $("#bgndVideo").YTPlayer();
        //initialize filterizr
        $('.filter-sort ul li').on("click", function () {
            $('.filter-sort ul li').removeClass('active');
            $(this).addClass('active');
        });
        $('.filter-sort2 ul li').on("click", function () {
            $('.filter-sort2 ul li').removeClass('active');
            $(this).addClass('active');
        });

        if(localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', '{"product":[[{"id":"2","imgSrc":"./assets/img/c10.jpg","view":["./assets/img/c10.jpg","./assets/img/c9.jpg","./assets/img/c11.jpg"],"title":"Marketing Presentation","category":"Marketing","price":"280.00","content":"Investig ationes demons trave runt lectores legere liusry quod ii legunt saepius claritas Investig ationes."}]]}');
        }

        $('.countdown').countdown('2019/11/25', function (event) {
            var $this = $(this).html(event.strftime(''
                + '<li><span>%D</span> <span>Days</span></li>  '
                + '<li><span>%H</span> <span>Hours</span></li>  '
                + '<li><span>%M</span> <span>Minutes</span></li>  '
                + '<li><span>%S</span> <span>Seconds</span></li> '));
        });
    });

    var url = window.location.href;
    setInterval(() => {
        var url2 = window.location.href;
        if(url !== url2){
            url = url2;
            video();
            svgCon();
            //initialize counterUp js
            $('.count_up').counterUp();
            //initialize video bg
            $("#bgndVideo").YTPlayer();

            $(window).scrollTop(0);
            //initialize filterizr
            $('.filter-sort ul li').on("click", function () {
                $('.filter-sort ul li').removeClass('active');
                $(this).addClass('active');
            });
            $('.filter-sort2 ul li').on("click", function () {
                $('.filter-sort2 ul li').removeClass('active');
                $(this).addClass('active');
            });

            $('.countdown').countdown('2019/11/25', function (event) {
                var $this = $(this).html(event.strftime(''
                    + '<li><span>%D</span> <span>Days</span></li>  '
                    + '<li><span>%H</span> <span>Hours</span></li>  '
                    + '<li><span>%M</span> <span>Minutes</span></li>  '
                    + '<li><span>%S</span> <span>Seconds</span></li> '));
            });

        }
        /* END OF ON LOAD FUNCTION */
    }, 100)
    $('.navbar-nav a').on('click', function(){
        $('.btn-navbar').click(); //bootstrap 2.x
        $('.navbar-toggle').click(); //bootstrap 3.x by Richard
        $('.navbar-toggler').click(); //bootstrap 4.x
    });


})(jQuery);


