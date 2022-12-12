using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.Common.Utilities.Generate
{
    public class Generate
    {
        public static string GenerateCode(int count = 4)
        {
            Random rnd = new Random();
            string Code = "";
            for(int i =1;i<=count;i++)
            {
                Code += rnd.Next(0,9).ToString();
            }
            return Code;
        }
    }
}
