using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsddd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_BrandId",
                table: "tbl_ProductCategories");

            migrationBuilder.RenameColumn(
                name: "BrandId",
                table: "tbl_ProductCategories",
                newName: "tbl_BrandsId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductCategories_BrandId",
                table: "tbl_ProductCategories",
                newName: "IX_tbl_ProductCategories_tbl_BrandsId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_tbl_BrandsId",
                table: "tbl_ProductCategories",
                column: "tbl_BrandsId",
                principalTable: "tbl_Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_tbl_BrandsId",
                table: "tbl_ProductCategories");

            migrationBuilder.RenameColumn(
                name: "tbl_BrandsId",
                table: "tbl_ProductCategories",
                newName: "BrandId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductCategories_tbl_BrandsId",
                table: "tbl_ProductCategories",
                newName: "IX_tbl_ProductCategories_BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_BrandId",
                table: "tbl_ProductCategories",
                column: "BrandId",
                principalTable: "tbl_Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
