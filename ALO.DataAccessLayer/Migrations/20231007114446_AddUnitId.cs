using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class AddUnitId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UnitId",
                table: "tbl_Products",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MinCanOrder",
                table: "tbl_ProductPriceHistory",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DiscountId",
                table: "tbl_Orders",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tbl_Discounts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Percent = table.Column<double>(type: "float", nullable: false),
                    UseCount = table.Column<int>(type: "int", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Discounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Units",
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
                    table.PrimaryKey("PK_tbl_Units", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 10, 7, 15, 14, 45, 865, DateTimeKind.Local).AddTicks(7196));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Products_UnitId",
                table: "tbl_Products",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_DiscountId",
                table: "tbl_Orders",
                column: "DiscountId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Orders_tbl_Discounts_DiscountId",
                table: "tbl_Orders",
                column: "DiscountId",
                principalTable: "tbl_Discounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Products_tbl_Units_UnitId",
                table: "tbl_Products",
                column: "UnitId",
                principalTable: "tbl_Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Orders_tbl_Discounts_DiscountId",
                table: "tbl_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Products_tbl_Units_UnitId",
                table: "tbl_Products");

            migrationBuilder.DropTable(
                name: "tbl_Discounts");

            migrationBuilder.DropTable(
                name: "tbl_Units");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Products_UnitId",
                table: "tbl_Products");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Orders_DiscountId",
                table: "tbl_Orders");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "MinCanOrder",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.DropColumn(
                name: "DiscountId",
                table: "tbl_Orders");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 10, 1, 20, 44, 6, 888, DateTimeKind.Local).AddTicks(4514));
        }
    }
}
