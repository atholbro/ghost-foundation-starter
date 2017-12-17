# ghost-foundation-starter
A basic theme for Ghost blogs, using Foundation 6. Intended as a starting point for new themes.

This theme is loosely based around the default Ghost theme, Casper. All the CSS has been rewritten to take advantage of SASS features, while also removing a lot of complexity. SCSS files are split up based on the pages/components to which the styles apply. This makes the css far easier to understand, follow and maintain/update. The base styles provided are intended to provide a basic layout (that's also responsive), while not going so far as to be difficult to modify or understand.

From Foundation, this theme uses the following:
* Basic Style & Reset
* Float Classes
* Media Queries (for responsive breakpoints)
* Card
* Reveal
* Label
* Button
* Form Styles
_For simplicity's sake, the XY grid is not used. Flexbox is used directly for post layout, and floats are used for the nav/footer. _

_Looking for something even more basic? Check out ghost-starter, which this theme expands upon_

## Differences from ghost-starter
The following external libraries / dependencies are now included:

**Site**
* Foundation 6 (for sites)
* jQuery (required by Foundation)

**Build**
* Babel added to compile ES2015.
* Webpack to bundle JS files (minifies in production mode).

## Digging deeper
Foundation is setup in a similar fashion to the [Foundation Zurb Template](https://github.com/zurb/foundation-zurb-template). In fact, _settings.scss is an exact copy of the version in the Zurb Template. Foundation style imports have been moved into _foundation-styles.scss to remove clutter from main.scss. Only the parts of Foundation that are currently in use are included, all others remain commented out for easier adjustments later. The same also applies the the Foundation JS libraries, only the reveal library (and it's requirements) are currently included. You can find the rest in src/assets/js/lib/foundation-explicit-pieces.js.


### default.hbs (where it all starts)
```src/assets/scss/main.scss```

This file contains the base HTML boilerplate for the various pages. This basic HTML is used for all pages in the theme. Written in handlebars, which seems to be a requirement for ghost themes.

Unlike the casper theme, this theme also uses default.hbs for the error pages. I personally prefer this as it allows css/js includes to only be defined once, in default.hbs.

_Pagination has not been implemented yet._


### Nav Bar
```src/partials/site-nav.hbs```

```src/assets/scss/partials/_site-nav.scss```

The nav bar provided by this theme is extremely basic. It's a simple black bar which remains fixed a the top of the screen. The Foundation sticky plugin is not used for this, as the same result can be reached using pure CSS.

This means the nav bar is position: fixed at the top of the screen, and the header (which directly follows the nav bar) adds padding the size of the nav bar to give the correct appearance.


### Header
```headers are defined in each page, see src/index.hbs for an example```

```src/assets/scss/_header.scss```

There's not much to say about the header for this theme. It will pull in the publication cover if defined, and otherwise defaults to a dark grey color. The header is defined on each page (similar to the Casper theme), as there are variations between the various pages.

Unlike the casper theme, contentFor is used to define the header on each page. This allows default.hbs to place the header in the correct position. In the casper theme, the header is included as part of the body tag and requires the user to define the nav bar on each page.


### Footer
```src/partials/footer.hbs```

```src/assets/scss/partials/footer.scss```

The footer is also very simple. It's a black bar at the bottom of the page, which renders the copyright notice & the bottom nav from Casper.


### Index
```src/index.hbs```

```src/assets/scss/main.scss```

The index page provides a very basic post feed. While basic, the layout of the post tiles is still responsive with minimal media query usage. The index page is simple enough to not warrent it's own scss file. Instead the few styles used are defined in main.scss, as they're also shared with other pages.

### Post Card
```src/partials/post-card.hbs```

```src/assets/scss/partials/_post-card.scss```

The post card defines the look & feel of each blog post when displayed in a feed. The basic post card styles are defined in a mixin, as they're also used for the "Read Next Card".

Feeds are displayed on the following pages:
*author
*index
*tag
*post (below the post content)
*error-404

### Subscribe Modal
```src/partials/subscribe-modal.hbs```

```src/assets/scss/partials/_subscribe-modal.scss```

```src/assets/scss/partials/_subscribe.scss```

The subscribe modal is displayed if the blog has the subscriptions lab enabled and the user clicks the subscribe link in the top nav bar. This results in a full screen overlay, with a form to submit your email address to subscribe to the blog. Foundation reveal is used to create the full screen overlay effect. The style of the overlay is similar to that of the casper theme, but more basic (aka not as pretty).

You'll notice that part of the subscribe modal is broken up into a mixin. This is done to share these common properties with the inline subscribe form which is found on the post page.

### Post
```src/post.hbs```

```src/assets/scss/pages/_post.scss```

The post page contains the full contents of a blog post. If the post has a feature image, then that will be displayed as the header image, otherwise the blog publication image is used. The post overlaps the very bottom of the feature image, as it does in the casper theme. Like the casper theme, a negative margin is used to produce this effect. Otherwise the post page is very basic.

An inline version of the subscribe form is included (as it is in Casper) if the lab is enabled. Following this is a feed of posts, which will always start with a special post card, called the "read-next-card" (the name is from Casper). This card displays other posts with the same primary tag as the current post, and links to the tags page. It will only be rendered if the post has a tag, and that tag has at least 2 posts. Following this is a small post card feed with the next and previous post(s) if available.

### Tag
```src/tag.hbs```

The tag page is very simple and requires no dedicated styles. It defines a header which pulls in the tag name, description if available, or the number of posts in the tag. Following the header is a post card feed which contains all the posts from the tag.

### Author
```src/author.hbs```

```src/assets/scss/pages/_author.scss```

The author page displays the author's full name, bio, and some social links if defined. Following the header is a basic post card feed which contains the posts the author has made.

The author scss file is also used for the post page, and post card partial. It's for this reason that part of the styles are defined as mixins.

### Page
```src/page.hbs```

The "page" page is used when the user selects the page option from the post settings (Admin -> Stories). It displays the blog entry as it's own page, with a more simplified layout. No feed is included on this page, so the page will only contain the contents of the post. No styles are specific to the "page" page.

### Error
```src/error.hbs```

```src/assets/scss/_error.scss```

This appears to be a page that's displayed if the template fails to render? I have not tested this page as it seemed mostly pointless for the goal of this project. I made it reuse the HTML from default.hbs and copied the header from the index page.

### Error-404
```src/error-404.hbs```

```src/assets/scss/_error.scss```

Displayed when a page cannot be found. This is very basic and just centers the error text with a post feed below the error.

## Other SCSS Files
In addition to the files listed above, the following scss files also exist:

```src/assets/scss/_settings.scss```
Copied from the [Foundation Zurb Template](https://github.com/zurb/foundation-zurb-template). Defines defaults for the Foundation 6 framework.

```src/assets/scss/_color.scss```
Defines a few common colors used throughout the theme's scss files.

```src/assets/scss/_common.scss```
Defines mixins for displaying background images, and adding content padding to various sections. Also includes "color.scss".

```src/assets/scss/_foundation-styles.scss```
Imports styles from foundation. Only the styles that are currently needed are included.

```src/assets/scss/_social.scss```
Defines classes for the various social links. No styling is applied, so this is just a set of empty classes to expand upon.

```src/assets/scss/pages/_pages.scss```
This file just includes the other files in the same directory. It allows the main.scss file to import only _pages.scss.

```src/assets/scss/partials/_partials.scss```
This file just imports the other files in it's directory. This is just to clean up main.scss.

## JS
Webpack is configured to bundle all JS included from src/assets/js/main.js into a single main.js file. If the build is executed in production mode, then the resulting JS (and css) files will be minified.

Currently the only JS used is from foundation. The main.js file includes src/assets/js/lib/foundation-explicit-pieces.js, which in turn includes the various libraries we're using from foundation (quite like _foundation-styles.scss). The main.js file then calls "$(document).foundation();" to initialize the foundation JS libraries on page load.

The only JS function from foundation that's used is the reveal plugin.

## Build & Deploy
To get started, clone this repository, run ```npm install``` followed by ```gulp```. Note that you'll need node & gulp-cli installed. Gulp will then execute the various tasks required to compile scss to css, compile js with babel, and bundle it with webpack. The resulting files will be placed in the dist directory (which will be created if it doesn't exist).

A zip file ready for uploading to the Ghost Admin panel is also produced at
```dist/ghost-foundation-starter.zip```

You can upload this file directly into the admin panel to see the base styles provided.

Beyond that, I've left comments where I feel appropriate. This project should be easier to digest then Casper, or another complete theme.
