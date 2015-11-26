class module.exports extends Layer
	constructor: (opt={}) ->
		super(opt)
		@name = "GridModule"
		@clip = false
		@backgroundColor = opt.backgroundColor ?= null
		print "opt.backgroundColor: "+opt.backgroundColor
		
		@content = new Layer
			superLayer: this
			name: "content"
			@backgroundColor = null
			clip: false
			
		
		@content.on "change:subLayers", @updateSize
			# TODO: adjust Grid and content size when assets are added
		
		@data = opt.data ?= []
		@row = opt.row ?= 3
		@col =  opt.row ?= undefined
		@cellW = opt.cellW ?= @data[0].width ?= 100
		@cellH = opt.cellH ?= @cellW
		@margin = opt.margin ?= 0
		@marginX = opt.marginX ?= @margin
		@marginY = opt.marginY ?= @marginX
			
		@width ?= opt.width
		@height ?= opt.height
		
		print "w: " + @width + "\th: " + @height
#		@destroyRemaining	= opt.destoryRemaining ? opt.destroyRemaining : true

		@draw()
	
	add: (cell) ->
#		print "add:  " + cell
		@data.push(cell)
		@draw()
	
	insert: (cell, position) ->
		@data[position...position] = cell
		@draw()
	
	draw: ->
		print "draw"
		for cell, i in @data
			cell.superLayer = @content
			cell.x = (i % @row) * (@cellW + @marginX)
			cell.y = Math.floor(i / @row) * (@cellH + @marginY)
#			print "cell: "+i
#			print "\tx: ("+i+"%"+@row+")*("+@cellW+"+"+@marginX+")\tx: "+cell.x
#			print "\ty: ("+i+"/"+@row+")*("+@cellH+"+"+@marginY+")\ty: "+cell.y
			
	throttledDraw: Utils.throttle 0.1, @draw, {scorp: this}
	
	updateSize: ->
		print "updateSize"
		@width = @contentFrame().width
		@height = @contentFrame().height