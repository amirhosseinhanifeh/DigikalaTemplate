using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class AddSentDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SentDate",
                table: "tbl_Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "SentTime",
                table: "tbl_Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 28, 22, 52, 21, 53, DateTimeKind.Local).AddTicks(9117));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SentDate",
                table: "tbl_Orders");

            migrationBuilder.DropColumn(
                name: "SentTime",
                table: "tbl_Orders");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 23, 16, 15, 35, 547, DateTimeKind.Local).AddTicks(2778));
        }
    }
}
