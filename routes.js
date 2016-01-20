var epath   = __dirname;
var path    = require('path');
var fs      = require('fs');
var fse     = require('fs-extra');
var app     = require('electron').app;

var appDataPath = app.getPath('appData') + '/EVolition/data/';
console.log('appDataPath:', appDataPath);

var dir = module.exports = {
  styles: path.join(epath, '/build/styles/'),
  views: path.join(epath, '/build/windows/'),
  build: path.join(epath, '/build/'),
  data: path.join(epath, appDataPath),
  saved_images: 'ev://build/character/images/',
  saved_images_file_path: path.join(epath, '/build/character/images/'),
  verifyData: chkData()
};
function chkData() {
    var success = false;
    var dataFiles = [
        'characters.json',
        'game_system.json'
    ];

    // CHECK FOR CHARACTER FILES
    for (var i = 0; i < dataFiles.length; i++) {
        var err;
        fPath = path.join(appDataPath,dataFiles[i]);
        console.log('fPath: ',fPath);
        try {
            fs.accessSync(fPath);
        } catch (e) {
            // IF READING THE JSON FILES CAUSES AN ERROR, COPY THE SEED FILE
            console.log(dataFiles[i] + ' not found. Creating it...');
            fse.copySync(
                // SEED <file name>.json FROM:
                path.join('./source/shared_assets/data/',dataFiles[i]),
                // TO:
                path.join(appDataPath,dataFiles[i]),
                // CALLBACK:
                fileCopyCB()
            );
        } finally {

        }
    }
    return success;

    function fileCopyCB(err) {
        var sPath = [epath,'./source/shared_assets/data/',dataFiles[i]].join('');
        console.log('Seed file path: ',sPath);
        if(err){
            console.log('Error creating '+dataFiles[i]+'!');
            console.log(err);
        } else {
            console.log(dataFiles[i] + ' has been seeded!');
            success = true;
        }
    }

}

console.log('routes -- dir.data: ', dir.data);
