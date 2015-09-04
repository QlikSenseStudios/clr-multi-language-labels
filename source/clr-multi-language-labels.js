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
    //alert("prepareBrowserLanguage");

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

    controller: ["$scope", "$rootScope", function (s, r) {
      //console.log(s, r);
      r.browserLanguage = prepareBrowserLanguage();
      r.languagechoice = r.browserLanguage;
      //console.log("controller r.browserLanguage: ", r.browserLanguage);
      //console.log("controller r.languagechoice: ", r.languagechoice);

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
            //console.log("showflag", newValue.showFlag, oldValue.showFlag);
          }
          if (newValue.showLanguage !== oldValue.showLanguage) {
            //console.log("showlanguage", newValue.showLanguage, oldValue.showLanguage);
          }
        },
        true
      );

    }],

    resize: function($element,layout){
      //handle resize
      //console.log("resize");
    },

    updateData: function ($element, layout) {
      //handle Data update 
      //console.log("updateData");
    },

    view : {
      paint : function ($element, layout) {
        var self = this;
        //console.log("paint");

        function createContainer() {

          function translate(translationDirection) {

            function domSearchAndReplace(domObj, translationDirection) {

              for (i = 0; i < domObj.length; i++) {
                self.backendApi.eachDataRow(function (rownum, row) {
                  Search = "";
                  Replace = "";
                  row.forEach(function (cell, index) {
                    if (cell.qIsOtherCell) {
                      cell.qText = self.backendApi.getDimensionInfos()[index].othersLabel;
                    }
                    if (index === 0 && translationDirection === false) { Search = cell.qText.trim(); }
                    if (index === 1 && translationDirection === false) { Replace = cell.qText.trim(); }
                    if (index === 1 && translationDirection === true) { Search = cell.qText.trim(); }
                    if (index === 0 && translationDirection === true) { Replace = cell.qText.trim(); }
                    if (index === 2) { UI = cell.qText.trim(); }
                  });
                  if (UI.indexOf(blanguage) > -1) {
                    domObj[i].textContent = domObj[i].textContent.replace(new RegExp('\\b' + Search + '\\b', "g"), Replace);
                  }
                });
              }

              return domObj;
            }

            if (translateheadercell === "Y") {
              var tables = $("th.qv-st-header-cell"); //$("th.qv-st-header-cell").filter(function (index) { return $(".ng-binding", this).length === 1; });
              for (var i = 0; i < tables.length; i++) {
                self.backendApi.eachDataRow(function (rownum, row) {
                  Search = "";
                  Replace = "";
                  row.forEach(function (cell, index) {
                    if (cell.qIsOtherCell) {
                      cell.qText = self.backendApi.getDimensionInfos()[index].othersLabel;
                    }
                    if (index === 0 && translationDirection === false) { Search = cell.qText.trim(); }
                    if (index === 1 && translationDirection === false) { Replace = cell.qText.trim(); }
                    if (index === 1 && translationDirection === true) { Search = cell.qText.trim(); }
                    if (index === 0 && translationDirection === true) { Replace = cell.qText.trim(); }
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
              domSearchAndReplace(titles, translationDirection);
            }

            if (translatesubtitles === "Y") {
              var subtitles = $(".qv-object-subtitle");
              domSearchAndReplace(subtitles, translationDirection);
            }

            if (translatefooters === "Y") {
              var footers = $(".qv-object-footnote");
              domSearchAndReplace(footers, translationDirection);
            }

        }

          var id = "container_" + layout.qInfo.qId;

          if (document.getElementById(id)) { $("#" + id).empty(); }
          else { $element.append($("<div />").attr("id", id).width($element.width()).height($element.height())); }

          var extDiv = $("#" + id);
          var showlanguage = layout.showlanguage;
          var showflag = layout.showflag;
          var showlanguagechoice = layout.showlanguagechoice;
          var translateheadercell = layout.translateheadercell;
          var translatetitles = layout.translatetitles;
          var translatesubtitles = layout.translatesubtitles;
          var translatefooters = layout.translatefooters;
          var blanguage = self.$scope.$parent.$root.browserLanguage;
          var languagechoice = self.$scope.$parent.$root.languagechoice;

          var Search = "",
            Replace = "",
            UI = "",
            html = "";

          if (showflag === "Y") {
            html += "<img src=\"/extensions/MultilanguageLabels/flags/flag-" + blanguage + ".png\">&nbsp;";
          }

          if (showlanguage === "Y") {
            html += blanguage;
          }

          if (showlanguagechoice === "Y") {
            html += '<fieldset>';
            html += '<select name="clr-multi-language-labels-language" id="clr-multi-language-labels-language">';
            for (var o = 0; o < 10; o++) {
              if (o == 0 && languagechoice == "en-us") html += '<option value="en-us" data-class="language">American</option>';
              if (o == 0 && languagechoice == "zh") html += '<option value="zh" data-class="language">Chinese</option>';
              if (o == 0 && languagechoice == "en") html += '<option value="en" data-class="language">English</option>';
              if (o == 0 && languagechoice == "fr") html += '<option value="fr" data-class="language">French</option>';
              if (o == 0 && languagechoice == "de") html += '<option value="de" data-class="language">German</option>';
              if (o == 0 && languagechoice == "it") html += '<option value="it" data-class="language">Italian</option>';
              if (o == 0 && languagechoice == "es") html += '<option value="es" data-class="language">Spanish</option>';
              if (o == 0 && languagechoice == "sv") html += '<option value="sv" data-class="language">Swedish</option>';
              if (o == 0 && languagechoice == "en-gb") html += '<option value="en-gb" data-class="language">UK</option>';
            }
            for (var o = 0; o < 10; o++) {
              if (languagechoice != "en-us" && o == 1) html += '<option value="en-us" data-class="language">American</option>';
              if (languagechoice != "zh" && o == 2) html += '<option value="zh" data-class="language">Chinese</option>';
              if (languagechoice != "en" && o == 3) html += '<option value="en" data-class="language">English</option>';
              if (languagechoice != "fr" && o == 4) html += '<option value="fr" data-class="language">French</option>';
              if (languagechoice != "de" && o == 5) html += '<option value="de" data-class="language">German</option>';
              if (languagechoice != "it" && o == 6) html += '<option value="it" data-class="language">Italian</option>';
              if (languagechoice != "es" && o == 7) html += '<option value="es" data-class="language">Spanish</option>';
              if (languagechoice != "sv" && o == 8) html += '<option value="sv" data-class="language">Swedish</option>';
              if (languagechoice != "en-gb" && o == 9) html += '<option value="en-gb" data-class="language">UK</option>';
            }

            html += '</select>';
            html += '</fieldset>';
          }

          if (blanguage == languagechoice) {
            translate(false);
          }

          extDiv.append(html);

          if (showlanguagechoice === "Y") {

            if (self.$scope.$parent.$root.languageWatch) //check for watch exists
              self.$scope.$parent.$root.languageWatch(); //this line will destruct watch if its already there
            self.$scope.$parent.$root.languageWatch = self.$scope.$watch(function () {
                if (document.getElementById("clr-multi-language-labels-language").value) {
                  return {
                    changeLanguage: document.getElementById("clr-multi-language-labels-language").value
                  };
                }
              },
              function (newValue, oldValue) {
                if (newValue.changeLanguage !== oldValue.changeLanguage) {
                  self.$scope.$parent.$root.languagechoice = newValue.changeLanguage;
                  translate(true);
                  self.$scope.$parent.$root.browserLanguage = newValue.changeLanguage;
                  createContainer();
                }
              },
              true
            );

          }

        }

        createContainer();

      }
    }
  };

});

