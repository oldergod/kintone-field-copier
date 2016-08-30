'use strict'; {
  class GaiaRecordId {
    constructor() {
      this.snippets = document.querySelectorAll('.recordlist-record_id-gaia');
    }

    init() {
      for (let snippet of this.snippets) {
        snippet.addEventListener('click', this.onMouseClickHandler(snippet));
        snippet.addEventListener('mouseout', this.onMouseOutHandler(snippet));
      };
    }

    static get CssClasses_() {
      return {
        COPIED: 'copied',
        NOT_SUPPORTED: 'nosupport'
      };
    }

    copyToClipboard(snippet) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(snippet);
      selection.removeAllRanges();
      selection.addRange(range);
      let successful = false;
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        successful = false;
      }
      selection.removeAllRanges();
      return successful;
    }

    onMouseClickHandler(snippet) {
      return () => {
        if (!(window.getSelection().toString().length > 0)) {
          const successful = this.copyToClipboard(snippet);
          snippet.classList.add(successful ?
            GaiaRecordId.CssClasses_.COPIED :
            GaiaRecordId.CssClasses_.NOT_SUPPORTED);
        }
      };
    }

    onMouseOutHandler(snippet) {
      return () => {
        snippet.classList.remove(GaiaRecordId.CssClasses_.COPIED);
      };
    }
  }

  kintone.events.on('app.record.index.show', () => new GaiaRecordId().init());
}
