module.exports = {
    getUser: (req, res, next) => {
        // console.log(req.session.user)
        res.status(200).send(req.session.user)
    }
}