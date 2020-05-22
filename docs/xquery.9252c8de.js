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
})({"9b04c5581a850b7c422088e626e69353":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "7d07665a9d34487d7bf87b02e1e10d77";
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
},{}],"f8eefb1835dc397c200a3853d663fd63":[function(require,module,exports) {
module.exports = function(hljs) {
  // see https://www.w3.org/TR/xquery/#id-terminal-delimitation
  var KEYWORDS = 'module schema namespace boundary-space preserve no-preserve strip default collation base-uri ordering context decimal-format decimal-separator copy-namespaces empty-sequence except exponent-separator external grouping-separator inherit no-inherit lax minus-sign per-mille percent schema-attribute schema-element strict unordered zero-digit ' +
  'declare import option function validate variable ' +
  'for at in let where order group by return if then else ' +
  'tumbling sliding window start when only end previous next stable ' +
  'ascending descending allowing empty greatest least some every satisfies switch case typeswitch try catch ' +
  'and or to union intersect instance of treat as castable cast map array ' +
  'delete insert into replace value rename copy modify update';

  // Node Types (sorted by inheritance)
  // atomic types (sorted by inheritance)
  var TYPE = 'item document-node node attribute document element comment namespace namespace-node processing-instruction text construction ' +
  'xs:anyAtomicType xs:untypedAtomic xs:duration xs:time xs:decimal xs:float xs:double xs:gYearMonth xs:gYear xs:gMonthDay xs:gMonth xs:gDay xs:boolean xs:base64Binary xs:hexBinary xs:anyURI xs:QName xs:NOTATION xs:dateTime xs:dateTimeStamp xs:date xs:string xs:normalizedString xs:token xs:language xs:NMTOKEN xs:Name xs:NCName xs:ID xs:IDREF xs:ENTITY xs:integer xs:nonPositiveInteger xs:negativeInteger xs:long xs:int xs:short xs:byte xs:nonNegativeInteger xs:unisignedLong xs:unsignedInt xs:unsignedShort xs:unsignedByte xs:positiveInteger xs:yearMonthDuration xs:dayTimeDuration';

  var LITERAL = 'eq ne lt le gt ge is ' +
    'self:: child:: descendant:: descendant-or-self:: attribute:: following:: following-sibling:: parent:: ancestor:: ancestor-or-self:: preceding:: preceding-sibling:: ' +
    'NaN';

  // functions (TODO: find regex for op: without breaking build)
  var BUILT_IN = {
    className: 'built_in',
    variants: [{
      begin: /\barray\:/,
      end: /(?:append|filter|flatten|fold\-(?:left|right)|for-each(?:\-pair)?|get|head|insert\-before|join|put|remove|reverse|size|sort|subarray|tail)\b/
    }, {
      begin: /\bmap\:/,
      end: /(?:contains|entry|find|for\-each|get|keys|merge|put|remove|size)\b/
    }, {
      begin: /\bmath\:/,
      end: /(?:a(?:cos|sin|tan[2]?)|cos|exp(?:10)?|log(?:10)?|pi|pow|sin|sqrt|tan)\b/
    }, {
      begin: /\bop\:/,
      end: /\(/,
      excludeEnd: true
    }, {
      begin: /\bfn\:/,
      end: /\(/,
      excludeEnd: true
    },
// do not highlight inbuilt strings as variable or xml element names
    {
      begin: /[^<\/\$\:'"-]\b(?:abs|accumulator\-(?:after|before)|adjust\-(?:date(?:Time)?|time)\-to\-timezone|analyze\-string|apply|available\-(?:environment\-variables|system\-properties)|avg|base\-uri|boolean|ceiling|codepoints?\-(?:equal|to\-string)|collation\-key|collection|compare|concat|contains(?:\-token)?|copy\-of|count|current(?:\-)?(?:date(?:Time)?|time|group(?:ing\-key)?|output\-uri|merge\-(?:group|key))?data|dateTime|days?\-from\-(?:date(?:Time)?|duration)|deep\-equal|default\-(?:collation|language)|distinct\-values|document(?:\-uri)?|doc(?:\-available)?|element\-(?:available|with\-id)|empty|encode\-for\-uri|ends\-with|environment\-variable|error|escape\-html\-uri|exactly\-one|exists|false|filter|floor|fold\-(?:left|right)|for\-each(?:\-pair)?|format\-(?:date(?:Time)?|time|integer|number)|function\-(?:arity|available|lookup|name)|generate\-id|has\-children|head|hours\-from\-(?:dateTime|duration|time)|id(?:ref)?|implicit\-timezone|in\-scope\-prefixes|index\-of|innermost|insert\-before|iri\-to\-uri|json\-(?:doc|to\-xml)|key|lang|last|load\-xquery\-module|local\-name(?:\-from\-QName)?|(?:lower|upper)\-case|matches|max|minutes\-from\-(?:dateTime|duration|time)|min|months?\-from\-(?:date(?:Time)?|duration)|name(?:space\-uri\-?(?:for\-prefix|from\-QName)?)?|nilled|node\-name|normalize\-(?:space|unicode)|not|number|one\-or\-more|outermost|parse\-(?:ietf\-date|json)|path|position|(?:prefix\-from\-)?QName|random\-number\-generator|regex\-group|remove|replace|resolve\-(?:QName|uri)|reverse|root|round(?:\-half\-to\-even)?|seconds\-from\-(?:dateTime|duration|time)|snapshot|sort|starts\-with|static\-base\-uri|stream\-available|string\-?(?:join|length|to\-codepoints)?|subsequence|substring\-?(?:after|before)?|sum|system\-property|tail|timezone\-from\-(?:date(?:Time)?|time)|tokenize|trace|trans(?:form|late)|true|type\-available|unordered|unparsed\-(?:entity|text)?\-?(?:public\-id|uri|available|lines)?|uri\-collection|xml\-to\-json|years?\-from\-(?:date(?:Time)?|duration)|zero\-or\-one)\b/,
    }, {
      begin: /\blocal\:/,
      end: /\(/,
      excludeEnd: true
    }, {
      begin: /\bzip\:/,
      end: /(?:zip\-file|(?:xml|html|text|binary)\-entry| (?:update\-)?entries)\b/
    }, {
      begin: /\b(?:util|db|functx|app|xdmp|xmldb)\:/,
      end: /\(/,
      excludeEnd: true
    }
  ]
  };

  var TITLE = {
    className: 'title',
    begin: /\bxquery version "[13]\.[01]"\s?(?:encoding ".+")?/,
    end: /;/
  };

  var VAR = {
    className: 'variable',
    begin: /[\$][\w-:]+/
  };

  var NUMBER = {
    className: 'number',
    begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
    relevance: 0
  };

  var STRING = {
    className: 'string',
    variants: [{
        begin: /"/,
        end: /"/,
        contains: [{
          begin: /""/,
          relevance: 0
        }]
      },
      {
        begin: /'/,
        end: /'/,
        contains: [{
          begin: /''/,
          relevance: 0
        }]
      }
    ]
  };

  var ANNOTATION = {
    className: 'meta',
    begin: /%[\w-:]+/
  };

  var COMMENT = {
    className: 'comment',
    begin: '\\(:',
    end: ':\\)',
    relevance: 10,
    contains: [{
      className: 'doctag',
      begin: '@\\w+'
    }]
  };

  // see https://www.w3.org/TR/xquery/#id-computedConstructors
  // mocha: computed_inbuilt
  // see https://www.regexpal.com/?fam=99749
  var COMPUTED = {
    beginKeywords: 'element attribute comment document processing-instruction',
    end: '{',
    excludeEnd: true
  };

  // mocha: direct_method
    var DIRECT = {
      begin: /<([\w\._:\-]+)((\s*.*)=('|").*('|"))?>/,
      end: /(\/[\w\._:\-]+>)/,
      subLanguage: 'xml',
      contains: [{
        begin: '{',
        end: '}',
        subLanguage: 'xquery'
      }, 'self']
    };


  var CONTAINS = [
    VAR,
    BUILT_IN,
    STRING,
    NUMBER,
    COMMENT,
    ANNOTATION,
    TITLE,
    COMPUTED,
    DIRECT
  ];



    var METHOD = {
      begin: '{',
      end: '}',
      contains: CONTAINS
    };



  return {
    aliases: ['xpath', 'xq'],
    case_insensitive: false,
    lexemes: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
    illegal: /(proc)|(abstract)|(extends)|(until)|(#)/,
    keywords: {
      keyword: KEYWORDS,
      type: TYPE,
      literal: LITERAL
    },
    contains: CONTAINS
  };
};
},{}]},{},["9b04c5581a850b7c422088e626e69353"], null)

//# sourceMappingURL=xquery.9252c8de.js.map
