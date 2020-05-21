using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jppc.Core.Domain.Entities;
using Jppc.Core.Exceptions;
using Jppc.Infrastructure.EntityFramework.Repository;
using Jppc.Infrastructure.PayPal.Client;

using DomainPayment = Jppc.Core.Domain.Entities.Payment;
using PayPalShippingAddress = PayPal.v1.Payments.ShippingAddress;
using PayPalAmount = PayPal.v1.Payments.Amount;
using PayPalItem = PayPal.v1.Payments.Item;

namespace Jppc.WebApp.Services.Payment
{
    public class PaymentService : IPaymentService
    {
        private readonly ISqlRepository<Article> _articleSqlRepository;
        private readonly ISqlRepository<DomainPayment> _paymentSqlRepository;
        private readonly ISqlRepository<User> _userSqlRepository;
        private readonly IPayPalClient _paypalClient;

        public PaymentService(ISqlRepository<Article> articleSqlRepository,
            ISqlRepository<DomainPayment> paymentSqlRepository,
            ISqlRepository<User> userRepository, IPayPalClient paypalClient)
        {
            _articleSqlRepository = articleSqlRepository;
            _userSqlRepository = userRepository;
            _paymentSqlRepository = paymentSqlRepository;
            _paypalClient = paypalClient;
        }


        public async Task ArticlePaymentAsync(Guid id, Guid userId, Guid articleId)
        {
            var article = await _articleSqlRepository.GetAsync(articleId);
            if (article == null)
            {
                throw new JppcException(Codes.ArticleNotFound,
                    $"Article: '{articleId}' doesn't exists.");
            }

            var user = await _userSqlRepository.GetAsync(userId);
            if (user == null)
            {
                throw new JppcException(Codes.UserNotFound,
                    $"User: '{userId}' doesn't exists.");
            }

            //var domainShippingAddress = await _shippingAddressSqlRepository.GetAsync(sa => sa.UserId == userId);
            //if (domainShippingAddress == null)
            //{
            //    throw new JppcException(Codes.ShippingAddressNotFound,
            //        $"Shipping address for user: '{userId}' doesn't exists.");
            //}

            var paypalItem = new PayPalItem()
            {
                Name = article.Name,
                Price = article.Price.ToString(),
                Quantity = "1",
                Currency = "RON",
                Description = "JPPC Article"
            };

            var paypalAmount = new PayPalAmount()
            {
                Total = article.Price.ToString(),
                Currency = "RON"
            };

            //var paypalShippingAddress = new PayPalShippingAddress()
            //{
            //    City = domainShippingAddress.City,
            //    PostalCode = domainShippingAddress.PostalCode,
            //    State = domainShippingAddress.State,
            //    Line1 = domainShippingAddress.Street + " " + domainShippingAddress.Country,
            //    Phone = "", // user.Phone
            //    RecipientName = user.FirstName + " " + user.LastName
            //};

            await _paymentSqlRepository.AddAsync(new DomainPayment(id, articleId, userId));
            await _paypalClient.CreatePaymentAsync(paypalAmount, null, paypalItem);
        }
    }
}
