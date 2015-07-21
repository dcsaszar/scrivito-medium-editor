//= require medium-editor
//= require_self

;(function() {

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) {
    return;
  }

  $(content).find('[data-editor=medium]').each(function() {
    var contenteditable = $(this);

    var config = contenteditable.data('medium-editor');
    new MediumEditor(contenteditable, config);

    contenteditable.on('input', function() {
      contenteditable.scrivito('save', $(this).html());
    });
  });
});

}());
