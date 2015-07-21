scrivito.on 'content', (content) ->
  return if !scrivito.in_editable_view()

  $(content).find('[data-editor=medium]').each ->
    contenteditable = $(this)

    config = contenteditable.data('medium-editor')
    new MediumEditor(contenteditable, config)

    contenteditable.on 'input', ->
      contenteditable.scrivito('save', $(this).html())
