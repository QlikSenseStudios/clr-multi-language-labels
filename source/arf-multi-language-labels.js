/**
 * @module      ARF Multilanguage
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
  var blanguage = navigator.language.toLowerCase();
  if (navigator.language.toLowerCase().length > 3)
  {
      var first = navigator.language.toLowerCase().substring(0, 2);
      var second = navigator.language.toLowerCase().substring(3, 5);
      if (first === second)
      {
          blanguage = first;
      }
  }
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
  for (i = 0; i < tables.length; i++) {
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
  "text!./styles/arf-multi-language-labels-style.css",
  "./config/arf-multi-language-labels-initial-properties",
  "./config/arf-multi-language-labels-properties-panel"
], function ($, a, b, c) {
  "use strict";


  return $("<style>").html(a).appendTo("head"), {

    initialProperties: b,
    definition: c,
    snapshot : {
      canTakeSnapshot: true
    },

    controller : ["$scope", "$rootScope", function (s, r) {
      console.log(s, r);
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

