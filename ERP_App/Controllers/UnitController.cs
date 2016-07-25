using ERP_App.Helper;
using ERP_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP_App.Controllers
{
    public class UnitController : Controller
    {
        private ERPEntities db = new ERPEntities();

        // GET: Unit
        public ActionResult Index()
        {
            return View();
        }

        //GET: Unit List
        public JsonResult GetUnits()
        {
            var query = (from q in db.Units
                         where q.Status == true
                         select new
                         {
                             Id = q.Id,
                             Unit = q.Unit
                         });
            return Json(new { data = query.ToList() }, JsonRequestBehavior.AllowGet);
        }

        //POST: Create Category
        [HttpPost]
        public JsonResult Create([Bind(Include = "Id,Unit,Status")] Units unit)
        {
            GenerateId generator = new GenerateId();
            unit.Id = generator.generateID();
            db.Units.Add(unit);
            db.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }

        public bool UnitExist(string unitName)
        {
            var response = db.Units.Where(x => x.Unit.ToUpper() == unitName.ToUpper());
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