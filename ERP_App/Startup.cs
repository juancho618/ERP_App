using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ERP_App.Startup))]
namespace ERP_App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
