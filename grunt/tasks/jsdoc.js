/**
 * @description The task will generate JSDOC style comments in the release folder
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.config('jsdoc', {
    dist : {

      src: [
        '../source/**/*.js',
        '!../source/vendor',
        '../test/**/*.js',
        '!../test/vendor',
      ],

      /**
       * The path to the jsdoc bin (needed only for some border line cases)
       * @type {String}
       */
      jsdoc: './node_modules/.bin/jsdoc',
      /**
       * A jshintrc style object specifying jshint options
       * @type {String}
       */
      jshint : grunt.file.readJSON('.jshintrc'),

      options: {
        destination: '../dist/release-' + grunt.option('pkg').version + '/docs/jsdoc',
        configure: './conf.json'
      }
    }
  });

};

