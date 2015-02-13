//= require medium-editor
//= require_self

;(function() {

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) { return; }

  $(content).find('[data-editor=medium]').each(function() {
    var contenteditable = $(this);

    var config = {};
    if (contenteditable.attr('data-medium-editor')) {
      config = JSON.parse(contenteditable.attr('data-medium-editor'));
    }

    var InsertLink = function() {
      this.button = document.createElement('button');
      this.button.className = 'medium-editor-action';
      this.button.innerHTML = '<i class="scrivito_customer_icon sci_collection"></i>';
      this.button.onclick = this.onClick.bind(this);
    };

    InsertLink.prototype.getButton = function() { return this.button; };

    InsertLink.prototype.onClick = function() {
      var user_selection = window.getSelection();
      var link, obj_id;
      if (user_selection.baseNode.nodeType === 3) {
        var parent = $(user_selection.baseNode).parent();
        if (parent.get(0).tagName === 'A') {
          var link = parent;
          var href = link.attr('href');
          var match = href.match(/\/([a-f0-9]{16})/);
          if (match) {
            obj_id = match[1];
          }
        }
      }

      scrivito.content_browser.open({
        selection: obj_id,
        selection_mode: 'single'
      }).done(function(selection) {
        var range = user_selection.getRangeAt(0).cloneRange();
        if (selection.length) {
          var href = '/'+selection[0];
          if (link) {
            link.attr('href', href);
          } else {
            link = document.createElement('a');
            link.setAttribute('href', href);
            range.surroundContents(link);
            user_selection.removeAllRanges();
            user_selection.addRange(range);
          }
          contenteditable.scrivito('save', contenteditable.html());
        }
      });
    };

    config = $.extend({
      disablePlaceholders: true,
      imageDragging: false,
      anchorInputPlaceholder: '',
      buttons: [
        'bold',
        'italic',
        'underline',
        'header1',
        'header2',
        'unorderedlist',
        'orderedlist',
        'anchor',
        'insert_link'
      ],
      buttonLabels: {anchor: '<i class="scrivito_customer_icon sci_link"></i>'},
      extensions: {insert_link: new InsertLink()}
    }, config);

    new MediumEditor(contenteditable, config);

    contenteditable.on('input', function() {
      contenteditable.scrivito('save', $(this).html());
    });
  });
});

}());
