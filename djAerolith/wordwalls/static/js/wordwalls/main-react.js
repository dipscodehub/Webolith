/* global requirejs,define*/
requirejs.config({
  baseUrl: '/static/js/wordwalls',
  paths: {
    jquery: '../../../../static/js/aerolith/jquery-1.11.0',
    jquery_ui: '../../../../static/js/aerolith/jquery-ui-1.10.2.custom.min',
    underscore: '../../../../static/lib/underscore-1.4.4',
    backbone: '../../../../static/lib/backbone-1.0.0',
    mustache: '../../../../static/lib/mustache',
    text: '../../../../static/lib/require/text',
    csrfAjax: '../../../../static/js/aerolith/csrfAjax',
    json2: '../../../../static/js/aerolith/json2',
    moment: '../../../../static/lib/moment',
    react: '../../../../static/lib/react',
    'react-dom': '../../../../static/lib/react-dom',
    jsx: '../../../../static/lib/jsx',
    babel: '../../../../static/lib/babel-5.8.34.min'
  },
  shim: {
    underscore: {
      exports: '_'  // ^_^
    },
    backbone: {
      deps: ['underscore', 'jquery', 'json2'],
      exports: 'Backbone'
    },
    'jquery_ui': ['jquery'],
    'json2': {
      exports: 'JSON'
    }
  },
  config: {
    babel: {
      sourceMaps: 'inline'
    }
  }
});


define([
  'module',
  'jquery',
  'jsx!reactapp/comment',
  'csrfAjax'
], function (module, $, dogs) {
  "use strict";
  $(function() {

  });
});
