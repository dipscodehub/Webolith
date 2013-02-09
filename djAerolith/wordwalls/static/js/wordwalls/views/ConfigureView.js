WW.Configure.View = Backbone.View.extend({
  events: {
    "change #dontUseTiles": "confChangeHandler",
    "change #useSans": "confChangeHandler",
    "change #tilesBold": "confChangeHandler",
    "change #tileStyleSelect": "confChangeHandler",
    "change #dontShowTable": "confChangeHandler",
    "change #dontShowCanvas": "confChangeHandler",
    "change #showBorders": "confChangeHandler"
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  setCheckmark: function(searchStr, value, checkedValue) {
    this.$(searchStr).prop('checked', value === checkedValue);
  },
  render: function() {
    this.setCheckmark('#dontUseTiles', this.model.get('tilesOn'), false);
    this.setCheckmark('#useSans', this.model.get('font'), true);
    this.setCheckmark('#tilesBold', this.model.get('bold'), true)

    this.setCheckmark('#dontShowTable', this.model.get('showTable'), false);
    this.setCheckmark('#dontShowCanvas', this.model.get('showCanvas'), false);
    this.setCheckmark('#showBorders', this.model.get('showBorders'), true);

    this.$("#tileStyleSelect").val(this.model.get('tileSelection'));
    this.$("#tileStyleSelect").prop("disabled", !this.model.get('tilesOn'));
  },
  confChangeHandler: function() {
    this.model.set({
      'tilesOn': !this.$("#dontUseTiles").prop("checked"),
      'font': this.$("#useSans").prop("checked") ? 'sans' : 'mono',
      'bold': this.$("#tilesBold").prop("checked"),
      'tileSelection': this.$("#tileStyleSelect option:selected").val(),
      'showTable': !this.$("#dontShowTable").prop("checked"),
      'showCanvas': !this.$("#dontShowCanvas").prop("checked"),
      'showBorders': this.$("#showBorders").prop("checked")
    });
    console.log('Tiles on?', this.model.get('tilesOn'))
    this.$("#tileStyleSelect").prop("disabled", !this.model.get('tilesOn'));
  }
});