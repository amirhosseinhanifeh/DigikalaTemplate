using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ALO.Common.Utilities.ConvertTo
{
    public static class ConvertTo
    {
        public static long? Tolong(this string data)
        {
            long value;
            if(long.TryParse(data,out value))
            {
                return value;
            }
            return null;
        }
        public static string toPersianNumber(this string input)
        {
            if (input == null)
                return "";
            Dictionary<string, string> LettersDictionary = new Dictionary<string, string>
            {
                ["0"] = "۰",
                ["1"] = "۱",
                ["2"] = "۲",
                ["3"] = "۳",
                ["4"] = "۴",
                ["5"] = "۵",
                ["6"] = "۶",
                ["7"] = "۷",
                ["8"] = "۸",
                ["9"] = "۹",
                [","]=","
            };
            return LettersDictionary.Aggregate(input, (current, item) =>
                         current.Replace(item.Key, item.Value));
        }

        public static string toEngilishNumber(this string persianStr)
        {
            Dictionary<string, string> LettersDictionary = new Dictionary<string, string>
            {
                ["۰"] = "0",
                ["۱"] = "1",
                ["۲"] = "2",
                ["۳"] = "3",
                ["۴"] = "4",
                ["۵"] = "5",
                ["۶"] = "6",
                ["۷"] = "7",
                ["۸"] = "8",
                ["۹"] = "9"
            };
            return LettersDictionary.Aggregate(persianStr, (current, item) =>
                         current.Replace(item.Key, item.Value));
        }
    }
}
