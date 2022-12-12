using ALO.DomainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DataAccessLayer.UnitOfWork
{
    public interface IUnitOfWork
    {

        #region Create & Update & Deleted

        IQueryable<TEntity> GetAllAsync<TEntity>(Expression<Func<TEntity, bool>> expression, string[] includes = null) where TEntity :class;

        Task<TEntity> GetAsync<TEntity>(Expression<Func<TEntity, bool>> expression, string[] includes = null) where TEntity : class;

        TEntity GetBaseEntity<TEntity>(Expression<Func<TEntity, bool>> expression, string[] includes = null) where TEntity :BaseEntity;

        TEntity Create<TEntity>(TEntity entity) where TEntity : class;

        void Update<TEntity>(TEntity entity) where TEntity : class;

        void Delete<TEntity>(TEntity entity) where TEntity : class;

        void CreateRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class;

        void UpdateRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class;

        void DeleteRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class;

        TEntity CreateBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity;
        void UpdateBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity;
        void DeletedBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity;
        void SoftDeletedBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void CreateRangeBaseEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity;
        void UpdateRangeBaseEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity;
        void DeletedRangeBaseEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity;
        #endregion

    }
}
