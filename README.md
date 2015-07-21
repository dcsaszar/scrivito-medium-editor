# scrivito-medium-editor

[![Gem Version](https://badge.fury.io/rb/scrivito-medium-editor.svg)](http://badge.fury.io/rb/scrivito-medium-editor)

This gem integrates the WYSIWYG JavaScript editor [MediumEditor](https://github.com/daviferreira/medium-editor) in [Scrivito UI](https://scrivito.com).

![scrivito-medium-editor](https://raw.github.com/kostia/scrivito-medium-editor/master/scrivito-medium-editor.png)

## Installation

Add to `Gemfile`:
```ruby
gem 'scrivito-medium-editor', require: 'scrivito_medium_editor'
```

Add to `app/assets/javascripts/application.js` _after_ `scrivito`:
```javascript
//= require scrivito-medium-editor
```

Add to `app/assets/stylesheets/application.css` _after_ `scrivito`:
```css
/*
 *= require scrivito-medium-editor
 */
```

## Usage

Set the MediumEditor as the [in-place editor](https://scrivito.com/scrivito/editors) when using `scrivito_tag`:
```erb
<%= scrivito_tag :div, @obj, :body, data: {editor: :medium} %>
```

You can also override the [configuration](https://github.com/yabwe/medium-editor#mediumeditor-options) of the MediumEditor:
```erb
<%= scrivito_tag :div, @obj, :body, data: {editor: :medium,
  medium_editor: {toolbar: {buttons: %w[bold italic underline]}}} %>
```

You can set global options using JavaScript:
```js
scrivito.editors.html_editor.medium.options = {
  toolbar: {
    buttons: ["bold", "italic", "underline"]
  }
};
```

## Contributing

1. Fork it ( https://github.com/kostia/scrivito-medium-editor/merge_tags/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
