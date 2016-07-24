using ERP_App.Helper;
using ERP_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP_App.Controllers
{
    public class CategoryController : Controller
    {
        private ERPEntities db = new ERPEntities();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }
        //POST: Create Category
        [HttpPost]
        public JsonResult Create([Bind(Include ="Id,Category,Status")] Categories category)
        {
            GenerateId generator = new GenerateId();
            category.Id = generator.generateID();
            db.Categories.Add(category);
            db.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }

        public bool CategoryExist(string categoryName)
        {
            var response = db.Categories.Where(x => x.Category.ToUpper()== categoryName.ToUpper());
            if (response.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}