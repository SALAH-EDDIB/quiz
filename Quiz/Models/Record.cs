using Microsoft.AspNetCore.Identity;

namespace Quiz.Models
{
    public class Record
    {

        public int Id { get; set; }
        public int Score { get; set; }
        public IdentityUser User { get; set; }

    }
}
