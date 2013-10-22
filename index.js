var htmlTag = hexo.util.html_tag,
    colors = require('colors'),
    emojiCommands = require('./emojiCommands')(hexo),
    rootPath = hexo.config.root,
    emojiConfig = hexo.config.emojis || false,
    emojiImageDir = emojiConfig.image_dir || false;

/**
 * Emoji commands for Hexo.
 * Use `install` option to copy emoji assets on your Hexo blog.
 * Use `remove` option to remove emoji assets from your Hexo blog.
 * 
 * Syntax:
 *   $ hexo emojis [install|remove]
 */
hexo.extend.console.register('emojis', 'Emojis everywhere', function(args){
    // Ascii art, for the console geeks :)
    console.log('\n _   _                  _____                _ _     '.yellow);
    console.log('| | | |                |  ___|              (_|_)    '.yellow);
    console.log('| |_| | _____  _____   | |__ _ __ ___   ___  _ _ ___ '.yellow);
    console.log('|  _  |/ _ \\ \\/ / _ \\  |  __| \'_ ` _ \\ / _ \\| | / __|'.yellow);
    console.log('| | | |  __/>  < (_) | | |__| | | | | | (_) | | \\__ \\'.yellow);
    console.log('\\_| |_/\\___/_/\\_\\___/  \\____/_| |_| |_|\\___/| |_|___/'.yellow);
    console.log('                                           _/ |      '.yellow);
    console.log('                                          |__/       \n'.yellow);
    console.log('                            Emojify the planet!'.yellow);
    console.log('\n');

    var opt = args._[0] || null; // Option

    switch (opt) {
        case 'install':
            emojiCommands.install(); // install emojis
            break;
        case 'remove':
            emojiCommands.remove(); // remove emojis
            break;
        default:
            console.error(('[ERROR] Unknown argument '+opt.inverse+'.').red);
    }
});

/**
 * Emoji tag renders a single emoji.
 *
 * Syntax:
 *   {% emoji [emojiNameWithoutColons] %}
 */
hexo.extend.tag.register('emoji', function(args, content){
    var emojiName = args[0]; // emojiNameWithoutColons argument
    var imgAttr = {};

    if (!emojiConfig || !emojiImageDir) {
        throw new Error('Emoji configuration was not found.');
    }

    imgAttr.src = rootPath+emojiImageDir+'/'+emojiName+'.png';
    imgAttr.width = 20;
    imgAttr.height = 20;
    imgAttr.class = "emoji nofancybox";

    return htmlTag('img', imgAttr);
});

/**
 * Emoji block tag process a string block and replaces all emoji occurences.
 *
 * Syntax:
 *   {% emoji-block %}
 *       Lorem ipsum dolor sit amet :emojiName:
 *       consectetur  adipisicing elit :anotherEmojiName:
 *   {% endemoji-block %}
 */
hexo.extend.tag.register('emoji-block', function(args, content) {
    var imgAttr = {};

    if (!emojiConfig || !emojiImageDir) {
        throw new Error('Emoji configuration was not found.');
    }

    imgAttr.width = 20;
    imgAttr.height = 20;
    imgAttr.class = "emoji nofancybox";

    // find :something: pattern
    var emojifiedContent = content.replace(/:(.*?):/g, function(match) {
        match = match.replace(/:/g, ''); // :something: => something
        imgAttr.src = rootPath+emojiImageDir+'/'+match+'.png';

        return htmlTag('img', imgAttr);
    });

    return emojifiedContent;
}, true);