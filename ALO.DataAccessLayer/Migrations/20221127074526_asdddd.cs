using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asdddd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "BrandId",
                table: "tbl_ProductCategories",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCategories_BrandId",
                table: "tbl_ProductCategories",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_BrandId",
                table: "tbl_ProductCategories",
                column: "BrandId",
                principalTable: "tbl_Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_BrandId",
                table: "tbl_ProductCategories");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCategories_BrandId",
                table: "tbl_ProductCategories");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "tbl_ProductCategories");
        }
    }
}
