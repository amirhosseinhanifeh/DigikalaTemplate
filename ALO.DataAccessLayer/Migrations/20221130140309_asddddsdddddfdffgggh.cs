using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsdddddfdffgggh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_OrderDetails_tbl_Products_tbl_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_tbl_OrderDetails_tbl_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropColumn(
                name: "tbl_ProductId",
                table: "tbl_OrderDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "tbl_ProductId",
                table: "tbl_OrderDetails",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_OrderDetails_tbl_ProductId",
                table: "tbl_OrderDetails",
                column: "tbl_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_OrderDetails_tbl_Products_tbl_ProductId",
                table: "tbl_OrderDetails",
                column: "tbl_ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
