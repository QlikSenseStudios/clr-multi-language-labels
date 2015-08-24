/**
 * @description The replace task will:
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-replace');

  grunt.config('replace', {
    options : {
      delimiter : ".",
      prefix : "@@QlikTool-Replace:",
      preservePrefix : false,
      usePrefix : true
    },

    dev: {
      options: {
        patterns : [
          { json: grunt.file.readJSON('./replacements-common.json') },
          { json: grunt.file.readJSON('./replacements-dev.json') },
          {
            match: 'timestamp',
            replacement : '<%= new Date().getTime() %>'
          },
          {
            match: 'version',
            replacement : grunt.option('pkg').version
          }
        ]
      },
      files : grunt.option("project").replace.dev.files
    },

    release : {
      options: {
        patterns : [
          { json: grunt.file.readJSON('./replacements-common.json') },
          { json: grunt.file.readJSON('./replacements-prod.json') },
          {
            match: 'timestamp',
            replacement : '<%= new Date().getTime() %>'
          },
          {
            match: 'version',
            replacement : grunt.option('pkg').version
          }
        ]
      },
      files : grunt.option("project").replace.deploy.files
    },

    postMinification : {
      options : {
        prefix : "",
        preservePrefix : false,
        usePrefix : false,
        patterns : [
          {
            match: 'define("' + grunt.option('project').extensionName + '",',
            replacement : "define("
          }
        ]
      },
      files : [
        {
          src: '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/' + grunt.option('project').extensionName + ".js",
          dest : '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/' + grunt.option('project').extensionName + ".js"
        }
      ]
    }
  });

};

