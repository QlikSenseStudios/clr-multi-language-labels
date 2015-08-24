/**
 * @description The requirejs task will:
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.config('requirejs', {
    distribution : {
      options : {
        baseUrl: '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName,
        out: '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/' + grunt.option('project').extensionName + '.js',
        optimize: 'uglify2',
        name : grunt.option('project').extensionName,
        paths: grunt.option('project').requirejs.paths,
        exclude :  grunt.option('project').requirejs.exclude,
        preserveLicenseComments: false,
        findNestedDependencies: false,
        optimizeCss: "standard",
        removeCombined: true,
        useStrict: true,
        logLevel: 0,
        inlineText: true
      }
    }

  });

};

