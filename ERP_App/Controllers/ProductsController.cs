using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ERP_App.Models;
using ERP_App.Helper;

namespace ERP_App.Controllers
{
    public class ProductsController : Controller
    {
        private ERPEntities db = new ERPEntities();

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ProductsList()
        {
            var query = (from q in db.Products
                         where q.Status == true
                         select new
                         {
                             Id = q.Id,
                             Name = q.Name,
                             Category = q.Categories.Category,
                             Unit = q.Units.Unit
                         });

            return Json(new { data = query.ToList() }, JsonRequestBehavior.AllowGet);
        }

        // GET: Products/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Products products = db.Products.Find(id);
            if (products == null)
            {
                return HttpNotFound();
            }
            return View(products);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            ViewBag.fk_Categories = new SelectList(db.Categories, "Category", "Category");
            ViewBag.fk_Units = new SelectList(db.Units, "Unit", "Unit");
            return View();
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Create([Bind(Include = "Id,Name,fk_Category,Status,fk_Unit")] Products products)
        {
            String message = string.Empty;
            if (ModelState.IsValid)
            {
                //Check if the Category Exist!
                CategoryController category = new CategoryController();
                var existCategory = category.CategoryExist(products.fk_Category);
                if (existCategory == true)
                {
                    products.fk_Category = db.Categories.Where(x => x.Category.ToUpper() == products.fk_Category.ToUpper()).Select(x => x.Id).SingleOrDefault();
                }
                else
                {
                    Categories newCategory = new Categories();
                    newCategory.Category = products.fk_Category;
                    newCategory.Status = true;
                    category.Create(newCategory);
                }

                //Check if the Unit Exist!
                UnitController unit = new UnitController();
                var existUnit = unit.UnitExist(products.fk_Unit);
                if (existUnit == true)
                {
                    products.fk_Unit = db.Units.Where(x => x.Unit.ToUpper() == products.fk_Unit.ToUpper()).Select(x => x.Id).SingleOrDefault();
                }
                else
                {
                    Units newUnit = new Units();
                    newUnit.Unit = products.fk_Unit;
                    newUnit.Status = true;
                    unit.Create(newUnit);
                }

                //Create Product
                GenerateId generator = new GenerateId();
                products.Id = generator.generateID();
                db.Products.Add(products);
                db.SaveChanges();
                message = "The product was successfuly created";
                return Json(new { message = message }, JsonRequestBehavior.AllowGet);
            }
            message = "It has benn an error creating the product";
            return Json(new {message=message }, JsonRequestBehavior.AllowGet);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Products products = db.Products.Find(id);
            if (products == null)
            {
                return HttpNotFound();
            }
            return View(products);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,fk_Category,Status,fk_Unit")] Products products)
        {
            if (ModelState.IsValid)
            {
                db.Entry(products).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(products);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Products products = db.Products.Find(id);
            if (products == null)
            {
                return HttpNotFound();
            }
            return View(products);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Products products = db.Products.Find(id);
            db.Products.Remove(products);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
