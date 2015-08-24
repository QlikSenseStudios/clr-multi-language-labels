/**
 * @module      ARF multi language labels
 * @classdesc   ...
 * @param       {array} - Dependencies
 * @param       {function} - Anonymous function
 * @return      Return an array with the definition properties
 * @version     @@QlikTool-Replace:version
 * @copyright   Qlik 2015
 * @author      @@QlikTool-Replace:author.name <@@QlikTool-Replace:author.email>
 */
define(function () {
  "use strict";


  return {
    type : "items",
    component : "accordion",
    items : {
      dimensions : {
        uses : "dimensions",
        min : 3,
        max : 3
      },
      settings : {
        uses : "settings",
        label : "Options",
        translation: "Options",
        items : {
          general : {
            show : false,
            items : {
              showTitles : {
                defaultValue : false
              }
            }
          },
          options : {
            label: "Options",
            translation: "Options",
            items : {
              showlanguage : {
                ref : "showlanguage",
                type : "string",
                component : "switch",
                label : "Show client language",
                translation : "Show client language",
                options: [
                  { value : "N", label : "No", translation : "No" },
                  { value : "Y", label : "Yes", translation : "Yes" }
                ],
                defaultValue : "N"
              },
              showflag : {
                ref : "showflag",
                type : "string",
                component : "switch",
                label : "Show flag image",
                translation : "Show flag image",
                options : [
                  { value : "N", label : "No", translation : "No" },
                  { value : "Y", label : "Yes", translation : "Yes" }
                ],
                defaultValue : "N"
              }
            }
          }
        }
      }
    }
  };

});