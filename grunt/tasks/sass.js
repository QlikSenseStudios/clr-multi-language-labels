/**
 * @description The sass task will:
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.config('sass', {
    options : {
      cacheLocation: '../tmp/cache/sass',
      debugInfo: false,
      lineNumbers: false,
      noCache: false,
      precision: 4,
      quiet: false,
      sourcemap: 'auto',
      style: 'expanded',
      trace: false,
      unixNewlines: false,
      update: true
    },

    dev : {
      files: {
        "../build/<%=grunt.option('project').extensionName %>/styles/<%=grunt.option('project').extensionName %>-style.css" : '../source/styles/_sass/style.scss'
      }
    },

    release : {
      options: {
        style: 'compressed',
        sourcemap: 'none',
        update: false
      },
      files: {
        "../build/<%=grunt.option('project').extensionName %>/styles/<%=grunt.option('project').extensionName %>-style.css" : '../source/styles/_sass/style.scss'
      }
    }

  });

};

