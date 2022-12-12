using ALO.ViewModels.Forms;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Forms
{
    public interface IFormContactUsService
    {
        Task<ListResultViewModel<bool>> CreateAsync(FormContactUsDTO model);
    }
}
