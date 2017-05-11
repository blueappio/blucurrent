function SettingsController(e,t,n){function a(t,n,a,r){localStorage.setItem("c_units",e.units),localStorage.setItem("c_unitMinValue",t),localStorage.setItem("c_unitMaxValue",n),localStorage.setItem("c_currentMinValue",a),localStorage.setItem("c_currentMaxValue",r);var i=Number(n)-Number(t),u=Number(r)-Number(a),o=u/i;localStorage.setItem("c_scaleVal",o)}e.units="",e.unitMinValue="",e.unitMaxValue="",e.currentMinValue="",e.currentMaxValue="",localStorage.getItem("c_units")&&localStorage.getItem("c_unitMinValue")&&localStorage.getItem("c_unitMaxValue")?(e.units=localStorage.getItem("c_units"),e.unitMinValue=Number(localStorage.getItem("c_unitMinValue")),e.unitMaxValue=Number(localStorage.getItem("c_unitMaxValue"))):(e.units="mA",e.unitMinValue=4,e.unitMaxValue=20),localStorage.getItem("c_currentMinValue")&&localStorage.getItem("c_currentMaxValue")?(e.currentMinValue=Number(localStorage.getItem("c_currentMinValue")),e.currentMaxValue=Number(localStorage.getItem("c_currentMaxValue"))):(e.currentMinValue=4,e.currentMaxValue=20),e.keyDown=function(t){e.err="",t.keyCode&&13===t.keyCode&&e.submitClick()},e.submitClick=function(){e.err="";var t=document.getElementById("unit_minVal"),n=document.getElementById("unit_maxVal"),r=document.getElementById("current_minVal"),i=document.getElementById("current_maxVal");return e.units?isNaN(e.units)?0!==t.value&&void 0==t.value||0!==t.value&&""==t.value?void(e.err="* Unit min value is required"):0!==n.value&&void 0==n.value||0!==n.value&&""==n.value?void(e.err="* Unit max value is required"):0!==r.value&&void 0==r.value||0!==r.value&&""==r.value?void(e.err="* Current min value is required"):0!==i.value&&void 0==i.value||0!==i.value&&""==i.value?void(e.err="* Current max value is required"):(a(t.value,n.value,r.value,i.value),void e.cancelClick()):void(e.err="* Unit name should not be number"):(e.err="* Unit is required",!1)},e.resetClick=function(){e.units="mA",e.unitMinValue=4,e.unitMaxValue=20,e.currentMinValue=4,e.currentMaxValue=20,a(e.unitMinValue,e.unitMaxValue,e.currentMinValue,e.currentMaxValue)},e.cancelClick=function(){n.cancel()}}function disableMouseClick(){document.addEventListener("contextmenu",function(e){e.preventDefault()})}SettingsController.$inject=["$scope","$mdToast","$mdDialog"];var app;!function(){app=angular.module("blucurrent",["ngMaterial","ngMdIcons","ngMessages"]).config(["$mdThemingProvider",function(e){e.theme("default").primaryPalette("blue").accentPalette("indigo"),e.theme("success-toast"),e.theme("error-toast"),e.alwaysWatchTheme(!0)}])}(),disableMouseClick();for(var match,pl=/\+/g,search=/([^&=]+)=?([^&]*)/g,decode=function(e){return decodeURIComponent(e.replace(pl," "))},query=window.location.search.substring(1),urlParams={};match=search.exec(query);)urlParams[decode(match[1])]=decode(match[2]);var cordovaApp=urlParams.app;!function(){"use strict";angular.module("blucurrent").service("bluCurrentService",function(){return new BluCurrent})}();var BluCurrent=function(){function e(){u=this,this.connected=!1,this.relayCharacteristic=void 0,this.hardwareCharacteristic=void 0,this.softwareCharacteristic=void 0,this.hasRelayCharacteristic=!1,this.relayStatus=void 0,this.bluetoothDevice=void 0,this.hardwareVersion=void 0,this.softwareVersion=void 0,this.currentValue=void 0,this.shuntValue=void 0,this.busValue=void 0,this.externalValueReceiver}function t(){u.connected=!1,u.relayCharacteristic=void 0,u.relayStatus=void 0,u.bluetoothDevice=void 0,u.hardwareVersion=void 0,u.softwareVersion=void 0}function n(e){u.currentValue=i(e),u.externalValueReceiver&&u.externalValueReceiver("current")}function a(e){u.shuntValue=i(e),u.externalValueReceiver&&u.externalValueReceiver("shunt")}function r(e){u.busValue=i(e),u.externalValueReceiver&&u.externalValueReceiver("bus")}function i(e){for(var t=new Uint8Array(e.buffer),n="",a=0;a<t.length;a++)n+=t[a].toString(16);return n=parseInt(n,16),n=.01*n}var u,o="e4dc0001-29c4-11e7-a2cb-354fddf992ab",l="e4dc0003-29c4-11e7-a2cb-354fddf992ab",c="e4dc0004-29c4-11e7-a2cb-354fddf992ab",s="e4dc0006-29c4-11e7-a2cb-354fddf992ab",d="299f0001-094d-4f6d-b472-3a25bf4c3916",g="299f0002-094d-4f6d-b472-3a25bf4c3916",m=6154,h=10791,v=10792;return e.prototype.connect=function(){var e={filters:[{services:[o]}]};return navigator.bluetooth.requestDevice(e).then(function(e){return u.bluetoothDevice=e,u.bluetoothDevice.on("gattserverdisconnected",function(){t(),u.externalValueReceiver&&u.externalValueReceiver("disconnect")}),e.gatt.connect()}).then(function(e){return Promise.all([e.getPrimaryService(m).then(function(e){e.getCharacteristic(h).then(function(e){u.hardwareCharacteristic=e,e.readValue().then(function(e){for(var t="",n=0;n<e.byteLength;n++)t+=String.fromCharCode(e.getUint8(n));t=t.trim(),u.hardwareVersion=t,void 0!==u.softwareVersion&&u.externalValueReceiver&&u.externalValueReceiver("updateFirmware")})}),e.getCharacteristic(v).then(function(e){u.softwareCharacteristic=e,e.readValue().then(function(e){for(var t="",n=0;n<e.byteLength;n++)t+=String.fromCharCode(e.getUint8(n));t=t.trim(),u.softwareVersion=t,void 0!==u.hardwareVersion&&u.externalValueReceiver&&u.externalValueReceiver("updateFirmware")})})},function(e){Promise.resolve(!0)}),e.getPrimaryService(o).then(function(e){e.getCharacteristic(s).then(function(e){return e.startNotifications().then(function(){e.addEventListener("characteristicvaluechanged",function(e){n(e.target.value)})})}),e.getCharacteristic(l).then(function(e){return e.startNotifications().then(function(){e.addEventListener("characteristicvaluechanged",function(e){a(e.target.value)})})}),e.getCharacteristic(c).then(function(e){return e.startNotifications().then(function(){e.addEventListener("characteristicvaluechanged",function(e){r(e.target.value)})})})},function(e){Promise.resolve(!0)}),e.getPrimaryService(d).then(function(e){return e.getCharacteristic(g).then(function(e){return u.relayCharacteristic=e,u.hasRelayCharacteristic=!0,u.relayCharacteristic.readValue().then(function(e){0===e.getUint8(0)?u.relayStatus=!0:u.relayStatus=!1})},function(e){Promise.resolve(!0)})},function(e){Promise.resolve(!0)})])}).then(function(){u.connected=!0})},e.prototype.writeData=function(e){return this.relayCharacteristic?this.relayCharacteristic.writeValue(e):Promise.reject()},e.prototype.disconnect=function(){return u.bluetoothDevice?u.bluetoothDevice.disconnect().then(function(){return t(),Promise.resolve()}):Promise.reject()},e.prototype.setExternalValueReceiver=function(e){u.externalValueReceiver=e},e}();void 0===window&&(module.exports.BluCurrent=BluCurrent),function(){"use strict";function e(e,t,n,a){function r(e){t.show(t.simple().textContent(e).position("top").theme("success-toast").hideDelay(2500))}function i(e){t.show(t.simple().textContent(e).position("top").theme("error-toast").hideDelay(2500))}function u(t,a){function r(e,t,n){e.items=n,e.closeDialog=function(){t.hide()}}r.$inject=["$scope","$mdDialog","items"];var i=angular.element(document.body);n.show({parent:i,targetEvent:t,clickOutsideToClose:!1,template:'<md-dialog style="width: 250px;top:100px;margin-top: -170px;" aria-label="loadingDialog"><md-dialog-content><div layout="row" layout-align="center" style="padding: 40px;"><div style="padding-bottom: 20px;"><div><img src="app/images/loader.gif" width="80px" height="80px"></div></div></div><div layout="row" layout-align="center" style="padding-bottom: 20px; margin-top: -38px;"><label>'+a+"</label></div></md-dialog-content></md-dialog>",locals:{items:e.items},controller:r})}function o(){n.cancel()}function l(t){if("current"==t)if(null!==localStorage.getItem("c_scaleVal")&&null!==localStorage.getItem("c_units")&&null!==localStorage.getItem("c_currentMinValue")&&null!==localStorage.getItem("c_unitMinValue")){var n=Number(localStorage.getItem("c_scaleVal")),a=Number(localStorage.getItem("c_currentMinValue")),r=Number(localStorage.getItem("c_unitMinValue")),i=(e.blucurrent.currentValue-a)/n;e.currentValue=(i+r).toFixed(2),e.currentUnits=localStorage.getItem("c_units")}else e.currentValue=e.blucurrent.currentValue.toFixed(2),e.currentUnits="mA";else"shunt"==t?e.shuntVoltage=e.blucurrent.shuntValue.toFixed(2):"bus"==t?e.busVoltage=e.blucurrent.busValue.toFixed(2):"updateFirmware"==t?c():"disconnect"==t&&(e.busVoltage="",e.shuntVoltage="");e.$apply()}function c(){if(void 0!==dfuimpl){var t=e.blucurrent.bluetoothDevice.uuid,n={};n.uuid=t,n.swVersion=e.blucurrent.softwareVersion,n.hwVersion=e.blucurrent.hardwareVersion,dfuimpl.request("startDFU",JSON.stringify(n),function(e){},function(){})}}e.blucurrent=a,e.isApp=!1,"true"==cordovaApp&&(e.isApp=!0),setTimeout(function(){window.plugins.insomnia.keepAwake()},5e3),e.toggleRelay=function(){var t=[];e.isOn?(e.blucurrent.relayStatus=!0,t.push(parseInt("00",16))):(e.blucurrent.relayStatus=!1,t.push(parseInt("01",16))),e.blucurrent.writeData(t).then(function(){e.status="Relay toggled success"})["catch"](function(e){i("Unable to toggle the Relay")})},e.onConnect=function(){u("","Connecting ...."),e.blucurrent.connect().then(function(){e.blucurrent.setExternalValueReceiver(l),o(),r("Connected...")})["catch"](function(e){o(),i(e)})},e.onDisconnect=function(){var t=n.confirm().title("BluCurrent").textContent("Would you like to disconnect this device?").ariaLabel("Lucky day").ok("Yes").cancel("No");n.show(t).then(function(){e.blucurrent.disconnect().then(function(){e.busVoltage="",e.shuntVoltage="",e.$apply()})},function(){})},e.showSettingsDialog=function(e){n.show({controller:SettingsController,templateUrl:"app/settings/settings.html",parent:angular.element(document.body),targetEvent:e,clickOutsideToClose:!1}).then(function(e){},function(){})},e.isApp||(navigator.bluetooth?navigator.bluetooth.referringDevice&&e.onConnect():i("Bluetooth not supported, which is required."))}e.$inject=["$scope","$mdToast","$mdDialog","bluCurrentService"],angular.module("blucurrent").controller("mainController",e)}(),angular.module("blucurrent").run(["$templateCache",function(e){e.put("app/settings/settings.html",'<md-dialog aria-label="Settings"><form name="settingsForm"><md-toolbar><div class="md-toolbar-tools"><h2>Settings</h2><span flex></span><md-button class="md-primary md-icon-button" ng-click="cancelClick()" aria-label="Close" style="color:white"><ng-md-icon icon="clear"></ng-md-icon></md-button></div></md-toolbar><md-dialog-content><div class="md-dialog-content"><table cellspacing="0" class="table_range" width="85%" align="center" border="0"><tr><td width="45">&nbsp;</td><td width="237">Display Unit :</td><td align="right" width="237"><md-input-container><input aria-label="unitsInputBox" ng-keydown="keyDown($event)" ng-model="units"></md-input-container></td></tr><tr><td align="center" colspan="3"></td></tr><td>&nbsp;</td><td colspan="2" rowspan="3"><table cellspacing="0" class="range_border" width="100%"><tr><td align="center" bgcolor="#CCCCCC" height="30">Current Range</td><td align="center" bgcolor="#CCCCCC" height="30">Display Range</td></tr><tr><td align="center" class="text_space" valign="middle"><md-input-container><input aria-label="voltMinInputBox" ng-keydown="keyDown($event)" ng-model="currentMinValue" id="current_minVal" ng-pattern="/^[+-]?[0-9]{1,9}(?:\\.[0-9]{1,2})?$/" type="number"></md-input-container></td><td align="center" class="text_space" valign="middle"><md-input-container><input aria-label="unitMinInputBox" ng-keydown="keyDown($event)" ng-model="unitMinValue" id="unit_minVal" ng-pattern="/^[+-]?[0-9]{1,9}(?:\\.[0-9]{1,2})?$/" type="number"></md-input-container></td></tr><tr><td align="center" class="text_space" valign="middle"><md-input-container><input aria-label="voltMaxInputBox" ng-keydown="keyDown($event)" ng-model="currentMaxValue" id="current_maxVal" ng-pattern="/^[+-]?[0-9]{1,9}(?:\\.[0-9]{1,2})?$/" type="number"></md-input-container></td><td align="center" class="text_space" valign="middle"><md-input-container><input aria-label="unitMaxInputBox" ng-keydown="keyDown($event)" ng-model="unitMaxValue" id="unit_maxVal" ng-pattern="/^[+-]?[0-9]{1,9}(?:\\.[0-9]{1,2})?$/" type="number"></md-input-container></td></tr></table></td><tr><td>Min</td></tr><tr><td height="40">Max</td></tr><tr><td>&nbsp;</td><td colspan="2"><span class="settings-input-error">{{err}}</span></td></tr></table><div layout="row" layout-align="space-around center"><md-button class="md-primary md-raised text_style" ng-click="resetClick()">Reset</md-button><md-button class="md-primary md-raised text_style" ng-click="submitClick()">Save</md-button></div></div></md-dialog-content></form></md-dialog>')}]);