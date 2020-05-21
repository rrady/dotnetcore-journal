using PayPal.Core;

namespace Jppc.Infrastructure.PayPal.Client
{
    public static class PayPalClientFactory
    {
        public static PayPalClient Create(Mode mode, string clientId, string clientSecret)
        {
            PayPalEnvironment env = null;

            switch (mode)
            {
                case Mode.live:
                    env = new LiveEnvironment(clientId, clientSecret);
                    break;
                case Mode.sandbox:
                    env = new SandboxEnvironment(clientId, clientSecret);
                    break;
            }

            PayPalHttpClient client = new PayPalHttpClient(env);
            return new PayPalClient(client);
        }
    }
}
