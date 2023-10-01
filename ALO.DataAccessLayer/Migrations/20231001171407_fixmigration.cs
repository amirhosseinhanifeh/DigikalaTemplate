using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class fixmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Orders_tbl_DeliveryPrices_DeliveryPriceId",
                table: "tbl_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Products_tbl_City_CityId",
                table: "tbl_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Products_tbl_Users_OwnerId",
                table: "tbl_Products");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Products_CityId",
                table: "tbl_Products");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Products_OwnerId",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "tbl_Products");

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryPriceId",
                table: "tbl_Orders",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 10, 1, 20, 44, 6, 888, DateTimeKind.Local).AddTicks(4514));

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Orders_tbl_DeliveryPrices_DeliveryPriceId",
                table: "tbl_Orders",
                column: "DeliveryPriceId",
                principalTable: "tbl_DeliveryPrices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Orders_tbl_DeliveryPrices_DeliveryPriceId",
                table: "tbl_Orders");

            migrationBuilder.AddColumn<long>(
                name: "CityId",
                table: "tbl_Products",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OwnerId",
                table: "tbl_Products",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryPriceId",
                table: "tbl_Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 5, 12, 21, 28, 238, DateTimeKind.Local).AddTicks(9780));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Products_CityId",
                table: "tbl_Products",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Products_OwnerId",
                table: "tbl_Products",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Orders_tbl_DeliveryPrices_DeliveryPriceId",
                table: "tbl_Orders",
                column: "DeliveryPriceId",
                principalTable: "tbl_DeliveryPrices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Products_tbl_City_CityId",
                table: "tbl_Products",
                column: "CityId",
                principalTable: "tbl_City",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Products_tbl_Users_OwnerId",
                table: "tbl_Products",
                column: "OwnerId",
                principalTable: "tbl_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
