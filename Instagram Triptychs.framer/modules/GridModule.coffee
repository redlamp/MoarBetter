class module.exports extends Layer
	constructor: (opt={}) ->
		super(opt)
		@name = "GridModule"
		@clip = false
		print opt.backgroundColor
		@backgroundColor = opt.backgroundColor ?= "yellow"
				
		@content = new Layer
			superLayer: this
			name: "content"
			clip: false
			backgroundColor = "cyan"
		
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
		
		@drawBehavior = opt.drawBehavior ?= @defaultDrawBehavior
		
#		@destroyRemaining	= opt.destoryRemaining ? opt.destroyRemaining : true

		@draw()
	
	add: (cell) ->
		@data.push(cell)
		@draw()
	
	insert: (cell, position) ->
		@data[position...position] = cell
		@draw()
		
	draw: ->
		for c, i in @data
			cX = (i % @row) * (@cellW + @marginX)
			cY = Math.floor(i / @row) * (@cellH + @marginY)
			@drawBehavior(c, cX, cY)
		
			
	defaultDrawBehavior: (c, x, y) ->
		c.superLayer = this
		c.x = x
		c.y = y
			
	throttledDraw: Utils.throttle 0.1, @draw, {scorp: this}