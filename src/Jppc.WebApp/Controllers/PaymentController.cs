using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Jppc.Core.Authentication;
using Jppc.Core.Domain.Entities;
using Jppc.Core.Mvc;
using Jppc.WebApp.Models;
using Jppc.WebApp.Dto;
using Jppc.WebApp.Services.Payment;

namespace Jppc.WebApp.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : BaseController
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment(CreatePaymentModel model)
        {
            model.BindId(m => m.Id);

            await _paymentService.ArticlePaymentAsync(model.Id, model.UserId, model.ArticleId);

            return NoContent();
        }
    }
}
