import PNotify from "pnotify/dist/es/PNotify";

function successDesktopPNotify() {
    PNotify.success({
        title: 'Success Desktop Notice',
        text: "I'm a success desktop notification, if you have given me a permission.",
        modules: {
            Desktop: {
                desktop: true
            }
        }
    }).on('click', function(e) {
        if (e.target.className.match('ui-pnotify-sticker') ||
            e.target.className.match('ui-pnotify-closer') ||
            e.target.className.match('brighttheme-icon-sticker')||
            e.target.className.match('brighttheme-icon-closer')) {
            return;
        }
        alert('Hey! You clicked the desktop notification!');
    });
}




module.exports.successDesktopPNotify = successDesktopPNotify;