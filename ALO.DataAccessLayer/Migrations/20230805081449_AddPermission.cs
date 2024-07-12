using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class AddPermission : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BrowserName",
                table: "tbl_Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogin",
                table: "tbl_Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "CanComment",
                table: "tbl_Blogs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "tbl_Menutbl_Users",
                columns: table => new
                {
                    MenusId = table.Column<long>(type: "bigint", nullable: false),
                    UsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Menutbl_Users", x => new { x.MenusId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_tbl_Menutbl_Users_tbl_Menus_MenusId",
                        column: x => x.MenusId,
                        principalTable: "tbl_Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_Menutbl_Users_tbl_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "tbl_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Permission",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Permissiontbl_Users",
                columns: table => new
                {
                    PermissionsId = table.Column<long>(type: "bigint", nullable: false),
                    UsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Permissiontbl_Users", x => new { x.PermissionsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_tbl_Permissiontbl_Users_tbl_Permission_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "tbl_Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_Permissiontbl_Users_tbl_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "tbl_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 5, 11, 44, 48, 716, DateTimeKind.Local).AddTicks(5673));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Menutbl_Users_UsersId",
                table: "tbl_Menutbl_Users",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Permissiontbl_Users_UsersId",
                table: "tbl_Permissiontbl_Users",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_Menutbl_Users");

            migrationBuilder.DropTable(
                name: "tbl_Permissiontbl_Users");

            migrationBuilder.DropTable(
                name: "tbl_Permission");

            migrationBuilder.DropColumn(
                name: "BrowserName",
                table: "tbl_Users");

            migrationBuilder.DropColumn(
                name: "LastLogin",
                table: "tbl_Users");

            migrationBuilder.DropColumn(
                name: "CanComment",
                table: "tbl_Blogs");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 28, 22, 52, 21, 53, DateTimeKind.Local).AddTicks(9117));
        }
    }
}
