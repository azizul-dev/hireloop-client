import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID= {
    'seeker_pro' : 'price_1TgTmJ7uQiA59qe76uag6FvF',
    'seeker_premium' : 'price_1TgUG97uQiA59qe7V6G7Youn',
    'recruiter_growth' : 'price_1TgUHD7uQiA59qe7DkzR6UVT',
    'recruiter_enterprise' : 'price_1TgUIL7uQiA59qe7wMvSrvBK',
}