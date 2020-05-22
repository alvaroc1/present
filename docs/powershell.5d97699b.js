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
})({"21d1b971fec632fbcc50e15a220aa332":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "81cfa5632df1fad5b4257f7a0fe013d5";
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
},{}],"856d6088d7a9feb80f4261c529fb9b9e":[function(require,module,exports) {
module.exports = function(hljs){
  var BACKTICK_ESCAPE = {
    begin: "`[\\s\\S]",
    relevance: 0,
  };
  var VAR = {
    className: "variable",
    variants: [{ begin: /\$[\w\d][\w\d_:]*/ }],
  };
  var LITERAL = {
    className: "literal",
    begin: /\$(null|true|false)\b/,
  };
  var QUOTE_STRING = {
    className: "string",
    variants: [{ begin: /"/, end: /"/ }, { begin: /@"/, end: /^"@/ }],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: "variable",
        begin: /\$[A-z]/,
        end: /[^A-z]/,
      },
    ],
  };
  var APOS_STRING = {
    className: "string",
    variants: [{ begin: /'/, end: /'/ }, { begin: /@'/, end: /^'@/ }],
  };

  var PS_HELPTAGS = {
    className: "doctag",
    variants: [
      /* no paramater help tags */

      {
        begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/,
      },
      /* one parameter help tags */
      {
        begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/,
      },
    ],
  };
  var PS_COMMENT = hljs.inherit(hljs.COMMENT(null, null), {
    variants: [
      /* single-line comment */
      { begin: /#/, end: /$/ },
      /* multi-line comment */
      { begin: /<#/, end: /#>/ },
    ],
    contains: [PS_HELPTAGS],
  });

  return {
    aliases: ["ps"],
    lexemes: /-?[A-z\.\-]+/,
    case_insensitive: true,
    keywords: {
      keyword:
        "if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch" +
        "ValidateNoCircleInNodeResources ValidateNodeExclusiveResources ValidateNodeManager ValidateNodeResources ValidateNodeResourceSource ValidateNoNameNodeResources ThrowError IsHiddenResource" +
        "IsPatternMatched ",
      built_in:
        "Add-Computer Add-Content Add-History Add-JobTrigger Add-Member Add-PSSnapin Add-Type Checkpoint-Computer Clear-Content " +
        "Clear-EventLog Clear-History Clear-Host Clear-Item Clear-ItemProperty Clear-Variable Compare-Object Complete-Transaction Connect-PSSession " +
        "Connect-WSMan Convert-Path ConvertFrom-Csv ConvertFrom-Json ConvertFrom-SecureString ConvertFrom-StringData ConvertTo-Csv ConvertTo-Html " +
        "ConvertTo-Json ConvertTo-SecureString ConvertTo-Xml Copy-Item Copy-ItemProperty Debug-Process Disable-ComputerRestore Disable-JobTrigger " +
        "Disable-PSBreakpoint Disable-PSRemoting Disable-PSSessionConfiguration Disable-WSManCredSSP Disconnect-PSSession Disconnect-WSMan " +
        "Disable-ScheduledJob Enable-ComputerRestore Enable-JobTrigger Enable-PSBreakpoint Enable-PSRemoting Enable-PSSessionConfiguration " +
        "Enable-ScheduledJob Enable-WSManCredSSP Enter-PSSession Exit-PSSession Export-Alias Export-Clixml Export-Console Export-Counter Export-Csv " +
        "Export-FormatData Export-ModuleMember Export-PSSession ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias " +
        "Get-AuthenticodeSignature Get-ChildItem Get-Command Get-ComputerRestorePoint Get-Content Get-ControlPanelItem Get-Counter Get-Credential " +
        "Get-Culture Get-Date Get-Event Get-EventLog Get-EventSubscriber Get-ExecutionPolicy Get-FormatData Get-Host Get-HotFix Get-Help Get-History " +
        "Get-IseSnippet Get-Item Get-ItemProperty Get-Job Get-JobTrigger Get-Location Get-Member Get-Module Get-PfxCertificate Get-Process " +
        "Get-PSBreakpoint Get-PSCallStack Get-PSDrive Get-PSProvider Get-PSSession Get-PSSessionConfiguration Get-PSSnapin Get-Random Get-ScheduledJob " +
        "Get-ScheduledJobOption Get-Service Get-TraceSource Get-Transaction Get-TypeData Get-UICulture Get-Unique Get-Variable Get-Verb Get-WinEvent " +
        "Get-WmiObject Get-WSManCredSSP Get-WSManInstance Group-Object Import-Alias Import-Clixml Import-Counter Import-Csv Import-IseSnippet " +
        "Import-LocalizedData Import-PSSession Import-Module Invoke-AsWorkflow Invoke-Command Invoke-Expression Invoke-History Invoke-Item " +
        "Invoke-RestMethod Invoke-WebRequest Invoke-WmiMethod Invoke-WSManAction Join-Path Limit-EventLog Measure-Command Measure-Object Move-Item " +
        "Move-ItemProperty New-Alias New-Event New-EventLog New-IseSnippet New-Item New-ItemProperty New-JobTrigger New-Object New-Module " +
        "New-ModuleManifest New-PSDrive New-PSSession New-PSSessionConfigurationFile New-PSSessionOption New-PSTransportOption " +
        "New-PSWorkflowExecutionOption New-PSWorkflowSession New-ScheduledJobOption New-Service New-TimeSpan New-Variable New-WebServiceProxy " +
        "New-WinEvent New-WSManInstance New-WSManSessionOption Out-Default Out-File Out-GridView Out-Host Out-Null Out-Printer Out-String Pop-Location " +
        "Push-Location Read-Host Receive-Job Register-EngineEvent Register-ObjectEvent Register-PSSessionConfiguration Register-ScheduledJob " +
        "Register-WmiEvent Remove-Computer Remove-Event Remove-EventLog Remove-Item Remove-ItemProperty Remove-Job Remove-JobTrigger Remove-Module " +
        "Remove-PSBreakpoint Remove-PSDrive Remove-PSSession Remove-PSSnapin Remove-TypeData Remove-Variable Remove-WmiObject Remove-WSManInstance " +
        "Rename-Computer Rename-Item Rename-ItemProperty Reset-ComputerMachinePassword Resolve-Path Restart-Computer Restart-Service Restore-Computer " +
        "Resume-Job Resume-Service Save-Help Select-Object Select-String Select-Xml Send-MailMessage Set-Acl Set-Alias Set-AuthenticodeSignature " +
        "Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-JobTrigger Set-Location Set-PSBreakpoint Set-PSDebug " +
        "Set-PSSessionConfiguration Set-ScheduledJob Set-ScheduledJobOption Set-Service Set-StrictMode Set-TraceSource Set-Variable Set-WmiInstance " +
        "Set-WSManInstance Set-WSManQuickConfig Show-Command Show-ControlPanelItem Show-EventLog Sort-Object Split-Path Start-Job Start-Process " +
        "Start-Service Start-Sleep Start-Transaction Start-Transcript Stop-Computer Stop-Job Stop-Process Stop-Service Stop-Transcript Suspend-Job " +
        "Suspend-Service Tee-Object Test-ComputerSecureChannel Test-Connection Test-ModuleManifest Test-Path Test-PSSessionConfigurationFile " +
        "Trace-Command Unblock-File Undo-Transaction Unregister-Event Unregister-PSSessionConfiguration Unregister-ScheduledJob Update-FormatData " +
        "Update-Help Update-List Update-TypeData Use-Transaction Wait-Event Wait-Job Wait-Process Where-Object Write-Debug Write-Error Write-EventLog " +
        "Write-Host Write-Output Write-Progress Write-Verbose Write-Warning Add-MDTPersistentDrive Disable-MDTMonitorService Enable-MDTMonitorService " +
        "Get-MDTDeploymentShareStatistics Get-MDTMonitorData Get-MDTOperatingSystemCatalog Get-MDTPersistentDrive Import-MDTApplication " +
        "Import-MDTDriver Import-MDTOperatingSystem Import-MDTPackage Import-MDTTaskSequence New-MDTDatabase Remove-MDTMonitorData " +
        "Remove-MDTPersistentDrive Restore-MDTPersistentDrive Set-MDTMonitorData Test-MDTDeploymentShare Test-MDTMonitorData Update-MDTDatabaseSchema " +
        "Update-MDTDeploymentShare Update-MDTLinkedDS Update-MDTMedia Add-VamtProductKey Export-VamtData Find-VamtManagedMachine " +
        "Get-VamtConfirmationId Get-VamtProduct Get-VamtProductKey Import-VamtData Initialize-VamtData Install-VamtConfirmationId " +
        "Install-VamtProductActivation Install-VamtProductKey Update-VamtProduct Add-CIDatastore Add-KeyManagementServer Add-NodeKeys " +
        "Add-NsxDynamicCriteria Add-NsxDynamicMemberSet Add-NsxEdgeInterfaceAddress Add-NsxFirewallExclusionListMember Add-NsxFirewallRuleMember " +
        "Add-NsxIpSetMember Add-NsxLicense Add-NsxLoadBalancerPoolMember Add-NsxLoadBalancerVip Add-NsxSecondaryManager Add-NsxSecurityGroupMember " +
        "Add-NsxSecurityPolicyRule Add-NsxSecurityPolicyRuleGroup Add-NsxSecurityPolicyRuleService Add-NsxServiceGroupMember " +
        "Add-NsxTransportZoneMember Add-PassthroughDevice Add-VDSwitchPhysicalNetworkAdapter Add-VDSwitchVMHost Add-VMHost Add-VMHostNtpServer " +
        "Add-VirtualSwitchPhysicalNetworkAdapter Add-XmlElement Add-vRACustomForm Add-vRAPrincipalToTenantRole Add-vRAReservationNetwork " +
        "Add-vRAReservationStorage Clear-NsxEdgeInterface Clear-NsxManagerTimeSettings Compress-Archive Connect-CIServer Connect-CisServer " +
        "Connect-HCXServer Connect-NIServer Connect-NsxLogicalSwitch Connect-NsxServer Connect-NsxtServer Connect-SrmServer Connect-VIServer " +
        "Connect-Vmc Connect-vRAServer Connect-vRNIServer ConvertFrom-Markdown ConvertTo-MOFInstance Copy-DatastoreItem Copy-HardDisk Copy-NsxEdge " +
        "Copy-VDisk Copy-VMGuestFile Debug-Runspace Disable-NsxEdgeSsh Disable-RunspaceDebug Disable-vRNIDataSource Disconnect-CIServer " +
        "Disconnect-CisServer Disconnect-HCXServer Disconnect-NsxLogicalSwitch Disconnect-NsxServer Disconnect-NsxtServer Disconnect-SrmServer " +
        "Disconnect-VIServer Disconnect-Vmc Disconnect-vRAServer Disconnect-vRNIServer Dismount-Tools Enable-NsxEdgeSsh Enable-RunspaceDebug " +
        "Enable-vRNIDataSource Expand-Archive Export-NsxObject Export-SpbmStoragePolicy Export-VApp Export-VDPortGroup Export-VDSwitch " +
        "Export-VMHostProfile Export-vRAIcon Export-vRAPackage Find-Command Find-DscResource Find-Module Find-NsxWhereVMUsed Find-Package " +
        "Find-PackageProvider Find-RoleCapability Find-Script Format-Hex Format-VMHostDiskPartition Format-XML Generate-VersionInfo " +
        "Get-AdvancedSetting Get-AlarmAction Get-AlarmActionTrigger Get-AlarmDefinition Get-Annotation Get-CDDrive Get-CIAccessControlRule " +
        "Get-CIDatastore Get-CINetworkAdapter Get-CIRole Get-CIUser Get-CIVApp Get-CIVAppNetwork Get-CIVAppStartRule Get-CIVAppTemplate Get-CIVM " +
        "Get-CIVMTemplate Get-CIView Get-Catalog Get-CisCommand Get-CisService Get-CloudCommand Get-Cluster Get-CompatibleVersionAddtionaPropertiesStr " +
        "Get-ComplexResourceQualifier Get-ConfigurationErrorCount Get-ContentLibraryItem Get-CustomAttribute Get-DSCResourceModules Get-Datacenter " +
        "Get-Datastore Get-DatastoreCluster Get-DrsClusterGroup Get-DrsRecommendation Get-DrsRule Get-DrsVMHostRule Get-DscResource Get-EdgeGateway " +
        "Get-EncryptedPassword Get-ErrorReport Get-EsxCli Get-EsxTop Get-ExternalNetwork Get-FileHash Get-FloppyDrive Get-Folder Get-HAPrimaryVMHost " +
        "Get-HCXAppliance Get-HCXApplianceCompute Get-HCXApplianceDVS Get-HCXApplianceDatastore Get-HCXApplianceNetwork Get-HCXContainer " +
        "Get-HCXDatastore Get-HCXGateway Get-HCXInterconnectStatus Get-HCXJob Get-HCXMigration Get-HCXNetwork Get-HCXNetworkExtension " +
        "Get-HCXReplication Get-HCXReplicationSnapshot Get-HCXService Get-HCXSite Get-HCXSitePairing Get-HCXVM Get-HardDisk Get-IScsiHbaTarget " +
        "Get-InnerMostErrorRecord Get-InstallPath Get-InstalledModule Get-InstalledScript Get-Inventory Get-ItemPropertyValue Get-KeyManagementServer " +
        "Get-KmipClientCertificate Get-KmsCluster Get-Log Get-LogType Get-MarkdownOption Get-Media Get-MofInstanceName Get-MofInstanceText Get-NetworkAdapter Get-NetworkPool " +
        "Get-NfsUser Get-NicTeamingPolicy Get-NsxApplicableMember Get-NsxApplicableSecurityAction Get-NsxBackingDVSwitch Get-NsxBackingPortGroup Get-NsxCliDfwAddrSet " +
        "Get-NsxCliDfwFilter Get-NsxCliDfwRule Get-NsxClusterStatus Get-NsxController Get-NsxDynamicCriteria Get-NsxDynamicMemberSet Get-NsxEdge Get-NsxEdgeBgp " +
        "Get-NsxEdgeBgpNeighbour Get-NsxEdgeCertificate Get-NsxEdgeCsr Get-NsxEdgeFirewall Get-NsxEdgeFirewallRule Get-NsxEdgeInterface Get-NsxEdgeInterfaceAddress " +
        "Get-NsxEdgeNat Get-NsxEdgeNatRule Get-NsxEdgeOspf Get-NsxEdgeOspfArea Get-NsxEdgeOspfInterface Get-NsxEdgePrefix Get-NsxEdgeRedistributionRule Get-NsxEdgeRouting " +
        "Get-NsxEdgeStaticRoute Get-NsxEdgeSubInterface Get-NsxFirewallExclusionListMember Get-NsxFirewallGlobalConfiguration Get-NsxFirewallPublishStatus Get-NsxFirewallRule " +
        "Get-NsxFirewallRuleMember Get-NsxFirewallSavedConfiguration Get-NsxFirewallSection Get-NsxFirewallThreshold Get-NsxIpPool Get-NsxIpSet Get-NsxLicense Get-NsxLoadBalancer " +
        "Get-NsxLoadBalancerApplicationProfile Get-NsxLoadBalancerApplicationRule Get-NsxLoadBalancerMonitor Get-NsxLoadBalancerPool Get-NsxLoadBalancerPoolMember Get-NsxLoadBalancerStats " +
        "Get-NsxLoadBalancerVip Get-NsxLogicalRouter Get-NsxLogicalRouterBgp Get-NsxLogicalRouterBgpNeighbour Get-NsxLogicalRouterBridge Get-NsxLogicalRouterBridging " +
        "Get-NsxLogicalRouterInterface Get-NsxLogicalRouterOspf Get-NsxLogicalRouterOspfArea Get-NsxLogicalRouterOspfInterface Get-NsxLogicalRouterPrefix " +
        "Get-NsxLogicalRouterRedistributionRule Get-NsxLogicalRouterRouting Get-NsxLogicalRouterStaticRoute Get-NsxLogicalSwitch Get-NsxMacSet Get-NsxManagerBackup " +
        "Get-NsxManagerCertificate Get-NsxManagerComponentSummary Get-NsxManagerNetwork Get-NsxManagerRole Get-NsxManagerSsoConfig Get-NsxManagerSyncStatus Get-NsxManagerSyslogServer " +
        "Get-NsxManagerSystemSummary Get-NsxManagerTimeSettings Get-NsxManagerVcenterConfig Get-NsxSecondaryManager Get-NsxSecurityGroup Get-NsxSecurityGroupEffectiveIpAddress " +
        "Get-NsxSecurityGroupEffectiveMacAddress Get-NsxSecurityGroupEffectiveMember Get-NsxSecurityGroupEffectiveVirtualMachine Get-NsxSecurityGroupEffectiveVnic " +
        "Get-NsxSecurityGroupMemberTypes Get-NsxSecurityPolicy Get-NsxSecurityPolicyHighestUsedPrecedence Get-NsxSecurityPolicyRule Get-NsxSecurityTag Get-NsxSecurityTagAssignment " +
        "Get-NsxSegmentIdRange Get-NsxService Get-NsxServiceDefinition Get-NsxServiceGroup Get-NsxServiceGroupMember Get-NsxServiceProfile Get-NsxSpoofguardNic Get-NsxSpoofguardPolicy " +
        "Get-NsxSslVpn Get-NsxSslVpnAuthServer Get-NsxSslVpnClientInstallationPackage Get-NsxSslVpnIpPool Get-NsxSslVpnPrivateNetwork Get-NsxSslVpnUser Get-NsxTransportZone " +
        "Get-NsxUserRole Get-NsxVdsContext Get-NsxtPolicyService Get-NsxtService Get-OSCustomizationNicMapping Get-OSCustomizationSpec Get-Org Get-OrgNetwork Get-OrgVdc " +
        "Get-OrgVdcNetwork Get-OvfConfiguration Get-PSCurrentConfigurationNode Get-PSDefaultConfigurationDocument Get-PSMetaConfigDocumentInstVersionInfo Get-PSMetaConfigurationProcessed " +
        "Get-PSReadLineKeyHandler Get-PSReadLineOption Get-PSRepository Get-PSTopConfigurationName Get-PSVersion Get-Package Get-PackageProvider Get-PackageSource Get-PassthroughDevice " +
        "Get-PositionInfo Get-PowerCLICommunity Get-PowerCLIConfiguration Get-PowerCLIHelp Get-PowerCLIVersion Get-PowerNsxVersion Get-ProviderVdc Get-PublicKeyFromFile " +
        "Get-PublicKeyFromStore Get-ResourcePool Get-Runspace Get-RunspaceDebug Get-ScsiController Get-ScsiLun Get-ScsiLunPath Get-SecurityInfo Get-SecurityPolicy Get-Snapshot " +
        "Get-SpbmCapability Get-SpbmCompatibleStorage Get-SpbmEntityConfiguration Get-SpbmFaultDomain Get-SpbmPointInTimeReplica Get-SpbmReplicationGroup Get-SpbmReplicationPair " +
        "Get-SpbmStoragePolicy Get-Stat Get-StatInterval Get-StatType Get-Tag Get-TagAssignment Get-TagCategory Get-Task Get-Template Get-TimeZone Get-Uptime Get-UsbDevice Get-VAIOFilter " +
        "Get-VApp Get-VDBlockedPolicy Get-VDPort Get-VDPortgroup Get-VDPortgroupOverridePolicy Get-VDSecurityPolicy Get-VDSwitch Get-VDSwitchPrivateVlan Get-VDTrafficShapingPolicy " +
        "Get-VDUplinkLacpPolicy Get-VDUplinkTeamingPolicy Get-VDisk Get-VIAccount Get-VICommand Get-VICredentialStoreItem Get-VIEvent Get-VIObjectByVIView Get-VIPermission Get-VIPrivilege " +
        "Get-VIProperty Get-VIRole Get-VM Get-VMGuest Get-VMHost Get-VMHostAccount Get-VMHostAdvancedConfiguration Get-VMHostAuthentication Get-VMHostAvailableTimeZone " +
        "Get-VMHostDiagnosticPartition Get-VMHostDisk Get-VMHostDiskPartition Get-VMHostFirewallDefaultPolicy Get-VMHostFirewallException Get-VMHostFirmware Get-VMHostHardware " +
        "Get-VMHostHba Get-VMHostModule Get-VMHostNetwork Get-VMHostNetworkAdapter Get-VMHostNtpServer Get-VMHostPatch Get-VMHostPciDevice Get-VMHostProfile " +
        "Get-VMHostProfileImageCacheConfiguration Get-VMHostProfileRequiredInput Get-VMHostProfileStorageDeviceConfiguration Get-VMHostProfileUserConfiguration " +
        "Get-VMHostProfileVmPortGroupConfiguration Get-VMHostRoute Get-VMHostService Get-VMHostSnmp Get-VMHostStartPolicy Get-VMHostStorage Get-VMHostSysLogServer Get-VMQuestion " +
        "Get-VMResourceConfiguration Get-VMStartPolicy Get-VTpm Get-VTpmCSR Get-VTpmCertificate Get-VasaProvider Get-VasaStorageArray Get-View Get-VirtualPortGroup Get-VirtualSwitch " +
        "Get-VmcSddcNetworkService Get-VmcService Get-VsanClusterConfiguration Get-VsanComponent Get-VsanDisk Get-VsanDiskGroup Get-VsanEvacuationPlan Get-VsanFaultDomain " +
        "Get-VsanIscsiInitiatorGroup Get-VsanIscsiInitiatorGroupTargetAssociation Get-VsanIscsiLun Get-VsanIscsiTarget Get-VsanObject Get-VsanResyncingComponent Get-VsanRuntimeInfo " +
        "Get-VsanSpaceUsage Get-VsanStat Get-VsanView Get-vRAApplianceServiceStatus Get-vRAAuthorizationRole Get-vRABlueprint Get-vRABusinessGroup Get-vRACatalogItem " +
        "Get-vRACatalogItemRequestTemplate Get-vRACatalogPrincipal Get-vRAComponentRegistryService Get-vRAComponentRegistryServiceEndpoint Get-vRAComponentRegistryServiceStatus " +
        "Get-vRAContent Get-vRAContentData Get-vRAContentType Get-vRACustomForm Get-vRAEntitledCatalogItem Get-vRAEntitledService Get-vRAEntitlement Get-vRAExternalNetworkProfile " +
        "Get-vRAGroupPrincipal Get-vRAIcon Get-vRANATNetworkProfile Get-vRANetworkProfileIPAddressList Get-vRANetworkProfileIPRangeSummary Get-vRAPackage Get-vRAPackageContent " +
        "Get-vRAPropertyDefinition Get-vRAPropertyGroup Get-vRARequest Get-vRARequestDetail Get-vRAReservation Get-vRAReservationComputeResource Get-vRAReservationComputeResourceMemory " +
        "Get-vRAReservationComputeResourceNetwork Get-vRAReservationComputeResourceResourcePool Get-vRAReservationComputeResourceStorage Get-vRAReservationPolicy " +
        "Get-vRAReservationTemplate Get-vRAReservationType Get-vRAResource Get-vRAResourceAction Get-vRAResourceActionRequestTemplate Get-vRAResourceMetric Get-vRAResourceOperation " +
        "Get-vRAResourceType Get-vRARoutedNetworkProfile Get-vRAService Get-vRAServiceBlueprint Get-vRASourceMachine Get-vRAStorageReservationPolicy Get-vRATenant Get-vRATenantDirectory " +
        "Get-vRATenantDirectoryStatus Get-vRATenantRole Get-vRAUserPrincipal Get-vRAUserPrincipalGroupMembership Get-vRAVersion Get-vRNIAPIVersion Get-vRNIApplication " +
        "Get-vRNIApplicationTier Get-vRNIDataSource Get-vRNIDataSourceSNMPConfig Get-vRNIDatastore Get-vRNIDistributedSwitch Get-vRNIDistributedSwitchPortGroup Get-vRNIEntity " +
        "Get-vRNIEntityName Get-vRNIFirewallRule Get-vRNIFlow Get-vRNIHost Get-vRNIHostVMKNic Get-vRNIIPSet Get-vRNIL2Network Get-vRNINSXManager Get-vRNINodes Get-vRNIProblem " +
        "Get-vRNIRecommendedRules Get-vRNIRecommendedRulesNsxBundle Get-vRNISecurityGroup Get-vRNISecurityTag Get-vRNIService Get-vRNIServiceGroup Get-vRNIVM Get-vRNIVMvNIC " +
        "Get-vRNIvCenter Get-vRNIvCenterCluster Get-vRNIvCenterDatacenter Get-vRNIvCenterFolder Grant-NsxSpoofguardNicApproval Import-CIVApp Import-CIVAppTemplate Import-NsxObject " +
        "Import-PackageProvider Import-PowerShellDataFile Import-SpbmStoragePolicy Import-VApp Import-VMHostProfile Import-vRAContentData Import-vRAIcon Import-vRAPackage " +
        "Initialize-ConfigurationRuntimeState Install-Module Install-NsxCluster Install-Package Install-PackageProvider Install-Script Install-VMHostPatch Invoke-DrsRecommendation " +
        "Invoke-NsxCli Invoke-NsxClusterResolveAll Invoke-NsxManagerSync Invoke-NsxRestMethod Invoke-NsxWebRequest Invoke-VMHostProfile Invoke-VMScript Invoke-XpathQuery " +
        "Invoke-vRADataCollection Invoke-vRARestMethod Invoke-vRATenantDirectorySync Invoke-vRNIRestMethod Join-String Mount-Tools Move-Cluster Move-Datacenter Move-Datastore Move-Folder " +
        "Move-HardDisk Move-Inventory Move-NsxSecurityPolicyRule Move-ResourcePool Move-Template Move-VApp Move-VDisk Move-VM Move-VMHost New-AdvancedSetting New-AlarmAction " +
        "New-AlarmActionTrigger New-CDDrive New-CIAccessControlRule New-CIVApp New-CIVAppNetwork New-CIVAppTemplate New-CIVM New-Cluster New-CustomAttribute New-Datacenter New-Datastore " +
        "New-DatastoreCluster New-DatastoreDrive New-DrsClusterGroup New-DrsRule New-DrsVMHostRule New-DscChecksum New-FloppyDrive New-Folder New-Guid New-HCXAppliance New-HCXMigration " +
        "New-HCXNetworkExtension New-HCXNetworkMapping New-HCXReplication New-HCXSitePairing New-HCXStaticRoute New-HardDisk New-IScsiHbaTarget New-KmipClientCertificate " +
        "New-NetworkAdapter New-NfsUser New-NsxAddressSpec New-NsxClusterVxlanConfig New-NsxController New-NsxDynamicCriteriaSpec New-NsxEdge New-NsxEdgeBgpNeighbour New-NsxEdgeCsr " +
        "New-NsxEdgeFirewallRule New-NsxEdgeInterfaceSpec New-NsxEdgeNatRule New-NsxEdgeOspfArea New-NsxEdgeOspfInterface New-NsxEdgePrefix New-NsxEdgeRedistributionRule " +
        "New-NsxEdgeSelfSignedCertificate New-NsxEdgeStaticRoute New-NsxEdgeSubInterface New-NsxEdgeSubInterfaceSpec New-NsxFirewallRule New-NsxFirewallSavedConfiguration " +
        "New-NsxFirewallSection New-NsxIpPool New-NsxIpSet New-NsxLoadBalancerApplicationProfile New-NsxLoadBalancerApplicationRule New-NsxLoadBalancerMemberSpec " +
        "New-NsxLoadBalancerMonitor New-NsxLoadBalancerPool New-NsxLogicalRouter New-NsxLogicalRouterBgpNeighbour New-NsxLogicalRouterBridge New-NsxLogicalRouterInterface " +
        "New-NsxLogicalRouterInterfaceSpec New-NsxLogicalRouterOspfArea New-NsxLogicalRouterOspfInterface New-NsxLogicalRouterPrefix New-NsxLogicalRouterRedistributionRule " +
        "New-NsxLogicalRouterStaticRoute New-NsxLogicalSwitch New-NsxMacSet New-NsxManager New-NsxSecurityGroup New-NsxSecurityPolicy New-NsxSecurityPolicyAssignment " +
        "New-NsxSecurityPolicyFirewallRuleSpec New-NsxSecurityPolicyGuestIntrospectionSpec New-NsxSecurityPolicyNetworkIntrospectionSpec New-NsxSecurityTag New-NsxSecurityTagAssignment " +
        "New-NsxSegmentIdRange New-NsxService New-NsxServiceGroup New-NsxSpoofguardPolicy New-NsxSslVpnAuthServer New-NsxSslVpnClientInstallationPackage New-NsxSslVpnIpPool " +
        "New-NsxSslVpnPrivateNetwork New-NsxSslVpnUser New-NsxTransportZone New-NsxVdsContext New-OSCustomizationNicMapping New-OSCustomizationSpec New-Org New-OrgNetwork New-OrgVdc " +
        "New-OrgVdcNetwork New-ResourcePool New-ScriptFileInfo New-ScsiController New-Snapshot New-SpbmRule New-SpbmRuleSet New-SpbmStoragePolicy New-StatInterval New-Tag " +
        "New-TagAssignment New-TagCategory New-Template New-TemporaryFile New-VAIOFilter New-VApp New-VDPortgroup New-VDSwitch New-VDSwitchPrivateVlan New-VDisk " +
        "New-VICredentialStoreItem New-VIInventoryDrive New-VIPermission New-VIProperty New-VIRole New-VISamlSecurityContext New-VM New-VMHostAccount New-VMHostNetworkAdapter " +
        "New-VMHostProfile New-VMHostProfileVmPortGroupConfiguration New-VMHostRoute New-VTpm New-VasaProvider New-VcsOAuthSecurityContext New-VirtualPortGroup New-VirtualSwitch " +
        "New-VsanDisk New-VsanDiskGroup New-VsanFaultDomain New-VsanIscsiInitiatorGroup New-VsanIscsiInitiatorGroupTargetAssociation New-VsanIscsiLun New-VsanIscsiTarget " +
        "New-vRABusinessGroup New-vRAEntitlement New-vRAExternalNetworkProfile New-vRAGroupPrincipal New-vRANATNetworkProfile New-vRANetworkProfileIPRangeDefinition New-vRAPackage " +
        "New-vRAPropertyDefinition New-vRAPropertyGroup New-vRAReservation New-vRAReservationNetworkDefinition New-vRAReservationPolicy New-vRAReservationStorageDefinition " +
        "New-vRARoutedNetworkProfile New-vRAService New-vRAStorageReservationPolicy New-vRATenant New-vRATenantDirectory New-vRAUserPrincipal New-vRNIApplication New-vRNIApplicationTier " +
        "New-vRNIDataSource Open-VMConsoleWindow Publish-Module Publish-NsxSpoofguardPolicy Publish-Script Register-PSRepository Register-PackageSource Remove-AdvancedSetting " +
        "Remove-AlarmAction Remove-AlarmActionTrigger Remove-Alias Remove-CDDrive Remove-CIAccessControlRule Remove-CIVApp Remove-CIVAppNetwork Remove-CIVAppTemplate Remove-Cluster " +
        "Remove-CustomAttribute Remove-Datacenter Remove-Datastore Remove-DatastoreCluster Remove-DrsClusterGroup Remove-DrsRule Remove-DrsVMHostRule Remove-FloppyDrive Remove-Folder " +
        "Remove-HCXAppliance Remove-HCXNetworkExtension Remove-HCXReplication Remove-HCXSitePairing Remove-HardDisk Remove-IScsiHbaTarget Remove-Inventory Remove-KeyManagementServer " +
        "Remove-NetworkAdapter Remove-NfsUser Remove-NsxCluster Remove-NsxClusterVxlanConfig Remove-NsxController Remove-NsxDynamicCriteria Remove-NsxDynamicMemberSet Remove-NsxEdge " +
        "Remove-NsxEdgeBgpNeighbour Remove-NsxEdgeCertificate Remove-NsxEdgeCsr Remove-NsxEdgeFirewallRule Remove-NsxEdgeInterfaceAddress Remove-NsxEdgeNatRule Remove-NsxEdgeOspfArea " +
        "Remove-NsxEdgeOspfInterface Remove-NsxEdgePrefix Remove-NsxEdgeRedistributionRule Remove-NsxEdgeStaticRoute Remove-NsxEdgeSubInterface Remove-NsxFirewallExclusionListMember " +
        "Remove-NsxFirewallRule Remove-NsxFirewallRuleMember Remove-NsxFirewallSavedConfiguration Remove-NsxFirewallSection Remove-NsxIpPool Remove-NsxIpSet Remove-NsxIpSetMember " +
        "Remove-NsxLoadBalancerApplicationProfile Remove-NsxLoadBalancerMonitor Remove-NsxLoadBalancerPool Remove-NsxLoadBalancerPoolMember Remove-NsxLoadBalancerVip " +
        "Remove-NsxLogicalRouter Remove-NsxLogicalRouterBgpNeighbour Remove-NsxLogicalRouterBridge Remove-NsxLogicalRouterInterface Remove-NsxLogicalRouterOspfArea " +
        "Remove-NsxLogicalRouterOspfInterface Remove-NsxLogicalRouterPrefix Remove-NsxLogicalRouterRedistributionRule Remove-NsxLogicalRouterStaticRoute Remove-NsxLogicalSwitch " +
        "Remove-NsxMacSet Remove-NsxSecondaryManager Remove-NsxSecurityGroup Remove-NsxSecurityGroupMember Remove-NsxSecurityPolicy Remove-NsxSecurityPolicyAssignment " +
        "Remove-NsxSecurityPolicyRule Remove-NsxSecurityPolicyRuleGroup Remove-NsxSecurityPolicyRuleService Remove-NsxSecurityTag Remove-NsxSecurityTagAssignment " +
        "Remove-NsxSegmentIdRange Remove-NsxService Remove-NsxServiceGroup Remove-NsxSpoofguardPolicy Remove-NsxSslVpnClientInstallationPackage Remove-NsxSslVpnIpPool " +
        "Remove-NsxSslVpnPrivateNetwork Remove-NsxSslVpnUser Remove-NsxTransportZone Remove-NsxTransportZoneMember Remove-NsxVdsContext Remove-OSCustomizationNicMapping " +
        "Remove-OSCustomizationSpec Remove-Org Remove-OrgNetwork Remove-OrgVdc Remove-OrgVdcNetwork Remove-PSReadLineKeyHandler Remove-PassthroughDevice Remove-ResourcePool " +
        "Remove-Snapshot Remove-SpbmStoragePolicy Remove-StatInterval Remove-Tag Remove-TagAssignment Remove-TagCategory Remove-Template Remove-UsbDevice Remove-VAIOFilter Remove-VApp " +
        "Remove-VDPortGroup Remove-VDSwitch Remove-VDSwitchPhysicalNetworkAdapter Remove-VDSwitchPrivateVlan Remove-VDSwitchVMHost Remove-VDisk Remove-VICredentialStoreItem " +
        "Remove-VIPermission Remove-VIProperty Remove-VIRole Remove-VM Remove-VMHost Remove-VMHostAccount Remove-VMHostNetworkAdapter Remove-VMHostNtpServer Remove-VMHostProfile " +
        "Remove-VMHostProfileVmPortGroupConfiguration Remove-VMHostRoute Remove-VTpm Remove-VasaProvider Remove-VirtualPortGroup Remove-VirtualSwitch " +
        "Remove-VirtualSwitchPhysicalNetworkAdapter Remove-VsanDisk Remove-VsanDiskGroup Remove-VsanFaultDomain Remove-VsanIscsiInitiatorGroup " +
        "Remove-VsanIscsiInitiatorGroupTargetAssociation Remove-VsanIscsiLun Remove-VsanIscsiTarget Remove-vRABusinessGroup Remove-vRACustomForm Remove-vRAExternalNetworkProfile " +
        "Remove-vRAGroupPrincipal Remove-vRAIcon Remove-vRANATNetworkProfile Remove-vRAPackage Remove-vRAPrincipalFromTenantRole Remove-vRAPropertyDefinition Remove-vRAPropertyGroup " +
        "Remove-vRAReservation Remove-vRAReservationNetwork Remove-vRAReservationPolicy Remove-vRAReservationStorage Remove-vRARoutedNetworkProfile Remove-vRAService " +
        "Remove-vRAStorageReservationPolicy Remove-vRATenant Remove-vRATenantDirectory Remove-vRAUserPrincipal Remove-vRNIApplication Remove-vRNIApplicationTier Remove-vRNIDataSource " +
        "Repair-NsxEdge Repair-VsanObject Request-vRACatalogItem Request-vRAResourceAction Restart-CIVApp Restart-CIVAppGuest Restart-CIVM Restart-CIVMGuest Restart-VM Restart-VMGuest " +
        "Restart-VMHost Restart-VMHostService Resume-HCXReplication Revoke-NsxSpoofguardNicApproval Save-Module Save-Package Save-Script Search-Cloud Set-AdvancedSetting " +
        "Set-AlarmDefinition Set-Annotation Set-CDDrive Set-CIAccessControlRule Set-CINetworkAdapter Set-CIVApp Set-CIVAppNetwork Set-CIVAppStartRule Set-CIVAppTemplate Set-Cluster " +
        "Set-CustomAttribute Set-Datacenter Set-Datastore Set-DatastoreCluster Set-DrsClusterGroup Set-DrsRule Set-DrsVMHostRule Set-FloppyDrive Set-Folder Set-HCXAppliance " +
        "Set-HCXMigration Set-HCXReplication Set-HardDisk Set-IScsiHbaTarget Set-KeyManagementServer Set-KmsCluster Set-MarkdownOption Set-NetworkAdapter Set-NfsUser Set-NicTeamingPolicy " +
        "Set-NodeExclusiveResources Set-NodeManager Set-NodeResourceSource Set-NodeResources Set-NsxEdge Set-NsxEdgeBgp Set-NsxEdgeFirewall Set-NsxEdgeInterface Set-NsxEdgeNat " +
        "Set-NsxEdgeOspf Set-NsxEdgeRouting Set-NsxFirewallGlobalConfiguration Set-NsxFirewallRule Set-NsxFirewallSavedConfiguration Set-NsxFirewallThreshold Set-NsxLoadBalancer " +
        "Set-NsxLoadBalancerPoolMember Set-NsxLogicalRouter Set-NsxLogicalRouterBgp Set-NsxLogicalRouterBridging Set-NsxLogicalRouterInterface Set-NsxLogicalRouterOspf " +
        "Set-NsxLogicalRouterRouting Set-NsxManager Set-NsxManagerRole Set-NsxManagerTimeSettings Set-NsxSecurityPolicy Set-NsxSecurityPolicyFirewallRule Set-NsxSslVpn " +
        "Set-OSCustomizationNicMapping Set-OSCustomizationSpec Set-Org Set-OrgNetwork Set-OrgVdc Set-OrgVdcNetwork Set-PSCurrentConfigurationNode Set-PSDefaultConfigurationDocument " +
        "Set-PSMetaConfigDocInsProcessedBeforeMeta Set-PSMetaConfigVersionInfoV2 Set-PSReadLineKeyHandler Set-PSReadLineOption Set-PSRepository Set-PSTopConfigurationName " +
        "Set-PackageSource Set-PowerCLIConfiguration Set-ResourcePool Set-ScsiController Set-ScsiLun Set-ScsiLunPath Set-SecurityPolicy Set-Snapshot Set-SpbmEntityConfiguration " +
        "Set-SpbmStoragePolicy Set-StatInterval Set-Tag Set-TagCategory Set-Template Set-VAIOFilter Set-VApp Set-VDBlockedPolicy Set-VDPort Set-VDPortgroup Set-VDPortgroupOverridePolicy " +
        "Set-VDSecurityPolicy Set-VDSwitch Set-VDTrafficShapingPolicy Set-VDUplinkLacpPolicy Set-VDUplinkTeamingPolicy Set-VDVlanConfiguration Set-VDisk Set-VIPermission Set-VIRole Set-VM " +
        "Set-VMHost Set-VMHostAccount Set-VMHostAdvancedConfiguration Set-VMHostAuthentication Set-VMHostDiagnosticPartition Set-VMHostFirewallDefaultPolicy Set-VMHostFirewallException " +
        "Set-VMHostFirmware Set-VMHostHba Set-VMHostModule Set-VMHostNetwork Set-VMHostNetworkAdapter Set-VMHostProfile Set-VMHostProfileImageCacheConfiguration " +
        "Set-VMHostProfileStorageDeviceConfiguration Set-VMHostProfileUserConfiguration Set-VMHostProfileVmPortGroupConfiguration Set-VMHostRoute Set-VMHostService Set-VMHostSnmp " +
        "Set-VMHostStartPolicy Set-VMHostStorage Set-VMHostSysLogServer Set-VMQuestion Set-VMResourceConfiguration Set-VMStartPolicy Set-VTpm Set-VirtualPortGroup Set-VirtualSwitch " +
        "Set-VsanClusterConfiguration Set-VsanFaultDomain Set-VsanIscsiInitiatorGroup Set-VsanIscsiLun Set-VsanIscsiTarget Set-vRABusinessGroup Set-vRACatalogItem Set-vRACustomForm " +
        "Set-vRAEntitlement Set-vRAExternalNetworkProfile Set-vRANATNetworkProfile Set-vRAReservation Set-vRAReservationNetwork Set-vRAReservationPolicy Set-vRAReservationStorage " +
        "Set-vRARoutedNetworkProfile Set-vRAService Set-vRAStorageReservationPolicy Set-vRATenant Set-vRATenantDirectory Set-vRAUserPrincipal Set-vRNIDataSourceSNMPConfig Show-Markdown " +
        "Start-CIVApp Start-CIVM Start-HCXMigration Start-HCXReplication Start-SpbmReplicationFailover Start-SpbmReplicationPrepareFailover Start-SpbmReplicationPromote " +
        "Start-SpbmReplicationReverse Start-SpbmReplicationTestFailover Start-ThreadJob Start-VApp Start-VM Start-VMHost Start-VMHostService Start-VsanClusterDiskUpdate " +
        "Start-VsanClusterRebalance Start-VsanEncryptionConfiguration Stop-CIVApp Stop-CIVAppGuest Stop-CIVM Stop-CIVMGuest Stop-SpbmReplicationTestFailover Stop-Task Stop-VApp Stop-VM " +
        "Stop-VMGuest Stop-VMHost Stop-VMHostService Stop-VsanClusterRebalance Suspend-CIVApp Suspend-CIVM Suspend-HCXReplication Suspend-VM Suspend-VMGuest Suspend-VMHost " +
        "Sync-SpbmReplicationGroup Test-ConflictingResources Test-HCXMigration Test-HCXReplication Test-Json Test-ModuleReloadRequired Test-MofInstanceText Test-NodeManager " +
        "Test-NodeResourceSource Test-NodeResources Test-ScriptFileInfo Test-VMHostProfileCompliance Test-VMHostSnmp Test-VsanClusterHealth Test-VsanNetworkPerformance " +
        "Test-VsanStoragePerformance Test-VsanVMCreation Test-vRAPackage Uninstall-Module Uninstall-Package Uninstall-Script Unlock-VM Unregister-PSRepository Unregister-PackageSource " +
        "Update-ConfigurationDocumentRef Update-ConfigurationErrorCount Update-DependsOn Update-LocalConfigManager Update-Module Update-ModuleManifest Update-ModuleVersion Update-PowerNsx " +
        "Update-Script Update-ScriptFileInfo Update-Tools Update-VsanHclDatabase ValidateUpdate-ConfigurationData Wait-Debugger Wait-NsxControllerJob Wait-NsxGenericJob Wait-NsxJob " +
        "Wait-Task Wait-Tools Write-Information Write-Log Write-MetaConfigFile Write-NodeMOFFile",
      nomarkup:
        "-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace",
    },
    contains: [
      BACKTICK_ESCAPE,
      hljs.NUMBER_MODE,
      QUOTE_STRING,
      APOS_STRING,
      LITERAL,
      VAR,
      PS_COMMENT,
    ],
  };
};
},{}]},{},["21d1b971fec632fbcc50e15a220aa332"], null)

//# sourceMappingURL=powershell.5d97699b.js.map
