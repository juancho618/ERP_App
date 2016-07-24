using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP_App.Helper
{
    public class GenerateId
    {
        public string generateID()
        {
            return Guid.NewGuid().ToString("N");
        }
    }
}