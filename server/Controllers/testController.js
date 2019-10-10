module.exports = {
    test: async (prm, db) => {
        const result = await db.test()
        console.log(result)
    }
}