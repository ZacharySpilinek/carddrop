module.exports = {
    updateSubId: async (db, webhook) => {
        let {email} = webhook.content.user
        const result = await db.find_user_by_email(email)
        
        if (result[0]) {
            let interval = ''
            if (webhook.content.schedule.interval === "Year"){
                interval = 'yearly'
            }
            let splitUserDefinedId = webhook.content.userDefinedId.split('-')
            await db.set_subscription_id([webhook.content.id, splitUserDefinedId[splitUserDefinedId.length - 1], interval])
        } else {
            console.log('no user found under that email')
        }
    }
}