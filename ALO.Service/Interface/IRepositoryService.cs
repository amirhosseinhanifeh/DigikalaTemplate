using ALO.DomainClasses;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface
{
    public interface IRepositoryService<T> where T : BaseEntity
    {
        Task<ListResultViewModel<bool>> Delete(long Id);
        Task<ListResultViewModel<IEnumerable<DropDownListDTO>>> GetDropDownSelect ();
    }
}
