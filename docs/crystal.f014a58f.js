// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"a43752cedf5b95b2bd15ccdb047850a9":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "7c278af1ad1fa052377cc73edf6d689c";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || location.hostname;
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      var newStyle = document.createElement('style');
      newStyle.innerHTML = asset.output;
      document.body.appendChild(newStyle);
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"82067e3a24d65e30e07499633d61f7c5":[function(require,module,exports) {
module.exports = function(hljs) {
  var INT_SUFFIX = '(_*[ui](8|16|32|64|128))?';
  var FLOAT_SUFFIX = '(_*f(32|64))?';
  var CRYSTAL_IDENT_RE = '[a-zA-Z_]\\w*[!?=]?';
  var CRYSTAL_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?';
  var CRYSTAL_PATH_RE = '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?';
  var CRYSTAL_KEYWORDS = {
    keyword:
      'abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if ' +
      'include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? ' +
      'return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield ' +
      '__DIR__ __END_LINE__ __FILE__ __LINE__',
    literal: 'false nil true'
  };
  var SUBST = {
    className: 'subst',
    begin: '#{', end: '}',
    keywords: CRYSTAL_KEYWORDS
  };
  var EXPANSION = {
    className: 'template-variable',
    variants: [
      {begin: '\\{\\{', end: '\\}\\}'},
      {begin: '\\{%', end: '%\\}'}
    ],
    keywords: CRYSTAL_KEYWORDS
  };

  function recursiveParen(begin, end) {
    var
    contains = [{begin: begin, end: end}];
    contains[0].contains = contains;
    return contains;
  }
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /`/, end: /`/},
      {begin: '%[Qwi]?\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%[Qwi]?\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%[Qwi]?{', end: '}', contains: recursiveParen('{', '}')},
      {begin: '%[Qwi]?<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%[Qwi]?\\|', end: '\\|'},
      {begin: /<<-\w+$/, end: /^\s*\w+$/},
    ],
    relevance: 0,
  };
  var Q_STRING = {
    className: 'string',
    variants: [
      {begin: '%q\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%q\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%q{', end: '}', contains: recursiveParen('{', '}')},
      {begin: '%q<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%q\\|', end: '\\|'},
      {begin: /<<-'\w+'$/, end: /^\s*\w+$/},
    ],
    relevance: 0,
  };
  var REGEXP = {
    begin: '(?!%})(' + hljs.RE_STARTERS_RE + '|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*',
    keywords: 'case if select unless until when while',
    contains: [
      {
        className: 'regexp',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST],
        variants: [
          {begin: '//[a-z]*', relevance: 0},
          {begin: '/(?!\\/)', end: '/[a-z]*'},
        ]
      }
    ],
    relevance: 0
  };
  var REGEXP2 = {
    className: 'regexp',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: '%r\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%r\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%r{', end: '}', contains: recursiveParen('{', '}')},
      {begin: '%r<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%r\\|', end: '\\|'},
    ],
    relevance: 0
  };
  var ATTRIBUTE = {
    className: 'meta',
    begin: '@\\[', end: '\\]',
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'meta-string'})
    ]
  };
  var CRYSTAL_DEFAULT_CONTAINS = [
    EXPANSION,
    STRING,
    Q_STRING,
    REGEXP2,
    REGEXP,
    ATTRIBUTE,
    hljs.HASH_COMMENT_MODE,
    {
      className: 'class',
      beginKeywords: 'class module struct', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: CRYSTAL_PATH_RE}),
        {begin: '<'} // relevance booster for inheritance
      ]
    },
    {
      className: 'class',
      beginKeywords: 'lib enum union', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: CRYSTAL_PATH_RE}),
      ],
      relevance: 10
    },
    {
      beginKeywords: 'annotation', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: CRYSTAL_PATH_RE}),
      ],
      relevance: 10
    },
    {
      className: 'function',
      beginKeywords: 'def', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ]
    },
    {
      className: 'function',
      beginKeywords: 'fun macro', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ],
      relevance: 5
    },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(\\!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: [STRING, {begin: CRYSTAL_METHOD_RE}],
      relevance: 0
    },
    {
      className: 'number',
      variants: [
        { begin: '\\b0b([01_]+)' + INT_SUFFIX },
        { begin: '\\b0o([0-7_]+)' + INT_SUFFIX },
        { begin: '\\b0x([A-Fa-f0-9_]+)' + INT_SUFFIX },
        { begin: '\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_*[-+]?[0-9_]*)?' + FLOAT_SUFFIX + '(?!_)' },
        { begin: '\\b([1-9][0-9_]*|0)' + INT_SUFFIX }
      ],
      relevance: 0
    }
  ];
  SUBST.contains = CRYSTAL_DEFAULT_CONTAINS;
  EXPANSION.contains = CRYSTAL_DEFAULT_CONTAINS.slice(1); // without EXPANSION

  return {
    aliases: ['cr'],
    lexemes: CRYSTAL_IDENT_RE,
    keywords: CRYSTAL_KEYWORDS,
    contains: CRYSTAL_DEFAULT_CONTAINS
  };
};
},{}]},{},["a43752cedf5b95b2bd15ccdb047850a9"], null)

//# sourceMappingURL=crystal.f014a58f.js.map
