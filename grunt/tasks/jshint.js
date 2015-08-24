/**
 * @description The taks will verify the javascript files speficied for JSHint errors
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.config('jshint', {
    options : {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: grunt.option("project").jshint.files
  });

};

