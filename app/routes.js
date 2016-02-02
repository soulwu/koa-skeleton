module.exports = {

    index: function *(next) {
        yield next;
        this.render('index', {
            title: process.env.APP_NAME
        });
    }

};
