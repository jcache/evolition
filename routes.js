var epath   = __dirname;
var path    = require('path');
var fse     = require('fs-extra');
var app     = require('electron').app;

var appDataPath = app.getPath('appData') + '/EVolition/data';

var dir = module.exports = {
  styles: path.join(epath, '/build/styles/'),
  views: path.join(epath, '/build/windows/'),
  build: path.join(epath, '/build/'),
  data: path.join(epath, path.join('ev://', appDataPath)),
  saved_images: 'ev://build/character/images/',
  saved_images_file_path: path.join(epath, '/build/character/images/'),
  chkDataDir: function(){
      var success = false;

      // CHECK FOR CHARACTER FILE
      fse.readJson(
        path.join(appDataPath, '/characters.json'),
        function(err) {
            if(err) {
              console.log('characters.json not found. Creating it...');
              fse.copy(
                  // SEED characters.json FROM:
                  dir.data + '/characters.json',
                  // TO:
                  appDataPath + '/characters.json',
                  // CALLBACK:
                  function(err) {
                    if(err){
                      console.log('Error creating characters.json! ', err);
                    } else {
                      console.log('Character.json has been seeded!');
                      success = true;
                    }
                  }
              );
            }
            return success;
        });
  }
};
