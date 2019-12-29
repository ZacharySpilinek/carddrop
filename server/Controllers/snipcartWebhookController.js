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
            // await db.set_subscription_id([webhook.content.id, splitUserDefinedId[splitUserDefinedId.length - 1], interval])
            // splitUserDefinedId[splitUserDefinedId.length - 1] = cust_id
            // interval = "yearly"
            // webhook.content.id = subscription id

            const currentSubscriptions = await db.get_current_subscriptions(splitUserDefinedId[splitUserDefinedId.length - 1])
            if (currentSubscriptions === 'null') {
                currentSubscriptions = []
            } else {
                currentSubscriptions = JSON.parse(currentSubscriptions)
            }
            const userCards = await db.get_selected_cards(splitUserDefinedId[splitUserDefinedId.length - 1])
            const unboughtCards = userCards.filter(el => el.bought !== true)
            let cardsBought = []
            unboughtCards.forEach(el => {
                cardsBought.push({tree_rel_id: el.tree_rel_id, card_id: el.card_id})
            })
            let newSub = {
                cust_id: splitUserDefinedId[splitUserDefinedId.length - 1],
                sub_id: webhook.content.id,
                interval: interval,
                cards_bought: cardsBought
            }
            currentSubscriptions.push(newSub)
            let stringAllSubscriptions = JSON.stringify(currentSubscriptions)
            await db.add_alter_subscriptions([splitUserDefinedId[splitUserDefinedId.length - 1], stringAllSubscriptions])

            // mark cards as bought
            await db.set_cards_as_bought(splitUserDefinedId[splitUserDefinedId.length - 1])

            console.log(`Subscription for ${email} updated!`)

        } else {
            console.log('no user found under that email')
        }
    }
}