var Skeletor;

Skeletor = (function($) {
  var bindEvents, catchDom, dom, fnEvents, init, st, stForm, startAction;
  st = {
    'formRegister': '#register'
  };
  dom = {};
  stForm = {
    'rules': {
      'name': {
        'required': true
      },
      'email': {
        'required': true,
        'email': true
      },
      'message': {
        'required': true
      }
    },
    'messages': {
      'name': {
        'required': 'Campo obligatorio'
      },
      'email': {
        'required': 'Campo obligatorio',
        'email': 'Formato Incorrecto'
      },
      'message': {
        'required': 'Campo obligatorio'
      }
    }
  };
  catchDom = function() {
    dom.formRegister = $(st.formRegister);
  };
  bindEvents = function() {
    dom.formRegister.validate(stForm);
  };
  fnEvents = startAction = function() {
    console.log('show the code');
  };
  init = function() {
    catchDom();
    bindEvents();
  };
  return {
    init: init
  };
})(jQuery);

$(function() {
  return Skeletor.init();
});
