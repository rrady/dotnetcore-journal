using System;

namespace Jppc.Core.Exceptions
{
    public class JppcException : Exception
    {
        public string Code { get; }

        public JppcException()
        {
        }

        public JppcException(string code)
        {
            Code = code;
        }

        public JppcException(string message, params object[] args) : this(string.Empty, message, args)
        {
        }

        public JppcException(string code, string message, params object[] args) : this(null, code, message, args)
        {
        }

        public JppcException(Exception innerException, string message, params object[] args) : this(innerException, string.Empty, message, args)
        {
        }

        public JppcException(Exception innerException, string code, string message, params object[] args) : base(string.Format(message, args), innerException)
        {
            Code = code;
        }
    }
}
