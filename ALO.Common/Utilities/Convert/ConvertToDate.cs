using System;
using System.Globalization;

namespace ALO.Common.Utilities.ConvertDt
{
    public static class ConvertToDate
    {
        public static string ConvertToPesainDate(this DateTime dateTime)
        {
            var persian = new PersianCalendar();

            return $"{persian.GetYear(dateTime)}/{persian.GetMonth(dateTime)}/{persian.GetDayOfMonth(dateTime)}";
        }

        public static DateTime ConvertToDateTime(this string persianDate)
        {
            PersianCalendar pc = new PersianCalendar();
            return new DateTime(int.Parse(persianDate.Split('/')[0]), int.Parse(persianDate.Split("/")[1]), int.Parse(persianDate.Split("/")[2]),pc);
        }
        public static string ToTimeString(this TimeSpan span)
        {
            return string.Format("{0:00}:00", span.Hours);
        }
        public static string RelativeDate(this DateTime date)
        {
            const int SECOND = 1;
            const int MINUTE = 60 * SECOND;
            const int HOUR = 60 * MINUTE;
            const int DAY = 24 * HOUR;
            const int MONTH = 30 * DAY;

            var ts = new TimeSpan(DateTime.Now.Ticks - date.Ticks);
            double delta = Math.Abs(ts.TotalSeconds);

            if (delta < 1 * MINUTE)
                return ts.Seconds == 1 ? "لحظاتی پیش" : ts.Seconds + " ثانیه پیش";

            if (delta < 2 * MINUTE)
                return "دقایقی پیش";

            if (delta < 45 * MINUTE)
                return ts.Minutes + " دقیقه پیش";

            if (delta < 90 * MINUTE)
                return "ساعاتی پیش";

            if (delta < 24 * HOUR)
                return ts.Hours + " ساعت پیش";

            if (delta < 48 * HOUR)
                return "دیروز";

            if (delta < 30 * DAY)
                return ts.Days + " روز پیش";

            if (delta < 12 * MONTH)
            {
                int months = Convert.ToInt32(Math.Floor((double)ts.Days / 30));
                return months <= 1 ? "ماه پیش" : months + " ماه پیش";
            }
            else
            {
                int years = Convert.ToInt32(Math.Floor((double)ts.Days / 365));
                return years <= 1 ? "پارسال" : years + " سال پیش";
            }
        }
    }
}
