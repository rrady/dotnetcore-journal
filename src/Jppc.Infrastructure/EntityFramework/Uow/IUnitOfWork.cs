using System;
using System.Threading.Tasks;

namespace Jppc.Infrastructure.EntityFramework.Uow
{
    public interface IUnitOfWork
    {
        Task ExecuteAsync(Func<Task> query);
    }
}
