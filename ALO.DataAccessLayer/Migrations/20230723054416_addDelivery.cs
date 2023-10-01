using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class addDelivery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DeliveryPriceId",
                table: "tbl_Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "tbl_DeliveryPrices",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FromPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_DeliveryPrices", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 23, 9, 14, 15, 582, DateTimeKind.Local).AddTicks(1766));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_DeliveryPriceId",
                table: "tbl_Orders",
                column: "DeliveryPriceId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Orders_tbl_DeliveryPrices_DeliveryPriceId",
                table: "tbl_Orders",
                column: "DeliveryPriceId",
                principalTable: "tbl_DeliveryPrices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Orders_tbl_DeliveryPrices_DeliveryPriceId",
                table: "tbl_Orders");

            migrationBuilder.DropTable(
                name: "tbl_DeliveryPrices");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Orders_DeliveryPriceId",
                table: "tbl_Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryPriceId",
                table: "tbl_Orders");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 16, 21, 11, 50, 454, DateTimeKind.Local).AddTicks(3623));
        }
    }
}
