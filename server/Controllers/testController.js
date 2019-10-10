module.exports = {
    updateSubId: async (db, webhook) => {
        let {email} = webhook.content.user
        const result = await db.find_user_by_email(email)
        console.log(result)
    }
}