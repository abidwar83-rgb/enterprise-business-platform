import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export interface CreatePaymentIntentParams {
  amount: number
  currency: string
  customerId?: string
  metadata?: Record<string, string>
}

export interface CreateSubscriptionParams {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
}

export class StripeService {
  async createCustomer(email: string, name?: string) {
    return stripe.customers.create({
      email,
      name,
    })
  }

  async createPaymentIntent(params: CreatePaymentIntentParams) {
    return stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency,
      customer: params.customerId,
      metadata: params.metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })
  }

  async createSubscription(params: CreateSubscriptionParams) {
    return stripe.subscriptions.create({
      customer: params.customerId,
      items: [{ price: params.priceId }],
      metadata: params.metadata,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })
  }

  async createInvoice(customerId: string, items: Array<{ price: string; quantity: number }>) {
    const invoice = await stripe.invoices.create({
      customer: customerId,
      auto_advance: true,
    })

    for (const item of items) {
      await stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        price: item.price,
        quantity: item.quantity,
      })
    }

    return stripe.invoices.finalizeInvoice(invoice.id)
  }

  async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.cancel(subscriptionId)
  }

  async refundPayment(paymentIntentId: string, amount?: number) {
    return stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
    })
  }

  async getCustomerInvoices(customerId: string) {
    return stripe.invoices.list({
      customer: customerId,
      limit: 100,
    })
  }

  async getSubscription(subscriptionId: string) {
    return stripe.subscriptions.retrieve(subscriptionId)
  }
}

export const stripeService = new StripeService()