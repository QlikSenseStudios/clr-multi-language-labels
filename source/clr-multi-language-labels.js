/**
 * @module      CLR Multilanguage
 * @classdesc   ...
 * @param       {array} - Dependencies
 * @param       {function} - Anonymous function
 * @return      Return an array with the definition properties
 * @version     @@QlikTool-Replace:version
 * @copyright   Qlik 2015
 * @author      @@QlikTool-Replace:author.name <@@QlikTool-Replace:author.email>
 * @author      Corrado Lorefice <Corrado.Lorefice@qlik.com>
 */


function rendering(self, $element, layout) {
  "use strict";

  var id = "container_"+ layout.qInfo.qId;

  if (document.getElementById(id)) { $("#" + id).empty(); }
  else { $element.append($("<div />").attr("id", id).width($element.width()).height($element.height())); }

  var extDiv = $("#" + id);
  var showlanguage = layout.showlanguage;
  var showflag = layout.showflag;
  var blanguage = self.$scope.$parent.$root.browserLanguage;

  var Search = "", Replace = "", UI = "";
  var html = "";

  if (showlanguage === "Y") {
    html += blanguage + "<br>";
  }

  var tables = $("th.qv-st-header-cell").filter(function (index) {
    console.log("index", index);
    return $(".ng-binding", this).length === 1;
  });

  //Search data and substitute strings
  for (var i = 0; i < tables.length; i++) {
    self.backendApi.eachDataRow(function (rownum, row) {
      Search = "";
      Replace = "";
      row.forEach(function (cell, index) {
        if (cell.qIsOtherCell) {
          cell.qText = self.backendApi.getDimensionInfos()[index].othersLabel;
        }
        if (index === 0) { Search = cell.qText.trim(); }
        if (index === 1) { Replace = cell.qText.trim(); }
        if (index === 2) { UI = cell.qText.trim(); }
      });

      if (UI.indexOf(blanguage) > -1) {
        tables[i].textContent = tables[i].textContent.replace(new RegExp("\\b" + Search + "\\b", "g"), Replace);
      }
    });
  }


  var titles = $("header[ng-show]").children("h1[ng-attr-title]").children("span[ng-if]");
    //Search data and substitute strings
  for (i = 0; i < titles.length; i++) {
    self.backendApi.eachDataRow(function (rownum, row) {
      Search = "";
      Replace = "";
      row.forEach(function (cell, index) {
        if (cell.qIsOtherCell) {
          cell.qText = self.backendApi.getDimensionInfos()[index].othersLabel;
        }
        if (index === 0) { Search = cell.qText.trim(); }
        if (index === 1) { Replace = cell.qText.trim(); }
        if (index === 2) { UI = cell.qText.trim(); }
      });
      if (UI.indexOf(blanguage) > -1) {
        //html += '<br>' + Search + ':' + Replace + ':' + UI + ';';
        titles[i].textContent = titles[i].textContent.replace(new RegExp("\\b" + Search + "\\b", "g"), Replace);
      }
    });
  }

  if (showflag === "Y") {
    html += "<img src=\"/extensions/MultilanguageLabels/flags/flag-" + blanguage + ".png\">";
  }
  extDiv.append(html);

}



define([
  "jquery",
  "text!./styles/clr-multi-language-labels-style.css",
  "./config/clr-multi-language-labels-initial-properties",
  "./config/clr-multi-language-labels-properties-panel"
], function ($, a, b, c) {
  "use strict";

  /**
   * Returns the browser language in as either 5 characters as per RFC4646 or 2 character
   * @public
   * @see http://tools.ietf.org/html/rfc4646
   * @return string
   */
  function prepareBrowserLanguage() {
    var browserLanguage,
      tokens;

      browserLanguage = navigator.language.toLowerCase() || "en-gb";
      if (browserLanguage.length > 3) {
        tokens = browserLanguage.split("-");
        if (tokens[0] === tokens[1]) {
          browserLanguage = tokens[0];
        }
      }

    return browserLanguage;
  }


  return $("<style>").html(a).appendTo("head"), {

    initialProperties: b,
    definition: c,
    snapshot : {
      canTakeSnapshot: true
    },

    controller : ["$scope", "$rootScope", function (s, r) {
      console.log(s, r);
      r.browserLanguage = prepareBrowserLanguage();
    }],


     view : {
      paint : function($element, layout) {
        console.log($element, layout);

        var self = this;
        rendering(self, $element, layout);
      }
    }
  };

});

