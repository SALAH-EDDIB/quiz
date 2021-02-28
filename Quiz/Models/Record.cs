using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Models
{
    public class Record
    {

        public int Id { get; set; }
        public int Score { get; set; }
        public IdentityUser User { get; set; }

    }
}
