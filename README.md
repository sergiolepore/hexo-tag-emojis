## Introduction

This is a [hexo](https://github.com/hexojs/hexo) tag plugin which allows you to insert [emojis](http://www.emoji-cheat-sheet.com/) on your blog posts.


![](http://i.imgur.com/vOqGsqb.png)

![](http://i.imgur.com/LFhn2RA.png)


## Plugin installation

Run the following command in the root directory of hexo:

```
npm install hexo-tag-emojis --save
```

And enable the plugin in your `_config.yml`.

```
plugins:
  - hexo-tag-emojis
```

## Assets configuration

__Heads up!__

The following methods will define the way that emojis assets will be served to the client. You can only use one method at a time, choose wisely!

#### Local installation

This plugin comes with all emoji images from [emoji-cheat-sheet.com repository](https://github.com/arvida/emoji-cheat-sheet.com). Before using them, you need to deploy the emoji images on your Hexo blog.

First, open your `_config.yml` file and paste the following lines:

```
# hexo-tag-emojis plugin configuration
emojis:
  image_dir: images/emojis
```

Then run this command:

```
hexo emojis install
```

To uninstall:

```
hexo emojis remove
```

#### CDN (Content Delivery Network)

You can avoid installing the assets on your blog and use a emoji CDN, like `http://cdn.staticfile.org/emojify.js/0.9.5/emojis`

Open your `_config.yml` file and paste the following:

```
# hexo-tag-emojis plugin configuration
emojis:
  cdn: http://cdn.staticfile.org/emojify.js/0.9.5/emojis
```

This is particularly useful if you don't want Github to serve your resources.
If you choose this method, you don't need to include the `image_dir` configuration.


## Usage

#### Method 1 - Inline emoji

```
{% emoji [emojiNameWithoutColons] [emojiSize] [class1,class2,class3] %}
```

Example:

```
{% emoji heart 32 custom_class1,custom_class2 %}
```

Will generate the following HTML:

```
<img width="32" height="32" class="emoji nofancybox custom_class1 custom_class2" title="heart" src="/images/emojis/heart.png">
```

__Heads up!__

* `emojiSize` defaults to 20.
* Classes must be comma-separated and without spaces between them.
* `emoji` and `nofancybox` classes are added automatically.



#### Method 2 - Emoji block

This is the best choice if you want to process a whole paragraph.

```
{% emoji_block [emojiSize] [class1,class2,class3] %}
    Lorem ipsum dolor sit amet :emojiName:
    consectetur  adipisicing elit :anotherEmojiName:
{% endemoji_block %}
```

Example:

```
{% emoji_block %}
    Lorem ipsum dolor sit amet :smiley:
    consectetur  adipisicing elit :boom:
{% endemoji_block %}
```
