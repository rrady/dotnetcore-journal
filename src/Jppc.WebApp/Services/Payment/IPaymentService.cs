using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jppc.WebApp.Services.Payment
{
    public interface IPaymentService
    {
        Task ArticlePaymentAsync(Guid id, Guid userId, Guid articleId);
    }
}
