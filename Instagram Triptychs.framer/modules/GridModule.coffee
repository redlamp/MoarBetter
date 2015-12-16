class module.exports extends Layer
	constructor: (opt={}) ->
		initW = opt.width
		initH = opt.height
		super(opt)
		@name = "GridModule"
		@ref = this
		@clip = false
		@backgroundColor = opt.backgroundColor
	
		@data = opt.data ?= []
		@row = opt.row ?= 3
		@col =  opt.row ?= undefined
		@cellW = opt.cellW ?= @data[0].width ?= 100
		@cellH = opt.cellH ?= @cellW
		@margin = opt.margin ?= 0
		@marginX = opt.marginX ?= @margin
		@marginY = opt.marginY ?= @marginX
			
		@width = initW ?= (@cellW + @marginX) * @row - @marginX
		@height = initH ?= @cellH
		
		@content = new Layer
			name: "content"
			clip: false			
			backgroundColor: null
			width: @width
			height: @height
			superLayer: this
		
		@content.on "change:height", ->
			if @superLayer.height < @height
				@superLayer.height = @height
		
		@drawBehavior = opt.drawBehavior ?= @defaultDrawBehavior
		
#		@destroyRemaining	= opt.destoryRemaining ? opt.destroyRemaining : true

		@draw()
	
	add: (cell) ->
		return @insert([cell], @data.length)
	
	insert: (cells, position = 0) ->
		@data[position...position] = cells
		@draw()
		return cells
	
	remove: (position, length = 1) ->
		cells = @data[position..position+length]
		@data[position..position+length] = []
		for c in cells
			if c.superLayer == @content
				c.superLayer = null
		@draw()
		return cells
	
	defaultDrawBehavior: (c, x, y, i) ->
		print "DrawBehavior("+arguments.toString()+")"
		c.superLayer = @content
		c.x = x
		c.y = y
		
#	draw: Utils.throttle 0.1, _draw, {testScope: this}
#	_draw: ->
	draw: ->
#		print "GridModule.draw()"
#		print "ref:  "+@ref
#		print "this: "+this
		for c, i in @data
			cX = (i % @row) * (@cellW + @marginX)
			cY = Math.floor(i / @row) * (@cellH + @marginY)
			@drawBehavior(c, cX, cY, i)
		@updateContentSize()
		
#	updateContentSize = Utils.throttle .1, _updateContentSize
#	_updateContentSize: ->
	updateContentSize: ->
#		print "GridModule.updateContentSize()"
		@content.height = @content.contentFrame().height