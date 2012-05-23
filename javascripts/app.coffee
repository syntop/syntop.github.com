exports = window

Array::shuffle = -> @sort -> 0.5 - Math.random()

$ ->
    $slideshow = $('#slideshow')
    $.getJSON "projects.json", (_projects) ->
        projects = _projects.shuffle()
        $slideshow.addClass "size-#{projects.length}"
        for i in [0..projects.length-1]
            project = projects[i]
            $project = $("<li></li>")
            $image = $("<span></span>").css('background-image', "url(images/#{project.image})")
            $title = $("<h2>#{project.title}</h2>")
            $image.appendTo($project)
            $title.appendTo($project)
            $project.appendTo($slideshow)
            