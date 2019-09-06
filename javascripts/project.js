$( document ).ready(function() {

    var grid = $('#images').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        transitionDuration: 0,
        percentPosition: true
    });

    let preloadstartimage = new Image();
    preloadstartimage.onload = function() {
        $('#startimage').css('background-image', 'url(' + this.src + ')');
        $('#startimage').addClass('show');
    }
    preloadstartimage.src = $('#startimage').data("image");

    $('iframe').on('load', function() {
        $('iframe').addClass('show');
    });

    var videos = $("video");
    var i = setInterval(
        function() {
            var numLoaded = 0;
            videos.each(function(i, v) {
                if (v.readyState == 4) {
                    numLoaded++;
                }
            });
            console.log("Loaded: "+numLoaded+" / "+videos.length);
            if (numLoaded == videos.length) {
                grid.imagesLoaded().progress( function() {
                    grid.masonry('layout');
                    $('#images').removeClass('hide').addClass('show');
                });
                clearInterval(i);
            }
            console.log("Videos ready");
        }, 200
    );
});
