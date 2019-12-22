function playVideo() {
    console.log("play video");
}

$( document ).ready(function() {
    var slideshow = undefined;

    $('.scroll-btn').on('click', function() {
        var target = $($(this).data('target'));
        $("html, body").animate({ scrollTop: target.offset().top });
    });

    $('.opencontact').on('click', function(el) {
        var target = el.target.parentElement;
        if ($(target).hasClass('show')) {
            $(target).removeClass('show');
            $(target).addClass('hide');
            $('.closecontact').removeClass('hide');
            $('.closecontact').addClass('show');
            $('.contact').removeClass('close');
        }
    });
    $('.contactcontainer .button.close').on('click', function(el) {
        var target = el.target.parentElement;
        if ($(target).hasClass('show')) {
            $(target).removeClass('show');
            $(target).addClass('hide');
            $('.contactcontainer .button.open').removeClass('hide');
            $('.contactcontainer .button.open').addClass('show');
            $('.contact').addClass('close');
        }
    });

    var oldsectionid = 0;
    var sectionid = 0;

    // var blurimage =  new Image();
    // blurimage.onload = function() {
    //     // //$('#background').css('background-image', 'url(' + this.src + ')');
    //     // $('.thumb').each(function (index, element) {
    //     //     //var thumb = $(element).data("image");
    //     //     //$(element).css('background-image', 'url(' + thumb + ')');
    //     // });
    // };

    $('.thumb').each(function (index, element) {
        var thumb = $(element).data("image");
        $(element).css('background-image', 'url(' + thumb + ')');
    });

    $(window).unload(function() {
        slideshow.clear();
    });

    // little timeout to make sure, that all positions are properly available
    setTimeout(
        function() {
            slideshow = new Slideshow(sectionid);
            var sections = $('.content');
            var y = $(sections[sections.length-1]).offset().top - $(document).scrollTop();
            console.log(y+" "+$( window ).height()/2);
            if (y < $( window ).height()/2) {
                slideshow.hide();
            } else {
                slideshow.show();
            }
            $(document).scroll(
                function() {checkSectionPos();}
            );
        }, 100
    );

    function checkSectionPos() {
        var sectionName;
        var hideslideshow = false;
        $('.content').each(function(index) {
            var y = $(this).offset().top - $(document).scrollTop();
            if (y < $( window ).height()/2) {
                sectionid = index;
                sectionName = $(this).data('section-name');
                hideslideshow = $(this).data('hide-slideshow');
            }
        });
        if (oldsectionid != sectionid) {
            oldsectionid = sectionid;
            if (slideshow != undefined) {
                slideshow.setNextType(sectionName);
                if (hideslideshow) {
                    slideshow.hide();
                } else {
                    slideshow.show();
                }
            }

            if (sectionid !== 0) {
                $('#backtotop').addClass("show");
            } else {
                $('#backtotop').removeClass("show");
            }
        }

        if ($(document).scrollTop() > 20) {
            if ($('.scroll-btn').hasClass('show')) {
                $('.scroll-btn').removeClass('show').addClass('hide');
            }
        } else {
            if ($('.scroll-btn').hasClass('hide')) {
                $('.scroll-btn').removeClass('hide').addClass('show');
            }
        }

        if (!$('.contact').hasClass('close')) {
            $('.contact').addClass('close');
            $('.contactcontainer .button.open').removeClass('hide');
            $('.contactcontainer .button.open').addClass('show');
            $('.closecontact').removeClass('show');
            $('.closecontact').addClass('hide');
        }
    }

    function nextSlideSection() {
        var startIndex = -1;
        $('.slide').each(function(index) {
            var id = parseInt($(this).attr('data-type').split("_")[1]);
            if (id == sectionid) {
                if (startIndex == -1) {
                    startIndex = index;
                    $('#slideshow').slick('slickGoTo', startIndex);
                }
                stopIndex = index;
            }
        });
    }

});
