using System.Collections.Generic;

namespace Jppc.Infrastructure.Pagination
{
    public interface IFilter<TResult, in TQuery> where TQuery : IQuery
    {
        IEnumerable<TResult> Filter(IEnumerable<TResult> values, TQuery query);
    }
}
