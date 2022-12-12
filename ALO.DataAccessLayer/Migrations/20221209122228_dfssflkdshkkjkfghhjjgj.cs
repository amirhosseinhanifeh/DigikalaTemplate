using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class dfssflkdshkkjkfghhjjgj : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_SubProductCategories_tbl_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCustomFields_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCustomFields_tbl_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropColumn(
                name: "SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropColumn(
                name: "tbl_SubProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCustomFields_ProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "ProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "ProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCustomFields_ProductCategoryId",
                table: "tbl_ProductCustomFields");

            migrationBuilder.AddColumn<long>(
                name: "SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "tbl_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCustomFields_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "SubProductCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCustomFields_tbl_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "tbl_SubProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_ProductCategories_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "SubProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFields_tbl_SubProductCategories_tbl_SubProductCategoryId",
                table: "tbl_ProductCustomFields",
                column: "tbl_SubProductCategoryId",
                principalTable: "tbl_SubProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
