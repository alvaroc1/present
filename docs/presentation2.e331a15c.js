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
})({"a6470bca8dbb4e2f6e4c6f1b313389fc":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "cbb884278c959c1c5f88abe60d8d07fb";
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
},{}],"27c3e7d2ba2bf0d5133c67420b4033f4":[function(require,module,exports) {
'use strict'

module.exports = abap
abap.displayName = 'abap'
abap.aliases = []
function abap(Prism) {
  Prism.languages.abap = {
    comment: /^\*.*/m,
    string: /(`|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    'string-template': {
      pattern: /([|}])(?:\\.|[^\\|{\r\n])*(?=[|{])/,
      lookbehind: true,
      alias: 'string'
    },
    /* End Of Line comments should not interfere with strings when the
quote character occurs within them. We assume a string being highlighted
inside an EOL comment is more acceptable than the opposite.
*/
    'eol-comment': {
      pattern: /(^|\s)".*/m,
      lookbehind: true,
      alias: 'comment'
    },
    keyword: {
      pattern: /(\s|\.|^)(?:SCIENTIFIC_WITH_LEADING_ZERO|SCALE_PRESERVING_SCIENTIFIC|RMC_COMMUNICATION_FAILURE|END-ENHANCEMENT-SECTION|MULTIPLY-CORRESPONDING|SUBTRACT-CORRESPONDING|VERIFICATION-MESSAGE|DIVIDE-CORRESPONDING|ENHANCEMENT-SECTION|CURRENCY_CONVERSION|RMC_SYSTEM_FAILURE|START-OF-SELECTION|MOVE-CORRESPONDING|RMC_INVALID_STATUS|CUSTOMER-FUNCTION|END-OF-DEFINITION|ENHANCEMENT-POINT|SYSTEM-EXCEPTIONS|ADD-CORRESPONDING|SCALE_PRESERVING|SELECTION-SCREEN|CURSOR-SELECTION|END-OF-SELECTION|LOAD-OF-PROGRAM|SCROLL-BOUNDARY|SELECTION-TABLE|EXCEPTION-TABLE|IMPLEMENTATIONS|PARAMETER-TABLE|RIGHT-JUSTIFIED|UNIT_CONVERSION|AUTHORITY-CHECK|LIST-PROCESSING|SIGN_AS_POSTFIX|COL_BACKGROUND|IMPLEMENTATION|INTERFACE-POOL|TRANSFORMATION|IDENTIFICATION|ENDENHANCEMENT|LINE-SELECTION|INITIALIZATION|LEFT-JUSTIFIED|SELECT-OPTIONS|SELECTION-SETS|COMMUNICATION|CORRESPONDING|DECIMAL_SHIFT|PRINT-CONTROL|VALUE-REQUEST|CHAIN-REQUEST|FUNCTION-POOL|FIELD-SYMBOLS|FUNCTIONALITY|INVERTED-DATE|SELECTION-SET|CLASS-METHODS|OUTPUT-LENGTH|CLASS-CODING|COL_NEGATIVE|ERRORMESSAGE|FIELD-GROUPS|HELP-REQUEST|NO-EXTENSION|NO-TOPOFPAGE|REDEFINITION|DISPLAY-MODE|ENDINTERFACE|EXIT-COMMAND|FIELD-SYMBOL|NO-SCROLLING|SHORTDUMP-ID|ACCESSPOLICY|CLASS-EVENTS|COL_POSITIVE|DECLARATIONS|ENHANCEMENTS|FILTER-TABLE|SWITCHSTATES|SYNTAX-CHECK|TRANSPORTING|ASYNCHRONOUS|SYNTAX-TRACE|TOKENIZATION|USER-COMMAND|WITH-HEADING|ABAP-SOURCE|BREAK-POINT|CHAIN-INPUT|COMPRESSION|FIXED-POINT|NEW-SECTION|NON-UNICODE|OCCURRENCES|RESPONSIBLE|SYSTEM-CALL|TRACE-TABLE|ABBREVIATED|CHAR-TO-HEX|END-OF-FILE|ENDFUNCTION|ENVIRONMENT|ASSOCIATION|COL_HEADING|EDITOR-CALL|END-OF-PAGE|ENGINEERING|IMPLEMENTED|INTENSIFIED|RADIOBUTTON|SYSTEM-EXIT|TOP-OF-PAGE|TRANSACTION|APPLICATION|CONCATENATE|DESTINATION|ENHANCEMENT|IMMEDIATELY|NO-GROUPING|PRECOMPILED|REPLACEMENT|TITLE-LINES|ACTIVATION|BYTE-ORDER|CLASS-POOL|CONNECTION|CONVERSION|DEFINITION|DEPARTMENT|EXPIRATION|INHERITING|MESSAGE-ID|NO-HEADING|PERFORMING|QUEUE-ONLY|RIGHTSPACE|SCIENTIFIC|STATUSINFO|STRUCTURES|SYNCPOINTS|WITH-TITLE|ATTRIBUTES|BOUNDARIES|CLASS-DATA|COL_NORMAL|DD\/MM\/YYYY|DESCENDING|INTERFACES|LINE-COUNT|MM\/DD\/YYYY|NON-UNIQUE|PRESERVING|SELECTIONS|STATEMENTS|SUBROUTINE|TRUNCATION|TYPE-POOLS|ARITHMETIC|BACKGROUND|ENDPROVIDE|EXCEPTIONS|IDENTIFIER|INDEX-LINE|OBLIGATORY|PARAMETERS|PERCENTAGE|PUSHBUTTON|RESOLUTION|COMPONENTS|DEALLOCATE|DISCONNECT|DUPLICATES|FIRST-LINE|HEAD-LINES|NO-DISPLAY|OCCURRENCE|RESPECTING|RETURNCODE|SUBMATCHES|TRACE-FILE|ASCENDING|BYPASSING|ENDMODULE|EXCEPTION|EXCLUDING|EXPORTING|INCREMENT|MATCHCODE|PARAMETER|PARTIALLY|PREFERRED|REFERENCE|REPLACING|RETURNING|SELECTION|SEPARATED|SPECIFIED|STATEMENT|TIMESTAMP|TYPE-POOL|ACCEPTING|APPENDAGE|ASSIGNING|COL_GROUP|COMPARING|CONSTANTS|DANGEROUS|IMPORTING|INSTANCES|LEFTSPACE|LOG-POINT|QUICKINFO|READ-ONLY|SCROLLING|SQLSCRIPT|STEP-LOOP|TOP-LINES|TRANSLATE|APPENDING|AUTHORITY|CHARACTER|COMPONENT|CONDITION|DIRECTORY|DUPLICATE|MESSAGING|RECEIVING|SUBSCREEN|ACCORDING|COL_TOTAL|END-LINES|ENDMETHOD|ENDSELECT|EXPANDING|EXTENSION|INCLUDING|INFOTYPES|INTERFACE|INTERVALS|LINE-SIZE|PF-STATUS|PROCEDURE|PROTECTED|REQUESTED|RESUMABLE|RIGHTPLUS|SAP-SPOOL|SECONDARY|STRUCTURE|SUBSTRING|TABLEVIEW|NUMOFCHAR|ADJACENT|ANALYSIS|ASSIGNED|BACKWARD|CHANNELS|CHECKBOX|CONTINUE|CRITICAL|DATAINFO|DD\/MM\/YY|DURATION|ENCODING|ENDCLASS|FUNCTION|LEFTPLUS|LINEFEED|MM\/DD\/YY|OVERFLOW|RECEIVED|SKIPPING|SORTABLE|STANDARD|SUBTRACT|SUPPRESS|TABSTRIP|TITLEBAR|TRUNCATE|UNASSIGN|WHENEVER|ANALYZER|COALESCE|COMMENTS|CONDENSE|DECIMALS|DEFERRED|ENDWHILE|EXPLICIT|KEYWORDS|MESSAGES|POSITION|PRIORITY|RECEIVER|RENAMING|TIMEZONE|TRAILING|ALLOCATE|CENTERED|CIRCULAR|CONTROLS|CURRENCY|DELETING|DESCRIBE|DISTANCE|ENDCATCH|EXPONENT|EXTENDED|GENERATE|IGNORING|INCLUDES|INTERNAL|MAJOR-ID|MODIFIER|NEW-LINE|OPTIONAL|PROPERTY|ROLLBACK|STARTING|SUPPLIED|ABSTRACT|CHANGING|CONTEXTS|CREATING|CUSTOMER|DATABASE|DAYLIGHT|DEFINING|DISTINCT|DIVISION|ENABLING|ENDCHAIN|ESCAPING|HARMLESS|IMPLICIT|INACTIVE|LANGUAGE|MINOR-ID|MULTIPLY|NEW-PAGE|NO-TITLE|POS_HIGH|SEPARATE|TEXTPOOL|TRANSFER|SELECTOR|DBMAXLEN|ITERATOR|SELECTOR|ARCHIVE|BIT-XOR|BYTE-CO|COLLECT|COMMENT|CURRENT|DEFAULT|DISPLAY|ENDFORM|EXTRACT|LEADING|LISTBOX|LOCATOR|MEMBERS|METHODS|NESTING|POS_LOW|PROCESS|PROVIDE|RAISING|RESERVE|SECONDS|SUMMARY|VISIBLE|BETWEEN|BIT-AND|BYTE-CS|CLEANUP|COMPUTE|CONTROL|CONVERT|DATASET|ENDCASE|FORWARD|HEADERS|HOTSPOT|INCLUDE|INVERSE|KEEPING|NO-ZERO|OBJECTS|OVERLAY|PADDING|PATTERN|PROGRAM|REFRESH|SECTION|SUMMING|TESTING|VERSION|WINDOWS|WITHOUT|BIT-NOT|BYTE-CA|BYTE-NA|CASTING|CONTEXT|COUNTRY|DYNAMIC|ENABLED|ENDLOOP|EXECUTE|FRIENDS|HANDLER|HEADING|INITIAL|\*-INPUT|LOGFILE|MAXIMUM|MINIMUM|NO-GAPS|NO-SIGN|PRAGMAS|PRIMARY|PRIVATE|REDUCED|REPLACE|REQUEST|RESULTS|UNICODE|WARNING|ALIASES|BYTE-CN|BYTE-NS|CALLING|COL_KEY|COLUMNS|CONNECT|ENDEXEC|ENTRIES|EXCLUDE|FILTERS|FURTHER|HELP-ID|LOGICAL|MAPPING|MESSAGE|NAMETAB|OPTIONS|PACKAGE|PERFORM|RECEIVE|STATICS|VARYING|BINDING|CHARLEN|GREATER|XSTRLEN|ACCEPT|APPEND|DETAIL|ELSEIF|ENDING|ENDTRY|FORMAT|FRAMES|GIVING|HASHED|HEADER|IMPORT|INSERT|MARGIN|MODULE|NATIVE|OBJECT|OFFSET|REMOTE|RESUME|SAVING|SIMPLE|SUBMIT|TABBED|TOKENS|UNIQUE|UNPACK|UPDATE|WINDOW|YELLOW|ACTUAL|ASPECT|CENTER|CURSOR|DELETE|DIALOG|DIVIDE|DURING|ERRORS|EVENTS|EXTEND|FILTER|HANDLE|HAVING|IGNORE|LITTLE|MEMORY|NO-GAP|OCCURS|OPTION|PERSON|PLACES|PUBLIC|REDUCE|REPORT|RESULT|SINGLE|SORTED|SWITCH|SYNTAX|TARGET|VALUES|WRITER|ASSERT|BLOCKS|BOUNDS|BUFFER|CHANGE|COLUMN|COMMIT|CONCAT|COPIES|CREATE|DDMMYY|DEFINE|ENDIAN|ESCAPE|EXPAND|KERNEL|LAYOUT|LEGACY|LEVELS|MMDDYY|NUMBER|OUTPUT|RANGES|READER|RETURN|SCREEN|SEARCH|SELECT|SHARED|SOURCE|STABLE|STATIC|SUBKEY|SUFFIX|TABLES|UNWIND|YYMMDD|ASSIGN|BACKUP|BEFORE|BINARY|BIT-OR|BLANKS|CLIENT|CODING|COMMON|DEMAND|DYNPRO|EXCEPT|EXISTS|EXPORT|FIELDS|GLOBAL|GROUPS|LENGTH|LOCALE|MEDIUM|METHOD|MODIFY|NESTED|OTHERS|REJECT|SCROLL|SUPPLY|SYMBOL|ENDFOR|STRLEN|ALIGN|BEGIN|BOUND|ENDAT|ENTRY|EVENT|FINAL|FLUSH|GRANT|INNER|SHORT|USING|WRITE|AFTER|BLACK|BLOCK|CLOCK|COLOR|COUNT|DUMMY|EMPTY|ENDDO|ENDON|GREEN|INDEX|INOUT|LEAVE|LEVEL|LINES|MODIF|ORDER|OUTER|RANGE|RESET|RETRY|RIGHT|SMART|SPLIT|STYLE|TABLE|THROW|UNDER|UNTIL|UPPER|UTF-8|WHERE|ALIAS|BLANK|CLEAR|CLOSE|EXACT|FETCH|FIRST|FOUND|GROUP|LLANG|LOCAL|OTHER|REGEX|SPOOL|TITLE|TYPES|VALID|WHILE|ALPHA|BOXED|CATCH|CHAIN|CHECK|CLASS|COVER|ENDIF|EQUIV|FIELD|FLOOR|FRAME|INPUT|LOWER|MATCH|NODES|PAGES|PRINT|RAISE|ROUND|SHIFT|SPACE|SPOTS|STAMP|STATE|TASKS|TIMES|TRMAC|ULINE|UNION|VALUE|WIDTH|EQUAL|LOG10|TRUNC|BLOB|CASE|CEIL|CLOB|COND|EXIT|FILE|GAPS|HOLD|INCL|INTO|KEEP|KEYS|LAST|LINE|LONG|LPAD|MAIL|MODE|OPEN|PINK|READ|ROWS|TEST|THEN|ZERO|AREA|BACK|BADI|BYTE|CAST|EDIT|EXEC|FAIL|FIND|FKEQ|FONT|FREE|GKEQ|HIDE|INIT|ITNO|LATE|LOOP|MAIN|MARK|MOVE|NEXT|NULL|RISK|ROLE|UNIT|WAIT|ZONE|BASE|CALL|CODE|DATA|DATE|FKGE|GKGE|HIGH|KIND|LEFT|LIST|MASK|MESH|NAME|NODE|PACK|PAGE|POOL|SEND|SIGN|SIZE|SOME|STOP|TASK|TEXT|TIME|USER|VARY|WITH|WORD|BLUE|CONV|COPY|DEEP|ELSE|FORM|FROM|HINT|ICON|JOIN|LIKE|LOAD|ONLY|PART|SCAN|SKIP|SORT|TYPE|UNIX|VIEW|WHEN|WORK|ACOS|ASIN|ATAN|COSH|EACH|FRAC|LESS|RTTI|SINH|SQRT|TANH|AVG|BIT|DIV|ISO|LET|OUT|PAD|SQL|ALL|CI_|CPI|END|LOB|LPI|MAX|MIN|NEW|OLE|RUN|SET|\?TO|YES|ABS|ADD|AND|BIG|FOR|HDB|JOB|LOW|NOT|SAP|TRY|VIA|XML|ANY|GET|IDS|KEY|MOD|OFF|PUT|RAW|RED|REF|SUM|TAB|XSD|CNT|COS|EXP|LOG|SIN|TAN|XOR|AT|CO|CP|DO|GT|ID|IF|NS|OR|BT|CA|CS|GE|NA|NB|EQ|IN|LT|NE|NO|OF|ON|PF|TO|AS|BY|CN|IS|LE|NP|UP|E|I|M|O|Z|C|X)\b/i,
      lookbehind: true
    },
    /* Numbers can be only integers. Decimal or Hex appear only as strings */
    number: /\b\d+\b/,
    /* Operators must always be surrounded by whitespace, they cannot be put
adjacent to operands.
*/
    operator: {
      pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[-+\/=])(?=\s)/,
      lookbehind: true
    },
    'string-operator': {
      pattern: /(\s)&&?(?=\s)/,
      lookbehind: true,
      /* The official editor highlights */
      alias: 'keyword'
    },
    'token-operator': [
      {
        /* Special operators used to access structure components, class methods/attributes, etc. */
        pattern: /(\w)(?:->?|=>|[~|{}])(?=\w)/,
        lookbehind: true,
        alias: 'punctuation'
      },
      {
        /* Special tokens used do delimit string templates */
        pattern: /[|{}]/,
        alias: 'punctuation'
      }
    ],
    punctuation: /[,.:()]/
  }
}

},{}]},{},["a6470bca8dbb4e2f6e4c6f1b313389fc","27c3e7d2ba2bf0d5133c67420b4033f4"], null)

//# sourceMappingURL=presentation2.e331a15c.js.map
