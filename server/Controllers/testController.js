module.exports = {
    updateSubId: async (db, webhook) => {
        let {email} = webhook.content.user
        const result = await db.find_user({email})
        console.log(result)
    }
}