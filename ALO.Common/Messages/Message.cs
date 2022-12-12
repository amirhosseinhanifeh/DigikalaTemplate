using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.Common.Messages
{
    public class Message
    {
        #region Constants Error Message

        private const string notFoundMessage = "رکورد مورد نظر یافت نشد";
        private const string successreturnmessage = "لیست با موفقیت برگردانده شد";
        private const string failMessage = "خطای سیستمی رخ داده است دوباره سعی کنید";
        private const string existMessage = "اطلاعات ارسال شده در سیستم وجود دارد ";
        private const string successfullMessage = "اطلاعات با موفقیت ثبت شد";
        private const string successfullDeleteMessage = "اطلاعات با موفقیت حذف شد";
        private const string comparepassword = "رمز عبور با تکرار رمز عبور مطابقت ندارد";

        private const string successfullLoginMessage = "ورود به سایت موفقیت آمیز بود. ";
        private const string faildLoginMessage = "نام کاربری یا کلمه عبور شما اشتباه است";
        private const string emptyListMessage = "هیچ رکوردی یافت نشد";
        private const string cancelReserveMessage = "متاسفانه کاربر رزرو خود را لغو کرد";

        #endregion

        #region Static Method Error Message

        public static string NotFoundMessage => notFoundMessage;
        public static string ComparePassword => comparepassword;
        public static string FailMessage => failMessage;
        public static string FailLoginMessage => faildLoginMessage;
        public static string ExistMessage => existMessage;
        public static string SuccessfullMessage => successfullMessage;
        public static string UserCreateSuccessfullMessage => "ثبت نام شما موفقیت آمیز بود میتوایند وارد پنل مدیریت خود شوید";
        public static string UserCreateFaildMessage => "خطا در ثبت نام لطفا دوباره تلاش کنید";
        public static string SuccessfullLoginMessage => successfullLoginMessage;
        public static string SuccessfullDeleteMessage => successfullDeleteMessage;
        public static string SuccessReturnList => successreturnmessage;
        public static string EmptyListMesssage => emptyListMessage;
        public static string CancelReserveMessage => cancelReserveMessage;


        #endregion
    }
}
