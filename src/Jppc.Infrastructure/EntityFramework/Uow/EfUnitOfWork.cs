using System;
using System.Threading.Tasks;

namespace Jppc.Infrastructure.EntityFramework.Uow
{
    public class EfUnitOfWork : IUnitOfWork
    {
        private readonly JppcDbContext _context;

        public EfUnitOfWork(JppcDbContext context)
        {
            _context = context;
        }

        public async Task ExecuteAsync(Func<Task> query)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                await query();
                transaction.Commit();
            }
        }
    }
}
