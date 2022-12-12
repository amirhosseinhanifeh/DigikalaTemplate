using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsdddddfdffggghffgg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_OrderDetails_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropColumn(
                name: "ProducPriceHistoryId",
                table: "tbl_OrderDetails");

            migrationBuilder.AlterColumn<long>(
                name: "ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_OrderDetails_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                column: "ProductPriceHistoryId",
                principalTable: "tbl_ProductPriceHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_OrderDetails_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_OrderDetails");

            migrationBuilder.AlterColumn<long>(
                name: "ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "ProducPriceHistoryId",
                table: "tbl_OrderDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_OrderDetails_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                column: "ProductPriceHistoryId",
                principalTable: "tbl_ProductPriceHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
