using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class AddOrderStateHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Permissiontbl_Users_tbl_Permission_PermissionsId",
                table: "tbl_Permissiontbl_Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_Permission",
                table: "tbl_Permission");

            migrationBuilder.DropColumn(
                name: "OrderState",
                table: "tbl_Orders");

            migrationBuilder.RenameTable(
                name: "tbl_Permission",
                newName: "tbl_Permissions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_Permissions",
                table: "tbl_Permissions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "tbl_OrderStateHistory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderState = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<long>(type: "bigint", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_OrderStateHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_OrderStateHistory_tbl_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "tbl_Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 5, 12, 21, 28, 238, DateTimeKind.Local).AddTicks(9780));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_OrderStateHistory_OrderId",
                table: "tbl_OrderStateHistory",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Permissiontbl_Users_tbl_Permissions_PermissionsId",
                table: "tbl_Permissiontbl_Users",
                column: "PermissionsId",
                principalTable: "tbl_Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Permissiontbl_Users_tbl_Permissions_PermissionsId",
                table: "tbl_Permissiontbl_Users");

            migrationBuilder.DropTable(
                name: "tbl_OrderStateHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_Permissions",
                table: "tbl_Permissions");

            migrationBuilder.RenameTable(
                name: "tbl_Permissions",
                newName: "tbl_Permission");

            migrationBuilder.AddColumn<int>(
                name: "OrderState",
                table: "tbl_Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_Permission",
                table: "tbl_Permission",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 5, 11, 44, 48, 716, DateTimeKind.Local).AddTicks(5673));

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Permissiontbl_Users_tbl_Permission_PermissionsId",
                table: "tbl_Permissiontbl_Users",
                column: "PermissionsId",
                principalTable: "tbl_Permission",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
