using System.Collections.Generic;
using System.Threading.Tasks;
using BraintreeHttp;
using PayPal.Core;
using PayPal.v1.Payments;

namespace Jppc.Infrastructure.PayPal.Client
{
    public class PayPalClient : IPayPalClient
    {
        private PayPalHttpClient _paypalClient;

        public PayPalClient(PayPalHttpClient client)
        {
            _paypalClient = client;
        }

        public async Task CreatePaymentAsync(Amount amount, ShippingAddress shippingAddress, Item article)
        {
            var payment = new Payment()
            {
                Intent = "sale",
                Transactions = new List<Transaction>()
                {
                    new Transaction()
                    {
                        Amount = amount,
                        ItemList = new ItemList()
                        {
                            Items = new List<Item>()
                            {
                                article
                            },
                            //ShippingAddress = shippingAddress
                        }
                    }
                },
                //RedirectUrls = new RedirectUrls()
                //{
                //    CancelUrl = "https://example.com/cancel",
                //    ReturnUrl = "https://example.com/return"
                //},
                Payer = new Payer()
                {
                    PaymentMethod = "paypal"
                }
            };

            PaymentCreateRequest request = new PaymentCreateRequest();
            request.RequestBody(payment);

            try
            {
                HttpResponse response = await _paypalClient.Execute(request);
                var statusCode = response.StatusCode;
                Payment result = response.Result<Payment>();
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
            }
        }
    }
}
