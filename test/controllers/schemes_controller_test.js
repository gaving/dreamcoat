require('../test_helper.js').controller('schemes', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: '',
        url: ''
    };
}

exports['schemes controller'] = {

    'GET new': function (test) {
        test.get('/schemes/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/schemes', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Scheme.find;
        Scheme.find = sinon.spy(function (id, callback) {
            callback(null, new Scheme);
        });
        test.get('/schemes/42/edit', function () {
            test.ok(Scheme.find.calledWith('42'));
            Scheme.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Scheme.find;
        Scheme.find = sinon.spy(function (id, callback) {
            callback(null, new Scheme);
        });
        test.get('/schemes/42', function (req, res) {
            test.ok(Scheme.find.calledWith('42'));
            Scheme.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var scheme = new ValidAttributes;
        var create = Scheme.create;
        Scheme.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, scheme);
            callback(null, scheme);
        });
        test.post('/schemes', {Scheme: scheme}, function () {
            test.redirect('/schemes');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var scheme = new ValidAttributes;
        var create = Scheme.create;
        Scheme.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, scheme);
            callback(new Error, scheme);
        });
        test.post('/schemes', {Scheme: scheme}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Scheme.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/schemes/1', new ValidAttributes, function () {
            test.redirect('/schemes/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Scheme.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/schemes/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

