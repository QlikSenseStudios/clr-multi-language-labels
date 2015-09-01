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
        //console.log(s, r);
      r.browserLanguage = prepareBrowserLanguage();

      s.$watch(
        function () {
          if (s.layout.showflag) {
            return {
              showFlag: s.layout.showflag,
              showLanguage: s.layout.showlanguage
            };
          }
        },
        function (newValue, oldValue) {
          if (newValue.showFlag !== oldValue.showFlag) {
            console.log("showflag", newValue.showFlag, oldValue.showFlag);
          }
          if (newValue.showLanguage !== oldValue.showLanguage) {
            console.log("showlanguage", newValue.showLanguage, oldValue.showLanguage);
          }
        },
        true
      );
    }],


    view : {
      paint : function ($element, layout) {
        var self = this;

        function domSearchAndReplace (domObj) {

          for (i = 0; i < domObj.length; i++) {
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
                domObj[i].textContent = domObj[i].textContent.replace(new RegExp('\\b' + Search + '\\b', "g"), Replace);
              }
            });
          }

          return domObj;
        }

        var head = document.getElementsByTagName("head")[0];
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "./config/clr-multi-language-labels-widget.js";
        head.appendChild(js);


        var id = "container_"+ layout.qInfo.qId;

        if (document.getElementById(id)) { $("#" + id).empty(); }
        else { $element.append($("<div />").attr("id", id).width($element.width()).height($element.height())); }

        var extDiv = $("#" + id);
        var showlanguage = layout.showlanguage;
        var showflag = layout.showflag;
        var translateheadercell = layout.translateheadercell;
        var translatetitles = layout.translatetitles;
        var translatesubtitles = layout.translatesubtitles;
        var translatefooters = layout.translatefooters;
        var blanguage = self.$scope.$parent.$root.browserLanguage;

        var Search = "",
          Replace = "",
          UI = "",
          html = "";

        if (showlanguage === "Y") {
          html += blanguage + "<br>";
        }

        if (translateheadercell === "Y") {
          var tables = $("th.qv-st-header-cell"); //$("th.qv-st-header-cell").filter(function (index) { return $(".ng-binding", this).length === 1; });
          //domSearchAndReplace(tables);
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
                tables[i].textContent = tables[i].textContent.replace(new RegExp('\\b' + Search + '\\b', "g"), Replace);
              }
            });
          }
        }

        if (translatetitles === "Y") {
          var titles = $(".qv-object-title").children("span[ng-if]");
          domSearchAndReplace(titles);
        }

        if (translatesubtitles === "Y") {
          var subtitles = $(".qv-object-subtitle");
          domSearchAndReplace(subtitles);
        }

        if (translatefooters === "Y") {
          var footers = $(".qv-object-footnote");
          domSearchAndReplace(footers);
        }

        if (showflag === "Y") {
          html += '<form action="#">';
          html += '<fieldset>';
          html += '<select name="people" id="people">';
          html += '<option value="--" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-auto.png");">*Auto</option>';
          html += '<option value="de" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-de.png");">German</option>';
          html += '<option value="en-gb" data-class="language" data-style="background-image: url"/extensions/MultilanguageLabels/flags/flag-en-gb.png");">UK</option>';
          html += '<option value="en-us" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-en-us.png");">American</option>';
          html += '<option value="en" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-en.png");">English</option>';
          html += '<option value="es" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-es.png");">Spanish</option>';
          html += '<option value="it" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-it.png");">Italian</option>';
          html += '<option value="fr" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-fr.png");">French</option>';
          html += '<option value="sv" data-class="language" data-style="background-image: url("/extensions/MultilanguageLabels/flags/flag-sv.png");">Swedish</option>';
          html += '</select>';
          html += '</fieldset>';
          html += '</form>';  

          html += "<img src=\"/extensions/MultilanguageLabels/flags/flag-" + blanguage + ".png\">";
        }

        extDiv.append(html);

      }
    }
  };

});

