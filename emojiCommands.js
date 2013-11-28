var wrench = require('wrench'),
    colors = require('colors'),
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
    console.log('>> Removing emojis from '+emojiCommands.deployDir.inverse);

    wrench.rmdirSyncRecursive(emojiCommands.deployDir, function() {
        console.warn('!! There was an error removing '+emojiCommands.deployDir.inverse+' directory. Please, remove it manually.');
    });

    console.log('>> Done!\n');
};