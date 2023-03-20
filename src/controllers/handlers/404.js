module.exports = (req, res) => {
    res.status(404);
    res.render('404', { url: req.url });
    return;

}

