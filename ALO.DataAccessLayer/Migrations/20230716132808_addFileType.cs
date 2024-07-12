using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class addFileType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "FileType",
                table: "tbl_Image",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 16, 16, 58, 7, 610, DateTimeKind.Local).AddTicks(5182));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileType",
                table: "tbl_Image");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 1, 18, 11, 37, 54, 571, DateTimeKind.Local).AddTicks(7070));
        }
    }
}
