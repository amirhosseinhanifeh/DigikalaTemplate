using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ALO.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2024, 8, 9, 22, 45, 58, 814, DateTimeKind.Local).AddTicks(2343));

            migrationBuilder.InsertData(
                table: "tbl_Role",
                columns: new[] { "Id", "CreatedDate", "Createdby", "IsActive", "IsDelete", "ModifiedDate", "Modifiedby", "RoleIndex", "RoleName" },
                values: new object[] { 1L, new DateTime(2024, 8, 9, 22, 45, 58, 814, DateTimeKind.Local).AddTicks(2516), null, true, false, null, null, "0", "Admin" });

            migrationBuilder.InsertData(
                table: "tbl_Users",
                columns: new[] { "Id", "BrowserName", "Email", "IP", "IsActive", "IsDelete", "LastLogin", "Mobile", "Password", "RegisteredDate", "Registeredby" },
                values: new object[] { 1L, "Chrome", "admin@gmail.com", "127.0.0.1", true, false, new DateTime(2024, 8, 9, 22, 45, 58, 814, DateTimeKind.Local).AddTicks(2551), "09121234567", "123456", new DateTime(2024, 8, 9, 22, 45, 58, 814, DateTimeKind.Local).AddTicks(2550), 2 });

            migrationBuilder.InsertData(
                table: "tbl_Profile",
                columns: new[] { "Id", "AvatarId", "FirstName", "Gender", "LastName", "NationalCode" },
                values: new object[] { 1L, null, "مدیر", 1, "سایت", "1234567891" });

            migrationBuilder.InsertData(
    table: "tbl_UserInRoles",
    columns: new[] { "RolesId", "UsersId" },
    values: new object[] { 1L, 1L });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "tbl_Profile",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "tbl_Role",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "tbl_Users",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2024, 6, 27, 18, 44, 42, 348, DateTimeKind.Local).AddTicks(1955));
        }
    }
}
