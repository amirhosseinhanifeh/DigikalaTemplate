using ALO.Common.Utilities.ConvertDt;
using ALO.Common.Utilities.ConvertTo;
using ALO.DomainClasses.Entity.Financial;
using ALO.ViewModels.Financial;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.MappingProfile.Financial
{
    public class FinancialProfile:Profile
    {
        public FinancialProfile()
        {
            //CreateMap<, tbl_Reservation>();

            CreateMap<tbl_FinancialAccount, FinancialAccountViewModel>()
                .ForMember(x => x.Date, dec => dec.MapFrom(y => y.CreatedDate.ConvertToPesainDate().toPersianNumber()))
                .ForMember(x => x.Screditor, dec => dec.MapFrom(y => y.Creditor.ToString("n0").toPersianNumber()))
                .ForMember(x => x.Sdebtor, dec => dec.MapFrom(y => y.Debtor.ToString("n0").toPersianNumber()));

        }
    }
}
