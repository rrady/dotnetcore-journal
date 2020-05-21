using System.Threading.Tasks;
using PayPal.v1.Payments;

namespace Jppc.Infrastructure.PayPal.Client
{
    public interface IPayPalClient
    {
        Task CreatePaymentAsync(Amount amount, ShippingAddress shippingAddress, Item article);
    }
}
