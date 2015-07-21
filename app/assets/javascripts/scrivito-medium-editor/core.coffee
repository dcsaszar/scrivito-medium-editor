scrivito.editors.html_editor ?= {}
scrivito.editors.html_editor.medium = options: {}

scrivito.on 'content', (content) ->
  return if !scrivito.in_editable_view()

  $(content).find('[data-editor=medium]').each ->
    contenteditable = $(this)

    options = contenteditable.data('medium-editor')
    config = $.extend {}, scrivito.editors.html_editor.medium.options, options

    new MediumEditor(contenteditable, config)

    contenteditable.on 'input', ->
      contenteditable.scrivito('save', $(this).html())
