using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.Data;
using Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Controllers
{
    public class RecordController : Controller
    {

        private readonly ApplicationDbContext _context;
        private UserManager<IdentityUser> _userManager;
        public RecordController(ApplicationDbContext context , UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        public async Task<IActionResult> Index()
        {
            return View(await _context.Record.Include(q => q.User).OrderByDescending(r => r.Score).ToListAsync());
        }



        [HttpPost]
        public async Task<JsonResult> Create(int score)
        {
            var user = await _userManager.GetUserAsync(User);

            var record = new Record
            {
                Score = score,
                User = user

            };


                _context.Add(record);
                await _context.SaveChangesAsync();


            return Json(record);

        }



    }
}
