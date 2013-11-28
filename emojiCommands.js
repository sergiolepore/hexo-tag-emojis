var wrench = require('wrench'),
    colors = require('colors'),
    packageInfo = require('./package.json'),
    fs = require('fs');

var emojiCommands = module.exports = function(hexo) {
    emojiCommands.hexo = hexo;
    emojiCommands.emojiConfig = hexo.config.emojis || false;
    emojiCommands.emojiImageDir = emojiCommands.emojiConfig.image_dir || false;
    emojiCommands.emojisCDN = emojiCommands.emojiConfig.cdn || false;
    emojiCommands.sourceDir = __dirname + '/source/images/emojis';
    emojiCommands.deployDir = hexo.base_dir + 'source/' + emojiCommands.emojiImageDir;

    if (!emojiCommands.emojiConfig ) {
        throw new Error('Emoji configuration was not found.');
    }
    
    if( !emojiCommands.emojiImageDir && !emojiCommands.emojisCDN){
        throw new Error('Emoji configuration was not found.');
    }

    return emojiCommands;
};

/**
 * Copies all emoji assets into `emojis.image_dir`.
 */
emojiCommands.install = function() {
    if (!emojiCommands.emojiImageDir) {
        console.error('[ERROR] Hey! You forgot to add %s to your %s file!'.red, 'image_config'.inverse, '_config.yml'.inverse);
        return;
    }

    console.log('>> Copying emojis to '+emojiCommands.deployDir.inverse);

    if (!fs.existsSync(emojiCommands.deployDir)) {
        wrench.mkdirSyncRecursive(emojiCommands.deployDir, 0777);
    }

    wrench.copyDirRecursive(emojiCommands.sourceDir, emojiCommands.deployDir, {forceDelete: true}, function(err) {
        if (err) {
            console.error(('[ERROR] '+err).red);
        } else {
            console.log('>> Done!\n');
        }
    });
};

/**
 * Removes all emoji assets from `emojis.image_dir`.
 */
emojiCommands.remove = function() {
    if (!emojiCommands.emojiImageDir) {
        console.error('[ERROR] Hey! You forgot to add %s to your %s file!'.red, 'image_config'.inverse, '_config.yml'.inverse);
        return;
    }
    
    console.log('>> Removing emojis from '+emojiCommands.deployDir.inverse);

    wrench.rmdirSyncRecursive(emojiCommands.deployDir, function() {
        console.warn('!! There was an error removing '+emojiCommands.deployDir.inverse+' directory. Please, remove it manually.');
    });

    console.log('>> Done!\n');
};

/**
 * Display useful information
 */
emojiCommands.showInfo = function() {
  console.log('\\|°▿▿▿▿°|/ hey there!\n');
  
  console.log('Version'.bold+': '+packageInfo.version);
  console.log('Author'.bold+':  '+packageInfo.author.name+' <'+packageInfo.author.email+'>');
  console.log('Website'.bold+': '+packageInfo.author.url);
  console.log('Help'.bold+':    hexo help emojis');
  console.log('Github'.bold+':  '+packageInfo.repository.url);
  console.log('Bugs'.bold+':    '+packageInfo.bugs.url);

  console.log('\nThank you so much for using it!\n');
};