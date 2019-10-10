module.exports = {
    test: async (prm, db) => {
        const result = db.find_user('zachary.spilinek@gmail.com')
        console.log(result)
    }
}