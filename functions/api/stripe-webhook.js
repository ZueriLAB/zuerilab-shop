import Stripe from "stripe";

export async function onRequestPost({ request, env }) {
  try {
    if (!env.STRIPE_SECRET_KEY) {
      return new Response("STRIPE_SECRET_KEY fehlt", { status: 500 });
    }

    if (!env.STRIPE_WEBHOOK_SECRET) {
      return new Response("STRIPE_WEBHOOK_SECRET fehlt", { status: 500 });
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Stripe-Signatur fehlt", { status: 400 });
    }

    const body = await request.text();

    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Stripe Webhook Signaturfehler:", error);

      return new Response("Ungültige Stripe-Signatur", {
        status: 400,
      });
    }

    console.log("Stripe Event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("Zahlung erfolgreich:", session.id);
      console.log("Bestellnummer:", session.metadata?.orderNumber);
      console.log("Kunden-E-Mail:", session.customer_details?.email);
    }

    return new Response(
      JSON.stringify({
        received: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Webhook Fehler:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Webhook Fehler",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}