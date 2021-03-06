// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });


    $('li:has(ul)').addClass('hasSub');

    $('nav li.hasSub>a').click(function(e){
      e.preventDefault();
    });

    $('.hasSub a').click(function(){
        $(this).parent().toggleClass('active');
        $(this).siblings('.sub').slideToggle();
    });



    /*---------------------------
                                  MixItUp
    ---------------------------*/
    if ( $('#Container').length > 0 ) {
        $('#Container').mixItUp({
            animation: {
                duration: 400,
                effects: 'fade translateZ(-360px) stagger(34ms)',
                easing: 'ease'
            }
        });
    }
    


    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    $('.about__info__slider').slick({
        dots: true,
        fade: true,
        arrows: false
    });

    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });


    /*----------------------------
                              ACCORDEON
    -------------------------*/
    if ( $('.accordeon').length > 0) {
        $('.accordeon').accordion({
            heightStyle: "content",
            collapsible: true
        });    
    }


    /*---------------------------
                                  Reviews slider
    ---------------------------*/
    if ( $('.reviews-slider').length > 0) {}
    $('.reviews-slider').slick({
        dots: true,
        fade: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 750,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
        ]
    });



    /*---------------------------
                                  Sidebar menu
    ---------------------------*/
    $('.sidebar__menu .menu-item-has-children').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).find('.sub-menu').slideToggle();
    });



    /*---------------------------
                                  Custom file load
    ---------------------------*/
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.user-image').css('background-image', 'url('+e.target.result+')' );
            }

            reader.readAsDataURL(input.files[0]);
        }
    }



    $('#file-load').on('change', function(event) {
        event.preventDefault();

        var ext = $(this).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['png','jpg','jpeg']) == -1) {
            alert('Загрузить изображение можно в форматах .png, .jpg, .jpeg');
            $(this).val('');
        }

        /*showing image*/
        readURL(this);

        var filename = $(this).val().split('/').pop().split('\\').pop();

        $('.file-info__name').text(filename);
    });

}); // end file