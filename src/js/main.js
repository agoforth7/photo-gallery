function View (data) {
    this.data = data;
    this.el = $('<div></div>');
}

// AppView

var images = [
    {image: 'assets/beach1.jpg'},
    {image: 'assets/beach2.jpg'},
    {image: 'assets/beach3.jpg'},
    {image: 'assets/sunrise-beach.jpg'},
    {image: 'assets/cloudy-beach.jpg'},
    {image: 'assets/maldives.jpg'}
    ];

function AppView (images) {
    View.call(this, images);
}

AppView.prototype = Object.create(View.prototype);

AppView.prototype.render = function () {
    var fullView = new FullView();
    var galleryView = new GalleryView(this.data, function (url) {
        fullView.show(url);
    });

    fullView.render();
    galleryView.render();

    this.el.append(fullView.el);
    this.el.append(galleryView.el);
};

// GalleryView

function GalleryView (images, callback) {
    View.call(this, images);
    this.callback = callback;
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
    var _this = this;
    var thumbnail;

    this.el.addClass('gallery');

    for (var i = 0; i < this.data.length; i++) {
        thumbnail = $('<img/>');
        // thumbnail = $('<div></div>')
        thumbnail.addClass('thumb');
        thumbnail.attr('src', this.data[i].image)
        // thumbnail.css('background-image', 'url(' + this.data[i].image + ')');
        this.el.append(thumbnail);
    }

    this.el.on('click', function (e) {
        var url = $(e.target).attr('src');
        _this.callback(url);
    })
}

// FullView

function FullView () {
    View.call(this);
}

FullView.prototype = Object.create(View.prototype);

FullView.prototype.show = function (url) {
    this.el.css('background-image', 'url(' + url + ')');
}

FullView.prototype.render = function () {
    this.el.addClass('display', 'expanded');

    this.el.on('click', function (e) {
        $(e.target).toggleClass('expanded');
    })
}

var appView = new AppView(images);

appView.render();

$(document.body).append(appView.el);