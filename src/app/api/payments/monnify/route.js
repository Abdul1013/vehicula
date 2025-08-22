import { NextResponse } from 'next/server';

/**
 * Monnify payment webhook handler
 * @param {Request} request The incoming request object
 */
export async function POST(request) {
  // Validate Monnify IP address
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  const allowedIps = ['35.242.133.146'];
  
  if (!allowedIps.includes(clientIp)) {
    return new NextResponse(JSON.stringify({
      message: 'We are not here at the moment! If you are receiving this message after completing a payment, kindly contact Vehiculars support on +234 913 335 2533 with your payment slip from the POS agent'
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const data = await request.json();
    
    // Initial response
    let response = {
      responseCode: "01",
      responseMessage: "Offline transactions only"
    };

    // Validate required fields
    if (data?.eventData?.offlineProductInformation?.code && 
        data?.eventData?.product?.reference) {
      
      const amount = data.eventData.amountPaid;
      const paymentRecipientId = data.eventData.product.reference;
      const reference = data.eventData.paymentReference;
      const productCode = data.eventData.offlineProductInformation.code;

      // TODO: Implement database checks and payment processing logic
      // This will be implemented as we migrate the PHP logic

      response = {
        responseCode: "00",
        paymentRecipientId: paymentRecipientId,
        paymentToken: "Payment received and account updated"
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({
      responseCode: "01",
      responseMessage: "Error processing payment"
    }, { status: 500 });
  }
}
