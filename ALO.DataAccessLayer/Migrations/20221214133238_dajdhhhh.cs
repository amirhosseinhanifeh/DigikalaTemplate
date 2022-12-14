using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class dajdhhhh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.AlterColumn<long>(
                name: "ProductCategoryId",
                table: "tbl_ProductCustomFields",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCustomFields_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "SubProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "ProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_SubProductCategories_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "SubProductCategoryId",
                principalTable: "tbl_SubProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_SubProductCategories_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCustomFields_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropColumn(
                name: "SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.AlterColumn<long>(
                name: "ProductCategoryId",
                table: "tbl_ProductCustomFields",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "ProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
