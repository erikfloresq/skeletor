Skeletor = (($)->
	st =
		'item' : '.item'
	dom = {}
	catchDom = ->
		dom.item = $(st.item)
		console.log 'show the code please :OOO'
		return
	bindEvents = ->
		dom.item.on('click',fnEvents.startAction)
	fnEvents =
		startAction = ->
			console.log 'show the code'
			return
	init = ->
		catchDom()
		bindEvents()
		return
	init : init
)(jQuery)

$(->
	Skeletor.init()
)