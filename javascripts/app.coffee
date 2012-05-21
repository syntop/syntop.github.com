exports = window

$ ->
    w = 386
    h = 386
    exports.paper = Raphael('paper', w, h)
    # circle = paper.circle('50%', '50%', '49.9%')
    #     .attr
    #         stroke: '#FFF'
    # font = paper.getFont('Lato', 300)
    # text = paper.text(paper.width/2, paper.height/2, 'SYNTOP')
    #     .attr
    #         fill: '#FFF'
    #         font: '72px Quicksand'
    #         'font-weight': 300
    
    # "M#{w/2},0L#{w},#{h/2}L#{w/2},#{h}L0,#{h/2}Z"
    path = paper.path("
        M#{w/2},0
        Q0,0,0,#{h/2}
        Q0,#{h},#{w/2},#{h}
        Q#{w},#{h},#{w},#{h/2}
        Q#{w},0,#{w/2},0
        
    ")
        .attr
            'stroke': '#FFF'
            'stroke-width': 1