using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsdddddfdffggghffggghghhdfggg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_tbl_BrandsId",
                table: "tbl_ProductCategories");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCategories_tbl_BrandsId",
                table: "tbl_ProductCategories");

            migrationBuilder.DropColumn(
                name: "tbl_BrandsId",
                table: "tbl_ProductCategories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "tbl_BrandsId",
                table: "tbl_ProductCategories",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCategories_tbl_BrandsId",
                table: "tbl_ProductCategories",
                column: "tbl_BrandsId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCategories_tbl_Brands_tbl_BrandsId",
                table: "tbl_ProductCategories",
                column: "tbl_BrandsId",
                principalTable: "tbl_Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
