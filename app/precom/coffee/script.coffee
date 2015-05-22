Skeletor = (($)->
	st =
		'formRegister' : '#register'
	dom = {}
	stForm =
		'rules' :
			'name' :
				'required' 	:	true
			'email' :
				'required' 	:	true
				'email' 	:	true
			'message' :
				'required' 	:	true
		'messages' :
			'name' :
				'required' 	: 	'Campo obligatorio'
			'email' :
				'required' 	: 	'Campo obligatorio'
				'email'		:	'Formato Incorrecto'
			'message' :
				'required' : 	'Campo obligatorio'
	catchDom = ->
		dom.formRegister = $(st.formRegister)
		return
	bindEvents = ->
		dom.formRegister.validate(stForm)
		return
	fnEvents =
		startAction : ->
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