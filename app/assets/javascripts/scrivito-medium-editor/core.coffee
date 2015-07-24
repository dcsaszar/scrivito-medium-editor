scrivito.editors.html_editor ?= {}
scrivito.editors.html_editor.medium = options: {}

_clone = (obj) ->
  return obj if not obj? or typeof obj isnt 'object'
  new_instance = new obj.constructor()
  new_instance[key] = _clone obj[key] for key of obj
  new_instance

scrivito.on 'content', (content) ->
  return if !scrivito.in_editable_view()

  $(content).find('[data-editor=medium]').each ->
    contenteditable = $(this)

    options = contenteditable.data('medium-editor')
    global_options = scrivito.editors.html_editor.medium.options
    config = $.extend {}, global_options, options
    config.extensions = _clone config.extensions

    new MediumEditor(contenteditable, config)

    contenteditable.on 'input', ->
      contenteditable.scrivito('save', $(this).html())
