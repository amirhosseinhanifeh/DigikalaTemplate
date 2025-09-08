using ALO.Common.Enums;
using ALO.DataAccessLayer.UnitOfWork;
using ALO.DomainClasses.Entity.Account;
using ALO.Service.Service.Account;
using FluentAssertions;
using Moq;
using System.Linq.Expressions;
using static ALO.Common.Messages.Message;

namespace Ghaleb.Test
{
    public class UserServiceTests
    {
        private readonly Mock<IUnitOfWork> _mockUow;
        private readonly UserService _service;
        public UserServiceTests()
        {
            _mockUow = new Mock<IUnitOfWork>();
            _service = new UserService(_mockUow.Object);
        }

        [Fact]
        public async Task Authenticate_ShouldReturnSuccess_WhenUserExists()
        {
            var username = "test@test.com";
            var password = "1230994";
            var fakeUser = new tbl_Users { Email = username, Password = password };
            _mockUow.Setup(u => u.GetAsync<tbl_Users>(
        It.IsAny<Expression<Func<tbl_Users, bool>>>(),
        It.IsAny<string[]>()))
       .ReturnsAsync(fakeUser);


            var result = await _service.Authenticate(username, password);
            result.Status.Should().Be(Status.Success);
            result.model.Should().NotBeNull();
            result.Message.Should().Be(SuccessfullMessage);

        }
        [Fact]
        public async Task Authenticate_ShouldReturnFailed_WhenUserNotFound()
        {
            _mockUow.Setup(u => u.GetAsync(
                    It.IsAny<Expression<Func<tbl_Users?, bool>>>(),
                    It.IsAny<string[]>()))
                   .ReturnsAsync((tbl_Users?)null);

            var result = await _service.Authenticate("wrong@test.com", "wrong");

            result.Status.Should().Be(Status.Failed);
            result.model.Should().BeNull();
            result.Message.Should().Be(FailLoginMessage);
        }
    }
}
