/**
 * @description The task allows the removal of files, as per sub task spefication, in the following
 *              folders: build, demo, dist, temp and VM Qlik Sense extension folder
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.config('clean', {

    options : {
      /**
       * Allow deletion out side CWD
       * @type {Boolean}
       */
      force : true
    },

    buildFolder: [
      '../build/*',
      '!../build/.gitkeep'
    ],

    distFolder : [
      '../dist/*',
      '!../dist/.gitkeep'
    ],

    currentDistributionFolder : [
      '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/config',
      '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/styles/' + grunt.option('project').extensionName + '-style.css', // keep fonts ;)
      '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/views'
    ],

    tmpFolder : [
      '../tmp/cache/bower/*'
    ],

    // buuuuuuu!!!!
    qlikVMExtensionPathFolder : [
      grunt.option('project').qlikVMExtensionPath + '/**/*',
      grunt.option('project').qlikVMExtensionPath + '/**/',
      grunt.option('project').qlikVMExtensionPath + '/*',
      grunt.option('project').qlikVMExtensionPath + '/',
      grunt.option('project').qlikVMExtensionPath

    ]

  });

};

