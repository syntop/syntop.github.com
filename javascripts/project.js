$(document).ready(function () {

    if ($('#images')) {
        var grid = $('#images').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            transitionDuration: 0,
            percentPosition: true
        });
    }
    let preloadstartimage = new Image();
    preloadstartimage.onload = function () {
        $('#startimage').css('background-image', 'url(' + this.src + ')');
        $('#startimage').addClass('show');
    }
    preloadstartimage.src = $('#startimage').data("image");

    $('iframe').on('load', function () {
        $('iframe').addClass('show');
    });


    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    var videoElements = $("video");
    // videoElements.each(function (i, v) {
    //     if (!isIOS) {
    //         v.onloadeddata = function (ref) {
    //             v.play()
    //                 .then()
    //                 .catch(
    //                     function () {
    //                         v.controls = true;
    //                     }
    //                 );
    //         }
    //     } else {
    //         //v.controls = true;
    //         v.play();
    //     }
    // });

    // if (!isIOS) {
    var i = setInterval(
        function () {
            var numLoaded = 0;
            videoElements.each(function (i, v) {
                if (v.readyState == 4) {
                    numLoaded++;
                }
            });
            // console.log("Loaded: "+numLoaded+" / "+videoElements.length);
            if (grid != undefined) {
                grid.imagesLoaded().progress(function () {
                    grid.masonry('layout');
                    $('#images').removeClass('hide').addClass('show');
                });
                clearInterval(i);
            }
            // console.log("Videos ready");
        }, 200
    );
    // } else {
    //     grid.imagesLoaded().progress( function() {
    //        grid.masonry('layout');
    //        $('#images').removeClass('hide').addClass('show');
    //     });
    // }

    var largeImageOverlay = $("#largeimageoverlay");
    var largeImageOverlayImg = $("#largeimageoverlayimage");
    var inlineimages = $("img");
    inlineimages.each(function (i, v) {
        $(v).on('click', function () {
            showLargeImageOverlay(v.src);
        });
    });
    $(largeImageOverlay).on('click', function () {
        hideLargeImageOverlay();
    });

    function showLargeImageOverlay(src) {
        if (!largeImageOverlay.hasClass("show")) {
            console.log("show");
            largeImageOverlayImg.children('img').attr('src', src);
            largeImageOverlay.toggleClass("show");
        }
    }

    function hideLargeImageOverlay() {
        if (largeImageOverlay.hasClass("show")) {
            console.log("hide");
            largeImageOverlay.toggleClass("show");
        }
    }

    // videoElements.each(function (i, v) {
    //     $(v).on('click', function () {
    //         if (v.requestFullscreen) {
    //             v.requestFullscreen();
    //         }
    //     });
    // });

});