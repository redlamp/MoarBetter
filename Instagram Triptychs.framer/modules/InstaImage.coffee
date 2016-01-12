imageCount = 0

imageValueStyle = new Layer

imageValueStyle =
	"font-family": "SFUIDisplay-Light"
	"font-size": "48px"
	"text-align": "right"
	"color": "#ffffff"
	"line-height": "58px"
	"text-shadow": "1px 2px 0px rgba(0,0,0,0.50)"
#	"background-color": "salmon"

imageLabelStyle = 
	"font-family": "SFUIDisplay-Black"
	"font-size": "18px"
	"color": "#FFFFFF"
	"line-height": "21px"
	"text-shadow": "1px 2px 0px rgba(0,0,0,0.50)"

class module.exports extends Layer	
	constructor: (opt={}) ->
		initW = opt.width
		initH = opt.height
		super(opt)
		
		@configDisplay()
		
		@setImage(opt.imageID ?= imageCount++)
		@setPosition(opt.pos ?= -1)
		@setGroup(opt.groupID ? -1)
		
		@name = opt.name ?= "InstaImage_"+@imageID
	
		@width = initW ?= 248
		@height = initH ?= @width
		@clip = opt.clip ?= false
		@backgroundColor = opt.backgroundColor
	
	setImage: (val) ->
		@imageID = val ?= @imageID
		@imageVal.html = @imageID# + 1
		@imageVal.style = imageValueStyle
		
	setPosition: (val) ->
		@pos = val ?= @pos
		@positionVal.html = @pos + 1
		@positionVal.style = imageValueStyle
		
	setGroup: (val) ->
		@groupID = val ?= @groupID ?= -1
		if @groupID >= 0
			@groupVal.html = @groupID + 1
			@groupVal.style = imageValueStyle
			@groupLabel.html = "GROUP"
			@groupVal.opacity = @groupLabel.opacity = 1
			@bg.backgroundColor = "#D0021B"
			@bg.hueRotate = @groupID * 63
		else
			@groupVal.html = ""
			@groupLabel.html = "NO GROUP"
			@groupVal.opacity = @groupLabel.opacity = .5
			@bg.backgroundColor = "#D8D8D8"
	
	configDisplay: ->
		@bg = new Layer
			superLayer: this
			width: 248
			height: 248
			backgroundColor: "#bbbbbb"

		@imageLabel = new Layer
			name: "imageLabel"
			superLayer: this
			x: 128
			y: 59
			html: "IMAGE"
			style: imageLabelStyle
		
		@imageVal = new Layer
			name: "imageVal"
			superLayer: this
			x: 32
			y: 29
			width: 86
			html: ""
			style: imageValueStyle
		
		@positionLabel = new Layer
			name: "imageLabel"
			superLayer: this
			x: 128
			y: 117
			html: "POSITION"
			style: imageLabelStyle
			
		@positionVal = new Layer
			name: "positionVal"
			superLayer: this
			x: 32
			y: 88
			width: 85
			html: ""
			style: imageValueStyle
		
		@groupLabel = new Layer
			name: "groupLabel"
			superLayer: this
			x: 128
			y: 175
			html: "GROUP"
			style: imageLabelStyle
		
		@groupVal = new Layer
			name: "groupVal"
			superLayer: this
			x: 32
			y: 146
			width: 86
			html: ""
			style: imageValueStyle
		
		@states.animationOptions =
			curve: "spring(500, 25, 0)"
		
		@states.add
			default:
				scale: 1
				opacity: 1
			selected:
				scale: 1
			deselected:
				scale: .9
			unselected:
				grayscale: 100