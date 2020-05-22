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
})({"3609e19d7b80da9e08e9be14aa321661":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "a39fe7e1615971ba709d1876a3bc4900";
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
},{}],"8355898a4b07a49d68b5f8be21606d57":[function(require,module,exports) {
module.exports = // We try to support full Ada2012
//
// We highlight all appearances of types, keywords, literals (string, char, number, bool)
// and titles (user defined function/procedure/package)
// CSS classes are set accordingly
//
// Languages causing problems for language detection:
// xml (broken by Foo : Bar type), elm (broken by Foo : Bar type), vbscript-html (broken by body keyword)
// sql (ada default.txt has a lot of sql keywords)

function(hljs) {
    // Regular expression for Ada numeric literals.
    // stolen form the VHDL highlighter

    // Decimal literal:
    var INTEGER_RE = '\\d(_|\\d)*';
    var EXPONENT_RE = '[eE][-+]?' + INTEGER_RE;
    var DECIMAL_LITERAL_RE = INTEGER_RE + '(\\.' + INTEGER_RE + ')?' + '(' + EXPONENT_RE + ')?';

    // Based literal:
    var BASED_INTEGER_RE = '\\w+';
    var BASED_LITERAL_RE = INTEGER_RE + '#' + BASED_INTEGER_RE + '(\\.' + BASED_INTEGER_RE + ')?' + '#' + '(' + EXPONENT_RE + ')?';

    var NUMBER_RE = '\\b(' + BASED_LITERAL_RE + '|' + DECIMAL_LITERAL_RE + ')';

    // Identifier regex
    var ID_REGEX = '[A-Za-z](_?[A-Za-z0-9.])*';

    // bad chars, only allowed in literals
    var BAD_CHARS = '[]{}%#\'\"'

    // Ada doesn't have block comments, only line comments
    var COMMENTS = hljs.COMMENT('--', '$');

    // variable declarations of the form
    // Foo : Bar := Baz;
    // where only Bar will be highlighted
    var VAR_DECLS = {
        // TODO: These spaces are not required by the Ada syntax
        // however, I have yet to see handwritten Ada code where
        // someone does not put spaces around :
        begin: '\\s+:\\s+', end: '\\s*(:=|;|\\)|=>|$)',
        // endsWithParent: true,
        // returnBegin: true,
        illegal: BAD_CHARS,
        contains: [
            {
                // workaround to avoid highlighting
                // named loops and declare blocks
                beginKeywords: 'loop for declare others',
                endsParent: true,
            },
            {
                // properly highlight all modifiers
                className: 'keyword',
                beginKeywords: 'not null constant access function procedure in out aliased exception'
            },
            {
                className: 'type',
                begin: ID_REGEX,
                endsParent: true,
                relevance: 0,
            }
        ]
    };

    return {
        case_insensitive: true,
        keywords: {
            keyword:
                'abort else new return abs elsif not reverse abstract end ' +
                'accept entry select access exception of separate aliased exit or some ' +
                'all others subtype and for out synchronized array function overriding ' +
                'at tagged generic package task begin goto pragma terminate ' +
                'body private then if procedure type case in protected constant interface ' +
                'is raise use declare range delay limited record when delta loop rem while ' +
                'digits renames with do mod requeue xor',
            literal:
                'True False',
        },
        contains: [
            COMMENTS,
            // strings "foobar"
            {
                className: 'string',
                begin: /"/, end: /"/,
                contains: [{begin: /""/, relevance: 0}]
            },
            // characters ''
            {
                // character literals always contain one char
                className: 'string',
                begin: /'.'/
            },
            {
                // number literals
                className: 'number',
                begin: NUMBER_RE,
                relevance: 0
            },
            {
                // Attributes
                className: 'symbol',
                begin: "'" + ID_REGEX,
            },
            {
                // package definition, maybe inside generic
                className: 'title',
                begin: '(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?', end: '(is|$)',
                keywords: 'package body',
                excludeBegin: true,
                excludeEnd: true,
                illegal: BAD_CHARS
            },
            {
                // function/procedure declaration/definition
                // maybe inside generic
                begin: '(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+', end: '(\\bis|\\bwith|\\brenames|\\)\\s*;)',
                keywords: 'overriding function procedure with is renames return',
                // we need to re-match the 'function' keyword, so that
                // the title mode below matches only exactly once
                returnBegin: true,
                contains:
                [
                    COMMENTS,
                    {
                        // name of the function/procedure
                        className: 'title',
                        begin: '(\\bwith\\s+)?\\b(function|procedure)\\s+',
                        end: '(\\(|\\s+|$)',
                        excludeBegin: true,
                        excludeEnd: true,
                        illegal: BAD_CHARS
                    },
                    // 'self'
                    // // parameter types
                    VAR_DECLS,
                    {
                        // return type
                        className: 'type',
                        begin: '\\breturn\\s+', end: '(\\s+|;|$)',
                        keywords: 'return',
                        excludeBegin: true,
                        excludeEnd: true,
                        // we are done with functions
                        endsParent: true,
                        illegal: BAD_CHARS

                    },
                ]
            },
            {
                // new type declarations
                // maybe inside generic
                className: 'type',
                begin: '\\b(sub)?type\\s+', end: '\\s+',
                keywords: 'type',
                excludeBegin: true,
                illegal: BAD_CHARS
            },

            // see comment above the definition
            VAR_DECLS,

            // no markup
            // relevance boosters for small snippets
            // {begin: '\\s*=>\\s*'},
            // {begin: '\\s*:=\\s*'},
            // {begin: '\\s+:=\\s+'},
        ]
    };
};
},{}]},{},["3609e19d7b80da9e08e9be14aa321661"], null)

//# sourceMappingURL=ada.42b3bab0.js.map
