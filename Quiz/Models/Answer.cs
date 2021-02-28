using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Models
{
    public class Answer
    { 
        public int Id { get; set; }
        public string AnswerText { get; set; }
        public Question MyProperty { get; set; }
        public bool IsCorrect { get; set; }

        public Answer()
        {

        }
    }
}
