module.exports = {
    updateSubId: async (db, webhook) => {
        let {email} = webhook.content.user
        // if the webhook isn't related to a subscription being created, then stop
        if (webhook.eventName !== "subscription.created") return res.sendStatus(200)
        const result = await db.find_user_by_email(email)
        
        if (result[0]) {
            let interval = ''
            if (webhook.content.schedule.interval === "Year"){
                interval = 'yearly'
            }
            let splitUserDefinedId = webhook.content.userDefinedId.split('-')
            // await db.set_subscription_id([webhook.content.id, splitUserDefinedId[splitUserDefinedId.length - 1], interval])
            // splitUserDefinedId[splitUserDefinedId.length - 1] = cust_id
            // interval = "yearly"
            // webhook.content.id = subscription id
            // ex startDate = "2019-12-05"
            let startDate = webhook.content.schedule.startsOn.slice(0, 10);
            // converts startDate to an actual javascript recognized date
            var parsedStartDate = new Date(startDate)
            // adds one year to that date
            parsedStartDate.setFullYear(parsedStartDate.getFullYear() + 1)
            // converts back to ISO string and cuts off time, keeping year, month, and day
            // ex renewDate = "2020-12-05"
            let renewDate = parsedStartDate.toISOString().slice(0, 10)
            await db.set_subscription_id([splitUserDefinedId[splitUserDefinedId.length - 1], webhook.content.id, interval, startDate, renewDate])
            console.log(`Subscription for ${email} updated!`)

        } else {
            console.log('no user found under that email')
        }
    }
}