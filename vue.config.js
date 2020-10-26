module.exports = {
  pages: {
    popup: {
      template: 'public/popup.html',
      entry: 'src/popup/main.js',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {}
    }
  }
}
