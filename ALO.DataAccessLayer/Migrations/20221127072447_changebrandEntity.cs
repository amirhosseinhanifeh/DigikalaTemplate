using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class changebrandEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Brands_tbl_SubProductCategories_SubProductCategoryId",
                table: "tbl_Brands");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Brands_SubProductCategoryId",
                table: "tbl_Brands");

            migrationBuilder.DropColumn(
                name: "SubProductCategoryId",
                table: "tbl_Brands");

            migrationBuilder.AddColumn<long>(
                name: "MainProductCategoryId",
                table: "tbl_Brands",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Brands_MainProductCategoryId",
                table: "tbl_Brands",
                column: "MainProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Brands_tbl_MainProductCategory_MainProductCategoryId",
                table: "tbl_Brands",
                column: "MainProductCategoryId",
                principalTable: "tbl_MainProductCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Brands_tbl_MainProductCategory_MainProductCategoryId",
                table: "tbl_Brands");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Brands_MainProductCategoryId",
                table: "tbl_Brands");

            migrationBuilder.DropColumn(
                name: "MainProductCategoryId",
                table: "tbl_Brands");

            migrationBuilder.AddColumn<long>(
                name: "SubProductCategoryId",
                table: "tbl_Brands",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Brands_SubProductCategoryId",
                table: "tbl_Brands",
                column: "SubProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Brands_tbl_SubProductCategories_SubProductCategoryId",
                table: "tbl_Brands",
                column: "SubProductCategoryId",
                principalTable: "tbl_SubProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
