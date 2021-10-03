

function getIndex(req, res, next) {
    return res.render('index', { title: 'Express' });
}

module.exports = {
    getIndex
}