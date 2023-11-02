exports.profile = (req, res, next) => {
    res.send(JSON.stringify({title:"profile"}));
}