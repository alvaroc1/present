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
})({"811a207df20c76da035f68c848d471fa":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "688c6a81e51e276b7672ddbd1e0378c3";
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
},{}],"3d3d663e09c63e5cfba05df352dac3d1":[function(require,module,exports) {
module.exports = function(hljs) {

    // Data step and PROC SQL statements
    var SAS_KEYWORDS = ''+
        'do if then else end until while '+
        ''+
        'abort array attrib by call cards cards4 catname continue '+
        'datalines datalines4 delete delim delimiter display dm drop '+
        'endsas error file filename footnote format goto in infile '+
        'informat input keep label leave length libname link list '+
        'lostcard merge missing modify options output out page put '+
        'redirect remove rename replace retain return select set skip '+
        'startsas stop title update waitsas where window x systask '+
        ''+
        'add and alter as cascade check create delete describe '+
        'distinct drop foreign from group having index insert into in '+
        'key like message modify msgtype not null on or order primary '+
        'references reset restrict select set table unique update '+
        'validate view where';

    // Built-in SAS functions
    var SAS_FUN = ''+
        'abs|addr|airy|arcos|arsin|atan|attrc|attrn|band|'+
        'betainv|blshift|bnot|bor|brshift|bxor|byte|cdf|ceil|'+
        'cexist|cinv|close|cnonct|collate|compbl|compound|'+
        'compress|cos|cosh|css|curobs|cv|daccdb|daccdbsl|'+
        'daccsl|daccsyd|dacctab|dairy|date|datejul|datepart|'+
        'datetime|day|dclose|depdb|depdbsl|depdbsl|depsl|'+
        'depsl|depsyd|depsyd|deptab|deptab|dequote|dhms|dif|'+
        'digamma|dim|dinfo|dnum|dopen|doptname|doptnum|dread|'+
        'dropnote|dsname|erf|erfc|exist|exp|fappend|fclose|'+
        'fcol|fdelete|fetch|fetchobs|fexist|fget|fileexist|'+
        'filename|fileref|finfo|finv|fipname|fipnamel|'+
        'fipstate|floor|fnonct|fnote|fopen|foptname|foptnum|'+
        'fpoint|fpos|fput|fread|frewind|frlen|fsep|fuzz|'+
        'fwrite|gaminv|gamma|getoption|getvarc|getvarn|hbound|'+
        'hms|hosthelp|hour|ibessel|index|indexc|indexw|input|'+
        'inputc|inputn|int|intck|intnx|intrr|irr|jbessel|'+
        'juldate|kurtosis|lag|lbound|left|length|lgamma|'+
        'libname|libref|log|log10|log2|logpdf|logpmf|logsdf|'+
        'lowcase|max|mdy|mean|min|minute|mod|month|mopen|'+
        'mort|n|netpv|nmiss|normal|note|npv|open|ordinal|'+
        'pathname|pdf|peek|peekc|pmf|point|poisson|poke|'+
        'probbeta|probbnml|probchi|probf|probgam|probhypr|'+
        'probit|probnegb|probnorm|probt|put|putc|putn|qtr|'+
        'quote|ranbin|rancau|ranexp|rangam|range|rank|rannor|'+
        'ranpoi|rantbl|rantri|ranuni|repeat|resolve|reverse|'+
        'rewind|right|round|saving|scan|sdf|second|sign|'+
        'sin|sinh|skewness|soundex|spedis|sqrt|std|stderr|'+
        'stfips|stname|stnamel|substr|sum|symget|sysget|'+
        'sysmsg|sysprod|sysrc|system|tan|tanh|time|timepart|'+
        'tinv|tnonct|today|translate|tranwrd|trigamma|'+
        'trim|trimn|trunc|uniform|upcase|uss|var|varfmt|'+
        'varinfmt|varlabel|varlen|varname|varnum|varray|'+
        'varrayx|vartype|verify|vformat|vformatd|vformatdx|'+
        'vformatn|vformatnx|vformatw|vformatwx|vformatx|'+
        'vinarray|vinarrayx|vinformat|vinformatd|vinformatdx|'+
        'vinformatn|vinformatnx|vinformatw|vinformatwx|'+
        'vinformatx|vlabel|vlabelx|vlength|vlengthx|vname|'+
        'vnamex|vtype|vtypex|weekday|year|yyq|zipfips|zipname|'+
        'zipnamel|zipstate';

    // Built-in macro functions
    var SAS_MACRO_FUN = 'bquote|nrbquote|cmpres|qcmpres|compstor|'+
        'datatyp|display|do|else|end|eval|global|goto|'+
        'if|index|input|keydef|label|left|length|let|'+
        'local|lowcase|macro|mend|nrbquote|nrquote|'+
        'nrstr|put|qcmpres|qleft|qlowcase|qscan|'+
        'qsubstr|qsysfunc|qtrim|quote|qupcase|scan|str|'+
        'substr|superq|syscall|sysevalf|sysexec|sysfunc|'+
        'sysget|syslput|sysprod|sysrc|sysrput|then|to|'+
        'trim|unquote|until|upcase|verify|while|window';

    return {
        aliases: ['sas', 'SAS'],
        case_insensitive: true, // SAS is case-insensitive
        keywords: {
            literal:
                'null missing _all_ _automatic_ _character_ _infile_ '+
                '_n_ _name_ _null_ _numeric_ _user_ _webout_',
            meta:
                SAS_KEYWORDS
        },
        contains: [
            {
                // Distinct highlight for proc <proc>, data, run, quit
                className: 'keyword',
                begin: /^\s*(proc [\w\d_]+|data|run|quit)[\s\;]/
            },
            {
                // Macro variables
                className: 'variable',
                begin: /\&[a-zA-Z_\&][a-zA-Z0-9_]*\.?/
            },
            {
                // Special emphasis for datalines|cards
                className: 'emphasis',
                begin: /^\s*datalines|cards.*;/,
                end: /^\s*;\s*$/
            },
            {   // Built-in macro variables take precedence
                className: 'built_in',
                begin: '%(' + SAS_MACRO_FUN + ')'
            },
            {
                // User-defined macro functions highlighted after
                className: 'name',
                begin: /%[a-zA-Z_][a-zA-Z_0-9]*/
            },
            {
                className: 'meta',
                begin: '[^%](' + SAS_FUN + ')[\(]'
            },
            {
                className: 'string',
                variants: [
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE
                ]
            },
            hljs.COMMENT('\\*', ';'),
            hljs.C_BLOCK_COMMENT_MODE
        ]
    };
};
},{}]},{},["811a207df20c76da035f68c848d471fa"], null)

//# sourceMappingURL=sas.02b59a4f.js.map
