# Import file "Instagram Triptychs"
sketch = Framer.Importer.load("imported/Instagram Triptychs@1x")

Framer.Device.deviceType = "iphone-6-spacegray"
Framer.Defaults.Layer.backgroundColor = null
bg = new BackgroundLayer
	backgroundColor: "white"

{Pointer} = require "Pointer"
GridModule = require "GridModule"
InstaImage = require "InstaImage"

imageCount = 0
groups = []
groupCount = 0
activeGroup = 0

selectedStart = null
selectedEnd = null
selectedEndSnap = null
selectedMin = null
selectedMax = null
selectedLength = null

touchHold = 0
touchCount = 0

##########
# SCROLL #
##########
Page = ScrollComponent.wrap(sketch.Page)
Page.scrollHorizontal = false
Page.height = Screen.height - sketch.TopNav.height - sketch.BotNav.height
Page.on Events.Move, ->
	b.ignoreEvents = true for b in Adds
Page.on Events.ScrollAnimationDidEnd, ->
	b.ignoreEvents = false for b in Adds

########
# PAGE #
########
Profile = sketch.Profile
Grid = new GridModule
	row: 3
	cellW: 248
	margin: 3
	width: Screen.width
	drawBehavior: (c,x,y,i) ->
		c.superLayer = @content
		c.setPosition(i)
		c.animate
			properties:
				x: x
				y: y
			time: .25
Grid.superLayer = Page.content
Grid.y = Profile.height

# TODO: REMOVE
Profile.visible = false
Grid.y = 0
Page.content.draggable = false

########
# GRID #
########
Grid.organizedData = []
# Custom Draw
Grid.draw = ->
# 	@organizedData = @data
	@handledGroups = []
	
	for cell in @data
		cell.used = 0
	
	for cell, index in @data
		gID = cell.groupID
		if gID > -1 and not @handledGroups[gID]
			gRow = Math.floor(index / @row)
			gCol = index % @row
			gSpan = groups[gID].length
			for gItem in @data[index...index+gSpan]
				gItem.used++
			@handledGroups[gID] = true
			# group is unaligned
			if Math.ceil((gCol + gSpan) / @row) > Math.ceil(gSpan / @row)

				# look left
				shuffle = []
				shuffleRequired = if gSpan > 2 then gCol else 1
				shuffle.push(i) for c, i in @data[0...index] by -1 when shuffle.length < shuffleRequired and c.used == 0
				if shuffle.length == shuffleRequired
# 					print "LEFT"
					shuffler(@data, shuffle)
					insert = index+gSpan-shuffle.length
					@data[insert...insert] = shuffle
				else 
# 					print "RIGHT"
					shuffle = []
					shuffleRequired = @row - gCol
					shuffleRight = (c, i) ->
						shuffle.push(index+gSpan+i)
						c.used++
					shuffleRight(c, i) for c, i in @data[index+gSpan..] when shuffle.length < shuffleRequired
					shuffler(@data, shuffle)
					@data[index...index] = shuffle
# 				print "group: "+gID+" index: "+index+" gRow: "+gRow+" gCol: "+gCol+" gSpan: "+gSpan+" shuffleRequired: "+ shuffleRequired
			
	for c, i in @data
		cX = (i % @row) * (@cellW + @marginX)
		cY = Math.floor(i / @row) * (@cellH + @marginY)
		@drawBehavior(c, cX, cY, i)
# 		c.groupLabel.html = if c.used>0 then "USED" else "not used"

	@updateContentSize()

shuffler = (source, shuffle) -> 
	for shuffleItem, shuffleIndex in shuffle
		shuffle[shuffleIndex] = source[shuffleItem]
		source[shuffleItem..shuffleItem] = []
# 		print "shuffle: "+(i.name for i in shuffle)

Grid.content.on "change:height", ->
	Page.updateContent()

GridMoveTracking = new Layer
	name: "GridMoveTracking"
	superLayer: Grid
	width: Grid.width
	height: Grid.height
	visible:  false
	
# focus = sketch.GroupFocus
# focus.superLayer = Grid
# focus.visible = false

##########
# IMAGES #
##########
addImages = (count, group) ->
	if group
		groups[group] = []
	[0...count].forEach ->
		img = new InstaImage
			imageID: imageCount++
			groupID: group
		if group
			groups[group].push(img)
		img.on Events.AnimationEnd, ->
			Grid.updateContentSize()
		img.on Events.TouchStart, (event, layer) ->
			touchHold = 1
			Utils.delay 1, =>
				if touchHold == 1
					groupStart(null, img)
		Grid.insert(img, 0)
	Grid.draw()

addImages(17)

groupStart = (event, layer) ->
# 	print "groupStart("+[event, layer.name]+")"
	Page.content.draggable = false
		
	selectedStart = layer.pos
	
	activeGroup = if layer.groupID >= 0 then layer.groupID else groupCount++
	layer.groupID = activeGroup

	GridMoveTracking.visible = true
	GridMoveTracking.width = Grid.width
	GridMoveTracking.height = Grid.height
	GridMoveTracking.on Events.TouchMove, resizeMove
	GridMoveTracking.once Events.TouchEnd, groupEnd
	
# 	focus.x = @x
# 	focus.y = @y
# 	focus.visible = true
	
resizeMove = (event, layer) ->
# 	print "resizeMove("+[event, layer.name]+")"
	p = Pointer.offset(event, this)
	x = p.x
	y = p.y
	
	groups[activeGroup] = []

	for i in Grid.content.subLayers
		if (x > i.minX && x < i.maxX && y > i.minY && y < i.maxY)
			snapSelected(i.pos)
			
		if(i.pos >= selectedMin && i.pos <= selectedMax && (i.groupID < 0 || i.groupID == activeGroup))
			i.states.switch("selected")
			i.setGroup(activeGroup)
			groups[activeGroup].push(i)
		else
			i.states.switch("deselected")
			if i.groupID == activeGroup
				i.setGroup(-1)

snapSizes = [1,2,3,6,9,12,15]
snapSelected = (end, snap = 0)->
	selectedEnd = end
	selectedMin = Math.min(selectedStart, selectedEnd)
	selectedMax = Math.max(selectedStart, selectedEnd)
	selectedLength = selectedMax - selectedMin + 1

# 	len = selectedLength+1	
# 	for size, i in snapSizes
# 		if (len == snapSizes[i])
# 			break
# 		if (len > snapSizes[i] && len < snapSizes[i+1])
# 			print "updated snap "+end+" to "+(end + (snapSizes[i+1] - snapSizes[snap]))
# 			end += (snapSizes[i+1] - snapSizes[snap])
# 			snapSelected(end)
# 			break

groupEnd = (event, layer) ->
# 	print "groupEnd("+[event, layer.name]+")"
	Page.content.draggable = true
	GridMoveTracking.visible = false
	GridMoveTracking.off Events.TouchMove, resizeMove

	for i in Grid.content.subLayers
		i.states.switch("default")
		
	if selectedLength < 2
		img = Grid.data[selectedStart]
		# If new group ends up not being used, remove it from the tally
		if img.groupID == activeGroup && groupCount == activeGroup + 1
			groupCount--
			activeGroup--
		img.setGroup(-1)
		
	Grid.draw()

#########
# FOCUS #
#########
# focusCancel = focus.subLayersByName("Cancel")[0]
# focusAccept = focus.subLayersByName("Accept")[0]
# focusResize = focus.subLayersByName("Resize")[0]
# focusSpan = new Layer
# 	superLayer: focus
# 	width: focus.width
# 	height: focus.height
# 	borderWidth: 8
# 	borderColor: "#4A90E2"
# 
# focusCancel.on Events.TouchStart, ->
# 	print "Group Cancel Changes"
# 	focus.visible = false
# 
# focusAccept.on Events.TouchStart, ->
# 	print "Group Accept Changes"
# 	focus.visible = false
# 
# focusResize.on Events.TouchStart, groupStart
#
# 	focus.x = first.x
# 	focus.y = first.y
# 	
# 	focusSpan.width = last.x + last.width - first.x
# 	focusSpan.height = last.y + last.height - first.y
# 
# 	focusAccept.x = focusResize.x = last.x + Grid.cellW - focusResize.width
# 	focusResize.y = last.y + Grid.cellH - focusResize.height
	
###########
# BUTTONS #
###########
Add1 = sketch.Add1
Add1.on Events.Click, (event, layer) ->
	addImages(1)

Add2 = sketch.Add2
Add2Back = sketch.Add2Back
Add2.on Events.Click, (event, layer) ->
	addImages(2, groupCount++)

Add3 = sketch.Add3
Add3Mid = sketch.Add3Mid
Add3Back = sketch.Add3Back
Add3.on Events.Click, (event, layer) ->
	addImages(3, groupCount++)

Adds = [Add1, Add2, Add3]

##########
# LAYOUT #
##########
Add1.x = Add2.x = Add3.x = 339
Add1.y = Add2.y = Add3.y =1260
Add1.opacity = Add2.opacity = Add3.opacity = 0
Add2Back.x = Add3Mid.x = Add3Back.x = 0

Add2.on Events.AnimationEnd, (ani, layer) ->
	time = .5
	delay = 0
	@animate(properties: {x: 329}, time: time, delay: delay)
	Add2Back.animate(properties: {x: 20}, time: time, delay: delay)
	Add2.on Events.AnimationEnd, null
	
Add3.on Events.AnimationEnd, (ani, layer) ->
	time = .5
	delay = .1
	@animate(properties: {x: 410}, time: time, delay: delay)
	Add3Mid.animate(properties: {x: 20}, time: time, delay: delay)
	Add3Back.animate(properties: {x: 40}, time: time, delay: delay)

Add1.animate(properties: {x: 256, y: 1240, opacity: 1}, time: .5, delay: .0);
Add2.animate(properties: {x: 339, y: 1200, opacity: 1}, time: .5, delay: .1);
Add3.animate(properties: {x: 420, y: 1240, opacity: 1}, time: .5, delay: .2);

#############
# FUNCTIONS #
#############
swapSpans = (array, aStart = 0 , aSpan = 0 , bStart = 0, bSpan = 0) ->
	arrA = array[aStart...aStart+aSpan]
	arrB = array[bStart...bStart+bSpan]
	if aStart < bStart
		if aStart + aSpan > bStart
			print "* Span A collides with Span B *"
			return
		array[bStart...bStart+bSpan] = arrA
		array[aStart...aStart+aSpan] = arrB
	else
		if bStart + bSpan > aStart
			print "* Span B collides with Span A *"
			return
		array[aStart...aStart+aSpan] = arrB
		array[bStart...bStart+bSpan] = arrA

